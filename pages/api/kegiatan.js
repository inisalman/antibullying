const db = require('../../lib/repository')
const { requireAdmin } = require('../../lib/adminAuth')
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  try {
    if (req.method === 'GET') { if (!requireAdmin(req, res)) return; const rows = await db.list('kegiatan'); return res.status(200).json(req.query.sesiId ? rows.filter(row => row.sesi_id === req.query.sesiId) : rows) }
    if (req.method !== 'POST') return res.status(405).json({ error: 'Metode tidak didukung.' })
    const { namaKegiatan, sesiId } = req.body || {}
    if (typeof namaKegiatan !== 'string' || !namaKegiatan.trim() || namaKegiatan.length > 160 || typeof sesiId !== 'string') return res.status(400).json({ error: 'Kegiatan tidak valid.' })
    const sessions = await db.ensureSessions()
    if (!sessions.some(row => row.id === sesiId)) return res.status(404).json({ error: 'Sesi tidak ditemukan.' })
    const name = namaKegiatan.trim()
    const existing = (await db.list('kegiatan')).find(row => row.sesi_id === sesiId && row.nama_kegiatan === name)
    if (existing) return res.status(200).json(existing)
    try { return res.status(201).json(await db.insert('kegiatan', { nama_kegiatan: name, sesi_id: sesiId })) }
    catch (error) { const found = (await db.list('kegiatan')).find(row => row.sesi_id === sesiId && row.nama_kegiatan === name); if (found) return res.status(200).json(found); throw error }
  } catch (error) { console.error('Kegiatan:', error.message); return res.status(500).json({ error: 'Kegiatan belum dapat disimpan.' }) }
}
