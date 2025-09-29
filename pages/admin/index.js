import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/AdminLayout'
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  TrendingUp,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Eye
} from 'lucide-react'
import * as XLSX from 'xlsx'

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    totalSiswa: 0,
    totalJawaban: 0,
    totalSesi: 0,
    jawabanPerSesi: [],
    recentJawaban: []
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleExportExcel = () => {
    const exportData = stats.recentJawaban.map(item => ({
      'Nama Siswa': item.siswa?.nama || '',
      'Kelas': item.siswa?.kelas || '',
      'Email': item.siswa?.email || '',
      'Sesi': item.kegiatan?.sesi?.nama_sesi || '',
      'Kegiatan': item.kegiatan?.nama_kegiatan || '',
      'Jawaban': item.jawaban || '',
      'Tanggal Submit': new Date(item.timestamp).toLocaleDateString('id-ID'),
    }))

    const ws = XLSX.utils.json_to_sheet(exportData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Data Jawaban')
    XLSX.writeFile(wb, 'data-jawaban-siswa.xlsx')
  }

  const getSessionStats = (sessionId) => {
    const sessionData = stats.jawabanPerSesi?.find(sesi => sesi.id === sessionId)
    const totalJawabanSesi = sessionData?.totalJawaban || 0
    const totalKegiatan = sessionData?.kegiatan?.length || 0
    
    return {
      totalStudents: stats.totalSiswa || 0,
      completedStudents: totalJawabanSesi,
      completionRate: stats.totalSiswa > 0 ? Math.round((totalJawabanSesi / stats.totalSiswa) * 100) : 0,
      totalKegiatan: totalKegiatan
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-600 mt-2">Ringkasan program anti-bullying</p>
          </div>
          <button
            onClick={handleExportExcel}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Export Excel</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Siswa</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSiswa}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Jawaban</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalJawaban}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Sesi</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSesi}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Tingkat Penyelesaian</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalSiswa > 0 ? Math.round((stats.totalJawaban / (stats.totalSiswa * stats.totalSesi * 3)) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sessions Overview */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Ringkasan Sesi</h2>
            <p className="text-gray-600 mt-1">Progress setiap sesi pembelajaran</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {stats.jawabanPerSesi?.map((session, index) => {
                const sessionStats = getSessionStats(session.id)
                return (
                  <div key={session.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">Sesi {index + 1}</h3>
                      <button
                        onClick={() => router.push(`/admin/sesi/${session.id}`)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{session.namaSesi}</p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Jawaban:</span>
                        <span className="font-medium">{session.totalJawaban}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Kegiatan:</span>
                        <span className="font-medium">{sessionStats.totalKegiatan}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${sessionStats.completionRate}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 text-center">
                        {sessionStats.completionRate}% selesai
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Recent Answers */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Jawaban Terbaru</h2>
            <p className="text-gray-600 mt-1">10 jawaban terbaru dari siswa</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Siswa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sesi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kegiatan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jawaban
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.recentJawaban?.map((jawaban) => (
                  <tr key={jawaban.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {jawaban.siswa?.nama || '-'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {jawaban.siswa?.kelas || '-'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {jawaban.kegiatan?.sesi?.nama_sesi || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {jawaban.kegiatan?.nama_kegiatan || '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs truncate" title={jawaban.jawaban}>
                        {jawaban.jawaban || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(jawaban.timestamp).toLocaleDateString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}