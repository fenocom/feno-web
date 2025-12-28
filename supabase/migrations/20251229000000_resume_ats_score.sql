-- Add ATS score and analysis columns to user_resumes
alter table public.user_resumes 
add column if not exists ats_score integer check (ats_score >= 0 and ats_score <= 100),
add column if not exists ats_analysis jsonb;

-- Create index for ats_score for potential filtering/sorting
create index if not exists idx_user_resumes_ats_score on public.user_resumes(user_id, ats_score desc);
