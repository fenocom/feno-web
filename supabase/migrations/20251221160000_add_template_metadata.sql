ALTER TABLE "public"."resume_templates" 
ADD COLUMN "name" text,
ADD COLUMN "author" text,
ADD COLUMN "category" text DEFAULT 'resume';
