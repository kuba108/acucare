import React from 'react';

export function Footer() {
  return (
    <footer className="w-full bg-surface-container border-t border-outline-variant mt-auto py-section-gap px-container-padding">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1200px] mx-auto gap-8">
        {/* Brand */}
        <div className="text-headline-md font-headline text-primary">
          AcuCare
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
          <a className="text-on-surface-variant hover:text-on-surface hover:underline transition-colors text-label-md font-body" href="#">
            Ochrana soukromí
          </a>
          <a className="text-on-surface-variant hover:text-on-surface hover:underline transition-colors text-label-md font-body" href="#">
            Kontakt
          </a>
          <a className="text-on-surface-variant hover:text-on-surface hover:underline transition-colors text-label-md font-body" href="#">
            Zdroje
          </a>
          <a className="text-on-surface-variant hover:text-on-surface hover:underline transition-colors text-label-md font-body" href="#">
            FAQ
          </a>
        </div>

        {/* Copyright */}
        <div className="text-on-surface text-body-md font-body text-center md:text-right">
          © 2024 AcuCare. Holistická cesta k rovnováze.
        </div>
      </div>
    </footer>
  );
}
