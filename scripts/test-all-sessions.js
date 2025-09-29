const { submitSessionAnswer } = require('../lib/sessionUtils');

// Test data for all sessions
const testData = [
  // Sesi 1: Perkenalan & Pre-Test
  {
    sessionName: 'Sesi 1: Perkenalan & Pre-Test',
    activities: [
      { activityName: 'Ice Breaking', answer: 'Saya adalah siswa yang percaya diri dan positif' },
      { activityName: 'Sharing Ekspektasi', answer: 'Saya berharap bisa belajar mencegah bullying' },
      { activityName: 'Pre-Test', answer: 'Saya sudah tahu sedikit tentang bullying' }
    ]
  },
  // Sesi 2: Kenali Bullying
  {
    sessionName: 'Sesi 2: Kenali Bullying',
    activities: [
      { activityName: 'Definisi Bullying', answer: 'Bullying adalah perilaku agresif yang berulang' },
      { activityName: 'Jenis-jenis Bullying', answer: 'Ada bullying fisik, verbal, dan cyber' },
      { activityName: 'Dampak Bullying', answer: 'Bullying bisa menyebabkan trauma dan depresi' }
    ]
  },
  // Sesi 3: Berani Bicara
  {
    sessionName: 'Sesi 3: Berani Bicara',
    activities: [
      { activityName: 'Strategi Komunikasi', answer: 'Saya akan berbicara dengan tegas dan jelas' },
      { activityName: 'Role Play', answer: JSON.stringify({ sayaMerasa: 'Tidak nyaman', saat: 'Dibully', sayaIngin: 'Diperlakukan dengan baik' }) },
      { activityName: 'Membangun Kepercayaan Diri', answer: 'Saya sudah berlatih menghadapi situasi bullying' }
    ]
  },
  // Sesi 4: Kawan Sejati
  {
    sessionName: 'Sesi 4: Kawan Sejati',
    activities: [
      { activityName: 'Ciri-ciri Teman Sejati', answer: 'Teman sejati adalah yang mendukung dan tidak menghakimi' },
      { activityName: 'Membangun Persahabatan', answer: 'Saya akan membangun persahabatan yang sehat' },
      { activityName: 'Mendukung Teman', answer: 'Saya akan selalu mendukung teman yang mengalami masalah' }
    ]
  },
  // Sesi 5: Coping Cerdas
  {
    sessionName: 'Sesi 5: Coping Cerdas',
    activities: [
      { activityName: 'Teknik Relaksasi', answer: JSON.stringify({ emosi1: 'Marah', emosi2: 'Sedih', emosi3: 'Cemas' }) },
      { activityName: 'Mengelola Emosi', answer: 'Saya akan mengidentifikasi dan mengelola emosi dengan baik' },
      { activityName: 'Positive Self-Talk', answer: JSON.stringify({ copingSehat: 'Bernapas dalam', copingTidakSehat: 'Menangis' }) }
    ]
  },
  // Sesi 6: Kendalikan Bullying
  {
    sessionName: 'Sesi 6: Kendalikan Bullying',
    activities: [
      { activityName: 'Strategi Pencegahan', answer: 'Saya akan mencegah bullying dengan menjadi role model' },
      { activityName: 'Intervensi Bystander', answer: JSON.stringify({ sayaMerasa: 'Marah', karena: 'Melihat bullying', sayaIngin: 'Membantu korban' }) },
      { activityName: 'Membangun Budaya Positif', answer: 'Saya akan menciptakan lingkungan yang aman dan positif' }
    ]
  },
  // Sesi 7: Refleksi Cerita Inspiratif
  {
    sessionName: 'Sesi 7: Refleksi Cerita Inspiratif',
    activities: [
      { activityName: 'Cerita Inspiratif', answer: 'Saya terinspirasi oleh cerita orang yang berhasil mengatasi bullying' },
      { activityName: 'Refleksi Diri', answer: JSON.stringify({ pelajaranTerbesar: 'Keberanian', perubahanInginDibuat: 'Menjadi lebih tegas' }) },
      { activityName: 'Sharing Pengalaman', answer: 'Saya akan berbagi pengalaman dengan teman-teman' }
    ]
  },
  // Sesi 8: Post-Test & Penutup
  {
    sessionName: 'Sesi 8: Post-Test & Penutup',
    activities: [
      { activityName: 'Post-Test', answer: 'Sekarang saya lebih memahami tentang bullying dan cara mencegahnya' },
      { activityName: 'Refleksi Program', answer: 'Program ini sangat bermanfaat untuk saya' },
      { activityName: 'Komitmen Masa Depan', answer: 'Saya berkomitmen untuk mencegah bullying di masa depan' }
    ]
  }
];

async function testAllSessions() {
  console.log('🧪 Testing all sessions with Google Sheets integration...\n');
  
  let totalTests = 0;
  let successCount = 0;
  let errorCount = 0;
  
  for (const session of testData) {
    console.log(`📚 Testing ${session.sessionName}:`);
    
    for (const activity of session.activities) {
      totalTests++;
      console.log(`  🎯 ${activity.activityName}...`);
      
      try {
        const result = await submitSessionAnswer({
          sessionName: session.sessionName,
          activityName: activity.activityName,
          answer: activity.answer,
          studentData: {
            nama: 'Test Student All Sessions',
            kelas: 'Test Class'
          }
        });
        
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
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('');
  }
  
  // Summary
  console.log('📊 Test Summary:');
  console.log(`📚 Total Sessions: ${testData.length}`);
  console.log(`🎯 Total Activities: ${totalTests}`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log(`📋 Success Rate: ${((successCount / totalTests) * 100).toFixed(1)}%`);
  
  if (successCount === totalTests) {
    console.log('\n🎉 All sessions tested successfully!');
    console.log('📋 Check your Google Sheets for the new test data.');
    console.log('🔍 Each session should have its own sheet (Sesi 1, Sesi 2, etc.)');
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
  testAllSessions().catch(console.error);
}

module.exports = { testAllSessions };