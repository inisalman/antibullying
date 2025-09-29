# Dashboard Admin - Setup Guide

## Prerequisites

1. **MySQL Database** - Install MySQL di komputer lokal
2. **Node.js** - Versi 18 atau lebih baru
3. **npm** atau **yarn**

## Setup Database

### 1. Install MySQL
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mysql-server

# macOS dengan Homebrew
brew install mysql
brew services start mysql

# Windows
# Download dari https://dev.mysql.com/downloads/mysql/
```

### 2. Buat Database
```sql
-- Login ke MySQL
mysql -u root -p

-- Buat database
CREATE DATABASE anti_bullying_db;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON anti_bullying_db.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Setup Environment Variables
Buat file `.env` di root project:
```env
DATABASE_URL="mysql://admin:password@localhost:3306/anti_bullying_db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

## Setup Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client
```bash
npm run db:generate
```

### 3. Push Database Schema
```bash
npm run db:push
```

### 4. Seed Database dengan Data Dummy
```bash
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

## Akses Dashboard Admin

1. Buka browser ke `http://localhost:3000`
2. Navigasi ke `/admin` untuk akses dashboard admin
3. Dashboard akan menampilkan:
   - Ringkasan statistik semua sesi
   - Data jawaban siswa per sesi
   - Fitur export Excel
   - Pencarian dan pagination

## Struktur Dashboard

### Halaman Utama (`/admin`)
- Overview statistik semua sesi
- Progress completion rate
- Quick access ke setiap sesi

### Halaman Detail Sesi (`/admin/sesi1` - `/admin/sesi8`)
- Tabel data jawaban siswa
- Fitur pencarian
- Export Excel
- Analisis data

### Fitur Utama
- **Responsive Design** - Optimal di desktop dan mobile
- **Search & Filter** - Pencarian berdasarkan nama, kelas, sekolah
- **Export Excel** - Download data dalam format Excel
- **Pagination** - Navigasi data yang efisien
- **Real-time Stats** - Statistik yang update otomatis

## Troubleshooting

### Database Connection Error
```bash
# Pastikan MySQL running
sudo systemctl status mysql  # Linux
brew services list | grep mysql  # macOS

# Test connection
mysql -u admin -p -h localhost anti_bullying_db
```

### Prisma Error
```bash
# Reset database
npx prisma db push --force-reset
npm run db:seed
```

### Port Already in Use
```bash
# Kill process di port 3000
lsof -ti:3000 | xargs kill -9
```

## File Structure

```
├── components/
│   ├── AdminLayout.js      # Layout dengan sidebar
│   └── SessionTable.js     # Tabel reusable
├── pages/
│   ├── admin/
│   │   ├── index.js        # Dashboard utama
│   │   └── sesi1.js        # Detail Sesi 1
│   └── api/
│       └── admin/
│           ├── stats.js    # API statistik
│           └── sesi1.js    # API data Sesi 1
├── lib/
│   └── db.js              # Koneksi Prisma
├── prisma/
│   └── schema.prisma      # Database schema
└── scripts/
    └── seed.js            # Seed data dummy
```

## Next Steps

1. **Customize Data** - Modifikasi data dummy di `scripts/seed.js`
2. **Add More Sessions** - Buat halaman untuk Sesi 2-8
3. **Authentication** - Tambahkan login admin
4. **Advanced Analytics** - Tambahkan chart dan grafik
5. **Real-time Updates** - Implementasi WebSocket untuk update real-time
