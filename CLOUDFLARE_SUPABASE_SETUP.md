# Cloudflare Workers + Supabase

Website ini memakai Next.js dengan App Router dan Pages Router, termasuk endpoint `/api/*`. Seluruh aplikasi berjalan sebagai satu Cloudflare Worker melalui OpenNext; Supabase menyimpan data di PostgreSQL. Cloudflare Pages dengan output HTML statis saja tidak menjalankan API tersebut.

Alamat utama yang dikonfigurasi di `wrangler.jsonc` adalah `antibully.ngaskep.web.id`. Hostname `workers.dev` tetap tersedia sebagai alamat cadangan.

## 1. Siapkan Supabase

1. Pilih atau buat project Supabase. Di SQL Editor, jalankan `scripts/admin-backend.sql` setelah meninjau kebijakan RLS yang sudah ada. Script ini mempertahankan baris yang ada dan menghapus kebijakan lama bernama `Public access` pada empat tabel aplikasi. Kebijakan lain yang pernah dibuat perlu ditinjau juga.
2. Catat Project URL dan **service role key** atau secret key server dari pengaturan API project. Key ini melewati RLS: simpan hanya sebagai secret server, jangan pakai `NEXT_PUBLIC_`, masukkan ke Git, atau kirim lewat chat.
3. Untuk pengembangan Next.js di komputer sendiri, tambahkan `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` ke `.env.local`. Gunakan project uji terpisah bila ada data siswa sungguhan. Setelah konfigurasi diisi, restart `npm run dev`.

Data lama di folder `data` **tidak dipindahkan otomatis** ke Supabase. Migrasi harus menjaga relasi dan diuji terlebih dahulu; siapkan cadangan sebelum migrasi. Tabel `sesi` yang belum ada akan diisi otomatis oleh backend. Di Workers, `STORAGE_BACKEND=supabase` membuat aplikasi menolak operasi data bila konfigurasi Supabase belum tersedia; tidak ada fallback ke penyimpanan lokal.

## 2. Siapkan Cloudflare

1. Jalankan `npx wrangler login` di terminal dan selesaikan login Cloudflare di browser. Pastikan akun dan project yang dipilih sesuai.
2. Build Worker dengan `npm run cf:build`. Script ini membangun salinan sementara tanpa file `.env*`, `.dev.vars*`, atau folder `data`, karena OpenNext dapat memasukkan isi file environment ke bundle. Untuk memeriksa bundle tanpa menerbitkan, jalankan `npx wrangler deploy --dry-run --outdir .wrangler/dry-run`. Jangan menjalankan `opennextjs-cloudflare build` langsung di folder yang berisi secret.
3. Isi `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, dan `ADMIN_SESSION_SECRET` di `.env.local`. Password admin minimal 12 karakter; secret sesi minimal 32 karakter. Jangan memakai password contoh. Untuk produksi, atur kredensial admin yang terpisah dari lingkungan uji.
4. Deployment dapat dijalankan dengan `npm run cf:deploy` setelah akun dan database siap. Script ini memeriksa bundle, lalu mengirim keempat nilai sebagai secret Cloudflare melalui file sementara yang dihapus setelahnya. Nama Worker default `antibullying-program` dapat diubah di `wrangler.jsonc` sebelum deployment. Script menggunakan `--keep-vars` agar variabel yang diatur lewat dashboard tidak terhapus.

Untuk memasukkan secret dari terminal, gunakan `npx wrangler secret put NAMA_SECRET`, lalu ketik nilainya di prompt yang disediakan. Perintah tersebut dapat membuat versi dan langsung menerbitkannya; gunakan dashboard atau workflow versi Cloudflare yang sesuai bila perlu meninjau sebelum tayang. Jangan menaruh nilai secret di command history, `wrangler.jsonc`, atau file yang dilacak Git.

OpenNext memperingatkan bahwa dukungan build langsung di Windows belum sepenuhnya stabil. Jika build bermasalah, gunakan WSL dengan versi Node yang didukung; development Next.js lokal tetap bisa memakai `npm run dev`.

## 3. Verifikasi

- Buka halaman utama dan sesi, pastikan tautan dan video berjalan.
- Login di `/admin`, lalu uji pendaftaran dan jawaban menggunakan **project uji** dan data uji; pastikan data tampil setelah memuat ulang.
- Pastikan permintaan tanpa login ke `/api/admin/stats`, `/api/siswa`, dan `/api/jawaban` ditolak.
- Pastikan data uji tidak tercampur dengan data siswa sebenarnya. Jangan jalankan tes tulis ke project produksi tanpa persetujuan dan rencana pembersihan.

Login admin saat ini memakai satu password bersama, dengan pembatasan percobaan di memori per instance. Sebelum penggunaan publik oleh sekolah, tambahkan identitas admin per pengguna dan rate limiting terpusat; pembatasan memori Workers tidak cukup untuk deployment terdistribusi.
