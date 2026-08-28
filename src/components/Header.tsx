'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { SearchBar } from './SearchBar';

export function Header() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const pathname = usePathname();

  // Keyboard shortcut (Cmd+K / Ctrl+K / Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    { href: '/', label: 'Domů', isActive: pathname === '/' },
    { href: '/seznam-bodu', label: 'Všechny Body', isActive: pathname === '/seznam-bodu' || pathname.startsWith('/bod/') },
    { href: '/cele-telo', label: 'Celé tělo', isActive: pathname === '/cele-telo' },
    { href: '/o-akupresure', label: 'Více informací', isActive: pathname === '/o-akupresure' },
  ];

  return (
    <>
      <header className="w-full bg-surface-container-low/90 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-outline-variant/20">
        <div className="flex justify-between items-center w-full px-container-padding max-w-[1200px] mx-auto h-16">
          {/* Brand Logo in #50aab2 */}
          <Link href="/" className="text-headline-md font-headline font-bold text-[#50aab2] tracking-tight hover:opacity-90 transition-opacity">
            AcuCare
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-stretch space-x-8 h-16">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center h-full border-b-2 transition-colors duration-200 text-label-md font-body ${
                  item.isActive
                    ? 'text-[#50aab2] font-bold border-[#50aab2]'
                    : 'text-on-surface-variant border-transparent hover:text-[#50aab2]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="text-on-surface-variant hover:bg-surface-container hover:text-[#50aab2] rounded-full p-2.5 transition-all active:scale-95 duration-150 flex items-center justify-center cursor-pointer group"
              title="Hledat (⌘K)"
              aria-label="Otevřít vyhledávání"
            >
              <Search className="w-5 h-5 group-hover:text-[#50aab2] transition-colors" />
            </button>
          </div>
        </div>
      </header>

      {/* Mac Spotlight Style Search Modal */}
      {isSearchModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] md:pt-[14vh] px-4"
          onClick={() => setIsSearchModalOpen(false)}
        >
          {/* Dimmed Blurred Backdrop */}
          <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-md transition-opacity" />

          {/* Floating Spotlight Card */}
          <div
            className="relative z-10 w-full max-w-2xl bg-surface-container-low/95 backdrop-blur-xl rounded-[32px] p-6 md:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.3)] border border-outline-variant/40"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with ESC hint and Close Button */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-outline-variant/30">
              <span className="text-label-md font-body font-bold text-[#50aab2] flex items-center gap-2">
                <Search className="w-4 h-4 text-[#50aab2]" />
                Rychlé vyhledávání
              </span>
              <div className="flex items-center gap-2">
                <kbd className="hidden sm:inline-block text-[11px] font-mono font-semibold text-on-surface-variant/70 bg-surface-container px-2 py-0.5 rounded-md border border-outline-variant/40">
                  ESC
                </kbd>
                <button
                  onClick={() => setIsSearchModalOpen(false)}
                  className="p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors cursor-pointer"
                  aria-label="Zavřít vyhledávání"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Same SearchBar Component with tabs */}
            <SearchBar
              autoFocus
              onNavigate={() => setIsSearchModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}
