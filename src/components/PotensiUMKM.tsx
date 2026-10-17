import React, { useState } from 'react';
import { UMKM_PRODUCTS } from '../data/mockData';
import { UmkmProduct } from '../types';
import { ShoppingBag, MessageSquare, Compass, CheckCircle2, X } from 'lucide-react';
import umkmImage from '../assets/images/umkm_wisata_desa_1792245268613.jpg';

export const PotensiUMKM: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [selectedProduct, setSelectedProduct] = useState<UmkmProduct | null>(null);

  const categories = ['Semua', 'Pertanian', 'Kerajinan', 'Kuliner', 'Wisata'];

  const filteredProducts = selectedCategory === 'Semua'
    ? UMKM_PRODUCTS
    : UMKM_PRODUCTS.filter((p) => p.category === selectedCategory);

  const getWaLink = (product: UmkmProduct) => {
    const text = encodeURIComponent(
      `Halo pengrajin/produsen ${product.name} (BUMDes Desa Tirtasari), saya tertarik untuk memesan atau mengetahui info lebih lanjut mengenai produk ini.`
    );
    return `https://wa.me/${product.contactWa}?text=${text}`;
  };

  return (
    <section id="umkm" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
            <span>Kemandirian Ekonomi Warga</span>
            <span aria-hidden="true">·</span>
            <span>BUMDes Tirta Makmur</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Potensi Desa, Produk UMKM & Ekowisata
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base leading-relaxed">
            Dukung ekonomi lokal dengan membeli produk tani unggulan, kerajinan bambu tradisional, dan menikmati keindahan alam Desa Tirtasari.
          </p>
        </div>

        {/* Marquee Bento Banner with generated harvest photography */}
        <div className="relative rounded-2xl overflow-hidden border border-stone-200 bg-stone-900 text-white mb-12 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-7 p-6 sm:p-10 z-10">
              <span className="text-xs uppercase tracking-widest font-semibold text-amber-300 block mb-2">
                Produk Unggulan Desa
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
                Kopi Robusta Petik Merah & Kerajinan Bambu Lestari
              </h3>
              <p className="text-sm text-stone-300 leading-relaxed max-w-xl mb-6">
                Dipanen langsung dari lereng Gunung Salak dengan ketinggian optimal, diproses secara teliti oleh kelompok tani dan pengrajin lokal untuk menghasilkan kualitas terbaik Nusantara.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://wa.me/6281388214450?text=Halo%20BUMDes%20Tirta%20Makmur%2C%20saya%20tertarik%20dengan%20katalog%20produk%20unggulan%20Desa%20Tirtasari"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Hubungi Sentra BUMDes</span>
                </a>
                <span className="text-xs text-stone-400">
                  Tersedia pengiriman ke seluruh kota di Indonesia
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 h-64 lg:h-96 relative">
              <img
                src={umkmImage}
                alt="Petani panen kopi dan kerajinan bambu Desa Tirtasari"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-stone-900 via-stone-900/40 to-transparent" />
            </div>

          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:border-emerald-300 transition-all hover:shadow-sm"
            >
              <div>
                {/* Clean unboxed metadata (No pill badges) */}
                <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                  <span className="font-semibold text-emerald-800">{product.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{product.dusun}</span>
                </div>

                <h4 className="text-lg font-bold text-stone-900 mb-2 leading-snug">
                  {product.name}
                </h4>

                <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-3">
                  {product.description}
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[11px] text-stone-400 block uppercase">Harga / Tarif</span>
                    <span className="text-sm sm:text-base font-bold text-stone-900 font-mono">
                      {product.price}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-stone-400 block uppercase">Produsen / Pengelola</span>
                    <span className="text-xs font-medium text-stone-700 truncate max-w-[130px] block">
                      {product.producer}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1 py-2 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-lg transition-colors text-center"
                  >
                    Detail Lengkap
                  </button>
                  <a
                    href={getWaLink(product)}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2 px-3 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Pesan WA</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Detail Produk */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-xl relative animate-in fade-in zoom-in-95">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
                {selectedProduct.category} · {selectedProduct.dusun}
              </div>

              <h3 className="text-xl font-bold text-stone-900 mb-3">
                {selectedProduct.name}
              </h3>

              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 mb-4 flex items-center justify-between">
                <span className="text-xs text-stone-600">Harga / Biaya Resmi:</span>
                <span className="font-mono font-bold text-stone-900 text-base">
                  {selectedProduct.price}
                </span>
              </div>

              <p className="text-sm text-stone-700 leading-relaxed mb-5">
                {selectedProduct.description}
              </p>

              <div className="border-t border-stone-200 pt-4 mb-6 text-xs text-stone-600 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-stone-500">Kelompok Produksi:</span>
                  <span className="font-medium text-stone-900">{selectedProduct.producer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Lokasi Kebun/Workshop:</span>
                  <span className="text-stone-900">{selectedProduct.dusun}, Desa Tirtasari</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Mitra Pembinaan:</span>
                  <span className="text-emerald-800 font-medium">BUMDes Tirta Makmur</span>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={getWaLink(selectedProduct)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs sm:text-sm font-semibold rounded-lg text-center transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Pesan Sekarang via WhatsApp</span>
                </a>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs sm:text-sm font-medium rounded-lg transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
