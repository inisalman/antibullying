const crypto = require('crypto')
const cookieName = 'antibullying_admin'
const maxAge = 8 * 60 * 60
const attempts = new Map()

function config() {
  const password = process.env.ADMIN_PASSWORD
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!password || password.length < 12 || !secret || secret.length < 32) throw new Error('ADMIN_PASSWORD (minimal 12 karakter) dan ADMIN_SESSION_SECRET (minimal 32 karakter) harus dikonfigurasi.')
  return { password, secret }
}
function signature(value, secret) { return crypto.createHmac('sha256', secret).update(value).digest('hex') }
function equal(a, b) {
  const x = Buffer.from(a || '')
  const y = Buffer.from(b || '')
  return x.length === y.length && crypto.timingSafeEqual(x, y)
}
function isAdmin(req) {
  try {
    const { secret } = config()
    const token = (req.headers.cookie || '').split(';').map(s => s.trim()).find(s => s.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1)
    if (!token) return false
    const [expires, nonce, sig] = token.split('.')
    return Number(expires) > Date.now() && equal(sig, signature(`${expires}.${nonce}`, secret))
  } catch { return false }
}
function requireAdmin(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  if (!isAdmin(req)) { res.status(401).json({ error: 'Silakan masuk sebagai admin.' }); return false }
  return true
}
function setSession(res) {
  const { secret } = config()
  const value = `${Date.now() + maxAge * 1000}.${crypto.randomBytes(24).toString('hex')}`
  res.setHeader('Set-Cookie', `${cookieName}=${value}.${signature(value, secret)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`)
}
function clearSession(res) { res.setHeader('Set-Cookie', `${cookieName}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${process.env.NODE_ENV === 'production' ? '; Secure' : ''}`) }
function checkPassword(input) { return equal(input, config().password) }
function allowAttempt(req) {
  const key = req.headers['cf-connecting-ip'] || req.socket?.remoteAddress || 'unknown'
  const now = Date.now(); const record = attempts.get(key) || { count: 0, until: now + 15 * 60 * 1000 }
  if (record.until < now) { record.count = 0; record.until = now + 15 * 60 * 1000 }
  record.count++; attempts.set(key, record)
  return record.count <= 10
}
module.exports = { config, isAdmin, requireAdmin, setSession, clearSession, checkPassword, allowAttempt }
