'use client';

import Link from 'next/link';
import { Chrome as Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-blue-600">404</span>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Halaman Tidak Ditemukan
        </h1>
        
        <p className="text-gray-600 mb-8 max-w-md">
          Maaf, halaman yang Anda cari tidak dapat ditemukan. 
          Mungkin URL salah atau halaman telah dipindahkan.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Home size={20} />
            <span>Kembali ke Beranda</span>
          </Link>
          
          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <ArrowLeft size={16} />
              <span>Kembali ke Halaman Sebelumnya</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}