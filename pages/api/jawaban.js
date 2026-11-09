const db = require('../../lib/repository')
const { requireAdmin } = require('../../lib/adminAuth')
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  try {
    if (req.method === 'GET') { if (!requireAdmin(req, res)) return; return res.status(200).json(await db.list('jawaban')) }
    if (req.method !== 'POST') return res.status(405).json({ error: 'Metode tidak didukung.' })
    const { siswaId, kegiatanId, jawaban } = req.body || {}
    if (typeof siswaId !== 'string' || typeof kegiatanId !== 'string' || typeof jawaban !== 'string' || !jawaban.trim() || jawaban.length > 10000) return res.status(400).json({ error: 'Jawaban tidak valid.' })
    const [students, activities] = await Promise.all([db.list('siswa'), db.list('kegiatan')])
    if (!students.some(row => row.id === siswaId) || !activities.some(row => row.id === kegiatanId)) return res.status(404).json({ error: 'Siswa atau kegiatan tidak ditemukan. Mulai dari sesi 1.' })
    return res.status(201).json(await db.insert('jawaban', { siswa_id: siswaId, kegiatan_id: kegiatanId, jawaban: jawaban.trim() }))
  } catch (error) { console.error('Jawaban:', error.message); return res.status(500).json({ error: 'Jawaban belum dapat disimpan. Coba lagi.' }) }
}
