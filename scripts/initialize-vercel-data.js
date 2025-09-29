const vercelDb = require('../lib/vercelDb');

// Data untuk menginisialisasi database
const initialData = {
  sesi: [
    { nama_sesi: "Sesi 1: Perkenalan & Pretest", urutan: 1 },
    { nama_sesi: "Sesi 2: Kenali Bullying", urutan: 2 },
    { nama_sesi: "Sesi 3: Berani Bicara", urutan: 3 },
    { nama_sesi: "Sesi 4: Kawan Sejati", urutan: 4 },
    { nama_sesi: "Sesi 5: Coping Cerdas", urutan: 5 },
    { nama_sesi: "Sesi 6: Kendalikan Bullying", urutan: 6 },
    { nama_sesi: "Sesi 7: Refleksi & Cerita Inspiratif", urutan: 7 },
    { nama_sesi: "Sesi 8: Posttest & Penutup", urutan: 8 }
  ],
  kegiatan: [
    // Sesi 1
    { nama_kegiatan: "Pretest", sesi_id: null, urutan: 1 },
    { nama_kegiatan: "Perkenalan Diri", sesi_id: null, urutan: 2 },
    { nama_kegiatan: "Ekspektasi Sesi", sesi_id: null, urutan: 3 },
    
    // Sesi 2
    { nama_kegiatan: "Definisi Bullying", sesi_id: null, urutan: 1 },
    { nama_kegiatan: "Jenis-jenis Bullying", sesi_id: null, urutan: 2 },
    { nama_kegiatan: "Dampak Bullying", sesi_id: null, urutan: 3 },
    
    // Sesi 3
    { nama_kegiatan: "Berani Melapor", sesi_id: null, urutan: 1 },
    { nama_kegiatan: "Strategi Komunikasi", sesi_id: null, urutan: 2 },
    { nama_kegiatan: "Role Play", sesi_id: null, urutan: 3 },
    
    // Sesi 4
    { nama_kegiatan: "Ciri Teman Baik", sesi_id: null, urutan: 1 },
    { nama_kegiatan: "Membangun Pertemanan", sesi_id: null, urutan: 2 },
    { nama_kegiatan: "Aktivitas Kelompok", sesi_id: null, urutan: 3 },
    
    // Sesi 5
    { nama_kegiatan: "Strategi Coping", sesi_id: null, urutan: 1 },
    { nama_kegiatan: "Relaksasi", sesi_id: null, urutan: 2 },
    { nama_kegiatan: "Positive Self-talk", sesi_id: null, urutan: 3 },
    
    // Sesi 6
    { nama_kegiatan: "Intervensi Bystander", sesi_id: null, urutan: 1 },
    { nama_kegiatan: "Strategi Perlindungan", sesi_id: null, urutan: 2 },
    { nama_kegiatan: "Simulasi Skenario", sesi_id: null, urutan: 3 },
    
    // Sesi 7
    { nama_kegiatan: "Refleksi Pribadi", sesi_id: null, urutan: 1 },
    { nama_kegiatan: "Cerita Inspiratif", sesi_id: null, urutan: 2 },
    { nama_kegiatan: "Sharing Pengalaman", sesi_id: null, urutan: 3 },
    
    // Sesi 8
    { nama_kegiatan: "Posttest", sesi_id: null, urutan: 1 },
    { nama_kegiatan: "Evaluasi Program", sesi_id: null, urutan: 2 },
    { nama_kegiatan: "Rencana Masa Depan", sesi_id: null, urutan: 3 }
  ]
};

async function initializeVercelData() {
  console.log('🚀 Initializing Vercel database with initial data...\n');
  
  try {
    // Create sessions
    console.log('📚 Creating sessions...');
    const createdSesi = [];
    for (const sesiData of initialData.sesi) {
      const sesi = vercelDb.sesi.create(sesiData);
      createdSesi.push(sesi);
      console.log(`✅ Created: ${sesi.nama_sesi}`);
    }
    
    // Create activities with proper session references
    console.log('\n🎯 Creating activities...');
    for (let i = 0; i < initialData.kegiatan.length; i++) {
      const kegiatanData = initialData.kegiatan[i];
      const sesiIndex = Math.floor(i / 3); // 3 activities per session
      const sesiId = createdSesi[sesiIndex].id;
      
      const kegiatan = vercelDb.kegiatan.create({
        ...kegiatanData,
        sesi_id: sesiId
      });
      console.log(`✅ Created: ${kegiatan.nama_kegiatan} (Sesi ${sesiIndex + 1})`);
    }
    
    console.log('\n📊 Database Statistics:');
    console.log(vercelDb.getStats());
    
    console.log('\n✅ Vercel database initialized successfully!');
    console.log('🎯 Ready for production deployment');
    
  } catch (error) {
    console.error('❌ Error initializing Vercel database:', error);
    throw error;
  }
}

// Run initialization if this file is executed directly
if (require.main === module) {
  initializeVercelData().catch(console.error);
}

module.exports = { initializeVercelData };
