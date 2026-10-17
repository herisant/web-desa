import React, { useState } from 'react';
import { X, Send, CheckCircle, AlertCircle, FileText, Printer, Search } from 'lucide-react';
import { SuratApplication } from '../types';

interface LetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (app: Omit<SuratApplication, 'id' | 'trackingNumber' | 'createdAt' | 'status'>) => SuratApplication;
  onTrackRedirect: (trackingNumber: string) => void;
}

export const LetterModal: React.FC<LetterModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onTrackRedirect,
}) => {
  const [applicantName, setApplicantName] = useState('');
  const [nik, setNik] = useState('');
  const [phone, setPhone] = useState('');
  const [dusun, setDusun] = useState('Dusun I Krajan');
  const [rtRw, setRtRw] = useState('RT 01 / RW 01');
  const [letterType, setLetterType] = useState('Surat Keterangan Usaha (SKU)');
  const [purpose, setPurpose] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'ambil_kantor' | 'antar_rt' | 'unduh_digital'>('ambil_kantor');
  
  const [submitted, setSubmitted] = useState<SuratApplication | null>(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!applicantName.trim()) {
      setError('Nama lengkap pemohon wajib diisi.');
      return;
    }
    if (nik.trim().length !== 16 || !/^\d+$/.test(nik.trim())) {
      setError('NIK harus berupa 16 digit angka.');
      return;
    }
    if (!phone.trim()) {
      setError('Nomor ponsel/WhatsApp aktif wajib diisi.');
      return;
    }
    if (!purpose.trim()) {
      setError('Keperluan surat harus diisi secara jelas.');
      return;
    }

    const res = onSubmit({
      applicantName: applicantName.trim(),
      nik: nik.trim(),
      phone: phone.trim(),
      dusun,
      rtRw,
      letterType,
      purpose: purpose.trim(),
      deliveryMethod,
    });

    setSubmitted(res);
  };

  const handleResetAndClose = () => {
    setSubmitted(null);
    setApplicantName('');
    setNik('');
    setPhone('');
    setPurpose('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 animate-in fade-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-lg transition-colors"
          aria-label="Tutup Formulir"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="space-y-5">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-emerald-950 text-base">
                    Permohonan Berhasil Dikirimkan!
                  </h3>
                  <p className="text-xs sm:text-sm text-emerald-800 mt-1">
                    Nomor registrasi pelacakan berkas Anda:
                  </p>
                  <div className="font-mono font-bold text-lg text-emerald-900 mt-1">
                    {submitted.trackingNumber}
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-stone-200 rounded-xl p-4 bg-stone-50 text-xs text-stone-700 space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Pemohon:</span>
                <span className="font-semibold text-stone-900">{submitted.applicantName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">NIK:</span>
                <span className="font-mono text-stone-900">{submitted.nik}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Jenis Surat:</span>
                <span className="font-medium text-stone-900">{submitted.letterType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Metode Pengambilan:</span>
                <span className="text-stone-900 capitalize">
                  {submitted.deliveryMethod === 'ambil_kantor'
                    ? 'Ambil di Balai Desa'
                    : submitted.deliveryMethod === 'antar_rt'
                    ? 'Diantar Pengurus RT'
                    : 'Unduh PDF Ber-Barcode'}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => {
                  onTrackRedirect(submitted.trackingNumber);
                  handleResetAndClose();
                }}
                className="flex-1 py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Lihat Status di Portal</span>
              </button>
              <button
                onClick={() => window.print()}
                className="py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Bukti</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
              <FileText className="w-4 h-4" />
              <span>Layanan Mandiri Warga</span>
            </div>

            <h3 className="text-xl font-bold text-stone-900 mb-1">
              Pengajuan Surat Keterangan Online
            </h3>
            <p className="text-xs text-stone-500 mb-5">
              Isi formulir di bawah ini dengan data kependudukan yang sesuai KTP/KK Anda.
            </p>

            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Jenis Surat Yang Dibutuhkan *
                </label>
                <select
                  value={letterType}
                  onChange={(e) => setLetterType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option>Surat Keterangan Usaha (SKU)</option>
                  <option>Surat Keterangan Domisili (SKD)</option>
                  <option>Surat Pengantar SKCK</option>
                  <option>Surat Keterangan Tidak Mampu (SKTM)</option>
                  <option>Surat Keterangan Kelahiran / Kematian</option>
                  <option>Surat Keterangan Belum Menikah</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Sesuai e-KTP..."
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    16 Digit NIK *
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    required
                    value={nik}
                    onChange={(e) => setNik(e.target.value.replace(/\D/g, ''))}
                    placeholder="320114..."
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    No. WhatsApp / HP Aktif *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                    Wilayah Dusun *
                  </label>
                  <select
                    value={dusun}
                    onChange={(e) => setDusun(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    <option>Dusun I Krajan</option>
                    <option>Dusun II Sukasari</option>
                    <option>Dusun III Mekarmukti</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Keperluan / Peruntukan Surat *
                </label>
                <textarea
                  rows={2}
                  required
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="Contoh: Pengajuan pinjaman usaha KUR / pendaftaran beasiswa..."
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Metode Pengambilan *
                </label>
                <select
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="ambil_kantor">Ambil Langsung di Balai Desa</option>
                  <option value="antar_rt">Diantar oleh Pengurus RT</option>
                  <option value="unduh_digital">Unduh Berkas PDF Digital Ber-Barcode</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2 text-stone-600 hover:text-stone-900 text-xs font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Permohonan</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
