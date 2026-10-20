'use server'

import { headers } from 'next/headers'
import { after } from 'next/server'

import { parseLead, parseLeadMeta, type CreateLeadResult, type LeadRecord } from '@/lib/leads/lead'
import { notifyLead } from '@/lib/leads/notify'
import { getLeadStore, LeadStoreError } from '@/lib/leads/store'

const minFillTimeMs = 1500

export async function createLead(form: FormData): Promise<CreateLeadResult> {
  // Bots fill the hidden honeypot or submit instantly: pretend success so they get no signal.
  const startedAt = Number(form.get('startedAt'))
  if (form.get('website') || (startedAt && Date.now() - startedAt < minFillTimeMs)) return { status: 'success' }

  const parsed = parseLead(form)
  if (!parsed.ok) return { status: 'invalid', errors: parsed.errors }

  const lead: LeadRecord = {
    ...parsed.data,
    ...parseLeadMeta(form),
    userAgent: (await headers()).get('user-agent')?.slice(0, 300) ?? null,
    consentAt: new Date().toISOString(),
  }
  // Notify even when saving fails, so the team can still follow up. Runs after the response is sent.
  const notify = (saved: boolean) => after(() => notifyLead(lead, saved))

  const store = getLeadStore()
  if (!store) {
    console.error('[leads] No lead store configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
    notify(false)
    return { status: 'error', code: 'config' }
  }

  try {
    await store.save(lead)
    notify(true)
    return { status: 'success' }
  } catch (error) {
    console.error('[leads] Failed to save lead', error)
    notify(false)
    if (error instanceof LeadStoreError) return { status: 'error', code: error.code, detail: error.detail }
    return { status: 'error', code: 'unknown' }
  }
}
