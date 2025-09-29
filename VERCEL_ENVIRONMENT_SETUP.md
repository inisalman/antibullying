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
| `GOOGLE_SHEET_ID` | `1_z6EiJdOqOgHsGkKIf4pbJZ4NLYMm81PiMZbl0xKiIo` |
| `GOOGLE_PROJECT_ID` | `antibully-473603` |
| `GOOGLE_PRIVATE_KEY_ID` | `your-private-key-id` |
| `GOOGLE_PRIVATE_KEY` | `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVqXI2kXWelanG\nL23APvv/t4n6AxiYEcMfd3hP7SQVNql3ujp5iDAxdenNaTzspUNMgOmzDAZDKKQo\npzhmDXPxWYbuEBo3FQ8TB5nWji+12+l6a6p+PRuZWkeT5VrpUxu4rjydIgyx4Pns\niqOvUktPZNJhuhs+YUGSRQHGpOCuoVTJ+JifwNCvP+kyM/AYRug9eeygBV8i7c0n\nu1O7DgxZsQ200mqfwOUgm7QfGCa1f7hmjHOBzmz1Q0vilgdSewIQq6Va00MW4VPP\ntZuHOHpcFl/9sltIlA0toPsMpLUgzzwc1S3PZvbKYuM3+YWkVs2g4glKbgZhKKUj\nTlhubZf9AgMBAAECggEAEanigVRhLu0cjf/ZyOzsFGXuCDc9T0UYpn9P+PuX4hEU\nzYsdznJN2ajv3UV3/fBjse1uZJj345F2kM3SQc2W6jsGhqPaJvecuWwFcdFrbFNz\n5+UCwVD3+SOXi0iIzYVLY2c0J6Fq/0GkJ8QGaDYbd8LUCbRDEFMmApul2/BBiu4w\n0KLbD3LW13q2glKcU3JWcxkfXIQKFfLLA6a5rIdkGTk7/off4uGVruwXZiktoKgj\nMY7NaQvPFZYmnVe9chJKVcy/cGDaq73pLkA1aW9N+BHp/5oTAQkX/J48vWFFyDzJ\n0IGQ7GM9thlEU90gNEh+8QWSCoP5VE51giQxB9WYmQKBgQDu0iB/w/yLO9DAST7I\n1vcD978NC+xt7WBBuOLMfKI/6VoQWMBzBXZucaXzZJ9vyqBv4zvdpjgNFGAytJEg\n4b9+fTzumQbNHg3SpX6JfNVMJrwunNsZxmH3CYnnvQ/ys0x53LyByKHsjrNiRHLH\nbcVFCrqMKZGoPeYAjV9PG4TORwKBgQDlCATng+L4UvKD3Uf/wGIKYelARNckVYv8\nt597d3LbPwrcG1gQ/MjgsDL5OjVAbCi3eFpeHCrsDN2bnQonp3XZMEBBhifK5i6n\nPZ3Oxge7nBRCgXCZuA5RN4voVN9cA1xLf1iUr+qlbtu1oPWWjRjk11W+VESbvQWC\nocKpHzA1mwKBgEyyUNuXXmh8qjrGixJG7wdoLgQLmz9mZ25T6QpQ0G6EC3eKeSu3\nSmSHvQrges+VHFcye8xgEEorDAXctWsA9NWzdLkPjf6bs0a9/Vg8LegJ3I9/smGh\ns155wr8YmaGQ8XOFb0ii3VWyMmvRnabsWtkka+qNgwir8EynGj+2j70LAoGAWhGO\nRDG0l62fG8Zw4x4YMDcTEKhB51MRK0BXIqn17Ezdi3PhbUTMBrikQyjl+kDOvmBB\nQZNYOd5RZDoc3T1Y9iGok1wb2AovvKtZnRB5yAj4WrMmwf0E/GGYzrRZ5oiXykT5\nY/fOkmKHWuVCz4MLkCsy2Bexp4FtYlMVB4dxYRMCgYEApON+XT0L20xDbWZW9G6/\n+o5XajJJ9emV/LvxAZBxcwS9YNQ9Sn23jAUafJw0KY1AxVKHlB8JDztJnYkPnrXR\nRxRFeQGJoSlVGi4+Y2fYmgQ7D/vW0beBGGh89sKSDWPCH9aeBijrnHoSCl7huMUF\nMHZwR3GXNKoIw/J1lotaos8=\n-----END PRIVATE KEY-----\n` |
| `GOOGLE_CLIENT_EMAIL` | `sheetsserviceaccount@antibully-473603.iam.gserviceaccount.com` |
| `GOOGLE_CLIENT_ID` | `your-client-id` |
| `GOOGLE_CLIENT_X509_CERT_URL` | `https://www.googleapis.com/robot/v1/metadata/x509/sheetsserviceaccount%40antibully-473603.iam.gserviceaccount.com` |

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
📊 Sheet ID: 1_z6EiJdOqOgHsGkKIf4pbJZ4NLYMm81PiMZbl0xKiIo
📧 Client Email: sheetsserviceaccount@antibully-473603.iam.gserviceaccount.com
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
