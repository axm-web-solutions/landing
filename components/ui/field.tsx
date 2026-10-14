import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** Shared look for text inputs and selects. */
export const controlClassName =
  'block min-h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-base text-brand-ink placeholder:text-slate-400 transition outline-none focus:border-brand-teal-ink focus:ring-3 focus:ring-brand-teal/30 aria-invalid:border-red-500 aria-invalid:ring-red-500/15 sm:text-sm'

type FieldProps = {
  id: string
  label: ReactNode
  error?: string
  hint?: ReactNode
  className?: string
  /** Receives the aria props that link the control to its hint and error. */
  children: (control: { id: string; 'aria-invalid'?: true; 'aria-describedby'?: string }) => ReactNode
}

/** Label + control + hint/error, wired for screen readers. */
export function Field({ id, label, error, hint, className, children }: FieldProps) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined

  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium text-brand-ink">
        {label}
      </label>
      {children({ id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy })}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-slate-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
