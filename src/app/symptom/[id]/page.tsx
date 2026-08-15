import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SYMPTOM_OPTIONS } from '@/data/symptomsData';
import { ACUPRESSURE_POINTS } from '@/data/pointsData';
import { SearchBar } from '@/components/SearchBar';
import {
  Activity,
  Moon,
  Brain,
  Smile,
  Wind,
  Flame,
  Zap,
  ShieldAlert,
  Sparkles,
  Volume2,
  Heart,
  ChevronRight
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Activity,
  Moon,
  Brain,
  Smile,
  Wind,
  Flame,
  Zap,
  ShieldAlert,
  Sparkles,
  Volume2,
  Heart,
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return SYMPTOM_OPTIONS.map((sym) => ({
    id: sym.id,
  }));
}

export default async function SymptomDetailPage({ params }: PageProps) {
  const { id } = await params;
  const currentSymptom = SYMPTOM_OPTIONS.find((s) => s.id === id);

  if (!currentSymptom) {
    notFound();
  }

  // Get matching points for the active symptom
  const recommendedPoints = ACUPRESSURE_POINTS.filter((p) =>
    currentSymptom.pointIds.includes(p.id)
  );

  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-container-padding py-section-gap flex flex-col gap-section-gap">
      {/* Hero & Search Section */}
      <section className="text-center max-w-3xl mx-auto space-y-8 animate-[fadeIn_0.5s_ease-in-out]">
        <h1 className="text-headline-xl font-headline text-primary">
          Průvodce řešením problémů
        </h1>
        <p className="text-body-lg font-body text-on-surface-variant">
          Holistický přístup vnímá tělo jako propojený celek. Nalezněte úlevu pomocí jemných dotyků na správných místech. Vyberte svůj symptom nebo využijte vyhledávání a objevte cestu k přirozené rovnováze.
        </p>

        {/* Hero Search Bar */}
        <SearchBar />
      </section>

      {/* Recommended Points Section - Full Width Grid of 3-4 Cards */}
      <section className="space-y-8 animate-[fadeIn_0.5s_ease-in-out]">
        <div className="flex items-center gap-4 border-b border-outline-variant/30 pb-6">
          <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-primary flex-shrink-0">
            {React.createElement(ICON_MAP[currentSymptom.iconName] || Activity, {
              className: 'w-8 h-8',
            })}
          </div>
          <div>
            <h2 className="text-headline-lg font-headline text-primary text-2xl">
              Doporučené body pro: {currentSymptom.label}
            </h2>
            <p className="text-body-md font-body text-on-surface-variant mt-2">
              {currentSymptom.description}
            </p>
          </div>
        </div>

        {/* 3-4 Columns Point Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedPoints.map((point) => (
            <article
              key={point.id}
              className="bg-surface-container-lowest rounded-[24px] p-5 border border-outline-variant/30 hover:border-primary soft-shadow hover:shadow-md transition-all duration-300 flex flex-col h-full group"
            >
              {/* Point Image */}
              <div className="relative w-full h-40 rounded-xl overflow-hidden mb-4 bg-surface-container flex-shrink-0">
                <Image
                  src={point.image}
                  alt={point.name}
                  fill
                  className="object-cover opacity-95 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute top-3 left-3 bg-primary text-on-primary px-2.5 py-0.5 rounded-full text-[11px] font-semibold font-body shadow-sm">
                  {point.code}
                </div>
              </div>

              {/* Point Info */}
              <div className="flex-grow flex flex-col justify-between">
                <div>
                  <h3 className="text-headline-md font-headline text-primary text-base line-clamp-1">
                    {point.name}
                  </h3>
                  <span className="text-[11px] font-body text-on-surface-variant/80 block mt-0.5">
                    Zóna: {point.bodyRegion}
                  </span>
                  <p className="text-body-md font-body text-on-surface-variant text-xs line-clamp-3 mt-3 leading-relaxed">
                    {point.location}
                  </p>
                </div>

                <Link
                  href={`/bod/${point.id}`}
                  className="mt-6 pt-4 border-t border-outline-variant/30 text-primary text-xs font-bold hover:text-primary-container flex items-center justify-between group/link"
                >
                  <span>Zobrazit detail bodu</span>
                  <ChevronRight className="w-4 h-4 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
