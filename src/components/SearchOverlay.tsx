import React, { useState, useEffect, useRef } from "react";
import { Search, X, ArrowRight, Compass, Coffee, MapPin, Sparkles } from "lucide-react";
import { useCms } from "../context/CmsContext";

interface SearchOverlayProps {
  onNavigate: (page: string) => void;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ onNavigate }) => {
  const { isSearchOpen, closeSearch, safaris, coffeeProducts, openCoffeeOrderModal } = useCms();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  const matchingSafaris = cleanQuery
    ? safaris.filter(
        (s) =>
          s.title.toLowerCase().includes(cleanQuery) ||
          s.destinationsFormatted.toLowerCase().includes(cleanQuery) ||
          s.overview.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchingCoffee = cleanQuery
    ? coffeeProducts.filter(
        (c) =>
          c.name.toLowerCase().includes(cleanQuery) ||
          c.origin.toLowerCase().includes(cleanQuery) ||
          c.category.toLowerCase().includes(cleanQuery) ||
          c.flavorNotes.some((n) => n.toLowerCase().includes(cleanQuery))
      )
    : [];

  const handleSelectPage = (page: string) => {
    closeSearch();
    onNavigate(page);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#101210]/98 backdrop-blur-2xl flex flex-col animate-fade-in text-[#F7F4EC]"
      role="dialog"
      aria-modal="true"
    >
      {/* Top Search Input Bar (Exact Layout from image_196d9ac4.png) */}
      <div className="border-b border-white/10 px-6 py-6 sm:py-8 max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-4">
          <Search className="w-8 h-8 sm:w-10 sm:h-10 text-[#F4B41A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search on site..."
            className="flex-1 bg-transparent text-xl sm:text-3xl lg:text-4xl font-editorial font-bold text-[#F7F4EC] placeholder-white/30 focus:outline-none"
          />
          <button
            onClick={closeSearch}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F4EC] flex items-center justify-center transition-all cursor-pointer shrink-0"
            aria-label="Close search"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Links Suggestions */}
        <div className="flex flex-wrap items-center gap-2 mt-4 text-xs text-[#F7F4EC]/60">
          <span className="font-bold text-[#F4B41A]">POPULAR:</span>
          {["Gorilla Trekking", "Bwindi", "Mount Elgon Coffee", "Serengeti", "Rwenzori", "Nile Falls", "Bespoke Builder"].map(
            (tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 hover:text-[#F4B41A] transition-all cursor-pointer"
              >
                {tag}
              </button>
            )
          )}
        </div>
      </div>

      {/* Results Container */}
      <div className="flex-1 overflow-y-auto px-6 py-8 max-w-5xl mx-auto w-full space-y-8">
        {!cleanQuery ? (
          <div className="text-center py-16 space-y-4">
            <Compass className="w-12 h-12 text-[#D99A00]/50 mx-auto" />
            <h3 className="font-editorial text-2xl font-bold text-white/80">
              Discover East Africa With Sonnenpfad Safaris
            </h3>
            <p className="text-sm text-white/50 max-w-md mx-auto">
              Type to search signature safari expeditions, national park destinations, organic coffee beans, and custom journey itineraries.
            </p>
          </div>
        ) : (
          <>
            {/* Safari Results */}
            {matchingSafaris.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#F4B41A] mb-3 flex items-center gap-2">
                  <Compass className="w-4 h-4" />
                  <span>Safari Packages ({matchingSafaris.length})</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchingSafaris.map((safari) => (
                    <div
                      key={safari.id}
                      onClick={() => handleSelectPage("safaris")}
                      className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D99A00] transition-all cursor-pointer flex gap-4 group"
                    >
                      <img
                        src={safari.image}
                        alt={safari.title}
                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-bold text-[#F4B41A] uppercase tracking-wider">
                          {safari.duration}
                        </span>
                        <h5 className="font-editorial text-lg font-bold text-[#F7F4EC] group-hover:text-[#F4B41A] transition-colors">
                          {safari.title}
                        </h5>
                        <p className="text-xs text-white/60 line-clamp-1 mt-0.5">
                          {safari.destinationsFormatted}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Coffee Results */}
            {matchingCoffee.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#F4B41A] mb-3 flex items-center gap-2">
                  <Coffee className="w-4 h-4" />
                  <span>Coffee & Coffee Products ({matchingCoffee.length})</span>
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {matchingCoffee.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => {
                        closeSearch();
                        openCoffeeOrderModal(prod);
                      }}
                      className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#D99A00] transition-all cursor-pointer flex gap-4 group"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-20 h-20 rounded-xl object-cover shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#F4B41A] uppercase tracking-wider">
                            {prod.category}
                          </span>
                          <span className="font-mono text-xs font-bold text-[#F4B41A]">
                            ${prod.price.toFixed(2)}
                          </span>
                        </div>
                        <h5 className="font-editorial text-lg font-bold text-[#F7F4EC] group-hover:text-[#F4B41A] transition-colors">
                          {prod.name}
                        </h5>
                        <p className="text-xs text-white/60 line-clamp-1 mt-0.5">
                          {prod.origin}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {matchingSafaris.length === 0 && matchingCoffee.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/60 text-sm">
                  No direct results found for "{query}". Try browsing our Safaris or Coffee Shop collections!
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
