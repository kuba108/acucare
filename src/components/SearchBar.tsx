'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ChevronRight, Activity } from 'lucide-react';
import { ACUPRESSURE_POINTS, AcupressurePoint } from '@/data/pointsData';
import { SYMPTOM_OPTIONS, SymptomOption } from '@/data/symptomsData';

interface SearchBarProps {
  onSearchChange?: (query: string, results: AcupressurePoint[]) => void;
  onNavigate?: () => void;
  autoFocus?: boolean;
}

export function SearchBar({ onSearchChange, onNavigate, autoFocus }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [searchMode, setSearchMode] = useState<'symptom' | 'point'>('symptom');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

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
    if (!trimmed || searchMode !== 'point') return [];

    return ACUPRESSURE_POINTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(trimmed) ||
        p.code.toLowerCase().includes(trimmed) ||
        p.pinyinName.toLowerCase().includes(trimmed)
      );
    });
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
    inputRef.current?.focus();
  };

  const handleTabChange = (mode: 'symptom' | 'point') => {
    setSearchMode(mode);
    setQuery('');
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto flex flex-col items-center">
      {/* Search Mode Tabs */}
      <div className="flex items-end justify-center gap-1.5 px-4 w-full">
        {/* Tab 1: Co mě trápí */}
        <button
          type="button"
          onClick={() => handleTabChange('symptom')}
          className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-t-[20px] text-sm sm:text-base font-bold transition-all duration-150 cursor-pointer select-none border-t-2 border-x-2 ${
            searchMode === 'symptom'
              ? 'bg-surface-container-lowest text-primary border-primary z-30 pb-3.5 -mb-[2px] shadow-[0_-3px_12px_rgba(0,79,69,0.06)]'
              : 'bg-surface-container-high/90 text-on-surface-variant hover:bg-surface-container hover:text-primary border-outline-variant/40 z-10 pb-3 mb-0'
          }`}
        >
          <Activity className={`w-5 h-5 ${searchMode === 'symptom' ? 'text-primary' : 'text-on-surface-variant'}`} />
          <span>Co mě trápí</span>
        </button>

        {/* Tab 2: Název bodu / Kód */}
        <button
          type="button"
          onClick={() => handleTabChange('point')}
          className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-t-[20px] text-sm sm:text-base font-bold transition-all duration-150 cursor-pointer select-none border-t-2 border-x-2 ${
            searchMode === 'point'
              ? 'bg-surface-container-lowest text-primary border-primary z-30 pb-3.5 -mb-[2px] shadow-[0_-3px_12px_rgba(0,79,69,0.06)]'
              : 'bg-surface-container-high/90 text-on-surface-variant hover:bg-surface-container hover:text-primary border-outline-variant/40 z-10 pb-3 mb-0'
          }`}
        >
          <Search className={`w-5 h-5 ${searchMode === 'point' ? 'text-primary' : 'text-on-surface-variant'}`} />
          <span>Název bodu / Kód</span>
        </button>
      </div>

      {/* Search Input Box with permanent dark green border */}
      <div className="relative w-full group bg-surface-container-lowest rounded-full border-2 border-primary shadow-[0_4px_24px_rgba(0,79,69,0.08)] transition-all z-20">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-primary" />
        <input
          ref={inputRef}
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
              : 'Hledat bod podle kódu nebo jména (např. LI 4, Hegu)...'
          }
          className="w-full bg-transparent py-4 sm:py-4.5 pl-16 pr-14 text-base sm:text-lg font-body text-on-surface focus:outline-none placeholder:text-outline/70 rounded-full"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-5 top-1/2 -translate-y-1/2 p-2 rounded-full text-outline hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
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
            <div className="space-y-3">
              <span className="text-label-md font-body text-secondary uppercase tracking-wider block border-b border-outline-variant/30 pb-2 font-bold">
                Doporučené body pro vaše potíže
              </span>
              {matchedSymptoms.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {matchedSymptoms.map((sym) => (
                    <div key={sym.id} className="bg-surface-container-low/50 rounded-xl p-2.5">
                      <span className="text-xs font-bold text-secondary uppercase tracking-wider block px-2 mb-1.5">
                        {sym.label}
                      </span>
                      <div className="flex flex-col gap-1">
                        {sym.pointIds.map((pId) => {
                          const pt = ACUPRESSURE_POINTS.find((p) => p.id === pId);
                          if (!pt) return null;
                          return (
                            <Link
                              key={pt.id}
                              href={`/bod/${pt.id}`}
                              onClick={() => {
                                setIsOpen(false);
                                onNavigate?.();
                              }}
                              className="flex items-center justify-between p-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container text-on-surface transition-colors group text-left w-full border border-outline-variant/20 shadow-xs"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center font-bold text-xs text-primary flex-shrink-0">
                                  {pt.code}
                                </span>
                                <div>
                                  <span className="font-bold text-sm text-primary group-hover:text-primary-container block">
                                    {pt.name}
                                  </span>
                                  <span className="text-xs text-on-surface-variant line-clamp-1">
                                    {pt.summary}
                                  </span>
                                </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform shrink-0" />
                            </Link>
                          );
                        })}
                      </div>
                    </div>
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
                      onClick={() => {
                        setIsOpen(false);
                        onNavigate?.();
                      }}
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
