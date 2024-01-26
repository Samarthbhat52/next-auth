## Getting Started

First, install the required packages:

```bash
npm install
```

## Env variables setup

- Replace the values in `.env.example` file with your supabase project's URL and ANON key values.

- Rename the `.env.example` file to `.env.local`.

## Supabase setup

- Create a new Supabase project.

- Run the following sql commands in the **"SQL editor"** tab of supabase console :

### New user managemt query.

```sql
Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  full_name text,
  email text
);
-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles
  enable row level security;

create policy "Users can view their own profile." on profiles
  for select using (auth.uid() = id);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
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
-- See https://supabase.com/docs/guides/storage#policy-examples for more details.
create policy "Users can access their own avatar" on storage.objects
  for select using ((bucket_id = 'avatars'::text) AND ((auth.uid())::text = (storage.foldername(name))[1]));

create policy "Users can upload their own avatar." on storage.objects
  for insert with check ((bucket_id = 'avatars'::text) AND ((auth.uid())::text = (storage.foldername(name))[1]));

create policy "Users can update their own avatar" on storage.objects
  for update using ((bucket_id = 'avatars'::text) AND ((auth.uid())::text = (storage.foldername(name))[1]));
```

### Access control for the avatars table

```sql
-- Enable row-level security
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy for SELECT operations
CREATE POLICY objects_select_policy ON storage.objects FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy for INSERT operations WITH CHECK !
CREATE POLICY objects_insert_policy ON storage.objects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy for UPDATE operations
CREATE POLICY objects_update_policy ON storage.objects FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Policy for DELETE operations
CREATE POLICY objects_delete_policy ON storage.objects FOR DELETE
  USING (auth.role() = 'authenticated');
```

- Set up email provider in supabase console under `Authentication > Providers`.

- Disable _"confirm email"_ option while enabling email provider.

**_IMPORTANT:_** Google and Github auth requires additional set-up, follow their respective guides.

## Running local server

run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
