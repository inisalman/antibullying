const db = require('../../../lib/localDb')
const { addMultipleAnswersToSheet, addAnswerToSheet } = require('../../../lib/googleSheets')

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { action, jawabanIds } = req.body

      if (action === 'sync_existing') {
        // Sync semua jawaban yang sudah ada ke Google Sheets
        const allJawaban = db.jawaban.getAll()
        
        const answersToSync = allJawaban.map(jawaban => {
          const siswa = db.siswa.getById(jawaban.siswa_id)
          const kegiatan = db.kegiatan.getById(jawaban.kegiatan_id)
          const sesi = kegiatan ? db.sesi.getById(kegiatan.sesi_id) : null
          
          if (siswa && kegiatan && sesi) {
            return {
              nama: siswa.nama,
              sesi: sesi.nama_sesi.match(/Sesi (\d+)/)?.[1] || '1',
              kegiatan: kegiatan.nama_kegiatan,
              jawaban: jawaban.jawaban
            }
          }
          return null
        }).filter(Boolean)

        const result = await addMultipleAnswersToSheet(answersToSync)
        
        res.status(200).json({
          message: 'Sync completed',
          totalProcessed: answersToSync.length,
          result
        })
        
      } else if (action === 'sync_specific' && jawabanIds && Array.isArray(jawabanIds)) {
        // Sync jawaban tertentu berdasarkan IDs
        const answersToSync = jawabanIds.map(id => {
          const jawaban = db.jawaban.getById(id)
          if (!jawaban) return null
          
          const siswa = db.siswa.getById(jawaban.siswa_id)
          const kegiatan = db.kegiatan.getById(jawaban.kegiatan_id)
          const sesi = kegiatan ? db.sesi.getById(kegiatan.sesi_id) : null
          
          if (siswa && kegiatan && sesi) {
            return {
              nama: siswa.nama,
              sesi: sesi.nama_sesi.match(/Sesi (\d+)/)?.[1] || '1',
              kegiatan: kegiatan.nama_kegiatan,
              jawaban: jawaban.jawaban
            }
          }
          return null
        }).filter(Boolean)

        const result = await addMultipleAnswersToSheet(answersToSync)
        
        res.status(200).json({
          message: 'Specific sync completed',
          totalProcessed: answersToSync.length,
          result
        })
        
      } else {
        res.status(400).json({ 
          error: 'Invalid action. Use "sync_existing" or "sync_specific" with jawabanIds array' 
        })
      }
      
    } catch (error) {
      console.error('Error syncing to Google Sheets:', error)
      res.status(500).json({ error: 'Failed to sync to Google Sheets' })
    }
    
  } else if (req.method === 'GET') {
    try {
      // Get statistics about jawaban and Google Sheets sync status
      const allJawaban = db.jawaban.getAll()
      
      const statistics = allJawaban.reduce((stats, jawaban) => {
        const siswa = db.siswa.getById(jawaban.siswa_id)
        const kegiatan = db.kegiatan.getById(jawaban.kegiatan_id)
        const sesi = kegiatan ? db.sesi.getById(kegiatan.sesi_id) : null
        
        if (siswa && kegiatan && sesi) {
          const sessionNumber = sesi.nama_sesi.match(/Sesi (\d+)/)?.[1] || '1'
          
          if (!stats.bySession[sessionNumber]) {
            stats.bySession[sessionNumber] = {
              sessionName: sesi.nama_sesi,
              count: 0,
              students: new Set()
            }
          }
          
          stats.bySession[sessionNumber].count++
          stats.bySession[sessionNumber].students.add(siswa.id)
          stats.total++
        }
        
        return stats
      }, {
        total: 0,
        bySession: {}
      })
      
      // Convert Set to count
      Object.keys(statistics.bySession).forEach(sessionNumber => {
        statistics.bySession[sessionNumber].uniqueStudents = statistics.bySession[sessionNumber].students.size
        delete statistics.bySession[sessionNumber].students
      })
      
      res.status(200).json(statistics)
      
    } catch (error) {
      console.error('Error getting statistics:', error)
      res.status(500).json({ error: 'Failed to get statistics' })
    }
    
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

