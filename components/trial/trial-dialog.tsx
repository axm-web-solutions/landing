'use client'

import { X } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { TrialForm } from '@/components/trial/trial-form'
import { useLanguage } from '@/lib/i18n/language-provider'

type TrialDialogProps = { open: boolean; source: string; sessionId: number; onClose: () => void }

/**
 * Native <dialog>: focus trap, Escape and top-layer for free.
 * Bottom sheet on phones, centered card from `sm` up.
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
      className="m-0 mt-auto max-h-[92svh] w-full max-w-none overflow-hidden rounded-t-3xl bg-white p-0 text-brand-ink shadow-2xl backdrop:bg-brand-navy/60 backdrop:backdrop-blur-sm open:flex open:flex-col sm:m-auto sm:max-h-[min(90svh,56rem)] sm:w-[calc(100%-3rem)] sm:max-w-2xl sm:rounded-3xl"
    >
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 pb-4 pt-5 sm:px-8 sm:pt-7">
        <div className="min-w-0">
          <h2 id="trial-title" className="text-balance text-xl font-semibold tracking-tight sm:text-2xl">
            {t.trial.form.title}
          </h2>
          <p className="mt-1 text-pretty text-sm text-slate-500">{t.trial.form.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={t.trial.form.close}
          className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-brand-ink"
        >
          <X aria-hidden />
        </button>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 sm:px-8 sm:pb-8">
        {open && <TrialForm key={sessionId} source={source} />}
      </div>
    </dialog>
  )
}
