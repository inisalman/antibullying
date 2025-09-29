import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AB</span>
            </div>
            <span className="font-semibold text-gray-900">Program Pencegahan Bullying</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">
            Modul intervensi konseling daring untuk siswa SMP
          </p>
          
          <div className="flex items-center justify-center space-x-1 text-gray-500 text-sm">
            <span>Dibuat dengan</span>
            <Heart size={16} className="text-red-500" />
            <span>untuk pendidikan yang bebas bullying</span>
          </div>
          
          <div className="mt-4 text-gray-400 text-xs">
            © 2025 Program Pencegahan Bullying. Semua hak dilindungi.
          </div>
        </div>
      </div>
    </footer>
  );
}