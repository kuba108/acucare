import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'AcuCare - Akupresurní Body',
  description: 'Zadejte své potíže (bolest zad, migréna, nespavost, zažívání, kašel) a objevte konkrétní akupresurní body. Průvodce tradiční akupresurou s návody a vizualizacemi.',
  keywords: ['akupresurní body', 'akupresura', 'bolest zad', 'bolest hlavy', 'tradiční čínská medicína', 'léčivý průvodce', 'masáž bodů'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Merriweather:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-surface text-on-surface min-h-screen flex flex-col justify-between">
        <div>
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
