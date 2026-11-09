> **Arsip:** Integrasi Google Sheets dan petunjuk Vercel dalam dokumen ini sudah tidak aktif. Gunakan `CLOUDFLARE_SUPABASE_SETUP.md` untuk konfigurasi saat ini.

# 🔧 Setup Environment Variables di Vercel

## Masalah yang Ditemukan

Setelah deploy ke Vercel, data tidak muncul di Google Sheets meskipun ada pesan "submit berhasil". Ini kemungkinan disebabkan oleh:

1. **Environment Variables tidak dikonfigurasi di Vercel**
2. **Google Sheets API credentials tidak tersedia di production**
3. **Error handling yang tidak terlihat di frontend**

## Solusi

### 1. Konfigurasi Environment Variables di Vercel

Anda perlu menambahkan environment variables berikut di dashboard Vercel:

#### A. Buka Vercel Dashboard
1. Login ke [vercel.com](https://vercel.com)
2. Pilih project Anda
3. Go to **Settings** → **Environment Variables**

#### B. Tambahkan Variables Berikut

| Variable Name | Value |
|---------------|-------|
| `GOOGLE_SHEET_ID` | `[sheet-dihapus]` |
| `GOOGLE_PROJECT_ID` | `[project-dihapus]` |
| `GOOGLE_PRIVATE_KEY_ID` | `your-private-key-id` |
| `GOOGLE_PRIVATE_KEY` | `[REMOVED: rotate exposed service account key]\n` |
| `GOOGLE_CLIENT_EMAIL` | `[akun-dihapus]` |
| `GOOGLE_CLIENT_ID` | `your-client-id` |
| `GOOGLE_CLIENT_X509_CERT_URL` | `https://www.googleapis.com/robot/v1/metadata/x509/[akun-dihapus]` |

### 2. Important Notes

#### A. Private Key Format
- **PENTING**: Pastikan private key tetap memiliki `\n` (newline characters)
- Jangan menghapus atau mengubah format private key
- Private key harus dalam format yang sama persis dengan yang diberikan

#### B. Environment Scope
- Set semua variables untuk **Production**, **Preview**, dan **Development**
- Pastikan semua environment memiliki access ke variables

#### C. Redeploy
- Setelah menambahkan environment variables, **redeploy** aplikasi Anda
- Environment variables hanya berlaku setelah redeploy

### 3. Verifikasi Setup

#### A. Check Logs
Setelah redeploy, coba submit jawaban dan check logs di Vercel dashboard:
1. Go to **Functions** tab di Vercel dashboard
2. Click pada function yang error
3. Check **Logs** tab untuk melihat error messages

#### B. Expected Logs
Jika setup benar, Anda akan melihat logs seperti:
```
🔧 Initializing Google Sheets API...
📊 Sheet ID: [sheet-dihapus]
📧 Client Email: [akun-dihapus]
✅ Google Sheets API initialized successfully
🚀 Starting addAnswerToSheet...
📝 Input data: { nama: 'Test', sesi: '1', kegiatan: 'Test', jawaban: 'Test' }
📋 Target sheet: Sesi 1
✅ Answer added to Google Sheets successfully
```

### 4. Troubleshooting

#### A. Jika Masih Error
1. **Check Private Key**: Pastikan private key format benar dengan `\n`
2. **Check Permissions**: Pastikan service account punya akses ke spreadsheet
3. **Check Sheet ID**: Pastikan GOOGLE_SHEET_ID benar
4. **Check Logs**: Lihat error message di Vercel logs

#### B. Common Errors
- `Invalid credentials`: Private key atau client email salah
- `Permission denied`: Service account tidak punya akses ke spreadsheet
- `Sheet not found`: GOOGLE_SHEET_ID salah atau sheet tidak ada

### 5. Testing

Setelah setup environment variables:

1. **Redeploy aplikasi**
2. **Submit jawaban** di aplikasi
3. **Check Google Sheets** untuk data baru
4. **Check Vercel logs** jika masih ada masalah

## 🎯 Expected Result

Setelah setup environment variables dengan benar:
- ✅ Data akan muncul di Google Sheets
- ✅ Logs akan menunjukkan success messages
- ✅ Semua sesi (1-8) akan berfungsi dengan baik

---

**Next Steps**: 
1. Setup environment variables di Vercel
2. Redeploy aplikasi  
3. Test submit jawaban
4. Check Google Sheets untuk data baru
