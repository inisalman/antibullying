const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { spawnSync } = require('node:child_process')
const dotenv = require('dotenv')

const root = path.resolve(__dirname, '..')
const envPath = path.join(root, '.env.local')
const builtEnvPath = path.join(root, '.open-next', 'cloudflare', 'next-env.mjs')
if (!fs.existsSync(envPath) || !fs.existsSync(builtEnvPath)) throw new Error('Isi .env.local dan jalankan npm run cf:build terlebih dahulu.')
const env = dotenv.parse(fs.readFileSync(envPath))
const required = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'ADMIN_PASSWORD', 'ADMIN_SESSION_SECRET']
for (const key of required) if (!env[key]?.trim()) throw new Error(`${key} belum diisi di .env.local.`)
if (env.ADMIN_PASSWORD.length < 12 || env.ADMIN_SESSION_SECRET.length < 32) throw new Error('Kredensial admin terlalu pendek.')
const builtEnv = fs.readFileSync(builtEnvPath, 'utf8')
if (!/^\s*export const production = \{\};\s*export const development = \{\};\s*export const test = \{\};\s*$/.test(builtEnv)) throw new Error('Bundle berisi environment lokal. Jalankan npm run cf:build yang aman sebelum deployment.')
const tempRoot = path.resolve(os.tmpdir())
const tempDir = fs.mkdtempSync(path.join(tempRoot, 'antibullying-secrets-'))
try {
  const secretsFile = path.join(tempDir, 'secrets.json')
  fs.writeFileSync(secretsFile, JSON.stringify(Object.fromEntries(required.map(key => [key, env[key]]))), { mode: 0o600 })
  const cli = path.join(root, 'node_modules', 'wrangler', 'bin', 'wrangler.js')
  const result = spawnSync(process.execPath, [cli, 'deploy', '--secrets-file', secretsFile, '--keep-vars'], { cwd: root, stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) process.exitCode = result.status || 1
} finally {
  if (path.dirname(tempDir) !== tempRoot || !path.basename(tempDir).startsWith('antibullying-secrets-')) throw new Error('Invalid temporary path')
  fs.rmSync(tempDir, { recursive: true, force: true })
}
