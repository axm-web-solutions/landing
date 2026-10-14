'use client'

import { Section } from '@/components/layout/section'
import { Eyebrow } from '@/components/layout/section-header'
import { TrialButton } from '@/components/trial/trial-button'
import { CtaLink } from '@/components/ui/cta-link'
import { useLanguage } from '@/lib/i18n/language-provider'
import { siteConfig } from '@/lib/site-config'

export function CtaBanner() {
  const { t } = useLanguage()

  return (
    <Section tone="accent" containerClassName="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
      <div aria-hidden className="absolute -right-20 -top-40 size-96 rounded-full border-[60px] border-white/10" />
      <div className="relative">
        <Eyebrow className="mb-3 text-brand-teal-deep">{t.cta.eyebrow}</Eyebrow>
        <h2 className="max-w-2xl text-balance text-3xl font-semibold tracking-[-0.04em] xs:text-4xl sm:text-5xl">{t.cta.title}</h2>
        <p className="mt-3 text-lg text-brand-navy/75">{t.cta.lead}</p>
      </div>
      <div className="relative flex w-full shrink-0 flex-col items-center gap-3 sm:w-auto md:items-end">
        <TrialButton source="cta-banner" variant="navy" size="lg" withArrow className="w-full sm:w-auto">
          {t.trial.cta}
        </TrialButton>
        <CtaLink href={siteConfig.appUrl} external variant="text" size="inline" className="text-sm text-brand-navy/80 hover:text-brand-navy">
          {t.cta.login}
        </CtaLink>
      </div>
    </Section>
  )
}
