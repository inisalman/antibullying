// Use Vercel-compatible database (in-memory)
const db = require('../../lib/vercelDb')

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const sesi = db.sesi.getAll()
      res.status(200).json(sesi)
    } catch (error) {
      console.error('Error fetching sesi:', error)
      res.status(500).json({ error: 'Failed to fetch sesi' })
    }
  } else if (req.method === 'POST') {
    try {
      const { namaSesi, deskripsi } = req.body

      if (!namaSesi) {
        return res.status(400).json({ error: 'Missing required field: namaSesi' })
      }

      const newSesi = db.sesi.create({
        nama_sesi: namaSesi,
        deskripsi: deskripsi || null
      })

      res.status(201).json(newSesi)
    } catch (error) {
      console.error('Error creating sesi:', error)
      res.status(500).json({ error: 'Failed to create sesi' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}