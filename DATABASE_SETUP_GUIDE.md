# 🗄️ Database Setup Guide - Supabase

## ❌ **Masalah yang Ditemukan**

Error: `Could not find the table 'public.siswa' in the schema cache`

Ini terjadi karena tabel belum dibuat di Supabase. Mari kita setup database dengan benar.

## ✅ **Langkah-langkah Setup Database**

### **1. Buat File Environment Variables**

Buat file `.env.local` di root project dengan isi:

```env
NEXT_PUBLIC_SUPABASE_URL=https://epgcvasqbokathjvuyal.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwZ2N2YXNxYm9rYXRoanZ1eWFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5OTA2MDUsImV4cCI6MjA3NDU2NjYwNX0.jvWc5_j8VMo7MzrXQSMmkjAgy9_1Rrj-vGrH7snQSH0
```

### **2. Buat Tabel di Supabase**

Buka Supabase Dashboard → SQL Editor → Jalankan script berikut:

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

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE public.siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sesi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kegiatan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jawaban ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
-- Siswa policies
CREATE POLICY "Public siswa are viewable by everyone." ON public.siswa
  FOR SELECT USING (true);
CREATE POLICY "Anyone can insert siswa." ON public.siswa
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update siswa." ON public.siswa
  FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete siswa." ON public.siswa
  FOR DELETE USING (true);

-- Sesi policies
CREATE POLICY "Public sesi are viewable by everyone." ON public.sesi
  FOR SELECT USING (true);
CREATE POLICY "Anyone can insert sesi." ON public.sesi
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update sesi." ON public.sesi
  FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete sesi." ON public.sesi
  FOR DELETE USING (true);

-- Kegiatan policies
CREATE POLICY "Public kegiatan are viewable by everyone." ON public.kegiatan
  FOR SELECT USING (true);
CREATE POLICY "Anyone can insert kegiatan." ON public.kegiatan
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update kegiatan." ON public.kegiatan
  FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete kegiatan." ON public.kegiatan
  FOR DELETE USING (true);

-- Jawaban policies
CREATE POLICY "Public jawaban are viewable by everyone." ON public.jawaban
  FOR SELECT USING (true);
CREATE POLICY "Anyone can insert jawaban." ON public.jawaban
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update jawaban." ON public.jawaban
  FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete jawaban." ON public.jawaban
  FOR DELETE USING (true);
```

### **3. Seed Data Sesi dan Kegiatan**

Setelah tabel dibuat, jalankan script untuk seed data:

```bash
node scripts/seed-sessions.js
```

Atau jalankan SQL berikut di Supabase untuk seed data manual:

```sql
-- Insert Sesi
INSERT INTO public.sesi (nama_sesi, deskripsi) VALUES
('Sesi 1: Perkenalan & Pre-Test', 'Sesi perkenalan dan pre-test untuk mengukur pengetahuan awal siswa tentang bullying'),
('Sesi 2: Kenali Bullying', 'Mengenali berbagai bentuk dan dampak bullying'),
('Sesi 3: Berani Bicara', 'Membangun keberanian untuk melaporkan dan membela diri'),
('Sesi 4: Kawan Sejati', 'Membangun persahabatan yang sehat dan mendukung'),
('Sesi 5: Coping Cerdas', 'Strategi mengatasi stress dan emosi negatif'),
('Sesi 6: Kendalikan Bullying', 'Strategi mencegah dan menghentikan bullying'),
('Sesi 7: Refleksi Cerita Inspiratif', 'Refleksi melalui cerita inspiratif dan pembelajaran'),
('Sesi 8: Post-Test & Penutup', 'Evaluasi akhir dan penutupan program');

-- Insert Kegiatan untuk Sesi 1
INSERT INTO public.kegiatan (sesi_id, nama_kegiatan, deskripsi) 
SELECT s.id, k.nama_kegiatan, k.deskripsi
FROM public.sesi s
CROSS JOIN (VALUES
  ('Ice Breaking', 'Perkenalan diri dan kalimat positif'),
  ('Sharing Ekspektasi', 'Berbagi harapan tentang program anti-bullying'),
  ('Pre-Test', 'Tes awal untuk mengukur pengetahuan tentang bullying')
) AS k(nama_kegiatan, deskripsi)
WHERE s.nama_sesi = 'Sesi 1: Perkenalan & Pre-Test';
```

### **4. Restart Aplikasi**

Setelah setup database selesai, restart aplikasi:

```bash
npm run dev
```

## 🔍 **Troubleshooting**

### **Error: "Could not find the table"**
- Pastikan tabel sudah dibuat di Supabase
- Cek apakah RLS policies sudah dibuat
- Pastikan environment variables sudah benar

### **Error: "Failed to create siswa"**
- Cek koneksi ke Supabase
- Pastikan tabel `siswa` sudah ada
- Cek apakah ada error di console browser

### **Error: "PGRST205"**
- Tabel belum dibuat di Supabase
- Jalankan SQL script untuk membuat tabel
- Pastikan nama tabel sesuai (lowercase)

## ✅ **Verifikasi Setup**

Setelah setup selesai, cek:

1. **Tabel di Supabase**: Buka Supabase Dashboard → Table Editor
2. **API Routes**: Test `http://localhost:3000/api/siswa`
3. **Form Sesi 1**: Coba isi form di `/sesi/perkenalan-pretest`

## 🎯 **Hasil yang Diharapkan**

Setelah setup database selesai:

- ✅ Form Sesi 1 bisa submit data
- ✅ Data siswa tersimpan di Supabase
- ✅ Data jawaban tersimpan di Supabase
- ✅ Dashboard admin bisa menampilkan data
- ✅ Export Excel berfungsi

**Setup database selesai dan sistem siap digunakan!** 🚀


