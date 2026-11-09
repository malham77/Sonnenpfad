import React, { useState } from "react";
import { DESTINATIONS, Destination } from "../data/destinationsData";
import { InteractiveUgandaMap } from "../components/InteractiveUgandaMap";
import { MapPin, ArrowRight, Compass, Sparkles, Check } from "lucide-react";

interface DestinationsPageProps {
  onRequestQuote: (destName: string) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ onRequestQuote }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  const regions = ["All", "Southwestern Uganda", "Western Uganda", "Northwestern Uganda", "Northeastern Uganda", "Southern Uganda", "Eastern Uganda"];

  const filteredDestinations = DESTINATIONS.filter((d) => {
    if (selectedRegion === "All") return true;
    return d.region.toLowerCase().includes(selectedRegion.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#171A17] text-[#F7F4EC] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-[#D99A00]" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#F4B41A]">
              Explore Uganda & East Africa
            </span>
            <span className="h-px w-6 bg-[#D99A00]" />
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-[#F7F4EC] leading-tight mb-3">
            Legendary National Parks & Wild Landscapes
          </h1>
          <p className="text-xs sm:text-sm text-[#F7F4EC]/75 font-light leading-relaxed">
            From the afro-montane rainforest of Bwindi to the thundering River Nile at Murchison Falls and the remote wilderness of Kidepo Valley.
          </p>
        </div>

        {/* Interactive Map View */}
        <div className="mb-16">
          <InteractiveUgandaMap onRequestQuote={onRequestQuote} />
        </div>

        {/* Region Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase border transition-all cursor-pointer ${
                selectedRegion === reg
                  ? "bg-[#073F27] border-[#F4B41A] text-[#F4B41A] shadow-md"
                  : "bg-[#101210] border-[#D99A00]/25 text-[#F7F4EC]/70 hover:border-[#D99A00]/60 hover:text-[#F7F4EC]"
              }`}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* Destinations Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((dest, idx) => {
            const anim = idx % 2 === 0 ? "animate-slide-left" : "animate-slide-right";
            return (
              <div
                key={dest.id}
                className={`bg-[#101210] border border-[#D99A00]/30 overflow-hidden flex flex-col justify-between hover:border-[#D99A00] transition-colors ${anim}`}
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101210] via-black/20 to-transparent" />
                    <div className="absolute top-3 right-3 bg-[#073F27]/90 text-[#F4B41A] text-[10px] font-bold px-2 py-0.5 border border-[#D99A00]/40">
                      {dest.region}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <span className="text-xs italic text-[#F4B41A]">"{dest.tagline}"</span>
                    <h3 className="font-editorial text-2xl font-bold text-[#F7F4EC]">
                      {dest.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F7F4EC]/75 font-light leading-relaxed">
                      {dest.description}
                    </p>

                    <div className="pt-2 border-t border-[#D99A00]/15">
                      <span className="text-[10px] font-semibold text-[#D99A00] uppercase tracking-wider block mb-1">
                        Best For:
                      </span>
                      <div className="flex flex-wrap gap-1.5 text-xs text-[#F7F4EC]/80">
                        {dest.bestFor.map((bf) => (
                          <span key={bf} className="bg-[#171A17] px-2 py-0.5 border border-[#D99A00]/20 text-[11px]">
                            {bf}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#D99A00]/20">
                  <button
                    onClick={() => onRequestQuote(dest.name)}
                    className="w-full py-3 bg-[#073F27] hover:bg-[#0a4d30] text-[#F7F4EC] text-xs font-semibold uppercase tracking-wider border border-[#D99A00]/50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Safari for {dest.name.replace(" National Park", "")}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F4B41A]" />
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
