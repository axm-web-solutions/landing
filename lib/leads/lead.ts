export const unitRanges = ['1-20', '21-50', '51-150', '151-500', '500+'] as const
export const leadRoles = ['administrator', 'board', 'management_company', 'resident', 'other'] as const
export const contactTimes = ['morning', 'afternoon', 'evening'] as const

export type UnitRange = (typeof unitRanges)[number]
export type LeadRole = (typeof leadRoles)[number]
export type ContactTime = (typeof contactTimes)[number]

/** Data the visitor types in the trial form. */
export type LeadInput = {
  fullName: string
  email: string
  phone: string
  condoName: string
  city: string
  unitsRange: UnitRange
  role: LeadRole
  contactTime: ContactTime | null
}

/** Context captured automatically with every lead. */
export type LeadMeta = {
  locale: string
  source: string
  utmSource: string | null
  utmMedium: string | null
  utmCampaign: string | null
  referrer: string | null
}

export type LeadRecord = LeadInput & LeadMeta & { userAgent: string | null; consentAt: string }

export type LeadField = keyof LeadInput | 'consent'
export type LeadFieldError = 'required' | 'invalid' | 'tooLong'
export type LeadErrors = Partial<Record<LeadField, LeadFieldError>>

export type CreateLeadResult = { status: 'success' } | { status: 'invalid'; errors: LeadErrors } | { status: 'error' }

const maxLength: Record<'fullName' | 'email' | 'phone' | 'condoName' | 'city', number> = {
  fullName: 120,
  email: 160,
  phone: 30,
  condoName: 160,
  city: 80,
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const phonePattern = /^\+?[\d\s().-]+$/

const text = (form: FormData, name: string) => String(form.get(name) ?? '').trim()
const optional = (value: string, limit = 200) => (value ? value.slice(0, limit) : null)
const isOneOf = <T extends string>(options: readonly T[], value: string): value is T => options.includes(value as T)

/** Validates the trial form. Runs on the client for instant feedback and again on the server as the source of truth. */
export function parseLead(form: FormData): { ok: true; data: LeadInput } | { ok: false; errors: LeadErrors } {
  const errors: LeadErrors = {}
  const values = {
    fullName: text(form, 'fullName'),
    email: text(form, 'email').toLowerCase(),
    phone: text(form, 'phone'),
    condoName: text(form, 'condoName'),
    city: text(form, 'city'),
  }

  for (const field of Object.keys(maxLength) as (keyof typeof maxLength)[]) {
    if (!values[field]) errors[field] = 'required'
    else if (values[field].length > maxLength[field]) errors[field] = 'tooLong'
  }
  if (values.email && !errors.email && !emailPattern.test(values.email)) errors.email = 'invalid'

  const phoneDigits = values.phone.replace(/\D/g, '').length
  if (values.phone && !errors.phone && (!phonePattern.test(values.phone) || phoneDigits < 7 || phoneDigits > 15)) errors.phone = 'invalid'

  const unitsRange = text(form, 'unitsRange')
  if (!isOneOf(unitRanges, unitsRange)) errors.unitsRange = 'required'

  const role = text(form, 'role')
  if (!isOneOf(leadRoles, role)) errors.role = 'required'

  const contactTime = text(form, 'contactTime')
  if (contactTime && !isOneOf(contactTimes, contactTime)) errors.contactTime = 'invalid'

  if (form.get('consent') !== 'on') errors.consent = 'required'

  if (Object.keys(errors).length > 0) return { ok: false, errors }

  return {
    ok: true,
    data: {
      ...values,
      unitsRange: unitsRange as UnitRange,
      role: role as LeadRole,
      contactTime: isOneOf(contactTimes, contactTime) ? contactTime : null,
    },
  }
}

export function parseLeadMeta(form: FormData): LeadMeta {
  return {
    locale: text(form, 'locale').slice(0, 5) || 'es',
    source: text(form, 'source').slice(0, 40) || 'unknown',
    utmSource: optional(text(form, 'utmSource')),
    utmMedium: optional(text(form, 'utmMedium')),
    utmCampaign: optional(text(form, 'utmCampaign')),
    referrer: optional(text(form, 'referrer'), 500),
  }
}
