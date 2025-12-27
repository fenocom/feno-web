-- Create user_resumes table for storing user's personal resumes
create table public.user_resumes (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    name text not null default 'Untitled Resume',
    resume_data jsonb not null,
    is_default boolean not null default false,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- Indexes
create index idx_user_resumes_user_id on public.user_resumes(user_id);
create index idx_user_resumes_updated_at on public.user_resumes(user_id, updated_at desc);

-- Enable RLS
alter table public.user_resumes enable row level security;

-- Policies: Users can only access their own resumes
create policy "Users can view own resumes"
    on public.user_resumes for select
    using (auth.uid() = user_id);

create policy "Users can create own resumes"
    on public.user_resumes for insert
    with check (auth.uid() = user_id);

create policy "Users can update own resumes"
    on public.user_resumes for update
    using (auth.uid() = user_id);

create policy "Users can delete own resumes"
    on public.user_resumes for delete
    using (auth.uid() = user_id);

-- Grant permissions
grant select, insert, update, delete on public.user_resumes to authenticated;
grant all on public.user_resumes to service_role;

-- Function to ensure only one default resume per user
create or replace function public.ensure_single_default_resume()
returns trigger
language plpgsql
security definer
as $$
begin
    if NEW.is_default = true then
        update public.user_resumes
        set is_default = false
        where user_id = NEW.user_id
          and id != NEW.id
          and is_default = true;
    end if;
    return NEW;
end;
$$;

-- Trigger to maintain single default
create trigger ensure_single_default_resume_trigger
    before insert or update on public.user_resumes
    for each row
    execute function public.ensure_single_default_resume();

-- Function to auto-update updated_at
create or replace function public.update_user_resume_timestamp()
returns trigger
language plpgsql
as $$
begin
    NEW.updated_at = now();
    return NEW;
end;
$$;

create trigger update_user_resume_timestamp_trigger
    before update on public.user_resumes
    for each row
    execute function public.update_user_resume_timestamp();
