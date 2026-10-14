import { Comparison } from '@/components/landing/comparison'
import { CtaBanner } from '@/components/landing/cta-banner'
import { Hero } from '@/components/landing/hero'
import { PlatformFeatures } from '@/components/landing/platform-features'
import { SiteFooter } from '@/components/landing/site-footer'
import { SiteHeader } from '@/components/landing/site-header'
import { Testimonials } from '@/components/landing/testimonials'
import { TrialSection } from '@/components/landing/trial-section'
import { TrialProvider } from '@/components/trial/trial-provider'
import { LanguageProvider } from '@/lib/i18n/language-provider'

export default function Page() {
  return (
    <LanguageProvider>
      <TrialProvider>
        <SiteHeader />
        <main className="overflow-x-clip">
          <Hero />
          <PlatformFeatures />
          <Comparison />
          <TrialSection />
          <Testimonials />
          <CtaBanner />
        </main>
        <SiteFooter />
      </TrialProvider>
    </LanguageProvider>
  )
}
