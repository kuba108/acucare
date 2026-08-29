export interface MeasuringLocation {
  id: string;
  name: string;
  city: string;
  region: string;
  address: string;
  type: 'Měřící ordinace' | 'Prodejní místo' | 'Měřící & Prodejní místo';
  phone?: string;
  email?: string;
  hours?: string;
  note?: string;
  // Position percentages on CR map [x: 0-100%, y: 0-100%]
  mapCoords: {
    x: number;
    y: number;
  };
}

export const MEASURING_LOCATIONS: MeasuringLocation[] = [
  {
    id: 'nelahozeves',
    name: 'Měřící a prodejní místo Nelahozeves',
    city: 'Nelahozeves',
    region: 'Středočeský kraj',
    address: 'Nelahozeves (u Mělníka / Kralup n. Vltavou)',
    type: 'Měřící & Prodejní místo',
    phone: '+420 777 123 456',
    email: 'nelahozeves@acucare.cz',
    hours: 'Po - Pá: 9:00 - 17:00 (dle dohody)',
    note: 'Odborné měření energetických drah, konzultace a možnost vyzkoušení přístroje Henex.',
    mapCoords: { x: 38, y: 32 },
  },
  {
    id: 'zlin',
    name: 'Měřící a prodejní místo Zlín',
    city: 'Zlín',
    region: 'Zlínský kraj',
    address: 'Zlín',
    type: 'Měřící & Prodejní místo',
    phone: '+420 777 654 321',
    email: 'zlin@acucare.cz',
    hours: 'Po - Pá: 9:00 - 17:00 (dle dohody)',
    note: 'Kompletní diagnostika meridiánů, odborná instruktáž a prodej akupresurních přístrojů.',
    mapCoords: { x: 84, y: 68 },
  },
];
