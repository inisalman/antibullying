const { requireAdmin } = require('../../../lib/adminAuth')
export default function handler(req, res) {
  if (!requireAdmin(req, res)) return
  return res.status(410).json({ error: 'Gunakan dashboard admin untuk melihat jawaban.' })
}
