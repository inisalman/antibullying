# Google Sheets Integration

## Overview
Aplikasi anti-bullying sekarang terintegrasi dengan Google Sheets untuk menyimpan semua jawaban siswa secara otomatis. Setiap jawaban yang disubmit akan disimpan ke Google Sheets dengan format yang terstruktur.

## Konfigurasi

### Service Account Credentials
Aplikasi menggunakan Google Service Account untuk mengakses Google Sheets API:

```javascript
// lib/googleSheets.js
const GOOGLE_SHEET_ID = "1_z6EiJdOqOgHsGkKIf4pbJZ4NLYMm81PiMZbl0xKiIo";
const SERVICE_ACCOUNT_KEY = {
  "private_key": "-----BEGIN PRIVATE KEY-----\n...",
  "client_email": "sheetsserviceaccount@antibully-473603.iam.gserviceaccount.com"
  // ... other credentials
};
```

### Struktur Data Google Sheets

Setiap sesi akan memiliki sheet/tab terpisah dengan nama "Sesi X" (contoh: "Sesi 1", "Sesi 2", dst.).

**Header kolom:**
- **Timestamp**: Waktu submit jawaban (format Indonesia)
- **Nama**: Nama siswa
- **Sesi**: Nomor sesi
- **Kegiatan**: Nama kegiatan/aktivitas
- **Jawaban**: Jawaban siswa (JSON string jika objek)

## Fitur Utama

### 1. Auto-Save Jawaban
Setiap kali siswa mengsubmit jawaban melalui API `/api/jawaban`, data otomatis tersimpan ke:
- Database lokal (existing)
- Google Sheets (new)

### 2. Auto-Create Sheets
- Jika tab/sheet untuk sesi belum ada, akan dibuat otomatis
- Header akan ditambahkan secara otomatis
- Data baru ditambahkan di baris berikutnya

### 3. Batch Processing
Script untuk memindahkan data existing ke Google Sheets:
```bash
node scripts/sync-to-google-sheets.js
```

### 4. Testing & Monitoring
Script test untuk memverifikasi integrasi:
```bash
node scripts/test-google-sheets.js
```

## API Endpoints

### 1. Submit Jawaban (Updated)
**POST** `/api/jawaban`
```json
{
  "siswaId": "id_siswa",
  "kegiatanId": "id_kegiatan", 
  "jawaban": "jawaban_siswa"
}
```
**Response:** Jawaban tersimpan di database lokal dan Google Sheets

### 2. Google Sheets Sync
**POST** `/api/jawaban/google-sheets`
```json
{
  "action": "sync_existing" // atau "sync_specific"
}
```

**GET** `/api/jawaban/google-sheets`
**Response:** Statistik data dan status sync

## Struktur File

```
lib/
├── googleSheets.js          # Utility functions untuk Google Sheets API
└── localDb.js               # Database lokal (existing)

pages/api/
├── jawaban.js               # Updated dengan Google Sheets integration
└── jawaban/
    └── google-sheets.js     # API endpoint untuk sync dan monitoring

scripts/
├── test-google-sheets.js    # Test script untuk integrasi
└── sync-to-google-sheets.js # Script untuk sync data existing
```

## Cara Penggunaan

### 1. Setup Awal
1. Pastikan Google Sheets API sudah dikonfigurasi
2. Service account sudah memiliki akses ke spreadsheet
3. Jalankan test untuk memverifikasi koneksi:
   ```bash
   node scripts/test-google-sheets.js
   ```

### 2. Sync Data Existing
Jika ada data yang sudah ada sebelum integrasi:
```bash
# Lihat statistik data
node scripts/sync-to-google-sheets.js --stats

# Sync semua data
node scripts/sync-to-google-sheets.js
```

### 3. Monitoring
- Cek Google Sheets secara manual untuk memverifikasi data
- Gunakan API `/api/jawaban/google-sheets` untuk monitoring
- Lihat console logs untuk debugging

## Error Handling

### Fallback Strategy
- Jika Google Sheets gagal, data tetap tersimpan di database lokal
- Error dicatat di console tapi tidak mengganggu user experience
- Retry mechanism bisa diimplementasi jika diperlukan

### Common Issues
1. **Authentication Error**: Pastikan service account credentials benar
2. **Permission Error**: Pastikan service account punya akses ke spreadsheet
3. **API Quota**: Google Sheets API punya limit, monitor usage
4. **Network Error**: Implementasi retry atau queue system

## Data Flow

```
User Submit Answer
       ↓
POST /api/jawaban
       ↓
Save to Local DB ✅
       ↓
Get Related Data (siswa, kegiatan, sesi)
       ↓
Format for Google Sheets
       ↓
addAnswerToSheet()
       ↓
Create Sheet if not exists
       ↓
Append Row to Google Sheets ✅
```

## Security

- Service account credentials disimpan di server-side
- Tidak ada data sensitif yang dikirim ke client
- Akses Google Sheets dibatasi melalui service account permissions

## Performance

- Batch processing untuk data besar
- Rate limiting antara batch (2 detik delay)
- Async processing untuk tidak blocking user interface

## Monitoring & Maintenance

### Logs
- Semua operasi Google Sheets dicatat di console
- Success/failure status untuk setiap operasi
- Timestamp untuk tracking

### Backup
- Data tetap tersimpan di database lokal sebagai backup
- Google Sheets sebagai secondary storage dan reporting

## Future Enhancements

1. **Real-time Dashboard**: Live monitoring jawaban di Google Sheets
2. **Data Export**: Export data ke format lain (Excel, CSV)
3. **Analytics**: Integrasi dengan Google Analytics atau tools lain
4. **Notifications**: Alert ketika ada jawaban baru
5. **Data Validation**: Validasi data sebelum save ke Google Sheets

---

**Status**: ✅ **COMPLETED** - Google Sheets integration fully implemented and tested

