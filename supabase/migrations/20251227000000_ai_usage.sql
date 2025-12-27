-- AI Usage tracking table
create table if not exists public.ai_usage (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    calls_count integer not null default 0,
    period_start timestamp with time zone not null,
    period_type text not null check (period_type in ('monthly', 'daily')),
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now(),
    unique(user_id, period_start, period_type)
);

-- Index for fast lookups
create index if not exists ai_usage_user_period_idx on public.ai_usage(user_id, period_start, period_type);

-- RLS policies
alter table public.ai_usage enable row level security;

-- Users can only read their own usage
create policy "Users can view own usage"
    on public.ai_usage for select
    using (auth.uid() = user_id);

-- Only service role can insert/update (done via API)
create policy "Service role can manage usage"
    on public.ai_usage for all
    using (auth.jwt() ->> 'role' = 'service_role');

-- Function to get or create usage record
create or replace function public.get_or_create_ai_usage(
    p_user_id uuid,
    p_period_type text,
    p_period_start timestamp with time zone
)
returns public.ai_usage
language plpgsql
security definer
as $$
declare
    v_usage public.ai_usage;
begin
    select * into v_usage
    from public.ai_usage
    where user_id = p_user_id
      and period_type = p_period_type
      and period_start = p_period_start;

    if not found then
        insert into public.ai_usage (user_id, period_type, period_start, calls_count)
        values (p_user_id, p_period_type, p_period_start, 0)
        returning * into v_usage;
    end if;

    return v_usage;
end;
$$;

-- Function to increment usage and return new count
create or replace function public.increment_ai_usage(
    p_user_id uuid,
    p_period_type text,
    p_period_start timestamp with time zone
)
returns integer
language plpgsql
security definer
as $$
declare
    v_new_count integer;
begin
    insert into public.ai_usage (user_id, period_type, period_start, calls_count)
    values (p_user_id, p_period_type, p_period_start, 1)
    on conflict (user_id, period_start, period_type)
    do update set
        calls_count = public.ai_usage.calls_count + 1,
        updated_at = now()
    returning calls_count into v_new_count;

    return v_new_count;
end;
$$;
