const db = require('../lib/localDb');
const { addMultipleAnswersToSheet } = require('../lib/googleSheets');

async function syncAllAnswersToGoogleSheets() {
  console.log('🚀 Starting sync of all answers to Google Sheets...\n');
  
  try {
    // Get all existing answers
    const allJawaban = db.jawaban.getAll();
    console.log(`📊 Found ${allJawaban.length} total answers to sync\n`);
    
    if (allJawaban.length === 0) {
      console.log('ℹ️  No answers found in local database. Nothing to sync.');
      return;
    }
    
    // Process answers in batches to avoid overwhelming the API
    const batchSize = 10;
    let processedCount = 0;
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < allJawaban.length; i += batchSize) {
      const batch = allJawaban.slice(i, i + batchSize);
      console.log(`📦 Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allJawaban.length / batchSize)} (${batch.length} items)`);
      
      // Convert batch to Google Sheets format
      const answersToSync = batch.map(jawaban => {
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
        
        console.log(`⚠️  Skipping answer ${jawaban.id} - missing related data`);
        return null;
      }).filter(Boolean);
      
      if (answersToSync.length > 0) {
        try {
          const result = await addMultipleAnswersToSheet(answersToSync);
          
          if (result.success) {
            successCount += answersToSync.length;
            console.log(`✅ Batch ${Math.floor(i / batchSize) + 1} synced successfully (${answersToSync.length} items)`);
          } else {
            errorCount += answersToSync.length;
            console.log(`❌ Batch ${Math.floor(i / batchSize) + 1} failed:`, result.error);
          }
        } catch (error) {
          errorCount += answersToSync.length;
          console.log(`❌ Batch ${Math.floor(i / batchSize) + 1} failed with error:`, error.message);
        }
      }
      
      processedCount += batch.length;
      
      // Add a small delay between batches to be respectful to the API
      if (i + batchSize < allJawaban.length) {
        console.log('⏳ Waiting 2 seconds before next batch...\n');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    // Summary
    console.log('\n📈 Sync Summary:');
    console.log(`📊 Total processed: ${processedCount}`);
    console.log(`✅ Successfully synced: ${successCount}`);
    console.log(`❌ Failed: ${errorCount}`);
    console.log(`📋 Success rate: ${((successCount / processedCount) * 100).toFixed(1)}%`);
    
    if (successCount > 0) {
      console.log('\n🎉 Sync completed! Check your Google Sheets for the data.');
    } else {
      console.log('\n⚠️  No data was successfully synced. Please check your configuration.');
    }
    
  } catch (error) {
    console.error('❌ Sync failed with error:', error);
  }
}

// Function to get statistics about the data
function getDataStatistics() {
  console.log('📊 Data Statistics:\n');
  
  const allJawaban = db.jawaban.getAll();
  const allSiswa = db.siswa.getAll();
  const allKegiatan = db.kegiatan.getAll();
  const allSesi = db.sesi.getAll();
  
  console.log(`👥 Students: ${allSiswa.length}`);
  console.log(`📚 Sessions: ${allSesi.length}`);
  console.log(`🎯 Activities: ${allKegiatan.length}`);
  console.log(`💬 Answers: ${allJawaban.length}\n`);
  
  // Group by session
  const sessionStats = {};
  allJawaban.forEach(jawaban => {
    const kegiatan = db.kegiatan.getById(jawaban.kegiatan_id);
    const sesi = kegiatan ? db.sesi.getById(kegiatan.sesi_id) : null;
    
    if (sesi) {
      const sessionKey = sesi.nama_sesi;
      if (!sessionStats[sessionKey]) {
        sessionStats[sessionKey] = {
          count: 0,
          students: new Set()
        };
      }
      sessionStats[sessionKey].count++;
      sessionStats[sessionKey].students.add(jawaban.siswa_id);
    }
  });
  
  console.log('📋 Answers by Session:');
  Object.entries(sessionStats).forEach(([session, stats]) => {
    console.log(`  ${session}: ${stats.count} answers from ${stats.students.size} students`);
  });
  
  return {
    totalAnswers: allJawaban.length,
    totalStudents: allSiswa.length,
    totalSessions: allSesi.length,
    totalActivities: allKegiatan.length,
    sessionStats
  };
}

// Run functions based on command line arguments
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.includes('--stats') || args.includes('-s')) {
    getDataStatistics();
  } else if (args.includes('--sync') || args.length === 0) {
    syncAllAnswersToGoogleSheets();
  } else {
    console.log('Usage:');
    console.log('  node scripts/sync-to-google-sheets.js [--sync]  # Sync all data (default)');
    console.log('  node scripts/sync-to-google-sheets.js --stats  # Show statistics only');
  }
}

module.exports = { syncAllAnswersToGoogleSheets, getDataStatistics };

