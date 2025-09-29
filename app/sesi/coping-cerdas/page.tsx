'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, CheckCircle2, Calendar, Play, MessageSquare, Target, BookOpen, Users, Heart, Brain, Gamepad2 } from 'lucide-react';
import ActivityCard from '@/components/ActivityCard';

interface EmotionForm {
  emosi1: string;
  emosi2: string;
  emosi3: string;
}

interface JournalForm {
  jawaban: string;
}

interface CopingForm {
  copingSehat: string;
  copingTidakSehat: string;
}

export default function Session4Page() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [emotionForm, setEmotionForm] = useState<EmotionForm>({
    emosi1: '',
    emosi2: '',
    emosi3: ''
  });
  const [emotionSubmitted, setEmotionSubmitted] = useState(false);
  const [journalForm, setJournalForm] = useState<JournalForm>({
    jawaban: ''
  });
  const [journalSubmitted, setJournalSubmitted] = useState(false);
  const [journalResponses, setJournalResponses] = useState<string[]>([]);
  const [copingForm, setCopingForm] = useState<CopingForm>({
    copingSehat: '',
    copingTidakSehat: ''
  });
  const [copingSubmitted, setCopingSubmitted] = useState(false);
  const [copingResponses, setCopingResponses] = useState<CopingForm[]>([]);
  const [allActivitiesCompleted, setAllActivitiesCompleted] = useState(false);

  const handleEmotionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emotionForm.emosi1.trim() || !emotionForm.emosi2.trim() || !emotionForm.emosi3.trim()) {
      alert('Semua field emosi harus diisi!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 5: Coping Cerdas',
        activityName: 'Teknik Relaksasi',
        answer: JSON.stringify(emotionForm)
      });
      
      if (result.success) {
        setEmotionSubmitted(true);
        alert('Jawaban berhasil disimpan!');
      } else {
        alert('Gagal menyimpan jawaban: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
    }
  };

  const handleJournalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!journalForm.jawaban.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 5: Coping Cerdas',
        activityName: 'Mengelola Emosi',
        answer: journalForm.jawaban
      });
      
      if (result.success) {
        setJournalResponses(prev => [...prev, journalForm.jawaban]);
        setJournalSubmitted(true);
        setJournalForm({ jawaban: '' });
        alert('Jawaban berhasil disimpan!');
      } else {
        alert('Gagal menyimpan jawaban: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
    }
  };

  const handleCopingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!copingForm.copingSehat.trim() || !copingForm.copingTidakSehat.trim()) {
      alert('Semua field coping harus diisi!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 5: Coping Cerdas',
        activityName: 'Positive Self-Talk',
        answer: JSON.stringify(copingForm)
      });
      
      if (result.success) {
        setCopingResponses(prev => [...prev, copingForm]);
        setCopingSubmitted(true);
        setCopingForm({ copingSehat: '', copingTidakSehat: '' });
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
      id: "pemahaman-emosi",
      title: "Pemahaman Emosi",
      type: "reflection" as const,
      description: "Mengidentifikasi dan memahami berbagai emosi yang dirasakan",
      duration: "10 menit"
    },
    {
      id: "latihan-relaksasi",
      title: "Latihan Relaksasi",
      type: "video" as const,
      description: "Teknik pernapasan dan relaksasi untuk mengelola stress",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "10 menit"
    },
    {
      id: "jurnal-emosi-digital",
      title: "Jurnal Emosi Digital",
      type: "reflection" as const,
      description: "Mencatat dan merefleksikan emosi melalui jurnal digital",
      duration: "15 menit"
    },
    {
      id: "diskusi-coping",
      title: "Diskusi Coping",
      type: "form" as const,
      description: "Membedakan strategi coping yang sehat dan tidak sehat",
      duration: "15 menit"
    },
    {
      id: "game-interaktif",
      title: "Game Interaktif",
      type: "quiz" as const,
      description: "Game interaktif untuk menguatkan pemahaman coping",
      url: "#",
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
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold text-2xl">4</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Coping Cerdas</h1>
                <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  <Calendar size={14} />
                  <span>60 menit</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg mb-6">
                Mengembangkan strategi coping yang efektif untuk menghadapi dan mengatasi situasi bullying.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle2 size={18} className="text-orange-600" />
                    <h3 className="font-semibold text-gray-900">Tujuan Pembelajaran</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Memahami berbagai strategi coping yang efektif</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Mengidentifikasi sumber dukungan yang tersedia</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Mengembangkan resiliensi mental</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-orange-50 rounded-lg p-6">
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
                      <span className="font-medium text-gray-900">4 dari 8</span>
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
                    className="px-3 py-1 text-sm bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentActivity + 1) / activities.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Kegiatan 1: Pemahaman Emosi */}
            {currentActivity === 0 && (
              <ActivityCard 
                activity={activities[0]} 
                index={0}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Identifikasi Emosi</h4>
                  <p className="text-gray-600">
                    Mari kita mulai dengan mengidentifikasi 3 emosi yang sering Anda rasakan.
                  </p>
                  
                  <form onSubmit={handleEmotionSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emosi 1 *
                      </label>
                      <input
                        type="text"
                        value={emotionForm.emosi1}
                        onChange={(e) => setEmotionForm(prev => ({ ...prev, emosi1: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Contoh: senang, sedih, marah"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emosi 2 *
                      </label>
                      <input
                        type="text"
                        value={emotionForm.emosi2}
                        onChange={(e) => setEmotionForm(prev => ({ ...prev, emosi2: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Contoh: cemas, tenang, frustasi"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Emosi 3 *
                      </label>
                      <input
                        type="text"
                        value={emotionForm.emosi3}
                        onChange={(e) => setEmotionForm(prev => ({ ...prev, emosi3: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Contoh: bangga, malu, khawatir"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        type="submit"
                        className="bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium"
                      >
                        Tampilkan Emosi
                      </button>
                      <button
                        type="button"
                        onClick={() => window.open('#', '_blank')}
                        className="inline-flex items-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                      >
                        <Heart size={16} />
                        <span>Kolaborasi Online</span>
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </form>

                  {emotionSubmitted && (
                    <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg animate-fadeIn">
                      <h4 className="font-medium text-orange-800 mb-2">Emosi yang Anda Identifikasi:</h4>
                      <ul className="text-sm text-orange-700 space-y-1">
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          <span>{emotionForm.emosi1}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          <span>{emotionForm.emosi2}</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                          <span>{emotionForm.emosi3}</span>
                        </li>
                      </ul>
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium"
                        >
                          Lanjut ke Kegiatan Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 2: Latihan Relaksasi */}
            {currentActivity === 1 && (
              <ActivityCard 
                activity={activities[1]} 
                index={1}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Teknik Relaksasi</h4>
                  <p className="text-gray-600">
                    Mari kita berlatih teknik pernapasan 4-7-8 untuk menenangkan diri.
                  </p>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h5 className="font-medium text-green-800 mb-2">Instruksi Pernapasan 4-7-8:</h5>
                    <div className="text-sm text-green-700 space-y-2">
                      <p><strong>1. Tarik napas</strong> melalui hidung selama 4 hitungan</p>
                      <p><strong>2. Tahan napas</strong> selama 7 hitungan</p>
                      <p><strong>3. Hembuskan napas</strong> melalui mulut selama 8 hitungan</p>
                      <p><strong>4. Ulangi</strong> 3-4 kali</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Audio Panduan:</h5>
                    <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <Play size={48} className="text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Audio relaksasi</p>
                        <p className="text-sm text-gray-400 mt-1">Durasi: 10 menit</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={handleNextActivity}
                      className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium"
                    >
                      Lanjut ke Kegiatan Selanjutnya
                    </button>
                  </div>
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 3: Jurnal Emosi Digital */}
            {currentActivity === 2 && (
              <ActivityCard 
                activity={activities[2]} 
                index={2}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Jurnal Emosi Digital</h4>
                  <p className="text-gray-600">
                    Mari kita catat perasaan Anda hari ini melalui jurnal emosi digital.
                  </p>
                  
                  <form onSubmit={handleJournalSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hari ini saya merasa... karena... saya ingin mengatasi ini dengan... *
                      </label>
                      <textarea
                        value={journalForm.jawaban}
                        onChange={(e) => setJournalForm(prev => ({ ...prev, jawaban: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        rows={4}
                        placeholder="Tuliskan perasaan dan cara mengatasinya..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-3 bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium"
                    >
                      Simpan Jurnal
                    </button>
                  </form>

                  {journalResponses.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Jurnal Anda:</h4>
                      {journalResponses.map((response, index) => (
                        <div key={index} className="bg-orange-50 border-l-4 border-orange-200 p-3 rounded-r-lg animate-fadeIn">
                          <div className="flex items-start space-x-2">
                            <BookOpen size={16} className="text-orange-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-orange-800">{response}</p>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium"
                        >
                          Lanjut ke Kegiatan Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 4: Diskusi Coping */}
            {currentActivity === 3 && (
              <ActivityCard 
                activity={activities[3]} 
                index={3}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Strategi Coping</h4>
                  <p className="text-gray-600">
                    Mari kita diskusikan perbedaan antara strategi coping yang sehat dan tidak sehat.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h5 className="font-medium text-green-800 mb-2">Coping Sehat</h5>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Berbicara dengan teman</li>
                        <li>• Olahraga</li>
                        <li>• Meditasi</li>
                        <li>• Hobi kreatif</li>
                      </ul>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h5 className="font-medium text-red-800 mb-2">Coping Tidak Sehat</h5>
                      <ul className="text-sm text-red-700 space-y-1">
                        <li>• Menghindar dari masalah</li>
                        <li>• Merokok/alkohol</li>
                        <li>• Makan berlebihan</li>
                        <li>• Agresi verbal/fisik</li>
                      </ul>
                    </div>
                  </div>
                  
                  <form onSubmit={handleCopingSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tambahkan contoh coping sehat: *
                      </label>
                      <input
                        type="text"
                        value={copingForm.copingSehat}
                        onChange={(e) => setCopingForm(prev => ({ ...prev, copingSehat: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Contoh: membaca buku, mendengarkan musik"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tambahkan contoh coping tidak sehat: *
                      </label>
                      <input
                        type="text"
                        value={copingForm.copingTidakSehat}
                        onChange={(e) => setCopingForm(prev => ({ ...prev, copingTidakSehat: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Contoh: menyakiti diri sendiri, mengisolasi diri"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium"
                    >
                      Tambahkan Contoh
                    </button>
                  </form>

                  {copingResponses.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Contoh yang Anda Tambahkan:</h4>
                      {copingResponses.map((response, index) => (
                        <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-3 animate-fadeIn">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <h6 className="font-medium text-green-800 text-sm">Coping Sehat:</h6>
                              <p className="text-sm text-green-700">{response.copingSehat}</p>
                            </div>
                            <div>
                              <h6 className="font-medium text-red-800 text-sm">Coping Tidak Sehat:</h6>
                              <p className="text-sm text-red-700">{response.copingTidakSehat}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium"
                        >
                          Lanjut ke Kegiatan Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 5: Game Interaktif */}
            {currentActivity === 4 && (
              <ActivityCard 
                activity={activities[4]} 
                index={4}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Game Interaktif</h4>
                  <p className="text-gray-600">
                    Mari kita mainkan game interaktif untuk menguatkan pemahaman tentang strategi coping.
                  </p>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
                    <div className="text-4xl mb-3">🎮</div>
                    <h4 className="font-medium text-purple-800 mb-2">Game Coping Cerdas</h4>
                    <p className="text-sm text-purple-700 mb-4">
                      Pilih strategi coping yang tepat untuk berbagai situasi dalam game ini.
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => window.open('#', '_blank')}
                        className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-200 font-medium"
                      >
                        <Gamepad2 size={20} />
                        <span>Mulai Game</span>
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={handleNextActivity}
                      className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium"
                    >
                      Selesai - Lanjut ke Sesi 5
                    </button>
                  </div>
                </div>
              </ActivityCard>
            )}

            {/* Completion Message */}
            {allActivitiesCompleted && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-orange-800 mb-2">Selamat! 🎉</h3>
                <p className="text-orange-700 mb-6">
                  Anda telah menyelesaikan semua kegiatan di Sesi 4. Sekarang Anda siap untuk melanjutkan ke Sesi 5: "Berani Bicara".
                </p>
                <Link 
                  href="/sesi/berani-bicara"
                  className="inline-flex items-center space-x-2 bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 transition-colors duration-200 font-medium"
                >
                  <span>Lanjut ke Sesi 5</span>
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
              href="/sesi/kendalikan-bullying"
              className="inline-flex items-center text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              <div className="text-left">
                <div className="text-sm text-gray-500">Sesi Sebelumnya</div>
                <div className="font-medium">Sesi 3: Kendalikan Bullying</div>
              </div>
            </Link>
            <Link 
              href="/sesi/berani-bicara"
              className="inline-flex items-center text-gray-600 hover:text-orange-600 transition-colors duration-200"
            >
              <div className="text-right">
                <div className="text-sm text-gray-500">Sesi Selanjutnya</div>
                <div className="font-medium">Sesi 5: Berani Bicara</div>
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
