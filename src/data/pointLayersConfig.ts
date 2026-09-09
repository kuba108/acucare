/**
 * Konfigurace hybridního systému vrstev pro detail bodu:
 * 1. body.png / body.jpg - Podkladová fotografie těla/oblasti bez ruky
 * 2. hand.png            - Celoobrazovková průhledná vrstva s rukou (stejný rozměr plátna)
 * 3. chip.png            - Univerzální PNG chipu usazený na procentuální souřadnice (x%, y%)
 */

export type ChipVariantType = 'single' | 'duo_qi' | 'duo_shi';

export interface PointChipCoordinate {
  x: number;     // Procentuální horizontální pozice středu chipu (0 - 100 %)
  y: number;     // Procentuální vertikální pozice středu chipu (0 - 100 %)
  size?: number; // Velikost chipu v % šířky kontejneru (výchozí: 14 %)
}

export interface PointLayersInfo {
  folderName: string;
  bodyImage: string;
  handOverlay: string;
  fallbackImage: string;
  hasCustomLayers: boolean;
  chipCoord: PointChipCoordinate;
}

export const CHIP_IMAGES: Record<ChipVariantType, { label: string; sublabel: string; src: string; color: string }> = {
  single: {
    label: 'Halm chip jednostranný',
    sublabel: 'Standardní verze',
    src: '/chips/halm_single.png',
    color: '#d4af37',
  },
  duo_qi: {
    label: 'Halm Duo oboustranný chip (Čchi)',
    sublabel: 'Režim doplňování energie',
    src: '/chips/halm_duo_qi.png',
    color: '#d4af37',
  },
  duo_shi: {
    label: 'Halm Duo oboustranný chip (Shi)',
    sublabel: 'Režim odebírání přebytku',
    src: '/chips/halm_duo_shi.png',
    color: '#286b33',
  },
};

/**
 * Procentuální souřadnice pro usazení chipu na daném bodu.
 */
export const POINT_CHIP_COORDINATES: Record<string, PointChipCoordinate> = {
  'cv-4': { x: 50, y: 52, size: 14 },
  'cv-6': { x: 50, y: 48, size: 14 },
  'cv-12': { x: 50, y: 50, size: 14 },
  'lu-1': { x: 42, y: 46, size: 13 },
  'li-4': { x: 48, y: 52, size: 14 },
  'st-36': { x: 50, y: 45, size: 13 },
  'sp-6': { x: 52, y: 50, size: 13 },
  'ht-7': { x: 45, y: 52, size: 13 },
  'pc-6': { x: 50, y: 50, size: 13 },
};
