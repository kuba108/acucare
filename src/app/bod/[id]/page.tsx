import React from 'react';
import { notFound } from 'next/navigation';
import { ACUPRESSURE_POINTS } from '@/data/pointsData';
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
      <PointDetailInteractive point={point} relatedPoints={relatedPoints} />
    </main>
  );
}
