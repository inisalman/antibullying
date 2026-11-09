import Link from 'next/link';
import Logo from './Logo';
export default function Footer() {
  return <footer className="site-footer"><div className="checker-border" aria-hidden="true" /><div className="site-container"><div className="footer-top"><div><Link href="/" className="brand-link"><Logo size={30} /><span>ANTI–BULLYING.</span></Link><p>Lebih peduli. Lebih berani. Lebih berarti.</p></div><div className="footer-links"><Link href="/#tentang">Tentang program</Link><Link href="/#sesi">Daftar sesi</Link><Link href="/sesi/perkenalan-pretest">Mulai belajar <span aria-hidden="true">↗</span></Link></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Program Pencegahan Bullying.</p><p>Materi psikoedukasi, bukan pengganti konseling profesional.</p><span>Dibuat untuk saling jaga ♡</span></div></div></footer>;
}
