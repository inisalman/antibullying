const db = require('../../lib/repository')
const { requireAdmin } = require('../../lib/adminAuth')
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  try {
    if (req.method === 'GET') return res.status(200).json(await db.ensureSessions())
    if (req.method === 'POST') {
      if (!requireAdmin(req, res)) return
      const name = req.body?.namaSesi
      if (typeof name !== 'string' || !name.trim() || name.length > 160) return res.status(400).json({ error: 'Nama sesi tidak valid.' })
      return res.status(201).json(await db.insert('sesi', { nama_sesi: name.trim() }))
    }
    return res.status(405).json({ error: 'Metode tidak didukung.' })
  } catch (error) { console.error('Sesi:', error.message); return res.status(500).json({ error: 'Sesi belum dapat dimuat. Periksa konfigurasi penyimpanan.' }) }
}
