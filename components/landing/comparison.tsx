'use client'

import { Check, X } from 'lucide-react'

import { Section } from '@/components/layout/section'
import { SectionHeader } from '@/components/layout/section-header'
import { CtaLink } from '@/components/ui/cta-link'
import { useLanguage } from '@/lib/i18n/language-provider'
import { sectionIds, siteConfig } from '@/lib/site-config'

export function Comparison() {
  const { t } = useLanguage()
  const { comparison } = t

  return (
    <Section id={sectionIds.comparison} tone="muted" containerClassName="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
      <div>
        <SectionHeader eyebrow={comparison.eyebrow} title={comparison.title} lead={comparison.lead} size="md" />
        <CtaLink href={siteConfig.appUrl} external variant="text" size="inline" withArrow className="mt-6">
          {comparison.cta}
        </CtaLink>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">{comparison.withoutLabel}</h3>
          <ul className="mt-6 flex flex-col gap-4 text-slate-500">
            {comparison.without.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <X aria-hidden className="shrink-0 text-slate-300" size={18} />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-brand-navy p-6 text-white shadow-xl shadow-brand-navy/15 sm:p-7">
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand-teal-bright">{comparison.withLabel}</h3>
          <ul className="mt-6 flex flex-col gap-4 text-white/80">
            {comparison.with.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-teal text-brand-navy">
                  <Check aria-hidden size={13} strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
