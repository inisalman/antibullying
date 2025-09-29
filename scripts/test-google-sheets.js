const { addAnswerToSheet, addMultipleAnswersToSheet, initializeSheetsAPI } = require('../lib/googleSheets');
const db = require('../lib/localDb');

async function testGoogleSheetsIntegration() {
  console.log('🧪 Testing Google Sheets Integration...\n');
  
  try {
    // Test 1: Initialize API
    console.log('1️⃣ Testing API initialization...');
    const sheets = await initializeSheetsAPI();
    console.log('✅ API initialized successfully\n');
    
    // Test 2: Add single answer
    console.log('2️⃣ Testing single answer addition...');
    const singleAnswerResult = await addAnswerToSheet(
      'Test Student',
      '1',
      'Test Activity',
      'This is a test answer for Google Sheets integration'
    );
    
    if (singleAnswerResult.success) {
      console.log('✅ Single answer added successfully');
      console.log('📝 Message:', singleAnswerResult.message);
    } else {
      console.log('❌ Failed to add single answer:', singleAnswerResult.error);
    }
    console.log('');
    
    // Test 3: Add multiple answers
    console.log('3️⃣ Testing multiple answers addition...');
    const multipleAnswers = [
      {
        nama: 'Student A',
        sesi: '1',
        kegiatan: 'Activity 1',
        jawaban: 'Answer from Student A for Activity 1'
      },
      {
        nama: 'Student B',
        sesi: '2',
        kegiatan: 'Activity 2',
        jawaban: 'Answer from Student B for Activity 2'
      },
      {
        nama: 'Student C',
        sesi: '1',
        kegiatan: 'Activity 3',
        jawaban: 'Answer from Student C for Activity 1'
      }
    ];
    
    const multipleAnswersResult = await addMultipleAnswersToSheet(multipleAnswers);
    
    if (multipleAnswersResult.success) {
      console.log('✅ Multiple answers added successfully');
      console.log('📊 Processed:', multipleAnswersResult.results.length, 'answers');
    } else {
      console.log('❌ Failed to add multiple answers:', multipleAnswersResult.error);
    }
    console.log('');
    
    // Test 4: Sync existing data from local database
    console.log('4️⃣ Testing sync of existing data...');
    const existingJawaban = db.jawaban.getAll();
    console.log('📚 Found', existingJawaban.length, 'existing answers in local database');
    
    if (existingJawaban.length > 0) {
      const existingAnswersToSync = existingJawaban.slice(0, 3).map(jawaban => {
        const siswa = db.siswa.getById(jawaban.siswa_id);
        const kegiatan = db.kegiatan.getById(jawaban.kegiatan_id);
        const sesi = kegiatan ? db.sesi.getById(kegiatan.sesi_id) : null;
        
        if (siswa && kegiatan && sesi) {
          return {
            nama: siswa.nama,
            sesi: sesi.nama_sesi.match(/Sesi (\d+)/)?.[1] || '1',
            kegiatan: kegiatan.nama_kegiatan,
            jawaban: jawaban.jawaban
          };
        }
        return null;
      }).filter(Boolean);
      
      console.log('🔄 Syncing', existingAnswersToSync.length, 'existing answers...');
      
      const syncResult = await addMultipleAnswersToSheet(existingAnswersToSync);
      
      if (syncResult.success) {
        console.log('✅ Existing data synced successfully');
      } else {
        console.log('❌ Failed to sync existing data:', syncResult.error);
      }
    }
    console.log('');
    
    console.log('🎉 Google Sheets integration test completed!');
    
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

// Run the test if this file is executed directly
if (require.main === module) {
  testGoogleSheetsIntegration();
}

module.exports = { testGoogleSheetsIntegration };

