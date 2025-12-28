alter table public.ai_usage
add column if not exists input_tokens integer not null default 0,
add column if not exists output_tokens integer not null default 0,
add column if not exists total_tokens integer not null default 0;

create or replace function public.increment_ai_usage(
    p_user_id uuid,
    p_period_type text,
    p_period_start timestamp with time zone,
    p_input_tokens integer default 0,
    p_output_tokens integer default 0,
    p_total_tokens integer default 0
)
returns integer
language plpgsql
security definer
as $$
declare
    v_new_count integer;
begin
    insert into public.ai_usage (user_id, period_type, period_start, calls_count, input_tokens, output_tokens, total_tokens)
    values (p_user_id, p_period_type, p_period_start, 1, p_input_tokens, p_output_tokens, p_total_tokens)
    on conflict (user_id, period_start, period_type)
    do update set
        calls_count = public.ai_usage.calls_count + 1,
        input_tokens = public.ai_usage.input_tokens + p_input_tokens,
        output_tokens = public.ai_usage.output_tokens + p_output_tokens,
        total_tokens = public.ai_usage.total_tokens + p_total_tokens,
        updated_at = now()
    returning calls_count into v_new_count;

    return v_new_count;
end;
$$;
