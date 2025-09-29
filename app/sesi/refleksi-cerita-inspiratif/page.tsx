'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, CheckCircle2, Calendar, Play, MessageSquare, Target, BookOpen, Users, Heart, Star, Award } from 'lucide-react';
import ActivityCard from '@/components/ActivityCard';

interface SharingForm {
  jawaban: string;
}

interface ReflectionForm {
  pelajaranTerbesar: string;
  perubahanInginDibuat: string;
}


export default function Session7Page() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [sharingForm, setSharingForm] = useState<SharingForm>({
    jawaban: ''
  });
  const [sharingSubmitted, setSharingSubmitted] = useState(false);
  const [sharingResponses, setSharingResponses] = useState<string[]>([]);
  const [reflectionForm, setReflectionForm] = useState<ReflectionForm>({
    pelajaranTerbesar: '',
    perubahanInginDibuat: ''
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);
  const [allActivitiesCompleted, setAllActivitiesCompleted] = useState(false);

  const handleSharingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sharingForm.jawaban.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 7: Refleksi Cerita Inspiratif',
        activityName: 'Cerita Inspiratif',
        answer: sharingForm.jawaban
      });
      
      if (result.success) {
        setSharingResponses(prev => [...prev, sharingForm.jawaban]);
        setSharingSubmitted(true);
        setSharingForm({ jawaban: '' });
        alert('Jawaban berhasil disimpan!');
      } else {
        alert('Gagal menyimpan jawaban: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
    }
  };

  const handleReflectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reflectionForm.pelajaranTerbesar.trim() || !reflectionForm.perubahanInginDibuat.trim()) {
      alert('Semua field harus diisi!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 7: Refleksi Cerita Inspiratif',
        activityName: 'Refleksi Diri',
        answer: JSON.stringify(reflectionForm)
      });
      
      if (result.success) {
        setReflectionSubmitted(true);
        alert('Jawaban berhasil disimpan!');
      } else {
        alert('Gagal menyimpan jawaban: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
    }
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

  const activities = [
    {
      id: "sesi-sharing-bebas",
      title: "Sesi Sharing Bebas",
      type: "reflection" as const,
      description: "Berbagi pengalaman dan cerita inspiratif dari peserta",
      duration: "15 menit"
    },
    {
      id: "video-kisah-nyata",
      title: "Video Kisah Nyata",
      type: "video" as const,
      description: "Video inspiratif tentang kisah nyata pencegahan bullying",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "15 menit"
    },
    {
      id: "lembar-refleksi-digital",
      title: "Lembar Refleksi Digital",
      type: "form" as const,
      description: "Refleksi mendalam tentang pembelajaran dan perubahan",
      duration: "15 menit"
    },
    {
      id: "motivasi-penutup",
      title: "Motivasi Penutup",
      type: "reading" as const,
      description: "Kata-kata penguatan dan motivasi dari fasilitator",
      duration: "5 menit"
    }
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
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-indigo-600 font-bold text-2xl">7</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Refleksi & Cerita Inspiratif</h1>
                <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  <Calendar size={14} />
                  <span>50 menit</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg mb-6">
                Merefleksikan pembelajaran dan berbagi cerita inspiratif tentang pencegahan bullying.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle2 size={18} className="text-indigo-600" />
                    <h3 className="font-semibold text-gray-900">Tujuan Pembelajaran</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Merefleksikan pembelajaran dari sesi-sesi sebelumnya</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Menginspirasi dengan cerita-cerita positif</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Memantapkan komitmen untuk mencegah bullying</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Info Sesi</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durasi:</span>
                      <span className="font-medium text-gray-900">50 menit</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Aktivitas:</span>
                      <span className="font-medium text-gray-900">4 aktivitas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sesi:</span>
                      <span className="font-medium text-gray-900">7 dari 8</span>
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
                    disabled={currentActivity === activities.length - 1}
                    className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentActivity + 1) / activities.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Kegiatan 1: Sesi Sharing Bebas */}
            {currentActivity === 0 && (
              <ActivityCard 
                activity={activities[0]} 
                index={0}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Sharing Pengalaman</h4>
                  <p className="text-gray-600">
                    Mari kita berbagi pengalaman dan cerita inspiratif yang telah kita alami selama program ini.
                  </p>
                  
                  <form onSubmit={handleSharingSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bagikan pengalaman atau cerita inspiratif Anda: *
                      </label>
                      <textarea
                        value={sharingForm.jawaban}
                        onChange={(e) => setSharingForm(prev => ({ ...prev, jawaban: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows={4}
                        placeholder="Tuliskan pengalaman atau cerita inspiratif yang ingin Anda bagikan..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-3 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
                    >
                      Bagikan Cerita
                    </button>
                  </form>

                  {sharingResponses.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Cerita yang Dibagikan:</h4>
                      {sharingResponses.map((response, index) => (
                        <div key={index} className="bg-indigo-50 border-l-4 border-indigo-200 p-3 rounded-r-lg animate-fadeIn">
                          <div className="flex items-start space-x-2">
                            <Heart size={16} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-indigo-800">{response}</p>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
                        >
                          Lanjut ke Kegiatan Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 2: Video Kisah Nyata */}
            {currentActivity === 1 && (
              <ActivityCard 
                activity={activities[1]} 
                index={1}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Video Inspiratif</h4>
                  <p className="text-gray-600">
                    Mari kita tonton video inspiratif tentang kisah nyata pencegahan bullying dan bagaimana seseorang berhasil mengatasi situasi sulit.
                  </p>
                  
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Video Kisah Nyata:</h5>
                    <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <Play size={48} className="text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Video kisah inspiratif</p>
                        <p className="text-sm text-gray-400 mt-1">Durasi: 15 menit</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={handleNextActivity}
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
                    >
                      Lanjut ke Kegiatan Selanjutnya
                    </button>
                  </div>
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 3: Lembar Refleksi Digital */}
            {currentActivity === 2 && (
              <ActivityCard 
                activity={activities[2]} 
                index={2}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Refleksi Mendalam</h4>
                  <p className="text-gray-600">
                    Mari kita refleksikan pembelajaran yang telah kita dapatkan dan perubahan yang ingin kita buat.
                  </p>
                  
                  <form onSubmit={handleReflectionSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apa pelajaran terbesar dari program ini? *
                      </label>
                      <textarea
                        value={reflectionForm.pelajaranTerbesar}
                        onChange={(e) => setReflectionForm(prev => ({ ...prev, pelajaranTerbesar: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows={3}
                        placeholder="Tuliskan pelajaran terbesar yang Anda dapatkan..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apa perubahan yang ingin saya buat? *
                      </label>
                      <textarea
                        value={reflectionForm.perubahanInginDibuat}
                        onChange={(e) => setReflectionForm(prev => ({ ...prev, perubahanInginDibuat: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        rows={3}
                        placeholder="Tuliskan perubahan yang ingin Anda buat..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
                    >
                      Simpan Refleksi
                    </button>
                  </form>

                  {reflectionSubmitted && (
                    <div className="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-lg animate-fadeIn">
                      <h4 className="font-medium text-indigo-800 mb-2">Refleksi Anda:</h4>
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded border">
                          <h5 className="font-medium text-indigo-800 text-sm mb-1">Pelajaran Terbesar:</h5>
                          <p className="text-sm text-indigo-700">{reflectionForm.pelajaranTerbesar}</p>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <h5 className="font-medium text-indigo-800 text-sm mb-1">Perubahan yang Ingin Dibuat:</h5>
                          <p className="text-sm text-indigo-700">{reflectionForm.perubahanInginDibuat}</p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
                        >
                          Lanjut ke Kegiatan Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 4: Motivasi Penutup */}
            {currentActivity === 3 && (
              <ActivityCard 
                activity={activities[3]} 
                index={3}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Kata-kata Penguatan</h4>
                  <p className="text-gray-600">
                    Mari kita tutup dengan kata-kata penguatan dan motivasi dari fasilitator.
                  </p>
                  
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
                    <div className="text-center">
                      <Award size={48} className="text-indigo-600 mx-auto mb-4" />
                      <h5 className="font-medium text-indigo-800 mb-3">Pesan dari Fasilitator</h5>
                      <div className="text-sm text-indigo-700 space-y-3">
                        <p>
                          "Selamat! Anda telah menyelesaikan 7 sesi program pencegahan bullying. 
                          Perjalanan ini menunjukkan komitmen Anda untuk menciptakan lingkungan yang lebih baik."
                        </p>
                        <p>
                          "Ingatlah bahwa setiap langkah kecil yang Anda ambil untuk mencegah bullying 
                          memiliki dampak yang besar. Anda adalah agen perubahan yang sesungguhnya."
                        </p>
                        <p>
                          "Teruslah menjadi teladan bagi teman-teman Anda. Jadilah suara bagi yang tidak bersuara, 
                          dan jadilah teman yang selalu mendukung sesama."
                        </p>
                        <p className="font-medium">
                          "Bersama-sama, kita bisa menciptakan dunia yang lebih aman dan penuh kasih sayang. 
                          Terima kasih telah menjadi bagian dari perubahan ini!"
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={handleNextActivity}
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
                    >
                      Selesai - Lanjut ke Sesi 8
                    </button>
                  </div>
                </div>
              </ActivityCard>
            )}

            {/* Completion Message */}
            {allActivitiesCompleted && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-indigo-800 mb-2">Selamat! 🎉</h3>
                <p className="text-indigo-700 mb-6">
                  Anda telah menyelesaikan semua kegiatan di Sesi 7. Sekarang Anda siap untuk melanjutkan ke Sesi 8: "Post-Test dan Penutup".
                </p>
                <Link 
                  href="/sesi/posttest-penutup"
                  className="inline-flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
                >
                  <span>Lanjut ke Sesi 8</span>
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
            <Link 
              href="/sesi/kawan-sejati"
              className="inline-flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              <div className="text-left">
                <div className="text-sm text-gray-500">Sesi Sebelumnya</div>
                <div className="font-medium">Sesi 6: Kawan Sejati</div>
              </div>
            </Link>
            <Link 
              href="/sesi/posttest-penutup"
              className="inline-flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-200"
            >
              <div className="text-right">
                <div className="text-sm text-gray-500">Sesi Selanjutnya</div>
                <div className="font-medium">Sesi 8: Post-Test dan Penutup</div>
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
