import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from './ThemeProvider'
import { AuthProvider } from '@/contexts/AuthContext'
import { Toaster } from 'sonner'
import React from 'react'

const inter = Inter({ 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  weight: ['600', '700', '900'],
  subsets: ['latin'],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'Amigos IAS - UPSC Coaching Excellence',
  description: 'Transform Your Dreams into Reality with India\'s Premier IAS Academy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const setThemeScript = `(() => {
    try {
      var t = localStorage.getItem('theme');
      if (!t) {
        // Force light as default so the special design shows immediately
        t = 'light';
      }
      document.documentElement.setAttribute('data-theme', t);
      if (t === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();`
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: setThemeScript }} />
      </head>
      <body className={`${inter.variable} ${playfair.variable}`}>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
