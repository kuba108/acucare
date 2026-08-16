export interface SymptomOption {
  id: string;
  label: string;
  description: string;
  iconName: 'Activity' | 'Moon' | 'Brain' | 'Smile' | 'Wind' | 'Flame' | 'Zap' | 'ShieldAlert' | 'Sparkles' | 'Volume2' | 'Heart';
  keywords: string[];
  pointIds: string[];
}

export const SYMPTOM_OPTIONS: SymptomOption[] = [
  {
    id: 'bolest-zad-pater',
    label: 'Bolest zad a páteře',
    description: 'Uvolněte stuhlé svaly a ulevte od bolesti beder, kříže a páteře.',
    iconName: 'Activity',
    keywords: ['zada', 'pater', 'bedra', 'kriz', 'stuhlost', 'bolest boku', 'krizi', 'krize', 'blokada'],
    pointIds: ['ub-22', 'ub-25', 'ub-32', 'ub-40', 'ub-60', 'lu-5']
  },
  {
    id: 'bolest-hlavy-migrena',
    label: 'Bolest hlavy a migréna',
    description: 'Rychlá pomoc při tenzních bolestech, migrénách a tlacích v hlavě.',
    iconName: 'Brain',
    keywords: ['hlava', 'migrena', 'hlavy', 'bolest hlavy', 'tenzni bolest', 'spanky', 'celo', 'migreny'],
    pointIds: ['li-4', 'gb-20', 'gb-12', 'gb-14', 'ub-2', 'lu-7', 'sj-5', 'lv-3']
  },
  {
    id: 'nespavost-spanek',
    label: 'Nespavost a stres',
    description: 'Uklidněte roztěkanou mysl a podpořte hluboký, regenerační spánek.',
    iconName: 'Moon',
    keywords: ['spanek', 'nespavost', 'nocni', 'klidny spanek', 'unava', 'noc', 'spani', 'stres', 'nervozita'],
    pointIds: ['ht-7', 'sp-6', 'pc-6', 'kd-3', 'ub-15', 'gb-12']
  },
  {
    id: 'stres-uzkost',
    label: 'Stres a úzkost',
    description: 'Uzemněte se a uvolněte emoční napětí, paniku či bušení srdce.',
    iconName: 'Smile',
    keywords: ['stres', 'uzkost', 'nervozita', 'dusevni napeti', 'strach', 'napeti', 'psychika', 'panika', 'buseni srdce'],
    pointIds: ['ht-7', 'lv-3', 'pc-6', 'cv-17', 'ub-15', 'si-19', 'sp-6']
  },
  {
    id: 'ryma-nachlazeni-dutiny',
    label: 'Rýma, nachlazení a dutiny',
    description: 'Uvolněte ucpaný nos, zmírněte kašel a podpořte přirozenou obranyschopnost.',
    iconName: 'Wind',
    keywords: ['ryma', 'nachlazeni', 'dutiny', 'nos', 'ucpany', 'kasel', 'chripka', 'plice', 'dusnost', 'sinusitida'],
    pointIds: ['li-20', 'lu-7', 'lu-11', 'ub-12', 'ub-13', 'st-2', 'st-3', 'ub-2', 'gv-26']
  },
  {
    id: 'traveni-zaludek',
    label: 'Trávení, nadýmání a žaludek',
    description: 'Harmonizujte trávení, zbavte se nadýmání, zácpy či křečí v břiše.',
    iconName: 'Flame',
    keywords: ['traveni', 'nadymani', 'zaludek', 'zlucnik', 'zacpa', 'krece', 'bricho', 'prujem', 'zlucnik', 'paleni zahy', 'reflux'],
    pointIds: ['st-36', 'st-25', 'cv-12', 'sp-9', 'lv-13', 'ub-20', 'ub-25', 'st-37', 'cv-6', 'sp-8']
  },
  {
    id: 'unava-nedostatek-energie',
    label: 'Únava a nedostatek energie',
    description: 'Dobijte životní sílu a zvyšte přirozenou energii svého těla.',
    iconName: 'Zap',
    keywords: ['unava', 'energie', 'slabost', 'vycerpani', 'vitalita', 'unaveny', 'malatnost'],
    pointIds: ['st-36', 'cv-4', 'cv-6', 'kd-3', 'ub-20', 'lu-9']
  },
  {
    id: 'bolest-kloubu-svalu',
    label: 'Bolest kloubů a svalů',
    description: 'Úleva pro bolavá a stuhlá kolena, ramena, lokty či kyčle.',
    iconName: 'ShieldAlert',
    keywords: ['nohy', 'ruce', 'klouby', 'svaly', 'rameno', 'loket', 'koleno', 'stuhlost', 'krece', 'kycel', 'ramene', 'kolena'],
    pointIds: ['li-10', 'li-11', 'gb-30', 'sp-8', 'si-11', 'lu-5', 'sj-3', 'ub-40']
  },
  {
    id: 'nevolnost-nevolnosti',
    label: 'Nevolnost a žaludeční potíže',
    description: 'Rychlé zklidnění při žaludeční nevolnosti či cestovních potížích.',
    iconName: 'Sparkles',
    keywords: ['nevolnost', 'vraceni', 'zaludku', 'tehotenska nevolnost', 'zvraceni', 'zaludek', 'kinetoza'],
    pointIds: ['pc-6', 'st-36', 'cv-12', 'lv-13', 'li-4']
  },
  {
    id: 'sluch-usi-sumeni',
    label: 'Problémy se sluchem a ušima',
    description: 'Zklidnění při šumění v uších, tinnitu nebo pocitu zalehlého ucha.',
    iconName: 'Volume2',
    keywords: ['sluch', 'usi', 'sumeni v usich', 'zalehle ucho', 'tinnitus', 'ucho', 'sluchu'],
    pointIds: ['si-19', 'sj-17', 'gb-2', 'gb-12', 'st-7', 'sj-3']
  },
  {
    id: 'bolest-zubu-celisti',
    label: 'Bolest zubů a čelistí',
    description: 'Uvolněte zatnutou čelist, skřípání zubů a zmírněte akutní bolest zubů.',
    iconName: 'Heart',
    keywords: ['zuby', 'zub', 'celist', 'celisti', 'zatnuta celist', 'skripani zubu', 'bolest zubu'],
    pointIds: ['li-4', 'st-6', 'st-7', 'si-19', 'sj-17', 'gb-2']
  },
  {
    id: 'potize-rukou-zapesti',
    label: 'Potíže rukou a zápěstí',
    description: 'Úleva při bolesti zápěstí, karpálech, brnění prstů nebo tenisovém lokti.',
    iconName: 'Activity',
    keywords: ['ruce', 'ruka', 'paze', 'zapestni', 'zapestni ryha', 'zapestni kloub', 'loket', 'karpal', 'karpaly', 'brneni prstu', 'tenisovy loket', 'dlane'],
    pointIds: ['li-4', 'li-10', 'li-11', 'lu-7', 'lu-9', 'pc-6', 'sj-5', 'lu-5', 'sj-3', 'sj-6', 'ht-7']
  },
  {
    id: 'potize-nohou-chodidel',
    label: 'Potíže nohou a chodidel',
    description: 'Pomoc při těžkých nohách, otocích kotníků, stuhlých kolenou nebo křečích v lýtkách.',
    iconName: 'Activity',
    keywords: ['nohy', 'noha', 'chodidlo', 'chodidla', 'paty', 'kotnik', 'lýtko', 'koleno', 'otoky nohou', 'stuhla kolena', 'krece v lytkach'],
    pointIds: ['st-36', 'sp-6', 'sp-9', 'kd-3', 'lv-3', 'ub-40', 'ub-60', 'gb-30', 'st-37']
  }
];
