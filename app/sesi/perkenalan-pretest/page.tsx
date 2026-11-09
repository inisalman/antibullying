'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, MessageSquare, BookOpen } from 'lucide-react';
import SessionLayout from '@/components/SessionLayout';
import ActivityCard from '@/components/ActivityCard';
import ProgressBar from '@/components/ProgressBar';
import { sessions } from '@/lib/sessions';

interface IceBreakerForm {
  nama: string;
  kelas: string;
  asalSekolah: string;
  kalimatPositif: string;
}

interface ExpectationForm {
  jawaban: string;
}

const session = sessions[0];
const prevSession = null;
const nextSession = sessions[1];

const activities = [
  {
    id: 'ice-breaking',
    title: 'Ice Breaking',
    type: 'icebreaker' as const,
    description: 'Perkenalan diri dengan form interaktif untuk mengenal peserta',
    duration: '10 menit',
  },
  session.activities[1],
  {
    id: 'program-schedule',
    title: 'Penjelasan Alur Program & Jadwal',
    type: 'schedule' as const,
    description: 'Timeline 8 sesi program dengan penjelasan setiap tahap pembelajaran',
    duration: '7 menit',
  },
  {
    id: 'pre-test',
    title: 'Pre-Test',
    type: 'pretest' as const,
    description: 'Kuesioner untuk mengukur pemahaman awal tentang bullying',
    url: '#',
    duration: '15 menit',
  },
  {
    id: 'expectations-sharing',
    title: 'Sharing Ekspektasi',
    type: 'reflection' as const,
    description: 'Berbagi harapan dan tujuan mengikuti program ini',
    duration: '5 menit',
  },
];

const sessionSchedule = [
  { id: 1, title: 'Perkenalan dan Pre-Test', description: 'Pengenalan program dan pengukuran awal' },
  { id: 2, title: 'Kenali Bullying', description: 'Memahami definisi dan jenis-jenis bullying' },
  { id: 3, title: 'Kendalikan Bullying', description: 'Strategi pengendalian emosi dan perilaku' },
  { id: 4, title: 'Coping Cerdas', description: 'Strategi coping yang efektif' },
  { id: 5, title: 'Berani Bicara', description: 'Keberanian melaporkan bullying' },
  { id: 6, title: 'Kawan Sejati', description: 'Membangun pertemanan yang sehat' },
  { id: 7, title: 'Refleksi dan Cerita Inspiratif', description: 'Refleksi pembelajaran' },
  { id: 8, title: 'Post-Test dan Penutup', description: 'Evaluasi akhir dan penutupan' },
];

export default function Session1Page() {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [iceBreakerForm, setIceBreakerForm] = useState<IceBreakerForm>({
    nama: '',
    kelas: '',
    asalSekolah: '',
    kalimatPositif: '',
  });
  const [iceBreakerSubmitted, setIceBreakerSubmitted] = useState(false);
  const [expectationForm, setExpectationForm] = useState<ExpectationForm>({ jawaban: '' });
  const [expectationResponses, setExpectationResponses] = useState<string[]>([]);
  const [allActivitiesCompleted, setAllActivitiesCompleted] = useState(false);
  const [activitySubmitted, setActivitySubmitted] = useState<boolean[]>(new Array(5).fill(false));

  const handleIceBreakerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!iceBreakerForm.nama || !iceBreakerForm.kelas || !iceBreakerForm.asalSekolah || !iceBreakerForm.kalimatPositif) {
      alert('Semua field harus diisi!');
      return;
    }
    try {
      const studentResponse = await fetch('/api/siswa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: iceBreakerForm.nama,
          kelas: iceBreakerForm.kelas,
          sekolah: iceBreakerForm.asalSekolah,
          email: null,
        }),
      });
      const student = await studentResponse.json();
      if (!studentResponse.ok) throw new Error(student.error || 'Failed to create student');

      const sesiResponse = await fetch('/api/sesi');
      const allSesi = await sesiResponse.json();
      const sesi = allSesi.find((s: any) => s.nama_sesi === 'Sesi 1: Perkenalan & Pre-Test');
      if (!sesi) throw new Error('Sesi 1 not found');

      const kegiatanResponse = await fetch('/api/kegiatan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ namaKegiatan: 'Ice Breaking', sesiId: sesi.id }),
      });
      const kegiatan = await kegiatanResponse.json();
      if (!kegiatanResponse.ok) throw new Error(kegiatan.error || 'Failed to get/create activity');

      const answerResponse = await fetch('/api/jawaban', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siswaId: student.id,
          kegiatanId: kegiatan.id,
          jawaban: iceBreakerForm.kalimatPositif,
        }),
      });
      const answer = await answerResponse.json();
      if (!answerResponse.ok) throw new Error(answer.error || 'Failed to save answer');

      localStorage.setItem('studentData', JSON.stringify(student));
      setIceBreakerSubmitted(true);
      setActivitySubmitted((prev) => {
        const newState = [...prev];
        newState[0] = true;
        return newState;
      });
    } catch (error) {
      console.error('Error:', error);
      alert(`Terjadi kesalahan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const handleExpectationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expectationForm.jawaban.trim()) {
      alert('Jawaban tidak boleh kosong!');
      return;
    }
    try {
      const studentData = localStorage.getItem('studentData');
      if (!studentData) {
        alert('Data siswa tidak ditemukan. Silakan isi form perkenalan terlebih dahulu.');
        return;
      }
      const student = JSON.parse(studentData);

      const sesiResponse = await fetch('/api/sesi');
      const allSesi = await sesiResponse.json();
      const sesi = allSesi.find((s: any) => s.nama_sesi === 'Sesi 1: Perkenalan & Pre-Test');
      if (!sesi) throw new Error('Sesi 1 not found');

      const kegiatanResponse = await fetch('/api/kegiatan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ namaKegiatan: 'Sharing Ekspektasi', sesiId: sesi.id }),
      });
      const kegiatan = await kegiatanResponse.json();
      if (!kegiatanResponse.ok) throw new Error(kegiatan.error || 'Failed to get/create activity');

      const answerResponse = await fetch('/api/jawaban', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          siswaId: student.id,
          kegiatanId: kegiatan.id,
          jawaban: expectationForm.jawaban,
        }),
      });
      const answer = await answerResponse.json();
      if (!answerResponse.ok) throw new Error(answer.error || 'Failed to save expectation');

      setExpectationResponses((prev) => [...prev, expectationForm.jawaban]);
      setExpectationForm({ jawaban: '' });
      setActivitySubmitted((prev) => {
        const newState = [...prev];
        newState[4] = true;
        return newState;
      });
    } catch (error) {
      console.error('Error:', error);
      alert(`Terjadi kesalahan: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const markActivityAsSubmitted = (idx: number) => {
    setActivitySubmitted((prev) => {
      const newState = [...prev];
      newState[idx] = true;
      return newState;
    });
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

        <ProgressBar
          current={currentActivity}
          total={activities.length}
          onPrev={handlePrevActivity}
          onNext={handleNextActivity}
          canGoNext={activitySubmitted[currentActivity]}
          canGoPrev={currentActivity > 0}
        />
      </div>

      <div className="space-y-6">
        {currentActivity === 0 && (
          <ActivityCard activity={activities[0]} index={0}>
            <form onSubmit={handleIceBreakerSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Nama Lengkap *</label>
                  <input
                    type="text"
                    value={iceBreakerForm.nama}
                    onChange={(e) => setIceBreakerForm((prev) => ({ ...prev, nama: e.target.value }))}
                    className="input-base"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">Kelas *</label>
                  <input
                    type="text"
                    value={iceBreakerForm.kelas}
                    onChange={(e) => setIceBreakerForm((prev) => ({ ...prev, kelas: e.target.value }))}
                    className="input-base"
                    placeholder="Contoh: 7A"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Asal Sekolah *</label>
                <input
                  type="text"
                  value={iceBreakerForm.asalSekolah}
                  onChange={(e) => setIceBreakerForm((prev) => ({ ...prev, asalSekolah: e.target.value }))}
                  className="input-base"
                  placeholder="Nama sekolah"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Kalimat Positif tentang Diri *</label>
                <textarea
                  value={iceBreakerForm.kalimatPositif}
                  onChange={(e) => setIceBreakerForm((prev) => ({ ...prev, kalimatPositif: e.target.value }))}
                  className="textarea-base"
                  rows={3}
                  placeholder="Tuliskan satu kalimat positif tentang diri Anda..."
                />
              </div>
              <button type="submit" className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                Submit Perkenalan
              </button>
            </form>

            {iceBreakerSubmitted && (
              <div className="mt-4 p-4 bg-success-50 border border-success-500 rounded-lg animate-fade-in">
                <h4 className="font-medium text-success-600 mb-2">Ringkasan Perkenalan:</h4>
                <div className="text-sm text-success-700 space-y-1">
                  <p>
                    <strong>Nama:</strong> {iceBreakerForm.nama}
                  </p>
                  <p>
                    <strong>Kelas:</strong> {iceBreakerForm.kelas}
                  </p>
                  <p>
                    <strong>Asal Sekolah:</strong> {iceBreakerForm.asalSekolah}
                  </p>
                  <p>
                    <strong>Kalimat Positif:</strong> "{iceBreakerForm.kalimatPositif}"
                  </p>
                </div>
                <button
                  onClick={handleNextActivity}
                  className="w-full mt-4 bg-success-600 text-white py-2 px-4 rounded-md hover:bg-success-700 font-medium transition-colors duration-200 focus-ring"
                >
                  Lanjut ke Kegiatan Selanjutnya
                </button>
              </div>
            )}
          </ActivityCard>
        )}

        {currentActivity === 1 && (
          <ActivityCard activity={activities[1]} index={1}>
            <div className="space-y-4">
              <button
                onClick={() => {
                  markActivityAsSubmitted(1);
                  handleNextActivity();
                }}
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring"
              >
                Saya Sudah Membaca — Lanjut
              </button>
            </div>
          </ActivityCard>
        )}

        {currentActivity === 2 && (
          <ActivityCard activity={activities[2]} index={2}>
            <div className="space-y-4">
              <p className="text-neutral-600">Berikut adalah timeline lengkap program pembelajaran yang akan kita jalani selama 8 sesi:</p>
              <div className="space-y-3">
                {sessionSchedule.map((s) => (
                  <div key={s.id} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-primary-600 text-xs font-medium">{s.id}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-neutral-900">{s.title}</h4>
                      <p className="text-sm text-neutral-600">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  markActivityAsSubmitted(2);
                  handleNextActivity();
                }}
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring"
              >
                Saya Sudah Melihat Jadwal
              </button>
            </div>
          </ActivityCard>
        )}

        {currentActivity === 3 && (
          <ActivityCard activity={activities[3]} index={3}>
            <div className="space-y-4">
              <p className="text-neutral-600">Sebelum memulai pembelajaran, mari kita ukur pemahaman awal Anda tentang bullying melalui pre-test ini.</p>
              <div className="bg-warning-50 border border-warning-500 rounded-lg p-4">
                <h4 className="font-medium text-warning-700 mb-2">Pre-Test Pemahaman Bullying</h4>
                <p className="text-sm text-warning-700 mb-3">Kuesioner ini akan membantu kami memahami tingkat pemahaman Anda saat ini.</p>
                <button
                  onClick={() => window.open('#', '_blank')}
                  className="inline-flex items-center gap-2 bg-warning-500 text-white px-4 py-2 rounded-md hover:bg-warning-600 font-medium transition-colors duration-200 focus-ring"
                >
                  <BookOpen size={16} />
                  Mulai Pre-Test
                </button>
              </div>
              <button
                onClick={() => {
                  markActivityAsSubmitted(3);
                  handleNextActivity();
                }}
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring"
              >
                Saya Sudah Mengisi Pre-Test
              </button>
            </div>
          </ActivityCard>
        )}

        {currentActivity === 4 && (
          <ActivityCard activity={activities[4]} index={4}>
            <form onSubmit={handleExpectationSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Apa yang ingin kamu pelajari dari program ini? *</label>
                <textarea
                  value={expectationForm.jawaban}
                  onChange={(e) => setExpectationForm((prev) => ({ ...prev, jawaban: e.target.value }))}
                  className="textarea-base"
                  rows={4}
                  placeholder="Tuliskan harapan dan tujuan Anda..."
                />
              </div>
              <button type="submit" className="bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium transition-colors duration-200 focus-ring">
                Bagikan Ekspektasi
              </button>
            </form>

            {expectationResponses.length > 0 && (
              <div className="mt-4 space-y-3">
                <h4 className="font-medium text-neutral-900">Responses:</h4>
                {expectationResponses.map((response, i) => (
                  <div key={i} className="bg-primary-50 border-l-4 border-primary-200 p-3 rounded-r-lg animate-fade-in">
                    <div className="flex items-start gap-2">
                      <MessageSquare size={16} className="text-primary-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-primary-800">{response}</p>
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleNextActivity}
                  className="w-full bg-success-600 text-white py-2 px-4 rounded-md hover:bg-success-700 font-medium transition-colors duration-200 focus-ring"
                >
                  Selesai - Lanjut ke Sesi 2
                </button>
              </div>
            )}
          </ActivityCard>
        )}

        {allActivitiesCompleted && (
          <div className="bg-success-50 border border-success-500 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-success-600" />
            </div>
            <h3 className="text-2xl font-bold text-success-700 mb-2">Selamat!</h3>
            <p className="text-success-700 mb-6">Anda telah menyelesaikan semua kegiatan di Sesi 1. Sekarang Anda siap untuk melanjutkan ke Sesi 2.</p>
            <Link
              href="/sesi/kenali-bullying"
              className="inline-flex items-center gap-2 bg-success-600 text-white px-6 py-3 rounded-lg hover:bg-success-700 font-medium transition-colors duration-200 focus-ring"
            >
              Lanjut ke Sesi 2
              <CheckCircle2 size={18} />
            </Link>
          </div>
        )}
      </div>
    </SessionLayout>
  );
}
