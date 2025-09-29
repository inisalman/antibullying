'use client';

import { Play, FileText, ClipboardList, MessageSquare, ExternalLink, Users, Calendar, BookOpen } from 'lucide-react';
import type { Activity } from '@/lib/sessions';
import { ReactNode } from 'react';

interface ActivityCardProps {
  activity: Activity;
  index: number;
  children?: ReactNode;
}

const activityIcons = {
  video: Play,
  quiz: ClipboardList,
  form: FileText,
  reflection: MessageSquare,
  reading: FileText,
  icebreaker: Users,
  schedule: Calendar,
  pretest: BookOpen,
};

const activityColors = {
  video: 'bg-red-100 text-red-600 border-red-200',
  quiz: 'bg-green-100 text-green-600 border-green-200',
  form: 'bg-blue-100 text-blue-600 border-blue-200',
  reflection: 'bg-purple-100 text-purple-600 border-purple-200',
  reading: 'bg-orange-100 text-orange-600 border-orange-200',
  icebreaker: 'bg-pink-100 text-pink-600 border-pink-200',
  schedule: 'bg-indigo-100 text-indigo-600 border-indigo-200',
  pretest: 'bg-amber-100 text-amber-600 border-amber-200',
};

export default function ActivityCard({ activity, index, children }: ActivityCardProps) {
  const Icon = activityIcons[activity.type] || FileText;
  const colorClass = activityColors[activity.type] || 'bg-gray-100 text-gray-600 border-gray-200';

  const handleClick = () => {
    if (activity.url) {
      window.open(activity.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className={`w-12 h-12 rounded-lg border-2 flex items-center justify-center ${colorClass}`}>
            <Icon size={20} />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-gray-900">{activity.title}</h4>
            {activity.duration && (
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {activity.duration}
              </span>
            )}
          </div>
          
          <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
          
          {/* Custom content area */}
          {children && (
            <div className="mb-4">
              {children}
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-500">
                Aktivitas {index + 1}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500 capitalize">
                {activity.type === 'video' ? 'Video' : 
                 activity.type === 'quiz' ? 'Kuis' :
                 activity.type === 'form' ? 'Formulir' :
                 activity.type === 'reflection' ? 'Refleksi' : 
                 activity.type === 'icebreaker' ? 'Ice Breaking' :
                 activity.type === 'schedule' ? 'Jadwal' :
                 activity.type === 'pretest' ? 'Pre-Test' : 'Bacaan'}
              </span>
            </div>
            
            {activity.url ? (
              <button
                onClick={handleClick}
                className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <span>Buka</span>
                <ExternalLink size={14} />
              </button>
            ) : (
              <span className="text-gray-400 text-sm">Segera tersedia</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}