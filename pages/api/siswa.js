// Use Vercel-compatible database (in-memory)
const db = require('../../lib/vercelDb')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { nama, kelas, email } = req.body

      if (!nama || !kelas) {
        return res.status(400).json({ error: 'Missing required fields' })
      }

      const newSiswa = db.siswa.create({
        nama,
        kelas,
        email: email || null
      })

      res.status(201).json(newSiswa)
    } catch (error) {
      console.error('Error creating siswa:', error)
      res.status(500).json({ error: 'Failed to create siswa' })
    }
  } else if (req.method === 'GET') {
    try {
      const siswa = db.siswa.getAll()
      res.status(200).json(siswa)
    } catch (error) {
      console.error('Error fetching siswa:', error)
      res.status(500).json({ error: 'Failed to fetch siswa' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}