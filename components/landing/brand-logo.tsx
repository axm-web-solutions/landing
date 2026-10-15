import { Building2 } from 'lucide-react'

export function BrandLogo({ tagline }: { tagline: string }) {
  return (
    <span className="flex items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-teal text-brand-navy">
        <Building2 aria-hidden />
      </span>
      <span>
        <strong className="block font-display text-lg tracking-tight">
          Edi<span className="text-brand-teal-bright">Feasy</span>
        </strong>
        <small className="hidden text-[10px] uppercase tracking-[0.2em] text-white/65 xs:block">{tagline}</small>
      </span>
    </span>
  )
}
