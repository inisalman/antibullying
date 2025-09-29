const db = require('../../../lib/localDb')

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get all jawaban with related data
      const allJawaban = db.jawaban.getAll()
      
      // Get Sesi 1 ID
      const sesi1 = db.sesi.getAll().find(s => s.nama_sesi === 'Sesi 1: Perkenalan & Pre-Test')
      if (!sesi1) {
        return res.status(200).json({
          data: [],
          stats: {
            totalStudents: 0,
            completedStudents: 0,
            completionRate: 0
          }
        })
      }

      // Get kegiatan for Sesi 1
      const kegiatanSesi1 = db.kegiatan.getBySesiId(sesi1.id)
      
      // Filter jawaban for Sesi 1
      const jawabanSesi1 = allJawaban.filter(j => {
        const kegiatan = db.kegiatan.getById(j.kegiatan_id)
        return kegiatan && kegiatan.sesi_id === sesi1.id
      })

      // Group jawaban by siswa
      const jawabanBySiswa = {}
      jawabanSesi1.forEach(jawaban => {
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

      // Format data for display
      const formattedData = Object.values(jawabanBySiswa).map(item => ({
        id: item.siswa.id,
        nama: item.siswa.nama,
        kelas: item.siswa.kelas,
        email: item.siswa.email,
        positiveSentence: item.jawaban['Ice Breaking'] || '',
        expectations: item.jawaban['Sharing Ekspektasi'] || '',
        preTest: item.jawaban['Pre-Test'] || '',
        createdAt: item.siswa.created_at
      }))

      // Calculate stats
      const totalStudents = Object.keys(jawabanBySiswa).length
      const completedStudents = formattedData.filter(item => 
        item.positiveSentence && item.expectations
      ).length
      const completionRate = totalStudents > 0 ? Math.round((completedStudents / totalStudents) * 100) : 0

      res.status(200).json({
        data: formattedData,
        stats: {
          totalStudents,
          completedStudents,
          completionRate
        }
      })
    } catch (error) {
      console.error('Error fetching session 1 data:', error)
      res.status(500).json({ error: 'Failed to fetch session 1 data' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}