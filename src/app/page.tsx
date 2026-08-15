'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/SearchBar';
import { QuoteSection } from '@/components/QuoteSection';
import { BodyMap, BodyRegionType } from '@/components/BodyMap';
import { PointCard } from '@/components/PointCard';
import { ACUPRESSURE_POINTS, AcupressurePoint } from '@/data/pointsData';
import { ArrowRight, Moon, Sparkles } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<AcupressurePoint[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<BodyRegionType>('Vše');

  const pointCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ACUPRESSURE_POINTS.forEach((p) => {
      counts[p.bodyRegion] = (counts[p.bodyRegion] || 0) + 1;
    });
    return counts;
  }, []);

  const displayPoints = useMemo(() => {
    let list = searchQuery.trim() ? searchResults : ACUPRESSURE_POINTS;
    if (selectedRegion !== 'Vše') {
      list = list.filter((p) => p.bodyRegion === selectedRegion);
    }
    return list;
  }, [searchQuery, searchResults, selectedRegion]);

  const handleSearchChange = useCallback((query: string, results: AcupressurePoint[]) => {
    setSearchQuery(query);
    setSearchResults(results);
  }, []);

  // Featured point for bento grid
  const featuredPoint = ACUPRESSURE_POINTS.find(p => p.code === 'LI 4') || ACUPRESSURE_POINTS[0];

  return (
    <main className="flex-grow">
      {/* Hero + How It Works */}
      <QuoteSection />

      {/* Featured Insight (Bento Grid) */}
      <section className="w-full py-section-gap px-container-padding bg-surface">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter auto-rows-[250px]">
            {/* Main Featured */}
            <Link
              href={`/bod/${featuredPoint.id}`}
              className="md:col-span-8 row-span-2 rounded-[24px] bg-surface-container-lowest soft-shadow overflow-hidden group relative flex"
            >
              <div className="w-full sm:w-1/2 p-8 flex flex-col justify-center relative z-10 bg-surface-container-lowest">
                <span className="inline-block px-3 py-1 bg-surface-container-low text-primary text-label-md font-body rounded-full w-max mb-4">
                  Doporučeno
                </span>
                <h3 className="text-headline-lg font-headline text-primary mb-4">
                  Bod {featuredPoint.code} ({featuredPoint.pinyinName})
                </h3>
                <p className="text-body-md font-body text-on-surface-variant mb-6">
                  {featuredPoint.summary}
                </p>
                <span className="text-primary text-label-md font-body font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Zobrazit detail <ArrowRight className="w-[18px] h-[18px]" />
                </span>
              </div>
            </Link>

            {/* Secondary 1 */}
            <div className="md:col-span-4 row-span-1 rounded-[24px] bg-secondary-container p-6 flex flex-col justify-between hover-lift cursor-pointer relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-headline-md font-headline text-on-secondary-container mb-2 text-lg">
                  Úleva od stresu
                </h4>
                <p className="text-body-md font-body text-on-secondary-container/80 line-clamp-2">
                  Zklidněte svou mysl sérií jednoduchých bodů.
                </p>
              </div>
              <div className="relative z-10 flex justify-end mt-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest/50 flex items-center justify-center text-secondary">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Secondary 2 */}
            <div className="md:col-span-4 row-span-1 rounded-[24px] bg-primary-container p-6 flex flex-col justify-between hover-lift cursor-pointer relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-headline-md font-headline text-on-primary-container mb-2 text-lg">
                  Lepší spánek
                </h4>
                <p className="text-body-md font-body text-on-primary-container/80 line-clamp-2">
                  Podpořte hluboký a regenerační odpočinek.
                </p>
              </div>
              <div className="relative z-10 flex justify-end mt-4">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest/20 flex items-center justify-center text-on-primary-container">
                  <Moon className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="katalog" className="w-full py-section-gap px-container-padding bg-surface">
        <div className="max-w-[1200px] mx-auto flex flex-col space-y-section-gap">
          {/* Header & Search */}
          <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
            <div className="space-y-4">
              <h2 className="text-headline-xl font-headline text-primary">
                Katalog Akupresurních Bodů
              </h2>
              <p className="text-body-lg font-body text-on-surface-variant">
                Objevte mapu svého těla. Vyhledejte specifické body nebo filtrujte podle oblastí a potíží pro nalezení přirozené úlevy a rovnováhy.
              </p>
            </div>
            <SearchBar onSearchChange={handleSearchChange} />
          </div>

          {/* Filters */}
          <BodyMap
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
            pointCounts={pointCounts}
          />

          {/* Points Grid */}
          {displayPoints.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {displayPoints.map((point) => (
                <PointCard key={point.id} point={point} highlightQuery={searchQuery} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center pt-8">
              <div className="bg-surface-container-lowest rounded-[24px] p-8 text-center max-w-md soft-shadow">
                <p className="text-body-lg font-body text-on-surface-variant mb-4">
                  Nenalezen žádný bod
                </p>
                <button
                  onClick={() => {
                    setSelectedRegion('Vše');
                    setSearchQuery('');
                  }}
                  className="px-8 py-3 rounded-full bg-primary text-on-primary font-body text-label-md hover:bg-primary/90 transition-colors shadow-sm"
                >
                  Zobrazit všechny body
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
