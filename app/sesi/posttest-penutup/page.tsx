'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, BookOpen, Star, GraduationCap, Download, Camera, Home } from 'lucide-react';
import SessionLayout from '@/components/SessionLayout';
import ActivityCard from '@/components/ActivityCard';
import ProgressBar from '@/components/ProgressBar';
import { sessions } from '@/lib/sessions';

const session = sessions[7];
const prevSession = sessions[6];
const nextSession = null;

const activities = [
  { id: 'post-test-online', title: 'Post-Test Online', type: 'form' as const, description: 'Kuesioner untuk mengukur peningkatan pemahaman tentang bullying', url: '#', duration: '15-20 menit' },
  { id: 'sesi-saya-bangga', title: 'Sesi Saya Bangga Karena', type: 'reflection' as const, description: 'Refleksi tentang pencapaian dan kebanggaan peserta', duration: '10 menit' },
  { id: 'penyerahan-sertifikat-digital', title: 'Penyerahan Sertifikat Digital', type: 'form' as const, description: 'Download sertifikat digital sebagai bukti penyelesaian program', duration: '10 menit' },
  { id: 'foto-virtual-bersama', title: 'Foto Virtual Bersama', type: 'form' as const, description: 'Mengabadikan momen bersama dalam foto virtual', duration: '5 menit' },
  session.activities[3],
];

export default function Session8Page() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [proudAnswer, setProudAnswer] = useState('');
  const [proudResponses, setProudResponses] = useState<string[]>([]);
  const [allActivitiesCompleted, setAllActivitiesCompleted] = useState(false);

  const submitAnswer = async (activityName: string, answer: string) => {
    try {
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      const result = await submitSessionAnswer({ sessionName: 'Sesi 8: Post-Test & Penutup', activityName, answer });
      if (!result.success) alert('Gagal menyimpan jawaban: ' + result.error);
      return result.success;
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
      return false;
    }
  };

  const handleProudSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proudAnswer.trim()) return alert('Jawaban tidak boleh kosong!');
    if (await submitAnswer('Refleksi Program', proudAnswer)) {
      setProudResponses((prev) => [...prev, proudAnswer]);
      setProudAnswer('');
    }
  };

  const handleNextActivity = () => {
    if (currentActivity < activities.length - 1) setCurrentActivity(currentActivity + 1);
    else setAllActivitiesCompleted(true);
  };
  const handlePrevActivity = () => currentActivity > 0 && setCurrentActivity(currentActivity - 1);

  return (
    <SessionLayout
      sessionId={session.id}
      sessionTitle={session.title}
      sessionDescription={session.description}
      duration={session.duration}
      objectives={session.objectives}
      prevSession={prevSession}
      nextSession={nextSession}
    >
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Aktivitas Pembelajaran</h2>
        <p className="text-neutral-600 mb-6">Ikuti setiap aktivitas secara berurutan untuk menyelesaikan program dengan baik.</p>
        <ProgressBar current={currentActivity} total={activities.length} onPrev={handlePrevActivity} onNext={handleNextActivity} canGoPrev={currentActivity > 0} />
      </div>

      <div className="space-y-6">
        {currentActivity === 0 && (
          <ActivityCard activity={activities[0]} index={0}>
            <div className="space-y-4">
              <p className="text-neutral-600">Mari kita ukur peningkatan pemahaman Anda tentang bullying setelah mengikuti program ini.</p>
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-4 text-center">
                <h5 className="font-medium text-primary-800 mb-2">Post-Test Online</h5>
                <p className="text-sm text-primary-800 mb-3">Kuesioner ini akan membantu kami memahami peningkatan pemahaman Anda setelah mengikuti program.</p>
                <button onClick={() => window.open('#', '_blank')} className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  <BookOpen size={18} />
                  Mulai Post-Test
                </button>
              </div>
              <button onClick={handleNextActivity} className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                Lanjut ke Kegiatan Selanjutnya
              </button>
            </div>
          </ActivityCard>
        )}

        {currentActivity === 1 && (
          <ActivityCard activity={activities[1]} index={1}>
            <div className="space-y-4">
              <p className="text-neutral-600">Mari kita refleksikan pencapaian dan kebanggaan yang telah kita raih selama program ini.</p>
              <form onSubmit={handleProudSubmit}>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Saya bangga telah... *</label>
                <textarea value={proudAnswer} onChange={(e) => setProudAnswer(e.target.value)} className="textarea-base" rows={4} placeholder="Tuliskan hal-hal yang membuat Anda bangga setelah mengikuti program ini..." />
                <button type="submit" className="mt-3 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Bagikan Kebanggaan
                </button>
              </form>

              {proudResponses.length > 0 && (
                <div className="space-y-3">
                  {proudResponses.map((response, i) => (
                    <div key={i} className="bg-primary-50 border-l-4 border-primary-200 p-3 rounded-r-lg animate-fade-in">
                      <div className="flex items-start gap-2">
                        <Star size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-primary-800">{response}</p>
                      </div>
                    </div>
                  ))}
                  <button onClick={handleNextActivity} className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                    Lanjut ke Kegiatan Selanjutnya
                  </button>
                </div>
              )}
            </div>
          </ActivityCard>
        )}

        {currentActivity === 2 && (
          <ActivityCard activity={activities[2]} index={2}>
            <div className="space-y-4">
              <p className="text-neutral-600">Selamat! Anda telah menyelesaikan program pencegahan bullying. Mari kita download sertifikat digital Anda.</p>
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-6 text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap size={28} className="text-primary-600" />
                </div>
                <h5 className="font-medium text-primary-800 mb-2">Sertifikat Penyelesaian Program</h5>
                <p className="text-sm text-primary-800 mb-4">Sertifikat ini membuktikan bahwa Anda telah menyelesaikan program pencegahan bullying.</p>
                <button onClick={() => window.open('#', '_blank')} className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  <Download size={18} />
                  Download Sertifikat
                </button>
              </div>
              <button onClick={handleNextActivity} className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                Lanjut ke Kegiatan Selanjutnya
              </button>
            </div>
          </ActivityCard>
        )}

        {currentActivity === 3 && (
          <ActivityCard activity={activities[3]} index={3}>
            <div className="space-y-4">
              <p className="text-neutral-600">Mari kita abadikan momen kebersamaan ini dengan foto virtual bersama.</p>
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-6 text-center">
                <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera size={28} className="text-primary-600" />
                </div>
                <h5 className="font-medium text-primary-800 mb-2">Foto Virtual Bersama</h5>
                <p className="text-sm text-primary-800 mb-4">Upload foto Anda untuk membuat foto virtual bersama dengan peserta lainnya.</p>
                <button onClick={() => window.open('#', '_blank')} className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  <Camera size={18} />
                  Upload Foto
                </button>
              </div>
              <button onClick={handleNextActivity} className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                Lanjut ke Kegiatan Selanjutnya
              </button>
            </div>
          </ActivityCard>
        )}

        {currentActivity === 4 && (
          <ActivityCard activity={activities[4]} index={4}>
            <div className="space-y-4">
              <button onClick={handleNextActivity} className="w-full bg-success-600 text-white py-2 px-4 rounded-md hover:bg-success-700 font-medium transition-colors duration-200 focus-ring">
                Saya Sudah Membaca — Selesaikan Program
              </button>
            </div>
          </ActivityCard>
        )}

        {allActivitiesCompleted && (
          <div className="bg-success-50 border border-success-500 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-success-600" />
            </div>
            <h3 className="text-2xl font-bold text-success-700 mb-2">Selamat!</h3>
            <p className="text-success-700 mb-6">Anda telah menyelesaikan seluruh program pencegahan bullying. Terima kasih telah menjadi bagian dari perubahan positif.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-success-600 text-white px-6 py-3 rounded-lg hover:bg-success-700 font-medium transition-colors duration-200 focus-ring">
              <Home size={18} />
              Kembali ke Beranda
            </Link>
          </div>
        )}
      </div>
    </SessionLayout>
  );
}
