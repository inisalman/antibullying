'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, CheckCircle2, Calendar, Users, BookOpen, MessageSquare, Play } from 'lucide-react';
import ActivityCard from '@/components/ActivityCard';

interface IceBreakerForm {
  nama: string;
  kelas: string;
  asalSekolah: string;
  kalimatPositif: string;
}

interface ExpectationForm {
  jawaban: string;
}

export default function Session1Page() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [iceBreakerForm, setIceBreakerForm] = useState<IceBreakerForm>({
    nama: '',
    kelas: '',
    asalSekolah: '',
    kalimatPositif: ''
  });
  const [iceBreakerSubmitted, setIceBreakerSubmitted] = useState(false);
  const [expectationForm, setExpectationForm] = useState<ExpectationForm>({
    jawaban: ''
  });
  const [expectationResponses, setExpectationResponses] = useState<string[]>([]);
  const [allActivitiesCompleted, setAllActivitiesCompleted] = useState(false);
  const [activitySubmitted, setActivitySubmitted] = useState<boolean[]>(new Array(5).fill(false));

  const handleIceBreakerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!iceBreakerForm.nama || !iceBreakerForm.kelas || !iceBreakerForm.asalSekolah || !iceBreakerForm.kalimatPositif) {
      alert('Semua field harus diisi!');
      return;
    }

    try {
      // 1. Create or get student
      const studentResponse = await fetch('/api/siswa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: iceBreakerForm.nama,
          kelas: iceBreakerForm.kelas,
          email: null
        })
      });
      const student = await studentResponse.json();
      if (!studentResponse.ok) throw new Error(student.error || 'Failed to create student');

      // 2. Get or create Sesi 1
      const sesiResponse = await fetch('/api/sesi');
      const allSesi = await sesiResponse.json();
      const sesi = allSesi.find((s: any) => s.nama_sesi === 'Sesi 1: Perkenalan & Pre-Test');
      if (!sesi) throw new Error('Sesi 1 not found');

      // 3. Get or create Kegiatan for Ice Breaking
      const kegiatanResponse = await fetch('/api/kegiatan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          namaKegiatan: 'Ice Breaking',
          sesiId: sesi.id
        })
      });
      const kegiatan = await kegiatanResponse.json();
      if (!kegiatanResponse.ok) throw new Error(kegiatan.error || 'Failed to get/create activity');

      // 4. Save answer
      const answerResponse = await fetch('/api/jawaban', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siswaId: student.id,
          kegiatanId: kegiatan.id,
          jawaban: iceBreakerForm.kalimatPositif
        })
      });
      const answer = await answerResponse.json();
      if (!answerResponse.ok) throw new Error(answer.error || 'Failed to save answer');

      localStorage.setItem('studentData', JSON.stringify(student)); // Save student for subsequent activities
      setIceBreakerSubmitted(true);
      setActivitySubmitted(prev => {
        const newState = [...prev];
        newState[0] = true;
        return newState;
      });
    } catch (error) {
      console.error('Error submitting Ice Breaker form:', error);
      alert(`Terjadi kesalahan: ${error instanceof Error ? error.message : 'Unknown error'}. Silakan coba lagi.`);
    }
  };

  const markActivityAsSubmitted = (activityIndex: number) => {
    setActivitySubmitted(prev => {
      const newState = [...prev];
      newState[activityIndex] = true;
      return newState;
    });
  };

  const handleNextActivity = () => {
    if (currentActivity < activities.length - 1) {
      setCurrentActivity(currentActivity + 1);
    } else {
      setAllActivitiesCompleted(true);
    }
  };

  const handlePrevActivity = () => {
    if (currentActivity > 0) {
      setCurrentActivity(currentActivity - 1);
    }
  };

  const handleExpectationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!expectationForm.jawaban.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }

    try {
      const studentData = localStorage.getItem('studentData');
      if (!studentData) {
        alert('Data siswa tidak ditemukan. Silakan isi form perkenalan terlebih dahulu.');
        return;
      }
      const student = JSON.parse(studentData);

      // Get Sesi 1
      const sesiResponse = await fetch('/api/sesi');
      const allSesi = await sesiResponse.json();
      const sesi = allSesi.find((s: any) => s.nama_sesi === 'Sesi 1: Perkenalan & Pre-Test');
      if (!sesi) throw new Error('Sesi 1 not found');

      // Get or create Kegiatan for Sharing Ekspektasi
      const kegiatanResponse = await fetch('/api/kegiatan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          namaKegiatan: 'Sharing Ekspektasi',
          sesiId: sesi.id
        })
      });
      const kegiatan = await kegiatanResponse.json();
      if (!kegiatanResponse.ok) throw new Error(kegiatan.error || 'Failed to get/create activity');

      // Save expectation answer
      const answerResponse = await fetch('/api/jawaban', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siswaId: student.id,
          kegiatanId: kegiatan.id,
          jawaban: expectationForm.jawaban
        })
      });
      const answer = await answerResponse.json();
      if (!answerResponse.ok) throw new Error(answer.error || 'Failed to save expectation');

      setExpectationResponses(prev => [...prev, expectationForm.jawaban]);
      setExpectationForm({ jawaban: '' });
      setActivitySubmitted(prev => {
        const newState = [...prev];
        newState[4] = true; // Kegiatan 5 (index 4)
        return newState;
      });
    } catch (error) {
      console.error('Error submitting expectation:', error);
      alert(`Terjadi kesalahan: ${error instanceof Error ? error.message : 'Unknown error'}. Silakan coba lagi.`);
    }
  };

  const activities = [
    {
      id: "ice-breaking",
      title: "Ice Breaking",
      type: "icebreaker" as const,
      description: "Perkenalan diri dengan form interaktif untuk mengenal peserta",
      duration: "10 menit"
    },
    {
      id: "facilitator-intro",
      title: "Perkenalan Fasilitator & Tujuan Program",
      type: "video" as const,
      description: "Pengenalan fasilitator dan penjelasan tujuan program pencegahan bullying",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "8 menit"
    },
    {
      id: "program-schedule",
      title: "Penjelasan Alur Program & Jadwal",
      type: "schedule" as const,
      description: "Timeline 8 sesi program dengan penjelasan setiap tahap pembelajaran",
      duration: "7 menit"
    },
    {
      id: "pre-test",
      title: "Pre-Test",
      type: "pretest" as const,
      description: "Kuesioner untuk mengukur pemahaman awal tentang bullying",
      url: "#",
      duration: "15 menit"
    },
    {
      id: "expectations-sharing",
      title: "Sharing Ekspektasi",
      type: "reflection" as const,
      description: "Berbagi harapan dan tujuan mengikuti program ini",
      duration: "5 menit"
    }
  ];

  const sessionSchedule = [
    { id: 1, title: "Perkenalan dan Pre-Test", description: "Pengenalan program dan pengukuran awal" },
    { id: 2, title: "Kenali Bullying", description: "Memahami definisi dan jenis-jenis bullying" },
    { id: 3, title: "Kendalikan Bullying", description: "Strategi pengendalian emosi dan perilaku" },
    { id: 4, title: "Coping Cerdas", description: "Strategi coping yang efektif" },
    { id: 5, title: "Berani Bicara", description: "Keberanian melaporkan bullying" },
    { id: 6, title: "Kawan Sejati", description: "Membangun pertemanan yang sehat" },
    { id: 7, title: "Refleksi dan Cerita Inspiratif", description: "Refleksi pembelajaran" },
    { id: 8, title: "Post-Test dan Penutup", description: "Evaluasi akhir dan penutupan" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Session Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link 
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              Kembali ke Beranda
            </Link>
          </div>

          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-2xl">1</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Perkenalan dan Pre-Test</h1>
                <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  <Calendar size={14} />
                  <span>45 menit</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg mb-6">
                Sesi pembuka program dengan perkenalan peserta dan pengukuran pemahaman awal tentang bullying.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle2 size={18} className="text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Tujuan Pembelajaran</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Memahami tujuan dan manfaat program pencegahan bullying</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Mengukur tingkat pemahaman awal tentang bullying</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Membangun komitmen untuk mengikuti program hingga selesai</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Info Sesi</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durasi:</span>
                      <span className="font-medium text-gray-900">45 menit</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Aktivitas:</span>
                      <span className="font-medium text-gray-900">5 aktivitas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sesi:</span>
                      <span className="font-medium text-gray-900">1 dari 8</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Section */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Aktivitas Pembelajaran</h2>
            <p className="text-gray-600">
              Ikuti setiap aktivitas secara berurutan untuk mendapatkan pemahaman yang optimal.
            </p>
            
            {/* Progress Indicator */}
            <div className="mt-6 bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-600">Progress:</span>
                  <span className="text-sm text-gray-900">
                    {currentActivity + 1} dari {activities.length} kegiatan
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevActivity}
                    disabled={currentActivity === 0}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Sebelumnya
                  </button>
                  <button
                    onClick={handleNextActivity}
                    disabled={currentActivity === activities.length - 1 || !activitySubmitted[currentActivity]}
                    className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentActivity + 1) / activities.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Current Activity */}
            {currentActivity === 0 && (
              <ActivityCard 
                activity={activities[0]} 
                index={0}
              >
                <form onSubmit={handleIceBreakerSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        value={iceBreakerForm.nama}
                        onChange={(e) => setIceBreakerForm(prev => ({ ...prev, nama: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Masukkan nama lengkap"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kelas *
                      </label>
                      <input
                        type="text"
                        value={iceBreakerForm.kelas}
                        onChange={(e) => setIceBreakerForm(prev => ({ ...prev, kelas: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Contoh: X IPA 1"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asal Sekolah *
                    </label>
                    <input
                      type="text"
                      value={iceBreakerForm.asalSekolah}
                      onChange={(e) => setIceBreakerForm(prev => ({ ...prev, asalSekolah: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nama sekolah"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kalimat Positif tentang Diri *
                    </label>
                    <textarea
                      value={iceBreakerForm.kalimatPositif}
                      onChange={(e) => setIceBreakerForm(prev => ({ ...prev, kalimatPositif: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      placeholder="Tuliskan satu kalimat positif tentang diri Anda..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    Submit Perkenalan
                  </button>
                </form>

                {iceBreakerSubmitted && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg animate-fadeIn">
                    <h4 className="font-medium text-green-800 mb-2">Ringkasan Perkenalan:</h4>
                    <div className="text-sm text-green-700 space-y-1">
                      <p><strong>Nama:</strong> {iceBreakerForm.nama}</p>
                      <p><strong>Kelas:</strong> {iceBreakerForm.kelas}</p>
                      <p><strong>Asal Sekolah:</strong> {iceBreakerForm.asalSekolah}</p>
                      <p><strong>Kalimat Positif:</strong> "{iceBreakerForm.kalimatPositif}"</p>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={handleNextActivity}
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                      >
                        Lanjut ke Kegiatan Selanjutnya
                      </button>
                    </div>
                  </div>
                )}
              </ActivityCard>
            )}

            {currentActivity === 1 && (
              <ActivityCard 
                activity={activities[1]} 
                index={1}
              >
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Selamat datang di Program Pencegahan Bullying! Saya adalah fasilitator yang akan mendampingi Anda selama 8 sesi pembelajaran ini.
                  </p>
                  <p className="text-gray-600">
                    Program ini bertujuan untuk membantu Anda memahami, mencegah, dan mengatasi bullying di lingkungan sekolah. Melalui program ini, kita akan belajar bersama tentang strategi-strategi efektif untuk menciptakan lingkungan yang aman dan positif.
                  </p>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Video Pengenalan:</h4>
                    <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <Play size={48} className="text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Video akan ditampilkan di sini</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        markActivityAsSubmitted(1);
                        handleNextActivity();
                      }}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      Saya Sudah Menonton Video
                    </button>
                  </div>
                </div>
              </ActivityCard>
            )}

            {currentActivity === 2 && (
              <ActivityCard 
                activity={activities[2]} 
                index={2}
              >
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Berikut adalah timeline lengkap program pembelajaran yang akan kita jalani selama 8 sesi:
                  </p>
                  <div className="space-y-3">
                    {sessionSchedule.map((session, index) => (
                      <div key={session.id} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-xs font-medium">{session.id}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{session.title}</h4>
                          <p className="text-sm text-gray-600">{session.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        markActivityAsSubmitted(2);
                        handleNextActivity();
                      }}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      Saya Sudah Melihat Jadwal
                    </button>
                  </div>
                </div>
              </ActivityCard>
            )}

            {currentActivity === 3 && (
              <ActivityCard 
                activity={activities[3]} 
                index={3}
              >
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Sebelum memulai pembelajaran, mari kita ukur pemahaman awal Anda tentang bullying melalui pre-test ini.
                  </p>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-medium text-amber-800 mb-2">Pre-Test Pemahaman Bullying</h4>
                    <p className="text-sm text-amber-700 mb-3">
                      Kuesioner ini akan membantu kami memahami tingkat pemahaman Anda saat ini tentang bullying.
                    </p>
                    <button
                      onClick={() => window.open('#', '_blank')}
                      className="inline-flex items-center space-x-2 bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors duration-200 font-medium"
                    >
                      <BookOpen size={16} />
                      <span>Mulai Pre-Test</span>
                      <ExternalLink size={14} />
                    </button>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={() => {
                        markActivityAsSubmitted(3);
                        handleNextActivity();
                      }}
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      Saya Sudah Mengisi Pre-Test
                    </button>
                  </div>
                </div>
              </ActivityCard>
            )}

            {currentActivity === 4 && (
              <ActivityCard 
                activity={activities[4]} 
                index={4}
              >
                <div className="space-y-4">
                  <form onSubmit={handleExpectationSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apa yang ingin kamu pelajari dari program ini? *
                      </label>
                      <textarea
                        value={expectationForm.jawaban}
                        onChange={(e) => setExpectationForm(prev => ({ ...prev, jawaban: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        placeholder="Tuliskan harapan dan tujuan Anda mengikuti program ini..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-3 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium"
                    >
                      Bagikan Ekspektasi
                    </button>
                  </form>

                  {expectationResponses.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Responses:</h4>
                      {expectationResponses.map((response, index) => (
                        <div key={index} className="bg-purple-50 border-l-4 border-purple-200 p-3 rounded-r-lg animate-fadeIn">
                          <div className="flex items-start space-x-2">
                            <MessageSquare size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-purple-800">{response}</p>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                        >
                          Selesai - Lanjut ke Sesi 2
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Completion Message */}
            {allActivitiesCompleted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Selamat! 🎉</h3>
                <p className="text-green-700 mb-6">
                  Anda telah menyelesaikan semua kegiatan di Sesi 1. Sekarang Anda siap untuk melanjutkan ke Sesi 2: "Kenali Bullying".
                </p>
                <Link 
                  href="/sesi/kenali-bullying"
                  className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  <span>Lanjut ke Sesi 2</span>
                  <ArrowLeft size={20} className="rotate-180" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div></div>
            <Link 
              href="/sesi/kenali-bullying"
              className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <div className="text-right">
                <div className="text-sm text-gray-500">Sesi Selanjutnya</div>
                <div className="font-medium">Sesi 2: Kenali Bullying</div>
              </div>
              <ArrowLeft size={20} className="ml-2 rotate-180" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
