export interface LearningVideo {
  id: string;
  title: string;
  source: string;
}

export const learningVideos = {
  bullying: { id: '86_uuX77hsc', title: 'Berteman dan Bahaya Perundungan (Bullying)', source: 'UNICEF Indonesia' },
  lifeSkills: { id: 'oTdIbStYf6o', title: 'Life Skills — Remaja', source: 'Kementerian Kesehatan & WHO Indonesia' },
  speakUp: { id: 'aBx3Ok0gVoU', title: 'Mari Buat Perubahan dan Hentikan Perundungan', source: 'UNICEF Indonesia' },
  story: { id: 'rRFKxtMd--E', title: 'Riri Cerita Anak Interaktif: Perundungan', source: 'Cerdas Berkarakter Kemendikdasmen RI' },
  cyberbullying: { id: 'Xc0zAM8ehCM', title: 'Perundungan Dunia Maya (Cyberbullying)', source: 'Cerdas Berkarakter Kemendikdasmen RI' },
} satisfies Record<string, LearningVideo>;
