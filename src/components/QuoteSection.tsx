'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Fingerprint, Heart, Sparkles, Activity, ChevronRight, X } from 'lucide-react';
import { SYMPTOM_OPTIONS } from '@/data/symptomsData';

interface QuoteSectionProps {
  onSearchChange?: (query: string, results: any[]) => void;
}

export function QuoteSection({ onSearchChange }: QuoteSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Close modal on Escape key and prevent body scroll when open
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    }

    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      {/* Hero Section with Background Image */}
      <section className="relative z-30 w-full min-h-[460px] md:min-h-[520px] flex items-center justify-center py-16 md:py-24 px-container-padding border-b border-outline-variant/20">
        {/* Background Image & Ambient Overlay */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden bg-cover bg-center"
          style={{ backgroundImage: "url('/hp.jpg')" }}
        >
          <div className="absolute inset-0 bg-surface/75 backdrop-blur-[1px]"></div>
        </div>

        <div className="relative z-20 w-full max-w-2xl mx-auto flex flex-col items-center">
          {/* Hero Motto */}
          <div className="text-center mb-8 md:mb-10 max-w-xl">
            <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl text-[#50aab2] tracking-tight font-bold leading-tight">
              Podstata lidské existence
            </h1>
            <p className="font-headline text-2xl sm:text-3xl md:text-4xl text-[#50aab2] tracking-tight font-bold leading-tight">
              objev
            </p>
            <p className="font-headline text-2xl sm:text-3xl md:text-4xl text-[#50aab2] tracking-tight font-bold leading-tight">
              <em>Rezonanční vlna je energií života</em><sup className="text-xs sm:text-sm font-bold ml-1 align-super">®</sup>
            </p>
            <p className="mt-3 text-sm sm:text-base font-body text-[#50aab2] font-semibold tracking-wide">
              — Ing. Eugeniusz Motyka
            </p>
          </div>

          {/* Button: Časté potíže a témata */}
          <div className="w-full max-w-xl mx-auto">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-surface-container-lowest hover:bg-[#eaf5f6] rounded-full border-2 border-[#50aab2] shadow-[0_4px_24px_rgba(80,170,178,0.12)] hover:shadow-[0_6px_30px_rgba(80,170,178,0.22)] py-4 sm:py-4.5 px-6 sm:px-8 text-base sm:text-lg font-headline font-bold text-[#50aab2] flex items-center justify-between transition-all duration-200 cursor-pointer group hover:scale-[1.01] active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-[#50aab2] group-hover:scale-110 transition-transform" />
                <span>Časté potíže a témata</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#50aab2] text-white flex items-center justify-center group-hover:translate-x-1 transition-transform shadow-xs">
                <ChevronRight className="w-5 h-5 text-white" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Modal Dialog for Časté potíže a témata */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop blur overlay */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content Box */}
          <div className="relative bg-surface-container-lowest rounded-[28px] p-6 sm:p-8 md:p-10 max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-outline-variant/30 z-10 space-y-6 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#d6f2f5] text-[#24656b] flex items-center justify-center shrink-0 shadow-xs">
                  <Activity className="w-6 h-6 text-[#50aab2]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-headline font-bold text-[#50aab2]">
                    Časté potíže a témata
                  </h3>
                  <p className="text-xs sm:text-sm font-body text-on-surface-variant mt-0.5">
                    Vyberte zdravotní téma pro zobrazení doporučených akupresurních bodů
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full text-outline hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
                title="Zavřít"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Symptom options pills matching the reference screenshot */}
            <div className="flex flex-wrap gap-3 sm:gap-3.5 pt-2">
              {SYMPTOM_OPTIONS.map((symptom) => (
                <Link
                  key={symptom.id}
                  href={`/potize/${symptom.id}`}
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-surface-container hover:bg-[#50aab2] hover:text-white text-on-surface font-body text-sm sm:text-base font-semibold transition-all border border-outline-variant/30 shadow-xs group cursor-pointer hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
                >
                  <span>{symptom.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#50aab2] group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* How it works Section */}
      <section className="w-full py-section-gap px-container-padding bg-surface-bright">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-headline-md font-headline text-on-surface mb-4">Cesta k přirozené rovnováze</h2>
            <p className="text-body-lg font-body text-on-surface-variant max-w-2xl mx-auto">
              Objevte sílu aktivace specifických energetických bodů, které podporují samoléčebné procesy vašeho těla.
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
                Lokalizujte správné energetické body na vašem těle s pomocí našich přehledných map a instrukcí.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-surface-container-lowest rounded-xl p-8 soft-shadow hover-lift flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-6 text-primary">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-headline-md font-headline text-on-surface text-xl mb-3">Aktivní stimulace bodů</h3>
              <p className="text-body-md font-body text-on-surface-variant">
                Aplikujte HALM® chip pro zmírnění bolesti.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-surface-container-lowest rounded-xl p-8 soft-shadow hover-lift flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mb-6 text-primary">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-headline-md font-headline text-on-surface text-xl mb-3">Rovnováha</h3>
              <p className="text-body-md font-body text-on-surface-variant">
                Obnovte tok energie a dosáhněte harmonie těla i mysli prostřednictvím pravidelné aktivace stimulačních bodů.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
