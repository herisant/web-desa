import React from 'react';
import { VILLAGE_OFFICIALS } from '../data/mockData';
import { UserCheck, Shield, Award, MapPinned, Users2 } from 'lucide-react';
import balaiDesaImage from '../assets/images/kantor_balai_desa_1792245269145.jpg';

export const ProfilPemerintahan: React.FC = () => {
  return (
    <section id="profil" className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
            <span>Pemerintahan & Kelembagaan</span>
            <span aria-hidden="true">·</span>
            <span>Masa Bakti 2021–2027</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Profil & Struktur Organisasi Desa Tirtasari
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            Mengenal lebih dekat visi pembangunan, wilayah teritorial, dan jajaran aparatur pelayan masyarakat Desa Tirtasari.
          </p>
        </div>

        {/* 2-Column Split: Balai Desa Showcase & Visi Misi */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Left Column: Balai Desa Image */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 flex-1 min-h-[300px] shadow-xs">
              <img
                src={balaiDesaImage}
                alt="Kantor Balai Desa Tirtasari"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs uppercase tracking-wider font-semibold text-emerald-300 block">
                  Pusat Kegiatan & Pelayanan
                </span>
                <h3 className="text-lg font-bold">Balai Desa Tirtasari</h3>
                <p className="text-xs text-stone-200 mt-0.5">
                  Jl. Raya Tirtasari No. 12, Kec. Sukaresmi, Kab. Bogor
                </p>
              </div>
            </div>

            {/* Wilayah Teritorial Grid */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-xl border border-stone-200 text-center">
                <div className="text-lg font-bold text-stone-900 tabular-nums">3</div>
                <div className="text-xs text-stone-500 font-medium">Dusun</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200 text-center">
                <div className="text-lg font-bold text-stone-900 tabular-nums">4</div>
                <div className="text-xs text-stone-500 font-medium">Rukun Warga (RW)</div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-stone-200 text-center">
                <div className="text-lg font-bold text-stone-900 tabular-nums">18</div>
                <div className="text-xs text-stone-500 font-medium">Rukun Tetangga (RT)</div>
              </div>
            </div>
          </div>

          {/* Right Column: Visi & Misi Card */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
                <Award className="w-4 h-4" />
                <span>Visi Pembangunan 2024 – 2030</span>
              </div>
              
              <blockquote className="text-base sm:text-lg font-serif-editorial italic text-stone-800 border-l-2 border-emerald-700 pl-4 py-1 mb-6">
                “Terwujudnya Desa Tirtasari yang Mandiri, Berdaya Saing, Berkelanjutan, dan Sejahtera Berlandaskan Semangat Gotong Royong serta Pemanfaatan Teknologi Pelayanan Terpadu.”
              </blockquote>

              <div className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                Empat Pilar Misi Pembangunan:
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-stone-700">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-md bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    01
                  </span>
                  <p>
                    <strong>Tata Kelola Bersih:</strong> Meningkatkan kualitas birokrasi pemerintahan desa yang transparan, akuntabel, dan bebas pungutan liar melalui digitalisasi persuratan.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-md bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    02
                  </span>
                  <p>
                    <strong>Infrastruktur Berkeadilan:</strong> Mengakselerasi pembangunan sarana jalan usaha tani, drainase lingkungan, dan instalasi air bersih desa secara merata di 3 dusun.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-md bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    03
                  </span>
                  <p>
                    <strong>Ekonomi Kerakyatan:</strong> Mengembangkan potensi agrowisata kopi robusta, kerajinan anyaman bambu, dan penguatan permodalan BUMDes Tirta Makmur.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-md bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    04
                  </span>
                  <p>
                    <strong>Kualitas Hidup & Budaya:</strong> Memperkuat layanan posyandu balita-lansia, zero-stunting, serta melestarikan kesenian tari tradisi dan kearifan lokal.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
              <span>Batas Utara: Desa Sukajaya · Batas Selatan: Kawasan Hutan Lindung Salak</span>
              <span className="font-medium text-emerald-800">Ketinggian: 750 – 950 mdpl</span>
            </div>
          </div>
        </div>

        {/* Struktur Aparatur Perangkat Desa */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-stone-900 tracking-tight">
                Aparatur Pemerintah Desa
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                Jajaran pejabat dan pelaksana teknis yang bertugas melayani masyarakat setiap hari kerja.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {VILLAGE_OFFICIALS.map((official, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 p-5 shadow-xs hover:border-emerald-300 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <span className="text-xs font-semibold text-emerald-800 block">
                        {official.role}
                      </span>
                      <h4 className="text-base font-bold text-stone-900 mt-0.5">
                        {official.name}
                      </h4>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-600 shrink-0">
                      <UserCheck className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {official.focusArea}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span className="font-mono">{official.nip}</span>
                  <a
                    href={`https://wa.me/${official.phone?.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-emerald-800 font-semibold hover:underline"
                  >
                    Kontak Kerja &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
