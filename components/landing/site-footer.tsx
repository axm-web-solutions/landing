'use client'

import { Container } from '@/components/layout/container'
import { useLanguage } from '@/lib/i18n/language-provider'
import { siteConfig } from '@/lib/site-config'

export function SiteFooter() {
  const { t } = useLanguage()

  return (
    <footer className="bg-brand-navy py-8 text-white/50">
      <Container className="flex flex-col justify-between gap-4 text-sm sm:flex-row">
        <span>
          © {new Date().getFullYear()} {siteConfig.name}. {t.footer.rights}
        </span>
        <span>{t.footer.tagline}</span>
      </Container>
    </footer>
  )
}
