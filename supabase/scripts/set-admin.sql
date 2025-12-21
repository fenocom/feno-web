-- Set a user as admin by their email
-- Run this in Supabase Studio SQL Editor (http://localhost:54323)

-- Replace 'user@example.com' with the actual email
UPDATE auth.users
SET raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'::jsonb
WHERE email = 'user@example.com';

-- Verify the change
SELECT id, email, raw_app_meta_data->>'role' as role
FROM auth.users
WHERE email = 'user@example.com';
