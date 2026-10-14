'use client'

import { Globe2, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Container } from '@/components/layout/container'
import { BrandLogo } from '@/components/landing/brand-logo'
import { TrialButton } from '@/components/trial/trial-button'
import { CtaLink } from '@/components/ui/cta-link'
import { useLanguage } from '@/lib/i18n/language-provider'
import { sectionIds, siteConfig } from '@/lib/site-config'

export function SiteHeader() {
  const { locale, t, toggleLocale } = useLanguage()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setMenuOpen(false)
    const closeOnDesktop = () => window.matchMedia('(min-width: 64rem)').matches && setMenuOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    window.addEventListener('resize', closeOnDesktop)
    return () => {
      window.removeEventListener('keydown', closeOnEscape)
      window.removeEventListener('resize', closeOnDesktop)
    }
  }, [menuOpen])

  const links = [
    { href: `#${sectionIds.platform}`, label: t.nav.platform },
    { href: `#${sectionIds.comparison}`, label: t.nav.comparison },
    { href: `#${sectionIds.testimonials}`, label: t.nav.testimonials },
  ]
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-brand-navy/75 text-white backdrop-blur-xl">
      <Container className="relative flex items-center justify-between gap-4 py-3 sm:py-4">
        <a href={`#${sectionIds.home}`} aria-label={t.brand.homeLabel} className="min-w-0">
          <BrandLogo tagline={t.brand.tagline} />
        </a>

        <nav
          id="site-nav"
          className={`${menuOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-full max-h-[calc(100svh-4rem)] flex-col gap-1 overflow-y-auto border-b border-white/10 bg-brand-navy px-5 py-4 sm:px-6 lg:static lg:flex lg:max-h-none lg:flex-row lg:items-center lg:gap-6 xl:gap-8 lg:overflow-visible lg:border-0 lg:bg-transparent lg:p-0`}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="flex min-h-11 items-center text-base text-white/75 transition hover:text-white lg:min-h-0 lg:text-sm"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-3 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:items-center">
            <CtaLink href={siteConfig.appUrl} external variant="outline" size="sm" onClick={closeMenu}>
              {t.nav.login}
            </CtaLink>
            <TrialButton source="header" size="sm" onOpen={closeMenu}>
              {t.trial.ctaShort}
            </TrialButton>
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t.nav.changeLanguage}
            className="flex min-h-10 items-center gap-1 rounded-full border border-white/20 px-3 text-xs font-semibold uppercase transition hover:bg-white/10"
          >
            <Globe2 aria-hidden size={15} /> {locale}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={t.nav.toggleMenu}
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            className="grid size-11 place-items-center rounded-full transition hover:bg-white/10 lg:hidden"
          >
            {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </Container>
    </header>
  )
}
