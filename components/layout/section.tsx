import { cva, type VariantProps } from 'class-variance-authority'
import type { ComponentProps } from 'react'

import { Container } from '@/components/layout/container'
import { cn } from '@/lib/utils'

const sectionVariants = cva('relative scroll-mt-20 overflow-hidden', {
  variants: {
    tone: {
      white: 'bg-white text-brand-ink',
      muted: 'bg-surface-alt text-brand-ink',
      navy: 'bg-brand-navy text-white',
      accent: 'bg-brand-teal text-brand-navy',
    },
    spacing: {
      default: 'py-16 sm:py-20 lg:py-24',
      large: 'py-16 sm:py-24 lg:py-32',
    },
  },
  defaultVariants: { tone: 'white', spacing: 'default' },
})

type SectionProps = ComponentProps<'section'> &
  VariantProps<typeof sectionVariants> & { containerClassName?: string }

export function Section({ tone, spacing, className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn(sectionVariants({ tone, spacing }), className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
