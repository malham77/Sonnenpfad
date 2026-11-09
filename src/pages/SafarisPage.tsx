import React, { useState } from "react";
import { useCms } from "../context/CmsContext";
import { SafariPackage } from "../data/safarisData";
import { Clock, MapPin, ArrowRight, Check, Compass, Sparkles } from "lucide-react";

interface SafarisPageProps {
  onSelectSafari: (safari: SafariPackage) => void;
  onRequestQuote: (safariName: string) => void;
}

export const SafarisPage: React.FC<SafarisPageProps> = ({
  onSelectSafari,
  onRequestQuote
}) => {
  const { safaris } = useCms();
  const [filter, setFilter] = useState<string>("All");

  const filterOptions = [
    "All",
    "Gorilla Safaris",
    "East Africa Expeditions",
    "Savannah Wildlife",
    "Flagship Safaris"
  ];

  const filteredSafaris = safaris.filter((s) => {
    if (filter === "All") return true;
    if (filter === "Gorilla Safaris")
      return s.title.toLowerCase().includes("gorilla") || s.highlights.some((h) => h.toLowerCase().includes("gorilla"));
    if (filter === "East Africa Expeditions")
      return (
        s.destinationsFormatted.toLowerCase().includes("kenya") ||
        s.destinationsFormatted.toLowerCase().includes("tanzania") ||
        s.destinationsFormatted.toLowerCase().includes("east africa") ||
        s.durationDays >= 10
      );
    if (filter === "Savannah Wildlife")
      return s.highlights.some((h) => h.toLowerCase().includes("savannah") || h.toLowerCase().includes("game"));
    if (filter === "Flagship Safaris") return s.isFlagship || s.durationDays >= 10;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#171A17] text-[#F7F4EC] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-[#D99A00]" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#F4B41A]">
              Bespoke African Expeditions
            </span>
            <span className="h-px w-6 bg-[#D99A00]" />
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-[#F7F4EC] leading-tight mb-3">
            Our Signature Safari Collection
          </h1>
          <p className="text-xs sm:text-sm text-[#F7F4EC]/75 font-light leading-relaxed">
            From intimate mountain gorilla trekking encounters in Bwindi to cross-border Serengeti and Masai Mara migrations. Every itinerary is fully customizable.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterOptions.map((opt) => {
            const isActive = filter === opt;
            return (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase border transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#073F27] border-[#F4B41A] text-[#F4B41A] shadow-md"
                    : "bg-[#101210] border-[#D99A00]/25 text-[#F7F4EC]/70 hover:border-[#D99A00]/60 hover:text-[#F7F4EC]"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Safaris Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSafaris.map((pkg, idx) => {
            const isFlagship = pkg.isFlagship || pkg.durationDays >= 14;
            const animDir = idx % 2 === 0 ? "animate-slide-left" : "animate-slide-right";

            return (
              <div
                key={pkg.id}
                className={`group flex flex-col justify-between bg-[#101210] border transition-all duration-300 ${animDir} ${
                  isFlagship
                    ? "border-[#F4B41A] shadow-2xl relative"
                    : "border-[#D99A00]/30 hover:border-[#D99A00]"
                }`}
              >
                {isFlagship && (
                  <div className="absolute top-0 right-0 bg-[#D99A00] text-[#073F27] text-[10px] font-bold tracking-widest uppercase px-3 py-1 z-10">
                    Flagship Expedition
                  </div>
                )}

                <div>
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101210] via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <span className="bg-[#073F27]/90 px-2.5 py-1 text-[#F4B41A] font-semibold text-xs border border-[#D99A00]/40 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {pkg.duration}
                      </span>
                      <span className="bg-[#101210]/95 px-2.5 py-1 text-[#F7F4EC] font-bold text-xs border border-[#D99A00]/40 font-mono">
                        {pkg.formattedPriceUGX || `UGX ${pkg.priceUGX.toLocaleString()}`}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#D99A00]">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{pkg.destinationsFormatted}</span>
                    </div>

                    <h3 className="font-editorial text-2xl font-bold text-[#F7F4EC] leading-snug group-hover:text-[#F4B41A] transition-colors">
                      {pkg.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#F7F4EC]/75 font-light line-clamp-3">
                      {pkg.overview}
                    </p>

                    <div className="pt-2 border-t border-[#D99A00]/15">
                      <span className="text-[10px] tracking-wider font-semibold uppercase text-[#D99A00] block mb-1.5">
                        Key Experiences
                      </span>
                      <ul className="space-y-1 text-xs text-[#F7F4EC]/70">
                        {pkg.highlights.slice(0, 3).map((hl, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#F4B41A]">•</span>
                            <span className="line-clamp-1">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#D99A00]/20 flex items-center gap-3">
                  <button
                    onClick={() => onSelectSafari(pkg)}
                    className="btn-glass-forest flex-1 text-xs py-3 px-4"
                  >
                    <span>View Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F4B41A]" />
                  </button>

                  <button
                    onClick={() => onRequestQuote(pkg.title)}
                    className="btn-glass-gold text-xs py-3 px-5"
                  >
                    Quote
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
