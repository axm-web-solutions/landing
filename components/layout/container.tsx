import type { ComponentProps } from 'react'

import { cn } from '@/lib/utils'

/** Centered page column with the shared responsive gutter. Every section aligns to it. */
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full min-w-0 max-w-7xl px-5 sm:px-6 lg:px-10', className)} {...props} />
}
