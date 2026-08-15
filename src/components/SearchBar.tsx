'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ChevronRight, Activity } from 'lucide-react';
import { ACUPRESSURE_POINTS, AcupressurePoint } from '@/data/pointsData';
import { SYMPTOM_OPTIONS, SymptomOption } from '@/data/symptomsData';

interface SearchBarProps {
  onSearchChange?: (query: string, results: AcupressurePoint[]) => void;
}

export function SearchBar({ onSearchChange }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<'symptom' | 'point'>('symptom');
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter matching symptoms (Mode: symptom)
  const matchedSymptoms = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed || searchMode !== 'symptom') return [];

    return SYMPTOM_OPTIONS.filter((s) => {
      const matchLabel = s.label.toLowerCase().includes(trimmed);
      const matchKeywords = s.keywords.some((kw) => kw.includes(trimmed));
      return matchLabel || matchKeywords;
    });
  }, [query, searchMode]);

  // Filter matching points directly (Mode: point)
  const matchedPoints = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    // Mode: point
    if (searchMode === 'point') {
      return ACUPRESSURE_POINTS.filter((p) => {
        return (
          p.name.toLowerCase().includes(trimmed) ||
          p.code.toLowerCase().includes(trimmed) ||
          p.pinyinName.toLowerCase().includes(trimmed)
        );
      });
    }

    return [];
  }, [query, searchMode]);

  // Sync results for catalog filter if needed
  useEffect(() => {
    if (!onSearchChange) return;

    if (searchMode === 'point') {
      onSearchChange(query, matchedPoints);
    } else {
      // For symptom mode, collect all points from matching symptoms
      const pointIds = new Set<string>();
      matchedSymptoms.forEach((s) => s.pointIds.forEach((id) => pointIds.add(id)));
      const points = ACUPRESSURE_POINTS.filter((p) => pointIds.has(p.id));
      onSearchChange(query, points);
    }
  }, [query, searchMode, matchedSymptoms, matchedPoints, onSearchChange]);

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

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto space-y-4">
      {/* Search Mode Tabs */}
      <div className="flex justify-center gap-4 text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => {
            setSearchMode('symptom');
            setQuery('');
          }}
          className={`pb-1 border-b-2 transition-all ${
            searchMode === 'symptom'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-on-surface-variant hover:text-primary'
          }`}
        >
          Co mě trápí
        </button>
        <button
          onClick={() => {
            setSearchMode('point');
            setQuery('');
          }}
          className={`pb-1 border-b-2 transition-all ${
            searchMode === 'point'
              ? 'border-primary text-primary font-bold'
              : 'border-transparent text-on-surface-variant hover:text-primary'
          }`}
        >
          Název bodu / Kód
        </button>
      </div>

      {/* Search Input Box */}
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
          placeholder={
            searchMode === 'symptom'
              ? 'Hledat symptom (např. bolest zad, nespavost, hlava)...'
              : 'Hledat bod podle kódu nebo jména (např. LI4, Hegu)...'
          }
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

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-surface-container-lowest rounded-2xl border border-outline-variant shadow-xl p-4 z-30 max-h-[420px] overflow-y-auto">
          
          {/* SYMPTOM MODE RESULTS */}
          {searchMode === 'symptom' && (
            <div className="space-y-2">
              <span className="text-label-md font-body text-secondary uppercase tracking-wider block border-b border-outline-variant/30 pb-2">
                Nalezené příznaky ({matchedSymptoms.length})
              </span>
              {matchedSymptoms.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {matchedSymptoms.map((sym) => (
                    <Link
                      key={sym.id}
                      href={`/symptom/${sym.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-container text-on-surface transition-colors group text-left w-full"
                    >
                      <span className="font-bold text-sm text-primary group-hover:text-primary-container">
                        {sym.label}
                      </span>
                      <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-body-md font-body text-on-surface-variant">
                  Nenalezen žádný symptom pro &quot;{query}&quot;.
                </div>
              )}
            </div>
          )}

          {/* POINT MODE RESULTS */}
          {searchMode === 'point' && (
            <div className="space-y-2">
              <span className="text-label-md font-body text-primary uppercase tracking-wider block border-b border-outline-variant/30 pb-2">
                Nalezené body ({matchedPoints.length})
              </span>
              {matchedPoints.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {matchedPoints.slice(0, 10).map((point) => (
                    <Link
                      key={point.id}
                      href={`/bod/${point.id}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-container text-on-surface transition-colors group text-left w-full"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center font-bold text-xs text-primary flex-shrink-0">
                          {point.code}
                        </span>
                        <span className="font-bold text-sm text-primary group-hover:text-primary-container">
                          {point.name}
                        </span>
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
      )}
    </div>
  );
}
