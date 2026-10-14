'use client'

import { AlertCircle, CheckCircle2, LoaderCircle } from 'lucide-react'
import { useEffect, useRef, useState, useTransition, type FormEvent } from 'react'

import { CtaLink } from '@/components/ui/cta-link'
import { Field, controlClassName } from '@/components/ui/field'
import type { Dictionary } from '@/content/landing'
import { useLanguage } from '@/lib/i18n/language-provider'
import { createLead } from '@/lib/leads/actions'
import { contactTimes, leadRoles, parseLead, unitRanges, type LeadErrors, type LeadField } from '@/lib/leads/lead'
import { siteConfig } from '@/lib/site-config'

const redirectDelayMs = 2500

type Status = 'editing' | 'success' | 'error'

function errorMessage(field: LeadField, errors: LeadErrors, messages: Dictionary['trial']['form']['errors']) {
  const error = errors[field]
  if (!error) return undefined
  if (error === 'tooLong') return messages.tooLong
  if (field === 'consent') return messages.consent
  if (error === 'invalid' && field === 'email') return messages.email
  if (error === 'invalid' && field === 'phone') return messages.phone
  return error === 'required' ? messages.required : messages.invalid
}

function readTracking() {
  const params = new URLSearchParams(window.location.search)
  return {
    utmSource: params.get('utm_source') ?? '',
    utmMedium: params.get('utm_medium') ?? '',
    utmCampaign: params.get('utm_campaign') ?? '',
    referrer: document.referrer,
  }
}

export function TrialForm({ source }: { source: string }) {
  const { locale, t } = useLanguage()
  const form = t.trial.form
  const [errors, setErrors] = useState<LeadErrors>({})
  const [status, setStatus] = useState<Status>('editing')
  const [pending, startTransition] = useTransition()
  const [startedAt] = useState(() => Date.now())
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (status !== 'success') return
    const timeout = window.setTimeout(() => window.location.assign(siteConfig.signupUrl), redirectDelayMs)
    return () => window.clearTimeout(timeout)
  }, [status])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const parsed = parseLead(data)
    if (!parsed.ok) {
      setErrors(parsed.errors)
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      return
    }

    for (const [key, value] of Object.entries({ ...readTracking(), locale, source, startedAt: String(startedAt) })) data.set(key, value)

    startTransition(async () => {
      const result = await createLead(data).catch(() => ({ status: 'error' as const }))
      if (result.status === 'invalid') setErrors(result.errors)
      else setStatus(result.status)
    })
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-center py-6 text-center sm:py-10">
        <CheckCircle2 aria-hidden className="size-14 text-brand-teal-ink" />
        <h3 className="mt-5 text-2xl font-semibold tracking-tight">{form.success.title}</h3>
        <p className="mt-3 max-w-md text-pretty leading-7 text-slate-500">{form.success.description}</p>
        <CtaLink href={siteConfig.signupUrl} variant="navy" size="lg" withArrow className="mt-8 w-full sm:w-auto">
          {form.success.action}
        </CtaLink>
        <p className="mt-4 text-sm text-slate-400">{form.success.redirecting}</p>
      </div>
    )
  }

  const message = (field: LeadField) => errorMessage(field, errors, form.errors)

  return (
    <form ref={formRef} noValidate onSubmit={handleSubmit} className="grid gap-x-5 gap-y-4 sm:grid-cols-2">
      {/* Honeypot: hidden from people, filled by bots. */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="trial-website">Website</label>
        <input id="trial-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <Field id="trial-fullName" label={form.labels.fullName} error={message('fullName')} className="sm:col-span-2">
        {(control) => (
          <input {...control} name="fullName" type="text" autoComplete="name" placeholder={form.placeholders.fullName} className={controlClassName} />
        )}
      </Field>
      <Field id="trial-email" label={form.labels.email} error={message('email')}>
        {(control) => (
          <input {...control} name="email" type="email" inputMode="email" autoComplete="email" placeholder={form.placeholders.email} className={controlClassName} />
        )}
      </Field>
      <Field id="trial-phone" label={form.labels.phone} error={message('phone')} hint={form.phoneHint}>
        {(control) => (
          <input {...control} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder={form.placeholders.phone} className={controlClassName} />
        )}
      </Field>
      <Field id="trial-condoName" label={form.labels.condoName} error={message('condoName')}>
        {(control) => (
          <input {...control} name="condoName" type="text" autoComplete="organization" placeholder={form.placeholders.condoName} className={controlClassName} />
        )}
      </Field>
      <Field id="trial-city" label={form.labels.city} error={message('city')}>
        {(control) => (
          <input {...control} name="city" type="text" autoComplete="address-level2" placeholder={form.placeholders.city} className={controlClassName} />
        )}
      </Field>
      <Field id="trial-unitsRange" label={form.labels.unitsRange} error={message('unitsRange')}>
        {(control) => (
          <select {...control} name="unitsRange" defaultValue="" className={controlClassName}>
            <option value="" disabled>
              {form.placeholders.select}
            </option>
            {unitRanges.map((range) => (
              <option key={range} value={range}>
                {form.unitOptions[range]}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field id="trial-role" label={form.labels.role} error={message('role')}>
        {(control) => (
          <select {...control} name="role" defaultValue="" className={controlClassName}>
            <option value="" disabled>
              {form.placeholders.select}
            </option>
            {leadRoles.map((role) => (
              <option key={role} value={role}>
                {form.roleOptions[role]}
              </option>
            ))}
          </select>
        )}
      </Field>
      <Field id="trial-contactTime" label={form.labels.contactTime} error={message('contactTime')} className="sm:col-span-2">
        {(control) => (
          <select {...control} name="contactTime" defaultValue="" className={controlClassName}>
            <option value="">{form.placeholders.contactTime}</option>
            {contactTimes.map((time) => (
              <option key={time} value={time}>
                {form.contactTimeOptions[time]}
              </option>
            ))}
          </select>
        )}
      </Field>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-600">
          <input
            name="consent"
            type="checkbox"
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? 'trial-consent-error' : undefined}
            className="mt-1 size-5 shrink-0 cursor-pointer accent-brand-teal-ink"
          />
          {form.consent}
        </label>
        {errors.consent && (
          <p id="trial-consent-error" className="mt-1 pl-8 text-xs font-medium text-red-600">
            {message('consent')}
          </p>
        )}
      </div>

      {status === 'error' && (
        <div role="alert" className="flex flex-col gap-3 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 sm:col-span-2 sm:flex-row sm:items-center">
          <AlertCircle aria-hidden className="size-5 shrink-0" />
          <p className="flex-1">{form.errors.server}</p>
          <CtaLink href={siteConfig.signupUrl} variant="text" size="inline" withArrow className="text-sm">
            {form.success.action}
          </CtaLink>
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-2 inline-flex min-h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-navy px-6 font-semibold text-white transition hover:bg-brand-ink disabled:opacity-70 sm:col-span-2"
      >
        {pending && <LoaderCircle aria-hidden className="size-5 animate-spin" />}
        {pending ? form.submitting : form.submit}
      </button>
    </form>
  )
}
