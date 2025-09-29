'use client';

import { useState } from 'react';
import { Play, Users, Calendar, FileText, MessageSquare, ExternalLink, CircleCheck as CheckCircle } from 'lucide-react';

interface InteractiveActivityCardProps {
  title: string;
  description: string;
  type: 'icebreaker' | 'video' | 'timeline' | 'pretest' | 'sharing';
  children?: React.ReactNode;
}

const activityIcons = {
  icebreaker: Users,
  video: Play,
  timeline: Calendar,
  pretest: FileText,
  sharing: MessageSquare,
};

const activityColors = {
  icebreaker: 'bg-blue-100 text-blue-600 border-blue-200',
  video: 'bg-red-100 text-red-600 border-red-200',
  timeline: 'bg-green-100 text-green-600 border-green-200',
  pretest: 'bg-purple-100 text-purple-600 border-purple-200',
  sharing: 'bg-orange-100 text-orange-600 border-orange-200',
};

export default function InteractiveActivityCard({ title, description, type, children }: InteractiveActivityCardProps) {
  const Icon = activityIcons[type];
  const colorClass = activityColors[type];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-4 mb-4">
        <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center flex-shrink-0 ${colorClass}`}>
          <Icon size={20} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

// Ice Breaker Form Component
export function IceBreakerForm() {
  const [formData, setFormData] = useState({
    nama: '',
    kelas: '',
    asalSekolah: '',
    kalimatPositif: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h4 className="font-medium text-gray-900 mb-2">Terima kasih!</h4>
        <p className="text-gray-600 text-sm">Perkenalan Anda telah tersimpan.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">
          Nama Lengkap
        </label>
        <input
          type="text"
          id="nama"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Masukkan nama lengkap Anda"
          required
        />
      </div>
      
      <div>
        <label htmlFor="kelas" className="block text-sm font-medium text-gray-700 mb-1">
          Kelas
        </label>
        <input
          type="text"
          id="kelas"
          name="kelas"
          value={formData.kelas}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Contoh: 7A, 8B, 9C"
          required
        />
      </div>
      
      <div>
        <label htmlFor="asalSekolah" className="block text-sm font-medium text-gray-700 mb-1">
          Asal Sekolah
        </label>
        <input
          type="text"
          id="asalSekolah"
          name="asalSekolah"
          value={formData.asalSekolah}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Nama sekolah Anda"
          required
        />
      </div>
      
      <div>
        <label htmlFor="kalimatPositif" className="block text-sm font-medium text-gray-700 mb-1">
          Kalimat Positif untuk Hari Ini
        </label>
        <textarea
          id="kalimatPositif"
          name="kalimatPositif"
          value={formData.kalimatPositif}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Bagikan satu kalimat positif atau motivasi untuk memulai program ini..."
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
      >
        Kirim Perkenalan
      </button>
    </form>
  );
}

// Program Timeline Component
export function ProgramTimeline() {
  const sessions = [
    { id: 1, title: "Perkenalan & Pre-Test", status: "current" },
    { id: 2, title: "Kenali Bullying", status: "upcoming" },
    { id: 3, title: "Kendalikan Bullying", status: "upcoming" },
    { id: 4, title: "Coping Cerdas", status: "upcoming" },
    { id: 5, title: "Berani Bicara", status: "upcoming" },
    { id: 6, title: "Kawan Sejati", status: "upcoming" },
    { id: 7, title: "Refleksi & Cerita Inspiratif", status: "upcoming" },
    { id: 8, title: "Post-Test & Penutup", status: "upcoming" },
  ];

  return (
    <div className="space-y-4">
      {sessions.map((session, index) => (
        <div key={session.id} className="flex items-center space-x-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
            session.status === 'current' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-600'
          }`}>
            {session.id}
          </div>
          <div className="flex-1">
            <h4 className={`font-medium ${
              session.status === 'current' ? 'text-blue-600' : 'text-gray-900'
            }`}>
              Sesi {session.id}: {session.title}
            </h4>
            {session.status === 'current' && (
              <p className="text-sm text-blue-500">Sesi saat ini</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Sharing Expectations Form
export function SharingForm() {
  const [expectation, setExpectation] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h4 className="font-medium text-gray-900 mb-2">Ekspektasi Anda telah tersimpan!</h4>
        <p className="text-gray-600 text-sm">Terima kasih telah berbagi harapan Anda.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="expectation" className="block text-sm font-medium text-gray-700 mb-2">
          Apa yang ingin kamu pelajari dari program ini?
        </label>
        <textarea
          id="expectation"
          value={expectation}
          onChange={(e) => setExpectation(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ceritakan harapan dan ekspektasi Anda mengikuti program pencegahan bullying ini..."
          required
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
      >
        Bagikan Ekspektasi
      </button>
    </form>
  );
}