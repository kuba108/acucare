'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Send, CheckCircle2, AlertCircle, ShieldCheck, Mail, Phone, User, FileText, Sparkles } from 'lucide-react';

export default function ObjednavkaPage() {
  const [formData, setFormData] = useState({
    jmeno: '',
    email: '',
    telefon: '',
    poznamka: '',
    souhlasGdpr: false,
    zajemPristroj: true,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.jmeno.trim()) {
      setErrorMessage('Vyplňte prosím své jméno a příjmení.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Zadejte prosím platnou e-mailovou adresu.');
      return;
    }
    if (!formData.telefon.trim()) {
      setErrorMessage('Zadejte prosím své telefonní číslo.');
      return;
    }
    if (!formData.souhlasGdpr) {
      setErrorMessage('Pro odeslání je vyžadován souhlas se zpracováním osobních údajů.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/objednavka', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Při odesílání dochází k chybě. Zkuste to prosím znovu.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Spojení se serverem selhalo. Zkontrolujte připojení k internetu.');
    }
  };

  return (
    <main className="flex-grow w-full max-w-[1200px] mx-auto px-container-padding py-12 md:py-16">
      {/* Header section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-[#50aab2] font-body text-label-md uppercase tracking-widest mb-3 inline-block font-semibold">
          Nezávazná poptávka & Objednávka
        </span>
        <h1 className="text-headline-lg-mobile md:text-headline-xl font-headline text-[#50aab2] mb-6">
          Mám zájem o Henex přístroj
        </h1>
        <p className="text-body-lg font-body text-on-surface-variant leading-relaxed max-w-xl mx-auto">
          Vyplňte kontaktní formulář níže a náš tým se vám ozve zpět s nabídkou přístroje Henex.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Form Container */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-[28px] p-6 md:p-10 soft-shadow border border-outline-variant/30">
          {status === 'success' ? (
            <div className="text-center py-12 px-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[#d6f2f5] text-[#24656b] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-[#50aab2]" />
              </div>
              <h2 className="text-headline-md font-headline text-[#50aab2]">
                Děkujeme za vaši poptávku!
              </h2>
              <p className="text-body-lg font-body text-on-surface-variant max-w-lg mx-auto">
                Vaši zprávu jsme v pořádku přijali. Co nejdříve vás budeme kontaktovat na e-mailu 
                <strong className="text-on-surface"> {formData.email}</strong> nebo telefonním čísle 
                <strong className="text-on-surface"> {formData.telefon}</strong>.
              </p>
              <div className="pt-6">
                <button
                  onClick={() => {
                    setStatus('idle');
                    setFormData({
                      jmeno: '',
                      email: '',
                      telefon: '',
                      poznamka: '',
                      souhlasGdpr: false,
                      zajemPristroj: true,
                    });
                  }}
                  className="px-8 py-3.5 rounded-full bg-[#50aab2] text-white font-bold text-label-md hover:bg-[#3d8e96] transition-colors cursor-pointer"
                >
                  Odeslat další poptávku
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-error-container/30 border border-error/30 text-on-error-container flex items-start gap-3 text-sm">
                  <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Jmeno */}
              <div>
                <label htmlFor="jmeno" className="block text-sm font-bold font-body text-on-surface mb-2">
                  Jméno a příjmení <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline/60" />
                  <input
                    type="text"
                    id="jmeno"
                    name="jmeno"
                    value={formData.jmeno}
                    onChange={handleChange}
                    placeholder="Jan Novák"
                    className="w-full bg-surface-container-low/60 border border-outline-variant rounded-2xl py-3.5 pl-12 pr-4 text-on-surface focus:outline-none focus:border-[#50aab2] focus:ring-1 focus:ring-[#50aab2] transition-colors"
                  />
                </div>
              </div>

              {/* Grid 2 cols for Email + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold font-body text-on-surface mb-2">
                    E-mailová adresa <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline/60" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jan.novak@email.cz"
                      className="w-full bg-surface-container-low/60 border border-outline-variant rounded-2xl py-3.5 pl-12 pr-4 text-on-surface focus:outline-none focus:border-[#50aab2] focus:ring-1 focus:ring-[#50aab2] transition-colors"
                    />
                  </div>
                </div>

                {/* Telefon */}
                <div>
                  <label htmlFor="telefon" className="block text-sm font-bold font-body text-on-surface mb-2">
                    Telefonní číslo <span className="text-error">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-outline/60" />
                    <input
                      type="tel"
                      id="telefon"
                      name="telefon"
                      value={formData.telefon}
                      onChange={handleChange}
                      placeholder="+420 777 123 456"
                      className="w-full bg-surface-container-low/60 border border-outline-variant rounded-2xl py-3.5 pl-12 pr-4 text-on-surface focus:outline-none focus:border-[#50aab2] focus:ring-1 focus:ring-[#50aab2] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Poznamka */}
              <div>
                <label htmlFor="poznamka" className="block text-sm font-bold font-body text-on-surface mb-2">
                  Poznámka / Upřesnění vašeho dotazu
                </label>
                <div className="relative">
                  <FileText className="absolute left-4 top-4 w-5 h-5 text-outline/60" />
                  <textarea
                    id="poznamka"
                    name="poznamka"
                    rows={4}
                    value={formData.poznamka}
                    onChange={handleChange}
                    placeholder="Mám zájem o bližší informace k akupresurnímu přístroji..."
                    className="w-full bg-surface-container-low/60 border border-outline-variant rounded-2xl py-3.5 pl-12 pr-4 text-on-surface focus:outline-none focus:border-[#50aab2] focus:ring-1 focus:ring-[#50aab2] transition-colors"
                  />
                </div>
              </div>

              {/* Checkboxes Section */}
              <div className="space-y-4 pt-4 border-t border-outline-variant/30">
                {/* Checkbox 1: GDPR (Mandatory) */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="souhlasGdpr"
                    checked={formData.souhlasGdpr}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded-md border-outline-variant text-[#50aab2] focus:ring-[#50aab2] cursor-pointer"
                  />
                  <span className="text-sm font-body text-on-surface leading-snug">
                    Souhlasím se zpracováním osobních údajů pro účely vyřízení poptávky a kontaktování. <span className="text-error">*</span>
                  </span>
                </label>

                {/* Checkbox 2: Marketing (Optional) */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    name="zajemPristroj"
                    checked={formData.zajemPristroj}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded-md border-outline-variant text-[#50aab2] focus:ring-[#50aab2] cursor-pointer"
                  />
                  <span className="text-sm font-body text-on-surface leading-snug">
                    Mám zájem o zasílání speciálních nabídek přístrojů a novinek týkajících se akupresury AcuCare.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#50aab2] hover:bg-[#3d8e96] text-white font-bold text-label-md transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Odesílám...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Odeslat poptávku</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar Info Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-surface-container-lowest rounded-[28px] p-8 soft-shadow border border-outline-variant/30 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-surface-container-low flex items-center justify-center text-[#50aab2]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-headline-md font-headline text-[#50aab2] text-xl">
              Proč zkusit AcuCare?
            </h3>
            <ul className="space-y-3 text-sm font-body text-on-surface-variant">
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#d6f2f5] text-[#24656b] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span>Inovativní přístroje založené na tradiční čínské medicíně</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#d6f2f5] text-[#24656b] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span>Snadné a bezpečné použití pro domácí péči</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#d6f2f5] text-[#24656b] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">✓</span>
                <span>Odborná podpora a návody v českém jazyce</span>
              </li>
            </ul>
          </div>

          <div className="bg-surface-container-lowest rounded-[28px] p-8 soft-shadow border border-outline-variant/30 space-y-3">
            <div className="flex items-center gap-3 text-[#50aab2]">
              <ShieldCheck className="w-6 h-6 shrink-0" />
              <h4 className="font-bold text-sm font-body">Ochrana údajů (GDPR)</h4>
            </div>
            <p className="text-xs font-body text-on-surface-variant leading-relaxed">
              Vaše osobní údaje jsou u nás v bezpečí. Zpracováváme je pouze v rozsahu nezbytném pro vyřízení vašeho dotazu či poptávky v souladu s platnou legislativou ČR a EU. Souhlas můžete kdykoliv odvolat.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
