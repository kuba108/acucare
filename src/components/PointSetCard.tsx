'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, MapPin, Activity, Clock, ExternalLink, Disc } from 'lucide-react';
import { AcupressurePoint } from '@/data/pointsData';
import { normalizeChipCoordinates } from '@/data/pointLayersConfig';

interface PointSetCardProps {
  point: AcupressurePoint;
  onRemove: (pointId: string) => void;
}

export function PointSetCard({ point, onRemove }: PointSetCardProps) {
  const folderName = point.id.replace(/-/g, '_');
  const [imgSrc, setImgSrc] = useState(`/points/${folderName}/body.png`);
  const chips = normalizeChipCoordinates(point.id);
  const isPair = chips.length > 1;

  return (
    <article className="print-avoid-break bg-surface-container-lowest rounded-[24px] p-5 soft-shadow border border-outline-variant/30 flex flex-col h-full relative group transition-all duration-200 hover:border-[#50aab2]/40 print:rounded-xl print:p-4 print:border-gray-300 print:shadow-none">
      {/* Top Header: Code badge & Remove button */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-[#50aab2] text-white px-3 py-1 rounded-full text-xs font-bold font-body shadow-xs">
            {point.code}
          </span>
          <span className="inline-flex items-center gap-1 bg-[#d6f2f5] text-[#24656b] px-2.5 py-0.5 rounded-full text-[11px] font-semibold font-body">
            <Disc className="w-3 h-3 text-[#50aab2]" />
            {isPair ? '2× chip (párový bod)' : '1× chip'}
          </span>
        </div>

        {/* Remove from set button (hidden on print) */}
        <button
          type="button"
          onClick={() => onRemove(point.id)}
          className="no-print p-1.5 rounded-full text-outline hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
          title="Odebrat bod ze sestavy"
          aria-label={`Odebrat bod ${point.code} ze sestavy`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Point Names */}
      <div className="mb-3">
        <h3 className="text-lg font-headline font-bold text-[#50aab2] leading-tight">
          {point.name}
        </h3>
        <p className="text-xs font-body text-on-surface-variant font-medium">
          {point.pinyinName} • {point.meridian}
        </p>
      </div>

      {/* Visual Canvas: Body + Overlaid Chip(s) */}
      <div className="relative w-full aspect-square overflow-hidden rounded-2xl bg-[#e8eeef] mb-4 border border-outline-variant/20 print:bg-gray-100">
        <Image
          src={imgSrc}
          onError={() => {
            setImgSrc(`/points_images/${folderName}.jpg`);
          }}
          alt={`Umístění chipu pro bod ${point.code} - ${point.name}`}
          fill
          className="object-contain select-none"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Overlaid HALM Chips */}
        {chips.map((chipCoord, idx) => (
          <div
            key={`chip-${idx}`}
            style={{
              left: `${chipCoord.x}%`,
              top: `${chipCoord.y}%`,
              width: `${chipCoord.size ?? 12}%`,
              transform: 'translate(-50%, -50%)',
            }}
            className="absolute aspect-square pointer-events-none z-20 drop-shadow-md"
            title={chipCoord.label || `${point.code} - pozice chipu`}
          >
            <Image
              src="/chips/halm_single.png"
              alt={chipCoord.label || 'HALM® chip'}
              fill
              className="object-contain select-none"
            />
          </div>
        ))}
      </div>

      {/* Point Descriptions */}
      <div className="space-y-3 flex-grow text-xs font-body">
        {/* Poloha */}
        <div className="flex items-start gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#50aab2] shrink-0 mt-0.5" />
          <p className="text-on-surface leading-relaxed">
            <strong className="font-semibold text-on-surface">Poloha: </strong>
            {point.location}
          </p>
        </div>

        {/* Účinek */}
        <div className="flex items-start gap-2">
          <Activity className="w-3.5 h-3.5 text-[#50aab2] shrink-0 mt-0.5" />
          <p className="text-on-surface-variant leading-relaxed">
            <strong className="font-semibold text-on-surface">Účinek: </strong>
            {point.summary}
          </p>
        </div>

        {/* Doba aplikace */}
        <div className="flex items-center gap-2 pt-2 border-t border-outline-variant/20 text-[#24656b] font-medium">
          <Clock className="w-3.5 h-3.5 text-[#50aab2] shrink-0" />
          <span>Aplikace HALM® chipu: 30 min až 3 hodiny</span>
        </div>
      </div>

      {/* Link to detail page (hidden on print) */}
      <div className="no-print mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-end">
        <Link
          href={`/bod/${point.id}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#50aab2] hover:text-[#3d8e96] transition-colors"
        >
          <span>Podrobný detail bodu</span>
          <ExternalLink className="w-3 h-3" />
        </Link>
      </div>
    </article>
  );
}
