import { learningVideos, type LearningVideo } from './learningVideos';

export interface Activity {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'form' | 'reflection' | 'reading' | 'icebreaker' | 'schedule' | 'pretest';
  description: string;
  url?: string;
  duration?: string;
  content?: string[];
  videos?: LearningVideo[];
}

export interface Session {
  id: number;
  title: string;
  slug: string;
  description: string;
  objectives: string[];
  activities: Activity[];
  duration: string;
}

export const sessions: Session[] = [
  {
    id: 1,
    title: "Perkenalan dan Pre-Test",
    slug: "perkenalan-pretest",
    description: "Sesi pembuka program dengan perkenalan peserta dan pengukuran pemahaman awal tentang bullying.",
    objectives: [
      "Memahami tujuan dan manfaat program pencegahan bullying",
      "Mengukur tingkat pemahaman awal tentang bullying",
      "Membangun komitmen untuk mengikuti program hingga selesai"
    ],
    duration: "45 menit",
    activities: [
      {
        id: "ice-breaking",
        title: "Ice Breaking",
        type: "icebreaker",
        description: "Perkenalan diri dengan form interaktif untuk mengenal peserta",
        duration: "10 menit"
      },
      {
        id: "facilitator-intro",
        title: "Perkenalan Fasilitator & Tujuan Program",
        type: "reading",
        description: "Pengenalan fasilitator dan penjelasan tujuan program pencegahan bullying",
        content: [
          "Selamat datang! Di program ini, kamu akan belajar mengenali bullying, memahami perasaanmu, dan membangun pertemanan yang saling menjaga.",
          "Fasilitator adalah pendamping belajarmu selama program. Perannya membantu menjelaskan materi, memandu diskusi, dan mendukungmu saat ada hal yang belum kamu pahami. Kamu bisa menanyakan kepada guru atau penyelenggara siapa fasilitator yang mendampingi kelasmu.",
          "Selama 8 sesi, kamu akan mengikuti bacaan, video, kuis, latihan, dan refleksi. Ikuti kegiatannya secara berurutan dan luangkan waktu untuk memahami setiap materi.",
          "Kita belajar dengan saling menghargai: dengarkan teman, hindari ejekan, dan jangan menyebarkan cerita pribadi orang lain. Kamu tidak perlu menceritakan pengalaman pribadi yang membuatmu tidak nyaman.",
          "Kalau kamu mengalami atau menyaksikan bullying, ceritakan kepada guru BK, wali kelas, orang tua, atau orang dewasa yang kamu percaya. Kamu tidak harus menghadapinya sendirian."
        ],
        duration: "8 menit"
      },
      {
        id: "program-schedule",
        title: "Penjelasan Alur Program & Jadwal",
        type: "schedule",
        description: "Timeline 8 sesi program dengan penjelasan setiap tahap pembelajaran",
        duration: "7 menit"
      },
      {
        id: "pre-test",
        title: "Pre-Test",
        type: "pretest",
        description: "Kuesioner untuk mengukur pemahaman awal tentang bullying",
        url: "#",
        duration: "15 menit"
      },
      {
        id: "expectations-sharing",
        title: "Sharing Ekspektasi",
        type: "reflection",
        description: "Berbagi harapan dan tujuan mengikuti program ini",
        duration: "5 menit"
      }
    ]
  },
  {
    id: 2,
    title: "Kenali Bullying",
    slug: "kenali-bullying",
    description: "Memahami definisi, jenis-jenis, dan karakteristik bullying yang terjadi di lingkungan sekolah.",
    objectives: [
      "Memahami definisi bullying dan membedakannya dengan konflik biasa",
      "Mengidentifikasi berbagai jenis bullying (fisik, verbal, sosial, cyber)",
      "Mengenali tanda-tanda korban dan pelaku bullying"
    ],
    duration: "60 menit",
    activities: [
      {
        id: "bullying-definition",
        title: "Video: Apa Itu Bullying?",
        type: "video",
        description: "Penjelasan komprehensif tentang definisi dan karakteristik bullying",
        videos: [learningVideos.bullying, learningVideos.cyberbullying],
        duration: "10 menit"
      },
      {
        id: "types-quiz",
        title: "Kuis: Jenis-jenis Bullying",
        type: "quiz",
        description: "Kuis interaktif untuk mengidentifikasi berbagai bentuk bullying",
        url: "https://kahoot.it/challenge/example",
        duration: "15 menit"
      },
      {
        id: "case-study",
        title: "Studi Kasus",
        type: "reading",
        description: "Analisis kasus-kasus bullying yang sering terjadi di sekolah",
        duration: "20 menit"
      },
      {
        id: "reflection-1",
        title: "Refleksi: Pengalaman Pribadi",
        type: "reflection",
        description: "Berbagi pengalaman tentang bullying (anonim)",
        url: "https://padlet.com/example/pengalaman",
        duration: "15 menit"
      }
    ]
  },
  {
    id: 3,
    title: "Kendalikan Bullying",
    slug: "kendalikan-bullying",
    description: "Strategi dan teknik untuk mengendalikan emosi dan perilaku dalam situasi bullying.",
    objectives: [
      "Mempelajari teknik pengendalian emosi saat menghadapi bullying",
      "Memahami pentingnya self-control dalam situasi konflik",
      "Menguasai strategi de-eskalasi konflik"
    ],
    duration: "60 menit",
    activities: [
      {
        id: "emotion-control",
        title: "Video: Mengendalikan Emosi",
        type: "video",
        description: "Teknik-teknik praktis untuk mengelola emosi dalam situasi sulit",
        videos: [learningVideos.lifeSkills],
        duration: "12 menit"
      },
      {
        id: "breathing-exercise",
        title: "Video: Kecakapan Hidup Remaja",
        type: "video",
        description: "Materi pendamping untuk mengenali emosi dan menghadapi tekanan teman sebaya",
        videos: [learningVideos.lifeSkills],
        duration: "8 menit"
      },
      {
        id: "scenario-quiz",
        title: "Kuis Skenario",
        type: "quiz",
        description: "Pilihan respons terbaik dalam berbagai situasi bullying",
        url: "https://quizizz.com/example/scenarios",
        duration: "20 menit"
      },
      {
        id: "control-plan",
        title: "Rencana Pengendalian Diri",
        type: "form",
        description: "Membuat rencana personal untuk mengendalikan emosi",
        url: "https://forms.google.com/example/control-plan",
        duration: "20 menit"
      }
    ]
  },
  {
    id: 4,
    title: "Coping Cerdas",
    slug: "coping-cerdas",
    description: "Mengembangkan strategi coping yang efektif untuk menghadapi dan mengatasi situasi bullying.",
    objectives: [
      "Memahami berbagai strategi coping yang efektif",
      "Mengidentifikasi sumber dukungan yang tersedia",
      "Mengembangkan resiliensi mental"
    ],
    duration: "60 menit",
    activities: [
      {
        id: "coping-strategies",
        title: "Video: Strategi Coping",
        type: "video",
        description: "Berbagai strategi mengatasi stress dan tekanan dari bullying",
        videos: [learningVideos.lifeSkills],
        duration: "15 menit"
      },
      {
        id: "support-network",
        title: "Peta Dukungan Sosial",
        type: "form",
        description: "Identifikasi orang-orang yang dapat dimintai bantuan",
        url: "https://forms.google.com/example/support-network",
        duration: "20 menit"
      },
      {
        id: "resilience-quiz",
        title: "Tes Resiliensi",
        type: "quiz",
        description: "Mengukur tingkat ketahanan mental dalam menghadapi masalah",
        url: "https://kahoot.it/challenge/resilience",
        duration: "15 menit"
      },
      {
        id: "coping-journal",
        title: "Jurnal Coping",
        type: "reflection",
        description: "Berbagi strategi coping yang pernah berhasil diterapkan",
        url: "https://padlet.com/example/coping-strategies",
        duration: "10 menit"
      }
    ]
  },
  {
    id: 5,
    title: "Berani Bicara",
    slug: "berani-bicara",
    description: "Membangun keberanian untuk berbicara dan melaporkan kejadian bullying kepada pihak yang tepat.",
    objectives: [
      "Membangun keberanian untuk melaporkan bullying",
      "Mengetahui cara berkomunikasi yang efektif",
      "Memahami pentingnya menjadi saksi yang bertanggung jawab"
    ],
    duration: "60 menit",
    activities: [
      {
        id: "speak-up-video",
        title: "Video: Pentingnya Bersuara",
        type: "video",
        description: "Mengapa penting untuk melaporkan bullying dan bagaimana caranya",
        videos: [learningVideos.speakUp],
        duration: "10 menit"
      },
      {
        id: "communication-skills",
        title: "Video: Peran Siswa Menghentikan Perundungan",
        type: "video",
        description: "Pemantik diskusi tentang tindakan yang dapat dilakukan siswa untuk menghentikan perundungan",
        videos: [learningVideos.speakUp],
        duration: "12 menit"
      },
      {
        id: "reporting-quiz",
        title: "Kuis: Cara Melaporkan Bullying",
        type: "quiz",
        description: "Prosedur dan tempat yang tepat untuk melaporkan bullying",
        url: "https://quizizz.com/example/reporting",
        duration: "15 menit"
      },
      {
        id: "brave-stories",
        title: "Cerita Keberanian",
        type: "reflection",
        description: "Berbagi pengalaman tentang keberanian berbicara",
        url: "https://padlet.com/example/brave-stories",
        duration: "20 menit"
      }
    ]
  },
  {
    id: 6,
    title: "Kawan Sejati",
    slug: "kawan-sejati",
    description: "Membangun dan memelihara hubungan pertemanan yang sehat sebagai proteksi dari bullying.",
    objectives: [
      "Memahami karakteristik pertemanan yang sehat",
      "Mengembangkan keterampilan sosial untuk membangun pertemanan",
      "Belajar menjadi teman yang supportif"
    ],
    duration: "60 menit",
    activities: [
      {
        id: "friendship-video",
        title: "Video: Pertemanan yang Sehat",
        type: "video",
        description: "Karakteristik dan manfaat memiliki pertemanan yang positif",
        videos: [learningVideos.bullying],
        duration: "10 menit"
      },
      {
        id: "social-skills",
        title: "Keterampilan Sosial",
        type: "reading",
        description: "Tips dan strategi untuk membangun pertemanan yang baik",
        duration: "15 menit"
      },
      {
        id: "friendship-quiz",
        title: "Kuis: Tipe Pertemanan",
        type: "quiz",
        description: "Mengidentifikasi tipe pertemanan yang sehat dan tidak sehat",
        url: "https://kahoot.it/challenge/friendship",
        duration: "15 menit"
      },
      {
        id: "friendship-plan",
        title: "Rencana Pertemanan",
        type: "form",
        description: "Membuat rencana untuk membangun dan menjaga pertemanan",
        url: "https://forms.google.com/example/friendship-plan",
        duration: "20 menit"
      }
    ]
  },
  {
    id: 7,
    title: "Refleksi dan Cerita Inspiratif",
    slug: "refleksi-cerita-inspiratif",
    description: "Merefleksikan pembelajaran dan berbagi cerita inspiratif tentang pencegahan bullying.",
    objectives: [
      "Merefleksikan pembelajaran dari sesi-sesi sebelumnya",
      "Menginspirasi dengan cerita-cerita positif",
      "Memantapkan komitmen untuk mencegah bullying"
    ],
    duration: "60 menit",
    activities: [
      {
        id: "inspirational-stories",
        title: "Video: Cerita Inspiratif",
        type: "video",
        description: "Cerita animasi untuk merefleksikan dampak bullying dan pentingnya saling mendukung",
        videos: [learningVideos.story],
        duration: "15 menit"
      },
      {
        id: "learning-reflection",
        title: "Refleksi Pembelajaran",
        type: "reflection",
        description: "Refleksi tentang pembelajaran dan perubahan yang terjadi",
        url: "https://padlet.com/example/learning-reflection",
        duration: "20 menit"
      },
      {
        id: "share-story",
        title: "Berbagi Cerita",
        type: "reflection",
        description: "Berbagi cerita atau pengalaman inspiratif (opsional, anonim)",
        url: "https://padlet.com/example/inspirational-stories",
        duration: "15 menit"
      },
      {
        id: "commitment",
        title: "Komitmen Anti-Bullying",
        type: "form",
        description: "Membuat komitmen personal untuk mencegah bullying",
        url: "https://forms.google.com/example/commitment",
        duration: "10 menit"
      }
    ]
  },
  {
    id: 8,
    title: "Post-Test dan Penutup",
    slug: "posttest-penutup",
    description: "Evaluasi akhir program dan penutupan dengan rencana tindak lanjut.",
    objectives: [
      "Mengukur peningkatan pemahaman tentang bullying",
      "Mengevaluasi efektivitas program",
      "Merencanakan tindak lanjut dan implementasi"
    ],
    duration: "45 menit",
    activities: [
      {
        id: "post-test",
        title: "Post-Test Pemahaman",
        type: "form",
        description: "Kuesioner untuk mengukur peningkatan pemahaman",
        url: "https://forms.google.com/example/posttest",
        duration: "20 menit"
      },
      {
        id: "program-evaluation",
        title: "Evaluasi Program",
        type: "form",
        description: "Penilaian terhadap keseluruhan program",
        url: "https://forms.google.com/example/evaluation",
        duration: "10 menit"
      },
      {
        id: "action-plan",
        title: "Rencana Tindak Lanjut",
        type: "form",
        description: "Rencana implementasi pembelajaran dalam kehidupan sehari-hari",
        url: "https://forms.google.com/example/action-plan",
        duration: "10 menit"
      },
      {
        id: "closing-message",
        title: "Pesan Penutup & Ucapan Terima Kasih",
        type: "reading",
        description: "Pesan penutup dan apresiasi atas partisipasi dalam program",
        content: [
          "Terima kasih sudah meluangkan waktu untuk belajar bersama. Setiap langkah untuk memahami bullying dan peduli kepada teman adalah hal yang berarti.",
          "Bawa hal yang kamu pelajari ke keseharian: pikirkan dampak ucapanmu, hargai perbedaan, dan ajak teman yang tersisih untuk bergabung.",
          "Jika melihat bullying, utamakan keselamatanmu. Jangan ikut mengejek atau menyebarkan kontennya. Cari bantuan guru atau orang dewasa yang kamu percaya, lalu dukung teman yang mengalaminya.",
          "Kalau kamu yang mengalami bullying, itu bukan salahmu. Kamu berhak merasa aman dan mendapat bantuan. Tidak apa-apa meminta dukungan lagi jika masalahnya belum selesai.",
          "Pilih satu tindakan baik yang ingin kamu lakukan mulai hari ini. Terus jadi teman yang mau mendengar, peduli, dan saling menjaga."
        ],
        duration: "5 menit"
      }
    ]
  }
];

export function getSessionBySlug(slug: string): Session | undefined {
  return sessions.find(session => session.slug === slug);
}

export function getSessionById(id: number): Session | undefined {
  return sessions.find(session => session.id === id);
}
