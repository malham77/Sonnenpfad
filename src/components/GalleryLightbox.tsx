import React, { useState, useEffect } from "react";
import { GALLERY_ITEMS, GalleryItem } from "../data/galleryData";
import { X, ChevronLeft, ChevronRight, MapPin, Maximize2 } from "lucide-react";

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const categories = ["All", "Wildlife", "Gorillas", "Landscapes", "Culture", "Adventure", "Our Guests"];

  const filteredItems =
    activeCategory === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return;
      if (e.key === "Escape") setSelectedItem(null);
      if (e.key === "ArrowRight") {
        const idx = filteredItems.findIndex((it) => it.id === selectedItem.id);
        if (idx < filteredItems.length - 1) setSelectedItem(filteredItems[idx + 1]);
      }
      if (e.key === "ArrowLeft") {
        const idx = filteredItems.findIndex((it) => it.id === selectedItem.id);
        if (idx > 0) setSelectedItem(filteredItems[idx - 1]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem, filteredItems]);

  return (
    <div className="w-full">
      {/* Category Filter Tabs (Interactive Filter Buttons per Constitution) */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer border ${
                isActive
                  ? "bg-[#073F27] border-[#D99A00] text-[#F4B41A]"
                  : "bg-[#171A17] border-[#D99A00]/20 text-[#F7F4EC]/70 hover:border-[#D99A00]/60 hover:text-[#F7F4EC]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Editorial Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group relative h-80 overflow-hidden bg-[#101210] border border-[#D99A00]/20 cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Dark Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#101210] via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Top Category Badge */}
            <div className="absolute top-4 left-4 text-[10px] tracking-widest font-semibold uppercase text-[#F4B41A] bg-[#073F27]/85 px-2.5 py-1 border border-[#D99A00]/30">
              {item.category}
            </div>

            {/* Hover Expand Icon */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-none bg-[#101210]/60 text-[#F7F4EC] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center border border-[#D99A00]/40">
              <Maximize2 className="w-3.5 h-3.5 text-[#F4B41A]" />
            </div>

            {/* Bottom Caption & Location */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-1.5 text-[11px] text-[#D99A00] mb-1">
                <MapPin className="w-3 h-3" />
                <span>{item.location}</span>
              </div>
              <h4 className="font-editorial text-lg font-bold text-[#F7F4EC] leading-snug">
                {item.title}
              </h4>
            </div>
          </div>
        ))}
      </div>

      {/* Cinematic Full-Screen Lightbox */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedItem(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-6 right-6 z-20 w-11 h-11 bg-[#171A17] text-[#F7F4EC] hover:text-[#F4B41A] border border-[#D99A00]/40 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Previous / Next Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const idx = filteredItems.findIndex((it) => it.id === selectedItem.id);
              if (idx > 0) setSelectedItem(filteredItems[idx - 1]);
            }}
            disabled={filteredItems.findIndex((it) => it.id === selectedItem.id) === 0}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-[#171A17]/80 text-[#F7F4EC] hover:text-[#F4B41A] disabled:opacity-30 border border-[#D99A00]/40 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              const idx = filteredItems.findIndex((it) => it.id === selectedItem.id);
              if (idx < filteredItems.length - 1) setSelectedItem(filteredItems[idx + 1]);
            }}
            disabled={
              filteredItems.findIndex((it) => it.id === selectedItem.id) === filteredItems.length - 1
            }
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-[#171A17]/80 text-[#F7F4EC] hover:text-[#F4B41A] disabled:opacity-30 border border-[#D99A00]/40 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Image & Info */}
          <div
            className="relative max-w-5xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedItem.image}
              alt={selectedItem.title}
              referrerPolicy="no-referrer"
              className="max-h-[75vh] w-auto max-w-full object-contain border border-[#D99A00]/30 shadow-2xl"
            />
            <div className="mt-4 text-center max-w-2xl px-4">
              <div className="flex items-center justify-center gap-2 text-xs text-[#F4B41A] uppercase tracking-wider mb-1">
                <span>{selectedItem.category}</span>
                <span className="text-[#D99A00]">·</span>
                <MapPin className="w-3 h-3" />
                <span>{selectedItem.location}</span>
              </div>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#F7F4EC]">
                {selectedItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#F7F4EC]/75 mt-1 font-light">
                {selectedItem.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
