import { appendFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

import type { LeadRecord } from '@/lib/leads/lead'

export interface LeadStore {
  save(lead: LeadRecord): Promise<void>
}

/**
 * Inserts into the `leads` table through Supabase's REST API using a server-only key:
 * a secret key (`sb_secret_…`, sent only as `apikey`) or a legacy service_role JWT (also sent as Bearer).
 */
function createSupabaseStore(url: string, serviceRoleKey: string, table: string): LeadStore {
  const isSecretKey = serviceRoleKey.startsWith('sb_')
  return {
    async save(lead) {
      const response = await fetch(`${url.replace(/\/$/, '')}/rest/v1/${table}`, {
        method: 'POST',
        headers: {
          apikey: serviceRoleKey,
          ...(!isSecretKey && { Authorization: `Bearer ${serviceRoleKey}` }),
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          full_name: lead.fullName,
          email: lead.email,
          phone: lead.phone,
          condo_name: lead.condoName,
          city: lead.city,
          units_range: lead.unitsRange,
          role: lead.role,
          preferred_contact_time: lead.contactTime,
          locale: lead.locale,
          source: lead.source,
          utm_source: lead.utmSource,
          utm_medium: lead.utmMedium,
          utm_campaign: lead.utmCampaign,
          referrer: lead.referrer,
          user_agent: lead.userAgent,
          consent_at: lead.consentAt,
        }),
        cache: 'no-store',
      })
      if (!response.ok) throw new Error(`Supabase insert failed (${response.status}): ${await response.text()}`)
    },
  }
}

/** Development fallback: appends one JSON line per lead to `.data/leads.jsonl`. */
function createFileStore(): LeadStore {
  const dir = path.join(process.cwd(), '.data')
  return {
    async save(lead) {
      await mkdir(dir, { recursive: true })
      await appendFile(path.join(dir, 'leads.jsonl'), `${JSON.stringify({ ...lead, createdAt: new Date().toISOString() })}\n`, 'utf8')
    },
  }
}

export function getLeadStore(): LeadStore | null {
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_LEADS_TABLE = 'leads' } = process.env
  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) return createSupabaseStore(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SUPABASE_LEADS_TABLE)
  if (process.env.NODE_ENV !== 'production') return createFileStore()
  return null
}
