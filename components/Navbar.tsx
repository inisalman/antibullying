'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  return <nav className="site-nav" aria-label="Navigasi utama"><div className="site-container nav-inner">
    <Link href="/" className="brand-link" aria-label="Anti-Bullying — Beranda"><span className="brand-icon"><Logo size={30} /></span><span>ANTI<span className="brand-dash">–</span>BULLYING<span className="brand-period">.</span></span></Link>
    <div className="desktop-links"><Link href="/" aria-current={pathname === '/' ? 'page' : undefined}>Beranda</Link><Link href="/#tentang">Tentang program</Link><Link href="/#sesi">Jelajahi sesi</Link></div>
    <Link href="/sesi/perkenalan-pretest" className="brutal-button nav-cta">Mulai belajar <ArrowUpRight size={18} /></Link>
    <button onClick={() => setIsOpen(!isOpen)} className="mobile-menu-toggle" aria-expanded={isOpen} aria-controls="mobile-navigation" aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}>{isOpen ? <X /> : <Menu />}</button>
    </div>{isOpen && <div id="mobile-navigation" className="mobile-links">{[{ href: '/', label: 'Beranda' }, { href: '/#tentang', label: 'Tentang program' }, { href: '/#sesi', label: 'Jelajahi sesi' }, { href: '/sesi/perkenalan-pretest', label: 'Mulai belajar' }].map(item => <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>{item.label}<ArrowUpRight size={17} /></Link>)}</div>}</nav>;
}
