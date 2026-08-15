'use client';

import React, { useState, useMemo } from 'react';
import { BodyMap, BodyRegionType } from '@/components/BodyMap';
import { PointCard } from '@/components/PointCard';
import { ACUPRESSURE_POINTS } from '@/data/pointsData';
import { Search } from 'lucide-react';

export default function SeznamBoduPage() {
  const [selectedRegion, setSelectedRegion] = useState<BodyRegionType>('Vše');
  const [localSearch, setLocalSearch] = useState('');

  const pointCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ACUPRESSURE_POINTS.forEach((p) => {
      counts[p.bodyRegion] = (counts[p.bodyRegion] || 0) + 1;
    });
    return counts;
  }, []);

  const displayPoints = useMemo(() => {
    let list = ACUPRESSURE_POINTS;

    if (selectedRegion !== 'Vše') {
      list = list.filter((p) => p.bodyRegion === selectedRegion);
    }

    const term = localSearch.trim().toLowerCase();
    if (term) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.code.toLowerCase().includes(term) ||
          p.pinyinName.toLowerCase().includes(term)
      );
    }

    return list;
  }, [selectedRegion, localSearch]);

  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-container-padding py-section-gap flex flex-col space-y-section-gap">
      {/* Header & Local Search Section */}
      <section className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
        <div className="space-y-4">
          <h1 className="text-headline-xl font-headline text-primary">
            Katalog Akupresurních Bodů
          </h1>
          <p className="text-body-lg font-body text-on-surface-variant">
            Objevte mapu svého těla. Procházejte kompletní přehled akupresurních bodů nebo filtrujte podle zón těla.
          </p>
        </div>

        {/* Local Search input */}
        <div className="w-full max-w-xl relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-outline" />
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-4 pl-14 pr-6 text-body-lg font-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all placeholder:text-outline"
            placeholder="Hledat bod podle názvu nebo kódu (např. LI4)..."
          />
        </div>
      </section>

      {/* Filters Section */}
      <BodyMap
        selectedRegion={selectedRegion}
        onSelectRegion={setSelectedRegion}
        pointCounts={pointCounts}
      />

      {/* Points Grid */}
      {displayPoints.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {displayPoints.map((point) => (
            <PointCard key={point.id} point={point} />
          ))}
        </section>
      ) : (
        <div className="text-center py-12 bg-surface-container-lowest rounded-[24px] border border-outline-variant/30 soft-shadow">
          <p className="text-body-lg font-body text-on-surface-variant">
            Nenalezen žádný bod odpovídající vašemu výběru.
          </p>
        </div>
      )}
    </main>
  );
}
