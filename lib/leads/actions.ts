'use server'

import { headers } from 'next/headers'

import { parseLead, parseLeadMeta, type CreateLeadResult } from '@/lib/leads/lead'
import { getLeadStore } from '@/lib/leads/store'

const minFillTimeMs = 1500

export async function createLead(form: FormData): Promise<CreateLeadResult> {
  // Bots fill the hidden honeypot or submit instantly: pretend success so they get no signal.
  const startedAt = Number(form.get('startedAt'))
  if (form.get('website') || (startedAt && Date.now() - startedAt < minFillTimeMs)) return { status: 'success' }

  const parsed = parseLead(form)
  if (!parsed.ok) return { status: 'invalid', errors: parsed.errors }

  const store = getLeadStore()
  if (!store) {
    console.error('[leads] No lead store configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
    return { status: 'error' }
  }

  try {
    await store.save({
      ...parsed.data,
      ...parseLeadMeta(form),
      userAgent: (await headers()).get('user-agent')?.slice(0, 300) ?? null,
      consentAt: new Date().toISOString(),
    })
    return { status: 'success' }
  } catch (error) {
    console.error('[leads] Failed to save lead', error)
    return { status: 'error' }
  }
}
