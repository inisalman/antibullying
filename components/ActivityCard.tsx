'use client';

import { Play, FileText, ClipboardList, MessageSquare, ExternalLink, Users, Calendar, BookOpen } from 'lucide-react';
import type { Activity } from '@/lib/sessions';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import LearningVideo from './LearningVideo';

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

// Single accent color per semantic role, not per-type rainbow.
// Instructional content = primary (teal), interactive input = accent (green), reflective = neutral-warm.
const activityStyle: Record<Activity['type'], { badge: string; label: string }> = {
  video: { badge: 'activity-badge-video', label: 'Video' },
  quiz: { badge: 'activity-badge-quiz', label: 'Kuis' },
  form: { badge: 'activity-badge-form', label: 'Formulir' },
  reflection: { badge: 'activity-badge-reflection', label: 'Refleksi' },
  reading: { badge: 'activity-badge-reading', label: 'Bacaan' },
  icebreaker: { badge: 'activity-badge-icebreaker', label: 'Ice Breaking' },
  schedule: { badge: 'activity-badge-schedule', label: 'Jadwal' },
  pretest: { badge: 'activity-badge-pretest', label: 'Pre-Test' },
};

export default function ActivityCard({ activity, index, children }: ActivityCardProps) {
  const Icon = activityIcons[activity.type] || FileText;
  const style = activityStyle[activity.type] || { badge: 'activity-badge-reading', label: 'Bacaan' };

  const handleClick = () => {
    if (activity.url) {
      window.open(activity.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="card-base p-6 animate-fade-in">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary-50 border border-primary-100 flex items-center justify-center">
          <Icon size={19} className="text-primary-600" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h4 className="font-semibold text-neutral-900">{activity.title}</h4>
            {activity.duration && (
              <span className="flex-shrink-0 text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-1 rounded-full whitespace-nowrap">
                {activity.videos?.length ? `Alokasi ${activity.duration}` : activity.duration}
              </span>
            )}
          </div>

          <p className="text-neutral-600 text-sm mb-4 leading-relaxed">{activity.description}</p>

          {activity.videos?.map((video) => <LearningVideo key={video.id} video={video} />)}

          {activity.content && (
            <div className="space-y-4 text-neutral-700 mb-5 leading-relaxed">
              {activity.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          )}
          {children && <div className="mb-4">{children}</div>}

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className={cn('activity-badge', style.badge)}>{style.label}</span>
              <span className="text-xs text-neutral-400">Aktivitas {index + 1}</span>
            </div>

            {activity.url ? (
              <button
                onClick={handleClick}
                className="inline-flex items-center gap-1.5 text-primary-600 hover:text-primary-700 text-sm font-medium focus-ring rounded-md"
              >
                Buka
                <ExternalLink size={14} />
              </button>
            ) : !children && !activity.content?.length && !activity.videos?.length ? (
              <span className="text-neutral-400 text-sm">Segera tersedia</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
