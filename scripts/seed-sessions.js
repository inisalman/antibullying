
const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

const sessionsData = [
  {
    nama_sesi: "Sesi 1: Perkenalan & Pre-Test",
    deskripsi: "Sesi perkenalan dan pre-test untuk mengukur pengetahuan awal siswa tentang bullying",
    kegiatan: [
      { nama_kegiatan: "Ice Breaking", deskripsi: "Perkenalan diri dan kalimat positif" },
      { nama_kegiatan: "Sharing Ekspektasi", deskripsi: "Berbagi harapan tentang program anti-bullying" },
      { nama_kegiatan: "Pre-Test", deskripsi: "Tes awal untuk mengukur pengetahuan tentang bullying" }
    ]
  },
  {
    nama_sesi: "Sesi 2: Kenali Bullying",
    deskripsi: "Mengenali berbagai bentuk dan dampak bullying",
    kegiatan: [
      { nama_kegiatan: "Definisi Bullying", deskripsi: "Memahami apa itu bullying dan ciri-cirinya" },
      { nama_kegiatan: "Jenis-jenis Bullying", deskripsi: "Mengenal berbagai jenis bullying (fisik, verbal, cyber)" },
      { nama_kegiatan: "Dampak Bullying", deskripsi: "Memahami dampak bullying pada korban dan pelaku" }
    ]
  },
  {
    nama_sesi: "Sesi 3: Berani Bicara",
    deskripsi: "Membangun keberanian untuk melaporkan dan membela diri",
    kegiatan: [
      { nama_kegiatan: "Strategi Komunikasi", deskripsi: "Cara berkomunikasi yang efektif saat menghadapi bullying" },
      { nama_kegiatan: "Role Play", deskripsi: "Praktik situasi menghadapi bullying" },
      { nama_kegiatan: "Membangun Kepercayaan Diri", deskripsi: "Teknik meningkatkan kepercayaan diri" }
    ]
  },
  {
    nama_sesi: "Sesi 4: Kawan Sejati",
    deskripsi: "Membangun persahabatan yang sehat dan mendukung",
    kegiatan: [
      { nama_kegiatan: "Ciri-ciri Teman Sejati", deskripsi: "Mengenal karakteristik teman yang baik" },
      { nama_kegiatan: "Membangun Persahabatan", deskripsi: "Cara membangun hubungan persahabatan yang sehat" },
      { nama_kegiatan: "Mendukung Teman", deskripsi: "Cara mendukung teman yang mengalami bullying" }
    ]
  },
  {
    nama_sesi: "Sesi 5: Coping Cerdas",
    deskripsi: "Strategi mengatasi stress dan emosi negatif",
    kegiatan: [
      { nama_kegiatan: "Teknik Relaksasi", deskripsi: "Cara menenangkan diri saat stress" },
      { nama_kegiatan: "Mengelola Emosi", deskripsi: "Strategi mengelola emosi negatif" },
      { nama_kegiatan: "Positive Self-Talk", deskripsi: "Membangun dialog internal yang positif" }
    ]
  },
  {
    nama_sesi: "Sesi 6: Kendalikan Bullying",
    deskripsi: "Strategi mencegah dan menghentikan bullying",
    kegiatan: [
      { nama_kegiatan: "Strategi Pencegahan", deskripsi: "Cara mencegah terjadinya bullying" },
      { nama_kegiatan: "Intervensi Bystander", deskripsi: "Peran saksi dalam menghentikan bullying" },
      { nama_kegiatan: "Membangun Budaya Positif", deskripsi: "Cara menciptakan lingkungan yang aman dan positif" }
    ]
  },
  {
    nama_sesi: "Sesi 7: Refleksi Cerita Inspiratif",
    deskripsi: "Refleksi melalui cerita inspiratif dan pembelajaran",
    kegiatan: [
      { nama_kegiatan: "Cerita Inspiratif", deskripsi: "Membaca dan mendiskusikan cerita inspiratif" },
      { nama_kegiatan: "Refleksi Diri", deskripsi: "Merefleksikan pembelajaran yang telah didapat" },
      { nama_kegiatan: "Sharing Pengalaman", deskripsi: "Berbagi pengalaman dan pembelajaran" }
    ]
  },
  {
    nama_sesi: "Sesi 8: Post-Test & Penutup",
    deskripsi: "Evaluasi akhir dan penutupan program",
    kegiatan: [
      { nama_kegiatan: "Post-Test", deskripsi: "Tes akhir untuk mengukur peningkatan pengetahuan" },
      { nama_kegiatan: "Refleksi Program", deskripsi: "Merefleksikan seluruh program yang telah dijalani" },
      { nama_kegiatan: "Komitmen Masa Depan", deskripsi: "Membuat komitmen untuk menerapkan pembelajaran" }
    ]
  }
]

async function seedSessions() {
  try {
    console.log('Starting to seed sessions and activities...')
    
    for (const sessionData of sessionsData) {
      // Insert session
      const { data: session, error: sessionError } = await supabase
        .from('sesi')
        .insert([{
          nama_sesi: sessionData.nama_sesi,
          deskripsi: sessionData.deskripsi
        }])
        .select()
        .single()
      
      if (sessionError) {
        console.error(`Error inserting session ${sessionData.nama_sesi}:`, sessionError)
        continue
      }
      
      console.log(`✅ Inserted session: ${sessionData.nama_sesi}`)
      
      // Insert activities for this session
      for (const activityData of sessionData.kegiatan) {
        const { data: activity, error: activityError } = await supabase
          .from('kegiatan')
          .insert([{
            sesi_id: session.id,
            nama_kegiatan: activityData.nama_kegiatan,
            deskripsi: activityData.deskripsi
          }])
          .select()
          .single()
        
        if (activityError) {
          console.error(`Error inserting activity ${activityData.nama_kegiatan}:`, activityError)
          continue
        }
        
        console.log(`  ✅ Inserted activity: ${activityData.nama_kegiatan}`)
      }
    }
    
    console.log('🎉 Successfully seeded all sessions and activities!')
  } catch (error) {
    console.error('Error seeding data:', error)
  }
}

// Run the seed function
seedSessions()