/**
 * Konfigurace hybridního systému vrstev pro detail bodu:
 * 1. body.png / body.jpg - Podkladová fotografie těla/oblasti bez ruky
 * 2. hand.png            - Celoobrazovková průhledná vrstva s rukou (stejný rozměr plátna)
 * 3. chipy               - Univerzální PNG chipu (či 2 chipy u párových bodů)
 *                          s přesně vyladěnou velikostí podle přiblížení (zoomu) snímku.
 */

export type ChipVariantType = 'single' | 'duo_qi' | 'duo_shi';

export interface PointChipCoordinate {
  x: number;       // Horizontální pozice středu chipu v % šířky (0 - 100 %)
  y: number;       // Vertikální pozice středu chipu v % výšky (0 - 100 %)
  size: number;    // Velikost chipu v % šířky snímku podle přiblížení (zoomu)
  label?: string;  // Volitelný štítek (např. "Levý bod", "Pravý bod")
}

export interface PointLayersInfo {
  folderName: string;
  bodyImage: string;
  handOverlay: string;
  fallbackImage: string;
  hasCustomLayers: boolean;
  chips: PointChipCoordinate[]; // Podpora pro 1 nebo 2 (i více) chipů
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
 * Kompletní konfigurace souřadnic a proporčních velikostí pro všech 50 akupresurních bodů.
 * - Velké přiblížení (ruka, zápěstí, prsty, kotník): size 17 - 20 %
 * - Střední přiblížení (předloktí, loket, obličej, koleno, lýtko): size 14 - 16 %
 * - Celkový pohled (břicho, hrudník, záda, kyčel): size 11 - 14 %
 * - Párové body (obličej, záda, břicho): 2 chipy
 */
export const POINT_CHIP_COORDINATES: Record<string, PointChipCoordinate | PointChipCoordinate[]> = {
  // === DRÁHA PLIC (LU) ===
  'lu-1': { x: 42, y: 46, size: 13, label: 'LU 1 (Střed Palace)' }, // Celkový pohled na hrudník
  'lu-5': { x: 50, y: 50, size: 15, label: 'LU 5 (Loketní ohyb)' }, // Střední pohled lokte
  'lu-7': { x: 48, y: 52, size: 17, label: 'LU 7 (Předloktí nad zápěstím)' }, // Detail zápěstí
  'lu-9': { x: 46, y: 50, size: 19, label: 'LU 9 (Velká propast - zápěstí)' }, // Velký detail zápěstí
  'lu-11': { x: 45, y: 48, size: 18, label: 'LU 11 (Palec u nehtu)' }, // Velký detail prstu

  // === DRÁHA TLUSTÉHO STŘEVA (LI) ===
  'li-4': { x: 48, y: 52, size: 20, label: 'LI 4 (Hegu - ruka)' }, // Velký detail hřbetu ruky
  'li-10': { x: 50, y: 50, size: 15, label: 'LI 10 (Předloktí)' }, // Střední pohled
  'li-11': { x: 48, y: 50, size: 16, label: 'LI 11 (Vnější loket)' }, // Střední pohled
  'li-20': [ // Párový bod po obou stranách nosních dírek (2 chipy)
    { x: 44, y: 50, size: 11, label: 'Levý LI 20' },
    { x: 56, y: 50, size: 11, label: 'Pravý LI 20' },
  ],

  // === DRÁHA ŽALUDKU (ST) ===
  'st-2': [ // Párový bod pod oběma očima (2 chipy)
    { x: 44, y: 48, size: 12, label: 'Levý ST 2' },
    { x: 56, y: 48, size: 12, label: 'Pravý ST 2' },
  ],
  'st-3': [ // Párový bod pod lícními kostmi (2 chipy)
    { x: 43, y: 53, size: 12, label: 'Levý ST 3' },
    { x: 57, y: 53, size: 12, label: 'Pravý ST 3' },
  ],
  'st-6': { x: 50, y: 50, size: 14, label: 'ST 6 (Čelist)' }, // Střední pohled na tvář
  'st-7': { x: 48, y: 48, size: 14, label: 'ST 7 (Pod lícní kostí)' }, // Střední pohled
  'st-25': [ // Párový bod po obou stranách pupku (2 chipy)
    { x: 38, y: 50, size: 13, label: 'Levý ST 25' },
    { x: 62, y: 50, size: 13, label: 'Pravý ST 25' },
  ],
  'st-36': { x: 50, y: 45, size: 15, label: 'ST 36 (Pod kolenem)' }, // Střední pohled nohy
  'st-37': { x: 50, y: 52, size: 14, label: 'ST 37 (Lýtko)' }, // Střední pohled nohy

  // === DRÁHA SLEZINY (SP) ===
  'sp-6': { x: 52, y: 50, size: 16, label: 'SP 6 (Vnitřní lýtko nad kotníkem)' }, // Detail dolní nohy
  'sp-8': { x: 50, y: 50, size: 15, label: 'SP 8 (Vnitřní holeň)' }, // Střední pohled
  'sp-9': { x: 50, y: 48, size: 15, label: 'SP 9 (Pod kolenem zevnitř)' }, // Střední pohled

  // === DRÁHA SRDCE (HT) ===
  'ht-7': { x: 45, y: 52, size: 19, label: 'HT 7 (Zápěstní rýha malíku)' }, // Velký detail zápěstí

  // === DRÁHA TENKÉHO STŘEVA (SI) ===
  'si-3': { x: 48, y: 52, size: 19, label: 'SI 3 (Hřbet dlaně u malíku)' }, // Velký detail pěsti
  'si-11': { x: 50, y: 50, size: 13, label: 'SI 11 (Lopatka)' }, // Širší záběr zad
  'si-19': { x: 48, y: 50, size: 14, label: 'SI 19 (Před uchem)' }, // Střední detail ucha

  // === DRÁHA MOČOVÉHO MĚCHÝŘE (UB) ===
  'ub-2': [ // Párový bod na vnitřním začátku obočí (2 chipy)
    { x: 46, y: 44, size: 11, label: 'Levý UB 2' },
    { x: 54, y: 44, size: 11, label: 'Pravý UB 2' },
  ],
  'ub-12': [ // Párový bod horních zad T2 (2 chipy)
    { x: 43, y: 46, size: 12, label: 'Levý UB 12' },
    { x: 57, y: 46, size: 12, label: 'Pravý UB 12' },
  ],
  'ub-13': [ // Párový bod Shu Plic T3 (2 chipy)
    { x: 43, y: 48, size: 12, label: 'Levý UB 13' },
    { x: 57, y: 48, size: 12, label: 'Pravý UB 13' },
  ],
  'ub-15': [ // Párový bod Shu Srdce T5 (2 chipy)
    { x: 43, y: 50, size: 12, label: 'Levý UB 15' },
    { x: 57, y: 50, size: 12, label: 'Pravý UB 15' },
  ],
  'ub-20': [ // Párový bod Shu Sleziny T11 (2 chipy)
    { x: 43, y: 51, size: 12, label: 'Levý UB 20' },
    { x: 57, y: 51, size: 12, label: 'Pravý UB 20' },
  ],
  'ub-22': [ // Párový bod Shu Tří Zářičů L1 (2 chipy)
    { x: 43, y: 52, size: 12, label: 'Levý UB 22' },
    { x: 57, y: 52, size: 12, label: 'Pravý UB 22' },
  ],
  'ub-25': [ // Párový bod Shu Tlustého Střeva L4 (2 chipy)
    { x: 43, y: 53, size: 13, label: 'Levý UB 25' },
    { x: 57, y: 53, size: 13, label: 'Pravý UB 25' },
  ],
  'ub-32': [ // Párový bod křížové kosti (2 chipy)
    { x: 44, y: 54, size: 12, label: 'Levý UB 32' },
    { x: 56, y: 54, size: 12, label: 'Pravý UB 32' },
  ],
  'ub-40': { x: 50, y: 50, size: 15, label: 'UB 40 (Podkolenní jamka)' }, // Střední pohled
  'ub-60': { x: 48, y: 52, size: 18, label: 'UB 60 (Vnější kotník)' }, // Detail kotníku

  // === DRÁHA LEDVIN (KD) ===
  'kd-3': { x: 48, y: 52, size: 18, label: 'KD 3 (Vnitřní kotník)' }, // Detail kotníku

  // === DRÁHA OSRDEČNÍKU (PC) ===
  'pc-6': { x: 50, y: 50, size: 18, label: 'PC 6 (Vnitřní zápěstí)' }, // Velký detail předloktí/zápěstí

  // === DRÁHA TROJITÉHO OHŘÍVAČE (SJ) ===
  'sj-3': { x: 50, y: 50, size: 19, label: 'SJ 3 (Hřbet ruky u kloubů)' }, // Detail hřbetu ruky
  'sj-5': { x: 50, y: 50, size: 17, label: 'SJ 5 (Hřbetní strana zápěstí)' }, // Detail zápěstí
  'sj-6': { x: 50, y: 50, size: 16, label: 'SJ 6 (Předloktí nad zápěstím)' }, // Střední pohled
  'sj-17': { x: 48, y: 50, size: 15, label: 'SJ 17 (Za ušním lalůčkem)' }, // Detail za uchem

  // === DRÁHA ŽLUČNÍKU (GB) ===
  'gb-2': { x: 50, y: 71, size: 8, label: 'GB 2 (Před uchem)' }, // Detail ucha
  'gb-12': { x: 50, y: 50, size: 14, label: 'GB 12 (Za uchem na kosti)' }, // Detail za uchem
  'gb-14': [ // Párový bod nad oběma obočími (2 chipy)
    { x: 44, y: 42, size: 12, label: 'Levý GB 14' },
    { x: 56, y: 42, size: 12, label: 'Pravý GB 14' },
  ],
  'gb-20': [ // Párový bod v záhlaví na bázi lebky (2 chipy)
    { x: 38, y: 48, size: 14, label: 'Levý GB 20' },
    { x: 62, y: 48, size: 14, label: 'Pravý GB 20' },
  ],
  'gb-30': { x: 52, y: 52, size: 10, label: 'GB 30 (Hýždě / kyčel)' }, // Celkový pohled na bok

  // === DRÁHA JATER (LV) ===
  'lv-3': { x: 50, y: 50, size: 18, label: 'LV 3 (Hřbet nohy mezi prsty)' }, // Velký detail nártu
  'lv-13': { x: 48, y: 50, size: 13, label: 'LV 13 (Konec 11. žebra na boku)' }, // Celkový pohled trupu

  // === PŘEDNÍ STŘEDNÍ DRÁHA (CV / REN MAI) ===
  'cv-4': { x: 50, y: 52, size: 14, label: 'CV 4 (Podbřišek)' }, // Širší záběr břicha
  'cv-6': { x: 50, y: 48, size: 14, label: 'CV 6 (Moře čchi pod pupkem)' }, // Širší záběr břicha
  'cv-12': { x: 50, y: 60, size: 10, label: 'CV 12 (Střed břicha nad pupkem)' }, // Širší záběr břicha
  'cv-17': { x: 50, y: 58, size: 10, label: 'CV 17 (Střed hrudní kosti)' }, // Širší záběr hrudníku

  // === ZADNÍ STŘEDNÍ DRÁHA (GV / DU MAI) ===
  'gv-26': { x: 50, y: 53, size: 10, label: 'GV 26 (Rýha pod nosem)' }, // Střední detail obličeje
};

/**
 * Normalizuje konfiguraci souřadnic na pole (1 nebo více chipů).
 */
export function normalizeChipCoordinates(pointId: string): PointChipCoordinate[] {
  const cfg = POINT_CHIP_COORDINATES[pointId];
  if (!cfg) {
    return [{ x: 50, y: 50, size: 14 }];
  }
  return Array.isArray(cfg) ? cfg : [cfg];
}
