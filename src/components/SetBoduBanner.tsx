'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, ArrowRight } from 'lucide-react';
import { usePointSet } from '@/lib/pointSetStorage';

export function SetBoduBanner() {
  const { count } = usePointSet();

  return (
    <section className="w-full bg-surface-container-lowest rounded-[28px] p-6 sm:p-8 border border-outline-variant/30 soft-shadow flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#d6f2f5] text-[#24656b] flex items-center justify-center shrink-0">
          <Layers className="w-6 h-6 text-[#50aab2]" />
        </div>
        <div>
          <span className="text-secondary font-body text-xs uppercase tracking-wider font-semibold">
            Praktická aplikace chipů HALM®
          </span>
          <h2 className="text-lg sm:text-xl font-headline font-bold text-on-surface">
            Sestava bodů pro aplikaci chipů
          </h2>
          <p className="text-xs sm:text-sm font-body text-on-surface-variant max-w-xl">
            {count > 0
              ? `V sestavě máte aktuálně vybráno ${count} ${count === 1 ? 'bod' : count < 5 ? 'body' : 'bodů'} k zobrazení a tisku.`
              : 'Vyberte si body z těla vedle sebe pro snadnou aplikaci chipů, tisk nebo export do PDF.'}
          </p>
        </div>
      </div>

      <Link
        href="/set-bodu"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#50aab2] hover:bg-[#3d8e96] text-white font-body text-xs sm:text-sm font-bold transition-all shadow-xs shrink-0 self-stretch md:self-auto justify-center cursor-pointer active:scale-95"
      >
        <span>{count > 0 ? `Zobrazit sestavu (${count})` : 'Přejít na sestavu bodů'}</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </section>
  );
}
