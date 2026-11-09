import Link from 'next/link';
import { Clock, ArrowUpRight, Flag, Search, Shield, MessageCircle, Users, Heart, BookOpen, Award } from 'lucide-react';
import type { Session } from '@/lib/sessions';
const icons = [Flag, Search, Shield, MessageCircle, Users, Heart, BookOpen, Award];
export default function SessionCard({ session }: { session: Session }) {
  const Icon = icons[session.id - 1] || BookOpen;
  return <Link href={`/sesi/${session.slug}`} className={`session-card session-color-${(session.id - 1) % 4}`}>
    <div className="session-card-top"><span className="session-number">SESI {String(session.id).padStart(2, '0')}</span><Icon size={28} strokeWidth={1.8} /></div>
    <h3>{session.title}</h3><p>{session.description}</p>
    <div className="session-card-bottom"><span><Clock size={14} />{session.duration}</span><span className="session-arrow"><ArrowUpRight size={21} /></span></div>
  </Link>;
}
