import Link from 'next/link';
import { ArrowUpRight, ArrowRight, BookOpen, Heart, MessageCircle, Play, Sparkles, Clock, Check } from 'lucide-react';
import SessionCard from '@/components/SessionCard';
import FriendshipArt from '@/components/FriendshipArt';
import { sessions } from '@/lib/sessions';

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <p className="intro-note"><span className="small-star">✳</span> Ruang belajar, ruang jadi diri sendiri.</p>
            <h1>JADI TEMAN.<br />BUKAN <span className="bully-word">BULLY.<svg viewBox="0 0 370 20" aria-hidden="true"><path d="M4 11Q170 -2 364 8M12 17Q180 6 352 16" /></svg></span></h1>
            <p className="hero-description">Sekolah yang aman dimulai dari kita. Yuk, belajar kenali bullying, berani bersuara, dan jadi teman yang saling jaga.</p>
            <div className="hero-actions">
              <Link href="/sesi/perkenalan-pretest" className="brutal-button yellow-button">Mulai perjalananmu <ArrowUpRight size={21} /></Link>
              <Link href="#sesi" className="text-button"><Play size={16} fill="currentColor" /> Intip 8 sesinya</Link>
            </div>
            <p className="hero-footnote"><Check size={16} /> Buat siswa SMP <span>•</span> Belajar sesuai ritmemu</p>
          </div>
          <div className="hero-art">
            <div className="art-corner-note">Kita beda. Kita tetap teman.</div>
            <FriendshipArt />
            <div className="art-sticker sticker-pink"><Heart size={18} fill="currentColor" /> Saling jaga, yuk!</div>
            <div className="art-sticker sticker-white"><MessageCircle size={19} /> Suaramu berarti.</div>
            <div className="art-caption"><span>THE ANTI-BULLYING CLUB</span><span>Est. dari kepedulian ♡</span></div>
          </div>
        </div>
      </section>
      <div className="values-strip" aria-label="Nilai program"><div className="site-container"><span>Kenali bullying</span><span aria-hidden="true">✳</span><span>Berani bicara</span><span aria-hidden="true">✳</span><span>Saling dukung</span><span aria-hidden="true">✳</span><span>Tumbuh bersama</span><span aria-hidden="true">✳</span></div></div>
      <section id="tentang" className="about-section site-container">
        <div className="about-heading"><span className="section-kicker">Tempat yang aman buat belajar</span><h2>Hal kecil dari kamu.<br />Arti besar buat temanmu.</h2></div>
        <div className="about-copy"><p>Kadang, kita belum tahu kalau sebuah candaan bisa menyakitkan. Di sini, kita belajar memahami, peduli, dan mengambil sikap—bareng-bareng.</p><p className="method-note"><BookOpen size={18} /> Program psikoedukasi dengan kerangka Olweus (1996).</p></div>
        <div className="benefit-row">
          <article className="benefit-item"><div className="benefit-icon lilac"><BookOpen size={25} /></div><div><h3>Belajarnya nggak kaku</h3><p>Video, kuis, dan aktivitas yang ngajak kamu ikut terlibat.</p></div></article>
          <article className="benefit-item"><div className="benefit-icon pink"><MessageCircle size={25} /></div><div><h3>Berani jadi diri sendiri</h3><p>Kenali perasaanmu dan latih cara menyampaikan pendapat.</p></div></article>
          <article className="benefit-item"><div className="benefit-icon green"><Heart size={25} /></div><div><h3>Bareng, lebih kuat</h3><p>Bangun pertemanan yang peduli dan sekolah yang lebih aman.</p></div></article>
        </div>
      </section>
      <section id="sesi" className="curriculum-section">
        <div className="site-container">
          <div className="curriculum-heading"><div><span className="section-kicker">Satu sesi, satu langkah baik.</span><h2>8 SESI. BANYAK CERITA.<br />MULAI DARI SINI.</h2></div><p>Nggak perlu buru-buru. Ikuti sesinya berurutan,<br className="hidden sm:block" /> temukan hal baru di setiap langkah.</p><span className="curriculum-doodle" aria-hidden="true">↴</span></div>
          <div className="session-grid">{sessions.map(session => <SessionCard key={session.id} session={session} />)}</div>
          <div className="curriculum-note"><Clock size={17} /><span>45–60 menit per sesi</span><span className="note-divider">/</span><span>Video, diskusi, kuis & refleksi</span></div>
        </div>
      </section>
      <section className="closing-section site-container"><div className="closing-card"><div className="closing-spark" aria-hidden="true"><Sparkles size={52} strokeWidth={1.7} /></div><div><span className="section-kicker">Kebaikan itu bisa menular.</span><h2>Mulai dari satu langkah.<br />Mulai dari kamu.</h2><p>Jadi bagian dari sekolah yang bikin semua merasa diterima.</p></div><Link href="/sesi/perkenalan-pretest" className="brutal-button yellow-button">Yuk, mulai sesi 1 <ArrowRight size={21} /></Link></div></section>
    </div>
  );
}
