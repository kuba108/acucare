'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Info, Activity } from 'lucide-react';

interface MeridianDetail {
  code: string;
  name: string;
  pinyin: string;
  description: string;
  element: string;
  catalogPoints: Array<{ id: string; name: string; code: string }>;
  // Hotspot region on image [left%, top%, width%, height%]
  hotspot: { x: number; y: number; w: number; h: number };
}

const MERIDIANS: MeridianDetail[] = [
  {
    code: 'CV',
    name: 'Přední střední dráha (Ren Mai)',
    pinyin: 'Ren Mai (Přední osa těla)',
    description: 'Dráha pojetí a regentského toku jinové energie. Probíhá přesně středem přední části těla.',
    element: 'Jin',
    catalogPoints: [
      { id: 'cv-4', code: 'CV-4', name: 'Guanyuan' },
      { id: 'cv-6', code: 'CV-6', name: 'Qihai' },
      { id: 'cv-12', code: 'CV-12', name: 'Zhongwan' },
      { id: 'cv-17', code: 'CV-17', name: 'Danzhong' },
    ],
    hotspot: { x: 18, y: 15, w: 6, h: 45 },
  },
  {
    code: 'GV',
    name: 'Zadní střední dráha (Du Mai)',
    pinyin: 'Du Mai (Zadní osa páteře)',
    description: 'Moře jangových drah. Probíhá středem zádech a páteře nahoru přes temeno hlavy.',
    element: 'Jang',
    catalogPoints: [
      { id: 'gv-20', code: 'GV-20', name: 'Baihui (Sto setkání)' },
    ],
    hotspot: { x: 77, y: 12, w: 6, h: 50 },
  },
  {
    code: 'ST',
    name: 'Dráha žaludku',
    pinyin: 'Zu Yang Ming Wei Jing',
    description: 'Hlavní dráha výživy, zpracování potravy, posílení vitality a svalové síly.',
    element: 'Země',
    catalogPoints: [
      { id: 'st-36', code: 'ST-36', name: 'Zusanli (Tři míle na noze)' },
      { id: 'st-44', code: 'ST-44', name: 'Neiting' },
    ],
    hotspot: { x: 16, y: 20, w: 10, h: 70 },
  },
  {
    code: 'UB',
    name: 'Dráha močového měchýře',
    pinyin: 'Zu Tai Yang Pang Guang Jing',
    description: 'Nejdelší dráha se 67 body. Prochází hlavou, celými zády a zadní stranou nohou.',
    element: 'Voda',
    catalogPoints: [
      { id: 'ub-10', code: 'UB-10', name: 'Tianzhu' },
      { id: 'ub-23', code: 'UB-23', name: 'Shenshu' },
      { id: 'ub-40', code: 'UB-40', name: 'Weizhong' },
      { id: 'ub-60', code: 'UB-60', name: 'Kunlun' },
    ],
    hotspot: { x: 75, y: 18, w: 10, h: 75 },
  },
  {
    code: 'GB',
    name: 'Dráha žlučníku',
    pinyin: 'Zu Shao Yang Dan Jing',
    description: 'Odpovídá za rozhodnost, uvolnění migrén, spánkového napětí a boků.',
    element: 'Dřevo',
    catalogPoints: [
      { id: 'gb-20', code: 'GB-20', name: 'Fengchi' },
      { id: 'gb-34', code: 'GB-34', name: 'Yanglingquan' },
    ],
    hotspot: { x: 46, y: 15, w: 8, h: 75 },
  },
  {
    code: 'LI',
    name: 'Dráha tlustého střeva',
    pinyin: 'Shou Yang Ming Da Chang Jing',
    description: 'Vylučování odpadních látek, podpora imunity a úleva při bolestech hlavy a zubů.',
    element: 'Kov',
    catalogPoints: [
      { id: 'li-4', code: 'LI-4', name: 'Hegu' },
      { id: 'li-11', code: 'LI-11', name: 'Quchi' },
      { id: 'li-20', code: 'LI-20', name: 'Yingxiang' },
    ],
    hotspot: { x: 6, y: 30, w: 12, h: 30 },
  },
  {
    code: 'LU',
    name: 'Dráha plic',
    pinyin: 'Shou Tai Yin Fei Jing',
    description: 'Řídí dýchání, příjem energie čchi ze vzduchu a obranyschopnost těla.',
    element: 'Kov',
    catalogPoints: [
      { id: 'lu-1', code: 'LU-1', name: 'Zhongfu' },
      { id: 'lu-5', code: 'LU-5', name: 'Chize' },
      { id: 'lu-7', code: 'LU-7', name: 'Lieque' },
    ],
    hotspot: { x: 8, y: 30, w: 10, h: 30 },
  },
  {
    code: 'SP',
    name: 'Dráha sleziny',
    pinyin: 'Zu Tai Yin Pi Jing',
    description: 'Transformuje živiny v energii, řídí krevní oběh a harmonizuje trávení.',
    element: 'Země',
    catalogPoints: [
      { id: 'sp-6', code: 'SP-6', name: 'Sanyinjiao' },
      { id: 'sp-10', code: 'SP-10', name: 'Xuehai' },
    ],
    hotspot: { x: 17, y: 40, w: 8, h: 50 },
  },
  {
    code: 'HT',
    name: 'Dráha srdce',
    pinyin: 'Shou Shao Yin Xin Jing',
    description: 'Sídlo emocí, duševního klidu a vyrovnanosti.',
    element: 'Oheň',
    catalogPoints: [
      { id: 'ht-7', code: 'HT-7', name: 'Shenmen' },
    ],
    hotspot: { x: 10, y: 32, w: 8, h: 28 },
  },
  {
    code: 'SI',
    name: 'Dráha tenkého střeva',
    pinyin: 'Shou Tai Yang Xiao Chang Jing',
    description: 'Odděluje vstřebatelné živiny a uvolňuje napětí krku, ramen a lopatek.',
    element: 'Oheň',
    catalogPoints: [
      { id: 'si-3', code: 'SI-3', name: 'Houxi' },
    ],
    hotspot: { x: 65, y: 30, w: 10, h: 30 },
  },
  {
    code: 'KD',
    name: 'Dráha ledvin',
    pinyin: 'Zu Shao Yin Shen Jing',
    description: 'Pramen životní esence (Jing), tepla, vitality a reprodukčního zdraví.',
    element: 'Voda',
    catalogPoints: [
      { id: 'kd-1', code: 'KD-1', name: 'Yongquan' },
      { id: 'kd-3', code: 'KD-3', name: 'Taixi' },
    ],
    hotspot: { x: 18, y: 40, w: 6, h: 50 },
  },
  {
    code: 'PC',
    name: 'Dráha osrdečníku',
    pinyin: 'Shou Jue Yin Xin Bao Jing',
    description: 'Ochránce srdce, zklidňuje bušení srdce, úzkost a nevolnost.',
    element: 'Oheň',
    catalogPoints: [
      { id: 'pc-6', code: 'PC-6', name: 'Neiguan' },
    ],
    hotspot: { x: 11, y: 32, w: 8, h: 28 },
  },
  {
    code: 'SJ',
    name: 'Dráha trojitého ohřívače',
    pinyin: 'Shou Shao Yang San Jiao Jing',
    description: 'Řídí termoregulaci, rovnováhu tekutin a úlevu při bolestech uší a spánků.',
    element: 'Oheň',
    catalogPoints: [
      { id: 'sj-5', code: 'SJ-5', name: 'Waiguan' },
    ],
    hotspot: { x: 66, y: 30, w: 8, h: 30 },
  },
  {
    code: 'LV',
    name: 'Dráha jater',
    pinyin: 'Zu Jue Yin Gan Jing',
    description: 'Plynulý tok energie čchi i emocí, úleva při stresu, napětí svalů a očí.',
    element: 'Dřevo',
    catalogPoints: [
      { id: 'lv-3', code: 'LV-3', name: 'Taichong' },
    ],
    hotspot: { x: 18, y: 40, w: 6, h: 50 },
  },
];

export function MeridianImageMap() {
  const [activeCode, setActiveCode] = useState<string | null>(null);

  const activeMeridian = MERIDIANS.find((m) => m.code === activeCode) || null;

  return (
    <div className="w-full space-y-8">
      {/* Component Header Card */}
      <div className="bg-surface-container-lowest rounded-[28px] p-6 md:p-10 soft-shadow border border-outline-variant/30">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-outline-variant/20">
          <div>
            <span className="text-[#50aab2] font-body text-xs font-bold uppercase tracking-widest block mb-1">
              Interaktivní vizualizace obrázků
            </span>
            <h3 className="text-headline-md font-headline text-[#50aab2]">
              Zvýraznění energetických drah přímo na ilustraci
            </h3>
            <p className="text-body-md font-body text-on-surface-variant mt-2 max-w-2xl">
              Najeďte na libovolnou dráhu v seznamu nebo přímo na kresbě a sledujte její přesné zvýraznění přímo v ilustraci těla.
            </p>
          </div>

          {activeMeridian ? (
            <div className="bg-[#d6f2f5] px-5 py-3.5 rounded-2xl border border-[#50aab2]/40 flex items-center gap-3 animate-fade-in shrink-0">
              <span className="w-9 h-9 rounded-full bg-[#50aab2] text-white font-bold text-sm flex items-center justify-center font-headline shadow-xs">
                {activeMeridian.code}
              </span>
              <div>
                <p className="font-bold text-[#24656b] text-sm">{activeMeridian.name}</p>
                <p className="text-xs text-[#24656b]/80 font-semibold">{activeMeridian.element} • {activeMeridian.catalogPoints.length} bodů v katalogu</p>
              </div>
            </div>
          ) : (
            <div className="bg-surface-container-low px-4 py-3 rounded-2xl border border-outline-variant/30 flex items-center gap-2.5 text-xs text-on-surface-variant shrink-0">
              <Info className="w-4 h-4 text-[#50aab2]" />
              <span>Najeďte na dráhu pro zvýraznění na obrázku</span>
            </div>
          )}
        </div>

        {/* Main Image Container & Sidebar Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Canvas with Layer Swapping (lg:col-span-8) */}
          <div className="lg:col-span-8 bg-surface-container-low/50 rounded-2xl p-3 md:p-4 border border-outline-variant/30 relative overflow-hidden">
            <div className="relative w-full aspect-[1024/764] rounded-xl overflow-hidden shadow-sm bg-[#e8eeef]">
              
              {/* Base Image */}
              <Image
                src="/full_body_meridians.png"
                alt="3 pohledy na tělo s meridiány a body"
                fill
                className="object-contain select-none"
                priority
              />

              {/* Swapped Highlighted Meridian Image Overlay */}
              {MERIDIANS.map((m) => (
                <Image
                  key={m.code}
                  src={`/meridians/${m.code}.png`}
                  alt={`Zvýrazněný meridián ${m.name}`}
                  fill
                  className={`object-contain select-none transition-opacity duration-200 pointer-events-none ${
                    activeCode === m.code ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              ))}

              {/* Interactive Hotspot Overlay Zones over the image */}
              {MERIDIANS.map((m) => (
                <div
                  key={`hotspot-${m.code}`}
                  style={{
                    left: `${m.hotspot.x}%`,
                    top: `${m.hotspot.y}%`,
                    width: `${m.hotspot.w}%`,
                    height: `${m.hotspot.h}%`,
                  }}
                  onMouseEnter={() => setActiveCode(m.code)}
                  onClick={() => setActiveCode(activeCode === m.code ? null : m.code)}
                  className="absolute cursor-pointer rounded-lg hover:bg-[#50aab2]/10 transition-colors z-20"
                  title={`Zobrazit dráhu ${m.name}`}
                />
              ))}

            </div>
          </div>

          {/* Right Column: Active Meridian Details & Point Quick Links (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            {activeMeridian ? (
              <div className="bg-surface-container-lowest rounded-2xl p-6 border-2 border-[#50aab2] soft-shadow space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#50aab2] text-white font-bold text-base flex items-center justify-center font-headline shadow-xs">
                      {activeMeridian.code}
                    </span>
                    <div>
                      <h4 className="font-bold font-headline text-lg text-[#50aab2]">
                        {activeMeridian.name}
                      </h4>
                      <p className="text-xs text-on-surface-variant italic">{activeMeridian.pinyin}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#d6f2f5] text-[#24656b] text-xs font-bold">
                    Prvek: {activeMeridian.element}
                  </span>
                </div>

                <p className="text-body-md font-body text-on-surface leading-relaxed">
                  {activeMeridian.description}
                </p>

                <div className="pt-3 border-t border-outline-variant/30 space-y-2">
                  <span className="text-xs font-bold text-on-surface uppercase tracking-wider block">
                    Vyznačené body v katalogu:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeMeridian.catalogPoints.map((pt) => (
                      <Link
                        key={pt.id}
                        href={`/bod/${pt.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-low hover:bg-[#50aab2] hover:text-white text-on-surface text-xs font-bold transition-all border border-outline-variant/40 group"
                      >
                        <span>{pt.code} • {pt.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-surface-container-low/60 rounded-2xl p-8 border border-dashed border-outline-variant/40 text-center flex flex-col items-center justify-center space-y-3 min-h-[220px]">
                <Activity className="w-8 h-8 text-[#50aab2]/60 animate-pulse" />
                <h4 className="font-bold text-on-surface font-headline text-base">
                  Najeďte na dráhu
                </h4>
                <p className="text-xs text-on-surface-variant max-w-xs">
                  Najeďte na libovolnou dráhu v seznamu níže nebo přímo na kresbě pro její zvýraznění.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Grid of 14 Meridian Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MERIDIANS.map((m) => {
          const isSelected = activeCode === m.code;

          return (
            <div
              key={m.code}
              onMouseEnter={() => setActiveCode(m.code)}
              onMouseLeave={() => setActiveCode(null)}
              onClick={() => setActiveCode(isSelected ? null : m.code)}
              className={`rounded-2xl p-4.5 flex items-center justify-between gap-3 border transition-all cursor-pointer select-none ${
                isSelected
                  ? 'bg-surface-container-lowest border-[#50aab2] shadow-md scale-[1.02] z-10'
                  : 'bg-surface-container-low hover:bg-surface-container-lowest border-outline-variant/30 hover:border-[#50aab2]/50'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span
                  className={`w-11 h-11 rounded-full font-headline font-bold text-sm flex items-center justify-center shrink-0 transition-all ${
                    isSelected
                      ? 'bg-[#50aab2] text-white shadow-sm'
                      : 'bg-surface-container text-[#50aab2]'
                  }`}
                >
                  {m.code}
                </span>
                <div>
                  <p className={`font-bold text-sm transition-colors ${isSelected ? 'text-[#50aab2]' : 'text-on-surface'}`}>
                    {m.name}
                  </p>
                  <p className="text-xs text-on-surface-variant">
                    {m.catalogPoints.length} {m.catalogPoints.length === 1 ? 'bod' : m.catalogPoints.length < 5 ? 'body' : 'bodů'} v katalogu
                  </p>
                </div>
              </div>

              <span
                className={`w-3.5 h-3.5 rounded-full shrink-0 transition-all ${
                  isSelected ? 'bg-[#50aab2] scale-125' : 'bg-outline-variant/40'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
