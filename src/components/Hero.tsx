import React from 'react';
import { ArrowRight, Clock, MapPin, PhoneCall, FileText, CheckCircle2 } from 'lucide-react';
import heroImage from '../assets/images/hero_desa_indonesia_1792245268142.jpg';

interface HeroProps {
  onOpenLetterModal: () => void;
  onNavigateToTransparansi: () => void;
  onNavigateToLayanan: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenLetterModal,
  onNavigateToTransparansi,
  onNavigateToLayanan,
}) => {
  return (
    <section className="relative overflow-hidden bg-stone-900 text-white">
      {/* Background Hero Image with measured contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Panorama Alam dan Persawahan Desa Tirtasari"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured Scrim for AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-900/75 to-stone-900/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 lg:pt-24 lg:pb-16">
        <div className="max-w-3xl">
          {/* Unboxed clean metadata kicker (No pill badge) */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-300 tracking-wide mb-4">
            <span>Pemerintah Desa Tirtasari</span>
            <span aria-hidden="true">·</span>
            <span>Kecamatan Sukaresmi</span>
            <span aria-hidden="true">·</span>
            <span>Kabupaten Bogor</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5 leading-[1.15] text-balance">
            Pusat Pelayanan Terpadu & Keterbukaan Informasi Publik
          </h1>

          <p className="text-base sm:text-lg text-stone-200 mb-8 leading-relaxed max-w-2xl font-light">
            Menghadirkan pelayanan administrasi warga yang cepat, transparan, dan inklusif. Urus berkas kependudukan secara mandiri kapan saja dari rumah.
          </p>

          {/* Primary Action Controls */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
            <button
              onClick={onOpenLetterModal}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold tracking-wide transition-all shadow-md hover:shadow-lg active:translate-y-0.5 whitespace-nowrap"
            >
              <FileText className="w-4 h-4" />
              <span>Ajukan Permohonan Surat</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToTransparansi}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium border border-white/20 backdrop-blur-xs transition-colors whitespace-nowrap"
            >
              <span>Transparansi APBDes 2026</span>
            </button>
          </div>

          {/* Highlights checklist */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-stone-300">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Layanan Surat 1 Hari Kerja Selesai</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Tanda Tangan Digital Resmi</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Gratis Bebas Pungutan Liar</span>
            </div>
          </div>
        </div>

        {/* Operational Utility Ribbon */}
        <div className="mt-12 pt-6 border-t border-white/15 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-stone-300">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-white/10 text-emerald-400 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-white font-medium">Jam Kantor Pelayanan</span>
              <span className="text-stone-300">Senin – Jumat: 08:00 – 15:30 WIB</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-white/10 text-emerald-400 shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-white font-medium">Lokasi Kantor Desa</span>
              <span className="text-stone-300">Jl. Raya Tirtasari No. 12, Balai Desa</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-white/10 text-emerald-400 shrink-0">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <span className="block text-white font-medium">Layanan Tanggap & Ambulans</span>
              <span className="text-stone-300">0812-3456-7890 (Siaga 24 Jam)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Column Quick Demographic & Statistical Presence Strip */}
      <div className="bg-stone-950/80 border-t border-stone-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-800">
            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                3.482
              </div>
              <div className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-medium">
                Total Jiwa Penduduk
              </div>
            </div>

            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                1.042
              </div>
              <div className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-medium">
                Kepala Keluarga (KK)
              </div>
            </div>

            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                412 Ha
              </div>
              <div className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-medium">
                Luas Wilayah Desa
              </div>
            </div>

            <div className="pt-2 md:pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
                Desa Mandiri
              </div>
              <div className="text-xs text-stone-400 mt-1 uppercase tracking-wider font-medium">
                Status Indeks Desa 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
