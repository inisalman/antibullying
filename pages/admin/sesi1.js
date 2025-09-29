import { useState, useEffect } from 'react';
import AdminLayout from '../../components/AdminLayout';
import SessionTable from '../../components/SessionTable';
import { Users, BookOpen, MessageSquare, Calendar } from 'lucide-react';

export default function Session1Admin() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalStudents: 0,
    completedStudents: 0,
    completionRate: 0
  });

  useEffect(() => {
    fetchSession1Data();
  }, []);

  const fetchSession1Data = async () => {
    try {
      const response = await fetch('/api/admin/sesi1');
      const result = await response.json();
      setData(result.data || []);
      setStats(result.stats || {});
    } catch (error) {
      console.error('Error fetching session 1 data:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'positiveSentence',
      label: 'Kalimat Positif'
    },
    {
      key: 'expectations',
      label: 'Ekspektasi Program'
    }
  ];

  if (loading) {
    return (
      <AdminLayout title="Sesi 1: Perkenalan & Pre-Test">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Sesi 1: Perkenalan & Pre-Test">
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users size={24} className="text-blue-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.totalStudents}
                </div>
                <div className="text-sm text-gray-500">Total Siswa</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <BookOpen size={24} className="text-green-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.completedStudents}
                </div>
                <div className="text-sm text-gray-500">Siswa Selesai</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <MessageSquare size={24} className="text-yellow-600" />
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.completionRate}%
                </div>
                <div className="text-sm text-gray-500">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Session Description */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users size={24} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Sesi 1: Perkenalan & Pre-Test
              </h2>
              <p className="text-gray-600 mb-4">
                Sesi pembuka program dengan perkenalan peserta dan pengukuran pemahaman awal tentang bullying.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Kegiatan:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Ice Breaking - Perkenalan diri</li>
                    <li>• Perkenalan Fasilitator & Tujuan Program</li>
                    <li>• Penjelasan Alur Program & Jadwal</li>
                    <li>• Pre-Test - Kuesioner pemahaman awal</li>
                    <li>• Sharing Ekspektasi</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tujuan:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Memahami tujuan program</li>
                    <li>• Mengukur pemahaman awal</li>
                    <li>• Membangun komitmen peserta</li>
                    <li>• Menciptakan suasana yang kondusif</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <SessionTable
          data={data}
          columns={columns}
          title="Data Jawaban Sesi 1"
          searchPlaceholder="Cari berdasarkan nama, kelas, atau sekolah..."
          exportFileName="sesi-1-perkenalan-pretest"
        />

        {/* Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Analisis Kalimat Positif
            </h3>
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                <strong>Total Kalimat Positif:</strong> {data.length}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Rata-rata Panjang:</strong> {
                  data.length > 0 
                    ? Math.round(data.reduce((sum, item) => sum + (item.positiveSentence?.length || 0), 0) / data.length)
                    : 0
                } karakter
              </div>
              <div className="text-sm text-gray-600">
                <strong>Kata Kunci Populer:</strong> 
                <div className="mt-2 flex flex-wrap gap-2">
                  {['percaya diri', 'positif', 'baik', 'hebat', 'bangga'].map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Analisis Ekspektasi Program
            </h3>
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                <strong>Total Ekspektasi:</strong> {data.length}
              </div>
              <div className="text-sm text-gray-600">
                <strong>Rata-rata Panjang:</strong> {
                  data.length > 0 
                    ? Math.round(data.reduce((sum, item) => sum + (item.expectations?.length || 0), 0) / data.length)
                    : 0
                } karakter
              </div>
              <div className="text-sm text-gray-600">
                <strong>Topik Populer:</strong>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['mencegah bullying', 'komunikasi', 'percaya diri', 'teman', 'lingkungan'].map((topic, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
