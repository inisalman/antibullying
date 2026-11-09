const db = require('../../../lib/repository')
const { requireAdmin } = require('../../../lib/adminAuth')
export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  if (req.method !== 'GET') return res.status(405).json({ error: 'Metode tidak didukung.' })
  try {
    const [students, sessions, activities, answers] = await Promise.all([db.list('siswa'), db.ensureSessions(), db.list('kegiatan'), db.list('jawaban')])
    const studentMap = new Map(students.map(item => [item.id, item]))
    const activityMap = new Map(activities.map(item => [item.id, item]))
    const sessionMap = new Map(sessions.map(item => [item.id, item]))
    const enriched = answers.map(answer => {
      const student = studentMap.get(answer.siswa_id)
      const activity = activityMap.get(answer.kegiatan_id)
      const session = activity && sessionMap.get(activity.sesi_id)
      return { id: answer.id, siswaId: answer.siswa_id, nama: student?.nama || 'Siswa tidak ditemukan', kelas: student?.kelas || '-', sekolah: student?.sekolah || '-', sesiId: session?.id || '', sesi: session ? db.displaySessionName(session.nama_sesi) : 'Sesi tidak ditemukan', kegiatan: activity?.nama_kegiatan || 'Kegiatan tidak ditemukan', jawaban: answer.jawaban, timestamp: answer.timestamp }
    }).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp))
    const sessionStats = sessions.map(session => {
      const matched = enriched.filter(answer => answer.sesiId === session.id)
      return { id: session.id, nama: db.displaySessionName(session.nama_sesi), siswa: new Set(matched.map(answer => answer.siswaId)).size, jawaban: matched.length }
    }).sort((a,b) => a.nama.localeCompare(b.nama, 'id', { numeric: true }))
    return res.status(200).json({ totalSiswa: students.length, totalJawaban: answers.length, sessions: sessionStats, answers: enriched })
  } catch (error) { console.error('Admin stats:', error.message); return res.status(500).json({ error: 'Data belum dapat dimuat. Periksa konfigurasi database.' }) }
}
