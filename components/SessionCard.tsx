import Link from 'next/link';
import { Clock, Users, Target } from 'lucide-react';
import type { Session } from '@/lib/sessions';

interface SessionCardProps {
  session: Session;
}

export default function SessionCard({ session }: SessionCardProps) {
  return (
    <Link href={`/sesi/${session.slug}`}>
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 p-6 group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
              <span className="text-blue-600 font-bold text-lg">{session.id}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {session.title}
              </h3>
              <div className="flex items-center space-x-1 text-sm text-gray-500 mt-1">
                <Clock size={14} />
                <span>{session.duration}</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {session.description}
        </p>
        
        <div className="space-y-3">
          <div>
            <div className="flex items-center space-x-1 text-xs font-medium text-gray-700 mb-2">
              <Target size={12} />
              <span>Tujuan Pembelajaran:</span>
            </div>
            <ul className="text-xs text-gray-600 space-y-1">
              {session.objectives.slice(0, 2).map((objective, index) => (
                <li key={index} className="flex items-start space-x-1">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{objective}</span>
                </li>
              ))}
              {session.objectives.length > 2 && (
                <li className="text-gray-500 italic">
                  +{session.objectives.length - 2} tujuan lainnya
                </li>
              )}
            </ul>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Users size={12} />
              <span>{session.activities.length} aktivitas</span>
            </div>
            <div className="text-xs text-blue-600 font-medium group-hover:text-blue-700">
              Mulai Sesi →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}