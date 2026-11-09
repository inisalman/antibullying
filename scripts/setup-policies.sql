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

-- No public policies: the backend accesses these tables with its service role.


