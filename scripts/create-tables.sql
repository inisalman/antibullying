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