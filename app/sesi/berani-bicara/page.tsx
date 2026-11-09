'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Mic, Users, Eye } from 'lucide-react';
import SessionLayout from '@/components/SessionLayout';
import ActivityCard from '@/components/ActivityCard';
import ProgressBar from '@/components/ProgressBar';
import { sessions } from '@/lib/sessions';
import { learningVideos } from '@/lib/learningVideos';

const session = sessions[4];
const prevSession = sessions[3];
const nextSession = sessions[5];

const activities = [
  { id: 'diskusi-singkat', title: 'Diskusi Singkat', type: 'reflection' as const, description: 'Memahami perbedaan antara asertif, pasif, dan agresif', duration: '10 menit' },
  { id: 'simulasi-kalimat-aku', title: 'Simulasi Kalimat Aku', type: 'form' as const, description: 'Berlatih menyampaikan perasaan dengan kalimat yang sehat', duration: '15 menit' },
  { id: 'latihan-tanya-jawab', title: 'Latihan Tanya Jawab', type: 'reflection' as const, description: 'Simulasi menyampaikan pendapat kepada berbagai pihak', duration: '15 menit' },
  { id: 'evaluasi-video-singkat', title: 'Evaluasi Video Singkat', type: 'video' as const, description: 'Diskusi tentang peran siswa dalam menghentikan perundungan', videos: [learningVideos.speakUp], duration: '10 menit' },
  { id: 'refleksi', title: 'Refleksi', type: 'reflection' as const, description: 'Refleksi tentang keberanian menyampaikan isi hati', duration: '10 menit' },
];

export default function Session5Page() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [discussionAnswer, setDiscussionAnswer] = useState('');
  const [discussionResponses, setDiscussionResponses] = useState<string[]>([]);
  const [assertiveForm, setAssertiveForm] = useState({ sayaMerasa: '', saat: '', sayaIngin: '' });
  const [assertiveSubmitted, setAssertiveSubmitted] = useState(false);
  const [qnaAnswer, setQnaAnswer] = useState('');
  const [qnaResponses, setQnaResponses] = useState<string[]>([]);
  const [videoAnalysisAnswer, setVideoAnalysisAnswer] = useState('');
  const [videoAnalysisSubmitted, setVideoAnalysisSubmitted] = useState(false);
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [reflectionResponses, setReflectionResponses] = useState<string[]>([]);
  const [allActivitiesCompleted, setAllActivitiesCompleted] = useState(false);

  const submitAnswer = async (activityName: string, answer: string) => {
    try {
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      const result = await submitSessionAnswer({ sessionName: 'Sesi 3: Berani Bicara', activityName, answer });
      if (!result.success) alert('Gagal menyimpan jawaban: ' + result.error);
      return result.success;
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
      return false;
    }
  };

  const handleDiscussionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!discussionAnswer.trim()) return alert('Jawaban tidak boleh kosong!');
    if (await submitAnswer('Strategi Komunikasi', discussionAnswer)) {
      setDiscussionResponses((prev) => [...prev, discussionAnswer]);
      setDiscussionAnswer('');
    }
  };

  const handleAssertiveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assertiveForm.sayaMerasa.trim() || !assertiveForm.saat.trim() || !assertiveForm.sayaIngin.trim()) return alert('Semua field harus diisi!');
    if (await submitAnswer('Role Play', JSON.stringify(assertiveForm))) setAssertiveSubmitted(true);
  };

  const handleQnASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qnaAnswer.trim()) return alert('Jawaban tidak boleh kosong!');
    if (await submitAnswer('Membangun Kepercayaan Diri', qnaAnswer)) {
      setQnaResponses((prev) => [...prev, qnaAnswer]);
      setQnaAnswer('');
    }
  };

  const handleVideoAnalysisSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoAnalysisAnswer.trim()) return alert('Jawaban tidak boleh kosong!');
    setVideoAnalysisSubmitted(true);
  };

  const handleReflectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionAnswer.trim()) return alert('Jawaban tidak boleh kosong!');
    setReflectionResponses((prev) => [...prev, reflectionAnswer]);
    setReflectionAnswer('');
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
              <p className="text-neutral-600">Mari kita diskusikan perbedaan antara tiga gaya komunikasi yang berbeda.</p>
              <form onSubmit={handleDiscussionSubmit}>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Apa bedanya asertif, pasif, dan agresif? *</label>
                <textarea value={discussionAnswer} onChange={(e) => setDiscussionAnswer(e.target.value)} className="textarea-base" rows={4} placeholder="Jelaskan perbedaan ketiga gaya komunikasi tersebut..." />
                <button type="submit" className="mt-3 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Bagikan Jawaban
                </button>
              </form>

              {discussionResponses.length > 0 && (
                <div className="space-y-3">
                  {discussionResponses.map((response, i) => (
                    <div key={i} className="bg-primary-50 border-l-4 border-primary-200 p-3 rounded-r-lg animate-fade-in">
                      <div className="flex items-start gap-2">
                        <Mic size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
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
              <p className="text-neutral-600">Mari kita berlatih menyampaikan perasaan dengan kalimat yang sehat dan asertif.</p>
              <form onSubmit={handleAssertiveSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Saya merasa... *</label>
                  <input type="text" value={assertiveForm.sayaMerasa} onChange={(e) => setAssertiveForm((prev) => ({ ...prev, sayaMerasa: e.target.value }))} className="input-base" placeholder="Contoh: tidak nyaman, sedih, marah" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Saat... *</label>
                  <input type="text" value={assertiveForm.saat} onChange={(e) => setAssertiveForm((prev) => ({ ...prev, saat: e.target.value }))} className="input-base" placeholder="Contoh: Anda memanggil saya dengan nama yang tidak pantas" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Saya ingin... *</label>
                  <input type="text" value={assertiveForm.sayaIngin} onChange={(e) => setAssertiveForm((prev) => ({ ...prev, sayaIngin: e.target.value }))} className="input-base" placeholder="Contoh: Anda memanggil saya dengan nama yang benar" />
                </div>
                <button type="submit" className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Gabungkan Kalimat
                </button>
              </form>

              {assertiveSubmitted && (
                <div className="p-4 bg-primary-50 border border-primary-100 rounded-lg animate-fade-in">
                  <h4 className="font-medium text-primary-800 mb-2">Kalimat Aku Anda:</h4>
                  <div className="text-sm text-primary-800 bg-white p-3 rounded border border-primary-100">
                    <p className="font-medium">
                      "Saya merasa {assertiveForm.sayaMerasa} saat {assertiveForm.saat}. Saya ingin {assertiveForm.sayaIngin}."
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

        {currentActivity === 2 && (
          <ActivityCard activity={activities[2]} index={2}>
            <div className="space-y-4">
              <p className="text-neutral-600">Mari kita berlatih menyampaikan pendapat kepada berbagai pihak dengan cara yang tepat.</p>
              <form onSubmit={handleQnASubmit}>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Simulasikan cara menyampaikan pendapat kepada guru, orang tua, atau teman: *</label>
                <textarea value={qnaAnswer} onChange={(e) => setQnaAnswer(e.target.value)} className="textarea-base" rows={4} placeholder="Tuliskan cara Anda menyampaikan pendapat..." />
                <button type="submit" className="mt-3 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Simpan Jawaban
                </button>
              </form>

              {qnaResponses.length > 0 && (
                <div className="space-y-3">
                  {qnaResponses.map((response, i) => (
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
          </ActivityCard>
        )}

        {currentActivity === 3 && (
          <ActivityCard activity={activities[3]} index={3}>
            <div className="space-y-4">
              <p className="text-neutral-600">Tonton pesan UNICEF tentang menghentikan perundungan, lalu pikirkan peran yang bisa kamu ambil dengan aman.</p>
              <form onSubmit={handleVideoAnalysisSubmit}>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Setelah menonton, tindakan aman apa yang bisa kamu lakukan saat menyaksikan bullying, dan siapa yang bisa kamu mintai bantuan? *</label>
                <textarea value={videoAnalysisAnswer} onChange={(e) => setVideoAnalysisAnswer(e.target.value)} className="textarea-base" rows={4} placeholder="Tuliskan analisis Anda..." />
                <button type="submit" className="mt-3 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Submit Analisis
                </button>
              </form>

              {videoAnalysisSubmitted && (
                <div className="p-4 bg-primary-50 border border-primary-100 rounded-lg animate-fade-in">
                  <h4 className="font-medium text-primary-800 mb-2">Analisis Anda:</h4>
                  <p className="text-sm text-primary-800 bg-white p-3 rounded border border-primary-100">{videoAnalysisAnswer}</p>
                  <button onClick={handleNextActivity} className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
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
              <p className="text-neutral-600">Mari kita refleksikan tentang cara menjadi lebih berani dalam menyampaikan isi hati.</p>
              <form onSubmit={handleReflectionSubmit}>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Bagaimana kamu bisa lebih berani menyampaikan isi hati? *</label>
                <textarea value={reflectionAnswer} onChange={(e) => setReflectionAnswer(e.target.value)} className="textarea-base" rows={4} placeholder="Tuliskan cara Anda bisa lebih berani..." />
                <button type="submit" className="mt-3 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Bagikan Refleksi
                </button>
              </form>

              {reflectionResponses.length > 0 && (
                <div className="space-y-3">
                  {reflectionResponses.map((response, i) => (
                    <div key={i} className="bg-primary-50 border-l-4 border-primary-200 p-3 rounded-r-lg animate-fade-in">
                      <div className="flex items-start gap-2">
                        <Eye size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-primary-800">{response}</p>
                      </div>
                    </div>
                  ))}
                  <button onClick={handleNextActivity} className="w-full bg-success-600 text-white py-2 px-4 rounded-md hover:bg-success-700 font-medium transition-colors duration-200 focus-ring">
                    Selesai - Lanjut ke Sesi 6
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
            <p className="text-success-700 mb-6">Anda telah menyelesaikan semua kegiatan di Sesi 5. Sekarang Anda siap untuk melanjutkan ke Sesi 6.</p>
            <Link href="/sesi/kawan-sejati" className="inline-flex items-center gap-2 bg-success-600 text-white px-6 py-3 rounded-lg hover:bg-success-700 font-medium transition-colors duration-200 focus-ring">
              Lanjut ke Sesi 6
              <CheckCircle2 size={18} />
            </Link>
          </div>
        )}
      </div>
    </SessionLayout>
  );
}
