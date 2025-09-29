'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, CheckCircle2, Calendar, Play, MessageSquare, Target, BookOpen, Users, Shield } from 'lucide-react';
import ActivityCard from '@/components/ActivityCard';

interface RolePlayForm {
  jawaban: string;
}

interface AssertiveStatement {
  sayaMerasa: string;
  karena: string;
  sayaIngin: string;
}

interface ReflectionForm {
  jawaban: string;
}

export default function Session3Page() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [rolePlayForm, setRolePlayForm] = useState<RolePlayForm>({
    jawaban: ''
  });
  const [rolePlaySubmitted, setRolePlaySubmitted] = useState(false);
  const [rolePlayResponses, setRolePlayResponses] = useState<string[]>([]);
  const [assertiveStatement, setAssertiveStatement] = useState<AssertiveStatement>({
    sayaMerasa: '',
    karena: '',
    sayaIngin: ''
  });
  const [assertiveSubmitted, setAssertiveSubmitted] = useState(false);
  const [reflectionForm, setReflectionForm] = useState<ReflectionForm>({
    jawaban: ''
  });
  const [reflectionResponses, setReflectionResponses] = useState<string[]>([]);
  const [allActivitiesCompleted, setAllActivitiesCompleted] = useState(false);

  const handleRolePlaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rolePlayForm.jawaban.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 6: Kendalikan Bullying',
        activityName: 'Strategi Pencegahan',
        answer: rolePlayForm.jawaban
      });
      
      if (result.success) {
        setRolePlayResponses(prev => [...prev, rolePlayForm.jawaban]);
        setRolePlaySubmitted(true);
        setRolePlayForm({ jawaban: '' });
        alert('Jawaban berhasil disimpan!');
      } else {
        alert('Gagal menyimpan jawaban: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
    }
  };

  const handleAssertiveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!assertiveStatement.sayaMerasa.trim() || !assertiveStatement.karena.trim() || !assertiveStatement.sayaIngin.trim()) {
      alert('Semua field harus diisi!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 6: Kendalikan Bullying',
        activityName: 'Intervensi Bystander',
        answer: JSON.stringify(assertiveStatement)
      });
      
      if (result.success) {
        setAssertiveSubmitted(true);
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
    
    if (!reflectionForm.jawaban.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 6: Kendalikan Bullying',
        activityName: 'Membangun Budaya Positif',
        answer: reflectionForm.jawaban
      });
      
      if (result.success) {
        setReflectionResponses(prev => [...prev, reflectionForm.jawaban]);
        setReflectionForm({ jawaban: '' });
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
      id: "cerita-interaktif",
      title: "Cerita Interaktif",
      type: "video" as const,
      description: "Video cerita tentang cara mengendalikan emosi dalam situasi bullying",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "10 menit"
    },
    {
      id: "role-play-virtual",
      title: "Role Play Virtual",
      type: "reflection" as const,
      description: "Simulasi peran untuk memahami perspektif yang berbeda",
      duration: "20 menit"
    },
    {
      id: "latihan-pernyataan-assertif",
      title: "Latihan Pernyataan Assertif",
      type: "form" as const,
      description: "Belajar menyampaikan perasaan dengan cara yang sehat",
      duration: "15 menit"
    },
    {
      id: "kuis-penguatan",
      title: "Kuis Penguatan",
      type: "quiz" as const,
      description: "Kuis untuk menguatkan pemahaman tentang pengendalian emosi",
      url: "#",
      duration: "10 menit"
    },
    {
      id: "penutup",
      title: "Penutup",
      type: "reflection" as const,
      description: "Refleksi pembelajaran dan kesimpulan",
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
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-purple-600 font-bold text-2xl">3</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Kendalikan Bullying</h1>
                <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  <Calendar size={14} />
                  <span>60 menit</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg mb-6">
                Strategi dan teknik untuk mengendalikan emosi dan perilaku dalam situasi bullying.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle2 size={18} className="text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Tujuan Pembelajaran</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Mempelajari teknik pengendalian emosi saat menghadapi bullying</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Memahami pentingnya self-control dalam situasi konflik</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Menguasai strategi de-eskalasi konflik</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Info Sesi</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durasi:</span>
                      <span className="font-medium text-gray-900">60 menit</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Aktivitas:</span>
                      <span className="font-medium text-gray-900">5 aktivitas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sesi:</span>
                      <span className="font-medium text-gray-900">3 dari 8</span>
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
                    className="px-3 py-1 text-sm bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentActivity + 1) / activities.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Kegiatan 1: Cerita Interaktif */}
            {currentActivity === 0 && (
              <ActivityCard 
                activity={activities[0]} 
                index={0}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Cerita: Mengendalikan Emosi</h4>
                  <p className="text-gray-600">
                    Mari kita mulai dengan mendengarkan cerita tentang bagaimana seseorang belajar mengendalikan emosinya dalam situasi yang sulit.
                  </p>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <Play size={48} className="text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Video cerita interaktif</p>
                        <p className="text-sm text-gray-400 mt-1">Durasi: 10 menit</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={handleNextActivity}
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium"
                    >
                      Lanjut ke Kegiatan Selanjutnya
                    </button>
                  </div>
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 2: Role Play Virtual */}
            {currentActivity === 1 && (
              <ActivityCard 
                activity={activities[1]} 
                index={1}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Role Play: Simulasi Peran</h4>
                  <p className="text-gray-600">
                    Mari kita berlatih dengan simulasi peran. Bayangkan Anda berada dalam situasi bullying dan coba pikirkan apa yang seharusnya dilakukan.
                  </p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-800 mb-2">Instruksi Role Play:</h5>
                    <div className="text-sm text-blue-700 space-y-2">
                      <p><strong>Peran 1 - Pelaku:</strong> Bayangkan Anda adalah orang yang melakukan bullying</p>
                      <p><strong>Peran 2 - Korban:</strong> Bayangkan Anda adalah yang mengalami bullying</p>
                      <p><strong>Peran 3 - Pengamat:</strong> Bayangkan Anda adalah saksi yang melihat bullying</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setRolePlaySubmitted(!rolePlaySubmitted)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    Mulai Role Play
                  </button>
                  
                  {rolePlaySubmitted && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                      <h5 className="font-medium text-gray-900 mb-3">Pertanyaan Diskusi:</h5>
                      <p className="text-gray-700 mb-4">
                        "Apa yang seharusnya dilakukan dalam situasi ini? Jelaskan dari perspektif masing-masing peran!"
                      </p>
                      
                      <form onSubmit={handleRolePlaySubmit}>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Jawaban Anda: *
                          </label>
                          <textarea
                            value={rolePlayForm.jawaban}
                            onChange={(e) => setRolePlayForm(prev => ({ ...prev, jawaban: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            placeholder="Tuliskan analisis Anda dari ketiga perspektif..."
                          />
                        </div>
                        <button
                          type="submit"
                          className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                          Submit Analisis
                        </button>
                      </form>
                      
                      {rolePlayResponses.length > 0 && (
                        <div className="mt-4 space-y-3">
                          <h4 className="font-medium text-gray-900">Responses:</h4>
                          {rolePlayResponses.map((response, index) => (
                            <div key={index} className="bg-blue-50 border-l-4 border-blue-200 p-3 rounded-r-lg animate-fadeIn">
                              <div className="flex items-start space-x-2">
                                <Users size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-blue-800">{response}</p>
                              </div>
                            </div>
                          ))}
                          <div className="mt-4">
                            <button
                              onClick={handleNextActivity}
                              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium"
                            >
                              Lanjut ke Kegiatan Selanjutnya
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 3: Latihan Pernyataan Assertif */}
            {currentActivity === 2 && (
              <ActivityCard 
                activity={activities[2]} 
                index={2}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Latihan: Pernyataan Assertif</h4>
                  <p className="text-gray-600">
                    Mari kita berlatih menyampaikan perasaan dengan cara yang sehat dan assertif.
                  </p>
                  
                  <form onSubmit={handleAssertiveSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Saya merasa... *
                      </label>
                      <input
                        type="text"
                        value={assertiveStatement.sayaMerasa}
                        onChange={(e) => setAssertiveStatement(prev => ({ ...prev, sayaMerasa: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Contoh: tidak nyaman, sedih, marah"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Karena... *
                      </label>
                      <input
                        type="text"
                        value={assertiveStatement.karena}
                        onChange={(e) => setAssertiveStatement(prev => ({ ...prev, karena: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Contoh: Anda memanggil saya dengan nama yang tidak pantas"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Saya ingin... *
                      </label>
                      <input
                        type="text"
                        value={assertiveStatement.sayaIngin}
                        onChange={(e) => setAssertiveStatement(prev => ({ ...prev, sayaIngin: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Contoh: Anda memanggil saya dengan nama yang benar"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium"
                    >
                      Gabungkan Pernyataan
                    </button>
                  </form>

                  {assertiveSubmitted && (
                    <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg animate-fadeIn">
                      <h4 className="font-medium text-purple-800 mb-2">Pernyataan Assertif Anda:</h4>
                      <div className="text-sm text-purple-700 bg-white p-3 rounded border">
                        <p className="font-medium">"Saya merasa {assertiveStatement.sayaMerasa} karena {assertiveStatement.karena}. Saya ingin {assertiveStatement.sayaIngin}."</p>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium"
                        >
                          Lanjut ke Kegiatan Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 4: Kuis Penguatan */}
            {currentActivity === 3 && (
              <ActivityCard 
                activity={activities[3]} 
                index={3}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Kuis: Penguatan Pemahaman</h4>
                  <p className="text-gray-600">
                    Mari kita uji pemahaman Anda tentang teknik pengendalian emosi dan perilaku.
                  </p>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-3">🎯</div>
                    <h4 className="font-medium text-yellow-800 mb-2">Kuis Penguatan</h4>
                    <p className="text-sm text-yellow-700 mb-4">
                      Jawab pertanyaan-pertanyaan untuk menguatkan pemahaman Anda tentang pengendalian emosi.
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => window.open('#', '_blank')}
                        className="inline-flex items-center space-x-2 bg-yellow-600 text-white px-6 py-3 rounded-md hover:bg-yellow-700 transition-colors duration-200 font-medium"
                      >
                        <Target size={20} />
                        <span>Mulai Kuis</span>
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={handleNextActivity}
                      className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium"
                    >
                      Lanjut ke Kegiatan Selanjutnya
                    </button>
                  </div>
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 5: Penutup */}
            {currentActivity === 4 && (
              <ActivityCard 
                activity={activities[4]} 
                index={4}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Refleksi Pembelajaran</h4>
                  <p className="text-gray-600">
                    Mari kita refleksikan apa yang telah kita pelajari hari ini tentang pengendalian emosi.
                  </p>
                  
                  <form onSubmit={handleReflectionSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apa satu hal baru yang kamu pelajari hari ini? *
                      </label>
                      <textarea
                        value={reflectionForm.jawaban}
                        onChange={(e) => setReflectionForm(prev => ({ ...prev, jawaban: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        rows={4}
                        placeholder="Tuliskan satu hal baru yang Anda pelajari tentang pengendalian emosi..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-3 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium"
                    >
                      Bagikan Refleksi
                    </button>
                  </form>

                  {reflectionResponses.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Refleksi:</h4>
                      {reflectionResponses.map((response, index) => (
                        <div key={index} className="bg-purple-50 border-l-4 border-purple-200 p-3 rounded-r-lg animate-fadeIn">
                          <div className="flex items-start space-x-2">
                            <Shield size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-purple-800">{response}</p>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium"
                        >
                          Selesai - Lanjut ke Sesi 4
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Completion Message */}
            {allActivitiesCompleted && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-purple-800 mb-2">Selamat! 🎉</h3>
                <p className="text-purple-700 mb-6">
                  Anda telah menyelesaikan semua kegiatan di Sesi 3. Sekarang Anda siap untuk melanjutkan ke Sesi 4: "Coping Cerdas".
                </p>
                <Link 
                  href="/sesi/coping-cerdas"
                  className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium"
                >
                  <span>Lanjut ke Sesi 4</span>
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
              href="/sesi/kenali-bullying"
              className="inline-flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              <div className="text-left">
                <div className="text-sm text-gray-500">Sesi Sebelumnya</div>
                <div className="font-medium">Sesi 2: Kenali Bullying</div>
              </div>
            </Link>
            <Link 
              href="/sesi/coping-cerdas"
              className="inline-flex items-center text-gray-600 hover:text-purple-600 transition-colors duration-200"
            >
              <div className="text-right">
                <div className="text-sm text-gray-500">Sesi Selanjutnya</div>
                <div className="font-medium">Sesi 4: Coping Cerdas</div>
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
