// Use Vercel-compatible database (in-memory)
const db = require('../../lib/vercelDb')
const { addAnswerToSheet } = require('../../lib/googleSheets')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { siswaId, kegiatanId, jawaban } = req.body

      if (!siswaId || !kegiatanId || !jawaban) {
        return res.status(400).json({ error: 'Missing required fields: siswaId, kegiatanId, jawaban' })
      }

      // Simpan ke database lokal
      const newJawaban = db.jawaban.create({
        siswa_id: siswaId,
        kegiatan_id: kegiatanId,
        jawaban
      })

      // Ambil data siswa dan kegiatan untuk Google Sheets
      const siswa = db.siswa.getById(siswaId)
      const kegiatan = db.kegiatan.getById(kegiatanId)
      const sesi = kegiatan ? db.sesi.getById(kegiatan.sesi_id) : null

      // Simpan ke Google Sheets
      if (siswa && kegiatan && sesi) {
        const sheetResult = await addAnswerToSheet(
          siswa.nama,
          sesi.nama_sesi.match(/Sesi (\d+)/)?.[1] || '1', // Extract session number
          kegiatan.nama_kegiatan,
          jawaban
        )
        
        if (!sheetResult.success) {
          console.error('Google Sheets error:', sheetResult.error)
          // Continue with response even if Google Sheets fails
        }
      }

      res.status(201).json(newJawaban)
    } catch (error) {
      console.error('Error creating jawaban:', error)
      res.status(500).json({ error: 'Failed to create jawaban' })
    }
  } else if (req.method === 'GET') {
    try {
      const jawaban = db.jawaban.getAll()
      
      // Join with related data
      const jawabanWithDetails = jawaban.map(j => {
        const siswa = db.siswa.getById(j.siswa_id)
        const kegiatan = db.kegiatan.getById(j.kegiatan_id)
        const sesi = kegiatan ? db.sesi.getById(kegiatan.sesi_id) : null

        return {
          ...j,
          siswa: siswa ? {
            nama: siswa.nama,
            kelas: siswa.kelas,
            email: siswa.email
          } : null,
          kegiatan: kegiatan ? {
            nama_kegiatan: kegiatan.nama_kegiatan,
            sesi: sesi ? {
              nama_sesi: sesi.nama_sesi
            } : null
          } : null
        }
      })

      res.status(200).json(jawabanWithDetails)
    } catch (error) {
      console.error('Error fetching jawaban:', error)
      res.status(500).json({ error: 'Failed to fetch jawaban' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}