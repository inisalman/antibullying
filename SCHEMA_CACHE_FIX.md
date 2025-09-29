# 🔧 Fix Supabase Schema Cache Issue

## ❌ **Masalah Saat Ini**

Error: `Could not find the table 'public.sesi' in the schema cache`

## 🔍 **Penyebab Masalah**

1. **RLS Policies belum dibuat** - Supabase memerlukan policies untuk akses tabel
2. **Schema cache belum di-refresh** - Tabel ada tapi tidak ter-cache
3. **Permission issues** - Anon key tidak memiliki akses

## ✅ **Solusi Lengkap**

### **1. Buat RLS Policies di Supabase Dashboard**

1. **Buka Supabase Dashboard**: https://supabase.com/dashboard
2. **Pilih Project**: `epgcvasqbokathjvuyal`
3. **Pergi ke SQL Editor**
4. **Jalankan SQL berikut**:

```sql
-- Enable Row Level Security for all tables
ALTER TABLE public.siswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sesi ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kegiatan ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jawaban ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public access" ON public.siswa;
DROP POLICY IF EXISTS "Public access" ON public.sesi;
DROP POLICY IF EXISTS "Public access" ON public.kegiatan;
DROP POLICY IF EXISTS "Public access" ON public.jawaban;

-- Create policies for public access
CREATE POLICY "Public access" ON public.siswa FOR ALL USING (true);
CREATE POLICY "Public access" ON public.sesi FOR ALL USING (true);
CREATE POLICY "Public access" ON public.kegiatan FOR ALL USING (true);
CREATE POLICY "Public access" ON public.jawaban FOR ALL USING (true);
```

### **2. Refresh Schema Cache**

Setelah membuat policies, tunggu beberapa detik untuk schema cache ter-refresh.

### **3. Test Koneksi**

```bash
node scripts/test-schema.js
```

### **4. Seed Data**

```bash
node scripts/seed-sessions.js
```

## 🔧 **Alternatif: Disable RLS (Untuk Development)**

Jika masih bermasalah, Anda bisa disable RLS untuk development:

```sql
-- Disable RLS for development (NOT recommended for production)
ALTER TABLE public.siswa DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.sesi DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.kegiatan DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.jawaban DISABLE ROW LEVEL SECURITY;
```

## 📝 **Catatan Penting**

1. **RLS Policies**: HARUS dibuat untuk akses tabel
2. **Schema Cache**: Butuh waktu untuk refresh
3. **Anon Key**: Harus memiliki permission yang benar
4. **Development**: Bisa disable RLS sementara

## 🎯 **Hasil yang Diharapkan**

Setelah fix:

- ✅ `node scripts/test-schema.js` berhasil
- ✅ `node scripts/seed-sessions.js` berhasil
- ✅ Form Sesi 1 bisa submit data
- ✅ Dashboard admin menampilkan data

**Setup database selesai dan sistem siap digunakan!** 🚀


