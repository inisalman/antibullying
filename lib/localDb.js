const fs = require('fs')
const path = require('path')

const DATA_DIR = path.join(process.cwd(), 'data')
const SISWA_FILE = path.join(DATA_DIR, 'siswa.json')
const SESI_FILE = path.join(DATA_DIR, 'sesi.json')
const KEGIATAN_FILE = path.join(DATA_DIR, 'kegiatan.json')
const JAWABAN_FILE = path.join(DATA_DIR, 'jawaban.json')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize files if they don't exist
const initializeFiles = () => {
  if (!fs.existsSync(SISWA_FILE)) {
    fs.writeFileSync(SISWA_FILE, JSON.stringify([], null, 2))
  }
  if (!fs.existsSync(SESI_FILE)) {
    fs.writeFileSync(SESI_FILE, JSON.stringify([], null, 2))
  }
  if (!fs.existsSync(KEGIATAN_FILE)) {
    fs.writeFileSync(KEGIATAN_FILE, JSON.stringify([], null, 2))
  }
  if (!fs.existsSync(JAWABAN_FILE)) {
    fs.writeFileSync(JAWABAN_FILE, JSON.stringify([], null, 2))
  }
}

// Initialize on first load
initializeFiles()

// Helper functions
const readFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error)
    return []
  }
}

const writeFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    return true
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error)
    return false
  }
}

// Generate UUID
const generateId = () => {
  return 'id_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36)
}

// Database operations
const db = {
  // Siswa operations
  siswa: {
    getAll: () => readFile(SISWA_FILE),
    getById: (id) => {
      const siswa = readFile(SISWA_FILE)
      return siswa.find(s => s.id === id)
    },
    create: (data) => {
      const siswa = readFile(SISWA_FILE)
      const newSiswa = {
        id: generateId(),
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      siswa.push(newSiswa)
      writeFile(SISWA_FILE, siswa)
      return newSiswa
    },
    update: (id, data) => {
      const siswa = readFile(SISWA_FILE)
      const index = siswa.findIndex(s => s.id === id)
      if (index !== -1) {
        siswa[index] = { ...siswa[index], ...data, updated_at: new Date().toISOString() }
        writeFile(SISWA_FILE, siswa)
        return siswa[index]
      }
      return null
    },
    delete: (id) => {
      const siswa = readFile(SISWA_FILE)
      const filtered = siswa.filter(s => s.id !== id)
      writeFile(SISWA_FILE, filtered)
      return true
    }
  },

  // Sesi operations
  sesi: {
    getAll: () => readFile(SESI_FILE),
    getById: (id) => {
      const sesi = readFile(SESI_FILE)
      return sesi.find(s => s.id === id)
    },
    create: (data) => {
      const sesi = readFile(SESI_FILE)
      const newSesi = {
        id: generateId(),
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      sesi.push(newSesi)
      writeFile(SESI_FILE, sesi)
      return newSesi
    },
    update: (id, data) => {
      const sesi = readFile(SESI_FILE)
      const index = sesi.findIndex(s => s.id === id)
      if (index !== -1) {
        sesi[index] = { ...sesi[index], ...data, updated_at: new Date().toISOString() }
        writeFile(SESI_FILE, sesi)
        return sesi[index]
      }
      return null
    },
    delete: (id) => {
      const sesi = readFile(SESI_FILE)
      const filtered = sesi.filter(s => s.id !== id)
      writeFile(SESI_FILE, filtered)
      return true
    }
  },

  // Kegiatan operations
  kegiatan: {
    getAll: () => readFile(KEGIATAN_FILE),
    getById: (id) => {
      const kegiatan = readFile(KEGIATAN_FILE)
      return kegiatan.find(k => k.id === id)
    },
    getBySesiId: (sesiId) => {
      const kegiatan = readFile(KEGIATAN_FILE)
      return kegiatan.filter(k => k.sesi_id === sesiId)
    },
    create: (data) => {
      const kegiatan = readFile(KEGIATAN_FILE)
      const newKegiatan = {
        id: generateId(),
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      kegiatan.push(newKegiatan)
      writeFile(KEGIATAN_FILE, kegiatan)
      return newKegiatan
    },
    update: (id, data) => {
      const kegiatan = readFile(KEGIATAN_FILE)
      const index = kegiatan.findIndex(k => k.id === id)
      if (index !== -1) {
        kegiatan[index] = { ...kegiatan[index], ...data, updated_at: new Date().toISOString() }
        writeFile(KEGIATAN_FILE, kegiatan)
        return kegiatan[index]
      }
      return null
    },
    delete: (id) => {
      const kegiatan = readFile(KEGIATAN_FILE)
      const filtered = kegiatan.filter(k => k.id !== id)
      writeFile(KEGIATAN_FILE, filtered)
      return true
    }
  },

  // Jawaban operations
  jawaban: {
    getAll: () => readFile(JAWABAN_FILE),
    getById: (id) => {
      const jawaban = readFile(JAWABAN_FILE)
      return jawaban.find(j => j.id === id)
    },
    getBySiswaId: (siswaId) => {
      const jawaban = readFile(JAWABAN_FILE)
      return jawaban.filter(j => j.siswa_id === siswaId)
    },
    getByKegiatanId: (kegiatanId) => {
      const jawaban = readFile(JAWABAN_FILE)
      return jawaban.filter(j => j.kegiatan_id === kegiatanId)
    },
    create: (data) => {
      const jawaban = readFile(JAWABAN_FILE)
      const newJawaban = {
        id: generateId(),
        ...data,
        timestamp: new Date().toISOString()
      }
      jawaban.push(newJawaban)
      writeFile(JAWABAN_FILE, jawaban)
      return newJawaban
    },
    update: (id, data) => {
      const jawaban = readFile(JAWABAN_FILE)
      const index = jawaban.findIndex(j => j.id === id)
      if (index !== -1) {
        jawaban[index] = { ...jawaban[index], ...data, updated_at: new Date().toISOString() }
        writeFile(JAWABAN_FILE, jawaban)
        return jawaban[index]
      }
      return null
    },
    delete: (id) => {
      const jawaban = readFile(JAWABAN_FILE)
      const filtered = jawaban.filter(j => j.id !== id)
      writeFile(JAWABAN_FILE, filtered)
      return true
    }
  }
}

module.exports = db


