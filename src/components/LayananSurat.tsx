import React, { useState } from 'react';
import { SuratApplication } from '../types';
import { 
  FileText, 
  Search, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  Send, 
  Printer, 
  Download,
  AlertCircle,
  FileCheck2
} from 'lucide-react';

interface LayananSuratProps {
  applications: SuratApplication[];
  onSubmitApplication: (app: Omit<SuratApplication, 'id' | 'trackingNumber' | 'createdAt' | 'status'>) => SuratApplication;
  initialSelectedType?: string;
}

export const LayananSurat: React.FC<LayananSuratProps> = ({
  applications,
  onSubmitApplication,
  initialSelectedType = 'Surat Keterangan Usaha (SKU)',
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'formulir' | 'lacak' | 'panduan'>('formulir');

  // Form State
  const [applicantName, setApplicantName] = useState('');
  const [nik, setNik] = useState('');
  const [phone, setPhone] = useState('');
  const [dusun, setDusun] = useState('Dusun I Krajan');
  const [rtRw, setRtRw] = useState('RT 01 / RW 01');
  const [letterType, setLetterType] = useState(initialSelectedType);
  const [purpose, setPurpose] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'ambil_kantor' | 'antar_rt' | 'unduh_digital'>('ambil_kantor');
  
  // Feedback / receipt state
  const [submittedReceipt, setSubmittedReceipt] = useState<SuratApplication | null>(null);
  const [formError, setFormError] = useState('');

  // Tracking State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<SuratApplication | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!applicantName.trim()) {
      setFormError('Nama lengkap pemohon wajib diisi.');
      return;
    }
    if (nik.trim().length !== 16 || !/^\d+$/.test(nik.trim())) {
      setFormError('NIK harus berupa 16 digit angka kependudukan yang sah.');
      return;
    }
    if (!phone.trim()) {
      setFormError('Nomor WhatsApp atau ponsel wajib diisi untuk notifikasi kesiapan surat.');
      return;
    }
    if (!purpose.trim()) {
      setFormError('Jelaskan keperluan atau tujuan pembuatan surat.');
      return;
    }

    const created = onSubmitApplication({
      applicantName: applicantName.trim(),
      nik: nik.trim(),
      phone: phone.trim(),
      dusun,
      rtRw,
      letterType,
      purpose: purpose.trim(),
      deliveryMethod,
    });

    setSubmittedReceipt(created);
    // Reset form
    setApplicantName('');
    setNik('');
    setPhone('');
    setPurpose('');
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearchAttempted(true);
    const query = searchQuery.trim().toLowerCase();
    const found = applications.find(
      (app) => app.trackingNumber.toLowerCase() === query || app.nik === query
    );
    setSearchResult(found || null);
  };

  const handleQuickTrack = (trackingNumber: string) => {
    setSearchQuery(trackingNumber);
    setSearchAttempted(true);
    const found = applications.find(
      (app) => app.trackingNumber.toLowerCase() === trackingNumber.toLowerCase()
    );
    setSearchResult(found || null);
    setActiveSubTab('lacak');
  };

  return (
    <section id="layanan" className="py-16 bg-stone-100/60 border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
            <span>Pelayanan Mandiri Warga</span>
            <span aria-hidden="true">·</span>
            <span>Desa Tirtasari 2026</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Layanan Administrasi Surat Digital
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            Permohonan surat pengantar dan keterangan kependudukan dapat diajukan secara daring tanpa perlu antre berlama-lama di balai desa.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1.5 bg-stone-200/80 rounded-xl max-w-md mb-8">
          <button
            onClick={() => setActiveSubTab('formulir')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeSubTab === 'formulir'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Formulir Pengajuan
          </button>
          <button
            onClick={() => setActiveSubTab('lacak')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeSubTab === 'lacak'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Lacak Berkas
          </button>
          <button
            onClick={() => setActiveSubTab('panduan')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors whitespace-nowrap ${
              activeSubTab === 'panduan'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Syarat & Berkas
          </button>
        </div>

        {/* TAB 1: FORMULIR PENGAJUAN */}
        {activeSubTab === 'formulir' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
              
              {submittedReceipt ? (
                <div className="space-y-6">
                  <div className="p-4 sm:p-6 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-emerald-600 text-white rounded-lg shrink-0">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-bold text-emerald-950">
                          Permohonan Surat Berhasil Dikirim!
                        </h3>
                        <p className="text-sm text-emerald-800">
                          Nomor registrasi berkas Anda adalah{' '}
                          <span className="font-mono font-bold text-base text-emerald-900">
                            {submittedReceipt.trackingNumber}
                          </span>
                        </p>
                        <p className="text-xs text-emerald-700 pt-1">
                          Petugas Seksi Pelayanan akan memverifikasi berkas dalam waktu maksimal 1 hari kerja. Notifikasi status akan dikirimkan ke WhatsApp {submittedReceipt.phone}.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Ringkasan Tanda Terima */}
                  <div className="border border-stone-200 rounded-xl p-5 bg-stone-50 text-sm space-y-3">
                    <div className="flex justify-between items-center border-b border-stone-200 pb-3">
                      <span className="font-semibold text-stone-900">Tanda Terima Elektronik</span>
                      <span className="font-mono text-xs text-stone-500">{submittedReceipt.createdAt}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-stone-700 text-xs sm:text-sm">
                      <div>
                        <span className="text-stone-500 block text-xs">Pemohon</span>
                        <span className="font-medium text-stone-900">{submittedReceipt.applicantName}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-xs">NIK Kependudukan</span>
                        <span className="font-mono text-stone-900">{submittedReceipt.nik}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-xs">Jenis Surat</span>
                        <span className="font-medium text-stone-900">{submittedReceipt.letterType}</span>
                      </div>
                      <div>
                        <span className="text-stone-500 block text-xs">Metode Penyerahan</span>
                        <span className="text-stone-900 capitalize">
                          {submittedReceipt.deliveryMethod === 'ambil_kantor'
                            ? 'Ambil di Balai Desa'
                            : submittedReceipt.deliveryMethod === 'antar_rt'
                            ? 'Diantar Pengurus RT'
                            : 'Unduh File Digital PDF'}
                        </span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-stone-500 block text-xs">Keperluan</span>
                        <span className="text-stone-800">{submittedReceipt.purpose}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleQuickTrack(submittedReceipt.trackingNumber)}
                      className="px-4 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Search className="w-4 h-4" />
                      <span>Cek Status Langsung</span>
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Cetak Bukti Resi</span>
                    </button>
                    <button
                      onClick={() => setSubmittedReceipt(null)}
                      className="px-4 py-2.5 text-stone-600 hover:text-stone-900 text-xs sm:text-sm font-medium transition-colors"
                    >
                      Buat Permohonan Lain
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {formError && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs sm:text-sm flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Jenis Surat */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                        Pilih Jenis Surat Yang Diajukan *
                      </label>
                      <select
                        value={letterType}
                        onChange={(e) => setLetterType(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      >
                        <option>Surat Keterangan Usaha (SKU)</option>
                        <option>Surat Keterangan Domisili (SKD)</option>
                        <option>Surat Pengantar SKCK</option>
                        <option>Surat Keterangan Tidak Mampu (SKTM)</option>
                        <option>Surat Keterangan Kelahiran / Kematian</option>
                        <option>Surat Keterangan Belum Menikah</option>
                        <option>Surat Pengantar Izin Keramaian Lingkungan</option>
                      </select>
                    </div>

                    {/* Nama Lengkap */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                        Nama Lengkap (Sesuai KTP) *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      />
                    </div>

                    {/* NIK */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                        Nomor Induk Kependudukan (16 Digit NIK) *
                      </label>
                      <input
                        type="text"
                        maxLength={16}
                        required
                        value={nik}
                        onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                        placeholder="320114xxxxxxxxxx"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      />
                    </div>

                    {/* Nomor WhatsApp */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                        Nomor WhatsApp / Ponsel Aktif *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0812-xxxx-xxxx"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      />
                    </div>

                    {/* Dusun */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                        Wilayah Dusun *
                      </label>
                      <select
                        value={dusun}
                        onChange={(e) => setDusun(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      >
                        <option>Dusun I Krajan</option>
                        <option>Dusun II Sukasari</option>
                        <option>Dusun III Mekarmukti</option>
                      </select>
                    </div>

                    {/* RT / RW */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                        Nomor RT / RW *
                      </label>
                      <input
                        type="text"
                        required
                        value={rtRw}
                        onChange={(e) => setRtRw(e.target.value)}
                        placeholder="Contoh: RT 03 / RW 02"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      />
                    </div>

                    {/* Metode Penyerahan */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                        Pilihan Pengambilan Surat *
                      </label>
                      <select
                        value={deliveryMethod}
                        onChange={(e) => setDeliveryMethod(e.target.value as any)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      >
                        <option value="ambil_kantor">Ambil Langsung di Balai Desa</option>
                        <option value="antar_rt">Diantar oleh Pengurus RT ke Rumah</option>
                        <option value="unduh_digital">Unduh Berkas PDF Digital Ber-Barcode</option>
                      </select>
                    </div>

                    {/* Keperluan Surat */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1.5">
                        Tujuan / Keperluan Surat *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        placeholder="Jelaskan kebutuhan pengajuan surat secara ringkas (contoh: Syarat pendaftaran perizinan usaha warung kelontong / melamar kerja)"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-stone-200">
                    <span className="text-xs text-stone-500">
                      * Seluruh data kependudukan terlindungi sesuai UU No. 27/2022
                    </span>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-2 whitespace-nowrap active:translate-y-0.5"
                    >
                      <Send className="w-4 h-4" />
                      <span>Kirim Permohonan</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Sisi Kanan: Panduan Ringkas & Berkas Populer */}
            <div className="lg:col-span-4 space-y-5">
              <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>Jaminan Layanan Pemerintah Desa</span>
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-stone-600">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">1.</span>
                    <span><strong>100% Bebas Biaya:</strong> Pengurusan semua surat keterangan tidak dipungut biaya apapun.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">2.</span>
                    <span><strong>Cepat & Terpantau:</strong> Berkas diverifikasi maksimal 1x24 jam kerja dengan nomor pelacak unik.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">3.</span>
                    <span><strong>Sah Secara Hukum:</strong> Dilengkapi barcode otentikasi digital yang dapat dipindai instansi tujuan.</span>
                  </li>
                </ul>
              </div>

              {/* Contoh Permohonan Terdaftar untuk Uji Coba Cepat */}
              <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6">
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">
                  Uji Coba Lacak Berkas Contoh
                </div>
                <p className="text-xs text-stone-600 mb-3">
                  Klik nomor registrasi di bawah untuk langsung mencoba fitur pelacakan surat warga:
                </p>
                <div className="space-y-2">
                  {applications.slice(0, 2).map((app) => (
                    <button
                      key={app.id}
                      onClick={() => handleQuickTrack(app.trackingNumber)}
                      className="w-full text-left p-2.5 bg-white border border-stone-200 hover:border-emerald-500 rounded-lg text-xs transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="font-mono font-bold text-stone-900">{app.trackingNumber}</div>
                        <div className="text-stone-500 truncate max-w-[180px]">{app.applicantName} · {app.letterType}</div>
                      </div>
                      <span className="text-emerald-800 font-medium">Lacak &rarr;</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LACAK STATUS SURAT */}
        {activeSubTab === 'lacak' && (
          <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-xs">
            <h3 className="text-lg font-bold text-stone-900 mb-2">
              Pelacakan Berkas Permohonan Surat
            </h3>
            <p className="text-stone-600 text-sm mb-6">
              Masukkan Nomor Registrasi Pelacakan (contoh: <code className="font-mono text-emerald-800">TS-2026-0842</code>) atau 16 Digit NIK Anda.
            </p>

            <form onSubmit={handleSearch} className="flex gap-2 mb-8">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ketik Nomor Registrasi / NIK di sini..."
                  className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-stone-300 text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-sm font-semibold rounded-lg transition-colors whitespace-nowrap"
              >
                Cari Berkas
              </button>
            </form>

            {/* Hasil Pencarian */}
            {searchAttempted && searchResult ? (
              <div className="border border-stone-200 rounded-xl p-5 bg-stone-50/70 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 pb-4">
                  <div>
                    <span className="text-xs text-stone-500 block uppercase tracking-wider font-semibold">
                      Nomor Registrasi
                    </span>
                    <span className="text-lg font-mono font-bold text-emerald-900">
                      {searchResult.trackingNumber}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-stone-500 block">Tanggal Masuk</span>
                    <span className="text-sm font-medium text-stone-800">{searchResult.createdAt}</span>
                  </div>
                </div>

                {/* Status Timeline Stepper */}
                <div className="py-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-4">
                    Tahapan Verifikasi Berkas
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3 bg-white border border-stone-200 rounded-lg">
                      <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>1. Pengajuan</span>
                      </div>
                      <p className="text-stone-500">Berkas masuk sistem</p>
                    </div>

                    <div className={`p-3 bg-white border rounded-lg ${
                      searchResult.status !== 'Menunggu Verifikasi' ? 'border-emerald-400 bg-emerald-50/50' : 'border-stone-200'
                    }`}>
                      <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>2. Verifikasi</span>
                      </div>
                      <p className="text-stone-500">Pengecekan KTP/KK</p>
                    </div>

                    <div className={`p-3 bg-white border rounded-lg ${
                      searchResult.status === 'Disetujui Kades' || searchResult.status === 'Selesai & Siap Ambil'
                        ? 'border-emerald-400 bg-emerald-50/50'
                        : 'border-stone-200'
                    }`}>
                      <div className="flex items-center gap-2 text-emerald-700 font-bold mb-1">
                        <CheckCircle className="w-4 h-4" />
                        <span>3. TTD Kades</span>
                      </div>
                      <p className="text-stone-500">Validasi Digital</p>
                    </div>

                    <div className={`p-3 bg-white border rounded-lg ${
                      searchResult.status === 'Selesai & Siap Ambil'
                        ? 'border-emerald-500 bg-emerald-100/60 font-semibold text-emerald-950'
                        : 'border-stone-200 text-stone-500'
                    }`}>
                      <div className="flex items-center gap-2 mb-1">
                        <FileCheck2 className="w-4 h-4 text-emerald-700" />
                        <span>4. Selesai</span>
                      </div>
                      <p className="text-xs">Siap diambil / unduh</p>
                    </div>
                  </div>
                </div>

                {/* Detail Berkas Pemohon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-white p-4 rounded-lg border border-stone-200">
                  <div>
                    <span className="text-xs text-stone-500 block">Nama Pemohon</span>
                    <span className="font-medium text-stone-900">{searchResult.applicantName}</span>
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 block">NIK</span>
                    <span className="font-mono text-stone-900">{searchResult.nik}</span>
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 block">Jenis Surat</span>
                    <span className="font-medium text-stone-900">{searchResult.letterType}</span>
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 block">Status Terakhir</span>
                    <span className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800">
                      {searchResult.status}
                    </span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-xs text-stone-500 block">Catatan Petugas</span>
                    <span className="text-stone-700">{searchResult.notes || 'Berkas sedang dalam antrean proses.'}</span>
                  </div>
                </div>

                {searchResult.status === 'Selesai & Siap Ambil' && (
                  <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="text-xs text-emerald-900">
                      Surat resmi telah siap. Anda dapat mengunduh berkas bertanda tangan elektronik atau mengambil cetakan fisik di Balai Desa.
                    </div>
                    <button
                      onClick={() => alert(`Mengunduh Salinan Berkas Resmi ${searchResult.trackingNumber}.pdf`)}
                      className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shrink-0"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh PDF</span>
                    </button>
                  </div>
                )}
              </div>
            ) : searchAttempted ? (
              <div className="p-8 text-center bg-stone-50 rounded-xl border border-dashed border-stone-300">
                <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-stone-800">Data Permohonan Tidak Ditemukan</p>
                <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                  Pastikan Nomor Registrasi atau NIK yang Anda masukkan sudah benar. Bila baru saja mengajukan secara luring, mohon beri waktu sinkronisasi sistem.
                </p>
              </div>
            ) : null}
          </div>
        )}

        {/* TAB 3: SYARAT & PERSYARATAN BERKAS */}
        {activeSubTab === 'panduan' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
              <h3 className="font-bold text-stone-900 mb-2">Surat Keterangan Usaha (SKU)</h3>
              <p className="text-xs text-stone-500 mb-4">
                Dibutuhkan untuk pengajuan pinjaman modal bank (KUR), legalitas izin usaha mikro, atau program bantuan pemerintah.
              </p>
              <div className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">Persyaratan Wajib:</div>
              <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside">
                <li>Fotokopi e-KTP & Kartu Keluarga (KK)</li>
                <li>Foto tempat / aktivitas usaha berjalan</li>
                <li>Surat pengantar rukun tetangga (RT/RW)</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
              <h3 className="font-bold text-stone-900 mb-2">Surat Pengantar SKCK</h3>
              <p className="text-xs text-stone-500 mb-4">
                Surat rekomendasi dari kepala desa untuk pengurusan SKCK di Polsek / Polres bagi pelamar kerja atau ASN.
              </p>
              <div className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">Persyaratan Wajib:</div>
              <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside">
                <li>Fotokopi e-KTP & Kartu Keluarga</li>
                <li>Pas foto berwarna ukuran 4x6 latar merah (2 lembar)</li>
                <li>Surat pengantar RT setempat</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs">
              <h3 className="font-bold text-stone-900 mb-2">Surat Ket. Tidak Mampu (SKTM)</h3>
              <p className="text-xs text-stone-500 mb-4">
                Untuk keringanan biaya rumah sakit (BPJS PBI), beasiswa anak sekolah / kuliah (KIP-Kuliah), atau bansos.
              </p>
              <div className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2">Persyaratan Wajib:</div>
              <ul className="text-xs text-stone-600 space-y-2 list-disc list-inside">
                <li>Fotokopi e-KTP & KK pemohon</li>
                <li>Surat pernyataan bermaterai belum mampu</li>
                <li>Verifikasi faktual oleh kepala dusun</li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
