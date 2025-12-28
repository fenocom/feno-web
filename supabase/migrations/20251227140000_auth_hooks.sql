-- Function to handle new user registration
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  -- Update app_metadata with default tier if not present
  update auth.users
  set raw_app_meta_data = 
    coalesce(raw_app_meta_data, '{}'::jsonb) || 
    jsonb_build_object('tier', 1)
  where id = new.id;
  
  return new;
end;
$$;

-- Trigger to run after a new user is created
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute procedure public.handle_new_user();

-- Optional: Update existing users who don't have a tier
-- This needs to be run manually or as a one-off
-- update auth.users set raw_app_meta_data = raw_app_meta_data || '{"tier": 1}' where raw_app_meta_data->>'tier' is null;
