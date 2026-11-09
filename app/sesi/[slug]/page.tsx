import { notFound } from 'next/navigation';
import SessionLayout from '@/components/SessionLayout';
import ActivityCard from '@/components/ActivityCard';
import { getSessionBySlug, sessions } from '@/lib/sessions';

interface SessionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { slug } = await params;
  const session = getSessionBySlug(slug);

  if (!session) {
    notFound();
  }

  const currentIndex = sessions.findIndex((s) => s.id === session.id);
  const prevSession = currentIndex > 0 ? sessions[currentIndex - 1] : null;
  const nextSession = currentIndex < sessions.length - 1 ? sessions[currentIndex + 1] : null;

  return (
    <SessionLayout
      sessionId={session.id}
      sessionTitle={session.title}
      sessionDescription={session.description}
      duration={session.duration}
      objectives={session.objectives}
      prevSession={prevSession}
      nextSession={nextSession}
    >
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-neutral-900 mb-2">Aktivitas Pembelajaran</h2>
        <p className="text-neutral-600">Ikuti setiap aktivitas secara berurutan untuk mendapatkan pemahaman yang optimal.</p>
      </div>

      <div className="space-y-6">
        {session.activities.map((activity, index) => (
          <ActivityCard key={activity.id} activity={activity} index={index} />
        ))}
      </div>
    </SessionLayout>
  );
}

export async function generateStaticParams() {
  return sessions.map((session) => ({
    slug: session.slug,
  }));
}
