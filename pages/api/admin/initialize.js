const { requireAdmin } = require('../../../lib/adminAuth')
export default function handler(req, res) {
  if (!requireAdmin(req, res)) return
  return res.status(410).json({ error: 'Fitur lama tidak aktif. Gunakan dashboard admin.' })
}
