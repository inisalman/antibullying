'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, BookOpen, Gamepad2 } from 'lucide-react';
import SessionLayout from '@/components/SessionLayout';
import ActivityCard from '@/components/ActivityCard';
import ProgressBar from '@/components/ProgressBar';
import { sessions } from '@/lib/sessions';
import { learningVideos } from '@/lib/learningVideos';

const session = sessions[3];
const prevSession = sessions[2];
const nextSession = sessions[4];

const activities = [
  { id: 'pemahaman-emosi', title: 'Pemahaman Emosi', type: 'reflection' as const, description: 'Mengidentifikasi dan memahami berbagai emosi yang dirasakan', duration: '10 menit' },
  { id: 'latihan-relaksasi', title: 'Kecakapan Hidup & Latihan Menenangkan Diri', type: 'video' as const, description: 'Video kecakapan hidup remaja dan latihan pendamping untuk menenangkan diri', videos: [learningVideos.lifeSkills], duration: '10 menit' },
  { id: 'jurnal-emosi-digital', title: 'Jurnal Emosi Digital', type: 'reflection' as const, description: 'Mencatat dan merefleksikan emosi melalui jurnal digital', duration: '15 menit' },
  { id: 'diskusi-coping', title: 'Diskusi Coping', type: 'form' as const, description: 'Membedakan strategi coping yang sehat dan tidak sehat', duration: '15 menit' },
  { id: 'game-interaktif', title: 'Game Interaktif', type: 'quiz' as const, description: 'Game interaktif untuk menguatkan pemahaman coping', url: '#', duration: '10 menit' },
];

export default function Session4Page() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [emotionForm, setEmotionForm] = useState({ emosi1: '', emosi2: '', emosi3: '' });
  const [emotionSubmitted, setEmotionSubmitted] = useState(false);
  const [journalAnswer, setJournalAnswer] = useState('');
  const [journalResponses, setJournalResponses] = useState<string[]>([]);
  const [copingForm, setCopingForm] = useState({ copingSehat: '', copingTidakSehat: '' });
  const [copingResponses, setCopingResponses] = useState<typeof copingForm[]>([]);
  const [allActivitiesCompleted, setAllActivitiesCompleted] = useState(false);

  const submitAnswer = async (activityName: string, answer: string) => {
    try {
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      const result = await submitSessionAnswer({ sessionName: 'Sesi 5: Coping Cerdas', activityName, answer });
      if (!result.success) alert('Gagal menyimpan jawaban: ' + result.error);
      return result.success;
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
      return false;
    }
  };

  const handleEmotionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emotionForm.emosi1.trim() || !emotionForm.emosi2.trim() || !emotionForm.emosi3.trim()) return alert('Semua field emosi harus diisi!');
    if (await submitAnswer('Teknik Relaksasi', JSON.stringify(emotionForm))) setEmotionSubmitted(true);
  };

  const handleJournalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalAnswer.trim()) return alert('Jawaban tidak boleh kosong!');
    if (await submitAnswer('Mengelola Emosi', journalAnswer)) {
      setJournalResponses((prev) => [...prev, journalAnswer]);
      setJournalAnswer('');
    }
  };

  const handleCopingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!copingForm.copingSehat.trim() || !copingForm.copingTidakSehat.trim()) return alert('Semua field coping harus diisi!');
    if (await submitAnswer('Positive Self-Talk', JSON.stringify(copingForm))) {
      setCopingResponses((prev) => [...prev, copingForm]);
      setCopingForm({ copingSehat: '', copingTidakSehat: '' });
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
              <p className="text-neutral-600">Mari kita mulai dengan mengidentifikasi 3 emosi yang sering Anda rasakan.</p>
              <form onSubmit={handleEmotionSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Emosi 1 *</label>
                  <input type="text" value={emotionForm.emosi1} onChange={(e) => setEmotionForm((prev) => ({ ...prev, emosi1: e.target.value }))} className="input-base" placeholder="Contoh: senang, sedih, marah" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Emosi 2 *</label>
                  <input type="text" value={emotionForm.emosi2} onChange={(e) => setEmotionForm((prev) => ({ ...prev, emosi2: e.target.value }))} className="input-base" placeholder="Contoh: cemas, tenang, frustasi" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Emosi 3 *</label>
                  <input type="text" value={emotionForm.emosi3} onChange={(e) => setEmotionForm((prev) => ({ ...prev, emosi3: e.target.value }))} className="input-base" placeholder="Contoh: bangga, malu, khawatir" />
                </div>
                <button type="submit" className="bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Tampilkan Emosi
                </button>
              </form>

              {emotionSubmitted && (
                <div className="p-4 bg-primary-50 border border-primary-100 rounded-lg animate-fade-in">
                  <h4 className="font-medium text-primary-800 mb-2">Emosi yang Anda Identifikasi:</h4>
                  <ul className="text-sm text-primary-800 space-y-1">
                    <li>{emotionForm.emosi1}</li>
                    <li>{emotionForm.emosi2}</li>
                    <li>{emotionForm.emosi3}</li>
                  </ul>
                  <button onClick={handleNextActivity} className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
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
              <p className="text-neutral-600">Setelah menonton video, luangkan waktu untuk latihan menenangkan diri berikut. Latihan ini merupakan kegiatan pendamping yang terpisah dari video.</p>
              <div className="bg-accent-50 border border-accent-100 rounded-lg p-4">
                <h5 className="font-medium text-accent-600 mb-2">Instruksi Pernapasan 4-7-8:</h5>
                <div className="text-sm text-accent-600 space-y-2">
                  <p>
                    <strong>1. Tarik napas</strong> melalui hidung selama 4 hitungan
                  </p>
                  <p>
                    <strong>2. Tahan napas</strong> selama 7 hitungan
                  </p>
                  <p>
                    <strong>3. Hembuskan napas</strong> melalui mulut selama 8 hitungan
                  </p>
                  <p>
                    <strong>4. Ulangi</strong> 3-4 kali
                  </p>
                </div>
              </div>
              <button onClick={handleNextActivity} className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                Lanjut ke Kegiatan Selanjutnya
              </button>
            </div>
          </ActivityCard>
        )}

        {currentActivity === 2 && (
          <ActivityCard activity={activities[2]} index={2}>
            <div className="space-y-4">
              <p className="text-neutral-600">Mari kita catat perasaan Anda hari ini melalui jurnal emosi digital.</p>
              <form onSubmit={handleJournalSubmit}>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Hari ini saya merasa... karena... saya ingin mengatasi ini dengan... *</label>
                <textarea value={journalAnswer} onChange={(e) => setJournalAnswer(e.target.value)} className="textarea-base" rows={4} placeholder="Tuliskan perasaan dan cara mengatasinya..." />
                <button type="submit" className="mt-3 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Simpan Jurnal
                </button>
              </form>

              {journalResponses.length > 0 && (
                <div className="space-y-3">
                  {journalResponses.map((response, i) => (
                    <div key={i} className="bg-primary-50 border-l-4 border-primary-200 p-3 rounded-r-lg animate-fade-in">
                      <div className="flex items-start gap-2">
                        <BookOpen size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
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

        {currentActivity === 3 && (
          <ActivityCard activity={activities[3]} index={3}>
            <div className="space-y-4">
              <p className="text-neutral-600">Mari kita diskusikan perbedaan antara strategi coping yang sehat dan tidak sehat.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-success-50 border border-success-500 rounded-lg p-4">
                  <h5 className="font-medium text-success-700 mb-2">Coping Sehat</h5>
                  <ul className="text-sm text-success-700 space-y-1">
                    <li>• Berbicara dengan teman</li>
                    <li>• Olahraga</li>
                    <li>• Meditasi</li>
                    <li>• Hobi kreatif</li>
                  </ul>
                </div>
                <div className="bg-error-50 border border-error-500 rounded-lg p-4">
                  <h5 className="font-medium text-error-700 mb-2">Coping Tidak Sehat</h5>
                  <ul className="text-sm text-error-700 space-y-1">
                    <li>• Menghindar dari masalah</li>
                    <li>• Merokok/alkohol</li>
                    <li>• Makan berlebihan</li>
                    <li>• Agresi verbal/fisik</li>
                  </ul>
                </div>
              </div>

              <form onSubmit={handleCopingSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Tambahkan contoh coping sehat: *</label>
                  <input type="text" value={copingForm.copingSehat} onChange={(e) => setCopingForm((prev) => ({ ...prev, copingSehat: e.target.value }))} className="input-base" placeholder="Contoh: membaca buku, mendengarkan musik" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Tambahkan contoh coping tidak sehat: *</label>
                  <input type="text" value={copingForm.copingTidakSehat} onChange={(e) => setCopingForm((prev) => ({ ...prev, copingTidakSehat: e.target.value }))} className="input-base" placeholder="Contoh: menyakiti diri sendiri, mengisolasi diri" />
                </div>
                <button type="submit" className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Tambahkan Contoh
                </button>
              </form>

              {copingResponses.length > 0 && (
                <div className="space-y-3">
                  {copingResponses.map((response, i) => (
                    <div key={i} className="bg-primary-50 border border-primary-100 rounded-lg p-3 animate-fade-in">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h6 className="font-medium text-success-700 text-sm">Coping Sehat:</h6>
                          <p className="text-sm text-success-700">{response.copingSehat}</p>
                        </div>
                        <div>
                          <h6 className="font-medium text-error-700 text-sm">Coping Tidak Sehat:</h6>
                          <p className="text-sm text-error-700">{response.copingTidakSehat}</p>
                        </div>
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

        {currentActivity === 4 && (
          <ActivityCard activity={activities[4]} index={4}>
            <div className="space-y-4">
              <p className="text-neutral-600">Mari kita mainkan game interaktif untuk menguatkan pemahaman tentang strategi coping.</p>
              <div className="bg-warning-50 border border-warning-500 rounded-lg p-6 text-center">
                <Gamepad2 size={32} className="text-warning-600 mx-auto mb-3" />
                <h4 className="font-medium text-warning-700 mb-2">Game Coping Cerdas</h4>
                <p className="text-sm text-warning-700 mb-4">Pilih strategi coping yang tepat untuk berbagai situasi dalam game ini.</p>
                <button onClick={() => window.open('#', '_blank')} className="inline-flex items-center gap-2 bg-warning-500 text-white px-6 py-3 rounded-md hover:bg-warning-600 font-medium transition-colors duration-200 focus-ring">
                  Mulai Game
                </button>
              </div>
              <button onClick={handleNextActivity} className="w-full bg-success-600 text-white py-2 px-4 rounded-md hover:bg-success-700 font-medium transition-colors duration-200 focus-ring">
                Selesai - Lanjut ke Sesi 5
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
            <p className="text-success-700 mb-6">Anda telah menyelesaikan semua kegiatan di Sesi 4. Sekarang Anda siap untuk melanjutkan ke Sesi 5.</p>
            <Link href="/sesi/berani-bicara" className="inline-flex items-center gap-2 bg-success-600 text-white px-6 py-3 rounded-lg hover:bg-success-700 font-medium transition-colors duration-200 focus-ring">
              Lanjut ke Sesi 5
              <CheckCircle2 size={18} />
            </Link>
          </div>
        )}
      </div>
    </SessionLayout>
  );
}
