'use client'

import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { TrialForm } from '@/components/trial/trial-form'
import { useLanguage } from '@/lib/i18n/language-provider'

type TrialDialogProps = { open: boolean; source: string; sessionId: number; onClose: () => void }

/**
 * Native <dialog>: focus trap, Escape and top layer for free.
 * Phones: bottom sheet that slides up. `sm` and up: centered card.
 * Short viewports (landscape phones): near full height with a compact header.
 */
export function TrialDialog({ open, source, sessionId, onClose }: TrialDialogProps) {
  const { t } = useLanguage()
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-labelledby="trial-title"
      onClose={onClose}
      onClick={(event) => event.target === ref.current && onClose()}
      className="m-0 mt-auto max-h-[94svh] w-full max-w-none overflow-hidden rounded-t-[1.75rem] bg-white p-0 text-brand-ink shadow-2xl backdrop:bg-brand-navy/60 backdrop:backdrop-blur-sm open:flex open:flex-col motion-safe:animate-sheet-in backdrop:motion-safe:animate-fade-in sm:m-auto sm:max-h-[min(90svh,52rem)] sm:w-[calc(100%-3rem)] sm:max-w-2xl sm:rounded-3xl sm:motion-safe:animate-dialog-in short:sm:max-h-[calc(100svh-1rem)]"
    >
      <div aria-hidden className="mx-auto mt-2.5 h-1.5 w-10 shrink-0 rounded-full bg-slate-300 sm:hidden" />
      <div className="flex shrink-0 items-start justify-between gap-3 border-b border-slate-200 px-5 pb-3 pt-3 sm:px-8 sm:pb-5 sm:pt-7 short:sm:py-3">
        <div className="min-w-0 pt-1">
          <h2 id="trial-title" className="text-balance font-display text-lg font-bold tracking-tight xs:text-xl sm:text-2xl short:sm:text-lg">
            {t.trial.form.title}
          </h2>
          <p className="mt-1 hidden text-pretty text-sm text-slate-500 xs:block short:hidden">{t.trial.form.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.trial.form.close}
          className="-mr-2 grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-brand-ink"
        >
          <X aria-hidden />
        </button>
      </div>
      {open && <TrialForm key={sessionId} source={source} />}
    </dialog>
  )
}
