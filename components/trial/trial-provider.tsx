'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

import { TrialDialog } from '@/components/trial/trial-dialog'

type TrialContextValue = { openTrial: (source: string) => void }

const TrialContext = createContext<TrialContextValue | null>(null)

/** Owns the single trial dialog; any CTA opens it with `useTrial().openTrial(source)`. */
export function TrialProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<{ source: string; id: number } | null>(null)

  const openTrial = useCallback((source: string) => setSession((current) => ({ source, id: (current?.id ?? 0) + 1 })), [])
  const close = useCallback(() => setSession((current) => (current ? { ...current, source: '' } : null)), [])
  const value = useMemo(() => ({ openTrial }), [openTrial])

  return (
    <TrialContext.Provider value={value}>
      {children}
      <TrialDialog open={Boolean(session?.source)} source={session?.source ?? ''} sessionId={session?.id ?? 0} onClose={close} />
    </TrialContext.Provider>
  )
}

export function useTrial() {
  const context = useContext(TrialContext)
  if (!context) throw new Error('useTrial must be used within TrialProvider')
  return context
}
