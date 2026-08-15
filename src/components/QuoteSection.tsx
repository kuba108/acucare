'use client';

import React from 'react';
import { Quote, Fingerprint, Heart, Sparkles } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { AcupressurePoint } from '@/data/pointsData';

interface QuoteSectionProps {
  onSearchChange: (query: string, results: AcupressurePoint[]) => void;
}

export function QuoteSection({ onSearchChange }: QuoteSectionProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative z-20 w-full min-h-[480px] flex items-center justify-center py-12 px-container-padding bg-surface border-b border-outline-variant/20">
        <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Quote Block - Smaller style */}
          <div className="mb-4">
            <Quote className="w-10 h-10 text-primary/30 mb-2 mx-auto rotate-180" />
          </div>
          <p className="text-sm sm:text-base md:text-lg italic font-headline text-primary/80 max-w-2xl leading-relaxed mb-8">
            „Až příliš často podceňujeme moc dotyku, úsměvu, laskavého slova, naslouchajícího ucha, upřímné poklony nebo sebemenšího projevu péče, i když mají schopnost převrátit život vzhůru nohama.“
          </p>
          
          {/* Search Header Label */}
          <h2 className="text-headline-md font-headline text-primary mb-3">
            Co Vás trápí?
          </h2>
          
          {/* Search Input directly in Hero */}
          <div className="w-full max-w-xl">
            <SearchBar onSearchChange={onSearchChange} />
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="w-full py-section-gap px-container-padding bg-surface-bright">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-headline-md font-headline text-on-surface mb-4">Cesta k přirozené rovnováze</h2>
            <p className="text-body-lg font-body text-on-surface-variant max-w-2xl mx-auto">
              Objevte sílu akupresury. Jemný tlak na specifické body může podpořit samoléčebné procesy vašeho těla.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter lg:gap-12">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest rounded-xl p-8 soft-shadow hover-lift flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-6 text-primary">
                <Fingerprint className="w-8 h-8" />
              </div>
              <h3 className="text-headline-md font-headline text-on-surface text-xl mb-3">Dotyk</h3>
              <p className="text-body-md font-body text-on-surface-variant">
                Lokalizujte správné akupresurní body na vašem těle s pomocí našich přehledných map a instrukcí.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-surface-container-lowest rounded-xl p-8 soft-shadow hover-lift flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-6 text-primary">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-headline-md font-headline text-on-surface text-xl mb-3">Léčení</h3>
              <p className="text-body-md font-body text-on-surface-variant">
                Aplikujte jemný, ale pevný tlak pro uvolnění napětí, zmírnění bolesti a podporu krevního oběhu.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-surface-container-lowest rounded-xl p-8 soft-shadow hover-lift flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-6 text-primary">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-headline-md font-headline text-on-surface text-xl mb-3">Rovnováha</h3>
              <p className="text-body-md font-body text-on-surface-variant">
                Obnovte tok energie a dosáhněte harmonie těla i mysli prostřednictvím pravidelné praxe.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
