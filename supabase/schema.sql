create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  whatsapp text,
  route text,
  consent boolean not null default true,
  source text not null default 'price_alert',
  created_at timestamptz not null default now()
);

create table if not exists public.affiliate_clicks (
  id uuid primary key default gen_random_uuid(),
  route text not null,
  provider text not null,
  href text not null,
  referrer text,
  user_agent text,
  ip text,
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists affiliate_clicks_created_at_idx on public.affiliate_clicks (created_at desc);
create index if not exists affiliate_clicks_route_idx on public.affiliate_clicks (route);

alter table public.leads enable row level security;
alter table public.affiliate_clicks enable row level security;

-- The app writes through SUPABASE_SERVICE_ROLE_KEY from server routes.
-- Do not expose SUPABASE_SERVICE_ROLE_KEY in the browser.
