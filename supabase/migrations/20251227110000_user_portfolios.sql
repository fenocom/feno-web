create table public.user_portfolios (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subdomain text unique,
  html_content text,
  resume_id uuid references public.user_resumes(id) on delete set null,
  template_id text,
  is_published boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  primary key (id),
  unique(user_id)
);

-- Indexes
create index idx_user_portfolios_user on public.user_portfolios(user_id);
create index idx_user_portfolios_subdomain on public.user_portfolios(subdomain);

-- Enable RLS
alter table public.user_portfolios enable row level security;

-- Policies
create policy "Users can view their own portfolio"
on public.user_portfolios for select
using (auth.uid() = user_id);

create policy "Public can view published portfolios"
on public.user_portfolios for select
using (is_published = true);

create policy "Users can insert their own portfolio"
on public.user_portfolios for insert
with check (auth.uid() = user_id);

create policy "Users can update their own portfolio"
on public.user_portfolios for update
using (auth.uid() = user_id);

create policy "Users can delete their own portfolio"
on public.user_portfolios for delete
using (auth.uid() = user_id);

-- Grant permissions
grant select, insert, update, delete on public.user_portfolios to authenticated, service_role;
grant select on public.user_portfolios to anon;
