import { dictionaries } from '@/content/landing'
import type { LeadRecord } from '@/lib/leads/lead'

/**
 * Tells the sales team about a new lead by email (Resend) and/or WhatsApp (CallMeBot).
 * Each channel is enabled by its env vars; failures are logged and never reach the visitor.
 */

const timeoutMs = 8000
const labels = dictionaries.es.trial.form

const env = (name: string) => process.env[name]?.trim().replace(/^['"]|['"]$/g, '').trim() || undefined
const list = (value: string | undefined) => value?.split(',').map((item) => item.trim()).filter(Boolean) ?? []

/** wa.me needs the country code: Colombian mobiles are typed as 10 digits starting with 3. */
function whatsappLink(phone: string) {
  const digits = phone.replace(/\D/g, '')
  return `https://wa.me/${digits.length === 10 && digits.startsWith('3') ? `57${digits}` : digits}`
}

function leadLines(lead: LeadRecord, saved: boolean): [string, string][] {
  return [
    [labels.labels.fullName, lead.fullName],
    [labels.labels.email, lead.email],
    ['Teléfono', lead.phone],
    ['WhatsApp', whatsappLink(lead.phone)],
    [labels.labels.condoName, lead.condoName],
    [labels.labels.city, lead.city],
    [labels.labels.unitsRange, labels.unitOptions[lead.unitsRange]],
    ['Rol', labels.roleOptions[lead.role]],
    ['Horario', lead.contactTime ? labels.contactTimeOptions[lead.contactTime] : 'Cualquiera'],
    ['Botón', lead.source],
    ['Idioma', lead.locale],
    ['Campaña', [lead.utmSource, lead.utmMedium, lead.utmCampaign].filter(Boolean).join(' / ') || '—'],
    ['Guardado en Supabase', saved ? 'Sí' : 'NO (revisar logs)'],
  ]
}

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)

async function sendEmail(lead: LeadRecord, saved: boolean) {
  const apiKey = env('RESEND_API_KEY')
  const to = list(env('LEAD_NOTIFY_EMAIL_TO'))
  if (!apiKey || to.length === 0) return

  const lines = leadLines(lead, saved)
  const rows = lines
    .map(([label, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#5b6b7f">${escapeHtml(label)}</td><td style="padding:4px 0"><strong>${escapeHtml(value)}</strong></td></tr>`)
    .join('')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env('LEAD_NOTIFY_EMAIL_FROM') ?? 'EdiFeasy <onboarding@resend.dev>',
      to,
      reply_to: lead.email,
      subject: `Nuevo lead: ${lead.condoName} (${lead.city})`,
      text: lines.map(([label, value]) => `${label}: ${value}`).join('\n'),
      html: `<h2 style="font-family:sans-serif;color:#0d3155">Nueva solicitud de prueba gratis</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
    }),
    signal: AbortSignal.timeout(timeoutMs),
  })
  if (!response.ok) throw new Error(`Resend ${response.status}: ${await response.text()}`)
}

/** `CALLMEBOT_WHATSAPP` = "+573001234567:apikey,+573109876543:apikey" (one pair per recipient). */
async function sendWhatsapp(lead: LeadRecord, saved: boolean) {
  const recipients = list(env('CALLMEBOT_WHATSAPP'))
  if (recipients.length === 0) return

  const text = ['*Nuevo lead EdiFeasy*', ...leadLines(lead, saved).map(([label, value]) => `${label}: ${value}`)].join('\n')

  await Promise.all(
    recipients.map(async (recipient) => {
      const [phone, apiKey] = recipient.split(':').map((part) => part.trim())
      if (!phone || !apiKey) throw new Error(`CALLMEBOT_WHATSAPP entry must be "phone:apikey", got ${JSON.stringify(phone)}`)
      const url = new URL('https://api.callmebot.com/whatsapp.php')
      url.search = new URLSearchParams({ phone, apikey: apiKey, text }).toString()
      const response = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) })
      const body = await response.text()
      if (!response.ok || /error|invalid/i.test(body)) throw new Error(`CallMeBot ${response.status} for ${phone}: ${body.slice(0, 200)}`)
    }),
  )
}

export async function notifyLead(lead: LeadRecord, saved: boolean) {
  const results = await Promise.allSettled([sendEmail(lead, saved), sendWhatsapp(lead, saved)])
  for (const result of results) {
    if (result.status === 'rejected') console.error('[leads] Notification failed', result.reason)
  }
}
