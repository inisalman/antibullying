# 🚀 Quick Setup - Supabase Database

## ❌ **Masalah Saat Ini**

Error: `Failed to create siswa` karena tabel belum dibuat di Supabase.

## ✅ **Solusi Cepat**

### **1. Buat File Environment Variables**

Buat file `.env.local` di root project:

```bash
# Di terminal, jalankan:
echo 'NEXT_PUBLIC_SUPABASE_URL=https://epgcvasqbokathjvuyal.supabase.co' > .env.local
echo 'NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZ2N2YXNxYm9rYXRoanZ1eWFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA2MDUsImV4cCI6MjA3NDU2NjYwNX0.jvWc5_j8VMo7MzrXQSMmkjAgy9_1Rrj-vGrH7snQSH0' >> .env.local
```

### **2. Buat Tabel di Supabase**

1. **Buka Supabase Dashboard**: https://supabase.com/dashboard
2. **Pilih Project**: epgcvasqbokathjvuyal
3. **Pergi ke SQL Editor**
4. **Jalankan SQL berikut**:

```sql
-- Table: Siswa
CREATE TABLE IF NOT EXISTS public.siswa (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nama text NOT NULL,
    kelas text NOT NULL,
    email text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Table: Sesi
CREATE TABLE IF NOT EXISTS public.sesi (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nama_sesi text NOT NULL UNIQUE,
    deskripsi text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Table: Kegiatan
CREATE TABLE IF NOT EXISTS public.kegiatan (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    sesi_id uuid REFERENCES public.sesi(id) ON DELETE CASCADE,
    nama_kegiatan text NOT NULL,
    deskripsi text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Table: Jawaban
CREATE TABLE IF NOT EXISTS public.jawaban (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    siswa_id uuid REFERENCES public.siswa(id) ON DELETE CASCADE,
    kegiatan_id uuid REFERENCES public.kegiatan(id) ON DELETE CASCADE,
    jawaban text NOT NULL,
    timestamp timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sesi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kegiatan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jawaban ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Public access" ON public.siswa FOR ALL USING (true);
CREATE POLICY "Public access" ON public.sesi FOR ALL USING (true);
CREATE POLICY "Public access" ON public.kegiatan FOR ALL USING (true);
CREATE POLICY "Public access" ON public.jawaban FOR ALL USING (true);
```

### **3. Seed Data Sesi**

Setelah tabel dibuat, jalankan:

```bash
node scripts/seed-sessions.js
```

### **4. Restart Aplikasi**

```bash
npm run dev
```

## ✅ **Verifikasi Setup**

1. **Test Koneksi**: `node scripts/test-connection.js`
2. **Test Form**: Buka `http://localhost:3000/sesi/perkenalan-pretest`
3. **Test Admin**: Buka `http://localhost:3000/admin`

## 🎯 **Hasil yang Diharapkan**

Setelah setup selesai:

- ✅ Form Sesi 1 bisa submit data
- ✅ Data tersimpan di Supabase
- ✅ Dashboard admin menampilkan data
- ✅ Export Excel berfungsi

## 📝 **Catatan Penting**

1. **Environment Variables**: Pastikan `.env.local` sudah dibuat
2. **Database**: Tabel harus dibuat di Supabase Dashboard
3. **Policies**: RLS policies harus dibuat untuk akses public
4. **Seed Data**: Jalankan script seed untuk data awal

**Setup selesai dan sistem siap digunakan!** 🚀


