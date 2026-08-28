import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-surface-container border-t border-outline-variant/30 mt-auto py-section-gap px-container-padding">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1200px] mx-auto gap-8">
        {/* Brand */}
        <Link href="/" className="text-headline-md font-headline text-[#50aab2] font-bold hover:opacity-90 transition-opacity">
          AcuCare
        </Link>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
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
            href="/objednavka"
            className="text-on-surface-variant hover:text-[#50aab2] transition-colors text-label-md font-body"
          >
            Objednávka
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-on-surface text-body-md font-body text-center md:text-right">
          © 2024 AcuCare. Holistická cesta k rovnováze.
        </div>
      </div>
    </footer>
  );
}
