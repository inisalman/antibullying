-- Run in the Supabase SQL editor using an administrator account.
-- The server accesses these tables only with SUPABASE_SERVICE_ROLE_KEY.
create extension if not exists pgcrypto;

create table if not exists public.siswa (
  id uuid primary key default gen_random_uuid(), nama text not null, kelas text not null,
  sekolah text, email text, created_at timestamptz default now(), updated_at timestamptz default now()
);
alter table public.siswa add column if not exists sekolah text;
create table if not exists public.sesi (
  id uuid primary key default gen_random_uuid(), nama_sesi text not null unique,
  deskripsi text, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.kegiatan (
  id uuid primary key default gen_random_uuid(), sesi_id uuid not null references public.sesi(id),
  nama_kegiatan text not null, deskripsi text, created_at timestamptz default now(), updated_at timestamptz default now()
);
create table if not exists public.jawaban (
  id uuid primary key default gen_random_uuid(), siswa_id uuid not null references public.siswa(id),
  kegiatan_id uuid not null references public.kegiatan(id), jawaban text not null, timestamp timestamptz default now()
);

alter table public.siswa enable row level security;
alter table public.sesi enable row level security;
alter table public.kegiatan enable row level security;
alter table public.jawaban enable row level security;

-- Remove the older setup's public-access policies without changing stored rows.
drop policy if exists "Public access" on public.siswa;
drop policy if exists "Public access" on public.sesi;
drop policy if exists "Public access" on public.kegiatan;
drop policy if exists "Public access" on public.jawaban;

revoke all privileges on table public.siswa, public.sesi, public.kegiatan, public.jawaban from anon, authenticated;
grant all privileges on table public.siswa, public.sesi, public.kegiatan, public.jawaban to service_role;

create index if not exists kegiatan_sesi_id_idx on public.kegiatan(sesi_id);
create index if not exists jawaban_kegiatan_id_idx on public.jawaban(kegiatan_id);
create index if not exists jawaban_siswa_id_idx on public.jawaban(siswa_id);
