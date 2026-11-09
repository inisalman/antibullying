# Backend dan dashboard admin

Untuk deployment Cloudflare Workers dengan Supabase, lihat `CLOUDFLARE_SUPABASE_SETUP.md`.

Dashboard tersedia di `/admin`. Password dan kunci sesi dibaca dari `ADMIN_PASSWORD` dan `ADMIN_SESSION_SECRET`. Untuk pengembangan lokal, isi `.env.local` berdasarkan `.env.example`, lalu jalankan `npm run dev`. Password minimal 12 karakter dan kunci sesi minimal 32 karakter. Jangan membagikan atau memasukkan file `.env.local` ke Git.

Dalam pengembangan lokal tanpa Supabase, data dibaca dan disimpan di folder `data` atau `LOCAL_DATA_DIR`. Penyimpanan file ini ditujukan untuk satu proses lokal, bukan hosting serverless atau banyak server. Cadangkan data lokal secara terpisah.

Untuk deployment, buat project Supabase, jalankan `scripts/admin-backend.sql` di SQL Editor, dan set environment variables `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, dan `ADMIN_SESSION_SECRET` pada penyedia hosting. Kunci service role hanya untuk server dan tidak boleh memiliki awalan `NEXT_PUBLIC_`. Backend akan menolak penyimpanan produksi jika database belum dikonfigurasi. SQL tersebut menonaktifkan kebijakan `Public access` dari setup lama; tinjau kebijakan RLS lain yang mungkin telah dibuat secara terpisah.

Data lokal yang sudah ada tidak otomatis dipindahkan ke Supabase. Migrasi perlu direncanakan dan diuji terlebih dahulu agar relasi siswa, sesi, kegiatan, dan jawaban tetap utuh. Dashboard menampilkan jumlah jawaban dan peserta yang mengirim jawaban, bukan klaim penyelesaian sesi.

Jawaban disimpan ke penyimpanan yang dikonfigurasi; ekspor Excel tersedia untuk admin pada dashboard.

Login admin saat ini menggunakan satu password bersama dan cookie yang berlaku selama delapan jam. Pembatasan percobaan login tersimpan di memori proses, sehingga tidak tersinkronisasi antar-instance atau bertahan setelah restart. Untuk pemakaian publik oleh sekolah, tambahkan sistem identitas per admin dan pembatasan percobaan yang terpusat sebelum mengandalkan sistem ini untuk data siswa.
