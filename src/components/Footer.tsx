import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-surface-container border-t border-outline-variant/30 mt-auto py-10 px-container-padding">
      <div className="w-full max-w-[1200px] mx-auto space-y-8">
        {/* Centered Motto at the beginning of footer */}
        <div className="text-center space-y-1.5">
          <p className="text-base sm:text-lg font-headline text-[#50aab2] font-semibold italic">
            „Žijeme na základě fyzikálních nedokonalostí{' '}
            <span className="inline-block text-[1.3em] font-bold text-[#50aab2] align-baseline not-italic">η</span>{' '}
            <span className="text-[0.75em] text-[#50aab2] font-medium uppercase tracking-wider not-italic">(ETA)</span>“
          </p>
          <cite className="block text-xs sm:text-sm font-body text-secondary uppercase tracking-widest font-semibold not-italic">
            — Ing. Eugeniusz Motyka
          </cite>
        </div>

        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-outline-variant/20">
          {/* Brand */}
          <Link href="/" className="text-headline-md font-headline text-[#50aab2] font-bold hover:opacity-90 transition-opacity">
            AcuCare
          </Link>

          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            <Link
              href="/o-akupresure"
              className="text-on-surface-variant hover:text-[#50aab2] transition-colors text-label-md font-body"
            >
              Více informací
            </Link>
            <Link
              href="/cele-telo"
              className="text-on-surface-variant hover:text-[#50aab2] transition-colors text-label-md font-body"
            >
              Celé tělo
            </Link>
            <Link
              href="/seznam-bodu"
              className="text-on-surface-variant hover:text-[#50aab2] transition-colors text-label-md font-body"
            >
              Všechny body
            </Link>
            <Link
              href="/chip-halm"
              className="text-on-surface-variant hover:text-[#50aab2] transition-colors text-label-md font-body"
            >
              Chip HALM®
            </Link>
            <Link
              href="/objednavka"
              className="text-on-surface-variant hover:text-[#50aab2] transition-colors text-label-md font-body"
            >
              Objednávka
            </Link>
          </div>

          {/* Copyright & Created By */}
          <div className="flex flex-col sm:flex-row items-center gap-1.5 text-on-surface-variant text-body-md font-body text-center md:text-right">
            <span>© 2026 AcuCare.</span>
            <span className="hidden sm:inline">•</span>
            <span>
              Vytvořil{' '}
              <a
                href="https://elegantniweb.cz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#50aab2] underline transition-colors"
              >
                elegantniweb.cz
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
