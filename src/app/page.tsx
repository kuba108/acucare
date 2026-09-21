'use client';

import React from 'react';
import { QuoteSection } from '@/components/QuoteSection';
import { LocationsMap } from '@/components/LocationsMap';
import { Quote } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="flex-grow">
      {/* Hero (Search + How It Works) */}
      <QuoteSection onSearchChange={() => {}} />

      {/* Measuring & Sales Locations Container on HP */}
      <LocationsMap />

      {/* Inspirational Quote Section (Placed gracefully above footer) */}
      <section className="w-full py-16 md:py-20 px-container-padding bg-surface-container-low/60 border-t border-outline-variant/20">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <Quote className="w-10 h-10 text-primary/30 mb-4 rotate-180" />
          <blockquote className="text-base sm:text-lg md:text-xl italic font-headline text-primary/90 leading-relaxed mb-4">TROMBOCYTY</blockquote>
          <blockquote className="text-base sm:text-lg md:text-xl italic font-headline text-primary/90 leading-relaxed mb-4">
            „vytvářejí tepelnou energii v našem organismu působením vnějšího IR záření, se kterým jsou v rezonanci, tím dochází ke kmitání palečků a tvorbě tepla.“
          </blockquote>
          <cite className="text-label-md font-body text-secondary uppercase tracking-widest font-semibold not-italic">
            Ing. Eugeniusz Motyka
          </cite>
        </div>
      </section>
    </main>
  );
}
