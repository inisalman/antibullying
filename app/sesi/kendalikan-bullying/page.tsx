'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Users, Target, Shield } from 'lucide-react';
import SessionLayout from '@/components/SessionLayout';
import ActivityCard from '@/components/ActivityCard';
import ProgressBar from '@/components/ProgressBar';
import { sessions } from '@/lib/sessions';
import { learningVideos } from '@/lib/learningVideos';

const session = sessions[2];
const prevSession = sessions[1];
const nextSession = sessions[3];

const activities = [
  {
    id: 'cerita-interaktif',
    title: 'Kecakapan Hidup: Mengelola Emosi',
    type: 'video' as const,
    description: 'Animasi tentang kecakapan hidup remaja, emosi, dan tekanan teman sebaya',
    videos: [learningVideos.lifeSkills],
    duration: '10 menit',
  },
  {
    id: 'role-play-virtual',
    title: 'Role Play Virtual',
    type: 'reflection' as const,
    description: 'Simulasi peran untuk memahami perspektif yang berbeda',
    duration: '20 menit',
  },
  {
    id: 'latihan-pernyataan-assertif',
    title: 'Latihan Pernyataan Assertif',
    type: 'form' as const,
    description: 'Belajar menyampaikan perasaan dengan cara yang sehat',
    duration: '15 menit',
  },
  {
    id: 'kuis-penguatan',
    title: 'Kuis Penguatan',
    type: 'quiz' as const,
    description: 'Kuis untuk menguatkan pemahaman tentang pengendalian emosi',
    url: '#',
    duration: '10 menit',
  },
  {
    id: 'penutup',
    title: 'Penutup',
    type: 'reflection' as const,
    description: 'Refleksi pembelajaran dan kesimpulan',
    duration: '5 menit',
  },
];

export default function Session3Page() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [rolePlayStarted, setRolePlayStarted] = useState(false);
  const [rolePlayAnswer, setRolePlayAnswer] = useState('');
  const [rolePlayResponses, setRolePlayResponses] = useState<string[]>([]);
  const [assertiveStatement, setAssertiveStatement] = useState({ sayaMerasa: '', karena: '', sayaIngin: '' });
  const [assertiveSubmitted, setAssertiveSubmitted] = useState(false);
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [reflectionResponses, setReflectionResponses] = useState<string[]>([]);
  const [allActivitiesCompleted, setAllActivitiesCompleted] = useState(false);

  const submitAnswer = async (activityName: string, answer: string) => {
    try {
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      const result = await submitSessionAnswer({ sessionName: 'Sesi 6: Kendalikan Bullying', activityName, answer });
      if (!result.success) alert('Gagal menyimpan jawaban: ' + result.error);
      return result.success;
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
      return false;
    }
  };

  const handleRolePlaySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rolePlayAnswer.trim()) return alert('Jawaban tidak boleh kosong!');
    if (await submitAnswer('Strategi Pencegahan', rolePlayAnswer)) {
      setRolePlayResponses((prev) => [...prev, rolePlayAnswer]);
      setRolePlayAnswer('');
    }
  };

  const handleAssertiveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assertiveStatement.sayaMerasa.trim() || !assertiveStatement.karena.trim() || !assertiveStatement.sayaIngin.trim()) {
      return alert('Semua field harus diisi!');
    }
    if (await submitAnswer('Intervensi Bystander', JSON.stringify(assertiveStatement))) setAssertiveSubmitted(true);
  };

  const handleReflectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionAnswer.trim()) return alert('Jawaban tidak boleh kosong!');
    if (await submitAnswer('Membangun Budaya Positif', reflectionAnswer)) {
      setReflectionResponses((prev) => [...prev, reflectionAnswer]);
      setReflectionAnswer('');
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
        <p className="text-neutral-600 mb-6">Ikuti setiap aktivitas secara berurutan untuk mendapatkan pemahaman yang optimal.</p>
        <ProgressBar current={currentActivity} total={activities.length} onPrev={handlePrevActivity} onNext={handleNextActivity} canGoPrev={currentActivity > 0} />
      </div>

      <div className="space-y-6">
        {currentActivity === 0 && (
          <ActivityCard activity={activities[0]} index={0}>
            <div className="space-y-4">
              <p className="text-neutral-600">Tonton animasi kecakapan hidup remaja ini. Perhatikan cara mengenali emosi dan menghadapi tekanan dari teman sebaya.</p>
              <button onClick={handleNextActivity} className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                Lanjut ke Kegiatan Selanjutnya
              </button>
            </div>
          </ActivityCard>
        )}

        {currentActivity === 1 && (
          <ActivityCard activity={activities[1]} index={1}>
            <div className="space-y-4">
              <p className="text-neutral-600">Mari kita berlatih dengan simulasi peran. Bayangkan Anda berada dalam situasi bullying dan coba pikirkan apa yang seharusnya dilakukan.</p>
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
                <h5 className="font-medium text-primary-800 mb-2">Instruksi Role Play:</h5>
                <div className="text-sm text-primary-800 space-y-2">
                  <p>
                    <strong>Peran 1 - Pelaku:</strong> Bayangkan Anda adalah orang yang melakukan bullying
                  </p>
                  <p>
                    <strong>Peran 2 - Korban:</strong> Bayangkan Anda adalah yang mengalami bullying
                  </p>
                  <p>
                    <strong>Peran 3 - Pengamat:</strong> Bayangkan Anda adalah saksi yang melihat bullying
                  </p>
                </div>
              </div>

              <button onClick={() => setRolePlayStarted(!rolePlayStarted)} className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                Mulai Role Play
              </button>

              {rolePlayStarted && (
                <div className="p-4 bg-neutral-50 rounded-lg animate-fade-in">
                  <h5 className="font-medium text-neutral-900 mb-3">Apa yang seharusnya dilakukan dalam situasi ini? Jelaskan dari perspektif masing-masing peran!</h5>
                  <form onSubmit={handleRolePlaySubmit}>
                    <textarea value={rolePlayAnswer} onChange={(e) => setRolePlayAnswer(e.target.value)} className="textarea-base" rows={4} placeholder="Tuliskan analisis Anda dari ketiga perspektif..." />
                    <button type="submit" className="mt-3 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                      Submit Analisis
                    </button>
                  </form>

                  {rolePlayResponses.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {rolePlayResponses.map((response, i) => (
                        <div key={i} className="bg-primary-50 border-l-4 border-primary-200 p-3 rounded-r-lg animate-fade-in">
                          <div className="flex items-start gap-2">
                            <Users size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
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
              )}
            </div>
          </ActivityCard>
        )}

        {currentActivity === 2 && (
          <ActivityCard activity={activities[2]} index={2}>
            <div className="space-y-4">
              <p className="text-neutral-600">Mari kita berlatih menyampaikan perasaan dengan cara yang sehat dan assertif.</p>
              <form onSubmit={handleAssertiveSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Saya merasa... *</label>
                  <input type="text" value={assertiveStatement.sayaMerasa} onChange={(e) => setAssertiveStatement((prev) => ({ ...prev, sayaMerasa: e.target.value }))} className="input-base" placeholder="Contoh: tidak nyaman, sedih, marah" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Karena... *</label>
                  <input type="text" value={assertiveStatement.karena} onChange={(e) => setAssertiveStatement((prev) => ({ ...prev, karena: e.target.value }))} className="input-base" placeholder="Contoh: Anda memanggil saya dengan nama yang tidak pantas" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Saya ingin... *</label>
                  <input type="text" value={assertiveStatement.sayaIngin} onChange={(e) => setAssertiveStatement((prev) => ({ ...prev, sayaIngin: e.target.value }))} className="input-base" placeholder="Contoh: Anda memanggil saya dengan nama yang benar" />
                </div>
                <button type="submit" className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Gabungkan Pernyataan
                </button>
              </form>

              {assertiveSubmitted && (
                <div className="p-4 bg-primary-50 border border-primary-100 rounded-lg animate-fade-in">
                  <h4 className="font-medium text-primary-800 mb-2">Pernyataan Assertif Anda:</h4>
                  <div className="text-sm text-primary-800 bg-white p-3 rounded border border-primary-100">
                    <p className="font-medium">
                      "Saya merasa {assertiveStatement.sayaMerasa} karena {assertiveStatement.karena}. Saya ingin {assertiveStatement.sayaIngin}."
                    </p>
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
              <p className="text-neutral-600">Mari kita uji pemahaman Anda tentang teknik pengendalian emosi dan perilaku.</p>
              <div className="bg-warning-50 border border-warning-500 rounded-lg p-6 text-center">
                <Target size={32} className="text-warning-600 mx-auto mb-3" />
                <h4 className="font-medium text-warning-700 mb-2">Kuis Penguatan</h4>
                <p className="text-sm text-warning-700 mb-4">Jawab pertanyaan-pertanyaan untuk menguatkan pemahaman Anda tentang pengendalian emosi.</p>
                <button onClick={() => window.open('#', '_blank')} className="inline-flex items-center gap-2 bg-warning-500 text-white px-6 py-3 rounded-md hover:bg-warning-600 font-medium transition-colors duration-200 focus-ring">
                  Mulai Kuis
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
              <p className="text-neutral-600">Mari kita refleksikan apa yang telah kita pelajari hari ini tentang pengendalian emosi.</p>
              <form onSubmit={handleReflectionSubmit}>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Apa satu hal baru yang kamu pelajari hari ini? *</label>
                <textarea value={reflectionAnswer} onChange={(e) => setReflectionAnswer(e.target.value)} className="textarea-base" rows={4} placeholder="Tuliskan satu hal baru yang Anda pelajari tentang pengendalian emosi..." />
                <button type="submit" className="mt-3 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Bagikan Refleksi
                </button>
              </form>

              {reflectionResponses.length > 0 && (
                <div className="space-y-3">
                  {reflectionResponses.map((response, i) => (
                    <div key={i} className="bg-primary-50 border-l-4 border-primary-200 p-3 rounded-r-lg animate-fade-in">
                      <div className="flex items-start gap-2">
                        <Shield size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-primary-800">{response}</p>
                      </div>
                    </div>
                  ))}
                  <button onClick={handleNextActivity} className="w-full bg-success-600 text-white py-2 px-4 rounded-md hover:bg-success-700 font-medium transition-colors duration-200 focus-ring">
                    Selesai - Lanjut ke Sesi 4
                  </button>
                </div>
              )}
            </div>
          </ActivityCard>
        )}

        {allActivitiesCompleted && (
          <div className="bg-success-50 border border-success-500 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-success-600" />
            </div>
            <h3 className="text-2xl font-bold text-success-700 mb-2">Selamat!</h3>
            <p className="text-success-700 mb-6">Anda telah menyelesaikan semua kegiatan di Sesi 3. Sekarang Anda siap untuk melanjutkan ke Sesi 4.</p>
            <Link href="/sesi/coping-cerdas" className="inline-flex items-center gap-2 bg-success-600 text-white px-6 py-3 rounded-lg hover:bg-success-700 font-medium transition-colors duration-200 focus-ring">
              Lanjut ke Sesi 4
              <CheckCircle2 size={18} />
            </Link>
          </div>
        )}
      </div>
    </SessionLayout>
  );
}
