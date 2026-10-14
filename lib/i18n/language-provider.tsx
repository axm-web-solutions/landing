'use client'

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

import { defaultLocale, dictionaries, type Dictionary, type Locale } from '@/content/landing'

type LanguageContextValue = {
  locale: Locale
  t: Dictionary
  toggleLocale: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      t: dictionaries[locale],
      toggleLocale: () => setLocale((current) => (current === 'es' ? 'en' : 'es')),
    }),
    [locale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
