'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Heart, Users, FileText, Upload } from 'lucide-react';
import SessionLayout from '@/components/SessionLayout';
import ActivityCard from '@/components/ActivityCard';
import ProgressBar from '@/components/ProgressBar';
import { sessions } from '@/lib/sessions';
import { learningVideos } from '@/lib/learningVideos';

const session = sessions[5];
const prevSession = sessions[4];
const nextSession = sessions[6];

const activities = [
  { id: 'ice-breaking-teman-ideal', title: 'Ice Breaking Teman Ideal', type: 'icebreaker' as const, description: 'Mengidentifikasi karakteristik teman ideal yang diinginkan', duration: '10 menit' },
  { id: 'diskusi-kelompok', title: 'Video & Diskusi Pertemanan', videos: [learningVideos.bullying], type: 'reflection' as const, description: 'Diskusi tentang pertemanan yang sehat dan tidak sehat', duration: '15 menit' },
  { id: 'proyek-mini', title: 'Proyek Mini', type: 'form' as const, description: 'Membuat poster digital bertema pertemanan yang baik', duration: '20 menit' },
  { id: 'cerita-sahabat-inspiratif', title: 'Cerita Sahabat Inspiratif', type: 'reading' as const, description: 'Membaca cerita inspiratif tentang pertemanan yang baik', duration: '10 menit' },
  { id: 'refleksi-akhir', title: 'Refleksi Akhir', type: 'reflection' as const, description: 'Refleksi tentang cara menjadi teman yang baik', duration: '5 menit' },
];

export default function Session6Page() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [idealFriendAnswer, setIdealFriendAnswer] = useState('');
  const [idealFriendResponses, setIdealFriendResponses] = useState<string[]>([]);
  const [groupDiscussionAnswer, setGroupDiscussionAnswer] = useState('');
  const [groupDiscussionResponses, setGroupDiscussionResponses] = useState<string[]>([]);
  const [projectLink, setProjectLink] = useState('');
  const [projectSubmitted, setProjectSubmitted] = useState(false);
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [reflectionResponses, setReflectionResponses] = useState<string[]>([]);
  const [storyVisible, setStoryVisible] = useState(false);
  const [allActivitiesCompleted, setAllActivitiesCompleted] = useState(false);

  const submitAnswer = async (activityName: string, answer: string) => {
    try {
      const { submitSessionAnswer } = await import('@/lib/sessionUtils');
      const result = await submitSessionAnswer({ sessionName: 'Sesi 4: Kawan Sejati', activityName, answer });
      if (!result.success) alert('Gagal menyimpan jawaban: ' + result.error);
      return result.success;
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat menyimpan jawaban');
      return false;
    }
  };

  const handleIdealFriendSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idealFriendAnswer.trim()) return alert('Jawaban tidak boleh kosong!');
    if (await submitAnswer('Ciri-ciri Teman Sejati', idealFriendAnswer)) {
      setIdealFriendResponses((prev) => [...prev, idealFriendAnswer]);
      setIdealFriendAnswer('');
    }
  };

  const handleGroupDiscussionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupDiscussionAnswer.trim()) return alert('Jawaban tidak boleh kosong!');
    if (await submitAnswer('Membangun Persahabatan', groupDiscussionAnswer)) {
      setGroupDiscussionResponses((prev) => [...prev, groupDiscussionAnswer]);
      setGroupDiscussionAnswer('');
    }
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectLink.trim()) return alert('Link tidak boleh kosong!');
    setProjectSubmitted(true);
  };

  const handleReflectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionAnswer.trim()) return alert('Jawaban tidak boleh kosong!');
    if (await submitAnswer('Mendukung Teman', reflectionAnswer)) {
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
              <p className="text-neutral-600">Mari kita mulai dengan mengidentifikasi karakteristik teman ideal yang Anda inginkan.</p>
              <form onSubmit={handleIdealFriendSubmit}>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Karakter teman ideal menurutmu... *</label>
                <textarea value={idealFriendAnswer} onChange={(e) => setIdealFriendAnswer(e.target.value)} className="textarea-base" rows={4} placeholder="Tuliskan karakteristik teman ideal yang Anda inginkan..." />
                <button type="submit" className="mt-3 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Bagikan Jawaban
                </button>
              </form>

              {idealFriendResponses.length > 0 && (
                <div className="space-y-3">
                  {idealFriendResponses.map((response, i) => (
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
              <p className="text-neutral-600">Mari kita diskusikan tentang pertemanan yang sehat dan tidak sehat.</p>
              <form onSubmit={handleGroupDiscussionSubmit}>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Bagaimana jadi teman yang suportif? Apa ciri pertemanan toxic? *</label>
                <textarea value={groupDiscussionAnswer} onChange={(e) => setGroupDiscussionAnswer(e.target.value)} className="textarea-base" rows={4} placeholder="Jelaskan cara menjadi teman yang suportif dan ciri-ciri pertemanan yang toxic..." />
                <button type="submit" className="mt-3 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Bagikan Jawaban
                </button>
              </form>

              {groupDiscussionResponses.length > 0 && (
                <div className="space-y-3">
                  {groupDiscussionResponses.map((response, i) => (
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

        {currentActivity === 2 && (
          <ActivityCard activity={activities[2]} index={2}>
            <div className="space-y-4">
              <p className="text-neutral-600">Mari kita buat poster digital bertema "Aku Teman Baikmu" untuk mengkampanyekan pertemanan yang sehat.</p>
              <div className="bg-primary-50 border border-primary-100 rounded-lg p-4">
                <h5 className="font-medium text-primary-800 mb-2">Instruksi Proyek:</h5>
                <div className="text-sm text-primary-800 space-y-2">
                  <p>
                    <strong>1. Tema:</strong> "Aku Teman Baikmu"
                  </p>
                  <p>
                    <strong>2. Format:</strong> Poster digital (PNG/JPG)
                  </p>
                  <p>
                    <strong>3. Konten:</strong> Pesan positif tentang pertemanan yang sehat
                  </p>
                  <p>
                    <strong>4. Ukuran:</strong> Minimal 1080x1080 pixels
                  </p>
                </div>
              </div>

              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Link ke poster digital Anda: *</label>
                  <input type="url" value={projectLink} onChange={(e) => setProjectLink(e.target.value)} className="input-base" placeholder="https://drive.google.com/... atau link lainnya" />
                </div>
                <div className="flex items-center gap-4">
                  <button type="submit" className="bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                    Submit Poster
                  </button>
                  <button type="button" onClick={() => window.open('#', '_blank')} className="inline-flex items-center gap-2 bg-neutral-100 text-neutral-700 py-2 px-4 rounded-md hover:bg-neutral-200 font-medium transition-colors duration-200 focus-ring">
                    <Upload size={16} />
                    Upload File
                  </button>
                </div>
              </form>

              {projectSubmitted && (
                <div className="p-4 bg-primary-50 border border-primary-100 rounded-lg animate-fade-in">
                  <h4 className="font-medium text-primary-800 mb-2">Poster Anda:</h4>
                  <p className="text-sm text-primary-800 bg-white p-3 rounded border border-primary-100">
                    <strong>Link:</strong> {projectLink}
                  </p>
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
              <p className="text-neutral-600">Mari kita baca cerita inspiratif tentang pertemanan yang baik dan bagaimana sahabat saling mendukung.</p>
              <button onClick={() => setStoryVisible(!storyVisible)} className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                {storyVisible ? 'Sembunyikan Cerita' : 'Baca Cerita'}
              </button>

              {storyVisible && (
                <div className="p-4 bg-primary-50 border border-primary-100 rounded-lg animate-fade-in">
                  <h5 className="font-medium text-primary-800 mb-3">Cerita: "Sahabat Sejati"</h5>
                  <div className="text-sm text-primary-800 space-y-3">
                    <p>"Di sebuah sekolah, ada dua sahabat bernama Maya dan Sari. Mereka sudah berteman sejak kelas 1 SD. Suatu hari, Maya mengalami kesulitan dalam pelajaran matematika dan merasa sangat frustasi."</p>
                    <p>"Sari melihat Maya yang sedih dan langsung mendekatinya. 'Maya, aku tahu matematika itu sulit, tapi kita bisa belajar bersama. Aku akan membantumu sampai kamu paham,' kata Sari dengan penuh semangat."</p>
                    <p>"Setiap hari setelah sekolah, Sari mengajari Maya matematika dengan sabar. Mereka belajar bersama, tertawa bersama, dan saling mendukung. Maya pun akhirnya berhasil memahami matematika dan nilai-nilainya membaik."</p>
                    <p>"Cerita ini menunjukkan bahwa sahabat sejati adalah mereka yang selalu ada di saat kita membutuhkan, yang mendukung kita tanpa pamrih, dan yang percaya pada kemampuan kita meskipun kita sendiri meragukannya."</p>
                  </div>
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
              <p className="text-neutral-600">Mari kita refleksikan tentang cara menjadi teman yang baik dan supportif.</p>
              <form onSubmit={handleReflectionSubmit}>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Apa satu hal yang akan kamu lakukan agar jadi teman yang baik? *</label>
                <textarea value={reflectionAnswer} onChange={(e) => setReflectionAnswer(e.target.value)} className="textarea-base" rows={4} placeholder="Tuliskan satu hal yang akan Anda lakukan untuk menjadi teman yang baik..." />
                <button type="submit" className="mt-3 bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                  Bagikan Refleksi
                </button>
              </form>

              {reflectionResponses.length > 0 && (
                <div className="space-y-3">
                  {reflectionResponses.map((response, i) => (
                    <div key={i} className="bg-primary-50 border-l-4 border-primary-200 p-3 rounded-r-lg animate-fade-in">
                      <div className="flex items-start gap-2">
                        <FileText size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-primary-800">{response}</p>
                      </div>
                    </div>
                  ))}
                  <button onClick={handleNextActivity} className="w-full bg-success-600 text-white py-2 px-4 rounded-md hover:bg-success-700 font-medium transition-colors duration-200 focus-ring">
                    Selesai - Lanjut ke Sesi 7
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
            <p className="text-success-700 mb-6">Anda telah menyelesaikan semua kegiatan di Sesi 6. Sekarang Anda siap untuk melanjutkan ke Sesi 7.</p>
            <Link href="/sesi/refleksi-cerita-inspiratif" className="inline-flex items-center gap-2 bg-success-600 text-white px-6 py-3 rounded-lg hover:bg-success-700 font-medium transition-colors duration-200 focus-ring">
              Lanjut ke Sesi 7
              <CheckCircle2 size={18} />
            </Link>
          </div>
        )}
      </div>
    </SessionLayout>
  );
}
