import { AcupressurePoint } from '@/data/pointsData';
import { SymptomOption } from '@/data/symptomsData';

/**
 * Normalizuje obecný text odstraněním diakritiky (háčků, čárek) a převedením na malá písmena.
 */
export function normalizeSearchText(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Normalizuje kód bodu odstraněním mezer, pomlček, podtržítek a veškerých nealfanumerických znaků.
 * Příklad: "ST 25", "st-25", "st_25", "st25", "St. 25" -> "st25"
 */
export function normalizeCode(str: string): string {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Ověří, zda akupresurní bod odpovídá zadanému vyhledávacímu dotazu.
 * Podporuje:
 * - Kód bodu s mezerou, pomlčkou, podtržítkem i bez mezer (st 25, st-25, st_25, st25)
 * - Název bodu (s diakritikou i bez: "Nebeský bod", "nebesky")
 * - Pchin-jin název ("Tianshu", "tianshu")
 * - Oblast těla
 */
export function matchesPointSearch(point: AcupressurePoint, rawQuery: string): boolean {
  const query = rawQuery.trim();
  if (!query) return false;

  const normQueryCode = normalizeCode(query);
  const normQueryText = normalizeSearchText(query);

  // 1. Shoda podle kódu nebo ID (st 25, st-25, st_25, st25 -> st25)
  if (normQueryCode.length > 0) {
    const normPointCode = normalizeCode(point.code);
    const normPointId = normalizeCode(point.id);

    if (normPointCode.includes(normQueryCode) || normPointId.includes(normQueryCode)) {
      return true;
    }
  }

  // 2. Shoda podle českého názvu nebo pchin-jinu (bez ohledu na diakritiku)
  const normName = normalizeSearchText(point.name);
  const normPinyin = normalizeSearchText(point.pinyinName);

  if (normName.includes(normQueryText) || normPinyin.includes(normQueryText)) {
    return true;
  }

  // 3. Shoda podle oblasti těla
  const normRegion = normalizeSearchText(point.bodyRegion);
  if (normRegion.includes(normQueryText)) {
    return true;
  }

  return false;
}

/**
 * Ověří, zda symptom odpovídá vyhledávacímu dotazu (bez ohledu na diakritiku).
 */
export function matchesSymptomSearch(symptom: SymptomOption, rawQuery: string): boolean {
  const query = rawQuery.trim();
  if (!query) return false;

  const normQueryText = normalizeSearchText(query);

  const normLabel = normalizeSearchText(symptom.label);
  if (normLabel.includes(normQueryText)) return true;

  return symptom.keywords.some((kw) => normalizeSearchText(kw).includes(normQueryText));
}
