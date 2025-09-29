// Use Vercel-compatible database (in-memory)
const db = require('../../../lib/vercelDb')

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Get total counts
      const totalSiswa = db.siswa.getAll().length
      const totalJawaban = db.jawaban.getAll().length
      const totalSesi = db.sesi.getAll().length

      // Get jawaban count per sesi
      const sesi = db.sesi.getAll()
      const jawabanPerSesi = sesi.map(sesi => {
        const kegiatan = db.kegiatan.getBySesiId(sesi.id)
        const totalJawabanSesi = kegiatan.reduce((sum, keg) => {
          const jawabanKegiatan = db.jawaban.getByKegiatanId(keg.id)
          return sum + jawabanKegiatan.length
        }, 0)

        return {
          id: sesi.id,
          namaSesi: sesi.nama_sesi,
          totalJawaban: totalJawabanSesi,
          kegiatan: kegiatan.map(keg => ({
            id: keg.id,
            namaKegiatan: keg.nama_kegiatan,
            totalJawaban: db.jawaban.getByKegiatanId(keg.id).length
          }))
        }
      })

      // Get recent jawaban
      const allJawaban = db.jawaban.getAll()
      const recentJawaban = allJawaban
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 10)
        .map(j => {
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

      res.status(200).json({
        totalSiswa,
        totalJawaban,
        totalSesi,
        jawabanPerSesi,
        recentJawaban
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
      res.status(500).json({ error: 'Failed to fetch stats' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}