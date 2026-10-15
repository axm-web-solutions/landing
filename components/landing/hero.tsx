'use client'

import { Cloud, ShieldCheck } from 'lucide-react'

import { Container } from '@/components/layout/container'
import { TrialButton } from '@/components/trial/trial-button'
import { CtaLink } from '@/components/ui/cta-link'
import { useAutoRotate } from '@/hooks/use-auto-rotate'
import { useLanguage } from '@/lib/i18n/language-provider'
import { cn } from '@/lib/utils'
import { sectionIds, siteConfig } from '@/lib/site-config'

const images = siteConfig.heroImages

export function Hero() {
  const { t } = useLanguage()
  const [active, setActive] = useAutoRotate(images.length, siteConfig.heroRotationMs)
  const src = images[active]

  return (
    <section
      id={sectionIds.home}
      className="relative flex min-h-svh items-center overflow-hidden bg-brand-navy pt-24 text-white sm:pt-28"
    >
      <img
        key={src}
        src={src}
        alt=""
        aria-hidden
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover object-center opacity-55 motion-safe:animate-hero-zoom"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(73,191,198,.26),transparent_35%),linear-gradient(90deg,var(--color-brand-navy)_20%,rgba(13,49,85,.86)_56%,rgba(13,49,85,.35))]" />
      <div className="absolute -right-20 top-24 size-96 rounded-full bg-brand-teal/10 blur-3xl" />

      <Container className="relative grid items-center gap-10 pb-16 sm:pb-20 lg:grid-cols-[1.05fr_.95fr] lg:gap-12">
        <div className="min-w-0 max-w-2xl">
          <h1 className="text-display text-balance break-words">{t.hero.title}</h1>
          <p className="text-lead mt-6 max-w-xl text-pretty text-white/70 sm:mt-7">{t.hero.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <TrialButton source="hero" withArrow>
              {t.trial.cta}
            </TrialButton>
            <CtaLink href={`#${sectionIds.platform}`} variant="outline">
              {t.hero.explore}
            </CtaLink>
          </div>
          <ul className="mt-10 flex flex-col gap-3 text-sm text-white/60 sm:mt-12 sm:flex-row sm:items-center sm:gap-6">
            <li className="flex items-center gap-2.5">
              <ShieldCheck aria-hidden className="size-5 shrink-0 text-brand-teal" />
              {t.hero.trusted}
            </li>
            <li className="flex items-center gap-2.5">
              <Cloud aria-hidden className="size-5 shrink-0 text-brand-teal" />
              {t.hero.cloud}
            </li>
          </ul>
        </div>

        <div className="relative h-80 xs:h-96 sm:h-[28rem] lg:h-[36rem]">
          <div className="absolute inset-8 rounded-[2rem] bg-brand-teal/20 blur-3xl" />
          <div className="relative h-full overflow-hidden rounded-[1.5rem] border border-white/20 bg-white/10 p-2 shadow-2xl shadow-black/20 backdrop-blur-sm sm:rounded-[2rem]">
            <img
              key={`card-${src}`}
              src={src}
              alt={t.hero.cardImageAlt}
              className="size-full rounded-[1.1rem] object-cover object-center motion-safe:animate-hero-zoom sm:rounded-[1.5rem]"
            />
            <div className="absolute inset-2 rounded-[1.1rem] bg-gradient-to-t from-brand-navy/75 via-transparent to-white/10 sm:rounded-[1.5rem]" />
            <div className="absolute inset-x-6 bottom-6 sm:inset-x-8 sm:bottom-8">
              <p className="text-[0.6875rem] uppercase tracking-[0.12em] text-brand-teal-soft sm:text-xs sm:tracking-[0.18em]">{t.hero.cardEyebrow}</p>
              <p className="mt-2 max-w-xs font-display text-xl font-semibold text-white sm:text-2xl">{t.hero.cardTitle}</p>
              <div className="mt-3 flex gap-1 sm:mt-4" role="group" aria-label={t.hero.carouselLabel}>
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`${t.hero.slideLabel} ${index + 1}`}
                    aria-current={index === active}
                    className="grid h-8 place-items-center px-1"
                  >
                    <span
                      className={cn(
                        'block h-1.5 rounded-full transition-all',
                        index === active ? 'w-10 bg-brand-teal' : 'w-3 bg-white/45',
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
