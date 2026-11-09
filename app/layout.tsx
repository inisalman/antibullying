import './globals.css';
import type { Metadata } from 'next';
import { Nunito_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const nunito = Nunito_Sans({
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'Program Pencegahan Bullying - Modul Intervensi Konseling Daring',
  description: 'Modul intervensi konseling daring yang dirancang khusus untuk siswa SMP dalam mencegah dan mengatasi bullying di lingkungan sekolah.',
  keywords: ['bullying', 'pencegahan', 'konseling', 'siswa', 'SMP', 'pendidikan'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={nunito.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
