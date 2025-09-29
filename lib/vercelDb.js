// In-memory database for Vercel (serverless) environment
// This works around the read-only file system limitation

let siswaData = [];
let sesiData = [];
let kegiatanData = [];
let jawabanData = [];

// Initialize with existing data if available
const initializeData = () => {
  try {
    // Try to load existing data from files (for development)
    const fs = require('fs');
    const path = require('path');
    
    const DATA_DIR = path.join(process.cwd(), 'data');
    const SISWA_FILE = path.join(DATA_DIR, 'siswa.json');
    const SESI_FILE = path.join(DATA_DIR, 'sesi.json');
    const KEGIATAN_FILE = path.join(DATA_DIR, 'kegiatan.json');
    const JAWABAN_FILE = path.join(DATA_DIR, 'jawaban.json');
    
    if (fs.existsSync(SISWA_FILE)) {
      siswaData = JSON.parse(fs.readFileSync(SISWA_FILE, 'utf8'));
    }
    if (fs.existsSync(SESI_FILE)) {
      sesiData = JSON.parse(fs.readFileSync(SESI_FILE, 'utf8'));
    }
    if (fs.existsSync(KEGIATAN_FILE)) {
      kegiatanData = JSON.parse(fs.readFileSync(KEGIATAN_FILE, 'utf8'));
    }
    if (fs.existsSync(JAWABAN_FILE)) {
      jawabanData = JSON.parse(fs.readFileSync(JAWABAN_FILE, 'utf8'));
    }
    
    console.log('📊 Loaded existing data:', {
      siswa: siswaData.length,
      sesi: sesiData.length,
      kegiatan: kegiatanData.length,
      jawaban: jawabanData.length
    });
  } catch (error) {
    console.log('📊 Using empty in-memory database (new deployment)');
    // Initialize with empty arrays
    siswaData = [];
    sesiData = [];
    kegiatanData = [];
    jawabanData = [];
  }
};

// Initialize data on first load
initializeData();

// Helper function to generate ID
const generateId = () => {
  return 'id_' + Math.random().toString(36).substr(2, 15);
};

// Helper function to get current timestamp
const getTimestamp = () => {
  return new Date().toISOString();
};

// Siswa operations
const siswa = {
  getAll: () => siswaData,
  getById: (id) => siswaData.find(item => item.id === id),
  create: (data) => {
    const newSiswa = {
      id: generateId(),
      ...data,
      created_at: getTimestamp(),
      updated_at: getTimestamp()
    };
    siswaData.push(newSiswa);
    console.log('✅ Created siswa:', newSiswa.id);
    return newSiswa;
  },
  update: (id, data) => {
    const index = siswaData.findIndex(item => item.id === id);
    if (index !== -1) {
      siswaData[index] = {
        ...siswaData[index],
        ...data,
        updated_at: getTimestamp()
      };
      console.log('✅ Updated siswa:', id);
      return siswaData[index];
    }
    return null;
  },
  delete: (id) => {
    const index = siswaData.findIndex(item => item.id === id);
    if (index !== -1) {
      const deleted = siswaData.splice(index, 1)[0];
      console.log('✅ Deleted siswa:', id);
      return deleted;
    }
    return null;
  }
};

// Sesi operations
const sesi = {
  getAll: () => sesiData,
  getById: (id) => sesiData.find(item => item.id === id),
  create: (data) => {
    const newSesi = {
      id: generateId(),
      ...data,
      created_at: getTimestamp(),
      updated_at: getTimestamp()
    };
    sesiData.push(newSesi);
    console.log('✅ Created sesi:', newSesi.id);
    return newSesi;
  },
  update: (id, data) => {
    const index = sesiData.findIndex(item => item.id === id);
    if (index !== -1) {
      sesiData[index] = {
        ...sesiData[index],
        ...data,
        updated_at: getTimestamp()
      };
      console.log('✅ Updated sesi:', id);
      return sesiData[index];
    }
    return null;
  },
  delete: (id) => {
    const index = sesiData.findIndex(item => item.id === id);
    if (index !== -1) {
      const deleted = sesiData.splice(index, 1)[0];
      console.log('✅ Deleted sesi:', id);
      return deleted;
    }
    return null;
  }
};

// Kegiatan operations
const kegiatan = {
  getAll: () => kegiatanData,
  getById: (id) => kegiatanData.find(item => item.id === id),
  create: (data) => {
    const newKegiatan = {
      id: generateId(),
      ...data,
      created_at: getTimestamp(),
      updated_at: getTimestamp()
    };
    kegiatanData.push(newKegiatan);
    console.log('✅ Created kegiatan:', newKegiatan.id);
    return newKegiatan;
  },
  update: (id, data) => {
    const index = kegiatanData.findIndex(item => item.id === id);
    if (index !== -1) {
      kegiatanData[index] = {
        ...kegiatanData[index],
        ...data,
        updated_at: getTimestamp()
      };
      console.log('✅ Updated kegiatan:', id);
      return kegiatanData[index];
    }
    return null;
  },
  delete: (id) => {
    const index = kegiatanData.findIndex(item => item.id === id);
    if (index !== -1) {
      const deleted = kegiatanData.splice(index, 1)[0];
      console.log('✅ Deleted kegiatan:', id);
      return deleted;
    }
    return null;
  }
};

// Jawaban operations
const jawaban = {
  getAll: () => jawabanData,
  getById: (id) => jawabanData.find(item => item.id === id),
  create: (data) => {
    const newJawaban = {
      id: generateId(),
      ...data,
      timestamp: getTimestamp()
    };
    jawabanData.push(newJawaban);
    console.log('✅ Created jawaban:', newJawaban.id);
    return newJawaban;
  },
  update: (id, data) => {
    const index = jawabanData.findIndex(item => item.id === id);
    if (index !== -1) {
      jawabanData[index] = {
        ...jawabanData[index],
        ...data,
        timestamp: getTimestamp()
      };
      console.log('✅ Updated jawaban:', id);
      return jawabanData[index];
    }
    return null;
  },
  delete: (id) => {
    const index = jawabanData.findIndex(item => item.id === id);
    if (index !== -1) {
      const deleted = jawabanData.splice(index, 1)[0];
      console.log('✅ Deleted jawaban:', id);
      return deleted;
    }
    return null;
  }
};

// Export database object
module.exports = {
  siswa,
  sesi,
  kegiatan,
  jawaban,
  // Utility functions
  getStats: () => ({
    siswa: siswaData.length,
    sesi: sesiData.length,
    kegiatan: kegiatanData.length,
    jawaban: jawabanData.length
  }),
  // For debugging
  _getData: () => ({
    siswa: siswaData,
    sesi: sesiData,
    kegiatan: kegiatanData,
    jawaban: jawabanData
  })
};
