DROP FUNCTION IF EXISTS handle_new_user cascade;
DROP TRIGGER IF EXISTS on_auth_user_created on auth.users;