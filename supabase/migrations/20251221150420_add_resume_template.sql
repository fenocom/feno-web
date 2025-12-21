
  create table "public"."resume_templates" (
    "id" uuid not null default gen_random_uuid(),
    "creator_id" uuid,
    "resume_data" jsonb not null,
    "created_at" timestamp without time zone default now(),
    "updated_at" timestamp without time zone default now()
      );


CREATE INDEX idx_resumes_creator ON public.resume_templates USING btree (creator_id);

CREATE UNIQUE INDEX resume_templates_pkey ON public.resume_templates USING btree (id);

alter table "public"."resume_templates" add constraint "resume_templates_pkey" PRIMARY KEY using index "resume_templates_pkey";

alter table "public"."resume_templates" add constraint "resume_templates_creator_id_fkey" FOREIGN KEY (creator_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."resume_templates" validate constraint "resume_templates_creator_id_fkey";

grant delete on table "public"."resume_templates" to "anon";

grant insert on table "public"."resume_templates" to "anon";

grant references on table "public"."resume_templates" to "anon";

grant select on table "public"."resume_templates" to "anon";

grant trigger on table "public"."resume_templates" to "anon";

grant truncate on table "public"."resume_templates" to "anon";

grant update on table "public"."resume_templates" to "anon";

grant delete on table "public"."resume_templates" to "authenticated";

grant insert on table "public"."resume_templates" to "authenticated";

grant references on table "public"."resume_templates" to "authenticated";

grant select on table "public"."resume_templates" to "authenticated";

grant trigger on table "public"."resume_templates" to "authenticated";

grant truncate on table "public"."resume_templates" to "authenticated";

grant update on table "public"."resume_templates" to "authenticated";

grant delete on table "public"."resume_templates" to "service_role";

grant insert on table "public"."resume_templates" to "service_role";

grant references on table "public"."resume_templates" to "service_role";

grant select on table "public"."resume_templates" to "service_role";

grant trigger on table "public"."resume_templates" to "service_role";

grant truncate on table "public"."resume_templates" to "service_role";

grant update on table "public"."resume_templates" to "service_role";


