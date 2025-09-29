'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, CheckCircle2, Calendar, Play, MessageSquare, Target, BookOpen, Users, Heart, Upload, FileText } from 'lucide-react';
import ActivityCard from '@/components/ActivityCard';

interface IdealFriendForm {
  jawaban: string;
}

interface GroupDiscussionForm {
  jawaban: string;
}

interface ProjectForm {
  link: string;
}

interface ReflectionForm {
  jawaban: string;
}

export default function Session6Page() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [idealFriendForm, setIdealFriendForm] = useState<IdealFriendForm>({
    jawaban: ''
  });
  const [idealFriendSubmitted, setIdealFriendSubmitted] = useState(false);
  const [idealFriendResponses, setIdealFriendResponses] = useState<string[]>([]);
  const [groupDiscussionForm, setGroupDiscussionForm] = useState<GroupDiscussionForm>({
    jawaban: ''
  });
  const [groupDiscussionSubmitted, setGroupDiscussionSubmitted] = useState(false);
  const [groupDiscussionResponses, setGroupDiscussionResponses] = useState<string[]>([]);
  const [projectForm, setProjectForm] = useState<ProjectForm>({
    link: ''
  });
  const [projectSubmitted, setProjectSubmitted] = useState(false);
  const [reflectionForm, setReflectionForm] = useState<ReflectionForm>({
    jawaban: ''
  });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);
  const [reflectionResponses, setReflectionResponses] = useState<string[]>([]);
  const [storyVisible, setStoryVisible] = useState(false);
  const [allActivitiesCompleted, setAllActivitiesCompleted] = useState(false);

  const handleIdealFriendSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!idealFriendForm.jawaban.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 4: Kawan Sejati',
        activityName: 'Ciri-ciri Teman Sejati',
        answer: idealFriendForm.jawaban
      });
      
      if (result.success) {
        setIdealFriendResponses(prev => [...prev, idealFriendForm.jawaban]);
        setIdealFriendSubmitted(true);
        setIdealFriendForm({ jawaban: '' });
        alert('Jawaban berhasil disimpan!');
      } else {
        alert('Gagal menyimpan jawaban: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
    }
  };

  const handleGroupDiscussionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!groupDiscussionForm.jawaban.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 4: Kawan Sejati',
        activityName: 'Membangun Persahabatan',
        answer: groupDiscussionForm.jawaban
      });
      
      if (result.success) {
        setGroupDiscussionResponses(prev => [...prev, groupDiscussionForm.jawaban]);
        setGroupDiscussionSubmitted(true);
        setGroupDiscussionForm({ jawaban: '' });
        alert('Jawaban berhasil disimpan!');
      } else {
        alert('Gagal menyimpan jawaban: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
    }
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectForm.link.trim()) {
      alert('Link tidak boleh kosong!');
      return;
    }
    
    setProjectSubmitted(true);
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
        sessionName: 'Sesi 4: Kawan Sejati',
        activityName: 'Mendukung Teman',
        answer: reflectionForm.jawaban
      });
      
      if (result.success) {
        setReflectionResponses(prev => [...prev, reflectionForm.jawaban]);
        setReflectionSubmitted(true);
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
      id: "ice-breaking-teman-ideal",
      title: "Ice Breaking Teman Ideal",
      type: "icebreaker" as const,
      description: "Mengidentifikasi karakteristik teman ideal yang diinginkan",
      duration: "10 menit"
    },
    {
      id: "diskusi-kelompok",
      title: "Diskusi Kelompok",
      type: "reflection" as const,
      description: "Diskusi tentang pertemanan yang sehat dan tidak sehat",
      duration: "15 menit"
    },
    {
      id: "proyek-mini",
      title: "Proyek Mini",
      type: "form" as const,
      description: "Membuat poster digital bertema pertemanan yang baik",
      duration: "20 menit"
    },
    {
      id: "cerita-sahabat-inspiratif",
      title: "Cerita Sahabat Inspiratif",
      type: "reading" as const,
      description: "Membaca cerita inspiratif tentang pertemanan yang baik",
      duration: "10 menit"
    },
    {
      id: "refleksi-akhir",
      title: "Refleksi Akhir",
      type: "reflection" as const,
      description: "Refleksi tentang cara menjadi teman yang baik",
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
            <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-pink-600 font-bold text-2xl">6</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Kawan Sejati</h1>
                <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  <Calendar size={14} />
                  <span>60 menit</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg mb-6">
                Membangun dan memelihara hubungan pertemanan yang sehat sebagai proteksi dari bullying.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle2 size={18} className="text-pink-600" />
                    <h3 className="font-semibold text-gray-900">Tujuan Pembelajaran</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Memahami karakteristik pertemanan yang sehat</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Mengembangkan keterampilan sosial untuk membangun pertemanan</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Belajar menjadi teman yang supportif</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-pink-50 rounded-lg p-6">
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
                      <span className="font-medium text-gray-900">6 dari 8</span>
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
                    className="px-3 py-1 text-sm bg-pink-600 text-white rounded-md hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentActivity + 1) / activities.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Kegiatan 1: Ice Breaking Teman Ideal */}
            {currentActivity === 0 && (
              <ActivityCard 
                activity={activities[0]} 
                index={0}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Teman Ideal</h4>
                  <p className="text-gray-600">
                    Mari kita mulai dengan mengidentifikasi karakteristik teman ideal yang Anda inginkan.
                  </p>
                  
                  <form onSubmit={handleIdealFriendSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Karakter teman ideal menurutmu... *
                      </label>
                      <textarea
                        value={idealFriendForm.jawaban}
                        onChange={(e) => setIdealFriendForm(prev => ({ ...prev, jawaban: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        rows={4}
                        placeholder="Tuliskan karakteristik teman ideal yang Anda inginkan..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-3 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-200 font-medium"
                    >
                      Bagikan Jawaban
                    </button>
                  </form>

                  {idealFriendResponses.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Responses:</h4>
                      {idealFriendResponses.map((response, index) => (
                        <div key={index} className="bg-pink-50 border-l-4 border-pink-200 p-3 rounded-r-lg animate-fadeIn">
                          <div className="flex items-start space-x-2">
                            <Heart size={16} className="text-pink-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-pink-800">{response}</p>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-200 font-medium"
                        >
                          Lanjut ke Kegiatan Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 2: Diskusi Kelompok */}
            {currentActivity === 1 && (
              <ActivityCard 
                activity={activities[1]} 
                index={1}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Diskusi: Pertemanan Sehat vs Tidak Sehat</h4>
                  <p className="text-gray-600">
                    Mari kita diskusikan tentang pertemanan yang sehat dan tidak sehat.
                  </p>
                  
                  <form onSubmit={handleGroupDiscussionSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bagaimana jadi teman yang suportif? Apa ciri pertemanan toxic? *
                      </label>
                      <textarea
                        value={groupDiscussionForm.jawaban}
                        onChange={(e) => setGroupDiscussionForm(prev => ({ ...prev, jawaban: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        rows={4}
                        placeholder="Jelaskan cara menjadi teman yang suportif dan ciri-ciri pertemanan yang toxic..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-3 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-200 font-medium"
                    >
                      Bagikan Jawaban
                    </button>
                  </form>

                  {groupDiscussionResponses.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Responses:</h4>
                      {groupDiscussionResponses.map((response, index) => (
                        <div key={index} className="bg-pink-50 border-l-4 border-pink-200 p-3 rounded-r-lg animate-fadeIn">
                          <div className="flex items-start space-x-2">
                            <Users size={16} className="text-pink-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-pink-800">{response}</p>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-200 font-medium"
                        >
                          Lanjut ke Kegiatan Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 3: Proyek Mini */}
            {currentActivity === 2 && (
              <ActivityCard 
                activity={activities[2]} 
                index={2}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Proyek Mini: Poster Digital</h4>
                  <p className="text-gray-600">
                    Mari kita buat poster digital bertema "Aku Teman Baikmu" untuk mengkampanyekan pertemanan yang sehat.
                  </p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-800 mb-2">Instruksi Proyek:</h5>
                    <div className="text-sm text-blue-700 space-y-2">
                      <p><strong>1. Tema:</strong> "Aku Teman Baikmu"</p>
                      <p><strong>2. Format:</strong> Poster digital (PNG/JPG)</p>
                      <p><strong>3. Konten:</strong> Pesan positif tentang pertemanan yang sehat</p>
                      <p><strong>4. Ukuran:</strong> Minimal 1080x1080 pixels</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Link ke poster digital Anda: *
                      </label>
                      <input
                        type="url"
                        value={projectForm.link}
                        onChange={(e) => setProjectForm(prev => ({ ...prev, link: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        placeholder="https://drive.google.com/... atau link lainnya"
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        type="submit"
                        className="bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-200 font-medium"
                      >
                        Submit Poster
                      </button>
                      <button
                        type="button"
                        onClick={() => window.open('#', '_blank')}
                        className="inline-flex items-center space-x-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
                      >
                        <Upload size={16} />
                        <span>Upload File</span>
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </form>

                  {projectSubmitted && (
                    <div className="mt-4 p-4 bg-pink-50 border border-pink-200 rounded-lg animate-fadeIn">
                      <h4 className="font-medium text-pink-800 mb-2">Poster Anda:</h4>
                      <div className="text-sm text-pink-700 bg-white p-3 rounded border">
                        <p><strong>Link:</strong> {projectForm.link}</p>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-200 font-medium"
                        >
                          Lanjut ke Kegiatan Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 4: Cerita Sahabat Inspiratif */}
            {currentActivity === 3 && (
              <ActivityCard 
                activity={activities[3]} 
                index={3}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Cerita Sahabat Inspiratif</h4>
                  <p className="text-gray-600">
                    Mari kita baca cerita inspiratif tentang pertemanan yang baik dan bagaimana sahabat saling mendukung.
                  </p>
                  
                  <button
                    onClick={() => setStoryVisible(!storyVisible)}
                    className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-200 font-medium"
                  >
                    {storyVisible ? 'Sembunyikan Cerita' : 'Baca Cerita'}
                  </button>
                  
                  {storyVisible && (
                    <div className="mt-4 p-4 bg-pink-50 border border-pink-200 rounded-lg animate-fadeIn">
                      <h5 className="font-medium text-pink-800 mb-3">Cerita: "Sahabat Sejati"</h5>
                      <div className="text-sm text-pink-700 space-y-3">
                        <p>
                          "Di sebuah sekolah, ada dua sahabat bernama Maya dan Sari. Mereka sudah berteman sejak kelas 1 SD. 
                          Suatu hari, Maya mengalami kesulitan dalam pelajaran matematika dan merasa sangat frustasi."
                        </p>
                        <p>
                          "Sari melihat Maya yang sedih dan langsung mendekatinya. 'Maya, aku tahu matematika itu sulit, 
                          tapi kita bisa belajar bersama. Aku akan membantumu sampai kamu paham,' kata Sari dengan penuh semangat."
                        </p>
                        <p>
                          "Setiap hari setelah sekolah, Sari mengajari Maya matematika dengan sabar. Mereka belajar bersama, 
                          tertawa bersama, dan saling mendukung. Maya pun akhirnya berhasil memahami matematika dan nilai-nilainya membaik."
                        </p>
                        <p>
                          "Cerita ini menunjukkan bahwa sahabat sejati adalah mereka yang selalu ada di saat kita membutuhkan, 
                          yang mendukung kita tanpa pamrih, dan yang percaya pada kemampuan kita meskipun kita sendiri meragukannya."
                        </p>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-200 font-medium"
                        >
                          Lanjut ke Kegiatan Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 5: Refleksi Akhir */}
            {currentActivity === 4 && (
              <ActivityCard 
                activity={activities[4]} 
                index={4}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Refleksi: Menjadi Teman yang Baik</h4>
                  <p className="text-gray-600">
                    Mari kita refleksikan tentang cara menjadi teman yang baik dan supportif.
                  </p>
                  
                  <form onSubmit={handleReflectionSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Apa satu hal yang akan kamu lakukan agar jadi teman yang baik? *
                      </label>
                      <textarea
                        value={reflectionForm.jawaban}
                        onChange={(e) => setReflectionForm(prev => ({ ...prev, jawaban: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                        rows={4}
                        placeholder="Tuliskan satu hal yang akan Anda lakukan untuk menjadi teman yang baik..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-3 bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-200 font-medium"
                    >
                      Bagikan Refleksi
                    </button>
                  </form>

                  {reflectionResponses.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Refleksi:</h4>
                      {reflectionResponses.map((response, index) => (
                        <div key={index} className="bg-pink-50 border-l-4 border-pink-200 p-3 rounded-r-lg animate-fadeIn">
                          <div className="flex items-start space-x-2">
                            <FileText size={16} className="text-pink-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-pink-800">{response}</p>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors duration-200 font-medium"
                        >
                          Selesai - Lanjut ke Sesi 7
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Completion Message */}
            {allActivitiesCompleted && (
              <div className="bg-pink-50 border border-pink-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-pink-600" />
                </div>
                <h3 className="text-2xl font-bold text-pink-800 mb-2">Selamat! 🎉</h3>
                <p className="text-pink-700 mb-6">
                  Anda telah menyelesaikan semua kegiatan di Sesi 6. Sekarang Anda siap untuk melanjutkan ke Sesi 7: "Refleksi dan Cerita Inspiratif".
                </p>
                <Link 
                  href="/sesi/refleksi-cerita-inspiratif"
                  className="inline-flex items-center space-x-2 bg-pink-600 text-white px-6 py-3 rounded-md hover:bg-pink-700 transition-colors duration-200 font-medium"
                >
                  <span>Lanjut ke Sesi 7</span>
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
              href="/sesi/berani-bicara"
              className="inline-flex items-center text-gray-600 hover:text-pink-600 transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              <div className="text-left">
                <div className="text-sm text-gray-500">Sesi Sebelumnya</div>
                <div className="font-medium">Sesi 5: Berani Bicara</div>
              </div>
            </Link>
            <Link 
              href="/sesi/refleksi-cerita-inspiratif"
              className="inline-flex items-center text-gray-600 hover:text-pink-600 transition-colors duration-200"
            >
              <div className="text-right">
                <div className="text-sm text-gray-500">Sesi Selanjutnya</div>
                <div className="font-medium">Sesi 7: Refleksi dan Cerita Inspiratif</div>
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
