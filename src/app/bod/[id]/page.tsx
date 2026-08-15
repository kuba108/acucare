import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Activity, ShieldAlert, Clock, ChevronRight, Brain, Frown, CircleDot, Wind } from 'lucide-react';
import { ACUPRESSURE_POINTS } from '@/data/pointsData';

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

  // Split symptoms into indication cards
  const indicationIcons = [Brain, Frown, CircleDot, Wind];

  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-container-padding py-12 md:py-16">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-label-md font-body mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Zpět na katalog</span>
          </Link>
          <span className="text-secondary font-body text-label-md uppercase tracking-widest mb-2 block">
            Akupresurní bod – {point.bodyRegion}
          </span>
          <h1 className="text-headline-xl font-headline text-primary mb-2">
            Bod {point.name} ({point.code})
          </h1>
          <p className="text-body-lg font-body text-on-surface-variant max-w-2xl">
            {point.summary}
          </p>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left Column (Canvas) */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          {/* Image Card */}
          <section className="bg-surface-container-lowest rounded-[24px] p-2 md:p-4 soft-shadow relative overflow-hidden">
            <div className="relative w-full aspect-video md:aspect-[16/10] rounded-[20px] overflow-hidden bg-surface-container">
              <Image
                src={point.image}
                alt={`Snímek bodu ${point.code} - ${point.name}`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </div>
            <div className="p-4 md:px-6 md:pb-6 md:pt-4">
              <p className="text-body-md font-body text-on-surface-variant flex items-center gap-2">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0" />
                {point.location}
              </p>
            </div>
          </section>

          {/* O čem bod vypovídá */}
          <section className="bg-surface-container-lowest rounded-[24px] p-8 md:p-10 soft-shadow">
            <h2 className="text-headline-md font-headline text-primary mb-6 flex items-center gap-3">
              <Activity className="w-6 h-6 text-secondary" />
              O čem bod vypovídá
            </h2>
            <div className="prose max-w-none text-body-md font-body text-on-surface-variant space-y-4">
              <p>{point.usage}</p>
            </div>
          </section>

          {/* Indikace (Bento Grid Style) */}
          <section>
            <h2 className="text-headline-md font-headline text-primary mb-6">
              Indikace (Co bod léčí)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {point.symptoms.slice(0, 4).map((sym, idx) => {
                const Icon = indicationIcons[idx % indicationIcons.length];
                return (
                  <div key={sym} className="bg-surface-container-lowest rounded-2xl p-6 soft-shadow card-hover flex flex-col gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container mb-2">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-label-md font-body text-primary font-bold text-lg">{sym}</h3>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Instrukce k masáži */}
          <section className="bg-surface-container-lowest rounded-[24px] p-8 md:p-10 soft-shadow">
            <h2 className="text-headline-md font-headline text-primary mb-8">
              Instrukce k masáži
            </h2>
            <div className="flex flex-col gap-8 relative before:absolute before:inset-y-0 before:left-[19px] before:w-px before:bg-outline-variant/30">
              {/* Step 1 */}
              <div className="flex gap-6 relative z-10">
                <div className="w-10 h-10 shrink-0 rounded-full bg-surface-container flex items-center justify-center border-2 border-surface-container-lowest shadow-sm text-secondary font-body text-lg">
                  1
                </div>
                <div className="pt-2">
                  <h3 className="text-body-lg font-body text-primary font-bold mb-2">Lokalizujte bod</h3>
                  <p className="text-body-md font-body text-on-surface-variant">
                    {point.location}
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex gap-6 relative z-10">
                <div className="w-10 h-10 shrink-0 rounded-full bg-surface-container flex items-center justify-center border-2 border-surface-container-lowest shadow-sm text-secondary font-body text-lg">
                  2
                </div>
                <div className="pt-2">
                  <h3 className="text-body-lg font-body text-primary font-bold mb-2">Aplikujte tlak a masírujte</h3>
                  <p className="text-body-md font-body text-on-surface-variant">
                    {point.stimulationMethod}
                  </p>
                </div>
              </div>
              {/* Cautions */}
              {point.cautions && (
                <div className="flex gap-6 relative z-10">
                  <div className="w-10 h-10 shrink-0 rounded-full bg-secondary flex items-center justify-center border-2 border-surface-container-lowest shadow-sm text-on-secondary">
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
        <div className="lg:col-span-4 flex flex-col gap-8">
          {/* Similar Points Widget */}
          {relatedPoints.length > 0 && (
            <div className="bg-surface-container-lowest rounded-[24px] p-6 soft-shadow">
              <h3 className="text-headline-md font-headline text-primary mb-6 text-xl">
                Podobné body
              </h3>
              <div className="flex flex-col gap-4">
                {relatedPoints.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/bod/${rel.id}`}
                    className="group flex gap-4 items-center p-3 rounded-2xl hover:bg-surface-container transition-colors"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-surface-dim relative">
                      <Image
                        src={rel.image}
                        alt={rel.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h4 className="text-label-md font-body text-primary font-bold mb-1 group-hover:text-secondary transition-colors">
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

          {/* Related Issues Widget */}
          <div className="bg-surface-container-lowest rounded-[24px] p-6 soft-shadow">
            <h3 className="text-headline-md font-headline text-primary mb-6 text-xl">
              Související potíže
            </h3>
            <div className="flex flex-wrap gap-2">
              {point.symptoms.map((sym) => (
                <span
                  key={sym}
                  className="px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors text-label-md font-body text-sm cursor-default"
                >
                  {sym}
                </span>
              ))}
            </div>
          </div>

          {/* Consultation CTA */}
          <div className="bg-primary text-on-primary rounded-[24px] p-8 shadow-lg text-center">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-headline-md font-headline text-white mb-2 text-xl">
              Nejste si jistí?
            </h3>
            <p className="text-body-md font-body text-inverse-primary mb-6 text-sm">
              Konzultujte své potíže s certifikovaným terapeutem čínské medicíny.
            </p>
            <Link
              href="/"
              className="block w-full bg-white text-primary rounded-full py-3 px-6 font-body text-label-md hover:bg-surface-container-low transition-colors text-center"
            >
              Zpět na katalog
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
