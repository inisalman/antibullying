'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, CheckCircle2, Calendar, Play, MessageSquare, Target, BookOpen, Users, Mic, Eye } from 'lucide-react';
import ActivityCard from '@/components/ActivityCard';

interface DiscussionForm {
  jawaban: string;
}

interface AssertiveForm {
  sayaMerasa: string;
  saat: string;
  sayaIngin: string;
}

interface QnAForm {
  jawaban: string;
}

interface VideoAnalysisForm {
  jawaban: string;
}

interface ReflectionForm {
  jawaban: string;
}

export default function Session5Page() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [discussionForm, setDiscussionForm] = useState<DiscussionForm>({
    jawaban: ''
  });
  const [discussionSubmitted, setDiscussionSubmitted] = useState(false);
  const [discussionResponses, setDiscussionResponses] = useState<string[]>([]);
  const [assertiveForm, setAssertiveForm] = useState<AssertiveForm>({
    sayaMerasa: '',
    saat: '',
    sayaIngin: ''
  });
  const [assertiveSubmitted, setAssertiveSubmitted] = useState(false);
  const [qnaForm, setQnaForm] = useState<QnAForm>({
    jawaban: ''
  });
  const [qnaSubmitted, setQnaSubmitted] = useState(false);
  const [qnaResponses, setQnaResponses] = useState<string[]>([]);
  const [videoAnalysisForm, setVideoAnalysisForm] = useState<VideoAnalysisForm>({
    jawaban: ''
  });
  const [videoAnalysisSubmitted, setVideoAnalysisSubmitted] = useState(false);
  const [reflectionForm, setReflectionForm] = useState<ReflectionForm>({
    jawaban: ''
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);
  const [reflectionResponses, setReflectionResponses] = useState<string[]>([]);
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
        sessionName: 'Sesi 3: Berani Bicara',
        activityName: 'Strategi Komunikasi',
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

  const handleAssertiveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!assertiveForm.sayaMerasa.trim() || !assertiveForm.saat.trim() || !assertiveForm.sayaIngin.trim()) {
      alert('Semua field harus diisi!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 3: Berani Bicara',
        activityName: 'Role Play',
        answer: JSON.stringify(assertiveForm)
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

  const handleQnASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!qnaForm.jawaban.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 3: Berani Bicara',
        activityName: 'Membangun Kepercayaan Diri',
        answer: qnaForm.jawaban
      });
      
      if (result.success) {
        setQnaResponses(prev => [...prev, qnaForm.jawaban]);
        setQnaSubmitted(true);
        setQnaForm({ jawaban: '' });
        alert('Jawaban berhasil disimpan!');
      } else {
        alert('Gagal menyimpan jawaban: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
    }
  };

  const handleVideoAnalysisSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!videoAnalysisForm.jawaban.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }
    
    setVideoAnalysisSubmitted(true);
  };

  const handleReflectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reflectionForm.jawaban.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }
    
    setReflectionResponses(prev => [...prev, reflectionForm.jawaban]);
    setReflectionSubmitted(true);
    setReflectionForm({ jawaban: '' });
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
      id: "diskusi-singkat",
      title: "Diskusi Singkat",
      type: "reflection" as const,
      description: "Memahami perbedaan antara asertif, pasif, dan agresif",
      duration: "10 menit"
    },
    {
      id: "simulasi-kalimat-aku",
      title: "Simulasi Kalimat Aku",
      type: "form" as const,
      description: "Berlatih menyampaikan perasaan dengan kalimat yang sehat",
      duration: "15 menit"
    },
    {
      id: "latihan-tanya-jawab",
      title: "Latihan Tanya Jawab",
      type: "reflection" as const,
      description: "Simulasi menyampaikan pendapat kepada berbagai pihak",
      duration: "15 menit"
    },
    {
      id: "evaluasi-video-singkat",
      title: "Evaluasi Video Singkat",
      type: "video" as const,
      description: "Analisis video simulasi konflik dan cara penyelesaiannya",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      duration: "10 menit"
    },
    {
      id: "refleksi",
      title: "Refleksi",
      type: "reflection" as const,
      description: "Refleksi tentang keberanian menyampaikan isi hati",
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
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-red-600 font-bold text-2xl">5</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Berani Bicara</h1>
                <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  <Calendar size={14} />
                  <span>60 menit</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg mb-6">
                Membangun keberanian untuk berbicara dan melaporkan kejadian bullying kepada pihak yang tepat.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle2 size={18} className="text-red-600" />
                    <h3 className="font-semibold text-gray-900">Tujuan Pembelajaran</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Membangun keberanian untuk melaporkan bullying</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Mengetahui cara berkomunikasi yang efektif</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Memahami pentingnya menjadi saksi yang bertanggung jawab</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-red-50 rounded-lg p-6">
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
                      <span className="font-medium text-gray-900">5 dari 8</span>
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
                    className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-red-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentActivity + 1) / activities.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Kegiatan 1: Diskusi Singkat */}
            {currentActivity === 0 && (
              <ActivityCard 
                activity={activities[0]} 
                index={0}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Diskusi: Asertif vs Pasif vs Agresif</h4>
                  <p className="text-gray-600">
                    Mari kita diskusikan perbedaan antara tiga gaya komunikasi yang berbeda.
                  </p>
                  
                  <form onSubmit={handleDiscussionSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apa bedanya asertif, pasif, dan agresif? *
                      </label>
                      <textarea
                        value={discussionForm.jawaban}
                        onChange={(e) => setDiscussionForm(prev => ({ ...prev, jawaban: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        rows={4}
                        placeholder="Jelaskan perbedaan ketiga gaya komunikasi tersebut..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-3 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
                    >
                      Bagikan Jawaban
                    </button>
                  </form>

                  {discussionResponses.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Responses:</h4>
                      {discussionResponses.map((response, index) => (
                        <div key={index} className="bg-red-50 border-l-4 border-red-200 p-3 rounded-r-lg animate-fadeIn">
                          <div className="flex items-start space-x-2">
                            <Mic size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-red-800">{response}</p>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
                        >
                          Lanjut ke Kegiatan Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 2: Simulasi Kalimat Aku */}
            {currentActivity === 1 && (
              <ActivityCard 
                activity={activities[1]} 
                index={1}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Simulasi: Kalimat Aku</h4>
                  <p className="text-gray-600">
                    Mari kita berlatih menyampaikan perasaan dengan kalimat yang sehat dan asertif.
                  </p>
                  
                  <form onSubmit={handleAssertiveSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Saya merasa... *
                      </label>
                      <input
                        type="text"
                        value={assertiveForm.sayaMerasa}
                        onChange={(e) => setAssertiveForm(prev => ({ ...prev, sayaMerasa: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Contoh: tidak nyaman, sedih, marah"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Saat... *
                      </label>
                      <input
                        type="text"
                        value={assertiveForm.saat}
                        onChange={(e) => setAssertiveForm(prev => ({ ...prev, saat: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Contoh: Anda memanggil saya dengan nama yang tidak pantas"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Saya ingin... *
                      </label>
                      <input
                        type="text"
                        value={assertiveForm.sayaIngin}
                        onChange={(e) => setAssertiveForm(prev => ({ ...prev, sayaIngin: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Contoh: Anda memanggil saya dengan nama yang benar"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
                    >
                      Gabungkan Kalimat
                    </button>
                  </form>

                  {assertiveSubmitted && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg animate-fadeIn">
                      <h4 className="font-medium text-red-800 mb-2">Kalimat Aku Anda:</h4>
                      <div className="text-sm text-red-700 bg-white p-3 rounded border">
                        <p className="font-medium">"Saya merasa {assertiveForm.sayaMerasa} saat {assertiveForm.saat}. Saya ingin {assertiveForm.sayaIngin}."</p>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
                        >
                          Lanjut ke Kegiatan Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 3: Latihan Tanya Jawab */}
            {currentActivity === 2 && (
              <ActivityCard 
                activity={activities[2]} 
                index={2}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Latihan: Tanya Jawab</h4>
                  <p className="text-gray-600">
                    Mari kita berlatih menyampaikan pendapat kepada berbagai pihak dengan cara yang tepat.
                  </p>
                  
                  <form onSubmit={handleQnASubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Simulasikan cara menyampaikan pendapat kepada guru, orang tua, atau teman: *
                      </label>
                      <textarea
                        value={qnaForm.jawaban}
                        onChange={(e) => setQnaForm(prev => ({ ...prev, jawaban: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        rows={4}
                        placeholder="Tuliskan cara Anda menyampaikan pendapat kepada guru, orang tua, atau teman..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-3 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
                    >
                      Simpan Jawaban
                    </button>
                  </form>

                  {qnaResponses.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Responses:</h4>
                      {qnaResponses.map((response, index) => (
                        <div key={index} className="bg-red-50 border-l-4 border-red-200 p-3 rounded-r-lg animate-fadeIn">
                          <div className="flex items-start space-x-2">
                            <Users size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-red-800">{response}</p>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
                        >
                          Lanjut ke Kegiatan Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 4: Evaluasi Video Singkat */}
            {currentActivity === 3 && (
              <ActivityCard 
                activity={activities[3]} 
                index={3}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Evaluasi Video: Konflik dan Penyelesaian</h4>
                  <p className="text-gray-600">
                    Mari kita analisis video simulasi konflik antara dua siswa dan cara penyelesaiannya.
                  </p>
                  
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">Video Simulasi:</h5>
                    <div className="aspect-video bg-gray-200 rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <Play size={48} className="text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Video simulasi konflik</p>
                        <p className="text-sm text-gray-400 mt-1">Durasi: 10 menit</p>
                      </div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleVideoAnalysisSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Analisis: Bagaimana cara yang tepat untuk menyelesaikan konflik dalam video tersebut? *
                      </label>
                      <textarea
                        value={videoAnalysisForm.jawaban}
                        onChange={(e) => setVideoAnalysisForm(prev => ({ ...prev, jawaban: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        rows={4}
                        placeholder="Tuliskan analisis Anda tentang cara penyelesaian konflik..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-3 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
                    >
                      Submit Analisis
                    </button>
                  </form>

                  {videoAnalysisSubmitted && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg animate-fadeIn">
                      <h4 className="font-medium text-red-800 mb-2">Analisis Anda:</h4>
                      <div className="text-sm text-red-700 bg-white p-3 rounded border">
                        <p>{videoAnalysisForm.jawaban}</p>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
                        >
                          Lanjut ke Kegiatan Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 5: Refleksi */}
            {currentActivity === 4 && (
              <ActivityCard 
                activity={activities[4]} 
                index={4}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Refleksi: Keberanian Bicara</h4>
                  <p className="text-gray-600">
                    Mari kita refleksikan tentang cara menjadi lebih berani dalam menyampaikan isi hati.
                  </p>
                  
                  <form onSubmit={handleReflectionSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bagaimana kamu bisa lebih berani menyampaikan isi hati? *
                      </label>
                      <textarea
                        value={reflectionForm.jawaban}
                        onChange={(e) => setReflectionForm(prev => ({ ...prev, jawaban: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        rows={4}
                        placeholder="Tuliskan cara Anda bisa lebih berani menyampaikan isi hati..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-3 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
                    >
                      Bagikan Refleksi
                    </button>
                  </form>

                  {reflectionResponses.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Refleksi:</h4>
                      {reflectionResponses.map((response, index) => (
                        <div key={index} className="bg-red-50 border-l-4 border-red-200 p-3 rounded-r-lg animate-fadeIn">
                          <div className="flex items-start space-x-2">
                            <Eye size={16} className="text-red-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-red-800">{response}</p>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
                        >
                          Selesai - Lanjut ke Sesi 6
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Completion Message */}
            {allActivitiesCompleted && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-red-800 mb-2">Selamat! 🎉</h3>
                <p className="text-red-700 mb-6">
                  Anda telah menyelesaikan semua kegiatan di Sesi 5. Sekarang Anda siap untuk melanjutkan ke Sesi 6: "Kawan Sejati".
                </p>
                <Link 
                  href="/sesi/kawan-sejati"
                  className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
                >
                  <span>Lanjut ke Sesi 6</span>
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
              href="/sesi/coping-cerdas"
              className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              <div className="text-left">
                <div className="text-sm text-gray-500">Sesi Sebelumnya</div>
                <div className="font-medium">Sesi 4: Coping Cerdas</div>
              </div>
            </Link>
            <Link 
              href="/sesi/kawan-sejati"
              className="inline-flex items-center text-gray-600 hover:text-red-600 transition-colors duration-200"
            >
              <div className="text-right">
                <div className="text-sm text-gray-500">Sesi Selanjutnya</div>
                <div className="font-medium">Sesi 6: Kawan Sejati</div>
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
