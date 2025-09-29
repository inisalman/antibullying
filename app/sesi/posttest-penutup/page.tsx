'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, CheckCircle2, Calendar, Play, MessageSquare, Target, BookOpen, Users, Heart, Star, Award, Download, Camera, GraduationCap } from 'lucide-react';
import ActivityCard from '@/components/ActivityCard';

interface ProudForm {
  jawaban: string;
}

interface PostTestForm {
  jawaban: string;
}

interface CommitmentForm {
  jawaban: string;
}

export default function Session8Page() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [proudForm, setProudForm] = useState<ProudForm>({
    jawaban: ''
  });
  const [proudSubmitted, setProudSubmitted] = useState(false);
  const [proudResponses, setProudResponses] = useState<string[]>([]);
  const [postTestForm, setPostTestForm] = useState<PostTestForm>({
    jawaban: ''
  });
  const [postTestSubmitted, setPostTestSubmitted] = useState(false);
  const [commitmentForm, setCommitmentForm] = useState<CommitmentForm>({
    jawaban: ''
  });
  const [commitmentSubmitted, setCommitmentSubmitted] = useState(false);
  const [allActivitiesCompleted, setAllActivitiesCompleted] = useState(false);

  const handleProudSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!proudForm.jawaban.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 8: Post-Test & Penutup',
        activityName: 'Refleksi Program',
        answer: proudForm.jawaban
      });
      
      if (result.success) {
        setProudResponses(prev => [...prev, proudForm.jawaban]);
        setProudSubmitted(true);
        setProudForm({ jawaban: '' });
        alert('Jawaban berhasil disimpan!');
      } else {
        alert('Gagal menyimpan jawaban: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
    }
  };

  const handlePostTestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postTestForm.jawaban.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 8: Post-Test & Penutup',
        activityName: 'Post-Test',
        answer: postTestForm.jawaban
      });
      
      if (result.success) {
        setPostTestSubmitted(true);
        alert('Jawaban berhasil disimpan!');
      } else {
        alert('Gagal menyimpan jawaban: ' + result.error);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
    }
  };

  const handleCommitmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commitmentForm.jawaban.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }
    
    try {
      // Import utility function
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 8: Post-Test & Penutup',
        activityName: 'Komitmen Masa Depan',
        answer: commitmentForm.jawaban
      });
      
      if (result.success) {
        setCommitmentSubmitted(true);
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
      id: "post-test-online",
      title: "Post-Test Online",
      type: "form" as const,
      description: "Kuesioner untuk mengukur peningkatan pemahaman tentang bullying",
      url: "#",
      duration: "15-20 menit"
    },
    {
      id: "sesi-saya-bangga",
      title: "Sesi Saya Bangga Karena",
      type: "reflection" as const,
      description: "Refleksi tentang pencapaian dan kebanggaan peserta",
      duration: "10 menit"
    },
    {
      id: "penyerahan-sertifikat-digital",
      title: "Penyerahan Sertifikat Digital",
      type: "form" as const,
      description: "Download sertifikat digital sebagai bukti penyelesaian program",
      duration: "10 menit"
    },
    {
      id: "foto-virtual-bersama",
      title: "Foto Virtual Bersama",
      type: "form" as const,
      description: "Mengabadikan momen bersama dalam foto virtual",
      duration: "5 menit"
    },
    {
      id: "penutupan-ucapan-terima-kasih",
      title: "Penutupan & Ucapan Terima Kasih",
      type: "reading" as const,
      description: "Harapan dan salam penutup dari fasilitator",
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
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-emerald-600 font-bold text-2xl">8</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">Post-Test & Penutup</h1>
                <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  <Calendar size={14} />
                  <span>50 menit</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg mb-6">
                Evaluasi akhir program dan penutupan dengan rencana tindak lanjut.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    <h3 className="font-semibold text-gray-900">Tujuan Pembelajaran</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Mengukur peningkatan pemahaman tentang bullying</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Mengevaluasi efektivitas program</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">Merencanakan tindak lanjut dan implementasi</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-emerald-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Info Sesi</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durasi:</span>
                      <span className="font-medium text-gray-900">50 menit</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Aktivitas:</span>
                      <span className="font-medium text-gray-900">5 aktivitas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sesi:</span>
                      <span className="font-medium text-gray-900">8 dari 8 (Final)</span>
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
              Ikuti setiap aktivitas secara berurutan untuk menyelesaikan program dengan sempurna.
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
                    className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Selanjutnya
                  </button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentActivity + 1) / activities.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Kegiatan 1: Post-Test Online */}
            {currentActivity === 0 && (
              <ActivityCard 
                activity={activities[0]} 
                index={0}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Post-Test Pemahaman Bullying</h4>
                  <p className="text-gray-600">
                    Mari kita ukur peningkatan pemahaman Anda tentang bullying setelah mengikuti program ini.
                  </p>
                  
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h5 className="font-medium text-emerald-800 mb-2">Post-Test Online</h5>
                    <p className="text-sm text-emerald-700 mb-3">
                      Kuesioner ini akan membantu kami memahami peningkatan pemahaman Anda tentang bullying 
                      setelah mengikuti program pembelajaran.
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => window.open('#', '_blank')}
                        className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors duration-200 font-medium"
                      >
                        <BookOpen size={20} />
                        <span>Mulai Post-Test</span>
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={handleNextActivity}
                      className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors duration-200 font-medium"
                    >
                      Lanjut ke Kegiatan Selanjutnya
                    </button>
                  </div>
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 2: Sesi "Saya Bangga Karena" */}
            {currentActivity === 1 && (
              <ActivityCard 
                activity={activities[1]} 
                index={1}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Saya Bangga Karena...</h4>
                  <p className="text-gray-600">
                    Mari kita refleksikan pencapaian dan kebanggaan yang telah kita raih selama program ini.
                  </p>
                  
                  <form onSubmit={handleProudSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Saya bangga telah... *
                      </label>
                      <textarea
                        value={proudForm.jawaban}
                        onChange={(e) => setProudForm(prev => ({ ...prev, jawaban: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        rows={4}
                        placeholder="Tuliskan hal-hal yang membuat Anda bangga setelah mengikuti program ini..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="mt-3 bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors duration-200 font-medium"
                    >
                      Bagikan Kebanggaan
                    </button>
                  </form>

                  {proudResponses.length > 0 && (
                    <div className="mt-4 space-y-3">
                      <h4 className="font-medium text-gray-900">Kebanggaan Anda:</h4>
                      {proudResponses.map((response, index) => (
                        <div key={index} className="bg-emerald-50 border-l-4 border-emerald-200 p-3 rounded-r-lg animate-fadeIn">
                          <div className="flex items-start space-x-2">
                            <Star size={16} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-emerald-800">{response}</p>
                          </div>
                        </div>
                      ))}
                      <div className="mt-4">
                        <button
                          onClick={handleNextActivity}
                          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors duration-200 font-medium"
                        >
                          Lanjut ke Kegiatan Selanjutnya
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 3: Penyerahan Sertifikat Digital */}
            {currentActivity === 2 && (
              <ActivityCard 
                activity={activities[2]} 
                index={2}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Sertifikat Digital</h4>
                  <p className="text-gray-600">
                    Selamat! Anda telah menyelesaikan program pencegahan bullying. Mari kita download sertifikat digital Anda.
                  </p>
                  
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <GraduationCap size={32} className="text-emerald-600" />
                    </div>
                    <h5 className="font-medium text-emerald-800 mb-2">Sertifikat Penyelesaian Program</h5>
                    <p className="text-sm text-emerald-700 mb-4">
                      Sertifikat ini membuktikan bahwa Anda telah menyelesaikan program pencegahan bullying dengan sukses.
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => window.open('#', '_blank')}
                        className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors duration-200 font-medium"
                      >
                        <Download size={20} />
                        <span>Download Sertifikat</span>
                        <ExternalLink size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-emerald-600 mt-3">
                      Sertifikat juga dapat dikirim via email atau WhatsApp
                    </p>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={handleNextActivity}
                      className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors duration-200 font-medium"
                    >
                      Lanjut ke Kegiatan Selanjutnya
                    </button>
                  </div>
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 4: Foto Virtual Bersama */}
            {currentActivity === 3 && (
              <ActivityCard 
                activity={activities[3]} 
                index={3}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Foto Virtual Bersama</h4>
                  <p className="text-gray-600">
                    Mari kita abadikan momen kebersamaan ini dengan foto virtual bersama.
                  </p>
                  
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Camera size={32} className="text-emerald-600" />
                    </div>
                    <h5 className="font-medium text-emerald-800 mb-2">Foto Virtual Bersama</h5>
                    <p className="text-sm text-emerald-700 mb-4">
                      Upload foto Anda untuk membuat foto virtual bersama dengan peserta lainnya.
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                      <button
                        onClick={() => window.open('#', '_blank')}
                        className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors duration-200 font-medium"
                      >
                        <Camera size={20} />
                        <span>Upload Foto</span>
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={handleNextActivity}
                      className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors duration-200 font-medium"
                    >
                      Lanjut ke Kegiatan Selanjutnya
                    </button>
                  </div>
                </div>
              </ActivityCard>
            )}

            {/* Kegiatan 5: Penutupan & Ucapan Terima Kasih */}
            {currentActivity === 4 && (
              <ActivityCard 
                activity={activities[4]} 
                index={4}
              >
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Penutupan & Ucapan Terima Kasih</h4>
                  <p className="text-gray-600">
                    Mari kita tutup program ini dengan harapan dan ucapan terima kasih dari fasilitator.
                  </p>
                  
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
                    <div className="text-center">
                      <Award size={48} className="text-emerald-600 mx-auto mb-4" />
                      <h5 className="font-medium text-emerald-800 mb-3">Terima Kasih & Selamat!</h5>
                      <div className="text-sm text-emerald-700 space-y-3">
                        <p>
                          "Terima kasih yang sebesar-besarnya kepada semua peserta yang telah berpartisipasi 
                          dalam program pencegahan bullying ini. Perjalanan 8 sesi ini telah menunjukkan 
                          komitmen dan dedikasi Anda untuk menciptakan lingkungan yang lebih baik."
                        </p>
                        <p>
                          "Kami berharap program ini telah memberikan wawasan dan keterampilan yang berguna 
                          untuk mencegah bullying di lingkungan Anda. Ingatlah bahwa setiap tindakan kecil 
                          yang Anda lakukan dapat membuat perbedaan yang besar."
                        </p>
                        <p>
                          "Teruslah menjadi agen perubahan yang positif. Jadilah teladan bagi teman-teman 
                          Anda, dan jangan ragu untuk melaporkan atau mencegah bullying yang Anda lihat."
                        </p>
                        <p className="font-medium">
                          "Selamat! Anda telah menjadi bagian dari solusi untuk menciptakan dunia yang lebih 
                          aman dan penuh kasih sayang. Terima kasih telah menjadi pahlawan anti-bullying!"
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={handleNextActivity}
                      className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 transition-colors duration-200 font-medium"
                    >
                      Selesai - Program Selesai!
                    </button>
                  </div>
                </div>
              </ActivityCard>
            )}

            {/* Completion Message */}
            {allActivitiesCompleted && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-800 mb-2">Selamat! 🎉</h3>
                <p className="text-emerald-700 mb-6">
                  Anda telah menyelesaikan seluruh program pencegahan bullying! Terima kasih telah menjadi bagian dari perubahan positif.
                </p>
                <Link 
                  href="/"
                  className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-700 transition-colors duration-200 font-medium"
                >
                  <span>Kembali ke Beranda</span>
                  <ArrowLeft size={20} />
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
              href="/sesi/refleksi-cerita-inspiratif"
              className="inline-flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              <div className="text-left">
                <div className="text-sm text-gray-500">Sesi Sebelumnya</div>
                <div className="font-medium">Sesi 7: Refleksi & Cerita Inspiratif</div>
              </div>
            </Link>
            <div className="text-center">
              <div className="text-sm text-gray-500">Program Selesai</div>
              <div className="font-medium text-emerald-600">🎉 Selamat!</div>
            </div>
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
