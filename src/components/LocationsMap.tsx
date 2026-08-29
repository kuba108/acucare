'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Clock, ArrowRight, Sparkles, Building2, CheckCircle2 } from 'lucide-react';
import { MEASURING_LOCATIONS, MeasuringLocation } from '@/data/locationsData';

export function LocationsMap() {
  const [activeLocationId, setActiveLocationId] = useState<string | null>(null);

  const activeLocation = MEASURING_LOCATIONS.find((l) => l.id === activeLocationId) || null;

  return (
    <section className="w-full py-16 md:py-24 px-container-padding bg-surface-container-low/50 border-t border-b border-outline-variant/20">
      <div className="max-w-[1200px] mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[#50aab2] font-body text-label-md uppercase tracking-widest mb-3 inline-block font-semibold">
            Kde nás najdete
          </span>
          <h2 className="text-headline-lg-mobile md:text-headline-xl font-headline text-[#50aab2] mb-4">
            Měřící ordinace & Prodejní místa
          </h2>
          <p className="text-body-lg font-body text-on-surface-variant leading-relaxed">
            Vyzkoušejte akupresurní přístroj Henex osobně. Navštivte naši autorizovanou měřící ordinaci 
            nebo prodejní místo v ČR pro profesionální měření energetických drah a konzultaci.
          </p>
        </div>

        {/* Interactive Layout: Map + Location Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Czech Republic Map Graphic Container (lg:col-span-7) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-[28px] p-6 md:p-8 soft-shadow border border-outline-variant/30 relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-outline-variant/20">
              <span className="text-xs font-bold text-[#50aab2] uppercase tracking-wider flex items-center gap-2 font-body">
                <MapPin className="w-4 h-4" />
                Mapa měřících míst ČR
              </span>
              <span className="text-xs text-on-surface-variant">
                Klikněte na bod pro detail
              </span>
            </div>

            {/* Map Canvas Aspect Wrapper */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl bg-[#e8eeef]/60 overflow-hidden border border-outline-variant/20 flex items-center justify-center p-4">
              
              {/* Czech Republic Outline Map Background Image */}
              <div className="relative w-full h-full max-w-[550px] mx-auto flex items-center justify-center">
                <Image
                  src="/cz_map.png"
                  alt="Mapa České republiky – Měřící a prodejní místa AcuCare"
                  fill
                  className="object-contain opacity-85 filter drop-shadow-sm hue-rotate-[180deg] saturate-50"
                  priority
                />

                {/* Render Location Pins on Map */}
                {MEASURING_LOCATIONS.map((loc) => {
                  const isSelected = activeLocationId === loc.id;

                  return (
                    <div
                      key={loc.id}
                      style={{
                        left: `${loc.mapCoords.x}%`,
                        top: `${loc.mapCoords.y}%`,
                      }}
                      onMouseEnter={() => setActiveLocationId(loc.id)}
                      onClick={() => setActiveLocationId(isSelected ? null : loc.id)}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30 group"
                    >
                      {/* Pulse Ring Animation */}
                      <span className={`absolute -inset-3 rounded-full opacity-75 animate-ping transition-colors ${
                        isSelected ? 'bg-[#50aab2]' : 'bg-[#50aab2]/40'
                      }`} />

                      {/* Pin Button */}
                      <div className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                        isSelected
                          ? 'bg-[#50aab2] text-white scale-125 ring-4 ring-white'
                          : 'bg-surface-container-lowest text-[#50aab2] border-2 border-[#50aab2] group-hover:scale-110'
                      }`}>
                        <MapPin className="w-4 h-4 fill-current" />
                      </div>

                      {/* Floating Tooltip Label */}
                      <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-xl bg-surface-container-lowest text-on-surface shadow-md border border-outline-variant/40 whitespace-nowrap text-xs font-bold transition-all duration-200 pointer-events-none z-40 ${
                        isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                      }`}>
                        <span className="text-[#50aab2] font-semibold block text-[10px] uppercase">
                          {loc.city}
                        </span>
                        <span>{loc.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Map Footer Info Notice */}
            <div className="mt-4 pt-3 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-3 text-xs text-on-surface-variant font-body">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#50aab2] inline-block" />
                <span>Měřící ordinace i prodejní místa v provozu</span>
              </div>
              <span className="font-semibold text-[#50aab2]">Připravujeme další místa v ČR</span>
            </div>
          </div>

          {/* Location Cards List (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            {MEASURING_LOCATIONS.map((loc) => {
              const isSelected = activeLocationId === loc.id;

              return (
                <div
                  key={loc.id}
                  onMouseEnter={() => setActiveLocationId(loc.id)}
                  onMouseLeave={() => setActiveLocationId(null)}
                  className={`rounded-[24px] p-6 transition-all duration-300 border cursor-pointer ${
                    isSelected
                      ? 'bg-surface-container-lowest border-[#50aab2] shadow-md ring-1 ring-[#50aab2]/30 scale-[1.01]'
                      : 'bg-surface-container-lowest hover:bg-surface-container-low/60 border-outline-variant/30'
                  }`}
                >
                  {/* Top Badge & City */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-[#d6f2f5] text-[#24656b] font-bold text-xs font-body">
                      {loc.type}
                    </span>
                    <span className="text-xs font-semibold text-on-surface-variant flex items-center gap-1 font-body">
                      <MapPin className="w-3.5 h-3.5 text-[#50aab2]" />
                      {loc.region}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-headline-md font-headline text-[#50aab2] text-xl mb-2">
                    {loc.name}
                  </h3>

                  <p className="text-sm font-body text-on-surface font-semibold mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-outline/60 shrink-0" />
                    <span>{loc.address}</span>
                  </p>

                  {loc.note && (
                    <p className="text-xs font-body text-on-surface-variant leading-relaxed mb-4 bg-surface-container-low/50 p-3 rounded-xl border border-outline-variant/20">
                      {loc.note}
                    </p>
                  )}

                  {/* Contact details */}
                  <div className="space-y-1.5 text-xs font-body text-on-surface-variant mb-5">
                    {loc.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#50aab2]" />
                        <a href={`tel:${loc.phone}`} className="hover:text-[#50aab2] transition-colors font-semibold">
                          {loc.phone}
                        </a>
                      </div>
                    )}
                    {loc.hours && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#50aab2]" />
                        <span>{loc.hours}</span>
                      </div>
                    )}
                  </div>

                  {/* CTA Link to order form */}
                  <Link
                    href={`/objednavka?misto=${loc.id}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-3 px-5 rounded-full bg-[#50aab2] hover:bg-[#3d8e96] text-white font-bold text-xs transition-colors shadow-xs group"
                  >
                    <span>Objednat se na měření ({loc.city})</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
