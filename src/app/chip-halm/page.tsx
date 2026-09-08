'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  Zap,
  RotateCw,
  ArrowRight,
  CheckCircle2,
  Award,
  Layers,
  Activity,
  ChevronRight
} from 'lucide-react';

export default function ChipHalmPage() {
  // State for interactive double-sided chip preview ('gold' | 'green')
  const [flippedSide, setFlippedSide] = useState<'gold' | 'green'>('gold');

  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-container-padding py-12 md:py-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[#50aab2] font-body text-label-md uppercase tracking-widest mb-3 inline-block font-semibold">
          Patentovaná technologie
        </span>
        <h1 className="text-headline-lg-mobile md:text-headline-xl font-headline text-[#50aab2] mb-6">
          Akupresurní chip HALM®
        </h1>
        <p className="text-body-lg font-body text-on-surface-variant leading-relaxed">
          Český patentovaný akupresurní chip <strong>HALM® (Patent No. 24128)</strong> představuje šetrnou, 
          neinvazivní alternativu k tradiční akupunkturní jehle. Pomocí cíleného působení harmonizuje 
          tok energie čchi v meridiánech.
        </p>
      </div>

      {/* Section 1: Patent Emblem & Overview Card */}
      <div className="bg-surface-container-lowest rounded-[28px] p-8 md:p-12 soft-shadow border border-outline-variant/30 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* SVG Vector Emblem of HALM Patent with Metallic Gold Border */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full p-3 bg-gradient-to-br from-[#f3e5ab] via-[#d4af37] to-[#996515] shadow-xl flex items-center justify-center group hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-full bg-[#004f45] flex flex-col items-center justify-center p-6 text-center text-white border-2 border-[#f3e5ab]/60 relative overflow-hidden">
                {/* Background Subtle Wave Pattern */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:12px_12px]" />
                
                {/* Registered Trade Mark Emblem */}
                <span className="absolute top-4 right-6 text-xs font-bold text-[#d4af37] border border-[#d4af37] w-6 h-6 rounded-full flex items-center justify-center">
                  ®
                </span>

                <h2 className="text-3xl md:text-4xl font-headline font-extrabold text-[#d4af37] tracking-wider mb-1 drop-shadow-sm">
                  HALM
                </h2>
                
                <div className="w-16 h-0.5 bg-[#d4af37] my-2" />

                <p className="text-xs font-bold font-body text-[#f3e5ab] uppercase tracking-widest mb-2">
                  PATENT No. 24128
                </p>

                <div className="text-[10px] font-mono text-white/80 space-y-0.5">
                  <p>A61N 5/06 (2006.01)</p>
                  <p>A61F 7/00 (2006.01)</p>
                  <p>A61B 3/00 (2006.01)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Patent Info Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d6f2f5] text-[#24656b] text-xs font-bold">
              <Award className="w-4 h-4" />
              <span>Chráněný český patent č. 24128</span>
            </div>

            <h2 className="text-headline-md font-headline text-[#50aab2]">
              Bezpečná a účinná stimulace bez jehel
            </h2>

            <p className="text-body-md font-body text-on-surface leading-relaxed">
              Chip HALM® využívá jemných biorytmických a termoelektrických vlastností pro aktivaci akupresurních bodů. 
              Na rozdíl od jehel je aplikace zcela bezbolestná, hygienická a vhodná pro dlouhodobé působení během běžného dne.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                <CheckCircle2 className="w-5 h-5 text-[#50aab2] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-on-surface font-body">100% Neinvazivní</h4>
                  <p className="text-xs text-on-surface-variant">Bez porušení kůže a rizika infekce.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                <CheckCircle2 className="w-5 h-5 text-[#50aab2] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-on-surface font-body">Dlouhodobý účinek</h4>
                  <p className="text-xs text-on-surface-variant">Působí po celou dobu přiložení na bod.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Section 2: 2 Režimy působení (Čchi vs Shi) */}
      <div className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[#50aab2] font-body text-label-md uppercase tracking-widest mb-2 inline-block font-semibold">
            Tradiční čínská medicína
          </span>
          <h2 className="text-headline-md font-headline text-[#50aab2]">
            Dva režimy působení podle stavu bodu
          </h2>
          <p className="text-body-md font-body text-on-surface-variant mt-2">
            Čínská medicína rozlišuje stav nedostatku (Xu) a stav přebytku (Shi). Chip HALM® existuje ve dvou variantách pro přesnou harmonizaci.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Variant 1: Gold Rim - Qi Xu (Dodávání energie) */}
          <div className="bg-surface-container-lowest rounded-[28px] p-8 soft-shadow border-2 border-[#d4af37]/60 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-[#f3e5ab] text-[#8a6600] font-bold text-xs font-body uppercase tracking-wider">
                  Qi Xu (Nedostatek)
                </span>
                <span className="w-8 h-8 rounded-full bg-[#d4af37] text-white flex items-center justify-center font-bold text-xs">
                  1
                </span>
              </div>

              {/* Graphical Chip Preview with Gold Rim */}
              <div className="flex items-center gap-4 py-4">
                <div className="w-20 h-20 rounded-full p-2 bg-gradient-to-br from-[#f3e5ab] via-[#d4af37] to-[#996515] shadow-md shrink-0 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#004f45] flex items-center justify-center text-[#d4af37] font-bold text-xs font-headline">
                    HALM
                  </div>
                </div>
                <div>
                  <h3 className="text-headline-md font-headline text-[#8a6600] text-xl">
                    Zlatý okraj – Čchi (Qi Xu)
                  </h3>
                  <p className="text-xs text-on-surface-variant font-semibold">
                    Režim doplňování a posilování energie
                  </p>
                </div>
              </div>

              <p className="text-body-md font-body text-on-surface leading-relaxed">
                Používá se při <strong>oslabení, únavě a chronických potížích</strong>. 
                Zlatý okraj pomáhá doplňovat chybějící čchi (Qi) do akupresurního bodu a povzbuzuje oslabené orgány.
              </p>
            </div>

            <div className="pt-4 border-t border-outline-variant/30 text-xs font-body text-on-surface-variant space-y-2">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                <strong>Účinek:</strong> Posílení, zahřátí, doplňování čchi
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                <strong>Vhodné pro:</strong> Únavu, chlad v těle, chronické oslabení
              </p>
            </div>
          </div>

          {/* Variant 2: Green Rim - Shi (Odebírání přebytku) */}
          <div className="bg-surface-container-lowest rounded-[28px] p-8 soft-shadow border-2 border-[#286b33]/60 flex flex-col justify-between space-y-6 relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full bg-[#d6f2f5] text-[#24656b] font-bold text-xs font-body uppercase tracking-wider">
                  Shi (Plnost)
                </span>
                <span className="w-8 h-8 rounded-full bg-[#286b33] text-white flex items-center justify-center font-bold text-xs">
                  2
                </span>
              </div>

              {/* Graphical Chip Preview with Green Rim */}
              <div className="flex items-center gap-4 py-4">
                <div className="w-20 h-20 rounded-full p-2 bg-[#286b33] shadow-md shrink-0 flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-[#003824] flex items-center justify-center text-white font-bold text-xs font-headline">
                    HALM
                  </div>
                </div>
                <div>
                  <h3 className="text-headline-md font-headline text-[#286b33] text-xl">
                    Zelený okraj – Shi (Plnost)
                  </h3>
                  <p className="text-xs text-on-surface-variant font-semibold">
                    Režim odebírání a rozptylování přebytku
                  </p>
                </div>
              </div>

              <p className="text-body-md font-body text-on-surface leading-relaxed">
                Používá se při <strong>akutním napětí, blokádách a přeplnění</strong>. 
                Zelený okraj pomáhá odebírat přebytečnou nahromaděnou energii, uvolňovat zánětlivé křeče a tišit bolest.
              </p>
            </div>

            <div className="pt-4 border-t border-outline-variant/30 text-xs font-body text-on-surface-variant space-y-2">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#286b33]" />
                <strong>Účinek:</strong> Uvolnění, rozptýlení napětí, odvedení přebytku
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#286b33]" />
                <strong>Vhodné pro:</strong> Akutní bolesti, křeče, zánětlivé blokády
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Section 3: Premium Double-Sided Chip (Příplatková verze HALM Duo) */}
      <div className="bg-surface-container-lowest rounded-[28px] p-8 md:p-12 soft-shadow border border-outline-variant/30 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Interactive 3D Flip Chip Preview */}
          <div className="lg:col-span-5 flex flex-col items-center text-center space-y-6">
            <span className="text-xs font-bold text-[#50aab2] uppercase tracking-wider">
              Interaktivní ukázka oboustranného chipu
            </span>

            {/* Flip Card Wrapper */}
            <div
              onClick={() => setFlippedSide(flippedSide === 'gold' ? 'green' : 'gold')}
              className="relative w-56 h-56 cursor-pointer group perspective-1000 select-none"
              title="Klikněte pro otočení chipu na druhou stranu"
            >
              <div className={`relative w-full h-full rounded-full transition-transform duration-700 transform-style-3d ${
                flippedSide === 'green' ? 'rotate-y-180' : ''
              }`}>
                
                {/* Front Side: Gold Rim (Qi Xu) */}
                <div className="absolute inset-0 w-full h-full rounded-full p-3 bg-gradient-to-br from-[#f3e5ab] via-[#d4af37] to-[#996515] shadow-xl flex items-center justify-center backface-hidden">
                  <div className="w-full h-full rounded-full bg-[#004f45] flex flex-col items-center justify-center text-center p-4">
                    <span className="text-xs font-bold text-[#d4af37] uppercase">Zlatá strana</span>
                    <span className="text-xl font-headline font-extrabold text-[#d4af37]">HALM®</span>
                    <span className="text-[10px] text-white/90 font-semibold mt-1">Čchi (Qi Xu)</span>
                  </div>
                </div>

                {/* Back Side: Green Rim (Shi) */}
                <div className="absolute inset-0 w-full h-full rounded-full p-3 bg-[#286b33] shadow-xl flex items-center justify-center backface-hidden rotate-y-180">
                  <div className="w-full h-full rounded-full bg-[#003824] flex flex-col items-center justify-center text-center p-4">
                    <span className="text-xs font-bold text-emerald-400 uppercase">Zelená strana</span>
                    <span className="text-xl font-headline font-extrabold text-white">HALM®</span>
                    <span className="text-[10px] text-white/90 font-semibold mt-1">Shi (Plnost)</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Flip Button CTA */}
            <button
              onClick={() => setFlippedSide(flippedSide === 'gold' ? 'green' : 'gold')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#e8eeef] hover:bg-[#50aab2] hover:text-white text-[#50aab2] font-bold text-xs transition-all border border-outline-variant/40 cursor-pointer shadow-xs"
            >
              <RotateCw className="w-4 h-4 animate-spin-slow" />
              <span>Otočit chip na {flippedSide === 'gold' ? 'zelenou stranu (Shi)' : 'zlatou stranu (Čchi)'}</span>
            </button>
          </div>

          {/* Premium Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f3e5ab] text-[#8a6600] text-xs font-bold">
              <Layers className="w-4 h-4" />
              <span>Příplatková prémiová verze</span>
            </div>

            <h2 className="text-headline-md font-headline text-[#50aab2]">
              Univerzální oboustranný chip HALM® Duo
            </h2>

            <p className="text-body-md font-body text-on-surface leading-relaxed">
              Pro maximální flexibilitu nabízíme příplatkovou oboustrannou verzi chipu HALM®. 
              Jedna strana má zlatý okraj (dodává energii), zatímco druhá strana má zelený okraj (odebírá přebytek).
            </p>

            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3">
              <h4 className="font-bold text-sm text-[#50aab2] font-body flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Výhoda oboustranné verze:
              </h4>
              <p className="text-xs font-body text-on-surface-variant leading-relaxed">
                Nemusíte kupovat dvě různé varianty. Podle aktuálního stavu potíží stačí chip jednoduše otočit 
                příslušnou stranou k pokožce.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/objednavka"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#50aab2] hover:bg-[#3d8e96] text-white font-bold text-label-md transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Mám zájem o oboustranný chip HALM®</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
