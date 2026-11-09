import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, BookOpen, Download, LogOut, MessageSquare, RefreshCw, Search, ShieldCheck, Users } from 'lucide-react'
import * as XLSX from 'xlsx'

const colors = ['#ffeaa3', '#f6c8d6', '#d5ead9', '#ded1f5']
const safeCell = value => typeof value === 'string' && /^[\s\u0000-\u001f]*[=+@\-\t\r]/.test(value) ? "'" + value : value
const formatDate = value => { const date = new Date(value); return Number.isNaN(date.getTime()) ? '-' : new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Jakarta' }).format(date) }

export default function AdminDashboard() {
  const [state, setState] = useState('loading')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [data, setData] = useState(null)
  const [query, setQuery] = useState('')
  const [sessionId, setSessionId] = useState('all')
  const [busy, setBusy] = useState(false)

  async function load() {
    setError('')
    try {
      const response = await fetch('/api/admin/stats', { cache: 'no-store' })
      const result = await response.json()
      if (response.status === 401) { setData(null); setState('login'); return }
      if (!response.ok) throw new Error(result.error || 'Data tidak dapat dimuat.')
      setData(result); setState('ready')
    } catch (err) { setError(err.message); setState(current => current === 'ready' ? 'ready' : 'error') }
  }
  useEffect(() => { load() }, [])
  async function login(event) {
    event.preventDefault(); setBusy(true); setError('')
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Gagal masuk.')
      setPassword(''); await load()
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  async function logout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    setData(null); setQuery(''); setSessionId('all'); setState('login')
  }
  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase('id')
    return (data?.answers || []).filter(item => (sessionId === 'all' || item.sesiId === sessionId) && (!term || [item.nama, item.kelas, item.sekolah, item.kegiatan, item.jawaban].some(value => String(value || '').toLocaleLowerCase('id').includes(term))))
  }, [data, query, sessionId])
  function exportExcel() {
    const rows = filtered.map(item => Object.fromEntries(Object.entries({ Nama: item.nama, Kelas: item.kelas, Sekolah: item.sekolah, Sesi: item.sesi, Kegiatan: item.kegiatan, Jawaban: item.jawaban, 'Waktu (WIB)': formatDate(item.timestamp) }).map(([key,value]) => [key,safeCell(value)])))
    const sheet = XLSX.utils.json_to_sheet(rows)
    sheet['!cols'] = [20, 12, 24, 32, 30, 60, 24].map(wch => ({ wch }))
    const book = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(book, sheet, 'Jawaban'); XLSX.writeFile(book, 'jawaban-program.xlsx')
  }

  if (state === 'loading') return <div className="admin-login-page"><p>Memuat dashboard...</p></div>
  if (state === 'login' || state === 'error') return <div className="admin-login-page"><div className="admin-login-card"><Link href="/" className="admin-brand"><span>✳</span> ANTI–BULLYING.</Link><span className="admin-eyebrow">Ruang fasilitator</span><h1>Halo, admin!</h1><p>Masuk untuk melihat jawaban dan aktivitas peserta.</p>{state === 'login' ? <form onSubmit={login}><label htmlFor="admin-password">Kata sandi admin</label><input id="admin-password" type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required /><button className="admin-button" disabled={busy}>{busy ? 'Sedang masuk...' : 'Masuk ke dashboard'} <ArrowUpRight size={18} /></button></form> : <button className="admin-button" onClick={load}>Coba lagi <RefreshCw size={17} /></button>}{error && <p className="admin-error" role="alert">{error}</p>}<Link className="admin-back" href="/">← Kembali ke website</Link></div></div>

  return <div className="admin-page">
    <header className="admin-header"><div className="admin-wrap admin-header-inner"><Link href="/" className="admin-brand"><span>✳</span> ANTI–BULLYING.</Link><div className="admin-header-actions"><Link href="/">Lihat website <ArrowUpRight size={15} /></Link><button onClick={logout}><LogOut size={17} /> Keluar</button></div></div></header>
    <main className="admin-wrap admin-main">
      <div className="admin-intro"><div><span className="admin-eyebrow">Ruang fasilitator <span>✳</span></span><h1>Dashboard admin<span>.</span></h1><p>Pantau perjalanan belajar dan jawaban peserta di sini.</p></div><button className="admin-refresh" onClick={load}><RefreshCw size={16} /> Muat ulang</button></div>
      {error && <p className="admin-error" role="alert">{error}</p>}
      <section className="admin-overview" aria-label="Ringkasan program"><div className="admin-summary"><span className="admin-icon"><Users size={23} /></span><div><p>Peserta terdaftar</p><strong>{data.totalSiswa}</strong></div></div><div className="admin-summary"><span className="admin-icon pink-icon"><MessageSquare size={23} /></span><div><p>Jawaban terkumpul</p><strong>{data.totalJawaban}</strong></div></div><div className="admin-summary"><span className="admin-icon mint-icon"><BookOpen size={23} /></span><div><p>Sesi pembelajaran</p><strong>{data.sessions.length}</strong></div></div><div className="admin-overview-note"><ShieldCheck size={24} /><p>Data peserta hanya untuk fasilitator yang berwenang.</p></div></section>
      <section className="admin-sessions"><div className="admin-section-head"><div><span className="admin-eyebrow">Perjalanan belajar</span><h2>Jelajahi per sesi<span>.</span></h2></div><p>Jumlah peserta yang sudah mengirim jawaban.</p></div><div className="admin-session-grid">{data.sessions.map((session, index) => <button key={session.id} onClick={() => { setSessionId(session.id); document.getElementById('jawaban').scrollIntoView({ behavior: 'smooth' }) }} className="admin-session" style={{ background: colors[index % colors.length] }}><div><span className="admin-session-number">{String(index + 1).padStart(2, '0')}</span><ArrowUpRight size={19} /></div><strong>{session.nama.replace(/^Sesi \d+:\s*/, '')}</strong><span>{session.siswa} peserta · {session.jawaban} jawaban</span></button>)}</div></section>
      <section className="admin-answers" id="jawaban"><div className="admin-section-head"><div><span className="admin-eyebrow">Catatan pembelajaran</span><h2>Jawaban peserta<span>.</span></h2><p>Cari dan pilih sesi untuk meninjau jawaban.</p></div><button onClick={exportExcel} className="admin-button export-button" disabled={!filtered.length}><Download size={18} /> Unduh Excel ({filtered.length})</button></div>
      <div className="admin-filters"><label className="admin-search"><Search size={18} /><span className="sr-only">Cari jawaban</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari nama, kelas, atau jawaban..." /></label><label><span className="sr-only">Filter sesi</span><select value={sessionId} onChange={e => setSessionId(e.target.value)}><option value="all">Semua sesi</option>{data.sessions.map(session => <option key={session.id} value={session.id}>{session.nama}</option>)}</select></label></div>
      {filtered.length ? <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Peserta</th><th>Sesi & kegiatan</th><th>Jawaban</th><th>Waktu (WIB)</th></tr></thead><tbody>{filtered.map(answer => <tr key={answer.id}><td><strong>{answer.nama}</strong><small>{answer.kelas}{answer.sekolah !== '-' ? ` · ${answer.sekolah}` : ''}</small></td><td><strong>{answer.sesi}</strong><small>{answer.kegiatan}</small></td><td className="admin-answer-text">{answer.jawaban}</td><td>{formatDate(answer.timestamp)}</td></tr>)}</tbody></table></div> : <div className="admin-empty"><MessageSquare size={27} /><strong>{data.answers.length ? 'Tidak ada jawaban yang cocok.' : 'Belum ada jawaban yang masuk.'}</strong><p>{data.answers.length ? 'Coba ubah kata pencarian atau pilih sesi lain.' : 'Jawaban peserta akan muncul setelah mereka mengisi kegiatan.'}</p></div>}
      </section><footer className="admin-footer">Program Pencegahan Bullying <span>✳</span> Belajar untuk saling menjaga.</footer>
    </main></div>
}
