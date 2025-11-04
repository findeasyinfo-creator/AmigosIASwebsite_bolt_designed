import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileFAB from '@/components/MobileFAB';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Amigos IAS Academy - Your UPSC Journey Starts Here',
  description:
    'Professional UPSC coaching academy offering comprehensive preparation, expert faculty, current affairs, and proven results.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="pt-20 min-h-screen">{children}</main>
        <Footer />
        <MobileFAB />
      </body>
    </html>
  );
}
