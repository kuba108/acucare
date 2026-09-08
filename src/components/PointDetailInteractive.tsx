'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin, Activity, ShieldAlert, Sparkles, Brain, Frown, CircleDot, Wind,
  Hand, Disc, ChevronRight
} from 'lucide-react';
import { AcupressurePoint } from '@/data/pointsData';

interface PointDetailInteractiveProps {
  point: AcupressurePoint;
  relatedPoints: AcupressurePoint[];
}

type ViewMode = 'chip' | 'hand';

export function PointDetailInteractive({ point, relatedPoints }: PointDetailInteractiveProps) {
  const [selectedMode, setSelectedMode] = useState<ViewMode>('chip');
  const [hoveredMode, setHoveredMode] = useState<ViewMode | null>(null);

  const activeMode = hoveredMode || selectedMode;

  const idWithUnderscore = point.id.replace(/-/g, '_');
  const pngChips = ['cv_12', 'cv_4', 'cv_6'];
  const chipExt = pngChips.includes(idWithUnderscore) ? 'png' : 'jpg';

  const images: Record<ViewMode, string> = {
    chip: `/point_images_chip/${idWithUnderscore}.${chipExt}`,
    hand: `/points_images/${idWithUnderscore}.jpg`,
  };

  const currentImageSrc = images[activeMode];

  const indicationIcons = [Brain, Frown, CircleDot, Wind];

  const VIEWS = [
    {
      id: 'chip' as ViewMode,
      label: 'Aplikace chipu',
      sublabel: 'AcuCare akupresurní chip',
      icon: Disc,
    },
    {
      id: 'hand' as ViewMode,
      label: 'Masáž rukou',
      sublabel: 'Manuální stimulace bodu',
      icon: Hand,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
      {/* Left Column (Canvas & Info) */}
      <div className="lg:col-span-8 flex flex-col gap-10">
        {/* Main Image Card with View Badge */}
        <section className="bg-surface-container-lowest rounded-[24px] soft-shadow overflow-hidden border border-outline-variant/30 relative group">
          
          {/* Active Mode Badge on top left of image */}
          <div className="absolute top-4 left-4 z-20 px-4 py-2 rounded-full bg-surface-container-lowest/90 backdrop-blur-md border border-outline-variant/40 shadow-sm flex items-center gap-2 text-xs font-bold text-[#50aab2]">
            {activeMode === 'chip' ? (
              <>
                <Disc className="w-4 h-4 text-[#50aab2]" />
                <span>Aplikace chipu</span>
              </>
            ) : (
              <>
                <Hand className="w-4 h-4 text-[#50aab2]" />
                <span>Masáž rukou</span>
              </>
            )}
          </div>

          <div className="relative w-full aspect-square overflow-hidden rounded-[24px] bg-[#e8eeef]">
            <Image
              key={currentImageSrc}
              src={currentImageSrc}
              alt={`Snímek bodu ${point.code} - ${point.name} (${activeMode === 'chip' ? 'Aplikace chipu' : 'Masáž rukou'})`}
              fill
              className="object-contain transition-opacity duration-300"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
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
            {VIEWS.map((view) => {
              const isActive = activeMode === view.id;
              const isSelected = selectedMode === view.id;
              const Icon = view.icon;

              return (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => setSelectedMode(view.id)}
                  onMouseEnter={() => setHoveredMode(view.id)}
                  onMouseLeave={() => setHoveredMode(null)}
                  className={`w-full rounded-2xl p-4 flex items-center justify-between gap-3 border transition-all cursor-pointer select-none text-left ${
                    isActive
                      ? 'bg-[#e8eeef] border-[#50aab2] shadow-sm'
                      : 'bg-surface-container-low hover:bg-[#e8eeef]/60 border-outline-variant/30'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`w-10 h-10 rounded-full font-headline font-bold text-xs flex items-center justify-center shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#50aab2] text-white'
                          : 'bg-surface-container text-[#50aab2]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <p className={`font-bold text-sm font-body transition-colors ${isActive ? 'text-[#50aab2]' : 'text-on-surface'}`}>
                        {view.label}
                      </p>
                      <p className="text-xs font-body text-on-surface-variant">
                        {view.sublabel}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`w-3.5 h-3.5 rounded-full shrink-0 transition-all ${
                      isSelected ? 'bg-[#50aab2] scale-110 ring-2 ring-[#50aab2]/30' : 'bg-outline-variant/40'
                    }`}
                  />
                </button>
              );
            })}
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
