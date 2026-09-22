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

      {/* Motto & Inspirational Quotes Section */}
      <section className="w-full py-16 md:py-20 px-container-padding bg-surface-container-low/60 border-t border-outline-variant/20">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <Quote className="w-10 h-10 text-primary/30 mb-6 rotate-180" />

          <span className="text-secondary font-body text-label-md uppercase tracking-widest mb-6 font-semibold">
            Motto:
          </span>

          <div className="space-y-6 max-w-3xl">
            <blockquote className="text-lg sm:text-xl md:text-2xl font-headline text-primary font-bold leading-relaxed">
              „Bez rezonance by nedošlo ke vzniku a záměně jakékoliv energie.“
            </blockquote>

            <div className="w-16 h-0.5 bg-[#50aab2]/30 mx-auto my-2" />

            <blockquote className="text-base sm:text-lg md:text-xl font-headline text-primary/90 leading-relaxed">
              „Žijeme na základě fyzikálních nedokonalostí{' '}
              <span className="inline-block text-[1.5em] font-bold text-[#50aab2] align-baseline">η</span>{' '}
              <span className="text-[0.7em] text-[#50aab2] font-medium uppercase tracking-wider">(ETA)</span>“
            </blockquote>

            <blockquote className="text-base sm:text-lg md:text-xl font-headline text-primary/90 leading-relaxed">
              „Trombocyty vytvářejí tepelnou energii v našem organismu.“
            </blockquote>

            <blockquote className="text-base sm:text-lg md:text-xl font-headline text-primary/90 italic leading-relaxed">
              „Fyzika je matematikou života.“
            </blockquote>
          </div>
        </div>
      </section>
    </main>
  );
}
