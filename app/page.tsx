'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Users, Shield, Heart, Target, CheckCircle2, Play, MessageSquare, Award, GraduationCap, Clock } from 'lucide-react';

export default function HomePage() {
  const handleAdminAccess = () => {
    window.location.href = '/admin'
  }

  const sessions = [
    {
      id: 1,
      title: "Perkenalan & Pre-Test",
      description: "Mengenal peserta dan mengukur pemahaman awal tentang bullying",
      icon: <Users size={24} className="text-blue-600" />,
      duration: "45 menit"
    },
    {
      id: 2,
      title: "Kenali Bullying",
      description: "Memahami definisi, jenis, dan dampak bullying di lingkungan sekolah",
      icon: <Shield size={24} className="text-blue-600" />,
      duration: "60 menit"
    },
    {
      id: 3,
      title: "Kendalikan Bullying",
      description: "Mempelajari strategi untuk mencegah dan mengatasi situasi bullying",
      icon: <Target size={24} className="text-blue-600" />,
      duration: "60 menit"
    },
    {
      id: 4,
      title: "Coping Cerdas",
      description: "Mengembangkan keterampilan mengatasi emosi dan situasi sulit",
      icon: <Heart size={24} className="text-blue-600" />,
      duration: "60 menit"
    },
    {
      id: 5,
      title: "Berani Bicara",
      description: "Melatih kemampuan komunikasi asertif dan melaporkan bullying",
      icon: <MessageSquare size={24} className="text-blue-600" />,
      duration: "60 menit"
    },
    {
      id: 6,
      title: "Kawan Sejati",
      description: "Membangun pertemanan yang sehat dan mendukung sesama",
      icon: <Users size={24} className="text-blue-600" />,
      duration: "60 menit"
    },
    {
      id: 7,
      title: "Refleksi & Cerita Inspiratif",
      description: "Merefleksikan pembelajaran dan berbagi cerita inspiratif",
      icon: <Award size={24} className="text-blue-600" />,
      duration: "50 menit"
    },
    {
      id: 8,
      title: "Post-Test & Penutup",
      description: "Evaluasi akhir program dan penutupan dengan rencana tindak lanjut",
      icon: <GraduationCap size={24} className="text-blue-600" />,
      duration: "50 menit"
    }
  ];

  const benefits = [
    {
      title: "Belajar dengan cara interaktif",
      description: "Menggunakan metode pembelajaran yang menyenangkan dan mudah dipahami",
      icon: "🎯"
    },
    {
      title: "Materi berdasarkan penelitian bullying (Olweus, 1996)",
      description: "Konten yang telah terbukti efektif dalam mencegah bullying di sekolah",
      icon: "📚"
    },
    {
      title: "Membantu menciptakan sekolah yang aman & nyaman",
      description: "Berkontribusi menciptakan lingkungan belajar yang positif untuk semua",
      icon: "🏫"
    }
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Program Pencegahan Bullying
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Belajar bersama melalui 8 sesi interaktif untuk memahami, mencegah, dan mengatasi bullying di sekolah.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/sesi/perkenalan-pretest"
                  className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <Play size={24} className="mr-2" />
                  Mulai Sesi 1
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Shield size={48} className="text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">8 Sesi Interaktif</h3>
                  <p className="text-gray-600 mb-6">
                    Program komprehensif yang dirancang khusus untuk mencegah bullying di lingkungan sekolah
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="font-semibold text-blue-800">Durasi</div>
                      <div className="text-blue-600">1-2 jam</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="font-semibold text-blue-800">Format</div>
                      <div className="text-blue-600">Interaktif</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ringkasan Program */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ringkasan Program
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Program pembelajaran yang terstruktur dalam 8 sesi untuk membangun pemahaman yang komprehensif tentang pencegahan bullying.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sessions.map((session) => (
              <div key={session.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                <div className="flex items-center mb-4">
                  {session.icon}
                  <span className="ml-3 text-sm font-medium text-gray-500">Sesi {session.id}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {session.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {session.description}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={16} className="mr-1" />
                  {session.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Call to Action Penutup */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Yuk mulai perjalananmu hari ini!
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Bergabunglah dengan program pencegahan bullying dan jadilah bagian dari perubahan positif di sekolah Anda.
            </p>
            <Link 
              href="/sesi/perkenalan-pretest"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              <Play size={24} className="mr-2" />
              Mulai Sesi 1
              <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <h3 className="text-2xl font-bold mb-4">Anti-Bullying</h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Program pencegahan bullying yang komprehensif untuk menciptakan lingkungan sekolah yang aman dan nyaman.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Program</h4>
              <ul className="space-y-2">
                <li><Link href="/sesi/perkenalan-pretest" className="text-gray-300 hover:text-white transition-colors duration-200">Sesi 1: Perkenalan</Link></li>
                <li><Link href="/sesi/kenali-bullying" className="text-gray-300 hover:text-white transition-colors duration-200">Sesi 2: Kenali Bullying</Link></li>
                <li><Link href="/sesi/kendalikan-bullying" className="text-gray-300 hover:text-white transition-colors duration-200">Sesi 3: Kendalikan Bullying</Link></li>
                <li><Link href="/sesi/coping-cerdas" className="text-gray-300 hover:text-white transition-colors duration-200">Sesi 4: Coping Cerdas</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Tentang</h4>
              <ul className="space-y-2">
                <li><a href="#tentang" className="text-gray-300 hover:text-white transition-colors duration-200">Tentang Program</a></li>
                <li><a href="#kontak" className="text-gray-300 hover:text-white transition-colors duration-200">Kontak</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Kebijakan Privasi</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-200">Syarat & Ketentuan</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 Program Pencegahan Bullying. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
