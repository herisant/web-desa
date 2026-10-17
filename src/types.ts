export type NavTab = 'beranda' | 'layanan' | 'profil' | 'umkm' | 'transparansi' | 'berita' | 'aspirasi';

export interface SuratApplication {
  id: string;
  trackingNumber: string;
  applicantName: string;
  nik: string;
  phone: string;
  rtRw: string;
  dusun: string;
  letterType: string;
  purpose: string;
  deliveryMethod: 'ambil_kantor' | 'antar_rt' | 'unduh_digital';
  createdAt: string;
  status: 'Menunggu Verifikasi' | 'Diproses Petugas' | 'Disetujui Kades' | 'Selesai & Siap Ambil';
  notes?: string;
}

export interface APBDesItem {
  kategori: string;
  nominal: number;
  realisasi: number;
  persentase: number;
  keterangan: string;
}

export interface VillageOfficial {
  name: string;
  role: string;
  nip?: string;
  phone?: string;
  focusArea: string;
}

export interface UmkmProduct {
  id: string;
  name: string;
  category: 'Pertanian' | 'Kerajinan' | 'Kuliner' | 'Wisata';
  price: string;
  producer: string;
  dusun: string;
  description: string;
  contactWa: string;
  featured?: boolean;
}

export interface VillageArticle {
  id: string;
  title: string;
  category: 'Pengumuman' | 'Pembangunan' | 'Kegiatan' | 'Kesehatan';
  date: string;
  author: string;
  summary: string;
  content: string;
  readTime: string;
}

export interface CitizenReport {
  id: string;
  name: string;
  category: 'Infrastruktur' | 'Pelayanan' | 'Bansos' | 'Kebersihan' | 'Keamanan';
  location: string;
  description: string;
  date: string;
  status: 'Diterima' | 'Sedang Ditindak' | 'Selesai';
  responseNote?: string;
}
