import { BrandMark } from '@/components/landing/brand-mark'

export function BrandLogo({ tagline }: { tagline: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <BrandMark className="h-10 shrink-0 text-brand-teal-bright" />
      <span>
        <strong className="block font-display text-lg tracking-tight">
          edi<span className="text-brand-teal-bright">feasy</span>
        </strong>
        <small className="hidden text-[10px] uppercase tracking-[0.2em] text-white/65 xs:block">{tagline}</small>
      </span>
    </span>
  )
}
