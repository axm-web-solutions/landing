import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return <p className={cn('mb-4 text-sm font-bold uppercase tracking-[0.18em] text-brand-teal-ink', className)}>{children}</p>
}

type SectionHeaderProps = {
  eyebrow: ReactNode
  title: ReactNode
  lead?: ReactNode
  size?: 'md' | 'lg'
  /** `dark` for sections on navy backgrounds. */
  tone?: 'light' | 'dark'
  className?: string
  eyebrowClassName?: string
}

const titleSizes = {
  md: 'text-3xl xs:text-4xl sm:text-5xl',
  lg: 'text-3xl xs:text-4xl sm:text-5xl lg:text-6xl',
}

/** Eyebrow + h2 + optional lead paragraph: the heading pattern shared by every content section. */
export function SectionHeader({ eyebrow, title, lead, size = 'lg', tone = 'light', className, eyebrowClassName }: SectionHeaderProps) {
  return (
    <div className={cn('max-w-2xl', className)}>
      <Eyebrow className={cn(tone === 'dark' && 'text-brand-teal-bright', eyebrowClassName)}>{eyebrow}</Eyebrow>
      <h2 className={cn('text-balance font-semibold tracking-[-0.04em]', titleSizes[size])}>{title}</h2>
      {lead && (
        <p className={cn('mt-6 text-pretty text-base leading-7 sm:text-lg sm:leading-8', tone === 'dark' ? 'text-white/70' : 'text-slate-500')}>{lead}</p>
      )}
    </div>
  )
}
