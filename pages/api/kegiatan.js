// Use Vercel-compatible database (in-memory)
const db = require('../../lib/vercelDb')

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { sesiId } = req.query
      let kegiatan

      if (sesiId) {
        kegiatan = db.kegiatan.getBySesiId(sesiId)
      } else {
        kegiatan = db.kegiatan.getAll()
      }

      res.status(200).json(kegiatan)
    } catch (error) {
      console.error('Error fetching kegiatan:', error)
      res.status(500).json({ error: 'Failed to fetch kegiatan' })
    }
  } else if (req.method === 'POST') {
    try {
      const { namaKegiatan, deskripsi, sesiId } = req.body

      if (!namaKegiatan || !sesiId) {
        return res.status(400).json({ error: 'Missing required fields: namaKegiatan, sesiId' })
      }

      const newKegiatan = db.kegiatan.create({
        nama_kegiatan: namaKegiatan,
        deskripsi: deskripsi || null,
        sesi_id: sesiId
      })

      res.status(201).json(newKegiatan)
    } catch (error) {
      console.error('Error creating kegiatan:', error)
      res.status(500).json({ error: 'Failed to create kegiatan' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}