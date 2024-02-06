I am setting up the DB Schema in Supabase. This is the SQL to set up the database schema:

## Auth

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

## Create Feedback Table

```sql
-- Create the table
 CREATE TABLE feedback (
 id SERIAL PRIMARY KEY,
 user_id uuid REFERENCES public.public.profiles(id),
 message TEXT,
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

## Update Email

> Update the Link to redirect people to from `localhost:3000`
> Update the Email templates

## Google Places

Table for places. Here we will store the Google Data. any pin will be linked to a place, and shared information about that place is stored only once in the places table:

```sql
CREATE TABLE places (
    places_id text PRIMARY KEY,
    name text,
    formatted_address text,
    lat decimal(9,6), -- Latitude, decimal degrees format
    lng decimal(9,6), -- Longitude, decimal degrees format
    types text[] NOT NULL,
    maps_url text,
    website text,
    price_level int,
    opening_hours jsonb,
    phone_number text,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW(),
    places_photo_url text
);

-- Index for quickly querying places by type
CREATE INDEX idx_places_types ON places USING GIN(types);

-- Trigger to automatically update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_places_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_places_timestamp BEFORE UPDATE ON places
FOR EACH ROW EXECUTE FUNCTION update_places_timestamp();
```

We also want to store images as the default for each pin. A user can update these manually if they want:

```sql
-- Set up Storage Bucket for place images
INSERT INTO storage.buckets (id, name) VALUES ('places', 'places');

-- Set up access controls for place storage
CREATE POLICY "Place images are publicly accessible." on storage.objects FOR SELECT USING (bucket_id = 'places');
CREATE POLICY "Anyone can upload a place image." on storage.objects FOR INSERT WITH CHECK (bucket_id = 'places');
CREATE POLICY "Users cannot update place images" on storage.objects FOR UPDATE USING (false);
```

Since places could be frequently searched by name, types, or geolocation, indexes on these columns would improve search performance.

```sql
CREATE INDEX idx_places_name ON places(name);
CREATE INDEX idx_places_types ON places USING gin(types);
CREATE INDEX idx_places_lat_lng ON places USING GIST (ll_to_earth(lat, lng));
```

## Pins

The pins table should reference the places table through `places_id` for extra info like `address`, `price_level`, etc.

```sql
-- Create table for pins
CREATE TABLE pins (
    pin_id uuid PRIMARY KEY,
    places_id TEXT REFERENCES public.places(places_id) ON DELETE SET NULL,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    pin_photo_url TEXT,
    pin_name TEXT NOT NULL,
    notes text,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW(),
    visited boolean DEFAULT FALSE,
    visited_at timestamptz,
    copied_from_pin_id uuid REFERENCES public.pins(pin_id) ON DELETE SET NULL,
    deviation_count int DEFAULT 0,
    review text,
    rating smallint,
    review_updated_at timestamptz,
    private boolean DEFAULT FALSE
);

-- Set up Row Level Security (RLS)
ALTER TABLE pins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public pins are viewable by everyone." on pins FOR SELECT USING (true);
CREATE POLICY "Users can only update their own Pins." ON pins FOR UPDATE USING (auth.uid() = user_id);

-- Set up Storage Bucket for pin images
INSERT INTO storage.buckets (id, name) VALUES ('pins', 'pins');

-- Set up access controls for pin storage
CREATE POLICY "Pin images are publicly accessible." on storage.objects FOR SELECT USING (bucket_id = 'pins');
CREATE POLICY "Anyone can upload a pin image." on storage.objects FOR INSERT WITH CHECK (bucket_id = 'pins');
CREATE POLICY "Anyone can update their own pin image." on storage.objects FOR UPDATE USING (auth.uid() = owner) WITH CHECK (bucket_id = 'pins');

-- Adding Pin Count to Profiles
ALTER TABLE public.profiles ADD COLUMN pin_count int DEFAULT 0;

-- Trigger to automatically update 'pin_count' column
CREATE OR REPLACE FUNCTION update_pin_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE profiles
    SET pin_count = (SELECT COUNT(*) FROM pins WHERE user_id = NEW.user_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply this function to tables with 'pin_count' column
CREATE TRIGGER update_pin_count_trigger AFTER INSERT OR DELETE ON pins FOR EACH ROW EXECUTE FUNCTION update_pin_count();
```

Given the operations, indexes on `user_id`, `places_id`, and `copied_from_pin_id` would be beneficial for fetching pins by users, places, and derivative pins.

```sql
CREATE INDEX idx_pins_user_id ON pins(user_id);
CREATE INDEX idx_pins_places_id ON pins(places_id);
CREATE INDEX idx_pins_copied_from_pin_id ON pins(copied_from_pin_id);
```

For geospatial queries (e.g., finding pins near a user's location), consider using a GiST index on lat and lng if your queries are based on geographic coordinates.

```sql
CREATE INDEX idx_pins_lat_lng ON pins USING GIST (ll_to_earth(lat, lng));
```

## Lists

```sql
-- Create table for lists
CREATE TABLE lists (
    list_id uuid PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW(),
    private boolean DEFAULT FALSE,
    list_photo_url TEXT,
    followers_count int DEFAULT 0
);

-- Set up Row Level Security (RLS)
ALTER TABLE lists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public lists are viewable by everyone." on lists FOR SELECT USING (true);
CREATE POLICY "Users can only update their own lists." ON lists FOR UPDATE USING (auth.uid() = user_id);

-- Set up Storage Bucket for list images
INSERT INTO storage.buckets (id, name) VALUES ('lists', 'lists');

-- Set up access controls for list storage
CREATE POLICY "List images are publicly accessible." on storage.objects FOR SELECT USING (bucket_id = 'lists');
CREATE POLICY "Anyone can upload a list image." on storage.objects FOR INSERT WITH CHECK (bucket_id = 'lists');
CREATE POLICY "Anyone can update their own list image." on storage.objects FOR UPDATE USING (auth.uid() = owner) WITH CHECK (bucket_id = 'lists');
```

Add Follow count to profiles:

```sql
-- Adding Pin Count to Profiles
ALTER TABLE public.profiles ADD COLUMN followers_count int DEFAULT 0;

-- Trigger to automatically update 'followers_count' column when lists are updated
CREATE OR REPLACE FUNCTION update_followers_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE profiles
    SET followers_count = (SELECT COUNT(*) FROM lists WHERE user_id = NEW.user_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply this function to tables with 'followers_count' column
CREATE TRIGGER update_followers_count_trigger AFTER INSERT OR DELETE ON lists FOR EACH ROW EXECUTE FUNCTION update_followers_count();
```

An index on user_id would help in quickly retrieving all lists created by a specific user.

```sql
CREATE INDEX idx_lists_user_id ON lists(user_id);
```

## Pins and Lists Images Handling

Accumualation for Pins and Lists and Images. Create a function to delete the storage object:

```sql
create or replace function delete_pin_img(pin_photo_url text, out status int, out content text)
returns record
language 'plpgsql'
security definer
as $$
begin
  select
      into status, content
           result.status, result.content
      from public.delete_storage_object('pins', pin_photo_url) as result;
end;
$$;

create or replace function delete_list_img(list_photo_url text, out status int, out content text)
returns record
language 'plpgsql'
security definer
as $$
begin
  select
      into status, content
           result.status, result.content
      from public.delete_storage_object('lists', list_photo_url) as result;
end;
$$;
```

Next, add a trigger that removes any obsolete list and pin image whenever they are updated or deleted:

```sql
-- Pin Handling
create or replace function delete_old_pin_img()
returns trigger
language 'plpgsql'
security definer
as $$
declare
  status int;
  content text;
  pin_name text;
begin
  if coalesce(old.pin_name, '') <> ''
      and (tg_op = 'DELETE' or (old.pin_name <> coalesce(new.pin_name, ''))) then
    -- extract pin name
    pin_name := old.pin_name;
    select
      into status, content
      result.status, result.content
      from public.delete_pin_img(pin_name) as result;
    if status <> 200 then
      raise warning 'Could not delete pin: % %', status, content;
    end if;
  end if;
  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

create trigger before_pin_img_changes
  before update of pin_photo_url or delete on public.pins
  for each row execute function public.delete_old_pin_img();


-- Lists Handling
create or replace function delete_old_list_img()
returns trigger
language 'plpgsql'
security definer
as $$
declare
  status int;
  content text;
  list_name text;
begin
  if coalesce(old.list_name, '') <> ''
      and (tg_op = 'DELETE' or (old.list_name <> coalesce(new.list_name, ''))) then
    -- extract list name
    list_name := old.list_name;
    select
      into status, content
      result.status, result.content
      from public.delete_list_img(list_name) as result;
    if status <> 200 then
      raise warning 'Could not delete list: % %', status, content;
    end if;
  end if;
  if tg_op = 'DELETE' then
    return old;
  end if;
  return new;
end;
$$;

create trigger before_list_img_changes
  before update of list_photo_url or delete on public.lists
  for each row execute function public.delete_old_list_img();
```

## Join Tables

```sql
-- Create join table for list_pin
CREATE TABLE list_pin (
    id SERIAL PRIMARY KEY,
    dt timestamptz DEFAULT NOW(),
    list_id uuid REFERENCES public.lists(list_id) ON DELETE CASCADE NOT NULL,
    pin_id uuid REFERENCES public.pins(pin_id) ON DELETE CASCADE NOT NULL
);

-- Create table for bookmarks
CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    dt timestamptz DEFAULT NOW(),
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    pin_id uuid REFERENCES public.pins(pin_id) ON DELETE CASCADE NOT NULL,
);

-- Create table for follows
CREATE TABLE follows (
    id SERIAL PRIMARY KEY,
    dt timestamptz DEFAULT NOW(),
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    list_id uuid REFERENCES public.lists(list_id) ON DELETE CASCADE NOT NULL,
);


-- To improve lookup performance, add indexes on foreign keys and other columns that are frequently queried.
CREATE INDEX ON list_pin(list_id);
CREATE INDEX ON list_pin(pin_id);

CREATE INDEX ON bookmarks(user_id);
CREATE INDEX ON bookmarks(pin_id);

CREATE INDEX ON follows(user_id);
CREATE INDEX ON follows(list_id);

-- Enable RLS for tables
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;

-- Bookmarks Policies
CREATE POLICY select_bookmarks_policy ON bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY insert_bookmarks_policy ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY update_bookmarks_policy ON bookmarks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY delete_bookmarks_policy ON bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Follows Policies
CREATE POLICY select_follows_policy ON follows FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY insert_follows_policy ON follows FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY update_follows_policy ON follows FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY delete_follows_policy ON follows FOR DELETE USING (auth.uid() = user_id);
```

Following and Followers Count:

```sql
-- Adding Following Count to Profiles
ALTER TABLE public.profiles ADD COLUMN following_count int DEFAULT 0;

-- Trigger to automatically update 'following_count'
CREATE OR REPLACE FUNCTION update_following_counts()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE profiles
    SET following_count = (SELECT COUNT(*) FROM follows WHERE user_id = NEW.user_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply this function to follows table
CREATE TRIGGER update_following_counts_trigger AFTER INSERT OR DELETE ON follows FOR EACH ROW EXECUTE FUNCTION update_following_counts();
```

```sql
-- Add followers to list
ALTER TABLE public.lists ADD COLUMN followers_count int DEFAULT 0;

-- Trigger to automatically update 'followers_count'
CREATE OR REPLACE FUNCTION update_followers_counts()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE lists
    SET followers_count = (SELECT COUNT(*) FROM follows WHERE list_id = NEW.list_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply this function to follows table
CREATE TRIGGER update_followers_counts_trigger AFTER INSERT OR DELETE ON follows FOR EACH ROW EXECUTE FUNCTION update_followers_counts();
```

We will also want to update the bookmark number on pins:

```sql
-- Adding Bookmark Count to Pins
ALTER TABLE public.pins ADD COLUMN bookmark_count int DEFAULT 0;

-- Trigger to automatically update 'bookmark_count'
CREATE OR REPLACE FUNCTION update_bookmark_counts()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE pins
    SET bookmark_count = (SELECT COUNT(*) FROM bookmarks WHERE pin_id = NEW.pin_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply this function to bookmarks table
CREATE TRIGGER update_bookmark_counts_trigger AFTER INSERT OR DELETE ON bookmarks FOR EACH ROW EXECUTE FUNCTION update_bookmark_counts();
```

Since these tables involve user actions, indexes on `user_id` and relevant foreign keys like `pin_id` for bookmarks and `list_id` for follows will improve retrieval times for user-specific data.

```sql
CREATE INDEX idx_bookmarks_user_id_pin_id ON bookmarks(user_id, pin_id);
CREATE INDEX idx_follows_user_id_list_id ON follows(user_id, list_id);
```

## Comments

These are the tables for `comments`:

```sql
-- Create table for comments
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    pin_id uuid REFERENCES public.pins(pin_id) ON DELETE CASCADE NOT NULL,
    comment TEXT NOT NULL,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

-- Enable RLS for tables
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Comments Policies
CREATE POLICY select_comments_policy ON comments FOR SELECT USING (true);
CREATE POLICY update_comments_policy ON comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY delete_comments_policy ON comments FOR DELETE USING (auth.uid() = user_id);

-- Trigger to automatically update 'updated_at' timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update 'updated_at' timestamps
CREATE TRIGGER update_comments_timestamp BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_timestamp();
```

Indexes on pin_id and user_id will speed up fetching comments for a pin and by a user.

```sql
CREATE INDEX idx_comments_pin_id ON comments(pin_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
```

## Notifications

```sql
-- Create table for notifications
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    created_at timestamptz DEFAULT NOW(),
    -- User to be Notified
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    notification_type text,
    notification_text text,
    read boolean DEFAULT FALSE,
    read_at timestamptz DEFAULT NULL
);

-- Enable RLS for tables
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Notifications Policies
CREATE POLICY select_notifications_policy ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY insert_notifications_policy ON notifications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY update_notifications_policy ON notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY delete_notifications_policy ON notifications FOR DELETE USING (auth.uid() = user_id);

-- Trigger when a list has been followed
CREATE OR REPLACE FUNCTION notify_followers()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO notifications (user_id, notification_type, notification_text)
    SELECT user_id, 'list_followed', (SELECT username FROM profiles WHERE id = NEW.user_id) || ' followed your list: ' || (SELECT name FROM lists WHERE list_id = NEW.list_id)
    FROM follows
    WHERE list_id = NEW.list_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply this function to follows table
CREATE TRIGGER notify_followers_trigger AFTER INSERT ON follows FOR EACH ROW EXECUTE FUNCTION notify_followers();

-- Trigger when a pin has been commented on
CREATE OR REPLACE FUNCTION notify_pin_owner()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO notifications (user_id, notification_type, notification_text)
    SELECT user_id, 'pin_commented', (SELECT username FROM profiles WHERE id = NEW.user_id) || ' commented on your pin: ' || (SELECT pin_name FROM pins WHERE pin_id = NEW.pin_id)
    FROM pins
    WHERE pin_id = NEW.pin_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply this function to comments table
CREATE TRIGGER notify_pin_owner_trigger AFTER INSERT ON comments FOR EACH ROW EXECUTE FUNCTION notify_pin_owner();

-- Trigger to automatically notify when a pin is bookmarked
CREATE OR REPLACE FUNCTION notify_pin_bookmarked()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO notifications (user_id, notification_type, notification_text)
    SELECT user_id, 'pin_bookmarked', (SELECT username FROM profiles WHERE id = NEW.user_id) || ' bookmarked your pin: ' || (SELECT pin_name FROM pins WHERE pin_id = NEW.pin_id)
    FROM pins
    WHERE pin_id = NEW.pin_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply this function to bookmarks table
CREATE TRIGGER notify_pin_bookmarked_trigger AFTER INSERT ON bookmarks FOR EACH ROW EXECUTE FUNCTION notify_pin_bookmarked();
```

We also want to notify the original user when the pin is derived.

```sql
-- Trigger to automatically notify the original user when a pin is derived
-- Use the "copied_from_pin_id" column to track the original pin
-- Find the user from the original pin and insert a notification
-- We also want to increment the deviation_count for the original pin

CREATE OR REPLACE FUNCTION notify_original_user_and_increment_deviation()
RETURNS TRIGGER AS $$
DECLARE
    original_user_id uuid;
BEGIN
    -- Find the original pin's user ID
    SELECT user_id INTO original_user_id FROM pins WHERE pin_id = NEW.copied_from_pin_id;

    -- Insert a notification for the original pin owner
    INSERT INTO notifications (user_id, notification_type, notification_text)
    VALUES (original_user_id, 'pin_derived', 'Your pin has been derived: ' || (SELECT pin_name FROM pins WHERE pin_id = NEW.copied_from_pin_id));

    -- Increment the deviation_count for the original pin
    UPDATE pins SET deviation_count = deviation_count + 1 WHERE pin_id = NEW.copied_from_pin_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to execute the function after a new pin is inserted
CREATE TRIGGER notify_original_user_derivation_trigger
AFTER INSERT ON pins
FOR EACH ROW

-- Conditional Execution: The trigger now includes a WHEN condition to ensure it only executes when NEW.copied_from_pin_id IS NOT NULL, meaning it only triggers for derived pins.
WHEN (NEW.copied_from_pin_id IS NOT NULL)
EXECUTE FUNCTION notify_original_user_and_increment_deviation();
```

## Search History

For search History:

```sql
CREATE TABLE search_history (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    search_term text,
    created_at timestamptz DEFAULT NOW()
);
```

## Data Science, Audit & Analytics

We want to ensure that your database can track changes over time, store enough data for analysis, and support complex queries for recommendations. An audit logging system will track changes to critical data in your application. This can be accomplished by creating an audit table and triggers to log changes.

```sql
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    table_name TEXT NOT NULL,
    column_name TEXT,
    row_id TEXT NOT NULL,
    old_value TEXT,
    new_value TEXT,
    operation_type TEXT NOT NULL CHECK (operation_type IN ('INSERT', 'UPDATE', 'DELETE')),
    changed_by uuid REFERENCES profiles(id),
    changed_at timestamptz DEFAULT NOW()
);

-- Create a generic audit trigger function that can be applied to multiple tables. This function dynamically captures table name, operation type, and the changing user's ID.

CREATE OR REPLACE FUNCTION log_generic_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (table_name, column_name, row_id, old_value, new_value, operation_type, changed_by, changed_at)
        SELECT TG_TABLE_NAME, column_name, NEW.id::TEXT, OLD.value, NEW.value, TG_OP, NEW.user_id, NOW()
        FROM jsonb_each_text(to_jsonb(OLD)) AS OLD(column_name, value)
        JOIN jsonb_each_text(to_jsonb(NEW)) AS NEW(column_name, value) ON OLD.column_name = NEW.column_name
        WHERE OLD.value IS DISTINCT FROM NEW.value;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (table_name, row_id, operation_type, changed_by, changed_at)
        VALUES (TG_TABLE_NAME, OLD.id::TEXT, TG_OP, OLD.user_id, NOW());
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (table_name, row_id, operation_type, changed_by, changed_at)
        VALUES (TG_TABLE_NAME, NEW.id::TEXT, TG_OP, NEW.user_id, NOW());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- apply triggers to your other tables (pins, lists, places, etc.) using the generic audit function. You'll need to create a trigger for each table.

-- pins
CREATE TRIGGER pins_audit
AFTER INSERT OR UPDATE OR DELETE ON pins
FOR EACH ROW EXECUTE FUNCTION log_generic_changes();
-- lists
CREATE TRIGGER lists_audit
AFTER INSERT OR UPDATE OR DELETE ON lists
FOR EACH ROW EXECUTE FUNCTION log_generic_changes();
-- places
CREATE TRIGGER places_audit
AFTER INSERT OR UPDATE OR DELETE ON places
FOR EACH ROW EXECUTE FUNCTION log_generic_changes();
-- follows
CREATE TRIGGER follows_audit
AFTER INSERT OR UPDATE OR DELETE ON follows
FOR EACH ROW EXECUTE FUNCTION log_generic_changes();
-- bookmarks
CREATE TRIGGER bookmarks_audit
AFTER INSERT OR UPDATE OR DELETE ON bookmarks
FOR EACH ROW EXECUTE FUNCTION log_generic_changes();
-- Trigger to capture changes
CREATE TRIGGER profile_changes_audit
AFTER INSERT OR UPDATE OR DELETE ON profiles
FOR EACH ROW EXECUTE FUNCTION log_generic_changes();
```

Store user interactions and behaviors in a more granular way.

```sql
CREATE TABLE user_interactions (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES profiles(id) NOT NULL,
    pin_id uuid REFERENCES pins(pin_id),
    list_id uuid REFERENCES lists(list_id),
    interaction_type TEXT CHECK (interaction_type IN ('view', 'click', 'time_spent')),
    duration INTEGER, -- Time spent in seconds, applicable for 'time_spent' interaction_type
    interacted_at timestamptz DEFAULT NOW()
);
```

To track how content spreads and its virality, tracking each share, including the platform it was shared to and whether those shares lead to new users or interactions.

```sql
CREATE TABLE content_shares (
    id SERIAL PRIMARY KEY,
    pin_id uuid REFERENCES pins(pin_id),
    list_id uuid REFERENCES lists(list_id),
    shared_by uuid REFERENCES profiles(id),
    shared_to_platform TEXT, -- e.g., 'Facebook', 'Twitter', 'WhatsApp'
    shared_at timestamptz DEFAULT NOW(),
    resulted_in_signup BOOLEAN DEFAULT FALSE,
    resulted_in_interaction BOOLEAN DEFAULT FALSE
);
```

## User Preferences

```sql
CREATE TABLE user_preferences (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    dark_mode BOOLEAN DEFAULT FALSE,
    notification_enabled BOOLEAN DEFAULT TRUE,
    notification_frequency TEXT DEFAULT 'daily', -- Options might include 'never', 'daily', 'weekly'
    location_sharing_enabled BOOLEAN DEFAULT FALSE,
    language TEXT DEFAULT 'English',
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for user preferences
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY user_preferences_view ON user_preferences
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY user_preferences_update ON user_preferences
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Trigger to automatically update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_user_preferences_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_preferences_timestamp
BEFORE UPDATE ON user_preferences
FOR EACH ROW EXECUTE FUNCTION update_user_preferences_timestamp();
```

# Task

Here is an out-dated schema for the database. It is a diagram entity-relationship diagram (ERDs). Each key of a SQL Table shape defines a row. The primary value (the thing after the colon) of each row defines its type. The constraint value of each row defines its SQL constraint. I define a foreign key connection between two tables by using the `->` operator between two rows.

```
classes: {
  trigger: {
    style: {
      stroke-dash: 3
      stroke: red
    }
  }
}

# Main Tables
tables: "Main Tables" {
  profiles: {
    shape: sql_table
    id: uuid {constraint: primary_key}
    updated_at: timestamptz {constraint: default(now())}
    username: text {constraint: unique}
    first_name: text
    last_name: text
    email: text {constraint: unique}
    gender: text
    bio: text {constraint: default('Hello!')}
    date_of_birth: date
    created_date: timestamptz {constraint: default(now())}
    last_login: timestamptz {constraint: default(now())}
    avatar_url: text
    account_status: text
    # Profile Stats
    pin_count: int {constraint: default(0)}
    followers_count: int {constraint: default(0)}
    following_count: int {constraint: default(0)}
  }

  pins: {
    shape: sql_table
    pin_id: uuid {constraint: primary_key}
    places_id: text {constraint: foreign_key -> places.places_id}
    user_id: uuid {constraint: foreign_key -> profiles.id}
    pin_photo_url: text
    pin_name: text
    notes: text
    created_at: timestamptz {constraint: default(now())}
    updated_at: timestamptz {constraint: default(now())}
    visited: boolean {constraint: default(false)}
    visited_at: timestamptz
    copied_from_pin_id: uuid {constraint: foreign_key -> pins.pin_id}
    deviation_count: int {constraint: default(0)}
    review: text
    rating: smallint
    review_updated_at: timestamptz
    private: boolean {constraint: default(false)}
    bookmark_count: int {constraint: default(0)}
  }

  lists: {
    shape: sql_table
    list_id: uuid {constraint: primary_key}
    user_id: uuid {constraint: foreign_key}
    name: text
    description: text
    created_at: timestamptz
    updated_at: timestamptz
    private: boolean
    list_photo_url: text
    followers_count: int {constraint: default(0)}
  }

  places: {
    shape: sql_table
    places_id: text {constraint: primary_key}
    name: text
    formatted_address: text
    lat: decimal(9,6)
    lng: decimal(9,6)
    types: "text[]"
    maps_url: text
    website: text
    price_level: int
    opening_hours: jsonb
    phone_number: text
    created_at: timestamptz {constraint: default(now())}
    updated_at: timestamptz {constraint: default(now())}
    places_photo_url: text
  }

  comments: {
    shape: sql_table
    id: uuid {constraint: primary_key}
    user_id: uuid {constraint: foreign_key}
    pin_id: uuid {constraint: foreign_key}
    comment: text
    created_at: timestamptz {constraint: default(now())}
    updated_at: timestamptz
  }

  notifications: {
    shape: sql_table
    id: uuid {constraint: primary_key}
    created_at: timestamptz
    # User to be Notified
    user_id: uuid {constraint: foreign_key}
    notification_type: text
    notification_text: text
    read: boolean {constraint: default(false)}
    read_at: timestamptz
  }

  search_history: {
    shape: sql_table
    id: uuid {constraint: primary_key}
    user_id: uuid {constraint: foreign_key}
    search_term: text
    created_at: timestamptz
  }

  pins.user_id -> profiles.id
  pins.copied_from -> pins.pin_id
  lists.user_id -> profiles.id
  comments.user_id -> profiles.id
  comments.pin_id -> pins.pin_id
  notifications.user_id -> profiles.id
  search_history.user_id -> profiles.id
  pins.places_id -> places.places_id
  # Triggers
  pins.pin_id -> profiles.pin_count: {
    class: trigger
  }
  lists.followers_count -> profiles.followers_count: {
    class: trigger
  }
  pins.pin_id -> notifications.notification_type: "Deviation" {
    class: trigger
  }
  comments.pin_id -> notifications.notification_type: "Comment" {
    class: trigger
  }
}

tables.profiles.avatar_url -> images.avatars.avatar_url
tables.pins.pin_photo_url -> images.pin_photos.pin_photo_url
tables.lists.list_photo_url -> images.list_cover_photos.list_photo_url
tables.places.places_photo_url -> images.places_photos.places_photo_url

# Join Tables
joins: "Join Tables" {
  list_pin: {
    shape: sql_table
    id: serial {constraint: primary_key}
    dt: timestamptz {constraint: default(now())}
    list_id: uuid {constraint: foreign_key}
    pin_id: uuid {constraint: foreign_key}
  }

  bookmarks: {
    shape: sql_table
    id: serial {constraint: primary_key}
    dt: timestamptz {constraint: default(now())}
    # The user who Bookmarked the Pin
    user_id: uuid {constraint: foreign_key}
    pin_id: uuid {constraint: foreign_key}
  }

  follows: {
    shape: sql_table
    id: serial {constraint: primary_key}
    dt: timestamptz {constraint: default(now())}
    # User who is following the list
    user_id: uuid {constraint: foreign_key}
    list_id: uuid {constraint: foreign_key}
  }
}

joins.list_pin.list_id -> tables.lists.list_id
joins.list_pin.pin_id -> tables.pins.pin_id
joins.bookmarks.user_id -> tables.profiles.id
joins.bookmarks.pin_id -> tables.pins.pin_id
joins.follows.list_id -> tables.lists.list_id
joins.follows.user_id -> tables.profiles.id
# Triggers
joins.bookmarks.pin_id -> tables.pins.bookmark_count: {
  class: trigger
}
joins.follows.list_id -> tables.lists.followers_count: {
  class: trigger
}
joins.follows.user_id -> tables.profiles.following_count: {
  class: trigger
}
joins.follows.user_id -> tables.notifications.notification_type: "Followed" {
  class: trigger
}
joins.bookmarks.user_id -> tables.notifications.notification_type: "Bookmarked" {
  class: trigger
}

# Image Storage Buckets
images: "Image Storage Buckets" {
  pin_photos: {
    shape: cylinder
    pin_photo_url
  }

  avatars: {
    shape: cylinder
    avatar_url
  }

  list_cover_photos: {
    shape: cylinder
    list_photo_url
  }

  places_photos: {
    shape: cylinder
    places_photo_url
  }
}

misc: "Misc Tables" {
  # Table to store Contact Submissions
  feedback: {
    shape: sql_table
    id: serial {constraint: primary_key}
    user_id: uuid {constraint: foreign_key}
    message: text,
    dt: timestamptz {constraint: default(now())}
  }
}

misc.feedback.user_id -> tables.profiles.id

audit: "Audit & Analytics" {
  # Table to store Audit Logs
  audit_log: {
    shape: sql_table
    id: serial {constraint: primary_key}
    user_id: uuid {constraint: foreign_key}
    action: text
    dt: timestamptz {constraint: default(now())}
  }
}
```

Add in these tables:

```sql
CREATE TABLE audit_logs (
    id SERIAL PRIMARY KEY,
    table_name TEXT NOT NULL,
    column_name TEXT,
    row_id TEXT NOT NULL,
    old_value TEXT,
    new_value TEXT,
    operation_type TEXT NOT NULL CHECK (operation_type IN ('INSERT', 'UPDATE', 'DELETE')),
    changed_by uuid REFERENCES profiles(id),
    changed_at timestamptz DEFAULT NOW()
);

-- Create a generic audit trigger function that can be applied to multiple tables. This function dynamically captures table name, operation type, and the changing user's ID.

CREATE OR REPLACE FUNCTION log_generic_changes()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'UPDATE' THEN
        INSERT INTO audit_logs (table_name, column_name, row_id, old_value, new_value, operation_type, changed_by, changed_at)
        SELECT TG_TABLE_NAME, column_name, NEW.id::TEXT, OLD.value, NEW.value, TG_OP, NEW.user_id, NOW()
        FROM jsonb_each_text(to_jsonb(OLD)) AS OLD(column_name, value)
        JOIN jsonb_each_text(to_jsonb(NEW)) AS NEW(column_name, value) ON OLD.column_name = NEW.column_name
        WHERE OLD.value IS DISTINCT FROM NEW.value;
    ELSIF TG_OP = 'DELETE' THEN
        INSERT INTO audit_logs (table_name, row_id, operation_type, changed_by, changed_at)
        VALUES (TG_TABLE_NAME, OLD.id::TEXT, TG_OP, OLD.user_id, NOW());
    ELSIF TG_OP = 'INSERT' THEN
        INSERT INTO audit_logs (table_name, row_id, operation_type, changed_by, changed_at)
        VALUES (TG_TABLE_NAME, NEW.id::TEXT, TG_OP, NEW.user_id, NOW());
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- apply triggers to your other tables (pins, lists, places, etc.) using the generic audit function. You'll need to create a trigger for each table.

-- pins
CREATE TRIGGER pins_audit
AFTER INSERT OR UPDATE OR DELETE ON pins
FOR EACH ROW EXECUTE FUNCTION log_generic_changes();
-- lists
CREATE TRIGGER lists_audit
AFTER INSERT OR UPDATE OR DELETE ON lists
FOR EACH ROW EXECUTE FUNCTION log_generic_changes();
-- places
CREATE TRIGGER places_audit
AFTER INSERT OR UPDATE OR DELETE ON places
FOR EACH ROW EXECUTE FUNCTION log_generic_changes();
-- follows
CREATE TRIGGER follows_audit
AFTER INSERT OR UPDATE OR DELETE ON follows
FOR EACH ROW EXECUTE FUNCTION log_generic_changes();
-- bookmarks
CREATE TRIGGER bookmarks_audit
AFTER INSERT OR UPDATE OR DELETE ON bookmarks
FOR EACH ROW EXECUTE FUNCTION log_generic_changes();
-- Trigger to capture changes
CREATE TRIGGER profile_changes_audit
AFTER INSERT OR UPDATE OR DELETE ON profiles
FOR EACH ROW EXECUTE FUNCTION log_generic_changes();
```

Store user interactions and behaviors in a more granular way.

```sql
CREATE TABLE user_interactions (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES profiles(id) NOT NULL,
    pin_id uuid REFERENCES pins(pin_id),
    list_id uuid REFERENCES lists(list_id),
    interaction_type TEXT CHECK (interaction_type IN ('view', 'click', 'time_spent')),
    duration INTEGER, -- Time spent in seconds, applicable for 'time_spent' interaction_type
    interacted_at timestamptz DEFAULT NOW()
);
```

To track how content spreads and its virality, tracking each share, including the platform it was shared to and whether those shares lead to new users or interactions.

```sql
CREATE TABLE content_shares (
    id SERIAL PRIMARY KEY,
    pin_id uuid REFERENCES pins(pin_id),
    list_id uuid REFERENCES lists(list_id),
    shared_by uuid REFERENCES profiles(id),
    shared_to_platform TEXT, -- e.g., 'Facebook', 'Twitter', 'WhatsApp'
    shared_at timestamptz DEFAULT NOW(),
    resulted_in_signup BOOLEAN DEFAULT FALSE,
    resulted_in_interaction BOOLEAN DEFAULT FALSE
);
```

## User Preferences

```sql
CREATE TABLE user_preferences (
    id SERIAL PRIMARY KEY,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    dark_mode BOOLEAN DEFAULT FALSE,
    notification_enabled BOOLEAN DEFAULT TRUE,
    notification_frequency TEXT DEFAULT 'daily', -- Options might include 'never', 'daily', 'weekly'
    location_sharing_enabled BOOLEAN DEFAULT FALSE,
    language TEXT DEFAULT 'English',
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW()
);

-- Enable Row Level Security (RLS) for user preferences
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
CREATE POLICY user_preferences_view ON user_preferences
    FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY user_preferences_update ON user_preferences
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Trigger to automatically update 'updated_at' timestamp
CREATE OR REPLACE FUNCTION update_user_preferences_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_preferences_timestamp
BEFORE UPDATE ON user_preferences
FOR EACH ROW EXECUTE FUNCTION update_user_preferences_timestamp();
```