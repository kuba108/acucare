import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AcupressurePoint } from '@/data/pointsData';

interface PointCardProps {
  point: AcupressurePoint;
  highlightQuery?: string;
}

export function PointCard({ point, highlightQuery }: PointCardProps) {
  return (
    <Link href={`/bod/${point.id}`}>
      <article className="bg-surface-container-lowest rounded-[24px] p-[24px] glass-card transition-all duration-300 flex flex-col h-full group cursor-pointer border border-transparent hover:border-surface-container-highest">
        {/* Image Area */}
        <div className="relative w-full h-48 rounded-xl overflow-hidden mb-6 bg-surface-container-low">
          <Image
            src={point.image}
            alt={`${point.name} (${point.code})`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-full text-label-md font-body shadow-sm">
            {point.code}
          </div>
        </div>

        {/* Content */}
        <div className="flex-grow space-y-3">
          <h2 className="text-headline-md font-headline text-primary text-xl">
            {point.name}
          </h2>
          <p className="text-body-md font-body text-on-surface-variant line-clamp-2">
            {point.summary}
          </p>
        </div>

        {/* Indikace Footer */}
        <div className="mt-6 pt-4 border-t border-outline-variant/30">
          <span className="text-label-md font-body text-secondary uppercase tracking-wider block mb-2">
            Indikace
          </span>
          <p className="text-body-md font-body text-on-surface line-clamp-1">
            {point.symptoms.slice(0, 4).join(', ')}
          </p>
        </div>
      </article>
    </Link>
  );
}
