'use client'

import { Section } from '@/components/layout/section'
import { SectionHeader } from '@/components/layout/section-header'
import { useLanguage } from '@/lib/i18n/language-provider'
import { sectionIds } from '@/lib/site-config'

function Stars({ label, className }: { label: string; className?: string }) {
  return (
    <span role="img" aria-label={label} className={className}>
      ★★★★★
    </span>
  )
}

export function Testimonials() {
  const { t } = useLanguage()
  const { testimonials } = t

  return (
    <Section id={sectionIds.testimonials} spacing="large">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeader eyebrow={testimonials.eyebrow} title={testimonials.title} className="max-w-3xl" />
        <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 self-start rounded-full bg-surface-teal-alt px-5 py-3 md:self-auto">
          <span className="font-display text-2xl font-bold text-brand-ink">{testimonials.rating}</span>
          <Stars label={testimonials.starsLabel} className="text-brand-gold" />
          <span className="text-sm text-slate-500">{testimonials.ratingLabel}</span>
        </div>
      </div>

      <div className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.items.map(({ quote, name, role }) => (
          <figure key={name} className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-surface-card p-6 sm:p-7 md:min-h-60">
            <div>
              <Stars label={testimonials.starsLabel} className="mb-5 block text-sm tracking-[0.2em] text-brand-gold" />
              <blockquote className="text-lead text-pretty text-brand-ink">{quote}</blockquote>
            </div>
            <figcaption className="mt-6 border-t border-slate-200 pt-5">
              <p className="font-semibold text-brand-ink">{name}</p>
              <p className="mt-1 text-sm text-slate-500">{role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}
