'use client'

import { Section } from '@/components/layout/section'
import { SectionHeader } from '@/components/layout/section-header'
import { TrialButton } from '@/components/trial/trial-button'
import { useLanguage } from '@/lib/i18n/language-provider'
import { sectionIds } from '@/lib/site-config'

export function TrialSection() {
  const { t } = useLanguage()
  const { trial } = t

  return (
    <Section id={sectionIds.trial} tone="navy" spacing="large" containerClassName="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-16">
      <div aria-hidden className="absolute -left-24 top-1/3 size-96 rounded-full bg-brand-teal/10 blur-3xl" />
      <div className="relative">
        <SectionHeader tone="dark" eyebrow={trial.section.eyebrow} title={trial.section.title} lead={trial.section.lead} />
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          <TrialButton source="trial-section" withArrow className="w-full sm:w-auto">
            {trial.cta}
          </TrialButton>
          <p className="text-sm text-white/55">{trial.note}</p>
        </div>
      </div>

      <ol className="relative grid gap-4 md:grid-cols-3 lg:grid-cols-1">
        {trial.section.steps.map((step, index) => (
          <li key={step.title} className="flex gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm md:flex-col lg:flex-row lg:items-center">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-teal text-lg font-bold text-brand-navy">{index + 1}</span>
            <div>
              <h3 className="font-display text-lg font-semibold">{step.title}</h3>
              <p className="mt-1 leading-7 text-white/65">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}
