'use client';

import React from 'react';
import Image from 'next/image';
import { AcupressurePoint } from '@/data/pointsData';

interface PointVisualDiagramProps {
  point: AcupressurePoint;
}

export function PointVisualDiagram({ point }: PointVisualDiagramProps) {
  return (
    <div className="relative w-full h-[360px] bg-emerald-50 rounded-xl overflow-hidden border border-emerald-200 flex items-center justify-center p-2">
      <Image
        src={point.image}
        alt={`Snímek bodu ${point.code}`}
        fill
        className="object-contain p-2"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}
