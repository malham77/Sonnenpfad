import React from "react";
import { SafariShopSection } from "../components/SafariShopSection";
import { Coffee, ShieldCheck, Truck, Sparkles, HeartHandshake, Award } from "lucide-react";
import { useCms } from "../context/CmsContext";

export const ShopPage: React.FC = () => {
  const { brandSettings } = useCms();

  return (
    <div className="min-h-screen bg-[#171A17] text-[#F7F4EC] pt-28 pb-20">
      {/* Top Banner Header (Template Image 1 & 2 Match) */}
      <div className="relative py-20 bg-[#101210] border-b border-[#D99A00]/25 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 animate-zoom-bg"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=2400&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#101210] via-black/70 to-black/85" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D99A00]/20 border border-[#D99A00]/40">
            <Coffee className="w-4 h-4 text-[#F4B41A]" />
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#F4B41A]">
              Sonnenpfad Coffee Roastery
            </span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-[#F7F4EC]">
            Uganda & East Africa Coffee Shop
          </h1>

          <p className="text-xs sm:text-base text-[#F7F4EC]/80 font-light max-w-2xl mx-auto leading-relaxed">
            Discover freshly micro-roasted single-origin Arabica from Mount Elgon, glacial mist espresso from the Rwenzori Mountains, shade-grown Bwindi Gorilla conservation beans, artisanal olive wood barista tools, and organic coffee skincare.
          </p>
        </div>
      </div>

      {/* Feature Benefit Bar */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-[#101210] border border-[#D99A00]/25 rounded-3xl flex items-center gap-3.5 shadow-lg">
          <Award className="w-8 h-8 text-[#F4B41A] shrink-0" />
          <div>
            <h4 className="text-xs font-bold uppercase text-[#F7F4EC]">High-Altitude Volcanic Soil</h4>
            <p className="text-[11px] text-[#F7F4EC]/70">Farmed above 1,800m for vibrant floral notes & sweet crema</p>
          </div>
        </div>

        <div className="p-5 bg-[#101210] border border-[#D99A00]/25 rounded-3xl flex items-center gap-3.5 shadow-lg">
          <HeartHandshake className="w-8 h-8 text-[#25D366] shrink-0" />
          <div>
            <h4 className="text-xs font-bold uppercase text-[#F7F4EC]">Fair Direct Trade & Conservation</h4>
            <p className="text-[11px] text-[#F7F4EC]/70">Directly funds mountain gorilla habitat & local coffee farmers</p>
          </div>
        </div>

        <div className="p-5 bg-[#101210] border border-[#D99A00]/25 rounded-3xl flex items-center gap-3.5 shadow-lg">
          <Truck className="w-8 h-8 text-[#D99A00] shrink-0" />
          <div>
            <h4 className="text-xs font-bold uppercase text-[#F7F4EC]">Lodge Delivery & Global Export</h4>
            <p className="text-[11px] text-[#F7F4EC]/70">Delivered directly to your safari hotel or shipped internationally</p>
          </div>
        </div>
      </div>

      {/* Coffee Shop Section */}
      <SafariShopSection />
    </div>
  );
};
