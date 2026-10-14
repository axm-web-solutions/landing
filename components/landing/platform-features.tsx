'use client'

import { BarChart3, Building2, Sparkles, type LucideIcon } from 'lucide-react'

import { Section } from '@/components/layout/section'
import { SectionHeader } from '@/components/layout/section-header'
import { CtaLink } from '@/components/ui/cta-link'
import type { FeatureId } from '@/content/landing'
import { useLanguage } from '@/lib/i18n/language-provider'
import { sectionIds, siteConfig } from '@/lib/site-config'

const featureIcons: Record<FeatureId, LucideIcon> = {
  unified: Building2,
  finance: BarChart3,
  communication: Sparkles,
}

export function PlatformFeatures() {
  const { t } = useLanguage()
  const { platform } = t

  return (
    <Section id={sectionIds.platform} spacing="large">
      <SectionHeader eyebrow={platform.eyebrow} title={platform.title} lead={platform.lead} />
      <div className="mt-12 grid gap-5 sm:mt-16 md:grid-cols-2 lg:grid-cols-3">
        {platform.features.map(({ id, title, description }) => {
          const Icon = featureIcons[id]
          return (
            <article
              key={id}
              className="group flex flex-col rounded-3xl border border-slate-200 bg-surface-card p-6 transition hover:-translate-y-1 hover:border-brand-teal hover:bg-surface-teal sm:p-7"
            >
              <div className="mb-10 grid size-12 place-items-center rounded-2xl bg-brand-mist text-brand-teal-ink sm:mb-14">
                <Icon aria-hidden />
              </div>
              <h3 className="text-xl font-semibold text-brand-ink">{title}</h3>
              <p className="mt-3 leading-7 text-slate-500">{description}</p>
              <CtaLink href={siteConfig.appUrl} external variant="text" size="inline" withArrow className="mt-auto self-start pt-4 text-sm">
                {platform.cta}
              </CtaLink>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
