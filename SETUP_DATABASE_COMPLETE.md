# 🚀 Setup Database Supabase - Panduan Lengkap

## ✅ **Node.js Upgrade Berhasil!**

- **Sebelum**: Node.js v18.20.8
- **Sekarang**: Node.js v20.19.5
- **Status**: ✅ Upgrade berhasil, warning Supabase sudah hilang!

## 🗄️ **Langkah Setup Database**

### **1. Buat Tabel di Supabase Dashboard**

1. **Buka Supabase Dashboard**: https://supabase.com/dashboard
2. **Pilih Project**: `epgcvasqbokathjvuyal`
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

### **2. Seed Data Sesi dan Kegiatan**

Setelah tabel dibuat, jalankan:

```bash
node scripts/seed-sessions.js
```

### **3. Restart Aplikasi**

```bash
npm run dev
```

## ✅ **Verifikasi Setup**

1. **Test Koneksi**: `node scripts/test-connection.js`
2. **Test Form**: Buka `http://localhost:3000/sesi/perkenalan-pretest`
3. **Test Admin**: Buka `http://localhost:3000/admin`

## 🎯 **Hasil yang Diharapkan**

Setelah setup selesai:

- ✅ Node.js 20+ (tidak ada warning Supabase)
- ✅ Form Sesi 1 bisa submit data
- ✅ Data siswa tersimpan di Supabase
- ✅ Data jawaban tersimpan di Supabase
- ✅ Dashboard admin menampilkan data
- ✅ Export Excel berfungsi

## 📝 **Catatan Penting**

1. **Node.js**: Sudah upgrade ke v20.19.5
2. **Environment**: File `.env.local` sudah dibuat
3. **Database**: Tabel harus dibuat di Supabase Dashboard
4. **Policies**: RLS policies harus dibuat untuk akses public
5. **Seed Data**: Jalankan script seed untuk data awal

## 🔧 **Troubleshooting**

### **Error: "Could not find the table"**
- Pastikan tabel sudah dibuat di Supabase
- Cek apakah RLS policies sudah dibuat
- Pastikan environment variables sudah benar

### **Error: "Failed to create siswa"**
- Cek koneksi ke Supabase
- Pastikan tabel `siswa` sudah ada
- Cek apakah ada error di console browser

**Setup database selesai dan sistem siap digunakan!** 🚀


