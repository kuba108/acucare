'use client';

import React from 'react';
import Link from 'next/link';
import { QuoteSection } from '@/components/QuoteSection';
import { ACUPRESSURE_POINTS } from '@/data/pointsData';
import { ArrowRight, Moon, Sparkles, Quote } from 'lucide-react';

export default function HomePage() {
  // Featured point for bento grid (LI4 Hegu)
  const featuredPoint = ACUPRESSURE_POINTS.find(p => p.code === 'LI 4') || ACUPRESSURE_POINTS[0];

  return (
    <main className="flex-grow">
      {/* Hero (Search + How It Works) */}
      <QuoteSection onSearchChange={() => {}} />

      {/* Featured Insight (Bento Grid) */}
      <section className="w-full py-section-gap px-container-padding bg-surface border-t border-outline-variant/10">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[250px]">
            {/* Main Featured */}
            <Link
              href={`/bod/${featuredPoint.id}`}
              className="md:col-span-8 row-span-2 rounded-[24px] bg-surface-container-lowest soft-shadow overflow-hidden group relative flex"
            >
              <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center relative z-10 bg-surface-container-lowest">
                <span className="inline-block px-3 py-1 bg-surface-container-low text-primary text-label-md font-body rounded-full w-max mb-4">
                  Doporučeno
                </span>
                <h3 className="text-headline-lg font-headline text-primary mb-4">
                  Bod {featuredPoint.code} ({featuredPoint.pinyinName})
                </h3>
                <p className="text-body-md font-body text-on-surface-variant mb-6 line-clamp-3">
                  {featuredPoint.summary}
                </p>
                <span className="text-primary text-label-md font-body font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Zobrazit detail <ArrowRight className="w-[18px] h-[18px]" />
                </span>
              </div>
            </Link>

            {/* Secondary 1 */}
            <Link
              href="/symptom/stres-uzkost"
              className="md:col-span-4 row-span-1 rounded-[24px] bg-secondary-container p-6 flex flex-col justify-between hover-lift cursor-pointer relative overflow-hidden"
            >
              <div className="relative z-10">
                <h4 className="text-headline-md font-headline text-on-secondary-container mb-2 text-lg">
                  Úleva od stresu
                </h4>
                <p className="text-body-md font-body text-on-secondary-container/80 line-clamp-2">
                  Zklidněte svou mysl sérií jednoduchých bodů.
                </p>
              </div>
              <div className="relative z-10 flex justify-end mt-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest/50 flex items-center justify-center text-secondary">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>
            </Link>

            {/* Secondary 2 */}
            <Link
              href="/symptom/nespavost-spanek"
              className="md:col-span-4 row-span-1 rounded-[24px] bg-primary-container p-6 flex flex-col justify-between hover-lift cursor-pointer relative overflow-hidden"
            >
              <div className="relative z-10">
                <h4 className="text-headline-md font-headline text-on-primary-container mb-2 text-lg">
                  Lepší spánek
                </h4>
                <p className="text-body-md font-body text-on-primary-container/80 line-clamp-2">
                  Podpořte hluboký a regenerační odpočinek.
                </p>
              </div>
              <div className="relative z-10 flex justify-end mt-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest/20 flex items-center justify-center text-on-primary-container">
                  <Moon className="w-6 h-6" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

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
