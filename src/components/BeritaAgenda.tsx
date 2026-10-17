import React, { useState } from 'react';
import { VILLAGE_ARTICLES } from '../data/mockData';
import { VillageArticle } from '../types';
import { Search, Calendar, User, ArrowRight, X, Clock } from 'lucide-react';

export const BeritaAgenda: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<VillageArticle | null>(null);

  const categories = ['Semua', 'Pengumuman', 'Pembangunan', 'Kegiatan', 'Kesehatan'];

  const filteredArticles = VILLAGE_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'Semua' || article.category === selectedCategory;
    const matchesQuery =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <section id="berita" className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Search */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
              <span>Warta & Informasi Warga</span>
              <span aria-hidden="true">·</span>
              <span>Kabar Tirtasari</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Kabar Terkini & Pengumuman Resmi
            </h2>
            <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl leading-relaxed">
              Dapatkan berita terbaru seputar penyaluran program bantuan, kemajuan proyek infrastruktur desa, serta agenda posyandu dan kerja bakti.
            </p>
          </div>

          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari berita atau agenda..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-300 text-xs sm:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3-Tier Salience Editorial Layout */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredArticles.map((article, idx) => {
              const isLead = idx === 0 && selectedCategory === 'Semua' && !searchQuery;
              return (
                <div
                  key={article.id}
                  className={`bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:border-emerald-300 transition-colors ${
                    isLead ? 'md:col-span-2 bg-gradient-to-br from-white to-stone-50' : ''
                  }`}
                >
                  <div>
                    {/* Unboxed Metadata (Zero-Pill discipline) */}
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                      <span className="font-semibold text-emerald-800">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.date}</span>
                      <span aria-hidden="true">·</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className={`font-bold text-stone-900 mb-3 leading-snug ${isLead ? 'text-xl sm:text-2xl' : 'text-base'}`}>
                      {article.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                      {article.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <span className="text-xs text-stone-400">Oleh: {article.author}</span>
                    <button
                      onClick={() => setActiveArticle(article)}
                      className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 group"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-xl border border-stone-200 text-stone-500 text-sm">
            Tidak ditemukan artikel untuk kata kunci tersebut.
          </div>
        )}

        {/* Modal Baca Artikel Lengkap */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95">
              <button
                onClick={() => setActiveArticle(null)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-stone-500 mb-3">
                <span className="font-semibold text-emerald-800 uppercase tracking-wider">{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.date}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.readTime}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-stone-900 mb-4 leading-snug">
                {activeArticle.title}
              </h2>

              <div className="flex items-center gap-2 text-xs text-stone-500 border-b border-stone-200 pb-4 mb-6">
                <User className="w-3.5 h-3.5" />
                <span>Ditulis oleh: <strong>{activeArticle.author}</strong></span>
              </div>

              <div className="prose prose-stone text-sm leading-relaxed text-stone-700 space-y-4">
                <p className="font-medium text-stone-900 text-base leading-relaxed">
                  {activeArticle.summary}
                </p>
                <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:text-emerald-800 leading-loose">
                  {activeArticle.content}
                </p>
                <p className="text-xs text-stone-500 italic pt-4 border-t border-stone-100">
                  Warta Resmi Publikasi Kantor Pemerintah Desa Tirtasari, Kecamatan Sukaresmi, Kabupaten Bogor.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-stone-200 flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 bg-stone-900 text-white text-xs font-semibold rounded-lg hover:bg-stone-800 transition-colors"
                >
                  Tutup Berita
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
