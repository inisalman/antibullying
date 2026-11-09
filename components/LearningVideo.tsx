import type { LearningVideo as LearningVideoData } from '@/lib/learningVideos';

export default function LearningVideo({ video }: { video: LearningVideoData }) {
  return (
    <figure className="my-5">
      <div className="aspect-video overflow-hidden rounded-lg border-2 border-neutral-900 bg-neutral-100">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`}
          title={video.title}
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <figcaption className="mt-3 text-sm text-neutral-600">
        <p className="font-semibold text-neutral-900">{video.title}</p>
        <p>Sumber: {video.source}</p>
        <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer" className="inline-block py-2 underline">Tonton di YouTube ↗</a>
        <p className="text-xs">Kalau pemutar tidak tersedia, buka tautan YouTube di atas.</p>
      </figcaption>
    </figure>
  );
}
