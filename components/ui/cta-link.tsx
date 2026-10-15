import { cva, type VariantProps } from 'class-variance-authority'
import { ArrowRight } from 'lucide-react'
import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

export const ctaLinkVariants = cva(
  'group inline-flex cursor-pointer items-center font-display justify-center gap-2 font-semibold transition outline-none disabled:pointer-events-none disabled:opacity-60 focus-visible:ring-3 focus-visible:ring-brand-teal/60 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        primary: 'rounded-full bg-brand-teal text-brand-navy hover:bg-white',
        outline: 'rounded-full border border-white/25 text-white hover:border-white hover:bg-white/10',
        light: 'rounded-full bg-white text-brand-navy hover:bg-brand-mint',
        navy: 'rounded-full bg-brand-navy text-white hover:bg-white hover:text-brand-navy',
        text: 'font-bold text-brand-teal-ink hover:text-brand-navy',
      },
      size: {
        sm: 'min-h-10 px-5 text-sm',
        md: 'min-h-12 px-6 py-3',
        lg: 'min-h-14 px-6 py-4',
        inline: 'min-h-11',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

type CtaLinkProps = ComponentProps<'a'> &
  VariantProps<typeof ctaLinkVariants> & {
    /** Opens in a new tab with safe rel attributes. */
    external?: boolean
    /** Appends the animated arrow icon. */
    withArrow?: boolean
  }

/** Link styled as a call to action. Use for every navigational CTA instead of ad-hoc anchor classes. */
export function CtaLink({ variant, size, external, withArrow, className, children, ...props }: CtaLinkProps) {
  return (
    <a
      className={cn(ctaLinkVariants({ variant, size }), className)}
      {...(external && { target: '_blank', rel: 'noreferrer' })}
      {...props}
    >
      {children}
      {withArrow && <ArrowRight aria-hidden className="size-4 shrink-0 transition group-hover:translate-x-1" />}
    </a>
  )
}
