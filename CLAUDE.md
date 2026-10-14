# EdiFeasy — Landing page

Landing de marketing de EdiFeasy (plataforma para administrar condominios). Una sola página bilingüe (ES/EN) que lleva al dashboard en `https://edifeasy.ventofast.com/dashboard`.

Stack: Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 · shadcn (`base-nova`) · lucide-react · pnpm · Vercel Analytics.

Comandos: `pnpm dev` · `pnpm build` · `npx tsc --noEmit`.

## Arquitectura

```
app/
  layout.tsx            metadata, viewport, <html>/<body>, Analytics
  page.tsx              Server Component: solo compone secciones dentro de <LanguageProvider>
  globals.css           Tailwind + tokens de marca (@theme), breakpoints xs/3xl/4xl, escalado fluido
components/
  layout/               Container, Section (tone/spacing), SectionHeader + Eyebrow
  ui/                   CtaLink + ctaLinkVariants, Field + controlClassName (formularios), button (shadcn, sin uso aún)
  landing/              SiteHeader, Hero, PlatformFeatures, Comparison, TrialSection, Testimonials, CtaBanner, SiteFooter, BrandLogo
  trial/                TrialProvider (useTrial().openTrial(source)), TrialDialog (<dialog> nativo), TrialForm, TrialButton
content/landing.ts      Dictionary tipado + textos es/en
lib/
  site-config.ts        appUrl, signupUrl (/register), trialDays, imágenes del hero, ids de secciones
  leads/lead.ts         modelo Lead + parseLead() (validación compartida cliente/servidor)
  leads/actions.ts      Server Action createLead (honeypot, validación, guardado)
  leads/store.ts        LeadStore: Supabase REST si hay env, .data/leads.jsonl en desarrollo
  i18n/language-provider.tsx   contexto de idioma: useLanguage() → { locale, t, toggleLocale }
  utils.ts              cn()
hooks/                  useAutoRotate (carrusel), usePrefersReducedMotion
supabase/migrations/    SQL de la tabla `leads` (RLS activo, sin políticas públicas)
```

## Prueba gratis y leads

Todo botón "Prueba gratis" es un `<TrialButton source="...">`. Abre el formulario y, si el lead es válido, lo guarda y lleva al usuario a `siteConfig.signupUrl`. Si falla el guardado, el usuario puede continuar al registro igualmente.
Variables (solo servidor, ver `.env.example`): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_LEADS_TABLE`. En producción, si faltan, el lead no se guarda y queda un `console.error`.

## Convenciones

- Textos solo en `content/landing.ts` (ambos idiomas). Componentes usan `const { t } = useLanguage()`.
- URLs, anclas e imágenes solo en `lib/site-config.ts`.
- Colores con tokens (`bg-brand-navy`, `text-brand-teal-ink`, `bg-surface-*`), nunca hex en componentes.
- Secciones nuevas: `<Section tone spacing>` + `<SectionHeader>`; CTAs con `<CtaLink>`.
- Mobile-first; responsive hasta 4K (la raíz escala a 112.5% en ≥1920px y 137.5% en ≥2560px). Usa `rem`.
- Estilo de código: comillas simples, sin punto y coma, imports con alias `@/`.

## Agentes del proyecto (`.claude/agents/`)

- `design-responsive` — UI, patrones reutilizables y responsive en todos los dispositivos.
- `infra-architecture` — revisión de arquitectura, modelado de contenido, configuración, rendimiento, SEO y despliegue.
