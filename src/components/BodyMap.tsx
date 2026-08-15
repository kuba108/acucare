'use client';

import React from 'react';
import { Brain, Hand, Heart, Bone, Footprints, Smile } from 'lucide-react';

export type BodyRegionType = 'Vše' | 'Hlava a krk' | 'Ruce a paže' | 'Hrudník a břicho' | 'Záda a páteř' | 'Nohy a chodidla' | 'Psychika a emotivno';

const REGIONS: { name: BodyRegionType; label: string }[] = [
  { name: 'Vše', label: 'Vše' },
  { name: 'Hlava a krk', label: 'Hlava' },
  { name: 'Ruce a paže', label: 'Ruce' },
  { name: 'Nohy a chodidla', label: 'Nohy' },
  { name: 'Záda a páteř', label: 'Záda' },
  { name: 'Hrudník a břicho', label: 'Hrudník' },
  { name: 'Psychika a emotivno', label: 'Psychika' },
];

interface BodyMapProps {
  selectedRegion: BodyRegionType;
  onSelectRegion: (region: BodyRegionType) => void;
  pointCounts: Record<string, number>;
}

export function BodyMap({ selectedRegion, onSelectRegion, pointCounts }: BodyMapProps) {
  return (
    <section className="max-w-[1200px] mx-auto px-container-padding">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-outline-variant/30 pb-6">
        {/* Body Parts Filter */}
        <div className="flex items-center space-x-4">
          <span className="text-label-md font-body text-outline whitespace-nowrap">Část těla:</span>
          <div className="flex space-x-2 overflow-x-auto no-scrollbar w-full">
            {REGIONS.map((reg) => {
              const isSelected = selectedRegion === reg.name;
              return (
                <button
                  key={reg.name}
                  onClick={() => onSelectRegion(reg.name)}
                  className={`px-5 py-2 rounded-full text-label-md font-body transition-colors flex-shrink-0 ${
                    isSelected
                      ? 'bg-primary-container text-on-primary-container'
                      : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {reg.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
