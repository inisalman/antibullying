'use client';

interface ProgressBarProps {
  current: number;
  total: number;
  onPrev?: () => void;
  onNext?: () => void;
  canGoNext?: boolean;
  canGoPrev?: boolean;
}

export default function ProgressBar({
  current,
  total,
  onPrev,
  onNext,
  canGoNext = true,
  canGoPrev = true,
}: ProgressBarProps) {
  const percent = Math.round(((current + 1) / total) * 100);

  return (
    <div
      className="learning-progress bg-white rounded-lg border border-neutral-200 p-4"
      role="group"
      aria-label="Navigasi aktivitas"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-neutral-700">
            Kegiatan {current + 1} dari {total}
          </span>
        </div>

        {(onPrev || onNext) && (
          <div className="flex items-center gap-2">
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                disabled={!canGoPrev}
                className="px-3 py-1.5 text-sm font-medium bg-neutral-100 text-neutral-700 rounded-md hover:bg-neutral-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 focus-ring"
              >
                Sebelumnya
              </button>
            )}
            {onNext && (
              <button
                type="button"
                onClick={onNext}
                disabled={!canGoNext}
                className="px-3 py-1.5 text-sm font-medium bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-200 focus-ring"
              >
                Selanjutnya
              </button>
            )}
          </div>
        )}
      </div>

      <div
        className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${percent}% selesai`}
      >
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
