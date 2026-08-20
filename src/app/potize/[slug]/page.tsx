import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SYMPTOM_OPTIONS, SymptomOption } from '@/data/symptomsData';
import { ACUPRESSURE_POINTS, AcupressurePoint } from '@/data/pointsData';
import { PointCard } from '@/components/PointCard';
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
  ChevronRight,
  ArrowLeft
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
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SYMPTOM_OPTIONS.map((symptom) => ({
    slug: symptom.id,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const symptom = SYMPTOM_OPTIONS.find((s) => s.id === slug);
  if (!symptom) return { title: 'Potíže nenalezeny | AcuCare' };

  return {
    title: `Akupresurní body pro: ${symptom.label} | AcuCare`,
    description: symptom.description,
  };
}

export default async function SymptomDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const symptom = SYMPTOM_OPTIONS.find((s) => s.id === slug);

  if (!symptom) {
    notFound();
  }

  // Get matching points for this symptom
  const points: AcupressurePoint[] = symptom.pointIds
    .map((id) => ACUPRESSURE_POINTS.find((p) => p.id === id))
    .filter((p): p is AcupressurePoint => Boolean(p));

  const IconComponent = ICON_MAP[symptom.iconName] || Activity;

  // Other symptoms for quick navigation
  const otherSymptoms = SYMPTOM_OPTIONS.filter((s) => s.id !== symptom.id);

  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-container-padding py-12 md:py-16">
      {/* Header with Breadcrumb and Icon */}
      <div className="mb-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-label-md font-body mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zpět na vyhledávání</span>
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-surface-container-lowest rounded-[28px] p-8 md:p-10 soft-shadow border border-outline-variant/20">
          <div className="flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 shadow-sm">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <span className="text-secondary font-body text-label-md uppercase tracking-widest block font-semibold mb-1">
                Zdravotní potíže a příznaky
              </span>
              <h1 className="text-headline-md md:text-headline-xl font-headline text-primary mb-2">
                {symptom.label}
              </h1>
              <p className="text-body-lg font-body text-on-surface-variant max-w-2xl">
                {symptom.description}
              </p>
            </div>
          </div>

          <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-4 md:pt-0 border-outline-variant/20">
            <span className="text-xs uppercase font-body tracking-wider text-outline font-semibold">
              Doporučené body
            </span>
            <span className="text-3xl font-headline font-bold text-primary">
              {points.length}
            </span>
          </div>
        </div>
      </div>

      {/* Points Grid */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-headline-md font-headline text-primary">
            Doporučené akupresurní body ({points.length})
          </h2>
        </div>

        {points.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter lg:gap-8">
            {points.map((point) => (
              <PointCard key={point.id} point={point} />
            ))}
          </div>
        ) : (
          <div className="bg-surface-container-lowest rounded-2xl p-12 text-center text-on-surface-variant">
            Pro tuto kategorii nebyly nalezeny žádné specifické body.
          </div>
        )}
      </section>

      {/* Other Symptoms Navigation */}
      <section className="bg-surface-container-low rounded-[28px] p-8 md:p-10 border border-outline-variant/30">
        <h3 className="text-headline-md font-headline text-primary text-xl mb-6">
          Další časté potíže a témata
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {otherSymptoms.map((other) => (
            <Link
              key={other.id}
              href={`/potize/${other.id}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface-variant font-body text-sm font-semibold transition-all border border-outline-variant/30 shadow-xs group"
            >
              <span>{other.label}</span>
              <ChevronRight className="w-3.5 h-3.5 text-primary group-hover:text-on-primary transition-colors" />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
