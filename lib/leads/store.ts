import { appendFile, mkdir } from 'node:fs/promises'
import path from 'node:path'

import type { LeadRecord, LeadSaveErrorCode } from '@/lib/leads/lead'

/** Failure with a short, non-sensitive code that the form can show to help diagnose production issues. */
export class LeadStoreError extends Error {
  constructor(
    readonly code: LeadSaveErrorCode,
    message: string,
  ) {
    super(message)
  }
}

function codeForStatus(status: number): LeadSaveErrorCode {
  if (status === 401 || status === 403) return 'auth'
  if (status === 404) return 'table'
  if (status === 400 || status === 409 || status === 422) return 'data'
  return 'upstream'
}

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
      const response = await fetch(`${url}/rest/v1/${table}`, {
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
      }).catch((error: unknown) => {
        throw new LeadStoreError('network', `Supabase unreachable at ${url}: ${String(error)}`)
      })
      if (!response.ok) {
        throw new LeadStoreError(codeForStatus(response.status), `Supabase insert failed (${response.status}): ${await response.text()}`)
      }
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

/** Env values pasted into dashboards often carry spaces, line breaks or quotes. */
const cleanEnv = (value: string | undefined) => value?.trim().replace(/^['"]|['"]$/g, '').trim() || undefined

export function getLeadStore(): LeadStore | null {
  const url = cleanEnv(process.env.SUPABASE_URL)?.replace(/\/+$/, '').replace(/\/rest\/v1$/, '')
  const key = cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY)
  const table = cleanEnv(process.env.SUPABASE_LEADS_TABLE) ?? 'leads'
  if (url && key) return createSupabaseStore(url, key, table)
  if (process.env.NODE_ENV !== 'production') return createFileStore()
  return null
}
