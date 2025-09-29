import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Target, CircleCheck as CheckCircle2 } from 'lucide-react';
import { getSessionBySlug, sessions } from '@/lib/sessions';
import ActivityCard from '@/components/ActivityCard';

interface SessionPageProps {
  params: {
    slug: string;
  };
}

export default function SessionPage({ params }: SessionPageProps) {
  const session = getSessionBySlug(params.slug);
  
  if (!session) {
    notFound();
  }

  const currentIndex = sessions.findIndex(s => s.id === session.id);
  const prevSession = currentIndex > 0 ? sessions[currentIndex - 1] : null;
  const nextSession = currentIndex < sessions.length - 1 ? sessions[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Session Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link 
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <ArrowLeft size={20} className="mr-2" />
              Kembali ke Beranda
            </Link>
          </div>

          <div className="flex items-start space-x-6">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-blue-600 font-bold text-2xl">{session.id}</span>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{session.title}</h1>
                <div className="flex items-center space-x-1 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  <Clock size={14} />
                  <span>{session.duration}</span>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg mb-6">{session.description}</p>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-2 mb-3">
                    <Target size={18} className="text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Tujuan Pembelajaran</h3>
                  </div>
                  <ul className="space-y-2">
                    {session.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Info Sesi</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Durasi:</span>
                      <span className="font-medium text-gray-900">{session.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Aktivitas:</span>
                      <span className="font-medium text-gray-900">{session.activities.length} aktivitas</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Sesi:</span>
                      <span className="font-medium text-gray-900">{session.id} dari {sessions.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activities Section */}
      <div className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Aktivitas Pembelajaran</h2>
            <p className="text-gray-600">
              Ikuti setiap aktivitas secara berurutan untuk mendapatkan pemahaman yang optimal.
            </p>
          </div>

          <div className="space-y-6">
            {session.activities.map((activity, index) => (
              <ActivityCard 
                key={activity.id} 
                activity={activity} 
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {prevSession ? (
              <Link 
                href={`/sesi/${prevSession.slug}`}
                className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <ArrowLeft size={20} className="mr-2" />
                <div className="text-left">
                  <div className="text-sm text-gray-500">Sesi Sebelumnya</div>
                  <div className="font-medium">Sesi {prevSession.id}: {prevSession.title}</div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}

            {nextSession ? (
              <Link 
                href={`/sesi/${nextSession.slug}`}
                className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <div className="text-right">
                  <div className="text-sm text-gray-500">Sesi Selanjutnya</div>
                  <div className="font-medium">Sesi {nextSession.id}: {nextSession.title}</div>
                </div>
                <ArrowRight size={20} className="ml-2" />
              </Link>
            ) : (
              <Link 
                href="/"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200 bg-blue-50 px-4 py-2 rounded-lg"
              >
                <CheckCircle2 size={20} className="mr-2" />
                Program Selesai
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return sessions.map((session) => ({
    slug: session.slug,
  }));
}