import React, { useState } from 'react';
import { NavTab } from '../types';
import { Menu, X, Landmark } from 'lucide-react';

interface HeaderProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenLetterModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenLetterModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strict 3-Zone Top Bar Contract: Brand — 4-5 Nav Links — 1 Primary Action */}
        <div className="flex items-center justify-between gap-8 h-18">
          
          {/* Zone 1: Single text element wordmark with clean emblem */}
          <button
            onClick={() => handleNavClick('beranda')}
            className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-md py-1"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center font-bold shadow-xs shrink-0">
              <Landmark className="w-5 h-5 text-amber-300" />
            </div>
            <span className="text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0">
              Desa Tirtasari
            </span>
          </button>

          {/* Zone 2: 4-5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => handleNavClick('beranda')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                activeTab === 'beranda'
                  ? 'text-emerald-800 font-semibold border-b-2 border-emerald-800'
                  : 'hover:text-stone-900'
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => handleNavClick('layanan')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                activeTab === 'layanan'
                  ? 'text-emerald-800 font-semibold border-b-2 border-emerald-800'
                  : 'hover:text-stone-900'
              }`}
            >
              Layanan Mandiri
            </button>
            <button
              onClick={() => handleNavClick('profil')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                activeTab === 'profil'
                  ? 'text-emerald-800 font-semibold border-b-2 border-emerald-800'
                  : 'hover:text-stone-900'
              }`}
            >
              Profil Desa
            </button>
            <button
              onClick={() => handleNavClick('umkm')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                activeTab === 'umkm'
                  ? 'text-emerald-800 font-semibold border-b-2 border-emerald-800'
                  : 'hover:text-stone-900'
              }`}
            >
              Potensi & UMKM
            </button>
            <button
              onClick={() => handleNavClick('transparansi')}
              className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                activeTab === 'transparansi'
                  ? 'text-emerald-800 font-semibold border-b-2 border-emerald-800'
                  : 'hover:text-stone-900'
              }`}
            >
              Transparansi APBDes
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenLetterModal}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-800 rounded-lg hover:bg-emerald-900 transition-colors whitespace-nowrap shrink-0 shadow-xs active:translate-y-0.5"
            >
              Ajukan Surat
            </button>

            {/* Mobile menu toggle button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 py-3 space-y-1">
            <button
              onClick={() => handleNavClick('beranda')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-md"
            >
              Beranda
            </button>
            <button
              onClick={() => handleNavClick('layanan')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-md"
            >
              Layanan Mandiri Warga
            </button>
            <button
              onClick={() => handleNavClick('profil')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-md"
            >
              Profil & Aparatur Desa
            </button>
            <button
              onClick={() => handleNavClick('umkm')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-md"
            >
              Potensi & UMKM Desa
            </button>
            <button
              onClick={() => handleNavClick('transparansi')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-md"
            >
              Transparansi APBDes
            </button>
            <button
              onClick={() => handleNavClick('berita')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-md"
            >
              Kabar & Agenda Desa
            </button>
            <button
              onClick={() => handleNavClick('aspirasi')}
              className="w-full text-left px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-100 rounded-md"
            >
              Aspirasi & Pengaduan
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
