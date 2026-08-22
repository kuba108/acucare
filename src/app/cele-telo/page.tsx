import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Activity,
  Compass,
  Sparkles,
  ArrowRight,
  MapPin,
  Info
} from 'lucide-react';

export const metadata = {
  title: 'Celé tělo – Mapa meridiánů a akupresurních bodů | AcuCare',
  description: 'Kompletní vizuální průvodce meridiány a akupresurními body na lidském těle. Pochopte tok energie čchi a naučte se rozpoznávat energetické dráhy.',
};

export default function CeleTeloPage() {
  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-container-padding py-12 md:py-16">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-secondary font-body text-label-md uppercase tracking-widest mb-3 inline-block font-semibold">
          Mapa energetických drah
        </span>
        <h1 className="text-headline-lg-mobile md:text-headline-xl font-headline text-primary mb-6">
          Celé tělo a meridiány
        </h1>
        <p className="text-body-lg font-body text-on-surface-variant leading-relaxed">
          Tím, že se čchi soustředí do konkrétních drah energetického proudění, nám prokázala skvělou službu. 
          Meridiány terapeutům poskytují plán nebo mapu pohybu energie v těle, což nám umožňuje si lépe 
          představit, kde přesně tělo řádně nepracuje, protože došlo k zneprůchodnění těchto kanálů, 
          a jak a kde můžeme zkusit toto místo rozpohybovat nebo narušit.
        </p>
      </div>

      {/* Quote Banner */}
      <div className="bg-surface-container-low rounded-[28px] p-8 md:p-10 mb-16 border border-outline-variant/30 text-center max-w-3xl mx-auto soft-shadow">
        <blockquote className="text-lg md:text-xl font-headline text-primary italic leading-relaxed mb-3">
          „Meridiány jsou řeky energie, které spojují povrch těla s jeho hlubinami."
        </blockquote>
        <cite className="text-label-md font-body text-secondary uppercase tracking-widest font-semibold not-italic">
          — Tradiční čínská medicína
        </cite>
      </div>

      {/* Section 1: Natural Aspect Ratio Body Maps */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <MapPin className="w-5 h-5 text-primary-fixed" />
          </div>
          <h2 className="text-headline-md font-headline text-primary">
            Mapa drah a bodů na těle
          </h2>
        </div>

        <div className="space-y-12">
          {/* Card 1: Przedni pohled */}
          <div className="bg-surface-container-lowest rounded-[28px] p-6 md:p-10 soft-shadow border border-outline-variant/20 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
              <div>
                <span className="text-secondary font-body text-label-md uppercase tracking-wider font-semibold">
                  Přední část těla
                </span>
                <h3 className="text-headline-md font-headline text-primary text-2xl">
                  Přední pohled – meridiány a hlavní body
                </h3>
              </div>
              <p className="text-sm font-body text-on-surface-variant max-w-md">
                Zahrnuje <strong>Dráhu plic (LU)</strong>, <strong>Tlustého střeva (LI)</strong>, <strong>Žaludku (ST)</strong>, 
                <strong> Sleziny (SP)</strong> a <strong>Dráhu početí (CV)</strong>.
              </p>
            </div>

            {/* Natural Aspect Image */}
            <div className="w-full overflow-hidden rounded-2xl border border-outline-variant/20">
              <Image
                src="/full_body.jpg"
                alt="Mapa akupresurních bodů – přední pohled na lidské tělo s meridiány"
                width={1200}
                height={896}
                className="w-full h-auto object-cover block"
                priority
              />
            </div>
          </div>

          {/* Card 2: Zadni a bocni pohled */}
          <div className="bg-surface-container-lowest rounded-[28px] p-6 md:p-10 soft-shadow border border-outline-variant/20 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
              <div>
                <span className="text-secondary font-body text-label-md uppercase tracking-wider font-semibold">
                  Zadní a boční část těla
                </span>
                <h3 className="text-headline-md font-headline text-primary text-2xl">
                  Zadní a boční pohled – průběh drah
                </h3>
              </div>
              <p className="text-sm font-body text-on-surface-variant max-w-md">
                Zobrazuje <strong>Dráhu močového měchýře (UB)</strong> se systémy SHU bodů, 
                <strong> Žlučníku (GB)</strong> a <strong>Řídící dráhu (GV)</strong>.
              </p>
            </div>

            {/* Natural Aspect Image */}
            <div className="w-full overflow-hidden rounded-2xl border border-outline-variant/20">
              <Image
                src="/full_body_2.jpg"
                alt="Mapa akupresurních bodů – boční a zadní pohled na lidské tělo s meridiány"
                width={1200}
                height={896}
                className="w-full h-auto object-cover block"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Meridiány */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <Compass className="w-5 h-5 text-primary-fixed" />
          </div>
          <h2 className="text-headline-md font-headline text-primary">
            14 energetických drah (meridiánů)
          </h2>
        </div>

        <div className="bg-surface-container-lowest rounded-[24px] p-8 md:p-10 soft-shadow border border-outline-variant/20 mb-8">
          <p className="text-body-lg font-body text-on-surface-variant leading-relaxed mb-6">
            Lidské tělo obsahuje <strong>12 řádných meridiánů</strong>, z nichž každý je pojmenován podle orgánu, 
            ke kterému přísluší, a <strong>2 mimořádné dráhy</strong>, které probíhají středem těla. 
            Každý meridián má svou vlastní sadu akupresurních bodů, které lze stimulovat pro obnovení 
            volného toku energie čchi.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { code: 'LU', name: 'Dráha plic', points: 5 },
              { code: 'LI', name: 'Dráha tlustého střeva', points: 4 },
              { code: 'ST', name: 'Dráha žaludku', points: 6 },
              { code: 'SP', name: 'Dráha sleziny', points: 3 },
              { code: 'HT', name: 'Dráha srdce', points: 1 },
              { code: 'SI', name: 'Dráha tenkého střeva', points: 2 },
              { code: 'UB', name: 'Dráha močového měchýře', points: 10 },
              { code: 'KD', name: 'Dráha ledvin', points: 1 },
              { code: 'PC', name: 'Dráha osrdečníku', points: 1 },
              { code: 'SJ', name: 'Dráha trojitého ohřívače', points: 4 },
              { code: 'GB', name: 'Dráha žlučníku', points: 5 },
              { code: 'LV', name: 'Dráha jater', points: 2 },
              { code: 'CV', name: 'Přední střední dráha', points: 4 },
              { code: 'GV', name: 'Zadní střední dráha', points: 1 },
            ].map((m) => (
              <div key={m.code} className="bg-surface-container-low rounded-2xl p-4 flex items-center gap-3 border border-outline-variant/20 hover:border-primary/30 transition-colors">
                <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline font-bold text-xs shrink-0">
                  {m.code}
                </span>
                <div>
                  <p className="font-bold text-primary text-sm">{m.name}</p>
                  <p className="text-xs text-on-surface-variant">{m.points} {m.points === 1 ? 'bod' : m.points < 5 ? 'body' : 'bodů'} v katalogu</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Kolik bodů existuje */}
      <section className="mb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary">
            <Sparkles className="w-5 h-5 text-primary-fixed" />
          </div>
          <h2 className="text-headline-md font-headline text-primary">
            Kolik akupresurních bodů existuje?
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-surface-container-lowest rounded-[24px] p-8 soft-shadow border border-outline-variant/20">
            <h3 className="text-headline-md font-headline text-primary text-xl mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-secondary" />
              300 až 600 známých bodů
            </h3>
            <p className="text-body-md font-body text-on-surface-variant leading-relaxed mb-4">
              Stejně jako u jiných vyvíjejících se medicínských oborů se i počet akupresurních bodů může změnit. 
              V současné době existuje mezi <strong>300 a 600 známými akupresurními body</strong>, v závislosti na tom, 
              ze kterého zdroje čerpáte informace.
            </p>
            <p className="text-body-md font-body text-on-surface-variant leading-relaxed">
              V naší databázi se soustředíme na <strong>50 nejdůležitějších bodů</strong>, které jsou umístěny 
              na 12 řádných meridiánech a dvou mimořádných meridiánech. Tyto body jsou nejčastěji používané 
              v praxi a nabízejí nejširší spektrum léčebných účinků.
            </p>
          </div>

          <div className="bg-surface-container-lowest rounded-[24px] p-8 soft-shadow border border-outline-variant/20 flex flex-col justify-between">
            <div>
              <h3 className="text-headline-md font-headline text-primary text-xl mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-secondary" />
                Proč právě těchto 50 bodů?
              </h3>
              <p className="text-body-md font-body text-on-surface-variant leading-relaxed mb-4">
                Vybrané body patří mezi <strong>nejúčinnější a nejbezpečnější</strong> pro domácí 
                akupresuru. Jsou snadno dostupné, dobře popsané a pokrývají nejčastější zdravotní 
                obtíže — od bolesti hlavy a zad přes zažívací potíže až po nespavost a stres.
              </p>
              <p className="text-sm font-body text-on-surface-variant leading-relaxed">
                Každý bod je v katalogu doplněn o přesnou lokalizaci, popis stimulační techniky, 
                seznam symptomů, při kterých pomáhá, a bezpečnostní upozornění.
              </p>
            </div>
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href="/seznam-bodu"
                className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline"
              >
                Prohlédnout katalog bodů <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/o-akupresure"
                className="inline-flex items-center gap-2 text-secondary font-bold text-sm hover:underline"
              >
                Více o akupresuře <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
