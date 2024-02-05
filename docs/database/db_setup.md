# Database Setup

This [tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native?database-method=sql&auth-store=async-storage) demonstrates how to build a basic user management app. The app authenticates and identifies the user, stores their profile information in the database, and allows the user to log in, update their profile details, and upload a profile photo. The app uses:

```bash
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-elements react-native-url-polyfill
```

## 1. SupaBase

Set up our Database and API. Start a new Project in Supabase

## 2. DB Schema

Set up DB Schema:

```sql
-- Create a table for public profiles
create table profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL PRIMARY KEY,
  updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC'),
  username TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE,
  gender TEXT,
  bio TEXT DEFAULT 'Hello!',
  date_of_birth DATE,
  created_date TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC'),
  last_login TIMESTAMP WITHOUT TIME ZONE DEFAULT (NOW() AT TIME ZONE 'UTC'),
  avatar_url TEXT,
  account_status TEXT,
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name, email, gender, date_of_birth, username)
  values (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', new.email, new.raw_user_meta_data->>'gender', TO_DATE(new.raw_user_meta_data->>'date_of_birth', 'YYYY-MM-DD'), new.raw_user_meta_data->>'username');
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage!
insert into storage.buckets (id, name)
  values ('avatars', 'avatars');

-- Set up access controls for storage.
-- See https://supabase.com/docs/guides/storage/security/access-control#policy-examples for more details.
create policy "Avatar images are publicly accessible." on storage.objects
  for select using (bucket_id = 'avatars');

create policy "Anyone can upload an avatar." on storage.objects
  for insert with check (bucket_id = 'avatars');

create policy "Anyone can update their own avatar." on storage.objects
  for update using (auth.uid() = owner) with check (bucket_id = 'avatars');
```

## Accumulation

If you upload additional profile photos, they'll accumulate in the `avatars` bucket because of their random names with only the latest being referenced from `public.profiles` and the older versions getting orphaned.

To automatically remove obsolete storage objects, extend the database triggers. Note that it is not sufficient to delete the objects from the `storage.objects` table because that would orphan and leak the actual storage objects in the S3 backend. Instead, invoke the storage API within Postgres via the `http` extension.

Enable the [http extension](https://supabase.com/dashboard/project/_/database/extensions) for the extensions schema in the Dashboard. Then, define the following SQL functions in the SQL Editor to delete storage objects via the API:

> Enable http
> Replace `<YOURPROJECTURL>` and `<YOURSERVICEROLEKEY>` with your actual project URL and service role key.

```sql
create or replace function delete_storage_object(bucket text, object text, out status int, out content text)
returns record
language 'plpgsql'
security definer
as $$
declare
  project_url text := 'https://zcydoiuuwfvixtzslhke.supabase.co';
  service_role_key text := 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjeWRvaXV1d2Z2aXh0enNsaGtlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNjg5OTM5NywiZXhwIjoyMDIyNDc1Mzk3fQ.XwZo3xqZFs7BQ268qUem6UVHYEZgHRfxxCMY2IuOPI0'; --  full access needed
  url text := project_url||'/storage/v1/object/'||bucket||'/'||object;
begin
  select
      into status, content
           result.status::int, result.content::text
      FROM extensions.http((
    'DELETE',
    url,
    ARRAY[extensions.http_header('authorization','Bearer '||service_role_key)],
    NULL,
    NULL)::extensions.http_request) as result;
end;
$$;

create or replace function delete_avatar(avatar_url text, out status int, out content text)
returns record
language 'plpgsql'
security definer
as $$
begin
  select
      into status, content
           result.status, result.content
      from public.delete_storage_object('avatars', avatar_url) as result;
end;
$$;
```

Next, add a trigger that removes any obsolete avatar whenever the profile is updated or deleted:

```sql
create or replace function delete_old_avatar()
returns trigger
language 'plpgsql'
security definer
as $$
declare
  status int;
  content text;
  avatar_name text;
begin
  if coalesce(old.avatar_url, '') <> ''
      and (tg_op = 'DELETE' or (old.avatar_url <> coalesce(new.avatar_url, ''))) then
    -- extract avatar name
    avatar_name := old.avatar_url;
    select
      into status, content
      result.status, result.content
      from public.delete_avatar(avatar_name) as result;
    if status <> 200 then
      raise warning 'Could not delete avatar: % %', status, content;
    end if;
  end if;
  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

create trigger before_profile_changes
  before update of avatar_url or delete on public.profiles
  for each row execute function public.delete_old_avatar();
```

Finally, delete the `public.profile` row before a user is deleted. If this step is omitted, you won't be able to delete users without first manually deleting their avatar image.

```sql
create or replace function delete_old_profile()
returns trigger
language 'plpgsql'
security definer
as $$
begin
  delete from public.profiles where id = old.id;
  return old;
end;
$$;

create trigger before_delete_user
  before delete on auth.users
  for each row execute function public.delete_old_profile();
```

## Create Contact Table

```sql
-- Create the table
 CREATE TABLE feedback (
 id SERIAL PRIMARY KEY,
 user UUID,
 message TEXT,
 marketing BOOLEAN DEFAULT false,
 dt TIMESTAMP DEFAULT NOW()
 );
-- enable RLS
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
-- Policy Insert for public
CREATE POLICY "Enable insert for all public roles" ON "public"."feedback"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true);
-- Read access to service role only
CREATE POLICY "Enable read access for service role" ON "public"."feedback"
AS PERMISSIVE FOR SELECT
TO service_role
USING (true);
```

## 3. Auth

Install the additional dependencies: supabase-js

```bash
npx expo install @supabase/supabase-js @react-native-async-storage/async-storage react-native-elements react-native-url-polyfill
```
