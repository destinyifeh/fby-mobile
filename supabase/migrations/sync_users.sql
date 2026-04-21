-- 1. Ensure existing 'users' table has the necessary columns
alter table public.users 
add column if not exists dob text,
add column if not exists nationality text,
add column if not exists updated_at timestamp with time zone default timezone('utc'::text, now());

-- 2. Enforce unique display_names (usernames)
alter table public.users add constraint users_display_name_key unique (display_name);

-- 3. Enable Security
alter table public.users enable row level security;

-- 4. Create Policies
create policy "Public users are viewable by everyone." on public.users for select using (true);
create policy "Users can update their own data." on public.users for update using (auth.uid() = id);

-- 5. Sync Function (maps app 'username' to 'display_name')
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, email, display_name, dob, nationality, created_at)
  values (
    new.id, 
    new.email,
    new.raw_user_meta_data->>'username', 
    new.raw_user_meta_data->>'dob',
    new.raw_user_meta_data->>'nationality',
    new.created_at
  )
  on conflict (id) do update 
  set 
    email = excluded.email,
    display_name = excluded.display_name,
    dob = excluded.dob,
    nationality = excluded.nationality;
  return new;
end;
$$;

-- 6. Set up the trigger to sync Auth users to the Public users table
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
