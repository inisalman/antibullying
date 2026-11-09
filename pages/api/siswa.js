const db = require('../../lib/repository')
const { requireAdmin } = require('../../lib/adminAuth')
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  try {
    if (req.method === 'GET') { if (!requireAdmin(req, res)) return; return res.status(200).json(await db.list('siswa')) }
    if (req.method !== 'POST') return res.status(405).json({ error: 'Metode tidak didukung.' })
    const { nama, kelas, sekolah } = req.body || {}
    if (typeof nama !== 'string' || !nama.trim() || nama.length > 120 || typeof kelas !== 'string' || !kelas.trim() || kelas.length > 80 || (sekolah != null && (typeof sekolah !== 'string' || sekolah.length > 160))) return res.status(400).json({ error: 'Isi nama dan kelas dengan benar.' })
    const student = await db.insert('siswa', { nama: nama.trim(), kelas: kelas.trim(), sekolah: (sekolah || '').trim() || null })
    return res.status(201).json({ id: student.id, nama: student.nama, kelas: student.kelas, sekolah: student.sekolah })
  } catch (error) { console.error('Siswa:', error.message); return res.status(500).json({ error: 'Data siswa belum dapat disimpan. Periksa konfigurasi penyimpanan.' }) }
}
