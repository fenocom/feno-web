-- Create a secure view to access creator details from auth.users
create or replace view public.creators_view as
select
  id,
  raw_user_meta_data->>'full_name' as full_name,
  raw_user_meta_data->>'avatar_url' as avatar_url,
  email
from auth.users;

-- Grant access to the view
grant select on public.creators_view to anon, authenticated, service_role;

-- Create resume_templates table
create table public.resume_templates (
  id uuid not null default gen_random_uuid(),
  creator_id uuid references auth.users(id) on delete cascade,
  name text not null default 'Untitled Template',
  category text default 'General',
  resume_data jsonb not null,
  tier integer not null default 0, -- 0: Free/Public, 1: Logged In, 2: Premium
  is_anonymous boolean not null default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  primary key (id)
);

-- Indexes
create index idx_resume_templates_creator on public.resume_templates(creator_id);
create index idx_resume_templates_tier on public.resume_templates(tier);

-- Enable RLS
alter table public.resume_templates enable row level security;

-- Policies

-- 1. Read Access
create policy "Read access for resume templates"
on public.resume_templates for select
using (
  (tier = 0) OR 
  (auth.role() = 'authenticated' AND tier = 1) OR
  (auth.role() = 'authenticated' AND tier = 2 AND (
    -- Check for premium status in app_metadata or user_metadata
    -- Adjust 'plan' and 'premium' based on your actual auth implementation
    coalesce(auth.jwt() -> 'app_metadata' ->> 'plan', '') = 'premium' OR
    coalesce(auth.jwt() -> 'user_metadata' ->> 'plan', '') = 'premium'
  )) OR
  (auth.uid() = creator_id) -- Creator can always see their own
);

-- 2. Insert Access (Authenticated users only)
create policy "Authenticated users can create templates"
on public.resume_templates for insert
with check (
  auth.role() = 'authenticated' AND
  auth.uid() = creator_id
);

-- 3. Update Access (Creator only)
create policy "Creators can update their own templates"
on public.resume_templates for update
using (auth.uid() = creator_id);

-- 4. Delete Access (Creator only)
create policy "Creators can delete their own templates"
on public.resume_templates for delete
using (auth.uid() = creator_id);

-- Grant permissions
grant select on public.resume_templates to anon, authenticated, service_role;
grant insert, update, delete on public.resume_templates to authenticated, service_role;
