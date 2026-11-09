const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

// OpenNext embeds .env files in the Worker. Build a clean copy so local secrets
// and student data cannot end up in the deployment bundle.
const project = path.resolve(__dirname, '..')
const tempRoot = path.resolve(os.tmpdir())
const staging = fs.mkdtempSync(path.join(tempRoot, 'antibullying-cf-'))
const output = path.join(project, '.open-next')
const excluded = new Set(['node_modules', '.git', '.next', '.open-next', '.wrangler', 'data'])
try {
  fs.cpSync(project, staging, {
    recursive: true,
    filter(source) {
      const relative = path.relative(project, source)
      if (!relative) return true
      const top = relative.split(path.sep)[0]
      return !excluded.has(top) && !/^\.env(?:\.|$)/.test(top) && !/^\.dev\.vars/.test(top)
    },
  })
  // A junction makes Next's standalone tracing create symlinks that require
  // elevated Windows privileges. A real copy keeps this build portable.
  fs.cpSync(path.join(project, 'node_modules'), path.join(staging, 'node_modules'), { recursive: true, dereference: true })
  const env = { ...process.env }
  for (const key of ['ADMIN_PASSWORD', 'ADMIN_SESSION_SECRET', 'SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY']) delete env[key]
  const cli = path.join(staging, 'node_modules', '@opennextjs', 'cloudflare', 'dist', 'cli', 'index.js')
  const result = spawnSync(process.execPath, [cli, 'build'], { cwd: staging, env, stdio: 'inherit' })
  if (result.error) throw result.error
  if (result.status !== 0) throw new Error(`Cloudflare build failed (${result.status})`)
  if (output !== path.resolve(project, '.open-next')) throw new Error('Invalid output path')
  fs.rmSync(output, { recursive: true, force: true })
  fs.cpSync(path.join(staging, '.open-next'), output, { recursive: true })
  console.log('Worker build copied to .open-next without local environment files or student data.')
} finally {
  if (path.dirname(staging) !== tempRoot || !path.basename(staging).startsWith('antibullying-cf-')) throw new Error('Invalid temporary path')
  fs.rmSync(staging, { recursive: true, force: true })
}
