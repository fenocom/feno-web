CREATE TABLE "resume_templates" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text not null default 'Untitled Template',
  category text default 'General',
  resume_data jsonb NOT NULL,
  tier integer not null default 0,
  is_anonymous boolean not null default false,
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

CREATE INDEX idx_resumes_creator ON resume_templates(creator_id);
CREATE INDEX idx_resume_templates_tier ON resume_templates(tier);