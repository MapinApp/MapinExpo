-- Enable the http extension for the extensions schema in the Dashboard. Then, define the following SQL functions in the SQL Editor to delete storage objects via the API
create or replace function delete_storage_object(bucket text, object text, out status int, out content text)
returns record
language 'plpgsql'
security definer
as $$
declare
  project_url text := '<YOURPROJECTURL>';
  service_role_key text := '<YOURSERVICEROLEKEY>'; --  full access needed
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

-- Next, add a trigger that removes any obsolete avatar whenever the profile is updated or deleted:

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

-- Finally, delete the public.profile row before a user is deleted. If this step is omitted, you won't be able to delete users without first manually deleting their avatar image

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
