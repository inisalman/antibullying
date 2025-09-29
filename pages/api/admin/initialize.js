const vercelDb = require('../../../lib/vercelDb');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🚀 Initializing Vercel database...');

    // Check if data already exists
    const currentStats = vercelDb.getStats();
    if (currentStats.sesi > 0 || currentStats.kegiatan > 0) {
      console.log('📊 Database already initialized');
      return res.status(200).json({
        message: 'Database already initialized',
        stats: currentStats
      });
    }

    // Initial data
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
        { nama_kegiatan: "Pretest", urutan: 1 },
        { nama_kegiatan: "Perkenalan Diri", urutan: 2 },
        { nama_kegiatan: "Ekspektasi Sesi", urutan: 3 },
        
        // Sesi 2
        { nama_kegiatan: "Definisi Bullying", urutan: 1 },
        { nama_kegiatan: "Jenis-jenis Bullying", urutan: 2 },
        { nama_kegiatan: "Dampak Bullying", urutan: 3 },
        
        // Sesi 3
        { nama_kegiatan: "Berani Melapor", urutan: 1 },
        { nama_kegiatan: "Strategi Komunikasi", urutan: 2 },
        { nama_kegiatan: "Role Play", urutan: 3 },
        
        // Sesi 4
        { nama_kegiatan: "Ciri Teman Baik", urutan: 1 },
        { nama_kegiatan: "Membangun Pertemanan", urutan: 2 },
        { nama_kegiatan: "Aktivitas Kelompok", urutan: 3 },
        
        // Sesi 5
        { nama_kegiatan: "Strategi Coping", urutan: 1 },
        { nama_kegiatan: "Relaksasi", urutan: 2 },
        { nama_kegiatan: "Positive Self-talk", urutan: 3 },
        
        // Sesi 6
        { nama_kegiatan: "Intervensi Bystander", urutan: 1 },
        { nama_kegiatan: "Strategi Perlindungan", urutan: 2 },
        { nama_kegiatan: "Simulasi Skenario", urutan: 3 },
        
        // Sesi 7
        { nama_kegiatan: "Refleksi Pribadi", urutan: 1 },
        { nama_kegiatan: "Cerita Inspiratif", urutan: 2 },
        { nama_kegiatan: "Sharing Pengalaman", urutan: 3 },
        
        // Sesi 8
        { nama_kegiatan: "Posttest", urutan: 1 },
        { nama_kegiatan: "Evaluasi Program", urutan: 2 },
        { nama_kegiatan: "Rencana Masa Depan", urutan: 3 }
      ]
    };

    // Create sessions
    console.log('📚 Creating sessions...');
    const createdSesi = [];
    for (const sesiData of initialData.sesi) {
      const sesi = vercelDb.sesi.create(sesiData);
      createdSesi.push(sesi);
      console.log(`✅ Created: ${sesi.nama_sesi}`);
    }

    // Create activities with proper session references
    console.log('🎯 Creating activities...');
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

    const finalStats = vercelDb.getStats();
    console.log('📊 Final stats:', finalStats);

    res.status(200).json({
      message: 'Database initialized successfully',
      stats: finalStats,
      created: {
        sesi: createdSesi.length,
        kegiatan: initialData.kegiatan.length
      }
    });

  } catch (error) {
    console.error('❌ Error initializing database:', error);
    res.status(500).json({
      error: 'Failed to initialize database',
      message: error.message
    });
  }
}
