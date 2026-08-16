import React from 'react';
import Link from 'next/link';
import {
  Activity,
  Flame,
  ShieldCheck,
  Compass,
  Sparkles,
  Heart,
  Brain,
  Hand,
  Layers,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

export const metadata = {
  title: 'Více informací o akupresuře | AcuCare',
  description: 'Komplexní průvodce akupresurou, energií čchi, meridiány, měřením v cunech a zásadami bezpečné stimulace.',
};

export default function AboutAcupressurePage() {
  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-container-padding py-12 md:py-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-secondary font-body text-label-md uppercase tracking-widest mb-3 inline-block font-semibold">
          Průvodce tradiční medicínou
        </span>
        <h1 className="text-headline-lg-mobile md:text-headline-xl font-headline text-primary mb-6">
          Více o akupresuře a bodech
        </h1>
        <p className="text-body-lg font-body text-on-surface-variant leading-relaxed">
          Akupresura je tisíce let stará léčebná metoda vycházející z tradiční čínské medicíny (TCM). 
          Jemným, avšak pevným tlakem prstů na specifické body pomáhá obnovit přirozený tok životní energie, 
          uvolnit svalové napětí a nastartovat samoléčebné procesy těla.
        </p>
      </div>

      {/* Quote Banner */}
      <div className="bg-surface-container-low rounded-[28px] p-8 md:p-10 mb-16 border border-outline-variant/30 text-center max-w-3xl mx-auto soft-shadow">
        <blockquote className="text-lg md:text-xl font-headline text-primary italic leading-relaxed mb-3">
          „Kde není pohyb, tam je bolest. Kde je pohyb, tam není bolest.“
        </blockquote>
        <cite className="text-label-md font-body text-secondary uppercase tracking-widest font-semibold not-italic">
          — Tradiční čínské rčení
        </cite>
      </div>

      {/* Section 1: Co je to Čchi (Qi)? */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <Sparkles className="w-5 h-5 text-primary-fixed" />
          </div>
          <h2 className="text-headline-md font-headline text-primary">
            Co je to Čchi (Qi)?
          </h2>
        </div>

        <div className="bg-surface-container-lowest rounded-[24px] p-8 md:p-10 soft-shadow border border-outline-variant/20 mb-8">
          <p className="text-body-lg font-body text-on-surface-variant leading-relaxed mb-6">
            Energie <strong>čchi</strong> bývá často považována za cosi záhadného, ve skutečnosti však představuje 
            základní <strong>životní sílu a dynamickou energii</strong>, která pohání veškeré funkce lidského organismu. 
            Čínský znak pro čchi se skládá ze znaků pro <em>„páru“</em> a <em>„rýži“</em> — ztělesňuje tak jak nehmotnou, 
            pohyblivou sílu (páru), tak hmatatelnou výživu a hmotu (rýži).
          </p>

          <h3 className="text-headline-md font-headline text-primary text-xl mb-4">
            5 základních funkcí čchi v lidském těle:
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-surface-container-low rounded-2xl p-5 flex flex-col gap-2">
              <span className="font-bold text-primary text-base flex items-center gap-2">
                <Flame className="w-4 h-4 text-secondary" /> 1. Přeměňuje
              </span>
              <p className="text-sm font-body text-on-surface-variant">
                Přeměňuje jednu látku na druhou — například čchi ve slezině transformuje přijatou potravu na využitelnou energii a krev.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-5 flex flex-col gap-2">
              <span className="font-bold text-primary text-base flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-secondary" /> 2. Chrání
              </span>
              <p className="text-sm font-body text-on-surface-variant">
                Vytváří obrannou vrstvu (Wei Qi) na povrchu těla a chrání organismus před vniknutím vnějších patogenů (větru, chladu a horka).
              </p>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-5 flex flex-col gap-2">
              <span className="font-bold text-primary text-base flex items-center gap-2">
                <Layers className="w-4 h-4 text-secondary" /> 3. Zachovává
              </span>
              <p className="text-sm font-body text-on-surface-variant">
                Udržuje stabilitu vnitřních orgánů, fixuje je na jejich přirozených místech a zabraňuje nechtěným ztrátám tělesných tekutin.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-5 flex flex-col gap-2">
              <span className="font-bold text-primary text-base flex items-center gap-2">
                <Activity className="w-4 h-4 text-secondary" /> 4. Zahřívá
              </span>
              <p className="text-sm font-body text-on-surface-variant">
                Dodává tělu příjemné vnitřní teplo nezbytné pro optimální činnost enzymů, oběhového systému a orgánů.
              </p>
            </div>

            <div className="bg-surface-container-low rounded-2xl p-5 flex flex-col gap-2">
              <span className="font-bold text-primary text-base flex items-center gap-2">
                <Compass className="w-4 h-4 text-secondary" /> 5. Pohybuje
              </span>
              <p className="text-sm font-body text-on-surface-variant">
                Uvádí tělo do pohybu, pohání krev v cévách, dech v plících a provází člověka všemi fázemi vývoje a růstu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Meridiány a Akupresurní body */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <Compass className="w-5 h-5 text-primary-fixed" />
          </div>
          <h2 className="text-headline-md font-headline text-primary">
            Meridiány a akupresurní body
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card: Meridiány */}
          <div className="bg-surface-container-lowest rounded-[24px] p-8 soft-shadow border border-outline-variant/20 flex flex-col justify-between">
            <div>
              <h3 className="text-headline-md font-headline text-primary text-xl mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-secondary" />
                Co je to Meridián?
              </h3>
              <p className="text-body-md font-body text-on-surface-variant leading-relaxed mb-4">
                Meridiány fungují jako <strong>energetické dálnice</strong>, kterými čchi a krev nepřetržitě cirkulují tělem. 
                Lidské tělo obsahuje <strong>12 řádných drah</strong> (pojmenovaných podle tělesných orgánů — např. dráha plic, žaludku, srdce, jater) 
                a <strong>2 hlavní mimořádné dráhy</strong>:
              </p>
              <ul className="list-disc list-inside text-sm font-body text-on-surface-variant space-y-1.5 mb-4 ml-2">
                <li><strong>Řídící dráha (Du Mai / GV)</strong> – probíhá podél páteře a temene hlavy.</li>
                <li><strong>Dráha početí (Ren Mai / CV)</strong> – probíhá středem přední strany trupu.</li>
              </ul>
            </div>
            <p className="text-xs text-outline italic">
              Znalost meridiánů umožňuje přesně identifikovat energetické blokády a stimulací obnovit rovnováhu.
            </p>
          </div>

          {/* Card: Akupresurní body */}
          <div className="bg-surface-container-lowest rounded-[24px] p-8 soft-shadow border border-outline-variant/20 flex flex-col justify-between">
            <div>
              <h3 className="text-headline-md font-headline text-primary text-xl mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                Co je to Akupresurní bod?
              </h3>
              <p className="text-body-md font-body text-on-surface-variant leading-relaxed mb-4">
                Akupresurní bod je specifické místo na meridiánu, kde se <strong>energie čchi dostává blíže k povrchu těla</strong>. 
                V těle existuje 300 až 600 popsaných bodů. Pokud v určitém místě dojde k městnání nebo nedostatku energie, 
                stlačením tohoto bodu lze energii uvolnit, rozptýlit nebo naopak doplnit.
              </p>
              <p className="text-sm font-body text-on-surface-variant leading-relaxed mb-4">
                Každý bod nese mezinárodní kód (např. <strong>LI 4</strong>) a tradiční poetický název (např. <em>Spojené údolí</em>, 
                <em>Brána ducha</em>, <em>Jezírko větru</em>), který vyjadřuje jeho polohu i léčebný účinek.
              </p>
            </div>
            <div className="pt-2">
              <Link
                href="/seznam-bodu"
                className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline"
              >
                Prohlédnout katalog všech 50 bodů <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Měření v těle – Co je to Cun (cchun)? */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <Hand className="w-5 h-5 text-primary-fixed" />
          </div>
          <h2 className="text-headline-md font-headline text-primary">
            Jak přesně lokalizovat body: Co je to „Cun“ (cchun)?
          </h2>
        </div>

        <div className="bg-surface-container-lowest rounded-[24px] p-8 md:p-10 soft-shadow border border-outline-variant/20">
          <p className="text-body-lg font-body text-on-surface-variant leading-relaxed mb-8">
            V akupresuře se pro přesné nalezení bodů nepoužívají centimetry, ale tradiční tělesná jednotka <strong>cun</strong> (čti <em>cchun</em>). 
            Její velikost je odvozena přímo od <strong>proporcí těla ošetřované osoby</strong>, takže funguje spolehlivě u dospělých i dětí různé postavy.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1 Cun (Palec) */}
            <div className="bg-surface-container-low rounded-2xl p-6 text-center flex flex-col items-center justify-between border border-outline-variant/30 hover:border-primary/40 transition-colors">
              <div className="w-full flex flex-col items-center">
                {/* SVG Visual: Anatomical Thumb */}
                <div className="w-32 h-36 mb-4 flex items-center justify-center relative bg-surface-container-lowest/80 rounded-xl p-3 border border-outline-variant/20">
                  <svg viewBox="0 0 100 120" className="w-full h-full text-primary" fill="none" stroke="currentColor">
                    {/* Natural Thumb Silhouette with Thenar Curve */}
                    <path
                      d="M32 112 C32 95 36 78 37 62 C37 40 40 18 50 18 C60 18 63 40 63 62 C64 78 68 95 68 112"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      className="fill-surface-container/60 stroke-primary"
                    />
                    {/* Thumb Nail */}
                    <path
                      d="M43 28 C43 22 46 20 50 20 C54 20 57 22 57 28 V36 C57 39 43 39 43 36 Z"
                      strokeWidth="1.5"
                      className="fill-surface-container-lowest stroke-primary/80"
                    />
                    {/* Interphalangeal Joint Creases (where 1 cun is measured) */}
                    <path d="M38 58 Q50 63 62 58" strokeWidth="1.8" strokeLinecap="round" className="stroke-primary/70" />
                    <path d="M39 65 Q50 70 61 65" strokeWidth="1.8" strokeLinecap="round" className="stroke-primary/70" />
                    
                    {/* Caliper / Dimension measurement across IP joint */}
                    <line x1="28" y1="56" x2="28" y2="68" stroke="#004f45" strokeWidth="1.8" />
                    <line x1="72" y1="56" x2="72" y2="68" stroke="#004f45" strokeWidth="1.8" />
                    <line x1="28" y1="62" x2="72" y2="62" stroke="#004f45" strokeWidth="1.5" strokeDasharray="2 1" />
                    {/* Arrows */}
                    <path d="M33 59 L28 62 L33 65" stroke="#004f45" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M67 59 L72 62 L67 65" stroke="#004f45" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    
                    {/* Measurement badge */}
                    <rect x="30" y="84" width="40" height="18" rx="9" fill="#004f45" />
                    <text x="50" y="96.5" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1 CUN</text>
                  </svg>
                </div>

                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-headline text-lg font-bold mb-2">
                  1
                </div>
                <h3 className="font-bold text-primary text-lg mb-2">1 Cun (Šířka palce)</h3>
                <p className="text-sm font-body text-on-surface-variant mb-3">
                  Odpovídá <strong>šířce palce</strong> v úrovni jeho meziprstního kloubu.
                </p>
              </div>
              <span className="text-[11px] font-semibold tracking-wide text-secondary bg-secondary-container/40 px-2.5 py-1 rounded-full w-full">
                Menší vzdálenosti a jemné body
              </span>
            </div>

            {/* 1,5 Cunu (2 prsty) */}
            <div className="bg-surface-container-low rounded-2xl p-6 text-center flex flex-col items-center justify-between border border-outline-variant/30 hover:border-primary/40 transition-colors">
              <div className="w-full flex flex-col items-center">
                {/* SVG Visual: 2 Fingers */}
                <div className="w-32 h-36 mb-4 flex items-center justify-center relative bg-surface-container-lowest/80 rounded-xl p-3 border border-outline-variant/20">
                  <svg viewBox="0 0 100 120" className="w-full h-full text-primary" fill="none" stroke="currentColor">
                    {/* Index finger */}
                    <path
                      d="M33 110 V40 C33 26 36 18 43 18 C50 18 51 26 51 40 V110"
                      strokeWidth="2"
                      className="fill-surface-container/60 stroke-primary"
                    />
                    {/* Middle finger */}
                    <path
                      d="M51 110 V36 C51 20 54 12 61 12 C68 12 69 20 69 36 V110"
                      strokeWidth="2"
                      className="fill-surface-container/60 stroke-primary"
                    />
                    {/* Nails */}
                    <path d="M37 25 C37 21 39 19 43 19 C47 19 48 21 48 25 V30 C48 32 37 32 37 30 Z" strokeWidth="1.2" className="fill-surface-container-lowest stroke-primary/70" />
                    <path d="M55 19 C55 15 57 13 61 13 C65 13 66 15 66 19 V24 C66 26 55 26 55 24 Z" strokeWidth="1.2" className="fill-surface-container-lowest stroke-primary/70" />
                    
                    {/* Joint lines */}
                    <path d="M34 50 Q42 53 50 50" strokeWidth="1.2" strokeLinecap="round" className="stroke-primary/50" />
                    <path d="M52 48 Q60 51 68 48" strokeWidth="1.2" strokeLinecap="round" className="stroke-primary/50" />

                    {/* Caliper / Dimension measurement */}
                    <line x1="26" y1="46" x2="26" y2="54" stroke="#004f45" strokeWidth="1.5" />
                    <line x1="75" y1="46" x2="75" y2="54" stroke="#004f45" strokeWidth="1.5" />
                    <line x1="26" y1="50" x2="75" y2="50" stroke="#004f45" strokeWidth="1.5" strokeDasharray="2 1" />
                    {/* Arrows */}
                    <path d="M30 47 L26 50 L30 53" stroke="#004f45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M71 47 L75 50 L71 53" stroke="#004f45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Measurement badge */}
                    <rect x="26" y="82" width="48" height="18" rx="9" fill="#004f45" />
                    <text x="50" y="94.5" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">1,5 CUNU</text>
                  </svg>
                </div>

                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-headline text-lg font-bold mb-2">
                  1.5
                </div>
                <h3 className="font-bold text-primary text-lg mb-2">1,5 Cunu (2 prsty)</h3>
                <p className="text-sm font-body text-on-surface-variant mb-3">
                  Odpovídá spojené <strong>šířce ukazováčku a prostředníčku</strong> v úrovni prvního kloubu.
                </p>
              </div>
              <span className="text-[11px] font-semibold tracking-wide text-secondary bg-secondary-container/40 px-2.5 py-1 rounded-full w-full">
                Střední vzdálenosti (např. body na zápěstí)
              </span>
            </div>

            {/* 3 Cuny (4 prsty) */}
            <div className="bg-surface-container-low rounded-2xl p-6 text-center flex flex-col items-center justify-between border border-outline-variant/30 hover:border-primary/40 transition-colors">
              <div className="w-full flex flex-col items-center">
                {/* SVG Visual: 4 Fingers */}
                <div className="w-32 h-36 mb-4 flex items-center justify-center relative bg-surface-container-lowest/80 rounded-xl p-3 border border-outline-variant/20">
                  <svg viewBox="0 0 100 120" className="w-full h-full text-primary" fill="none" stroke="currentColor">
                    {/* 4 Fingers joined */}
                    {/* Index */}
                    <path d="M22 110 V40 C22 28 24 22 30 22 C36 22 37 28 37 40 V110" strokeWidth="1.5" className="fill-surface-container/60 stroke-primary" />
                    {/* Middle */}
                    <path d="M37 110 V34 C37 20 39 14 46 14 C53 14 54 20 54 34 V110" strokeWidth="1.5" className="fill-surface-container/60 stroke-primary" />
                    {/* Ring */}
                    <path d="M54 110 V38 C54 24 56 18 63 18 C70 18 71 24 71 38 V110" strokeWidth="1.5" className="fill-surface-container/60 stroke-primary" />
                    {/* Pinky */}
                    <path d="M71 110 V50 C71 36 73 30 79 30 C85 30 86 36 86 50 V110" strokeWidth="1.5" className="fill-surface-container/60 stroke-primary" />
                    
                    {/* Nails */}
                    <path d="M25 28 C25 25 27 23 30 23 C33 23 34 25 34 28 V32 C34 34 25 34 25 32 Z" strokeWidth="1" className="fill-surface-container-lowest stroke-primary/70" />
                    <path d="M40 20 C40 17 42 15 46 15 C50 15 51 17 51 20 V25 C51 27 40 27 40 25 Z" strokeWidth="1" className="fill-surface-container-lowest stroke-primary/70" />
                    <path d="M57 24 C57 21 59 19 63 19 C67 19 68 21 68 24 V29 C68 31 57 31 57 29 Z" strokeWidth="1" className="fill-surface-container-lowest stroke-primary/70" />
                    <path d="M74 36 C74 33 76 31 79 31 C82 31 83 33 83 36 V40 C83 42 74 42 74 40 Z" strokeWidth="1" className="fill-surface-container-lowest stroke-primary/70" />

                    {/* Caliper / Dimension measurement */}
                    <line x1="16" y1="52" x2="16" y2="60" stroke="#004f45" strokeWidth="1.5" />
                    <line x1="91" y1="52" x2="91" y2="60" stroke="#004f45" strokeWidth="1.5" />
                    <line x1="16" y1="56" x2="91" y2="56" stroke="#004f45" strokeWidth="1.5" strokeDasharray="2 1" />
                    {/* Arrows */}
                    <path d="M20 53 L16 56 L20 59" stroke="#004f45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M87 53 L91 56 L87 59" stroke="#004f45" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    {/* Measurement badge */}
                    <rect x="29" y="82" width="42" height="18" rx="9" fill="#004f45" />
                    <text x="50" y="94.5" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">3 CUNY</text>
                  </svg>
                </div>

                <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary font-headline text-lg font-bold mb-2">
                  3
                </div>
                <h3 className="font-bold text-primary text-lg mb-2">3 Cuny (4 prsty)</h3>
                <p className="text-sm font-body text-on-surface-variant mb-3">
                  Odpovídá celkové <strong>šířce čtyř spojených prstů</strong> (ukazováček až malíček) v úrovni kloubů.
                </p>
              </div>
              <span className="text-[11px] font-semibold tracking-wide text-secondary bg-secondary-container/40 px-2.5 py-1 rounded-full w-full">
                Větší vzdálenosti na nohách, břiše a zádech
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Zásady bezpečné stimulace a masáže */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <Heart className="w-5 h-5 text-primary-fixed" />
          </div>
          <h2 className="text-headline-md font-headline text-primary">
            Zásady správné stimulace a bezpečnost
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Jak masírovat */}
          <div className="bg-surface-container-lowest rounded-[24px] p-8 soft-shadow border border-outline-variant/20">
            <h3 className="text-headline-md font-headline text-primary text-xl mb-4 flex items-center gap-2">
              <Hand className="w-5 h-5 text-secondary" />
              Jak bod správně stlačovat
            </h3>
            <ul className="space-y-4 text-sm font-body text-on-surface-variant">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
                <span><strong>Poloha a klid:</strong> Zaujměte pohodlnou pozici vsedě nebo vleže a zhluboka, klidně dýchejte.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
                <span><strong>Aplikace tlaku:</strong> Použijte bříško palce nebo ukazováčku. Tlak by měl být pevný, ale příjemný (pocit tupého tlaku, tepla nebo jemného brnění — tzv. pocit <em>De Qi</em>).</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">3</span>
                <span><strong>Doba trvání:</strong> Bod stimulujte 1 až 3 minuty jemnými krouživými pohyby nebo střídavým stlačováním. Postup můžete opakovat 2–3× denně.</span>
              </li>
            </ul>
          </div>

          {/* Bezpečnostní upozornění */}
          <div className="bg-surface-container-lowest rounded-[24px] p-8 soft-shadow border border-outline-variant/20 flex flex-col justify-between">
            <div>
              <h3 className="text-headline-md font-headline text-primary text-xl mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-secondary" />
                Důležitá upozornění (Kontraindikace)
              </h3>
              <div className="bg-error-container/20 rounded-2xl p-5 mb-4">
                <p className="text-sm font-body text-on-tertiary-fixed-variant leading-relaxed">
                  <strong>Těhotenství:</strong> V těhotenství se <u>nesmí</u> stimulovat silné stahující body (např. <strong>LI 4</strong>, <strong>SP 6</strong>, <strong>LV 3</strong>, <strong>UB 60</strong>), které mohou vyvolat děložní stahy.
                </p>
              </div>
              <ul className="list-disc list-inside text-sm font-body text-on-surface-variant space-y-1.5 ml-2">
                <li>Nestlačujte místa s otevřenými ranami, záněty, popáleninami či křečovými žilami.</li>
                <li>Akupresura doplňuje zdravý životní styl, nenahrazuje však neodkladnou lékařskou péči při akutních vážných stavech.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
