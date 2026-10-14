'use client'

import { useEffect, useState } from 'react'

import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion'

/** Cycles an index through `length` items every `delayMs`; paused when the user prefers reduced motion. */
export function useAutoRotate(length: number, delayMs: number) {
  const [index, setIndex] = useState(0)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    if (reducedMotion || length < 2) return
    const interval = window.setInterval(() => setIndex((current) => (current + 1) % length), delayMs)
    return () => window.clearInterval(interval)
  }, [length, delayMs, reducedMotion, index])

  return [index, setIndex] as const
}
