import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/AdminLayout';
import SessionTable from '../../../components/SessionTable';
import { Users, BookOpen, MessageSquare, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SessionAdmin() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    completedStudents: 0,
    completionRate: 0
  });

  useEffect(() => {
    if (id) {
      fetchSessionData();
    }
  }, [id]);

  const fetchSessionData = async () => {
    try {
      const response = await fetch(`/api/admin/sesi/${id}`);
      const result = await response.json();
      setData(result.data || []);
      setStats(result.stats || {});
      setSessionInfo(result.sessionInfo || null);
    } catch (error) {
      console.error(`Error fetching session ${id} data:`, error);
    } finally {
      setLoading(false);
    }
  };

  const getColumns = (sessionName) => {
    const baseColumns = [
      { key: 'nama', label: 'Nama Siswa' },
      { key: 'kelas', label: 'Kelas' }
    ];

    // Add specific columns based on session
    if (sessionName?.includes('Sesi 1')) {
      return [
        ...baseColumns,
        { key: 'positiveSentence', label: 'Kalimat Positif' },
        { key: 'expectations', label: 'Ekspektasi Program' }
      ];
    } else if (sessionName?.includes('Sesi 2')) {
      return [
        ...baseColumns,
        { key: 'definisiBullying', label: 'Definisi Bullying' },
        { key: 'jenisBullying', label: 'Jenis-jenis Bullying' },
        { key: 'dampakBullying', label: 'Dampak Bullying' }
      ];
    } else if (sessionName?.includes('Sesi 3')) {
      return [
        ...baseColumns,
        { key: 'strategiKomunikasi', label: 'Strategi Komunikasi' },
        { key: 'rolePlay', label: 'Role Play' },
        { key: 'kepercayaanDiri', label: 'Kepercayaan Diri' }
      ];
    } else if (sessionName?.includes('Sesi 4')) {
      return [
        ...baseColumns,
        { key: 'ciriTemanSejati', label: 'Ciri-ciri Teman Sejati' },
        { key: 'membangunPersahabatan', label: 'Membangun Persahabatan' },
        { key: 'mendukungTeman', label: 'Mendukung Teman' }
      ];
    } else if (sessionName?.includes('Sesi 5')) {
      return [
        ...baseColumns,
        { key: 'teknikRelaksasi', label: 'Teknik Relaksasi' },
        { key: 'mengelolaEmosi', label: 'Mengelola Emosi' },
        { key: 'positiveSelfTalk', label: 'Positive Self-Talk' }
      ];
    } else if (sessionName?.includes('Sesi 6')) {
      return [
        ...baseColumns,
        { key: 'strategiPencegahan', label: 'Strategi Pencegahan' },
        { key: 'intervensiBystander', label: 'Intervensi Bystander' },
        { key: 'budayaPositif', label: 'Budaya Positif' }
      ];
    } else if (sessionName?.includes('Sesi 7')) {
      return [
        ...baseColumns,
        { key: 'ceritaInspiratif', label: 'Cerita Inspiratif' },
        { key: 'refleksiDiri', label: 'Refleksi Diri' },
        { key: 'sharingPengalaman', label: 'Sharing Pengalaman' }
      ];
    } else if (sessionName?.includes('Sesi 8')) {
      return [
        ...baseColumns,
        { key: 'postTest', label: 'Post-Test' },
        { key: 'refleksiProgram', label: 'Refleksi Program' },
        { key: 'komitmenMasaDepan', label: 'Komitmen Masa Depan' }
      ];
    }

    return baseColumns;
  };

  if (loading) {
    return (
      <AdminLayout title="Loading...">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!sessionInfo) {
    return (
      <AdminLayout title="Session Not Found">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Session Not Found</h2>
          <p className="text-gray-600 mb-6">The requested session could not be found.</p>
          <Link href="/admin" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <ArrowLeft size={20} className="mr-2" />
            Back to Admin Dashboard
          </Link>
        </div>
      </AdminLayout>
    );
  }

  const columns = getColumns(sessionInfo.nama_sesi);

  return (
    <AdminLayout title={sessionInfo.nama_sesi}>
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center space-x-4">
          <Link href="/admin" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Link>
        </div>

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
              <Calendar size={24} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {sessionInfo.nama_sesi}
              </h2>
              <p className="text-gray-600 mb-4">
                {sessionInfo.deskripsi}
              </p>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <SessionTable
          data={data}
          columns={columns}
          title={`Data Jawaban ${sessionInfo.nama_sesi}`}
          searchPlaceholder="Cari berdasarkan nama, kelas, atau jawaban..."
          exportFileName={`sesi-${id}-${sessionInfo.nama_sesi.toLowerCase().replace(/\s+/g, '-')}`}
        />
      </div>
    </AdminLayout>
  );
}