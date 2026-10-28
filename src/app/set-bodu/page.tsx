'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Printer,
  Trash2,
  Plus,
  Check,
  Disc,
  ArrowRight,
  Search,
  X,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Layers,
  ListFilter
} from 'lucide-react';
import { ACUPRESSURE_POINTS, AcupressurePoint } from '@/data/pointsData';
import { normalizeChipCoordinates } from '@/data/pointLayersConfig';
import { matchesPointSearch } from '@/lib/searchUtils';
import { usePointSet } from '@/lib/pointSetStorage';
import { PointSetCard } from '@/components/PointSetCard';

const REGIONS = [
  'Hlava a krk',
  'Ruce a paže',
  'Hrudník a břicho',
  'Záda a páteř',
  'Nohy a chodidla',
];

export default function SetBoduPage() {
  const { pointIds, count, isLoaded, toggle, add, clear, remove, has } = usePointSet();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListBrowserOpen, setIsListBrowserOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>(REGIONS[0]);

  // Selected points in order of pointIds
  const selectedPoints = useMemo(() => {
    const pointMap = new Map<string, AcupressurePoint>();
    ACUPRESSURE_POINTS.forEach((p) => pointMap.set(p.id, p));
    return pointIds
      .map((id) => pointMap.get(id))
      .filter((p): p is AcupressurePoint => Boolean(p));
  }, [pointIds]);

  // Total chip count calculation (paired points have 2 chips)
  const totalChipsCount = useMemo(() => {
    return selectedPoints.reduce((sum, point) => {
      const coords = normalizeChipCoordinates(point.id);
      return sum + coords.length;
    }, 0);
  }, [selectedPoints]);

  // Search results for individual point search
  const searchResults = useMemo(() => {
    const trimmed = searchQuery.trim();
    if (!trimmed) return [];
    return ACUPRESSURE_POINTS.filter((p) => matchesPointSearch(p, trimmed)).slice(0, 8);
  }, [searchQuery]);

  // Points by active body region in list browser
  const pointsInSelectedRegion = useMemo(() => {
    return ACUPRESSURE_POINTS.filter((p) => p.bodyRegion === selectedRegion);
  }, [selectedRegion]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const currentDate = new Date().toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-container-padding py-8 md:py-12">
      {/* ================= PRINT-ONLY HEADER ================= */}
      <div className="only-print mb-8 pb-6 border-b-2 border-gray-800">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold font-headline text-gray-900">
              HALM® chip — Sestava bodů pro aplikaci
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Patentovaná technologie č. 24128 • Vygenerováno dne {currentDate}
            </p>
          </div>
          <div className="text-right text-xs text-gray-600">
            <p className="font-bold text-gray-900">
              Vybráno {selectedPoints.length} bodů ({totalChipsCount} chipů)
            </p>
            <p>Doba aplikace: 30 min až 3 hodiny</p>
          </div>
        </div>
      </div>

      {/* ================= SCREEN HEADER & ACTIONS (NO-PRINT) ================= */}
      <section className="no-print mb-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-outline-variant/30">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Link
                href="/seznam-bodu"
                className="text-xs font-semibold text-on-surface-variant hover:text-[#50aab2] transition-colors"
              >
                ← Zpět na Všechny body
              </Link>
            </div>
            <h1 className="text-headline-lg-mobile md:text-headline-xl font-headline text-[#50aab2] font-bold">
              Sestava bodů k aplikaci
            </h1>
            <p className="text-body-md font-body text-on-surface-variant max-w-2xl mt-1">
              Zobrazte si vybrané body vedle sebe, ať přesně víte, kam chipy nalepit. Sestavu si můžete vytisknout nebo uložit do PDF.
            </p>
          </div>

          {/* Action buttons (Print & Clear) */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              disabled={selectedPoints.length === 0}
              className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-headline font-bold text-sm transition-all shadow-sm cursor-pointer ${
                selectedPoints.length > 0
                  ? 'bg-[#50aab2] hover:bg-[#3d8e96] text-white hover:shadow-md active:scale-95'
                  : 'bg-surface-container text-outline cursor-not-allowed opacity-60'
              }`}
              title="Vytisknout sestavu nebo uložit jako PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Vytisknout sestavu / PDF</span>
            </button>

            {selectedPoints.length > 0 && (
              <button
                type="button"
                onClick={clear}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-surface-container hover:bg-red-50 hover:text-red-600 text-on-surface-variant font-body text-sm font-semibold transition-all border border-outline-variant/30 cursor-pointer"
                title="Vymazat celou sestavu"
              >
                <Trash2 className="w-4 h-4" />
                <span>Vymazat sestavu</span>
              </button>
            )}
          </div>
        </div>

        {/* ================= HLAVNÍ PANEL PRO VKLÁDÁNÍ BODŮ PO JEDNOM (NO-PRINT) ================= */}
        <div className="bg-surface-container-lowest rounded-[28px] p-6 md:p-7 soft-shadow border border-outline-variant/30 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-headline font-bold text-on-surface flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#50aab2]" />
                Vložit bod do sestavy
              </h2>
              <p className="text-xs font-body text-on-surface-variant">
                Vyhledejte bod podle kódu/názvu nebo si otevřete výběr ze seznamu partií:
              </p>
            </div>

            {/* Toggle button for List Browser */}
            <button
              type="button"
              onClick={() => setIsListBrowserOpen(!isListBrowserOpen)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-[#50aab2] text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto border border-outline-variant/30"
            >
              <ListFilter className="w-4 h-4" />
              <span>{isListBrowserOpen ? 'Skrýt seznam partií' : 'Výběr ze seznamu partií'}</span>
              {isListBrowserOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* 1. Vyhledávací pole pro rychlé vložení bodu */}
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Napište kód bodu (např. LI4, ST36, SP6) nebo název..."
                className="w-full bg-surface-container-low border border-outline-variant/40 rounded-2xl py-3 pl-12 pr-10 text-sm font-body text-on-surface focus:outline-none focus:border-[#50aab2] focus:bg-surface-container-lowest transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-outline hover:text-on-surface"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Live Search Results Dropdown */}
            {searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 z-30 mt-2 bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-xl overflow-hidden max-h-80 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-outline-variant/20">
                    {searchResults.map((point) => {
                      const inSet = has(point.id);
                      return (
                        <div
                          key={point.id}
                          className="p-3.5 flex items-center justify-between gap-4 hover:bg-surface-container-low transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="bg-[#50aab2] text-white text-xs font-bold px-2.5 py-1 rounded-md shrink-0">
                              {point.code}
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-headline font-bold text-on-surface truncate">
                                {point.name}{' '}
                                <span className="font-body font-normal text-xs text-on-surface-variant">
                                  ({point.pinyinName})
                                </span>
                              </p>
                              <p className="text-xs text-on-surface-variant truncate">
                                {point.bodyRegion} • {point.summary}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              toggle(point.id);
                            }}
                            className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                              inSet
                                ? 'bg-[#d6f2f5] text-[#24656b] hover:bg-red-50 hover:text-red-600 border border-[#50aab2]/30'
                                : 'bg-[#50aab2] text-white hover:bg-[#3d8e96]'
                            }`}
                          >
                            {inSet ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>V sestavě</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Vložit bod</span>
                              </>
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-on-surface-variant">
                    Nenalezen žádný bod odpovídající dotazu „{searchQuery}“.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 2. Výběr ze seznamu partií těla (rozbalovací) */}
          {isListBrowserOpen && (
            <div className="pt-4 border-t border-outline-variant/20 space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {REGIONS.map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => setSelectedRegion(region)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-body font-semibold transition-all cursor-pointer ${
                      selectedRegion === region
                        ? 'bg-[#50aab2] text-white shadow-xs'
                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>

              {/* Grid of Points in Selected Region */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-80 overflow-y-auto pr-1">
                {pointsInSelectedRegion.map((point) => {
                  const inSet = has(point.id);
                  return (
                    <div
                      key={point.id}
                      className={`flex items-center justify-between p-3 rounded-2xl border transition-all text-xs font-body ${
                        inSet
                          ? 'bg-[#d6f2f5]/50 border-[#50aab2] text-[#24656b]'
                          : 'bg-surface-container-low border-outline-variant/30 text-on-surface hover:border-[#50aab2]/40'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-[#50aab2]">{point.code}</span>
                          <span className="font-semibold truncate">{point.name}</span>
                        </div>
                        <p className="text-[11px] text-on-surface-variant truncate">{point.summary}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggle(point.id)}
                        className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer ${
                          inSet
                            ? 'bg-[#50aab2] text-white'
                            : 'bg-surface-container hover:bg-surface-container-high text-on-surface hover:text-[#50aab2] border border-outline-variant/30'
                        }`}
                      >
                        {inSet ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span>V sestavě</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            <span>Přidat</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        {selectedPoints.length > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xs">
            <div className="flex flex-wrap items-center gap-3 text-sm font-body">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d6f2f5] text-[#24656b] font-bold text-xs">
                <Check className="w-3.5 h-3.5 text-[#50aab2]" />
                {selectedPoints.length}{' '}
                {selectedPoints.length === 1
                  ? 'bod v sestavě'
                  : selectedPoints.length < 5
                  ? 'body v sestavě'
                  : 'bodů v sestavě'}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-semibold text-xs">
                <Disc className="w-3.5 h-3.5 text-[#50aab2]" />
                Celkem chipů HALM®: {totalChipsCount} ks
              </span>
            </div>

            <p className="text-xs text-on-surface-variant">
              Rozložení je optimalizováno na 3 sloupce pro přehlednost a tisk.
            </p>
          </div>
        )}
      </section>

      {/* ================= SESTAVA BODŮ: PŘESNĚ 3 SLOUPCE NA DESKTOPU ================= */}
      {selectedPoints.length > 0 ? (
        <section className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 print:grid-cols-2 print:gap-5">
            {selectedPoints.map((point) => (
              <PointSetCard
                key={point.id}
                point={point}
                onRemove={remove}
              />
            ))}
          </div>

          {/* Safety Warning */}
          <div className="p-5 rounded-2xl bg-error-container/20 border border-error-container/40 text-on-tertiary-fixed-variant text-xs sm:text-sm font-body leading-relaxed flex items-start gap-3 print:border-gray-400 print:text-gray-800">
            <ShieldAlert className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Důležité bezpečnostní pokyny:</p>
              <p className="mt-1">
                Aplikaci chipů HALM® delší než 3 hodiny vždy konzultujte s lékařem. V těhotenství konzultujte aplikaci vždy s lékařem.
              </p>
            </div>
          </div>
        </section>
      ) : (
        /* ================= EMPTY STATE (NO-PRINT) ================= */
        <section className="no-print text-center py-14 px-6 bg-surface-container-lowest rounded-[32px] soft-shadow border border-outline-variant/30 space-y-6 max-w-2xl mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-[#d6f2f5] text-[#50aab2] flex items-center justify-center mx-auto shadow-sm">
            <Layers className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl font-headline font-bold text-on-surface">
              V sestavě zatím nemáte žádný bod
            </h2>
            <p className="text-sm font-body text-on-surface-variant leading-relaxed">
              Zadejte kód bodu do vyhledávacího pole nahoře nebo si rozbalte výběr ze seznamu partií.
            </p>
          </div>

          <div className="pt-4 border-t border-outline-variant/20 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/seznam-bodu"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#50aab2] hover:bg-[#3d8e96] text-white font-body text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <span>Procházet katalog všech bodů</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
