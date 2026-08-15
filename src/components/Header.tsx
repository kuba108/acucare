'use client';

import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full bg-surface/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center w-full px-container-padding max-w-[1200px] mx-auto h-16">
        {/* Brand */}
        <Link href="/" className="text-headline-md font-headline font-bold text-primary tracking-tight">
          AcuCare
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link
            href="/"
            className="text-primary font-bold border-b-2 border-primary pb-1 text-label-md font-body"
          >
            Domů
          </Link>
          <a
            href="#katalog"
            className="text-on-surface-variant hover:text-primary transition-colors duration-200 text-label-md font-body"
          >
            Všechny Body
          </a>
          <a
            href="#symptomy"
            className="text-on-surface-variant hover:text-primary transition-colors duration-200 text-label-md font-body"
          >
            Symptomy
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="text-on-surface-variant hover:bg-surface-container-low rounded-full p-2 transition-all active:scale-95 active:opacity-80 duration-150 flex items-center justify-center">
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
