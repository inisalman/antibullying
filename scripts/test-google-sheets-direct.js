const { addAnswerToSheet, addMultipleAnswersToSheet } = require('../lib/googleSheets');

async function testAllSessionsDirect() {
  console.log('🧪 Testing Google Sheets integration for all sessions...\n');
  
  // Test data for all sessions
  const testData = [
    // Sesi 1: Perkenalan & Pre-Test
    { nama: 'Test Student', sesi: '1', kegiatan: 'Ice Breaking', jawaban: 'Saya adalah siswa yang percaya diri dan positif' },
    { nama: 'Test Student', sesi: '1', kegiatan: 'Sharing Ekspektasi', jawaban: 'Saya berharap bisa belajar mencegah bullying' },
    { nama: 'Test Student', sesi: '1', kegiatan: 'Pre-Test', jawaban: 'Saya sudah tahu sedikit tentang bullying' },
    
    // Sesi 2: Kenali Bullying
    { nama: 'Test Student', sesi: '2', kegiatan: 'Definisi Bullying', jawaban: 'Bullying adalah perilaku agresif yang berulang' },
    { nama: 'Test Student', sesi: '2', kegiatan: 'Jenis-jenis Bullying', jawaban: 'Ada bullying fisik, verbal, dan cyber' },
    { nama: 'Test Student', sesi: '2', kegiatan: 'Dampak Bullying', jawaban: 'Bullying bisa menyebabkan trauma dan depresi' },
    
    // Sesi 3: Berani Bicara
    { nama: 'Test Student', sesi: '3', kegiatan: 'Strategi Komunikasi', jawaban: 'Saya akan berbicara dengan tegas dan jelas' },
    { nama: 'Test Student', sesi: '3', kegiatan: 'Role Play', jawaban: '{"sayaMerasa":"Tidak nyaman","saat":"Dibully","sayaIngin":"Diperlakukan dengan baik"}' },
    { nama: 'Test Student', sesi: '3', kegiatan: 'Membangun Kepercayaan Diri', jawaban: 'Saya sudah berlatih menghadapi situasi bullying' },
    
    // Sesi 4: Kawan Sejati
    { nama: 'Test Student', sesi: '4', kegiatan: 'Ciri-ciri Teman Sejati', jawaban: 'Teman sejati adalah yang mendukung dan tidak menghakimi' },
    { nama: 'Test Student', sesi: '4', kegiatan: 'Membangun Persahabatan', jawaban: 'Saya akan membangun persahabatan yang sehat' },
    { nama: 'Test Student', sesi: '4', kegiatan: 'Mendukung Teman', jawaban: 'Saya akan selalu mendukung teman yang mengalami masalah' },
    
    // Sesi 5: Coping Cerdas
    { nama: 'Test Student', sesi: '5', kegiatan: 'Teknik Relaksasi', jawaban: '{"emosi1":"Marah","emosi2":"Sedih","emosi3":"Cemas"}' },
    { nama: 'Test Student', sesi: '5', kegiatan: 'Mengelola Emosi', jawaban: 'Saya akan mengidentifikasi dan mengelola emosi dengan baik' },
    { nama: 'Test Student', sesi: '5', kegiatan: 'Positive Self-Talk', jawaban: '{"copingSehat":"Bernapas dalam","copingTidakSehat":"Menangis"}' },
    
    // Sesi 6: Kendalikan Bullying
    { nama: 'Test Student', sesi: '6', kegiatan: 'Strategi Pencegahan', jawaban: 'Saya akan mencegah bullying dengan menjadi role model' },
    { nama: 'Test Student', sesi: '6', kegiatan: 'Intervensi Bystander', jawaban: '{"sayaMerasa":"Marah","karena":"Melihat bullying","sayaIngin":"Membantu korban"}' },
    { nama: 'Test Student', sesi: '6', kegiatan: 'Membangun Budaya Positif', jawaban: 'Saya akan menciptakan lingkungan yang aman dan positif' },
    
    // Sesi 7: Refleksi Cerita Inspiratif
    { nama: 'Test Student', sesi: '7', kegiatan: 'Cerita Inspiratif', jawaban: 'Saya terinspirasi oleh cerita orang yang berhasil mengatasi bullying' },
    { nama: 'Test Student', sesi: '7', kegiatan: 'Refleksi Diri', jawaban: '{"pelajaranTerbesar":"Keberanian","perubahanInginDibuat":"Menjadi lebih tegas"}' },
    { nama: 'Test Student', sesi: '7', kegiatan: 'Sharing Pengalaman', jawaban: 'Saya akan berbagi pengalaman dengan teman-teman' },
    
    // Sesi 8: Post-Test & Penutup
    { nama: 'Test Student', sesi: '8', kegiatan: 'Post-Test', jawaban: 'Sekarang saya lebih memahami tentang bullying dan cara mencegahnya' },
    { nama: 'Test Student', sesi: '8', kegiatan: 'Refleksi Program', jawaban: 'Program ini sangat bermanfaat untuk saya' },
    { nama: 'Test Student', sesi: '8', kegiatan: 'Komitmen Masa Depan', jawaban: 'Saya berkomitmen untuk mencegah bullying di masa depan' }
  ];
  
  let totalTests = testData.length;
  let successCount = 0;
  let errorCount = 0;
  
  console.log(`📊 Testing ${totalTests} activities across 8 sessions...\n`);
  
  // Test each answer individually
  for (let i = 0; i < testData.length; i++) {
    const { nama, sesi, kegiatan, jawaban } = testData[i];
    console.log(`🎯 [${i + 1}/${totalTests}] Sesi ${sesi}: ${kegiatan}...`);
    
    try {
      const result = await addAnswerToSheet(nama, sesi, kegiatan, jawaban);
      
      if (result.success) {
        console.log(`    ✅ Success`);
        successCount++;
      } else {
        console.log(`    ❌ Failed: ${result.error}`);
        errorCount++;
      }
    } catch (error) {
      console.log(`    ❌ Error: ${error.message}`);
      errorCount++;
    }
    
    // Small delay between submissions
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Summary
  console.log('\n📈 Test Summary:');
  console.log(`📚 Total Sessions: 8`);
  console.log(`🎯 Total Activities: ${totalTests}`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📋 Success Rate: ${((successCount / totalTests) * 100).toFixed(1)}%`);
  
  if (successCount === totalTests) {
    console.log('\n🎉 All sessions tested successfully!');
    console.log('📋 Check your Google Sheets for the new test data.');
    console.log('🔍 Each session should have its own sheet (Sesi 1, Sesi 2, etc.)');
    console.log('📊 Each sheet should contain: Timestamp | Nama | Sesi | Kegiatan | Jawaban');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
  }
  
  return {
    totalTests,
    successCount,
    errorCount,
    successRate: (successCount / totalTests) * 100
  };
}

// Run the test if this file is executed directly
if (require.main === module) {
  testAllSessionsDirect().catch(console.error);
}

module.exports = { testAllSessionsDirect };

