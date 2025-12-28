-- Drop existing policies
drop policy "Public can view portfolio template images" on storage.objects;
drop policy "Admins can upload portfolio template images" on storage.objects;
drop policy "Admins can update portfolio template images" on storage.objects;
drop policy "Admins can delete portfolio template images" on storage.objects;

-- Create new policies for Authenticated Users
create policy "Authenticated users can view portfolio template images"
on storage.objects for select
using (
  bucket_id = 'portfolio-templates' AND
  auth.role() = 'authenticated'
);

create policy "Authenticated users can upload portfolio template images"
on storage.objects for insert
with check (
  bucket_id = 'portfolio-templates' AND
  auth.role() = 'authenticated'
);

create policy "Authenticated users can update portfolio template images"
on storage.objects for update
using (
  bucket_id = 'portfolio-templates' AND
  auth.role() = 'authenticated'
);

create policy "Authenticated users can delete portfolio template images"
on storage.objects for delete
using (
  bucket_id = 'portfolio-templates' AND
  auth.role() = 'authenticated'
);
