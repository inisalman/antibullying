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


