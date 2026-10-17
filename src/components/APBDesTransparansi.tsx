import React, { useState } from 'react';
import { APBDES_PENDAPATAN, APBDES_BELANJA } from '../data/mockData';
import { BarChart3, TrendingUp, Download, CheckCircle, FileSpreadsheet } from 'lucide-react';

export const APBDesTransparansi: React.FC = () => {
  const [budgetTab, setBudgetTab] = useState<'pendapatan' | 'belanja'>('pendapatan');

  const totalPendapatan = APBDES_PENDAPATAN.reduce((acc, curr) => acc + curr.nominal, 0);
  const totalPendapatanRealisasi = APBDES_PENDAPATAN.reduce((acc, curr) => acc + curr.realisasi, 0);

  const totalBelanja = APBDES_BELANJA.reduce((acc, curr) => acc + curr.nominal, 0);
  const totalBelanjaRealisasi = APBDES_BELANJA.reduce((acc, curr) => acc + curr.realisasi, 0);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="transparansi" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
              <span>Akuntabilitas Publik</span>
              <span aria-hidden="true">·</span>
              <span>Tahun Anggaran 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Transparansi Anggaran Pendapatan & Belanja Desa (APBDes)
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Wujud komitmen keterbukaan tata kelola keuangan Desa Tirtasari sesuai amanat Undang-Undang No. 6 Tahun 2014 tentang Desa.
            </p>
          </div>

          <button
            onClick={() => alert('Mengunduh Salinan Resmi Ringkasan APBDes TA 2026 format PDF/Excel.')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-semibold rounded-lg border border-stone-300 transition-colors shrink-0"
          >
            <Download className="w-4 h-4 text-stone-600" />
            <span>Unduh Laporan APBDes</span>
          </button>
        </div>

        {/* 3 Summary Financial Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Card 1: Pendapatan */}
          <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/70">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block mb-1">
              Total Pendapatan Desa
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              {formatRupiah(totalPendapatan)}
            </div>
            <div className="mt-3 text-xs text-stone-600 flex items-center justify-between">
              <span>Realisasi Saat Ini:</span>
              <span className="font-semibold text-stone-900 tabular-nums">
                {formatRupiah(totalPendapatanRealisasi)}
              </span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-2 rounded-full"
                style={{ width: `${(totalPendapatanRealisasi / totalPendapatan) * 100}%` }}
              />
            </div>
          </div>

          {/* Card 2: Belanja */}
          <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/70">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block mb-1">
              Total Belanja Desa
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-stone-900 tabular-nums">
              {formatRupiah(totalBelanja)}
            </div>
            <div className="mt-3 text-xs text-stone-600 flex items-center justify-between">
              <span>Serapan Belanja:</span>
              <span className="font-semibold text-stone-900 tabular-nums">
                {formatRupiah(totalBelanjaRealisasi)}
              </span>
            </div>
            <div className="w-full bg-stone-200 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="bg-amber-600 h-2 rounded-full"
                style={{ width: `${(totalBelanjaRealisasi / totalBelanja) * 100}%` }}
              />
            </div>
          </div>

          {/* Card 3: Surplus / Silpa */}
          <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/70">
            <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 block mb-1">
              Surplus / Cadangan Kas
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-800 tabular-nums">
              {formatRupiah(totalPendapatan - totalBelanja)}
            </div>
            <div className="mt-3 text-xs text-stone-600">
              <p>Saldo kas teralokasi untuk cadangan penanggulangan bencana dan penguatan modal BUMDes.</p>
            </div>
          </div>

        </div>

        {/* Tab Toggle for Tables */}
        <div className="flex items-center gap-2 p-1 bg-stone-100 rounded-xl max-w-sm mb-6 border border-stone-200">
          <button
            onClick={() => setBudgetTab('pendapatan')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              budgetTab === 'pendapatan'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Rincian Pendapatan (5 Sumber)
          </button>
          <button
            onClick={() => setBudgetTab('belanja')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              budgetTab === 'belanja'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Rincian Belanja (5 Bidang)
          </button>
        </div>

        {/* Responsive Budget Table */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-50 border-b border-stone-200 text-xs font-semibold uppercase tracking-wider text-stone-600">
                <tr>
                  <th scope="col" className="px-6 py-4">Kategori / Pos Anggaran</th>
                  <th scope="col" className="px-6 py-4 text-right">Target / Pagu</th>
                  <th scope="col" className="px-6 py-4 text-right">Realisasi</th>
                  <th scope="col" className="px-6 py-4 text-center">Persentase</th>
                  <th scope="col" className="px-6 py-4">Peruntukan & Keterangan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {(budgetTab === 'pendapatan' ? APBDES_PENDAPATAN : APBDES_BELANJA).map((item, idx) => (
                  <tr key={idx} className="hover:bg-stone-50/70 transition-colors">
                    <td className="px-6 py-4 font-semibold text-stone-900">
                      {item.kategori}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-stone-800 tabular-nums font-medium whitespace-nowrap">
                      {formatRupiah(item.nominal)}
                    </td>
                    <td className="px-6 py-4 text-right font-mono text-emerald-800 tabular-nums font-semibold whitespace-nowrap">
                      {formatRupiah(item.realisasi)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-block px-2 py-0.5 rounded text-xs font-semibold font-mono bg-stone-100 text-stone-800 tabular-nums">
                        {item.persentase}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-stone-600 max-w-xs">
                      {item.keterangan}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Banner Transparansi SISKEUDES */}
        <div className="mt-8 p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              Seluruh transaksi penatausahaan keuangan desa dicatat melalui aplikasi <strong>Siskeudes Online Kemendagri</strong> dan diawasi oleh Badan Permusyawaratan Desa (BPD).
            </span>
          </div>
          <span className="font-mono text-stone-500 shrink-0">Status: WTP (Wajar Tanpa Pengecualian)</span>
        </div>

      </div>
    </section>
  );
};
