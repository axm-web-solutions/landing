-- Potential customers captured by the landing page trial form.
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  full_name text not null,
  email text not null,
  phone text not null,
  condo_name text not null,
  city text not null,
  units_range text not null check (units_range in ('1-20', '21-50', '51-150', '151-500', '500+')),
  role text not null check (role in ('administrator', 'board', 'management_company', 'resident', 'other')),
  preferred_contact_time text check (preferred_contact_time in ('morning', 'afternoon', 'evening')),

  locale text not null default 'es',
  source text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  referrer text,
  user_agent text,
  consent_at timestamptz not null,

  -- Sales follow-up
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'converted', 'discarded')),
  contacted_at timestamptz,
  notes text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_email_idx on public.leads (lower(email));

-- RLS on with no policies: anon/authenticated clients cannot read or write.
-- The landing inserts with the service role key from the server only.
alter table public.leads enable row level security;
