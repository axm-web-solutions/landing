'use client'

import { ArrowRight } from 'lucide-react'
import type { VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { useTrial } from '@/components/trial/trial-provider'
import { ctaLinkVariants } from '@/components/ui/cta-link'
import { cn } from '@/lib/utils'

type TrialButtonProps = Omit<ComponentProps<'button'>, 'onClick' | 'type'> &
  VariantProps<typeof ctaLinkVariants> & {
    /** Where the click came from (hero, header, cta…); stored with the lead. */
    source: string
    withArrow?: boolean
    onOpen?: () => void
  }

/** Opens the trial lead form. Same visual variants as CtaLink. */
export function TrialButton({ source, variant, size, withArrow, onOpen, className, children, ...props }: TrialButtonProps) {
  const { openTrial } = useTrial()

  return (
    <button
      type="button"
      onClick={() => {
        onOpen?.()
        openTrial(source)
      }}
      className={cn(ctaLinkVariants({ variant, size }), className)}
      {...props}
    >
      {children}
      {withArrow && <ArrowRight aria-hidden className="size-4 shrink-0 transition group-hover:translate-x-1" />}
    </button>
  )
}
