'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, CheckCircle2, Calendar, Play, MessageSquare, Target, BookOpen, Users } from 'lucide-react';
import ActivityCard from '@/components/ActivityCard';

interface DiscussionForm {
  jawaban: string;
}

interface ReflectionForm {
  jawaban: string;
}

export default function Session2Page() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [discussionForm, setDiscussionForm] = useState<DiscussionForm>({
    jawaban: ''
  });
  const [discussionSubmitted, setDiscussionSubmitted] = useState(false);
  const [discussionResponses, setDiscussionResponses] = useState<string[]>([]);
  const [reflectionForm, setReflectionForm] = useState<ReflectionForm>({
    jawaban: ''
  });
  const [reflectionResponses, setReflectionResponses] = useState<string[]>([]);
  const [caseStudyVisible, setCaseStudyVisible] = useState(false);
  const [caseStudyAnswer, setCaseStudyAnswer] = useState('');
  const [caseStudySubmitted, setCaseStudySubmitted] = useState(false);
  const [allActivitiesCompleted, setAllActivitiesCompleted] = useState(false);

  const handleDiscussionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!discussionForm.jawaban.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 2: Kenali Bullying',
        activityName: 'Definisi Bullying',
        answer: discussionForm.jawaban
      });
      
      if (result.success) {
        setDiscussionResponses(prev => [...prev, discussionForm.jawaban]);
        setDiscussionSubmitted(true);
        setDiscussionForm({ jawaban: '' });
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
        sessionName: 'Sesi 2: Kenali Bullying',
        activityName: 'Jenis-jenis Bullying',
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

  const handleCaseStudySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!caseStudyAnswer.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 2: Kenali Bullying',
        activityName: 'Dampak Bullying',
        answer: caseStudyAnswer
      });
      
      if (result.success) {
        setCaseStudySubmitted(true);
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
      id: "video-edukasi",
      title: "Pemutaran Video Edukasi",
      type: "video" as const,
      description: "Video edukatif tentang pengenalan bullying dan bentuk-bentuknya",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "10 menit"
    },
    {
      id: "diskusi-interaktif",
      title: "Diskusi Interaktif",
      type: "reflection" as const,
      description: "Diskusi tentang definisi dan bentuk-bentuk bullying",
      duration: "15 menit"
    },
    {
      id: "mini-quiz",
      title: "Mini Quiz",
      type: "quiz" as const,
      description: "Kuis singkat untuk menguji pemahaman tentang bullying",
      url: "#",
      duration: "10 menit"
    },
    {
      id: "studi-kasus",
      title: "Studi Kasus Singkat",
      type: "reading" as const,
      description: "Analisis kasus bullying untuk memahami jenis-jenisnya",
      duration: "15 menit"
    },
    {
      id: "penutup",
      title: "Penutup",
      type: "reflection" as const,
      description: "Refleksi pembelajaran dan kesimpulan",
      duration: "10 menit"
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
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-green-600 font-bold text-2xl">2</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Kenali Bullying</h1>
                <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  <Calendar size={14} />
                  <span>60 menit</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg mb-6">
                Memahami definisi, jenis-jenis, dan karakteristik bullying yang terjadi di lingkungan sekolah.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle2 size={18} className="text-green-600" />
                    <h3 className="font-semibold text-gray-900">Tujuan Pembelajaran</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Memahami definisi bullying dan membedakannya dengan konflik biasa</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Mengidentifikasi berbagai jenis bullying (fisik, verbal, sosial, cyber)</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Mengenali tanda-tanda korban dan pelaku bullying</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
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
                      <span className="font-medium text-gray-900">2 dari 8</span>
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
                    className="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentActivity + 1) / activities.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Kegiatan 1: Video Edukasi */}
            {currentActivity === 0 && (
              <ActivityCard 
                activity={activities[0]} 
                index={0}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Video: Pengenalan Bullying</h4>
                  <p className="text-gray-600">
                    Mari kita mulai dengan memahami apa itu bullying melalui video edukatif ini.
                  </p>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <Play size={48} className="text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Video edukasi tentang bullying</p>
                        <p className="text-sm text-gray-400 mt-1">Durasi: 10 menit</p>
                      </div>
                    </div>
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
              </ActivityCard>
            )}

            {/* Kegiatan 2: Diskusi Interaktif */}
            {currentActivity === 1 && (
              <ActivityCard 
                activity={activities[1]} 
                index={1}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Diskusi: Apa itu Bullying?</h4>
                  <p className="text-gray-600">
                    Mari kita diskusikan bersama tentang definisi dan bentuk-bentuk bullying.
                  </p>
                  
                  <form onSubmit={handleDiscussionSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Menurut Anda, apa itu bullying? Apa bentuk-bentuknya? *
                      </label>
                      <textarea
                        value={discussionForm.jawaban}
                        onChange={(e) => setDiscussionForm(prev => ({ ...prev, jawaban: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        rows={4}
                        placeholder="Tuliskan pemahaman Anda tentang bullying..."
                      />
                    </div>
                    <div className="flex items-center space-x-4 mt-4">
                      <button
                        type="submit"
                        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                      >
                        Bagikan Jawaban
                      </button>
                      <button
                        type="button"
                        onClick={() => window.open('#', '_blank')}
                        className="inline-flex items-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                      >
                        <MessageSquare size={16} />
                        <span>Diskusi Online</span>
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </form>

                  {discussionResponses.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Responses:</h4>
                      {discussionResponses.map((response, index) => (
                        <div key={index} className="bg-green-50 border-l-4 border-green-200 p-3 rounded-r-lg animate-fadeIn">
                          <div className="flex items-start space-x-2">
                            <MessageSquare size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-green-800">{response}</p>
                          </div>
                        </div>
                      ))}
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
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 3: Mini Quiz */}
            {currentActivity === 2 && (
              <ActivityCard 
                activity={activities[2]} 
                index={2}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Mini Quiz: Kenali Bullying</h4>
                  <p className="text-gray-600">
                    Mari kita uji pemahaman Anda tentang bullying melalui kuis singkat ini.
                  </p>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-3">🎯</div>
                    <h4 className="font-medium text-yellow-800 mb-2">Kuis Interaktif</h4>
                    <p className="text-sm text-yellow-700 mb-4">
                      Jawab pertanyaan-pertanyaan tentang bullying untuk menguji pemahaman Anda.
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => window.open('#', '_blank')}
                        className="inline-flex items-center space-x-2 bg-yellow-600 text-white px-6 py-3 rounded-md hover:bg-yellow-700 transition-colors duration-200 font-medium"
                      >
                        <Target size={20} />
                        <span>Mulai Quiz</span>
                        <ExternalLink size={16} />
                      </button>
                    </div>
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
              </ActivityCard>
            )}

            {/* Kegiatan 4: Studi Kasus */}
            {currentActivity === 3 && (
              <ActivityCard 
                activity={activities[3]} 
                index={3}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Studi Kasus: Analisis Bullying</h4>
                  <p className="text-gray-600">
                    Mari kita analisis kasus bullying berikut untuk memahami jenis-jenisnya.
                  </p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-800 mb-2">Kasus:</h5>
                    <p className="text-sm text-blue-700">
                      "Di kelas X IPA 1, ada seorang siswa bernama Andi yang sering dipanggil dengan nama panggilan yang tidak pantas oleh beberapa temannya. Mereka sering mengejek penampilan Andi dan mengucilkannya dari kegiatan kelompok. Andi terlihat sedih dan tidak mau berinteraksi dengan teman-temannya lagi."
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setCaseStudyVisible(!caseStudyVisible)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    {caseStudyVisible ? 'Sembunyikan Diskusi' : 'Diskusikan Kasus Ini'}
                  </button>
                  
                  {caseStudyVisible && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg animate-fadeIn">
                      <h5 className="font-medium text-gray-900 mb-3">Pertanyaan Diskusi:</h5>
                      <p className="text-gray-700 mb-4">
                        "Jenis bullying apa yang terjadi dalam skenario ini? Jelaskan alasan Anda!"
                      </p>
                      
                      <form onSubmit={handleCaseStudySubmit}>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Jawaban Anda: *
                          </label>
                          <textarea
                            value={caseStudyAnswer}
                            onChange={(e) => setCaseStudyAnswer(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                            placeholder="Analisis jenis bullying yang terjadi..."
                          />
                        </div>
                        <button
                          type="submit"
                          className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                          Submit Analisis
                        </button>
                      </form>
                      
                      {caseStudySubmitted && (
                        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg animate-fadeIn">
                          <h6 className="font-medium text-blue-800 mb-2">Analisis Anda:</h6>
                          <p className="text-sm text-blue-700">{caseStudyAnswer}</p>
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
                    </div>
                  )}
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
                    Mari kita refleksikan apa yang telah kita pelajari hari ini.
                  </p>
                  
                  <form onSubmit={handleReflectionSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apa satu hal baru yang kamu pelajari hari ini? *
                      </label>
                      <textarea
                        value={reflectionForm.jawaban}
                        onChange={(e) => setReflectionForm(prev => ({ ...prev, jawaban: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        rows={4}
                        placeholder="Tuliskan satu hal baru yang Anda pelajari tentang bullying..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-3 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                    >
                      Bagikan Refleksi
                    </button>
                  </form>

                  {reflectionResponses.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Refleksi:</h4>
                      {reflectionResponses.map((response, index) => (
                        <div key={index} className="bg-green-50 border-l-4 border-green-200 p-3 rounded-r-lg animate-fadeIn">
                          <div className="flex items-start space-x-2">
                            <BookOpen size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-green-800">{response}</p>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                        >
                          Selesai - Lanjut ke Sesi 3
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
                  Anda telah menyelesaikan semua kegiatan di Sesi 2. Sekarang Anda siap untuk melanjutkan ke Sesi 3: "Kendalikan Bullying".
                </p>
                <Link 
                  href="/sesi/kendalikan-bullying"
                  className="inline-flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  <span>Lanjut ke Sesi 3</span>
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
              href="/sesi/perkenalan-pretest"
              className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              <div className="text-left">
                <div className="text-sm text-gray-500">Sesi Sebelumnya</div>
                <div className="font-medium">Sesi 1: Perkenalan dan Pre-Test</div>
              </div>
            </Link>
            <Link 
              href="/sesi/kendalikan-bullying"
              className="inline-flex items-center text-gray-600 hover:text-green-600 transition-colors duration-200"
            >
              <div className="text-right">
                <div className="text-sm text-gray-500">Sesi Selanjutnya</div>
                <div className="font-medium">Sesi 3: Kendalikan Bullying</div>
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
