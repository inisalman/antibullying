const auth = require('../../../lib/adminAuth')
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (req.method === 'DELETE') { auth.clearSession(res); return res.status(200).json({ ok: true }) }
  if (req.method !== 'POST') return res.status(405).json({ error: 'Metode tidak didukung.' })
  try {
    auth.config()
    if (!auth.allowAttempt(req)) return res.status(429).json({ error: 'Terlalu banyak percobaan. Coba lagi nanti.' })
    if (typeof req.body?.password !== 'string' || !auth.checkPassword(req.body.password)) return res.status(401).json({ error: 'Kata sandi salah.' })
    auth.setSession(res)
    return res.status(200).json({ ok: true })
  } catch (error) { return res.status(503).json({ error: error.message }) }
}
