/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavTab, SuratApplication, CitizenReport } from './types';
import { INITIAL_APPLICATIONS, INITIAL_CITIZEN_REPORTS } from './data/mockData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { LayananSurat } from './components/LayananSurat';
import { APBDesTransparansi } from './components/APBDesTransparansi';
import { ProfilPemerintahan } from './components/ProfilPemerintahan';
import { PotensiUMKM } from './components/PotensiUMKM';
import { BeritaAgenda } from './components/BeritaAgenda';
import { AspirasiPengaduan } from './components/AspirasiPengaduan';
import { Footer } from './components/Footer';
import { LetterModal } from './components/LetterModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('beranda');
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);

  // Persistent letter applications
  const [applications, setApplications] = useState<SuratApplication[]>(() => {
    try {
      const saved = localStorage.getItem('tirtasari_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  // Persistent citizen complaints
  const [citizenReports, setCitizenReports] = useState<CitizenReport[]>(() => {
    try {
      const saved = localStorage.getItem('tirtasari_reports');
      return saved ? JSON.parse(saved) : INITIAL_CITIZEN_REPORTS;
    } catch {
      return INITIAL_CITIZEN_REPORTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('tirtasari_applications', JSON.stringify(applications));
    } catch (e) {
      console.warn('Failed to save applications to localStorage', e);
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem('tirtasari_reports', JSON.stringify(citizenReports));
    } catch (e) {
      console.warn('Failed to save reports to localStorage', e);
    }
  }, [citizenReports]);

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    if (tab === 'beranda') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(tab);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleCreateApplication = (
    appData: Omit<SuratApplication, 'id' | 'trackingNumber' | 'createdAt' | 'status'>
  ): SuratApplication => {
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const trackingNumber = `TS-2026-${randomDigits}`;

    const newApp: SuratApplication = {
      ...appData,
      id: `app-${Date.now()}`,
      trackingNumber,
      createdAt: '17 Oktober 2026',
      status: 'Menunggu Verifikasi',
      notes: 'Permohonan baru masuk sistem. Sedang dalam antrean pemeriksaan berkas.',
    };

    setApplications((prev) => [newApp, ...prev]);
    return newApp;
  };

  const handleCreateReport = (
    reportData: Omit<CitizenReport, 'id' | 'date' | 'status'>
  ) => {
    const newReport: CitizenReport = {
      ...reportData,
      id: `rep-${Date.now()}`,
      date: '17 Oktober 2026',
      status: 'Diterima',
      responseNote: 'Laporan telah diteruskan ke petugas wilayah RT terkait untuk ditinjau.',
    };

    setCitizenReports((prev) => [newReport, ...prev]);
  };

  const handleTrackRedirect = (trackingNumber: string) => {
    setActiveTab('layanan');
    const el = document.getElementById('layanan');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-emerald-600 selection:text-white">
      {/* 3-Zone Top Bar Header */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenLetterModal={() => setIsLetterModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with Aerial Photo & 4-Column Stats */}
        <Hero
          onOpenLetterModal={() => setIsLetterModalOpen(true)}
          onNavigateToTransparansi={() => handleSelectTab('transparansi')}
          onNavigateToLayanan={() => handleSelectTab('layanan')}
        />

        {/* Layanan Surat Mandiri (Online Letter Submissions & Live Tracking) */}
        <LayananSurat
          applications={applications}
          onSubmitApplication={handleCreateApplication}
        />

        {/* Transparansi APBDes TA 2026 */}
        <APBDesTransparansi />

        {/* Profil Desa, Kantor Balai Desa & Aparatur Perangkat */}
        <ProfilPemerintahan />

        {/* Potensi Desa, Produk UMKM & Ekowisata */}
        <PotensiUMKM />

        {/* Kabar & Berita Terkini Desa Tirtasari */}
        <BeritaAgenda />

        {/* Kanal Aspirasi & Kotak Aduan Warga */}
        <AspirasiPengaduan
          reports={citizenReports}
          onSubmitReport={handleCreateReport}
        />
      </main>

      {/* Official Government Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenLetterModal={() => setIsLetterModalOpen(true)}
      />

      {/* Quick Letter Application Dialog */}
      <LetterModal
        isOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
        onSubmit={handleCreateApplication}
        onTrackRedirect={handleTrackRedirect}
      />
    </div>
  );
}
