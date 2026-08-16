'use client';

import React from 'react';
import { QuoteSection } from '@/components/QuoteSection';
import { Quote } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex-grow">
      {/* Hero (Search + How It Works) */}
      <QuoteSection onSearchChange={() => {}} />

      {/* Inspirational Quote Section (Placed gracefully above footer) */}
      <section className="w-full py-16 md:py-20 px-container-padding bg-surface-container-low/60 border-t border-outline-variant/20">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <Quote className="w-10 h-10 text-primary/30 mb-4 rotate-180" />
          <blockquote className="text-base sm:text-lg md:text-xl italic font-headline text-primary/90 leading-relaxed mb-4">
            „Až příliš často podceňujeme moc dotyku, úsměvu, laskavého slova, naslouchajícího ucha, upřímné poklony nebo sebemenšího projevu péče, i když mají schopnost převrátit život vzhůru nohama.“
          </blockquote>
          <cite className="text-label-md font-body text-secondary uppercase tracking-widest font-semibold not-italic">
            — Leo F. Buscaglia
          </cite>
        </div>
      </section>
    </main>
  );
}
