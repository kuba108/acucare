import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { ACUPRESSURE_POINTS } from '@/data/pointsData';
import { SYMPTOM_OPTIONS } from '@/data/symptomsData';
import { resolvePointLayersServer } from '@/lib/pointLayersServer';
import { PointDetailInteractive } from '@/components/PointDetailInteractive';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ACUPRESSURE_POINTS.map((point) => ({
    id: point.id,
  }));
}

export default async function PointDetailPage({ params }: PageProps) {
  const { id } = await params;
  const point = ACUPRESSURE_POINTS.find((p) => p.id === id);

  if (!point) {
    notFound();
  }

  const relatedPoints = ACUPRESSURE_POINTS.filter(
    (p) => p.id !== point.id && p.bodyRegion === point.bodyRegion
  ).slice(0, 3);

  const initialLayers = resolvePointLayersServer(point.id);

  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-container-padding py-12 md:py-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
        <div>
          <h1 className="text-headline-xl font-headline text-[#50aab2] mb-2">
            Bod {point.name} ({point.code})
          </h1>
          <p className="text-body-lg font-body text-on-surface-variant max-w-2xl">
            {point.summary}
          </p>
        </div>
      </div>

      {/* Interactive Detail Layout */}
      <PointDetailInteractive
        point={point}
        relatedPoints={relatedPoints}
        initialLayers={initialLayers}
      />

      {/* Další časté potíže a témata */}
      <section className="mt-12 md:mt-16 bg-surface-container-low rounded-[28px] p-8 md:p-10 border border-outline-variant/30">
        <h3 className="text-headline-md font-headline text-primary text-xl mb-6">
          Další časté potíže a témata
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {SYMPTOM_OPTIONS.map((symptom) => (
            <Link
              key={symptom.id}
              href={`/potize/${symptom.id}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface-variant font-body text-sm font-semibold transition-all border border-outline-variant/30 shadow-xs group cursor-pointer"
            >
              <span>{symptom.label}</span>
              <ChevronRight className="w-3.5 h-3.5 text-primary group-hover:text-on-primary transition-colors" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
