const db = require('../../../../lib/localDb')

export default async function handler(req, res) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      // Get session by ID
      const session = db.sesi.getById(id)
      if (!session) {
        return res.status(404).json({ error: 'Session not found' })
      }

      // Get all jawaban with related data
      const allJawaban = db.jawaban.getAll()
      
      // Get kegiatan for this session
      const kegiatanSesi = db.kegiatan.getBySesiId(id)
      
      // Filter jawaban for this session
      const jawabanSesi = allJawaban.filter(j => {
        const kegiatan = db.kegiatan.getById(j.kegiatan_id)
        return kegiatan && kegiatan.sesi_id === id
      })

      // Group jawaban by siswa
      const jawabanBySiswa = {}
      jawabanSesi.forEach(jawaban => {
        const siswa = db.siswa.getById(jawaban.siswa_id)
        const kegiatan = db.kegiatan.getById(jawaban.kegiatan_id)
        
        if (!jawabanBySiswa[jawaban.siswa_id]) {
          jawabanBySiswa[jawaban.siswa_id] = {
            siswa: siswa,
            jawaban: {}
          }
        }
        
        if (kegiatan) {
          jawabanBySiswa[jawaban.siswa_id].jawaban[kegiatan.nama_kegiatan] = jawaban.jawaban
        }
      })

      // Format data for display based on session
      const formattedData = Object.values(jawabanBySiswa).map(item => {
        const baseData = {
          id: item.siswa.id,
          nama: item.siswa.nama,
          kelas: item.siswa.kelas,
          email: item.siswa.email,
          createdAt: item.siswa.created_at
        }

        // Add session-specific fields
        if (session.nama_sesi.includes('Sesi 1')) {
          return {
            ...baseData,
            positiveSentence: item.jawaban['Ice Breaking'] || '',
            expectations: item.jawaban['Sharing Ekspektasi'] || '',
            preTest: item.jawaban['Pre-Test'] || ''
          }
        } else if (session.nama_sesi.includes('Sesi 2')) {
          return {
            ...baseData,
            definisiBullying: item.jawaban['Definisi Bullying'] || '',
            jenisBullying: item.jawaban['Jenis-jenis Bullying'] || '',
            dampakBullying: item.jawaban['Dampak Bullying'] || ''
          }
        } else if (session.nama_sesi.includes('Sesi 3')) {
          return {
            ...baseData,
            strategiKomunikasi: item.jawaban['Strategi Komunikasi'] || '',
            rolePlay: item.jawaban['Role Play'] || '',
            kepercayaanDiri: item.jawaban['Membangun Kepercayaan Diri'] || ''
          }
        } else if (session.nama_sesi.includes('Sesi 4')) {
          return {
            ...baseData,
            ciriTemanSejati: item.jawaban['Ciri-ciri Teman Sejati'] || '',
            membangunPersahabatan: item.jawaban['Membangun Persahabatan'] || '',
            mendukungTeman: item.jawaban['Mendukung Teman'] || ''
          }
        } else if (session.nama_sesi.includes('Sesi 5')) {
          return {
            ...baseData,
            teknikRelaksasi: item.jawaban['Teknik Relaksasi'] || '',
            mengelolaEmosi: item.jawaban['Mengelola Emosi'] || '',
            positiveSelfTalk: item.jawaban['Positive Self-Talk'] || ''
          }
        } else if (session.nama_sesi.includes('Sesi 6')) {
          return {
            ...baseData,
            strategiPencegahan: item.jawaban['Strategi Pencegahan'] || '',
            intervensiBystander: item.jawaban['Intervensi Bystander'] || '',
            budayaPositif: item.jawaban['Membangun Budaya Positif'] || ''
          }
        } else if (session.nama_sesi.includes('Sesi 7')) {
          return {
            ...baseData,
            ceritaInspiratif: item.jawaban['Cerita Inspiratif'] || '',
            refleksiDiri: item.jawaban['Refleksi Diri'] || '',
            sharingPengalaman: item.jawaban['Sharing Pengalaman'] || ''
          }
        } else if (session.nama_sesi.includes('Sesi 8')) {
          return {
            ...baseData,
            postTest: item.jawaban['Post-Test'] || '',
            refleksiProgram: item.jawaban['Refleksi Program'] || '',
            komitmenMasaDepan: item.jawaban['Komitmen Masa Depan'] || ''
          }
        }

        return baseData
      })

      // Calculate stats
      const totalStudents = Object.keys(jawabanBySiswa).length
      const completedStudents = formattedData.filter(item => {
        // Check if student has completed all activities for this session
        const jawabanCount = Object.values(item).filter(value => 
          typeof value === 'string' && value.trim() !== ''
        ).length
        return jawabanCount >= kegiatanSesi.length
      }).length
      const completionRate = totalStudents > 0 ? Math.round((completedStudents / totalStudents) * 100) : 0

      res.status(200).json({
        data: formattedData,
        stats: {
          totalStudents,
          completedStudents,
          completionRate
        },
        sessionInfo: session
      })
    } catch (error) {
      console.error(`Error fetching session ${id} data:`, error)
      res.status(500).json({ error: 'Failed to fetch session data' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}


