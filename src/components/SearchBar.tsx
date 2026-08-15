'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ChevronRight } from 'lucide-react';
import { ACUPRESSURE_POINTS, AcupressurePoint, POPULAR_SYMPTOMS } from '@/data/pointsData';

interface SearchBarProps {
  onSearchChange?: (query: string, results: AcupressurePoint[]) => void;
}

export function SearchBar({ onSearchChange }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [matchedPoints, setMatchedPoints] = useState<AcupressurePoint[]>([]);
  const [matchedSymptoms, setMatchedSymptoms] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const onSearchChangeRef = useRef(onSearchChange);

  useEffect(() => {
    onSearchChangeRef.current = onSearchChange;
  }, [onSearchChange]);

  const allSymptoms = useMemo(() => {
    const syms = new Set<string>();
    ACUPRESSURE_POINTS.forEach((p) => p.symptoms.forEach((s) => syms.add(s)));
    return Array.from(syms);
  }, []);

  useEffect(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setMatchedPoints([]);
      setMatchedSymptoms([]);
      onSearchChangeRef.current?.('', []);
      return;
    }

    const symMatches = allSymptoms.filter((s) => s.toLowerCase().includes(trimmed));
    setMatchedSymptoms(symMatches.slice(0, 8));

    const pointMatches = ACUPRESSURE_POINTS.filter((p) => {
      const searchFields = [
        p.name, p.code, p.pinyinName, p.summary, p.usage, p.bodyRegion,
        ...p.symptoms,
      ].join(' ').toLowerCase();
      return searchFields.includes(trimmed);
    });
    setMatchedPoints(pointMatches);
    onSearchChangeRef.current?.(query, pointMatches);
  }, [query, allSymptoms]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  const handleSelectSymptom = (sym: string) => {
    setQuery(sym);
    setIsOpen(true);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto" id="symptomy">
      {/* Search Input - Stitch rounded-full style */}
      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-outline" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Hledat bod (např. LI4) nebo symptom..."
          className="w-full bg-surface-container-lowest border border-outline-variant rounded-full py-4 pl-14 pr-12 text-body-lg font-body text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] transition-all placeholder:text-outline"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-5 top-1/2 -translate-y-1/2 p-1 rounded-full text-outline hover:bg-surface-container-low transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Popular Symptoms Pills */}
      {!query && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {POPULAR_SYMPTOMS.map((pop) => (
            <button
              key={pop.query}
              onClick={() => handleSelectSymptom(pop.query)}
              className="px-5 py-2 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high text-label-md font-body transition-colors flex-shrink-0"
            >
              {pop.label}
            </button>
          ))}
        </div>
      )}

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-xl p-4 z-30 max-h-[420px] overflow-y-auto">
          {matchedSymptoms.length > 0 && (
            <div className="mb-3 pb-3 border-b border-outline-variant/30">
              <span className="text-label-md font-body text-secondary uppercase tracking-wider block mb-2">
                Vyhledané příznaky
              </span>
              <div className="flex flex-wrap gap-2">
                {matchedSymptoms.map((sym) => (
                  <button
                    key={sym}
                    onClick={() => handleSelectSymptom(sym)}
                    className="px-4 py-2 rounded-full border border-outline-variant text-on-surface-variant hover:bg-surface-container hover:text-primary transition-colors text-label-md font-body text-sm"
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>
          )}

          <span className="text-label-md font-body text-primary uppercase tracking-wider block mb-2">
            Nalezené body ({matchedPoints.length})
          </span>

          {matchedPoints.length > 0 ? (
            <div className="flex flex-col gap-1">
              {matchedPoints.slice(0, 6).map((point) => (
                <Link
                  key={point.id}
                  href={`/bod/${point.id}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-surface-container text-on-surface transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center font-bold text-xs text-primary">
                      {point.code}
                    </span>
                    <div>
                      <span className="font-bold text-sm block group-hover:text-primary text-label-md font-body">
                        {point.name}
                      </span>
                      <span className="text-body-md font-body text-on-surface-variant text-xs line-clamp-1">
                        {point.summary}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-body-md font-body text-on-surface-variant">
              Nenalezen žádný bod pro &quot;{query}&quot;.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
