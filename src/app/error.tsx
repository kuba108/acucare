'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home, AlertTriangle, Activity } from 'lucide-react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log error details for diagnostics
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-container-padding py-16 md:py-24 flex flex-col items-center justify-center text-center">
      {/* Error Decorative Badge */}
      <div className="w-20 h-20 rounded-full bg-error-container/40 flex items-center justify-center text-error mb-6 shadow-sm border border-error/30">
        <AlertTriangle className="w-10 h-10" />
      </div>

      {/* Heading */}
      <span className="text-error font-body text-label-md uppercase tracking-widest mb-2 font-bold block">
        Chyba aplikace
      </span>
      <h1 className="text-headline-lg-mobile md:text-headline-xl font-headline text-[#50aab2] mb-4">
        Něco se nepodařilo načíst
      </h1>

      <p className="text-body-lg font-body text-on-surface-variant max-w-xl mb-10 leading-relaxed">
        Omlouváme se, při zpracování vašeho požadavku došlo k neočekávané chybě. 
        Můžete zkusit obnovit načtení stránky nebo se vrátit na úvodní nabídku.
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mb-12">
        <button
          onClick={() => reset()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#50aab2] hover:bg-[#3d8e96] text-white font-bold text-label-md transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Zkusit znovu</span>
        </button>

        <Link
          href="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-surface-container-low hover:bg-[#e8eeef] text-[#50aab2] font-bold text-label-md transition-all border border-outline-variant/40"
        >
          <Home className="w-4 h-4" />
          <span>Hlavní stránka</span>
        </Link>
      </div>

      {/* Support Box */}
      <div className="w-full max-w-xl bg-surface-container-lowest rounded-[24px] p-6 soft-shadow border border-outline-variant/20 flex flex-col items-center gap-3">
        <Activity className="w-6 h-6 text-[#50aab2]" />
        <h3 className="font-bold text-sm text-[#50aab2] font-headline">Přetrvává problém?</h3>
        <p className="text-xs text-on-surface-variant max-w-md">
          Pokud se chyba opakuje, přejděte na <Link href="/objednavka" className="text-[#50aab2] underline font-bold">kontaktní formulář</Link> a dejte nám o tom vědět.
        </p>
      </div>
    </main>
  );
}
