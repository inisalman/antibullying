'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';

interface SessionLayoutProps {
  sessionId: number;
  sessionTitle: string;
  sessionDescription: string;
  duration: string;
  objectives: string[];
  children: ReactNode;
  prevSession?: { id: number; title: string; slug: string } | null;
  nextSession?: { id: number; title: string; slug: string } | null;
}

export default function SessionLayout({
  sessionId,
  sessionTitle,
  sessionDescription,
  duration,
  objectives,
  children,
  prevSession,
  nextSession,
}: SessionLayoutProps) {
  return (
    <div className="session-page min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-primary-600 text-sm font-medium mb-3 no-underline transition-colors duration-200 focus-ring rounded-md"
          >
            <ArrowLeft size={16} />
            Kembali
          </Link>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-primary-700 font-bold text-lg">{sessionId}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <h1 className="text-xl md:text-2xl font-bold text-neutral-900 break-words">
                  {sessionTitle}
                </h1>
                <div className="flex-shrink-0 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 bg-neutral-100 px-3 py-1 rounded-full whitespace-nowrap">
                  <Clock size={14} />
                  {duration}
                </div>
              </div>
              <p className="text-neutral-600 text-sm leading-relaxed mt-1">
                {sessionDescription}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="font-semibold text-neutral-900 text-sm uppercase tracking-wide mb-3">
                Tujuan Pembelajaran
              </h3>
              <ul className="space-y-2.5">
                {objectives.map((objective, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      size={16}
                      className="text-primary-600 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-neutral-700 text-sm leading-relaxed">
                      {objective}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="session-info bg-primary-50 rounded-lg p-5 border border-primary-100">
              <h3 className="font-semibold text-neutral-900 text-sm uppercase tracking-wide mb-4">
                Info Sesi
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Durasi</span>
                  <span className="font-medium text-neutral-900">{duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Nomor</span>
                  <span className="font-medium text-neutral-900">
                    {sessionId} dari 8
                  </span>
                </div>
              </div>
            </div>
          </div>

          {children}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="bg-white border-t border-neutral-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {prevSession ? (
              <Link
                href={`/sesi/${prevSession.slug}`}
                className="flex items-center gap-3 text-neutral-600 hover:text-primary-600 no-underline transition-colors duration-200 focus-ring rounded-md px-2"
              >
                <ArrowLeft size={18} />
                <div className="text-left">
                  <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Sesi Sebelumnya
                  </div>
                  <div className="font-semibold text-neutral-900">
                    Sesi {prevSession.id}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextSession ? (
              <Link
                href={`/sesi/${nextSession.slug}`}
                className="flex items-center gap-3 text-neutral-600 hover:text-primary-600 no-underline transition-colors duration-200 focus-ring rounded-md px-2"
              >
                <div className="text-right">
                  <div className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                    Sesi Selanjutnya
                  </div>
                  <div className="font-semibold text-neutral-900">
                    Sesi {nextSession.id}
                  </div>
                </div>
                <ArrowRight size={18} />
              </Link>
            ) : (
              <Link
                href="/"
                className="flex items-center gap-2 bg-primary-600 text-white hover:bg-primary-700 px-5 py-2.5 rounded-lg font-medium text-sm no-underline transition-colors duration-200 focus-ring"
              >
                Kembali ke Beranda
              </Link>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
