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
      {/* Hero Section with Background Image */}
      <section className="relative z-30 w-full min-h-[460px] md:min-h-[520px] flex items-center justify-center py-16 md:py-24 px-container-padding border-b border-outline-variant/20">
        {/* Background Image & Ambient Overlay */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        >
          <div className="absolute inset-0 bg-surface/75 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-20 w-full max-w-2xl mx-auto flex flex-col items-center">
          {/* Search Input directly in Hero */}
          <div className="w-full">
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
