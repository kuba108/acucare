import React from 'react';
import Link from 'next/link';
import { Compass, Search, Home, ArrowRight, Activity, Map, Sparkles } from 'lucide-react';

export const metadata = {
  title: '404 - Stránka nenalezena | AcuCare',
  description: 'Omlouváme se, požadovaná stránka neexistuje. Vraťte se na hlavní stránku nebo prozkoumejte katalog akupresurních bodů.',
};

export default function NotFound() {
  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-container-padding py-16 md:py-24 flex flex-col items-center justify-center text-center">
      {/* 404 Decorative Icon Badge */}
      <div className="w-20 h-20 rounded-full bg-[#d6f2f5] flex items-center justify-center text-[#50aab2] mb-6 shadow-sm border border-[#50aab2]/30 animate-pulse">
        <Compass className="w-10 h-10" />
      </div>

      {/* Heading */}
      <span className="text-[#50aab2] font-body text-label-md uppercase tracking-widest mb-2 font-bold block">
        Chyba 404
      </span>
      <h1 className="text-headline-lg-mobile md:text-headline-xl font-headline text-[#50aab2] mb-4">
        Stránka nenalezena
      </h1>

      <p className="text-body-lg font-body text-on-surface-variant max-w-xl mb-10 leading-relaxed">
        Omlouváme se, ale požadovaná stránka neexistuje, byla přesunuta nebo zadáte neplatnou adresu. 
        Vydejte se zpět na hlavní stránku nebo pokračujte prozkoumáváním energetických drah.
      </p>

      {/* Primary CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full max-w-md">
        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#50aab2] hover:bg-[#3d8e96] text-white font-bold text-label-md transition-all shadow-md active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>Hlavní stránka</span>
        </Link>
        <Link
          href="/seznam-bodu"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-surface-container-low hover:bg-[#e8eeef] text-[#50aab2] font-bold text-label-md transition-all border border-outline-variant/40"
        >
          <Search className="w-4 h-4" />
          <span>Katalog bodů</span>
        </Link>
      </div>

      {/* Quick Navigation Shortcuts Card */}
      <div className="w-full max-w-3xl bg-surface-container-lowest rounded-[28px] p-8 soft-shadow border border-outline-variant/30 text-left">
        <h2 className="text-headline-md font-headline text-[#50aab2] text-xl mb-6 text-center sm:text-left">
          Kam můžete pokračovat:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/cele-telo"
            className="group p-4 rounded-2xl bg-surface-container-low hover:bg-[#d6f2f5]/50 border border-outline-variant/20 hover:border-[#50aab2]/40 transition-all flex flex-col gap-2"
          >
            <div className="w-9 h-9 rounded-full bg-[#50aab2] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Map className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-bold text-sm text-[#50aab2] font-body flex items-center justify-between">
              <span>Celé tělo</span>
              <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-on-surface-variant">Mapa 14 energetických drah a meridiánů.</p>
          </Link>

          <Link
            href="/chip-halm"
            className="group p-4 rounded-2xl bg-surface-container-low hover:bg-[#d6f2f5]/50 border border-outline-variant/20 hover:border-[#50aab2]/40 transition-all flex flex-col gap-2"
          >
            <div className="w-9 h-9 rounded-full bg-[#50aab2] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-bold text-sm text-[#50aab2] font-body flex items-center justify-between">
              <span>Chip HALM®</span>
              <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-on-surface-variant">Patentovaná technologie bezihlové akupresury.</p>
          </Link>

          <Link
            href="/o-akupresure"
            className="group p-4 rounded-2xl bg-surface-container-low hover:bg-[#d6f2f5]/50 border border-outline-variant/20 hover:border-[#50aab2]/40 transition-all flex flex-col gap-2"
          >
            <div className="w-9 h-9 rounded-full bg-[#50aab2] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Activity className="w-4.5 h-4.5" />
            </div>
            <h3 className="font-bold text-sm text-[#50aab2] font-body flex items-center justify-between">
              <span>Více informací</span>
              <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-on-surface-variant">Základy tradiční čínské medicíny a energie čchi.</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
