import React from 'react';
import { Landmark, Phone, Mail, MapPin, ExternalLink, ShieldAlert } from 'lucide-react';
import { NavTab } from '../types';

interface FooterProps {
  onSelectTab: (tab: NavTab) => void;
  onOpenLetterModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenLetterModal }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      {/* Emergency Strip */}
      <div className="bg-emerald-950/70 border-b border-emerald-900/60 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-emerald-300 font-medium">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Kontak Cepat Darurat Warga (Siaga 24 Jam):</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs text-stone-200">
            <span>Ambulans Desa: <strong>0812-3456-7890</strong></span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span>Bidan Desa: <strong>0858-1234-5678</strong></span>
            <span aria-hidden="true" className="text-stone-600">·</span>
            <span>Babinsa / Bhabinkamtibmas: <strong>0821-9900-1122</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Address */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-800 text-amber-300 flex items-center justify-center font-bold">
                <Landmark className="w-4 h-4 text-amber-300" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Pemerintah Desa Tirtasari
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Kecamatan Sukaresmi, Kabupaten Bogor, Provinsi Jawa Barat 16730. Pusat informasi resmi tata kelola desa, transparansi anggaran, dan pelayanan digital masyarakat.
            </p>

            <div className="space-y-2 text-xs text-stone-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Balai Desa Jl. Raya Tirtasari No. 12, Sukaresmi, Bogor</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>sekretariat@desatirtasari.desa.id</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>(0251) 8234-567 / WhatsApp Pelayanan: 0812-3456-7890</span>
              </div>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Menu Navigasi
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <button
                  onClick={() => onSelectTab('beranda')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Beranda Utama
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('layanan')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Layanan Surat Mandiri
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('profil')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Profil & Aparatur Desa
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('umkm')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Katalog BUMDes & Wisata
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('transparansi')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Transparansi APBDes 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('aspirasi')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Aspirasi & Lapor Warga
                </button>
              </li>
            </ul>
          </div>

          {/* External Gov Portals & Hours */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Portal Terkait & Jam Buka
            </h4>

            <div className="p-3 bg-stone-800/80 rounded-xl border border-stone-700 text-xs space-y-1">
              <div className="font-semibold text-white">Jam Buka Pelayanan Tatap Muka:</div>
              <div className="text-stone-300">Senin – Kamis: 08:00 – 15:30 WIB</div>
              <div className="text-stone-300">Jumat: 08:00 – 15:00 WIB</div>
              <div className="text-stone-400 text-[11px] pt-1">Sabtu, Minggu & Hari Libur Nasional: Tutup</div>
            </div>

            <div className="space-y-1.5 text-xs text-stone-400">
              <a
                href="https://kemendesa.go.id"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <span>Kementerian Desa PDTT</span>
                <ExternalLink className="w-3 h-3 text-stone-500" />
              </a>
              <a
                href="https://kemendagri.go.id"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <span>Kementerian Dalam Negeri RI</span>
                <ExternalLink className="w-3 h-3 text-stone-500" />
              </a>
              <a
                href="https://bogorkab.go.id"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <span>Pemerintah Kabupaten Bogor</span>
                <ExternalLink className="w-3 h-3 text-stone-500" />
              </a>
            </div>
          </div>

        </div>

        {/* Quiet Copyright Footnote */}
        <div className="mt-12 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; 2026 Pemerintah Desa Tirtasari. Hak cipta dilindungi undang-undang.
          </div>
          <div>
            Kecamatan Sukaresmi · Kabupaten Bogor · Jawa Barat
          </div>
        </div>
      </div>
    </footer>
  );
};
