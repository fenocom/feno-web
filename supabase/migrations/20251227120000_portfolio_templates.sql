-- Create portfolio_templates table
create table public.portfolio_templates (
  id uuid not null default gen_random_uuid(),
  name text not null,
  image_path text not null, -- Path in storage bucket
  prompt text not null,
  mime_type text not null default 'image/png',
  created_at timestamp with time zone default now(),
  primary key (id)
);

-- Enable RLS
alter table public.portfolio_templates enable row level security;

-- Policies
create policy "Public can view portfolio templates"
on public.portfolio_templates for select
using (true);

create policy "Admins can insert portfolio templates"
on public.portfolio_templates for insert
with check (
  (select (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
);

create policy "Admins can update portfolio templates"
on public.portfolio_templates for update
using (
  (select (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
);

create policy "Admins can delete portfolio templates"
on public.portfolio_templates for delete
using (
  (select (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
);

-- Grant permissions
grant select on public.portfolio_templates to anon, authenticated, service_role;
grant all on public.portfolio_templates to authenticated, service_role;

-- Storage bucket setup (idempotent)
insert into storage.buckets (id, name, public)
values ('portfolio-templates', 'portfolio-templates', true)
on conflict (id) do nothing;

-- Storage policies
create policy "Public can view portfolio template images"
on storage.objects for select
using ( bucket_id = 'portfolio-templates' );

create policy "Admins can upload portfolio template images"
on storage.objects for insert
with check (
  bucket_id = 'portfolio-templates' AND
  (select (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
);

create policy "Admins can update portfolio template images"
on storage.objects for update
using (
  bucket_id = 'portfolio-templates' AND
  (select (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
);

create policy "Admins can delete portfolio template images"
on storage.objects for delete
using (
  bucket_id = 'portfolio-templates' AND
  (select (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
);
