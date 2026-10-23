'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'acucare_point_set';
const CHANGE_EVENT = 'acucare_point_set_changed';

/**
 * Přečte uložené ID bodů z localStorage.
 */
export function getStoredPointIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Chyba při čtení setu bodů z localStorage:', err);
    return [];
  }
}

/**
 * Uloží pole ID bodů do localStorage a vyvolá událost pro synchronizaci.
 */
export function setStoredPointIds(ids: string[]): void {
  if (typeof window === 'undefined') return;
  try {
    const unique = Array.from(new Set(ids));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(unique));
    window.dispatchEvent(new Event(CHANGE_EVENT));
  } catch (err) {
    console.error('Chyba při ukládání setu bodů do localStorage:', err);
  }
}

/**
 * Přidá jeden bod do setu.
 */
export function addPointToSet(pointId: string): void {
  const current = getStoredPointIds();
  if (!current.includes(pointId)) {
    setStoredPointIds([...current, pointId]);
  }
}

/**
 * Přidá více bodů do setu najednou (např. ze symptomu).
 */
export function addPointsToSet(pointIds: string[]): void {
  const current = getStoredPointIds();
  setStoredPointIds([...current, ...pointIds]);
}

/**
 * Odebere bod ze setu.
 */
export function removePointFromSet(pointId: string): void {
  const current = getStoredPointIds();
  setStoredPointIds(current.filter((id) => id !== pointId));
}

/**
 * Přepne přítomnost bodu v setu (přidá/odebere). Vrací nový stav (true = je v setu).
 */
export function togglePointInSet(pointId: string): boolean {
  const current = getStoredPointIds();
  if (current.includes(pointId)) {
    removePointFromSet(pointId);
    return false;
  } else {
    addPointToSet(pointId);
    return true;
  }
}

/**
 * Vymaže celý set.
 */
export function clearPointSet(): void {
  setStoredPointIds([]);
}

/**
 * React hook pro reaktivní práci se setem bodů v jakékoliv komponentě.
 */
export function usePointSet() {
  const [pointIds, setPointIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setPointIds(getStoredPointIds());
    setIsLoaded(true);

    const handleSync = () => {
      setPointIds(getStoredPointIds());
    };

    window.addEventListener(CHANGE_EVENT, handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener(CHANGE_EVENT, handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const add = useCallback((id: string) => addPointToSet(id), []);
  const addMultiple = useCallback((ids: string[]) => addPointsToSet(ids), []);
  const remove = useCallback((id: string) => removePointFromSet(id), []);
  const toggle = useCallback((id: string) => togglePointInSet(id), []);
  const clear = useCallback(() => clearPointSet(), []);
  const has = useCallback((id: string) => pointIds.includes(id), [pointIds]);

  return {
    pointIds,
    count: pointIds.length,
    isLoaded,
    add,
    addMultiple,
    remove,
    toggle,
    clear,
    has,
  };
}
