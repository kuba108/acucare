'use client';

import React from 'react';
import Link from 'next/link';
import { Quote, ArrowRight, Search, Fingerprint, Heart, Sparkles } from 'lucide-react';

export function QuoteSection() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[500px] flex items-center justify-center py-section-gap px-container-padding overflow-hidden bg-surface">
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="mb-8">
            <Quote className="w-16 h-16 text-primary/40 mb-4 mx-auto rotate-180" />
          </div>
          <h1 className="text-headline-lg-mobile md:text-headline-xl font-headline text-primary mb-10 max-w-3xl leading-snug">
            &quot;Až příliš často podceňujeme moc dotyku, úsměvu, laskavého slova, naslouchajícího ucha, upřímné poklony nebo sebemenšího projevu péče, i když mají schopnost převrátit život vzhůru nohama.&quot;
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center mt-4">
            <Link
              href="#katalog"
              className="bg-primary text-on-primary px-8 py-4 rounded-full text-label-md font-body hover:bg-primary/90 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Prozkoumat body</span>
              <ArrowRight className="w-[18px] h-[18px]" />
            </Link>
            <Link
              href="#symptomy"
              className="bg-surface text-primary border border-secondary px-8 py-4 rounded-full text-label-md font-body hover:bg-surface-container-low transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Search className="w-[18px] h-[18px]" />
              <span>Hledat podle potíží</span>
            </Link>
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
