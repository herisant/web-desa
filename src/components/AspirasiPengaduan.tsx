import React, { useState } from 'react';
import { CitizenReport } from '../types';
import { MessageSquareText, Send, CheckCircle2, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

interface AspirasiPengaduanProps {
  reports: CitizenReport[];
  onSubmitReport: (rep: Omit<CitizenReport, 'id' | 'date' | 'status'>) => void;
}

export const AspirasiPengaduan: React.FC<AspirasiPengaduanProps> = ({
  reports,
  onSubmitReport,
}) => {
  const [name, setName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [category, setCategory] = useState<'Infrastruktur' | 'Pelayanan' | 'Bansos' | 'Kebersihan' | 'Keamanan'>('Infrastruktur');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !location.trim()) return;

    onSubmitReport({
      name: isAnonymous ? 'Warga Peduli (Anonim)' : name.trim() || 'Warga Desa',
      category,
      location: location.trim(),
      description: description.trim(),
    });

    setSubmittedSuccess(true);
    setName('');
    setLocation('');
    setDescription('');
    setIsAnonymous(false);

    setTimeout(() => {
      setSubmittedSuccess(false);
    }, 6000);
  };

  return (
    <section id="aspirasi" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
            <span>Partisipasi Masyarakat</span>
            <span aria-hidden="true">·</span>
            <span>Kanal Aduan & Suara Warga</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Kotak Pengaduan & Aspirasi Warga Tirtasari
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            Laporkan kendala fasilitas umum, jalan rusak, lampu mati, atau sampaikan usulan pembangunan desa secara langsung dan transparan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sisi Kiri: Form Input Laporan */}
          <div className="lg:col-span-5 bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-7 shadow-xs">
            <h3 className="text-base font-bold text-stone-900 mb-1 flex items-center gap-2">
              <MessageSquareText className="w-5 h-5 text-emerald-800" />
              <span>Sampaikan Laporan / Usulan</span>
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Setiap laporan akan ditinjau langsung oleh Seksi Pemerintahan dan diteruskan ke TPK / BPD.
            </p>

            {submittedSuccess && (
              <div className="mb-4 p-3 bg-emerald-100/70 border border-emerald-300 rounded-lg text-xs text-emerald-900 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <span>
                  Laporan Anda berhasil dicatat dan masuk ke papan transparansi tindak lanjut aparatur desa. Terima kasih atas kepedulian Anda!
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Nama Pelapor
                </label>
                <input
                  type="text"
                  disabled={isAnonymous}
                  value={isAnonymous ? 'Dirahasiakan (Anonim)' : name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap Anda..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 disabled:bg-stone-100 disabled:text-stone-400"
                />
                <label className="flex items-center gap-2 mt-1.5 cursor-pointer text-xs text-stone-600">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded text-emerald-700 focus:ring-emerald-600"
                  />
                  <span>Kirim secara anonim (identitas dirahasiakan)</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Kategori Permasalahan *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="Infrastruktur">Infrastruktur (Jalan, Jembatan, Gorong-gorong)</option>
                  <option value="Pelayanan">Pelayanan Publik & Balai Desa</option>
                  <option value="Bansos">Bantuan Sosial & Kesejahteraan</option>
                  <option value="Kebersihan">Kebersihan, Sampah & Lingkungan</option>
                  <option value="Keamanan">Keamanan, Trantib & Lampu Jalan</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Lokasi Kejadian / RT / Dusun *
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Contoh: Depan Pos Kamling RT 02 Dusun Sukasari"
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Rincian Laporan / Saran Pembangunan *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ceritakan kondisi permasalahan secara jelas..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-white text-stone-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Laporan Warga</span>
              </button>
            </form>
          </div>

          {/* Sisi Kanan: Papan Transparansi Tindak Lanjut Aduan */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                Papan Transparansi Tindak Lanjut Aduan
              </h3>
              <span className="text-xs text-stone-500 font-medium">
                {reports.length} Laporan Terdaftar
              </span>
            </div>

            <div className="space-y-3">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2 text-xs text-stone-500">
                      <span className="font-semibold text-emerald-800">{report.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{report.location}</span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        report.status === 'Selesai'
                          ? 'bg-emerald-100 text-emerald-800'
                          : report.status === 'Sedang Ditindak'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {report.status}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-800 mb-2 font-medium">
                    "{report.description}"
                  </p>

                  <div className="flex items-center justify-between text-xs text-stone-400 pt-2 border-t border-stone-100">
                    <span>Oleh: {report.name} · {report.date}</span>
                  </div>

                  {report.responseNote && (
                    <div className="mt-2.5 p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-xs text-stone-700">
                      <strong className="text-emerald-900 block mb-0.5">Tanggapan Perangkat Desa:</strong>
                      <span>{report.responseNote}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
