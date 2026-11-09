'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Heart, Award } from 'lucide-react';
import SessionLayout from '@/components/SessionLayout';
import ActivityCard from '@/components/ActivityCard';
import ProgressBar from '@/components/ProgressBar';
import { sessions } from '@/lib/sessions';
import { learningVideos } from '@/lib/learningVideos';

const session = sessions[6];
const prevSession = sessions[5];
const nextSession = sessions[7];

const activities = [
  { id: 'sesi-sharing-bebas', title: 'Sesi Sharing Bebas', type: 'reflection' as const, description: 'Berbagi pengalaman dan cerita inspiratif dari peserta', duration: '15 menit' },
  { id: 'video-kisah-nyata', title: 'Refleksi Cerita Animasi', type: 'video' as const, description: 'Cerita animasi tentang perundungan dan pentingnya dukungan teman', videos: [learningVideos.story], duration: '15 menit' },
  { id: 'lembar-refleksi-digital', title: 'Lembar Refleksi Digital', type: 'form' as const, description: 'Refleksi mendalam tentang pembelajaran dan perubahan', duration: '15 menit' },
  { id: 'motivasi-penutup', title: 'Motivasi Penutup', type: 'reading' as const, description: 'Kata-kata penguatan dan motivasi dari fasilitator', duration: '5 menit' },
];

export default function Session7Page() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [sharingAnswer, setSharingAnswer] = useState('');
  const [sharingResponses, setSharingResponses] = useState<string[]>([]);
  const [reflectionForm, setReflectionForm] = useState({ pelajaranTerbesar: '', perubahanInginDibuat: '' });
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);
  const [allActivitiesCompleted, setAllActivitiesCompleted] = useState(false);

  const submitAnswer = async (activityName: string, answer: string) => {
    try {
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      const result = await submitSessionAnswer({ sessionName: 'Sesi 7: Refleksi Cerita Inspiratif', activityName, answer });
      if (!result.success) alert('Gagal menyimpan jawaban: ' + result.error);
      return result.success;
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
      return false;
    }
  };

  const handleSharingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sharingAnswer.trim()) return alert('Jawaban tidak boleh kosong!');
    if (await submitAnswer('Cerita Inspiratif', sharingAnswer)) {
      setSharingResponses((prev) => [...prev, sharingAnswer]);
      setSharingAnswer('');
    }
  };

  const handleReflectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionForm.pelajaranTerbesar.trim() || !reflectionForm.perubahanInginDibuat.trim()) return alert('Semua field harus diisi!');
    if (await submitAnswer('Refleksi Diri', JSON.stringify(reflectionForm))) setReflectionSubmitted(true);
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
        <p className="text-neutral-600 mb-6">Ikuti setiap aktivitas secara berurutan untuk mendapatkan pemahaman yang optimal.</p>
        <ProgressBar current={currentActivity} total={activities.length} onPrev={handlePrevActivity} onNext={handleNextActivity} canGoPrev={currentActivity > 0} />
      </div>

      <div className="space-y-6">
        {currentActivity === 0 && (
          <ActivityCard activity={activities[0]} index={0}>
            <div className="space-y-4">
              <p className="text-neutral-600">Mari kita berbagi pengalaman dan cerita inspiratif yang telah kita alami selama program ini.</p>
              <form onSubmit={handleSharingSubmit}>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Bagikan pengalaman atau cerita inspiratif Anda: *</label>
                <textarea value={sharingAnswer} onChange={(e) => setSharingAnswer(e.target.value)} className="textarea-base" rows={4} placeholder="Tuliskan pengalaman atau cerita inspiratif yang ingin Anda bagikan..." />
                <button type="submit" className="mt-3 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Bagikan Cerita
                </button>
              </form>

              {sharingResponses.length > 0 && (
                <div className="space-y-3">
                  {sharingResponses.map((response, i) => (
                    <div key={i} className="bg-primary-50 border-l-4 border-primary-200 p-3 rounded-r-lg animate-fade-in">
                      <div className="flex items-start gap-2">
                        <Heart size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
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

        {currentActivity === 1 && (
          <ActivityCard activity={activities[1]} index={1}>
            <div className="space-y-4">
              <p className="text-neutral-600">Mari tonton cerita animasi ini. Perhatikan perasaan tokohnya, dampak perundungan, dan tindakan yang dapat membantu teman.</p>
              <button onClick={handleNextActivity} className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                Lanjut ke Kegiatan Selanjutnya
              </button>
            </div>
          </ActivityCard>
        )}

        {currentActivity === 2 && (
          <ActivityCard activity={activities[2]} index={2}>
            <div className="space-y-4">
              <p className="text-neutral-600">Mari kita refleksikan pembelajaran yang telah kita dapatkan dan perubahan yang ingin kita buat.</p>
              <form onSubmit={handleReflectionSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Apa pelajaran terbesar dari program ini? *</label>
                  <textarea value={reflectionForm.pelajaranTerbesar} onChange={(e) => setReflectionForm((prev) => ({ ...prev, pelajaranTerbesar: e.target.value }))} className="textarea-base" rows={3} placeholder="Tuliskan pelajaran terbesar yang Anda dapatkan..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Apa perubahan yang ingin saya buat? *</label>
                  <textarea value={reflectionForm.perubahanInginDibuat} onChange={(e) => setReflectionForm((prev) => ({ ...prev, perubahanInginDibuat: e.target.value }))} className="textarea-base" rows={3} placeholder="Tuliskan perubahan yang ingin Anda buat..." />
                </div>
                <button type="submit" className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Simpan Refleksi
                </button>
              </form>

              {reflectionSubmitted && (
                <div className="p-4 bg-primary-50 border border-primary-100 rounded-lg animate-fade-in">
                  <h4 className="font-medium text-primary-800 mb-2">Refleksi Anda:</h4>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded border border-primary-100">
                      <h5 className="font-medium text-primary-800 text-sm mb-1">Pelajaran Terbesar:</h5>
                      <p className="text-sm text-primary-800">{reflectionForm.pelajaranTerbesar}</p>
                    </div>
                    <div className="bg-white p-3 rounded border border-primary-100">
                      <h5 className="font-medium text-primary-800 text-sm mb-1">Perubahan yang Ingin Dibuat:</h5>
                      <p className="text-sm text-primary-800">{reflectionForm.perubahanInginDibuat}</p>
                    </div>
                  </div>
                  <button onClick={handleNextActivity} className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                    Lanjut ke Kegiatan Selanjutnya
                  </button>
                </div>
              )}
            </div>
          </ActivityCard>
        )}

        {currentActivity === 3 && (
          <ActivityCard activity={activities[3]} index={3}>
            <div className="space-y-4">
              <p className="text-neutral-600">Mari kita tutup dengan kata-kata penguatan dan motivasi dari fasilitator.</p>
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-6 text-center">
                <Award size={40} className="text-primary-600 mx-auto mb-4" />
                <h5 className="font-medium text-primary-800 mb-3">Pesan dari Fasilitator</h5>
                <div className="text-sm text-primary-800 space-y-3 text-left">
                  <p>"Selamat! Anda telah menyelesaikan 7 sesi program pencegahan bullying. Perjalanan ini menunjukkan komitmen Anda untuk menciptakan lingkungan yang lebih baik."</p>
                  <p>"Ingatlah bahwa setiap langkah kecil yang Anda ambil untuk mencegah bullying memiliki dampak yang berarti. Anda adalah bagian dari perubahan ini."</p>
                  <p>"Teruslah menjadi teladan bagi teman-teman Anda. Jadilah suara bagi yang tidak bersuara, dan jadilah teman yang selalu mendukung sesama."</p>
                  <p className="font-medium">"Bersama-sama, kita bisa menciptakan lingkungan sekolah yang lebih aman dan suportif. Terima kasih telah menjadi bagian dari perjalanan ini!"</p>
                </div>
              </div>
              <button onClick={handleNextActivity} className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                Selesai - Lanjut ke Sesi 8
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
            <p className="text-success-700 mb-6">Anda telah menyelesaikan semua kegiatan di Sesi 7. Sekarang Anda siap untuk melanjutkan ke Sesi 8.</p>
            <Link href="/sesi/posttest-penutup" className="inline-flex items-center gap-2 bg-success-600 text-white px-6 py-3 rounded-lg hover:bg-success-700 font-medium transition-colors duration-200 focus-ring">
              Lanjut ke Sesi 8
              <CheckCircle2 size={18} />
            </Link>
          </div>
        )}
      </div>
    </SessionLayout>
  );
}
