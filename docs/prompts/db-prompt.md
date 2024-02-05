This is an overview of "Mapin", an app I am building:

## Problem Statement: What Problem am I Solving?

The problem is that people, including myself, struggle to organize, view and share lists of places they want to visit. If you're in a location and happen to become hungry for example, how can you easily see the restaurants recommendations you've always wanted to go to that also happen to be nearby?

Mapin is a social media allows users to create lists of places they want to visit, categorize them (e.g. restaurants, museums, parks), and then view those lists based on their current location or search for specific places on the list. This would make it easy for users to quickly find and visit places they've been wanting to go to, without having to spend time searching for them each time they're in a new location.

The note section is the quickest, and what people use, but lacks 2 things: organization as well as community. Mapin provides both, while also prioritizing the speed and ease the notes section provides.

**UVP**: A **quick**, at-hand app to jot down, sort, **organize, view** and **share** places to visit.

Mapin: The social app to organize and explore your desired destinations. Quickly and easily create, categorize, and access your lists based on your location or search, share them with friends, and discover new places with the community.

Mapin is the ultimate solution for organizing, sharing, and exploring places to visit. With Mapin, users can easily create categorized lists of places they want to visit, and access them instantly based on their current location or search for specific places on the list. Mapin provides a community-driven platform for discovering and sharing recommendations with like-minded travelers. Say goodbye to disorganized notes and hello to hassle-free travel planning with Mapin

## MVP Features

The main premise is adding "Pins" which are Locations, with Notes, and organising them into "Lists". We want to hone in on the social aspect to leverage Network Effects.

- **Explore:** A search bar for specific locations/categories, rather than just browsing through a feed.
- **Profile:** Includes user reviews & ratings of the places they've visited.
  - Adds a layer of social interaction and community engagement to the app, as well as providing valuable feedback for other users.
- Users will have lists and pins. We want to keep track of users lists, and the pins they have allocated to each list.
- A single pin cannot be in multiple lists.
- Users can follow other lists
- Pins can have comments from people
- User can add notes to a Pin they add
- Users can mark Pins as visited, at which point they can put up a review which will be visible on their profile
- A pin can be bookmarked in addition to the option to add them to lists. This would allow users to easily save pins they're interested in without having to create a new list every time. The Bookmarked List is Private by default.
- All locations will be mapped to locations from the Google API.
- 'Create Deviation' feature
  - encourage user engagement and community building
  - users can replicate a pin they see in their feed and edit it how they want. The original pin will have a 'variants' counter, similar to likes, to see how many times the pin and its derivations were replicated.
  - The "derivations" counter could also be a useful metric for measuring the popularity and influence of a particular pin. This could help users discover new pins and lists that are trending or have a high level of engagement. It could also help with the reccomendation engine down the line
- Google Maps/Yelp API to provide additional information and context for pins.
  - ratings & reviews for restaurants
  - How busy a park is in real-time.
- **Discover:** Recommends lists or pins based on a user's location & interests.
  - This could help users discover new places they might not have otherwise known about.
- By default, all pins are private, unless they are put into a public list
- Analytics features to track user behavior and engagement with the app
  - **User acquisition:** Tracking the source of new users (e.g. social media, search engines, app stores, etc.) can help to identify which marketing channels are most effective
  - **Feature usage:** Knowing which features of the app are being used most frequently and which are being ignored can help to prioritize development efforts and improve the user experience
  - **User demographics:** Collecting data on user demographics such as age, gender, location, and occupation can help to understand the app's user base and tailor the app's content and features to their needs.
- Push notifications for different actions such as when someone follows their list or comments on a pin
- Offline mode allows users to view and edit their pins and lists when they don't have an internet connection.
- Home:
  - more like Instagram, where at the top there is a toggle between a users feed, and explore. In the feed, users are able to scroll through pins and lists updates from lists they are following. This way, when they come across a pin they are interested in, they are able to create a 'Deviation'. In the explore mode, there is a search bar for specific locations/categories, rather than just browsing through a feed, as well as recommended pins similar to Instagram's explore page.

## Screens

### Screens Features

1.  Feed
    - 2 types of Content:
      - x Visted & Sent a Review
      - x Added Pin to list 1. Option to create Variant
    - Notifications
      - People Following your Lists
      - People Commenting on your Pins
2.  Explore
3.  Map
    - Filter by:
      - All (Including Bookmarks)
      - All My Own
      - List (My own and Followed Lists)
4.  Add Pin
    - Mainly Autofill from Google Maps
    - Optional to add to list
      - Auto pull cover from google.
      - Notes
      - Add Auto Tags & Let Edit
    - Quick
      - By default, pins are private
      - Can add Optional Tags
5.  Derivation of Pin
    - Increase Derivation Number - no notification for these
    - Can edit details / notes
6.  Pins
    - Analogous to Notes page
    - View all, edit, delete, sort, filter, add to list
    - Can set a pin as visited ONCE
7.  Pin
    - Notes, location and
8.  Lists
    - public or private list
    - New List
9.  Profile
    - See lists with follow count
    - Cum Followers of all lists (inc duplicate users)
    - Lists followed
    - Pins, Followers, Following
10. - Import
    - From CSV
11. help develop this app section
    - User Feedback

I am building out the database at the moment. Here is the schema for the database. It is a diagram entity-relationship diagram (ERDs). Each key of a SQL Table shape defines a row. The primary value (the thing after the colon) of each row defines its type. The constraint value of each row defines its SQL constraint.I define a foreign key connection between two tables by using the `->` operator between two rows.

```
# Main Tables
tables: "Main Tables" {
  profiles: {
    shape: sql_table
    id: uuid {constraint: primary_key}
    updated_at: timestamptz
    username: text {constraint: unique}
    first_name: text
    last_name: text
    email: text {constraint: unique}
    gender: text
    bio: text
    date_of_birth: date
    created_date: timestamptz
    last_login: timestamptz
    avatar_url: text {constraint: foreign_key}
    account_status: text
  }

  pins: {
    shape: sql_table
    pin_id: uuid {constraint: primary_key}
    places_id: text {constraint: foreign_key}
    user_id: uuid {constraint: foreign_key}
    pin_photo_url: text {constraint: foreign_key}
    pin_name: text
    address_str: text
    category: text
    lat: decimal(9,6)
    lng: decimal(9,6)
    notes: text
    created_at: timestamptz {constraint: default(now())}
    updated_at: timestamptz {constraint: default(now())}
    visited: boolean {constraint: default(false)}
    visited_at: timestamptz
    copied_from_pin_id: uuid {constraint: foreign_key}
    deviation_count: int
    review: text
    rating: int8
    review_updated_at: timestamptz
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
    list_photo_url: text {constraint: foreign_key}
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
  pins.places_id -> places.id
}

tables.profiles.avatar_url -> images.avatars.avatar_url
tables.pins.pin_photo_url -> images.pin_photos.pin_photo_url
tables.lists.list_photo_url -> images.list_cover_photos.list_photo_url

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
    id: int {constraint: primary_key}
    dt: timestamptz {constraint: default(now())}
    # The user who Bookmarked the Pin
    user_id: uuid {constraint: foreign_key}
    pin_id: uuid {constraint: foreign_key}
  }

  follows: {
    shape: sql_table
    id: int {constraint: primary_key}
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

```

This is what i have written so far.
Set up DB Schema in Supabase. This is the SQL to set up the database schema:

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

Table for places. Here we will store the Google Data:

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
    updated_at timestamptz DEFAULT NOW()
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

## Pins

```sql
-- Create table for pins
CREATE TABLE pins (
    pin_id uuid PRIMARY KEY,
    places_id TEXT REFERENCES public.places(places_id) ON DELETE SET NULL,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    pin_photo_url TEXT,
    pin_name TEXT NOT NULL,
    address_str TEXT,
    category TEXT,
    lat decimal(9,6) NOT NULL, -- Latitude, decimal degrees format
    lng decimal(9,6) NOT NULL, -- Longitude, decimal degrees format
    notes text,
    created_at timestamptz DEFAULT NOW(),
    updated_at timestamptz DEFAULT NOW(),
    visited boolean DEFAULT FALSE,
    visited_at timestamptz,
    copied_from_pin_id uuid REFERENCES public.pins(pin_id) ON DELETE SET NULL,
    deviation_count int DEFAULT 0,
    review text,
    rating int8,
    review_updated_at timestamptz,
    private boolean DEFAULT FALSE,
    price_level int
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

# The task

Review and correct any mistakes in the SQL code. Are there any oversights or potential issues with the schema? Are there any improvements that could be made to the schema? Are there any additional features that could be added to the schema to improve the application?
