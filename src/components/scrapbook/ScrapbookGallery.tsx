'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/types';
import PhotoLightbox from './PhotoLightbox';
import { Image as ImageIcon, Sparkles, Heart, LayoutGrid, Layers, Filter } from 'lucide-react';
import { sound } from '@/lib/sound';

interface ScrapbookGalleryProps {
  photos: Photo[];
}

export default function ScrapbookGallery({ photos }: ScrapbookGalleryProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [layoutMode, setLayoutMode] = useState<'polaroid' | 'grid'>('polaroid');

  // Categories
  const categories = ['All', ...Array.from(new Set(photos.map((p) => p.category || 'Memories')))];

  const filteredPhotos = activeCategory === 'All'
    ? photos
    : photos.filter((p) => (p.category || 'Memories') === activeCategory);

  const handleOpenPhoto = (index: number) => {
    sound.playChime(750, 0.4);
    setSelectedPhotoIndex(index);
  };

  // Tilts for playful polaroid scrapbook look
  const tilts = ['-rotate-2', 'rotate-2', '-rotate-3', 'rotate-1', 'rotate-3', '-rotate-1'];

  return (
    <section id="scrapbook" className="relative py-20 px-4 max-w-6xl mx-auto z-20">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-rose-300 text-xs md:text-sm">
          <ImageIcon className="w-4 h-4 text-rose-400" />
          <span>Our Private Scrapbook</span>
        </div>

        <h2 className="text-3xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-amber-100 to-purple-200">
          Yaadein Jo Hamesha Zinda Rahengi
        </h2>

        <p className="text-sm md:text-base text-purple-200/80 font-sans">
          Har tasveer mein ek chhota sa pal qaid hai jo Ayush aur Shree ke dil ke behad kareeb hai.
        </p>
      </div>

      {/* Filter Tabs and Layout Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-purple-500/20">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-purple-300/60 flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-rose-600 text-white shadow-[0_0_15px_rgba(255,77,136,0.5)]'
                  : 'bg-purple-950/40 text-purple-200 hover:bg-purple-900/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Layout Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-purple-500/30">
          <button
            onClick={() => setLayoutMode('polaroid')}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all cursor-pointer ${
              layoutMode === 'polaroid' ? 'bg-rose-600 text-white' : 'text-purple-300 hover:text-white'
            }`}
            title="Polaroid Scrapbook Layout"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Scrapbook</span>
          </button>
          <button
            onClick={() => setLayoutMode('grid')}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-all cursor-pointer ${
              layoutMode === 'grid' ? 'bg-rose-600 text-white' : 'text-purple-300 hover:text-white'
            }`}
            title="Cinematic Grid Layout"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Grid</span>
          </button>
        </div>
      </div>

      {/* Scrapbook Content */}
      {layoutMode === 'polaroid' ? (
        /* Polaroid Scrapbook Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredPhotos.map((photo, index) => {
            const tilt = tilts[index % tilts.length];

            return (
              <div
                key={photo.id}
                onClick={() => handleOpenPhoto(index)}
                className={`group relative p-4 pb-6 bg-[#fbf9f5] rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-300 hover:scale-105 hover:z-20 hover:rotate-0 ${tilt}`}
              >
                {/* Vintage Tape Decoration at top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-200/50 backdrop-blur-sm border border-amber-300/40 rotate-1 shadow-sm rounded-sm" />

                {/* Photo Container */}
                <div className="relative w-full aspect-[4/3] bg-neutral-900 rounded-lg overflow-hidden mb-3">
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-white text-xs font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      <span>View in Full Screen</span>
                    </span>
                  </div>
                </div>

                {/* Polaroid Handwritten Caption */}
                <div className="space-y-1 px-1">
                  <h4 className="font-serif font-bold text-gray-900 text-base line-clamp-1">
                    {photo.title}
                  </h4>
                  <p className="font-sans text-xs text-gray-600 line-clamp-2 italic">
                    &ldquo;{photo.caption}&rdquo;
                  </p>
                  {photo.date && (
                    <div className="text-[10px] text-gray-400 font-mono pt-1">
                      {photo.date}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Cinematic Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => handleOpenPhoto(index)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-black/40 border border-purple-500/30 cursor-pointer shadow-lg hover:border-rose-500/60 transition-all duration-300 hover:scale-[1.02]"
            >
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12071d] via-[#12071d]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <span className="text-xs text-amber-300 font-semibold mb-1">
                  {photo.category}
                </span>
                <h4 className="text-lg font-serif font-bold text-white mb-1">
                  {photo.title}
                </h4>
                <p className="text-xs text-rose-200/80 font-sans line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo Lightbox */}
      {selectedPhotoIndex !== null && (
        <PhotoLightbox
          photo={filteredPhotos[selectedPhotoIndex]}
          onClose={() => setSelectedPhotoIndex(null)}
          onPrev={() => setSelectedPhotoIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev))}
          onNext={() => setSelectedPhotoIndex((prev) => (prev !== null && prev < filteredPhotos.length - 1 ? prev + 1 : prev))}
          hasPrev={selectedPhotoIndex > 0}
          hasNext={selectedPhotoIndex < filteredPhotos.length - 1}
        />
      )}
    </section>
  );
}
