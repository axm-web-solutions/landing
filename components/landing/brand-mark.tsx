import { useId } from 'react'

import { cn } from '@/lib/utils'

/** EdiFeasy isotype: three towers over a circular "e". Inherits `currentColor`. */
export function BrandMark({ className }: { className?: string }) {
  const maskId = useId()

  return (
    <svg viewBox="0 0 172 340" fill="currentColor" aria-hidden className={cn('h-10 w-auto', className)}>
      <mask id={maskId}>
        <rect width="172" height="340" fill="white" />
        <circle cx="86" cy="258" r="94" fill="black" />
      </mask>
      <path mask={`url(#${maskId})`} d="M5 106 45 76V260H5ZM60 36 112 6V260H60ZM127 76 167 101V260H127Z" />
      <path d="M13 258H159A73 73 0 1 0 145.8 299.9" fill="none" stroke="currentColor" strokeWidth="14" />
    </svg>
  )
}
