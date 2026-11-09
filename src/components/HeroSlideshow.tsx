import React, { useState, useEffect } from "react";
import { useCms } from "../context/CmsContext";
import {
  Compass,
  MapPin,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Search,
  MessageCircle,
  ShieldCheck,
  ArrowRight
} from "lucide-react";

interface HeroSlideshowProps {
  onExploreClick: () => void;
  onPlanClick: (searchParams?: { where?: string; when?: string; type?: string }) => void;
  onWhatsAppClick: () => void;
}

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({
  onExploreClick,
  onPlanClick,
  onWhatsAppClick
}) => {
  const { brandSettings, heroSlides } = useCms();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchWhere, setSearchWhere] = useState("Uganda & East Africa");
  const [searchWhen, setSearchWhen] = useState("Flexible / Any Season");
  const [searchType, setSearchType] = useState("Gorilla Trekking & Big 5");

  // Constantly cycle background slides automatically every 5 seconds (User Request)
  useEffect(() => {
    if (!heroSlides || heroSlides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides]);

  const slideCaptions = [
    {
      script: "adventurous",
      title: "Discover Uganda & East Africa",
      subtitle: "Journey toward discovery with Sonnenpfad Safaris across ancient rainforests and endless golden savannahs."
    },
    {
      script: "pristine wilderness",
      title: "Face-to-Face with Mountain Gorillas",
      subtitle: "Trek the emerald rainforest of Bwindi Impenetrable National Park, sanctuary to half the world's gentle giants."
    },
    {
      script: "great migration",
      title: "Serengeti & Masai Mara Wildlife",
      subtitle: "Witness over a million wildebeest, zebras, and apex predators across East Africa's legendary plains."
    },
    {
      script: "the pearl of africa",
      title: "Murchison Falls & The Mighty Nile",
      subtitle: "Experience the world's most powerful water surge where the Victoria Nile violently thunders through the gorge."
    },
    {
      script: "authentic discovery",
      title: "Follow the Sun Path to Adventure",
      subtitle: "Bespoke private 4x4 expeditions guided by expert safari naturalists with luxury tented camps under African skies."
    }
  ];

  const caption = slideCaptions[currentSlide % slideCaptions.length];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlanClick({ where: searchWhere, when: searchWhen, type: searchType });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-16 overflow-hidden">
      {/* 1. Constantly Changing Multi-Image Backgrounds with Cross-fade & Ken Burns Zoom */}
      <div className="absolute inset-0 z-0 bg-[#101210]">
        {heroSlides.map((slideUrl, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={idx}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
                isActive
                  ? "opacity-100 scale-105 z-10 animate-zoom-bg"
                  : "opacity-0 scale-100 z-0 pointer-events-none"
              }`}
              style={{
                backgroundImage: `url('${slideUrl}')`,
                transitionProperty: "opacity, transform"
              }}
            />
          );
        })}

        {/* Multi-tier Luxury Dark Glass Gradient Scrims for Perfect Text Readability */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#171A17] via-black/55 to-black/75" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#042617]/70 via-black/40 to-black/65" />
      </div>

      {/* 2. Slide Navigation Arrows (Wanderers Template Inspired) */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-[#073F27]/90 text-[#F7F4EC] hover:text-[#F4B41A] border border-white/20 hover:border-[#D99A00] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-xl hidden sm:flex group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-[#073F27]/90 text-[#F7F4EC] hover:text-[#F4B41A] border border-white/20 hover:border-[#D99A00] backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-xl hidden sm:flex group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* 3. Hero Content Center (Template Typography Match) */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center space-y-6 my-auto">
        {/* Yellow Script Accent ("adventurous", matching Wanderers template attachment) */}
        <div className="inline-block animate-slide-down">
          <span className="font-script text-3xl sm:text-4xl md:text-5xl text-[#F4B41A] tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] block -rotate-2">
            {caption.script}
          </span>
        </div>

        {/* Main Bold Serif Editorial Title */}
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F7F4EC] tracking-tight leading-[1.05] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] animate-slide-up text-balance">
          {caption.title}
        </h1>

        {/* Subtitle Description */}
        <p className="text-sm sm:text-lg text-[#F7F4EC]/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md animate-slide-up">
          {caption.subtitle}
        </p>

        {/* Thick Round Glass Action Buttons (User Request) */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 animate-slide-up">
          <button
            onClick={onExploreClick}
            className="btn-glass-gold group"
          >
            <Compass className="w-4 h-4 text-[#073F27] group-hover:rotate-45 transition-transform" />
            <span>Explore Safaris</span>
            <ArrowRight className="w-4 h-4 text-[#073F27] group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onPlanClick()}
            className="btn-glass-forest"
          >
            <Sparkles className="w-4 h-4 text-[#F4B41A]" />
            <span>Design Custom Safari</span>
          </button>

          <button
            onClick={onWhatsAppClick}
            className="btn-glass-whatsapp"
          >
            <MessageCircle className="w-4 h-4 text-[#042617]" />
            <span>WhatsApp Us</span>
          </button>
        </div>

        {/* Slide Counter Dots */}
        <div className="pt-2 flex items-center justify-center gap-2">
          {heroSlides.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => setCurrentSlide(dotIdx)}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                dotIdx === currentSlide
                  ? "w-8 bg-[#F4B41A] shadow-[0_0_10px_#F4B41A]"
                  : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 4. FLOATING QUICK SEARCH FILTER BAR (Wanderers Template Image 7 Match) */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 w-full mt-10">
        <div className="bg-[#101210]/90 backdrop-blur-xl border-2 border-[#D99A00]/40 rounded-2xl p-3 sm:p-4 shadow-[0_12px_40px_rgba(0,0,0,0.7)] animate-slide-up">
          <form
            onSubmit={handleSearchSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center"
          >
            {/* Field 1: WHERE TO? */}
            <div className="bg-[#171A17]/80 rounded-xl px-4 py-2.5 border border-white/10 hover:border-[#D99A00]/50 transition-colors">
              <label className="text-[10px] font-bold tracking-widest text-[#F4B41A] uppercase flex items-center gap-1.5 mb-0.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Where To?</span>
              </label>
              <select
                value={searchWhere}
                onChange={(e) => setSearchWhere(e.target.value)}
                className="w-full bg-transparent text-xs text-[#F7F4EC] font-medium focus:outline-none cursor-pointer"
              >
                <option value="Uganda & East Africa" className="bg-[#171A17] text-[#F7F4EC]">
                  Uganda & East Africa (All)
                </option>
                <option value="Bwindi Gorilla Forest" className="bg-[#171A17] text-[#F7F4EC]">
                  Bwindi Impenetrable (Gorillas)
                </option>
                <option value="Serengeti & Masai Mara" className="bg-[#171A17] text-[#F7F4EC]">
                  Serengeti & Masai Mara (Migration)
                </option>
                <option value="Queen Elizabeth & Kibale" className="bg-[#171A17] text-[#F7F4EC]">
                  Queen Elizabeth & Kibale Primates
                </option>
                <option value="Murchison Falls on Nile" className="bg-[#171A17] text-[#F7F4EC]">
                  Murchison Falls & River Nile
                </option>
                <option value="Rwanda Volcanoes" className="bg-[#171A17] text-[#F7F4EC]">
                  Rwanda Volcanoes & Lake Kivu
                </option>
              </select>
            </div>

            {/* Field 2: WHEN? */}
            <div className="bg-[#171A17]/80 rounded-xl px-4 py-2.5 border border-white/10 hover:border-[#D99A00]/50 transition-colors">
              <label className="text-[10px] font-bold tracking-widest text-[#F4B41A] uppercase flex items-center gap-1.5 mb-0.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>When?</span>
              </label>
              <select
                value={searchWhen}
                onChange={(e) => setSearchWhen(e.target.value)}
                className="w-full bg-transparent text-xs text-[#F7F4EC] font-medium focus:outline-none cursor-pointer"
              >
                <option value="Flexible / Any Season" className="bg-[#171A17] text-[#F7F4EC]">
                  Flexible / Any Season
                </option>
                <option value="June - September (High Season / Migration)" className="bg-[#171A17] text-[#F7F4EC]">
                  June – Sept (Migration & Primates)
                </option>
                <option value="December - February (Dry Season)" className="bg-[#171A17] text-[#F7F4EC]">
                  Dec – Feb (Optimal Big 5 Game)
                </option>
                <option value="March - May (Emerald / Birding Season)" className="bg-[#171A17] text-[#F7F4EC]">
                  March – May (Emerald Birding)
                </option>
                <option value="October - November (Short Rains)" className="bg-[#171A17] text-[#F7F4EC]">
                  Oct – Nov (Lush Landscapes)
                </option>
              </select>
            </div>

            {/* Field 3: TRAVEL TYPE */}
            <div className="bg-[#171A17]/80 rounded-xl px-4 py-2.5 border border-white/10 hover:border-[#D99A00]/50 transition-colors">
              <label className="text-[10px] font-bold tracking-widest text-[#F4B41A] uppercase flex items-center gap-1.5 mb-0.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Travel Type</span>
              </label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full bg-transparent text-xs text-[#F7F4EC] font-medium focus:outline-none cursor-pointer"
              >
                <option value="Gorilla Trekking & Big 5" className="bg-[#171A17] text-[#F7F4EC]">
                  Gorillas & Big 5 Wildlife
                </option>
                <option value="Cross-Border East Africa Circuit" className="bg-[#171A17] text-[#F7F4EC]">
                  Uganda + Kenya/Tanzania Cross-Border
                </option>
                <option value="Luxury Private Honeymoon" className="bg-[#171A17] text-[#F7F4EC]">
                  Luxury Private / Honeymoon
                </option>
                <option value="Family Safari" className="bg-[#171A17] text-[#F7F4EC]">
                  Family Safari Expedition
                </option>
                <option value="Photography & Birding" className="bg-[#171A17] text-[#F7F4EC]">
                  Photography & Birding Master
                </option>
              </select>
            </div>

            {/* Field 4: FIND NOW BUTTON (Yellow thick glass, Wanderers Match) */}
            <div>
              <button
                type="submit"
                className="w-full h-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#F4B41A] to-[#D99A00] hover:from-[#FFC024] hover:to-[#E5A500] text-[#073F27] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_4px_20px_rgba(244,180,26,0.4)] hover:shadow-[0_6px_25px_rgba(244,180,26,0.6)] cursor-pointer hover:scale-[1.02] active:scale-[0.98] border border-white/60"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>Find Now</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
