import React, { useState } from "react";
import { HeroSlideshow } from "../components/HeroSlideshow";
import { TopReviewsSection } from "../components/TopReviewsSection";
import { SafariShopSection } from "../components/SafariShopSection";
import { InteractiveUgandaMap } from "../components/InteractiveUgandaMap";
import { CustomSafariBuilder } from "../components/CustomSafariBuilder";
import { TikTokSection } from "../components/TikTokSection";
import { useCms } from "../context/CmsContext";
import { SafariPackage } from "../data/safarisData";
import {
  Compass,
  ArrowRight,
  Clock,
  MapPin,
  Play,
  Check,
  Globe2,
  Sparkles,
  Quote,
  MessageCircle,
  Eye,
  Camera,
  Video
} from "lucide-react";

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectSafari: (safari: SafariPackage) => void;
  onRequestQuote: (name: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectSafari,
  onRequestQuote
}) => {
  const { brandSettings, safaris, gallery } = useCms();
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const signatureSafaris = safaris.slice(0, 6);
  const videoItems = gallery.filter((m) => m.type === "video");
  const mainVideo = videoItems[0] || {
    id: "def-v",
    title: "The Spirit of East African Wildlife",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
    caption: "Experience elephants, big cats and the endless plains of Uganda and East Africa."
  };

  const handleOpenWhatsApp = () => {
    window.open(`https://wa.me/${brandSettings.whatsapp.replace(/[^0-9]/g, "")}`, "_blank");
  };

  return (
    <div className="w-full">
      {/* 1. Constantly Changing Dynamic Hero Slideshow with Quick Search Filter Bar (User Request) */}
      <HeroSlideshow
        onExploreClick={() => onNavigate("safaris")}
        onPlanClick={(params) => {
          onNavigate("plan");
        }}
        onWhatsAppClick={handleOpenWhatsApp}
      />

      {/* 2. Editorial Introduction with Fancy Animations */}
      <section className="py-24 bg-[#101210] border-b border-[#D99A00]/20 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 animate-slide-left">
              <div className="inline-flex items-center gap-2">
                <span className="h-px w-6 bg-[#D99A00]" />
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#F4B41A]">
                  The Journey Begins Here
                </span>
              </div>

              <h2 className="font-editorial text-3xl sm:text-5xl font-normal text-[#F7F4EC] leading-tight text-balance">
                Uganda & East Africa: Where extraordinary landscapes meet ancient wildlife.
              </h2>

              <p className="text-sm sm:text-base text-[#F7F4EC]/85 font-light leading-relaxed">
                At Sonnenpfad Safaris Uganda Ltd, we create carefully planned journeys that bring travellers closer to the heart of the Pearl of Africa and the legendary savannahs of East Africa. From encounters with mountain gorillas in mist-covered forests to the Great Migration across open plains and boat journeys along the Nile, every safari is designed around discovery, comfort and meaningful experiences.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#D99A00]">
                <span>• Uganda Mountain Gorillas</span>
                <span>• Serengeti & Masai Mara</span>
                <span>• Kazinga & Nile Cruises</span>
                <span>• Private 4x4 Land Cruisers</span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate("about")}
                  className="btn-glass-forest"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4 text-[#F4B41A]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative animate-slide-right">
              <div className="relative h-[460px] w-full overflow-hidden rounded-3xl border-2 border-[#D99A00]/40 shadow-2xl">
                <img
                  src={brandSettings.introImage}
                  alt="Mountain Gorilla & Savannah Landscape"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101210] via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#073F27]/95 backdrop-blur-md rounded-2xl border border-[#D99A00]/40 shadow-xl">
                  <span className="text-xs uppercase font-bold tracking-wider text-[#F4B41A] block mb-1">
                    Bwindi & East African Corridors
                  </span>
                  <p className="text-xs text-[#F7F4EC]/90 font-light">
                    Home to more than half of the world's mountain gorillas, connecting seamlessly to Kenya and Tanzania.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Video Reel Spotlight */}
      <section className="py-20 bg-[#073F27] relative overflow-hidden border-b border-[#D99A00]/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4 animate-slide-left">
              <div className="inline-flex items-center gap-2">
                <Video className="w-4 h-4 text-[#F4B41A]" />
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#F4B41A]">
                  Field Video Spotlight
                </span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#F7F4EC] leading-tight">
                Feel the Pulse of East Africa
              </h2>
              <p className="text-xs sm:text-sm text-[#F7F4EC]/85 font-light leading-relaxed">
                Watch our latest safari footage from the African bush: thunderous falls, tree-climbing lions, and intimate gorilla family moments.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate("gallery")}
                  className="btn-glass-gold"
                >
                  <Eye className="w-4 h-4 text-[#073F27]" />
                  <span>Explore All Videos & Photos</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 animate-slide-right">
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl border-2 border-[#D99A00] bg-black shadow-2xl">
                {playingVideo ? (
                  <video
                    src={playingVideo}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div
                    className="relative w-full h-full cursor-pointer group"
                    onClick={() => setPlayingVideo(mainVideo.mediaUrl)}
                  >
                    <img
                      src={mainVideo.thumbnailUrl || mainVideo.mediaUrl}
                      alt={mainVideo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-[#073F27]/95 text-[#F4B41A] border-2 border-[#D99A00] flex items-center justify-center group-hover:scale-115 transition-transform shadow-2xl">
                        <Play className="w-8 h-8 fill-current ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-[#D99A00]/30 text-xs text-[#F7F4EC]">
                      <span className="font-bold text-[#F4B41A] block text-sm">{mainVideo.title}</span>
                      <span className="text-[#F7F4EC]/75 font-light">{mainVideo.caption}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Signature Safaris Grid */}
      <section className="py-24 bg-[#171A17] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="h-px w-6 bg-[#D99A00]" />
                <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#F4B41A]">
                  Signature Journeys
                </span>
              </div>
              <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#F7F4EC]">
                Choose Your Path Through East Africa
              </h2>
            </div>

            <button
              onClick={() => onNavigate("safaris")}
              className="btn-glass-forest text-xs py-2.5 px-6"
            >
              <span>View All Safaris</span>
              <ArrowRight className="w-4 h-4 text-[#F4B41A]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signatureSafaris.map((pkg) => (
              <div
                key={pkg.id}
                className="group flex flex-col justify-between bg-[#101210] border border-[#D99A00]/30 rounded-3xl overflow-hidden hover:border-[#F4B41A] transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101210] via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                      <span className="bg-[#073F27]/95 px-3 py-1 text-[#F4B41A] font-bold text-xs rounded-full border border-[#D99A00]/40 flex items-center gap-1.5 shadow-md">
                        <Clock className="w-3.5 h-3.5" />
                        {pkg.duration}
                      </span>
                      <span className="bg-[#101210]/95 px-3 py-1 text-[#F7F4EC] font-bold text-xs rounded-full border border-[#D99A00]/40 font-mono shadow-md">
                        {pkg.formattedPriceUGX || (pkg.priceUGX ? `UGX ${pkg.priceUGX.toLocaleString()}` : "UGX Price on Request")}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#D99A00] font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{pkg.destinationsFormatted}</span>
                    </div>

                    <h3 className="font-editorial text-2xl font-bold text-[#F7F4EC] leading-snug group-hover:text-[#F4B41A] transition-colors">
                      {pkg.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#F7F4EC]/75 font-light line-clamp-3">
                      {pkg.overview}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#D99A00]/15 flex items-center gap-3">
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
            ))}
          </div>
        </div>
      </section>

      {/* 5. TOP REVIEWS & SCORE BREAKDOWN (Template Image 8 Match) */}
      <TopReviewsSection />

      {/* 6. SAFARI & TREKKING GEAR ESSENTIALS SHOP (Template Images 1, 2, 6 Match) */}
      <SafariShopSection />

      {/* 7. East Africa Callout Banner */}
      <section className="py-20 bg-[#101210] border-y border-[#D99A00]/25">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#073F27] via-[#042617] to-[#101210] border-2 border-[#D99A00]/50 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#F4B41A] flex items-center gap-2">
                <Globe2 className="w-4 h-4" />
                <span>Broadening Horizons</span>
              </span>
              <h3 className="font-editorial text-3xl sm:text-4xl font-bold text-[#F7F4EC]">
                Explore Beyond Uganda: Kenya, Tanzania & Rwanda
              </h3>
              <p className="text-xs sm:text-sm text-[#F7F4EC]/80 font-light leading-relaxed">
                Connect the mountain gorillas of Bwindi with the Great Migration of the Masai Mara and the endless plains of the Serengeti on an exclusive private charter.
              </p>
            </div>

            <button
              onClick={() => onNavigate("east-africa")}
              className="btn-glass-gold text-xs py-4 px-8 whitespace-nowrap shrink-0"
            >
              <span>Explore East Africa Safaris</span>
              <ArrowRight className="w-4 h-4 text-[#073F27]" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. Interactive Stylized Map */}
      <section className="py-24 bg-[#101210]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#F4B41A] block mb-2">
              Explore Destinations
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#F7F4EC]">
              Interactive Safari Map
            </h2>
          </div>

          <InteractiveUgandaMap onRequestQuote={(name) => onRequestQuote(name)} />
        </div>
      </section>

      {/* 9. Custom Safari Builder */}
      <section className="py-24 bg-[#171A17] border-t border-[#D99A00]/25">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#F4B41A] block mb-2">
              Design Your Journey
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#F7F4EC]">
              Bespoke Safari Planner
            </h2>
          </div>

          <CustomSafariBuilder />
        </div>
      </section>

      {/* 10. Full-Screen Sunset CTA with Glass Rounded Buttons */}
      <section className="relative py-32 bg-[#171A17] text-[#F7F4EC] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-zoom-bg"
          style={{ backgroundImage: `url('${brandSettings.sunsetBgImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171A17] via-[#073F27]/85 to-black/75" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-6">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-[#F4B41A] block">
            Begin Your African Story
          </span>
          <h2 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold text-[#F7F4EC] leading-tight">
            Your African Story Starts Here.
          </h2>
          <p className="text-base sm:text-lg text-[#F7F4EC]/90 font-light max-w-2xl mx-auto">
            Tell us where you want to go, what you want to experience and how long you have. We'll help you begin planning your journey across East Africa.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate("plan")}
              className="btn-glass-gold py-4 px-9"
            >
              <span>Plan My Safari</span>
              <ArrowRight className="w-4 h-4 text-[#073F27]" />
            </button>
            <button
              onClick={handleOpenWhatsApp}
              className="btn-glass-whatsapp py-4 px-9"
            >
              <MessageCircle className="w-4 h-4 text-[#042617]" />
              <span>WhatsApp: {brandSettings.whatsapp}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 11. TikTok Section */}
      <TikTokSection />
    </div>
  );
};
