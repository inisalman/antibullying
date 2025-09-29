export interface Activity {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'form' | 'reflection' | 'reading' | 'icebreaker' | 'schedule' | 'pretest';
  description: string;
  url?: string;
  duration?: string;
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
        type: "video",
        description: "Pengenalan fasilitator dan penjelasan tujuan program pencegahan bullying",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "12 menit"
      },
      {
        id: "breathing-exercise",
        title: "Latihan Pernapasan",
        type: "video",
        description: "Panduan teknik pernapasan untuk menenangkan diri",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        duration: "10 menit"
      },
      {
        id: "communication-skills",
        title: "Video: Keterampilan Komunikasi",
        type: "video",
        description: "Cara berkomunikasi yang assertif dan efektif",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
        description: "Kisah-kisah nyata tentang pencegahan dan mengatasi bullying",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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
        id: "closing-video",
        title: "Video Penutup",
        type: "video",
        description: "Pesan penutup dan apresiasi atas partisipasi dalam program",
        url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
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