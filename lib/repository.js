const { createClient } = require('@supabase/supabase-js')

const seedSessions = [
  'Sesi 1: Perkenalan & Pre-Test', 'Sesi 2: Kenali Bullying',
  'Sesi 3: Berani Bicara', 'Sesi 4: Kawan Sejati',
  'Sesi 5: Coping Cerdas', 'Sesi 6: Kendalikan Bullying',
  'Sesi 7: Refleksi Cerita Inspiratif', 'Sesi 8: Post-Test & Penutup'
]

function storage() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (url && key) return { kind: 'supabase', client: createClient(url, key, { auth: { persistSession: false } }) }
  if (process.env.STORAGE_BACKEND === 'supabase' || process.env.VERCEL || process.env.NODE_ENV === 'production') throw new Error('Database belum dikonfigurasi. Atur SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY.')
  return { kind: 'local', db: require('./localDb') }
}

async function list(table) {
  const source = storage()
  if (source.kind === 'local') return source.db[table].getAll()
  const rows = []
  for (let start = 0; ; start += 1000) {
    const { data, error } = await source.client.from(table).select('*').range(start, start + 999)
    if (error) throw error
    rows.push(...data)
    if (data.length < 1000) return rows
  }
}
async function insert(table, row) {
  const source = storage()
  if (source.kind === 'local') return source.db[table].create(row)
  const { data, error } = await source.client.from(table).insert(row).select().single()
  if (error) throw error
  return data
}
async function ensureSessions() {
  let rows = await list('sesi')
  for (const nama of seedSessions) {
    if (!rows.some(row => row.nama_sesi === nama)) {
      try { await insert('sesi', { nama_sesi: nama }) } catch (error) {
        rows = await list('sesi')
        if (!rows.some(row => row.nama_sesi === nama)) throw error
      }
    }
  }
  return list('sesi')
}
function displaySessionName(name = '') {
  const key = name.toLowerCase()
  if (key.includes('perkenalan')) return 'Sesi 1: Perkenalan dan Pre-Test'
  if (key.includes('kenali')) return 'Sesi 2: Kenali Bullying'
  if (key.includes('kendalikan')) return 'Sesi 3: Kendalikan Bullying'
  if (key.includes('coping')) return 'Sesi 4: Coping Cerdas'
  if (key.includes('berani')) return 'Sesi 5: Berani Bicara'
  if (key.includes('kawan')) return 'Sesi 6: Kawan Sejati'
  if (key.includes('refleksi')) return 'Sesi 7: Refleksi dan Cerita Inspiratif'
  if (key.includes('penutup') || key.includes('post-test')) return 'Sesi 8: Post-Test dan Penutup'
  return name
}
module.exports = { list, insert, ensureSessions, displaySessionName, storage }
