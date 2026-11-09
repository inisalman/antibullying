'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, MessageSquare, Target, BookOpen } from 'lucide-react';
import SessionLayout from '@/components/SessionLayout';
import ActivityCard from '@/components/ActivityCard';
import ProgressBar from '@/components/ProgressBar';
import { sessions } from '@/lib/sessions';
import { learningVideos } from '@/lib/learningVideos';

const session = sessions[1];
const prevSession = sessions[0];
const nextSession = sessions[2];

const activities = [
  {
    id: 'video-edukasi',
    title: 'Pemutaran Video Edukasi',
    type: 'video' as const,
    description: 'Video edukatif tentang pengenalan bullying dan bentuk-bentuknya',
    videos: [learningVideos.bullying, learningVideos.cyberbullying],
    duration: '10 menit',
  },
  {
    id: 'diskusi-interaktif',
    title: 'Diskusi Interaktif',
    type: 'reflection' as const,
    description: 'Diskusi tentang definisi dan bentuk-bentuk bullying',
    duration: '15 menit',
  },
  {
    id: 'mini-quiz',
    title: 'Mini Quiz',
    type: 'quiz' as const,
    description: 'Kuis singkat untuk menguji pemahaman tentang bullying',
    url: '#',
    duration: '10 menit',
  },
  {
    id: 'studi-kasus',
    title: 'Studi Kasus Singkat',
    type: 'reading' as const,
    description: 'Analisis kasus bullying untuk memahami jenis-jenisnya',
    duration: '15 menit',
  },
  {
    id: 'penutup',
    title: 'Penutup',
    type: 'reflection' as const,
    description: 'Refleksi pembelajaran dan kesimpulan',
    duration: '10 menit',
  },
];

export default function Session2Page() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [discussionAnswer, setDiscussionAnswer] = useState('');
  const [discussionResponses, setDiscussionResponses] = useState<string[]>([]);
  const [caseStudyVisible, setCaseStudyVisible] = useState(false);
  const [caseStudyAnswer, setCaseStudyAnswer] = useState('');
  const [caseStudySubmitted, setCaseStudySubmitted] = useState(false);
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [reflectionResponses, setReflectionResponses] = useState<string[]>([]);
  const [allActivitiesCompleted, setAllActivitiesCompleted] = useState(false);

  const submitAnswer = async (activityName: string, answer: string) => {
    try {
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      const result = await submitSessionAnswer({
        sessionName: 'Sesi 2: Kenali Bullying',
        activityName,
        answer,
      });
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
    if (await submitAnswer('Definisi Bullying', discussionAnswer)) {
      setDiscussionResponses((prev) => [...prev, discussionAnswer]);
      setDiscussionAnswer('');
    }
  };

  const handleCaseStudySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseStudyAnswer.trim()) return alert('Jawaban tidak boleh kosong!');
    if (await submitAnswer('Dampak Bullying', caseStudyAnswer)) setCaseStudySubmitted(true);
  };

  const handleReflectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionAnswer.trim()) return alert('Jawaban tidak boleh kosong!');
    if (await submitAnswer('Jenis-jenis Bullying', reflectionAnswer)) {
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
              <p className="text-neutral-600">Mari kita mulai dengan memahami apa itu bullying melalui video edukatif ini.</p>
              <button onClick={handleNextActivity} className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                Lanjut ke Kegiatan Selanjutnya
              </button>
            </div>
          </ActivityCard>
        )}

        {currentActivity === 1 && (
          <ActivityCard activity={activities[1]} index={1}>
            <div className="space-y-4">
              <p className="text-neutral-600">Mari kita diskusikan bersama tentang definisi dan bentuk-bentuk bullying.</p>
              <form onSubmit={handleDiscussionSubmit}>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Menurut Anda, apa itu bullying? Apa bentuk-bentuknya? *</label>
                <textarea value={discussionAnswer} onChange={(e) => setDiscussionAnswer(e.target.value)} className="textarea-base" rows={4} placeholder="Tuliskan pemahaman Anda tentang bullying..." />
                <button type="submit" className="mt-3 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Bagikan Jawaban
                </button>
              </form>

              {discussionResponses.length > 0 && (
                <div className="space-y-3">
                  {discussionResponses.map((response, i) => (
                    <div key={i} className="bg-primary-50 border-l-4 border-primary-200 p-3 rounded-r-lg animate-fade-in">
                      <div className="flex items-start gap-2">
                        <MessageSquare size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
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
              <p className="text-neutral-600">Mari kita uji pemahaman Anda tentang bullying melalui kuis singkat ini.</p>
              <div className="bg-warning-50 border border-warning-500 rounded-lg p-6 text-center">
                <Target size={32} className="text-warning-600 mx-auto mb-3" />
                <h4 className="font-medium text-warning-700 mb-2">Kuis Interaktif</h4>
                <p className="text-sm text-warning-700 mb-4">Jawab pertanyaan-pertanyaan tentang bullying untuk menguji pemahaman Anda.</p>
                <button onClick={() => window.open('#', '_blank')} className="inline-flex items-center gap-2 bg-warning-500 text-white px-6 py-3 rounded-md hover:bg-warning-600 font-medium transition-colors duration-200 focus-ring">
                  Mulai Quiz
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
              <p className="text-neutral-600">Mari kita analisis kasus bullying berikut untuk memahami jenis-jenisnya.</p>
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
                <h5 className="font-medium text-primary-800 mb-2">Kasus:</h5>
                <p className="text-sm text-primary-800">
                  "Di kelas X IPA 1, ada seorang siswa bernama Andi yang sering dipanggil dengan nama panggilan yang tidak pantas oleh beberapa temannya. Mereka sering mengejek penampilan Andi dan
                  mengucilkannya dari kegiatan kelompok. Andi terlihat sedih dan tidak mau berinteraksi dengan teman-temannya lagi."
                </p>
              </div>
              <button onClick={() => setCaseStudyVisible(!caseStudyVisible)} className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                {caseStudyVisible ? 'Sembunyikan Diskusi' : 'Diskusikan Kasus Ini'}
              </button>

              {caseStudyVisible && (
                <div className="p-4 bg-neutral-50 rounded-lg animate-fade-in">
                  <h5 className="font-medium text-neutral-900 mb-3">Jenis bullying apa yang terjadi dalam skenario ini? Jelaskan alasan Anda!</h5>
                  <form onSubmit={handleCaseStudySubmit}>
                    <textarea value={caseStudyAnswer} onChange={(e) => setCaseStudyAnswer(e.target.value)} className="textarea-base" rows={4} placeholder="Analisis jenis bullying yang terjadi..." />
                    <button type="submit" className="mt-3 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                      Submit Analisis
                    </button>
                  </form>

                  {caseStudySubmitted && (
                    <div className="mt-4 p-3 bg-primary-50 border border-primary-100 rounded-lg animate-fade-in">
                      <p className="text-sm text-primary-800">{caseStudyAnswer}</p>
                      <button onClick={handleNextActivity} className="w-full mt-4 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                        Lanjut ke Kegiatan Selanjutnya
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </ActivityCard>
        )}

        {currentActivity === 4 && (
          <ActivityCard activity={activities[4]} index={4}>
            <div className="space-y-4">
              <p className="text-neutral-600">Mari kita refleksikan apa yang telah kita pelajari hari ini.</p>
              <form onSubmit={handleReflectionSubmit}>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Apa satu hal baru yang kamu pelajari hari ini? *</label>
                <textarea value={reflectionAnswer} onChange={(e) => setReflectionAnswer(e.target.value)} className="textarea-base" rows={4} placeholder="Tuliskan satu hal baru yang Anda pelajari tentang bullying..." />
                <button type="submit" className="mt-3 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Bagikan Refleksi
                </button>
              </form>

              {reflectionResponses.length > 0 && (
                <div className="space-y-3">
                  {reflectionResponses.map((response, i) => (
                    <div key={i} className="bg-primary-50 border-l-4 border-primary-200 p-3 rounded-r-lg animate-fade-in">
                      <div className="flex items-start gap-2">
                        <BookOpen size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-primary-800">{response}</p>
                      </div>
                    </div>
                  ))}
                  <button onClick={handleNextActivity} className="w-full bg-success-600 text-white py-2 px-4 rounded-md hover:bg-success-700 font-medium transition-colors duration-200 focus-ring">
                    Selesai - Lanjut ke Sesi 3
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
            <p className="text-success-700 mb-6">Anda telah menyelesaikan semua kegiatan di Sesi 2. Sekarang Anda siap untuk melanjutkan ke Sesi 3.</p>
            <Link href="/sesi/kendalikan-bullying" className="inline-flex items-center gap-2 bg-success-600 text-white px-6 py-3 rounded-lg hover:bg-success-700 font-medium transition-colors duration-200 focus-ring">
              Lanjut ke Sesi 3
              <CheckCircle2 size={18} />
            </Link>
          </div>
        )}
      </div>
    </SessionLayout>
  );
}
