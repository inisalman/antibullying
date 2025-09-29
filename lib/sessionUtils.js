// Utility functions for session management and answer submission

/**
 * Get student data from localStorage or create new student
 */
export async function getOrCreateStudent(studentData) {
  try {
    // Try to get existing student from localStorage (only in browser)
    if (typeof window !== 'undefined' && window.localStorage) {
      const existingStudent = localStorage.getItem('studentData');
      if (existingStudent) {
        return JSON.parse(existingStudent);
      }
    }

    // Create new student if not exists
    const response = await fetch('/api/siswa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nama: studentData.nama,
        kelas: studentData.kelas || '',
        email: studentData.email || null
      })
    });

    const student = await response.json();
    if (!response.ok) throw new Error(student.error || 'Failed to create student');

    // Save to localStorage for future use (only in browser)
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('studentData', JSON.stringify(student));
    }
    return student;
  } catch (error) {
    console.error('Error getting/creating student:', error);
    throw error;
  }
}

/**
 * Get session data by session name
 */
export async function getSessionByName(sessionName) {
  try {
    const response = await fetch('/api/sesi');
    const allSesi = await response.json();
    const session = allSesi.find(s => s.nama_sesi === sessionName);
    
    if (!session) {
      throw new Error(`Session "${sessionName}" not found`);
    }
    
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    throw error;
  }
}

/**
 * Get or create activity for a session
 */
export async function getOrCreateActivity(activityName, sessionId) {
  try {
    const response = await fetch('/api/kegiatan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        namaKegiatan: activityName,
        sesiId: sessionId
      })
    });

    const activity = await response.json();
    if (!response.ok) throw new Error(activity.error || 'Failed to get/create activity');
    
    return activity;
  } catch (error) {
    console.error('Error getting/creating activity:', error);
    throw error;
  }
}

/**
 * Submit answer to API (which will save to both local DB and Google Sheets)
 */
export async function submitAnswer(studentId, activityId, answer) {
  try {
    const response = await fetch('/api/jawaban', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        siswaId: studentId,
        kegiatanId: activityId,
        jawaban: answer
      })
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Failed to save answer');
    
    return result;
  } catch (error) {
    console.error('Error submitting answer:', error);
    throw error;
  }
}

/**
 * Complete flow: submit answer with all necessary data
 */
export async function submitSessionAnswer({
  sessionName,
  activityName,
  answer,
  studentData = null
}) {
  try {
    // 1. Get or create student
    const student = await getOrCreateStudent(studentData || {});
    
    // 2. Get session
    const session = await getSessionByName(sessionName);
    
    // 3. Get or create activity
    const activity = await getOrCreateActivity(activityName, session.id);
    
    // 4. Submit answer
    const result = await submitAnswer(student.id, activity.id, answer);
    
    return {
      success: true,
      student,
      session,
      activity,
      answer: result
    };
  } catch (error) {
    console.error('Error in submitSessionAnswer:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Session configurations
 */
export const SESSION_CONFIGS = {
  'Sesi 1: Perkenalan & Pre-Test': {
    activities: ['Ice Breaking', 'Sharing Ekspektasi', 'Pre-Test']
  },
  'Sesi 2: Kenali Bullying': {
    activities: ['Definisi Bullying', 'Jenis-jenis Bullying', 'Dampak Bullying']
  },
  'Sesi 3: Berani Bicara': {
    activities: ['Strategi Komunikasi', 'Role Play', 'Membangun Kepercayaan Diri']
  },
  'Sesi 4: Kawan Sejati': {
    activities: ['Ciri-ciri Teman Sejati', 'Membangun Persahabatan', 'Mendukung Teman']
  },
  'Sesi 5: Coping Cerdas': {
    activities: ['Teknik Relaksasi', 'Mengelola Emosi', 'Positive Self-Talk']
  },
  'Sesi 6: Kendalikan Bullying': {
    activities: ['Strategi Pencegahan', 'Intervensi Bystander', 'Membangun Budaya Positif']
  },
  'Sesi 7: Refleksi Cerita Inspiratif': {
    activities: ['Cerita Inspiratif', 'Refleksi Diri', 'Sharing Pengalaman']
  },
  'Sesi 8: Post-Test & Penutup': {
    activities: ['Post-Test', 'Refleksi Program', 'Komitmen Masa Depan']
  }
};

/**
 * Get session number from session name
 */
export function getSessionNumber(sessionName) {
  const match = sessionName.match(/Sesi (\d+)/);
  return match ? match[1] : '1';
}
