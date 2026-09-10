'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin, Activity, ShieldAlert, Sparkles, Brain, Frown, CircleDot, Wind,
  Hand, Disc, ChevronRight
} from 'lucide-react';
import { AcupressurePoint } from '@/data/pointsData';
import {
  ChipVariantType,
  CHIP_IMAGES,
  normalizeChipCoordinates,
  PointLayersInfo
} from '@/data/pointLayersConfig';

interface PointDetailInteractiveProps {
  point: AcupressurePoint;
  relatedPoints: AcupressurePoint[];
  initialLayers?: PointLayersInfo;
}

type ViewMode = 'chip' | 'hand';

export function PointDetailInteractive({ point, relatedPoints, initialLayers }: PointDetailInteractiveProps) {
  const [selectedMode, setSelectedMode] = useState<ViewMode>('chip');
  const [hoveredMode, setHoveredMode] = useState<ViewMode | null>(null);

  // Sub-selection for Chip Variants (Default: single)
  const [selectedChipVariant, setSelectedChipVariant] = useState<ChipVariantType>('single');
  const [hoveredChipVariant, setHoveredChipVariant] = useState<ChipVariantType | null>(null);

  const activeMode = hoveredMode || selectedMode;
  const activeChipVariant = hoveredChipVariant || selectedChipVariant;

  // Hybrid layered configuration with safe fallback
  const folderName = point.id.replace(/-/g, '_');
  const layers: PointLayersInfo = initialLayers || {
    folderName,
    bodyImage: `/points/${folderName}/body.png`,
    handOverlay: `/points/${folderName}/hand.png`,
    fallbackImage: `/points_images/${folderName}.jpg`,
    hasCustomLayers: false,
    chips: normalizeChipCoordinates(point.id),
  };
  const activeChip = CHIP_IMAGES[activeChipVariant];

  const indicationIcons = [Brain, Frown, CircleDot, Wind];

  const CHIP_VARIANTS: Array<{ id: ChipVariantType; label: string; sublabel: string; color: string }> = [
    {
      id: 'single',
      label: 'Halm chip jednostranný',
      sublabel: 'Standardní verze',
      color: '#d4af37',
    },
    {
      id: 'duo_qi',
      label: 'Halm Duo oboustranný chip (Čchi)',
      sublabel: 'Režim doplňování energie',
      color: '#d4af37',
    },
    {
      id: 'duo_shi',
      label: 'Halm Duo oboustranný chip (Shi)',
      sublabel: 'Režim odebírání přebytku',
      color: '#286b33',
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Left Column (Canvas & Info) */}
      <div className="lg:col-span-8 flex flex-col gap-10">
        
        {/* Main Image Card with Hybrid Layer Stacking */}
        <section className="bg-surface-container-lowest rounded-[24px] soft-shadow overflow-hidden border border-outline-variant/30 relative group">
          
          {/* Active Mode Badge on top left of image */}
          <div className="absolute top-4 left-4 z-30 px-4 py-2 rounded-full bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant/40 shadow-sm flex items-center gap-2 text-xs font-bold text-[#50aab2]">
            {activeMode === 'chip' ? (
              <>
                <Disc className="w-4 h-4 text-[#50aab2]" />
                <span>{activeChip.label}</span>
              </>
            ) : (
              <>
                <Hand className="w-4 h-4 text-[#50aab2]" />
                <span>Masáž rukou</span>
              </>
            )}
          </div>

          {/* Canvas with Aspect-Square Ratio */}
          <div className="relative w-full aspect-square overflow-hidden rounded-[24px] bg-[#e8eeef]">
            
            {/* LAYER 1: Základní fotografie těla (body.jpg s fallbackem na stávající fotku) */}
            <Image
              src={layers.bodyImage}
              onError={(e) => {
                // Bezpečný fallback, pokud nová složka /points/[id]/ ještě neobsahuje body.jpg
                const target = e.target as HTMLImageElement;
                target.src = layers.fallbackImage;
              }}
              alt={`Snímek těla pro bod ${point.code} - ${point.name}`}
              fill
              className="object-contain select-none"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />

            {/* LAYER 2: Masáž rukou (hand.png - full-frame transparentní vrstva) */}
            <div
              className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 z-10 ${
                activeMode === 'hand' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={layers.handOverlay}
                onError={(e) => {
                  // Fallback na stávající fotku s rukou
                  const target = e.target as HTMLImageElement;
                  target.src = layers.fallbackImage;
                }}
                alt={`Masáž rukou pro bod ${point.code}`}
                fill
                className="object-contain select-none"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>

            {/* LAYER 3: Aplikace chipu (Podpora pro 1 i 2 chipy s nastavitelnou velikostí a pozicí) */}
            {activeMode === 'chip' && layers.chips.map((chipCoord, idx) => (
              <div
                key={`chip-${idx}`}
                style={{
                  left: `${chipCoord.x}%`,
                  top: `${chipCoord.y}%`,
                  width: `${chipCoord.size ?? 14}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute aspect-square pointer-events-none z-20 drop-shadow-lg transition-all duration-300 animate-fade-in"
                title={chipCoord.label}
              >
                <Image
                  key={`${activeChipVariant}-${idx}`}
                  src={activeChip.src}
                  alt={chipCoord.label || activeChip.label}
                  fill
                  className="object-contain select-none"
                />
              </div>
            ))}

          </div>
        </section>

        {/* Point Info Card: Poloha, O čem bod vypovídá, Poznámky */}
        <section className="bg-surface-container-lowest rounded-[24px] p-8 md:p-10 soft-shadow flex flex-col gap-8 divide-y divide-outline-variant/30 border border-outline-variant/20">
          {/* 1. Poloha */}
          <div>
            <h2 className="text-headline-md font-headline text-[#50aab2] mb-4 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-[#50aab2] flex-shrink-0" />
              Poloha
            </h2>
            <p className="text-body-md font-body text-on-surface leading-relaxed">
              {point.location}
            </p>
          </div>

          {/* 2. O čem bod vypovídá */}
          <div className="pt-8">
            <h2 className="text-headline-md font-headline text-[#50aab2] mb-4 flex items-center gap-3">
              <Activity className="w-6 h-6 text-[#50aab2] flex-shrink-0" />
              O čem bod vypovídá
            </h2>
            <p className="text-body-md font-body text-on-surface leading-relaxed">
              {point.usage}
            </p>
          </div>

          {/* 3. Poznámky */}
          {point.notes && (
            <div className="pt-8">
              <h2 className="text-headline-md font-headline text-[#50aab2] mb-4 flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-[#50aab2] flex-shrink-0" />
                Poznámky
              </h2>
              <p className="text-body-md font-body text-on-surface leading-relaxed">
                {point.notes}
              </p>
            </div>
          )}
        </section>

        {/* Indikace (Bento Grid Style) */}
        <section>
          <h2 className="text-headline-md font-headline text-[#50aab2] mb-6">
            Indikace (Co bod léčí)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {point.symptoms.slice(0, 4).map((sym, idx) => {
              const Icon = indicationIcons[idx % indicationIcons.length];
              return (
                <div key={sym} className="bg-surface-container-lowest rounded-2xl p-6 soft-shadow card-hover flex flex-col gap-3 border border-outline-variant/20">
                  <div className="w-10 h-10 rounded-full bg-[#d6f2f5] flex items-center justify-center text-[#24656b] mb-2">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-label-md font-body text-[#50aab2] font-bold text-lg">{sym}</h3>
                </div>
              );
            })}
          </div>
        </section>

        {/* Instrukce k masáži */}
        <section className="bg-surface-container-lowest rounded-[24px] p-8 md:p-10 soft-shadow border border-outline-variant/20">
          <h2 className="text-headline-md font-headline text-[#50aab2] mb-8">
            Instrukce k stimulaci bodu
          </h2>
          <div className="flex flex-col gap-8 relative before:absolute before:inset-y-0 before:left-[19px] before:w-px before:bg-outline-variant/30">
            {/* Step 1 */}
            <div className="flex gap-6 relative z-10">
              <div className="w-10 h-10 shrink-0 rounded-full bg-surface-container flex items-center justify-center border-2 border-surface-container-lowest shadow-sm text-[#50aab2] font-body text-lg font-bold">
                1
              </div>
              <div className="pt-2">
                <h3 className="text-body-lg font-body text-[#50aab2] font-bold mb-2">Lokalizujte bod</h3>
                <p className="text-body-md font-body text-on-surface">
                  {point.location}
                </p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="flex gap-6 relative z-10">
              <div className="w-10 h-10 shrink-0 rounded-full bg-surface-container flex items-center justify-center border-2 border-surface-container-lowest shadow-sm text-[#50aab2] font-body text-lg font-bold">
                2
              </div>
              <div className="pt-2">
                <h3 className="text-body-lg font-body text-[#50aab2] font-bold mb-2">Aplikujte chip nebo masírujte rukou</h3>
                <p className="text-body-md font-body text-on-surface">
                  {point.stimulationMethod}
                </p>
              </div>
            </div>
            {/* Cautions */}
            {point.cautions && (
              <div className="flex gap-6 relative z-10">
                <div className="w-10 h-10 shrink-0 rounded-full bg-[#50aab2] flex items-center justify-center border-2 border-surface-container-lowest shadow-sm text-white">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 bg-error-container/30 text-on-tertiary-fixed-variant px-4 py-2 rounded-lg text-sm font-body text-label-md">
                    <ShieldAlert className="w-[18px] h-[18px]" />
                    <span>{point.cautions}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Right Column (Sidebar) */}
      <div className="lg:col-span-4 flex flex-col gap-6">

        {/* FIRST BOX IN RIGHT COLUMN: Způsob aplikace (View Toggle Box) */}
        <div className="bg-surface-container-lowest rounded-[24px] p-6 soft-shadow border border-outline-variant/30 space-y-4">
          <h3 className="text-headline-md font-headline text-[#50aab2] text-xl">
            Způsob aplikace
          </h3>

          <div className="space-y-3">
            {/* SECTION 1: Aplikace chipu (Parent Card with Sub-options) */}
            <div className={`rounded-2xl border transition-all ${
              activeMode === 'chip'
                ? 'bg-[#e8eeef] border-[#50aab2] shadow-sm'
                : 'bg-surface-container-low border-outline-variant/30'
            }`}>
              {/* Main Chip Card Header */}
              <button
                type="button"
                onClick={() => setSelectedMode('chip')}
                onMouseEnter={() => setHoveredMode('chip')}
                onMouseLeave={() => setHoveredMode(null)}
                className="w-full p-4 flex items-center justify-between gap-3 cursor-pointer select-none text-left"
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={`w-10 h-10 rounded-full font-headline font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                      activeMode === 'chip'
                        ? 'bg-[#50aab2] text-white shadow-xs'
                        : 'bg-surface-container text-[#50aab2]'
                    }`}
                  >
                    <Disc className="w-5 h-5" />
                  </span>
                  <div>
                    <p className={`font-bold text-sm font-body transition-colors ${activeMode === 'chip' ? 'text-[#50aab2]' : 'text-on-surface'}`}>
                      Aplikace chipu
                    </p>
                    <p className="text-xs font-body text-on-surface-variant">
                      AcuCare akupresurní chip
                    </p>
                  </div>
                </div>

                <span
                  className={`w-3.5 h-3.5 rounded-full shrink-0 transition-all ${
                    selectedMode === 'chip' ? 'bg-[#50aab2] scale-110 ring-2 ring-[#50aab2]/30' : 'bg-outline-variant/40'
                  }`}
                />
              </button>

              {/* Sub-cards: 3 Chip Options (Halm chip, Halm Duo Čchi, Halm Duo Shi) */}
              <div className="px-3 pb-3 pt-1 space-y-2 border-t border-[#50aab2]/20">
                {CHIP_VARIANTS.map((cv) => {
                  const isVariantActive = activeChipVariant === cv.id;
                  const isVariantSelected = selectedChipVariant === cv.id;

                  return (
                    <div
                      key={cv.id}
                      onClick={() => {
                        setSelectedChipVariant(cv.id);
                        setSelectedMode('chip');
                      }}
                      onMouseEnter={() => {
                        setHoveredChipVariant(cv.id);
                        setHoveredMode('chip');
                      }}
                      onMouseLeave={() => {
                        setHoveredChipVariant(null);
                        setHoveredMode(null);
                      }}
                      className={`w-full rounded-xl p-3 flex items-center justify-between gap-3 border transition-all cursor-pointer select-none text-left ${
                        isVariantActive
                          ? 'bg-surface-container-lowest border-[#50aab2] shadow-xs'
                          : 'bg-surface-container-lowest/60 hover:bg-surface-container-lowest border-outline-variant/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Small Color Badge dot */}
                        <span
                          className="w-3 h-3 rounded-full shrink-0 shadow-2xs"
                          style={{ backgroundColor: cv.color }}
                        />
                        <div>
                          <p className={`font-bold text-xs font-body transition-colors ${isVariantActive ? 'text-[#50aab2]' : 'text-on-surface'}`}>
                            {cv.label}
                          </p>
                          <p className="text-[11px] font-body text-on-surface-variant">
                            {cv.sublabel}
                          </p>
                        </div>
                      </div>

                      {/* Right selection dot */}
                      <span
                        className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all ${
                          isVariantSelected && selectedMode === 'chip'
                            ? 'bg-[#50aab2] ring-2 ring-[#50aab2]/30 scale-125'
                            : 'bg-outline-variant/40'
                        }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 2: Masáž rukou Card */}
            <button
              type="button"
              onClick={() => setSelectedMode('hand')}
              onMouseEnter={() => setHoveredMode('hand')}
              onMouseLeave={() => setHoveredMode(null)}
              className={`w-full rounded-2xl p-4 flex items-center justify-between gap-3 border transition-all cursor-pointer select-none text-left ${
                activeMode === 'hand'
                  ? 'bg-[#e8eeef] border-[#50aab2] shadow-sm'
                  : 'bg-surface-container-low hover:bg-[#e8eeef]/60 border-outline-variant/30'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`w-10 h-10 rounded-full font-headline font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                    activeMode === 'hand'
                      ? 'bg-[#50aab2] text-white'
                      : 'bg-surface-container text-[#50aab2]'
                  }`}
                >
                  <Hand className="w-5 h-5" />
                </span>
                <div>
                  <p className={`font-bold text-sm font-body transition-colors ${activeMode === 'hand' ? 'text-[#50aab2]' : 'text-on-surface'}`}>
                    Masáž rukou
                  </p>
                  <p className="text-xs font-body text-on-surface-variant">
                    Manuální stimulace bodu
                  </p>
                </div>
              </div>

              <span
                className={`w-3.5 h-3.5 rounded-full shrink-0 transition-all ${
                  selectedMode === 'hand' ? 'bg-[#50aab2] scale-110 ring-2 ring-[#50aab2]/30' : 'bg-outline-variant/40'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Related Issues Widget */}
        <div className="bg-surface-container-lowest rounded-[24px] p-6 soft-shadow border border-outline-variant/20">
          <h3 className="text-headline-md font-headline text-[#50aab2] mb-4 text-xl">
            Související potíže
          </h3>
          <div className="flex flex-wrap gap-2">
            {point.symptoms.map((sym) => (
              <span
                key={sym}
                className="px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-[#50aab2] transition-colors text-label-md font-body text-sm cursor-default"
              >
                {sym}
              </span>
            ))}
          </div>
        </div>

        {/* Similar Points Widget */}
        {relatedPoints.length > 0 && (
          <div className="bg-surface-container-lowest rounded-[24px] p-6 soft-shadow border border-outline-variant/20">
            <h3 className="text-headline-md font-headline text-[#50aab2] mb-4 text-xl">
              Podobné body
            </h3>
            <div className="flex flex-col gap-3">
              {relatedPoints.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/bod/${rel.id}`}
                  className="group flex gap-4 items-center p-3 rounded-2xl hover:bg-surface-container transition-colors"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-surface-dim relative border border-outline-variant/20">
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                      sizes="56px"
                    />
                  </div>
                  <div>
                    <h4 className="text-label-md font-body text-[#50aab2] font-bold mb-1 group-hover:text-[#3d8e96] transition-colors">
                      {rel.name} ({rel.code})
                    </h4>
                    <p className="text-body-md font-body text-on-surface-variant text-xs line-clamp-2">
                      {rel.summary}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Consultation CTA */}
        <div className="bg-[#50aab2] text-white rounded-[24px] p-8 shadow-lg text-center">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-headline-md font-headline text-white mb-2 text-xl">
            Máte dotaz k aplikaci?
          </h3>
          <p className="text-body-md font-body text-white/90 mb-6 text-sm">
            Napište nám přes poptávkový formulář pro bližší informace.
          </p>
          <Link
            href="/objednavka"
            className="block w-full bg-white text-[#50aab2] rounded-full py-3 px-6 font-body font-bold text-label-md hover:bg-surface-container-low transition-colors text-center"
          >
            Mám zájem o konzultaci
          </Link>
        </div>
      </div>
    </div>
  );
}
