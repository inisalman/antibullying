const { google } = require('googleapis');

// Konfigurasi Google Sheets
const GOOGLE_SHEET_ID = "1_z6EiJdOqOgHsGkKIf4pbJZ4NLYMm81PiMZbl0xKiIo";

// Service Account Credentials
const SERVICE_ACCOUNT_KEY = {
  "type": "service_account",
  "project_id": "antibully-473603",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVqXI2kXWelanG\nL23APvv/t4n6AxiYEcMfd3hP7SQVNql3ujp5iDAxdenNaTzspUNMgOmzDAZDKKQo\npzhmDXPxWYbuEBo3FQ8TB5nWji+12+l6a6p+PRuZWkeT5VrpUxu4rjydIgyx4Pns\niqOvUktPZNJhuhs+YUGSRQHGpOCuoVTJ+JifwNCvP+kyM/AYRug9eeygBV8i7c0n\nu1O7DgxZsQ200mqfwOUgm7QfGCa1f7hmjHOBzmz1Q0vilgdSewIQq6Va00MW4VPP\ntZuHOHpcFl/9sltIlA0toPsMpLUgzzwc1S3PZvbKYuM3+YWkVs2g4glKbgZhKKUj\nTlhubZf9AgMBAAECggEAEanigVRhLu0cjf/ZyOzsFGXuCDc9T0UYpn9P+PuX4hEU\nzYsdznJN2ajv3UV3/fBjse1uZJj345F2kM3SQc2W6jsGhqPaJvecuWwFcdFrbFNz\n5+UCwVD3+SOXi0iIzYVLY2c0J6Fq/0GkJ8QGaDYbd8LUCbRDEFMmApul2/BBiu4w\n0KLbD3LW13q2glKcU3JWcxkfXIQKFfLLA6a5rIdkGTk7/off4uGVruwXZiktoKgj\nMY7NaQvPFZYmnVe9chJKVcy/cGDaq73pLkA1aW9N+BHp/5oTAQkX/J48vWFFyDzJ\n0IGQ7GM9thlEU90gNEh+8QWSCoP5VE51giQxB9WYmQKBgQDu0iB/w/yLO9DAST7I\n1vcD978NC+xt7WBBuOLMfKI/6VoQWMBzBXZucaXzZJ9vyqBv4zvdpjgNFGAytJEg\n4b9+fTzumQbNHg3SpX6JfNVMJrwunNsZxmH3CYnnvQ/ys0x53LyByKHsjrNiRHLH\nbcVFCrqMKZGoPeYAjV9PG4TORwKBgQDlCATng+L4UvKD3Uf/wGIKYelARNckVYv8\nt597d3LbPwrcG1gQ/MjgsDL5OjVAbCi3eFpeHCrsDN2bnQonp3XZMEBBhifK5i6n\nPZ3Oxge7nBRCgXCZuA5RN4voVN9cA1xLf1iUr+qlbtu1oPWWjRjk11W+VESbvQWC\nocKpHzA1mwKBgEyyUNuXXmh8qjrGixJG7wdoLgQLmz9mZ25T6QpQ0G6EC3eKeSu3\nSmSHvQrges+VHFcye8xgEEorDAXctWsA9NWzdLkPjf6bs0a9/Vg8LegJ3I9/smGh\ns155wr8YmaGQ8XOFb0ii3VWyMmvRnabsWtkka+qNgwir8EynGj+2j70LAoGAWhGO\nRDG0l62fG8Zw4x4YMDcTEKhB51MRK0BXIqn17Ezdi3PhbUTMBrikQyjl+kDOvmBB\nQZNYOd5RZDoc3T1Y9iGok1wb2AovvKtZnRB5yAj4WrMmwf0E/GGYzrRZ5oiXykT5\nY/fOkmKHWuVCz4MLkCsy2Bexp4FtYlMVB4dxYRMCgYEApON+XT0L20xDbWZW9G6/\n+o5XajJJ9emV/LvxAZBxcwS9YNQ9Sn23jAUafJw0KY1AxVKHlB8JDztJnYkPnrXR\nRxRFeQGJoSlVGi4+Y2fYmgQ7D/vW0beBGGh89sKSDWPCH9aeBijrnHoSCl7huMUF\nMHZwR3GXNKoIw/J1lotaos8=\n-----END PRIVATE KEY-----\n",
  "client_email": "sheetsserviceaccount@antibully-473603.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/sheetsserviceaccount%40antibully-473603.iam.gserviceaccount.com"
};

// Inisialisasi Google Sheets API
async function initializeSheetsAPI() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: SERVICE_ACCOUNT_KEY,
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });

    const authClient = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    
    return sheets;
  } catch (error) {
    console.error('Error initializing Google Sheets API:', error);
    throw error;
  }
}

// Fungsi untuk membuat tab baru jika belum ada
async function createSheetIfNotExists(sheets, sheetTitle) {
  try {
    // Cek apakah sheet sudah ada
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: GOOGLE_SHEET_ID
    });

    const existingSheets = spreadsheet.data.sheets.map(sheet => sheet.properties.title);
    
    if (!existingSheets.includes(sheetTitle)) {
      // Buat sheet baru
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: GOOGLE_SHEET_ID,
        resource: {
          requests: [{
            addSheet: {
              properties: {
                title: sheetTitle
              }
            }
          }]
        }
      });

      // Tambahkan header ke sheet baru
      await sheets.spreadsheets.values.append({
        spreadsheetId: GOOGLE_SHEET_ID,
        range: `${sheetTitle}!A1:E1`,
        valueInputOption: 'RAW',
        resource: {
          values: [['Timestamp', 'Nama', 'Sesi', 'Kegiatan', 'Jawaban']]
        }
      });

      console.log(`Sheet "${sheetTitle}" created successfully`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error creating sheet "${sheetTitle}":`, error);
    throw error;
  }
}

// Fungsi untuk menambahkan data jawaban ke Google Sheets
async function addAnswerToSheet(nama, sesi, kegiatan, jawaban) {
  try {
    const sheets = await initializeSheetsAPI();
    const sheetTitle = `Sesi ${sesi}`;
    
    // Pastikan sheet ada
    await createSheetIfNotExists(sheets, sheetTitle);
    
    // Format timestamp
    const timestamp = new Date().toLocaleString('id-ID', {
      timeZone: 'Asia/Jakarta',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    // Data yang akan ditambahkan
    const rowData = [
      timestamp,
      nama || 'Anonim',
      `Sesi ${sesi}`,
      kegiatan || '',
      typeof jawaban === 'object' ? JSON.stringify(jawaban) : String(jawaban)
    ];
    
    // Tambahkan data ke sheet
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${sheetTitle}!A:E`,
      valueInputOption: 'RAW',
      resource: {
        values: [rowData]
      }
    });
    
    console.log(`Answer added to Google Sheets:`, {
      nama,
      sesi,
      kegiatan,
      jawaban,
      timestamp
    });
    
    return {
      success: true,
      data: result.data,
      message: 'Jawaban berhasil disimpan ke Google Sheets'
    };
    
  } catch (error) {
    console.error('Error adding answer to Google Sheets:', error);
    return {
      success: false,
      error: error.message,
      message: 'Gagal menyimpan jawaban ke Google Sheets'
    };
  }
}

// Fungsi untuk menambahkan multiple answers sekaligus
async function addMultipleAnswersToSheet(answers) {
  try {
    const sheets = await initializeSheetsAPI();
    const results = [];
    
    for (const answer of answers) {
      const { nama, sesi, kegiatan, jawaban } = answer;
      const result = await addAnswerToSheet(nama, sesi, kegiatan, jawaban);
      results.push(result);
    }
    
    return {
      success: true,
      results,
      message: 'Semua jawaban berhasil diproses'
    };
    
  } catch (error) {
    console.error('Error adding multiple answers to Google Sheets:', error);
    return {
      success: false,
      error: error.message,
      message: 'Gagal memproses jawaban ke Google Sheets'
    };
  }
}

// Fungsi untuk mendapatkan data dari Google Sheets
async function getSheetData(sheetTitle) {
  try {
    const sheets = await initializeSheetsAPI();
    
    const result = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${sheetTitle}!A:E`
    });
    
    return {
      success: true,
      data: result.data.values || []
    };
    
  } catch (error) {
    console.error(`Error getting data from sheet "${sheetTitle}":`, error);
    return {
      success: false,
      error: error.message
    };
  }
}

module.exports = {
  addAnswerToSheet,
  addMultipleAnswersToSheet,
  getSheetData,
  createSheetIfNotExists,
  initializeSheetsAPI,
  GOOGLE_SHEET_ID
};

