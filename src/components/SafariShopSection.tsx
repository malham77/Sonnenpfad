import React, { useState } from "react";
import { useCms, CoffeeProduct, formatUGX } from "../context/CmsContext";
import {
  Coffee,
  Star,
  Search,
  Filter,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Flame,
  ShoppingBag
} from "lucide-react";

interface SafariShopSectionProps {
  onInquireProduct?: (productName: string) => void;
}

export const SafariShopSection: React.FC<SafariShopSectionProps> = () => {
  const { coffeeProducts, openCoffeeOrderModal, brandSettings } = useCms();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState<number>(200000);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Single Origin", "Espresso Roast", "Coffee Blends", "Accessories", "Skincare"];

  const filteredProducts = coffeeProducts.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.flavorNotes.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <section className="relative py-24 bg-[#171A17] text-[#F7F4EC] overflow-hidden border-b border-[#D99A00]/25">
      {/* 1. Organic Wavy Divider */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 text-[#101210] fill-current"
        >
          <path d="M0,0 C150,90 350,-40 500,60 C650,140 900,10 1200,40 L1200,0 L0,0 Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        {/* Section Header with Script Accent */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-script text-3xl sm:text-4xl text-[#F4B41A] block mb-1">
            Grown on volcanic slopes & misted peaks
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#F7F4EC] leading-tight">
            Uganda & East Africa Specialty Coffee (UGX)
          </h2>
          <p className="text-xs sm:text-sm text-[#F7F4EC]/80 font-light mt-2 max-w-2xl mx-auto">
            From the high-altitude volcanic soils of Mount Elgon and the glacier-fed Rwenzori Mountains to shade-grown Bwindi Gorilla buffer farms — freshly micro-roasted coffee beans, handcrafted tampers and organic coffee skincare, priced transparently in Ugandan Shillings (UGX).
          </p>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-[#101210] border border-[#D99A00]/30 rounded-3xl p-5 sm:p-6 mb-12 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Search Input with Gold Icon */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search coffee (Bugisu, Rwenzori, Espresso, Scrub...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#171A17] border border-[#D99A00]/40 rounded-full px-5 py-3 text-xs text-[#F7F4EC] placeholder-[#F7F4EC]/40 focus:outline-none focus:border-[#F4B41A]"
              />
              <button
                aria-label="Search coffee products"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-[#F4B41A] hover:bg-[#D99A00] text-[#073F27] rounded-full flex items-center justify-center transition-colors cursor-pointer font-bold"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#073F27] text-[#F4B41A] border-2 border-[#F4B41A] shadow-md"
                      : "bg-[#171A17] text-[#F7F4EC]/70 border border-white/10 hover:border-[#D99A00]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Price Filter Slider (in UGX) */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#D99A00] font-semibold whitespace-nowrap">
                Max: {formatUGX(maxPrice)}
              </span>
              <input
                type="range"
                min="40000"
                max="200000"
                step="5000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-28 sm:w-36 accent-[#F4B41A] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Product Cards Grid with UGX Prices */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-[#101210] border border-[#D99A00]/30 rounded-3xl overflow-hidden flex flex-col justify-between hover:border-[#F4B41A] transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Product Image Box */}
                <div className="relative h-60 w-full bg-black/70 overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
                  />

                  {/* Sale Badge */}
                  {product.isSale && (
                    <div className="absolute top-3 left-3 bg-[#F4B41A] text-[#073F27] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                      Special Reserve
                    </div>
                  )}

                  {/* Roast Level Pill */}
                  <div className="absolute bottom-3 left-3 bg-[#073F27]/90 text-[#F4B41A] text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border border-[#D99A00]/40 flex items-center gap-1">
                    <Flame className="w-2.5 h-2.5 text-[#F4B41A]" />
                    <span>{product.roastLevel}</span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-5 space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D99A00] block">
                    {product.category} · {product.weight}
                  </span>

                  <h3 className="font-editorial text-xl font-bold text-[#F7F4EC] group-hover:text-[#F4B41A] transition-colors leading-snug">
                    {product.name}
                  </h3>

                  <p className="text-[11px] text-[#F7F4EC]/65 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#D99A00] shrink-0" />
                    <span className="truncate">{product.origin}</span>
                  </p>

                  {/* Flavor Notes Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {product.flavorNotes.slice(0, 3).map((note, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/70"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Rating Stars (Gold Stars) */}
                  <div className="flex items-center gap-1.5 pt-1">
                    <div className="flex text-[#F4B41A]">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#F7F4EC]/60 font-mono">
                      ({product.reviewsCount} reviews)
                    </span>
                  </div>

                  {/* Price in UGX */}
                  <div className="pt-2 flex items-baseline gap-2 font-mono">
                    <span className="text-xl font-bold text-[#F4B41A]">
                      {formatUGX(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#F7F4EC]/50 line-through">
                        {formatUGX(product.originalPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Button: 3D Vision Liquid Frosted Glass Pill */}
              <div className="p-5 pt-0 border-t border-[#D99A00]/15">
                <button
                  onClick={() => openCoffeeOrderModal(product)}
                  className="w-full btn-glass-whatsapp py-2.5 px-4 text-xs shadow-lg"
                  title="Place Order in UGX & Send to WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-[#042617]" />
                  <span>Order via WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-12 text-center bg-[#101210] border border-[#D99A00]/30 rounded-3xl">
            <Coffee className="w-12 h-12 text-[#D99A00]/50 mx-auto mb-3" />
            <h4 className="font-editorial text-xl font-bold text-[#F7F4EC]">
              No Coffee Products Matching Your Search
            </h4>
            <p className="text-xs text-[#F7F4EC]/70 mt-1">
              Try adjusting your search keywords or price slider.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
