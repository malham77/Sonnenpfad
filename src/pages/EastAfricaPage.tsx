import React from "react";
import { useCms } from "../context/CmsContext";
import { SafariPackage } from "../data/safarisData";
import {
  Compass,
  ArrowRight,
  Globe2,
  MapPin,
  Clock,
  Check,
  ShieldCheck,
  Plane,
  Sparkles,
  MessageCircle
} from "lucide-react";

interface EastAfricaPageProps {
  onSelectSafari: (safari: SafariPackage) => void;
  onRequestQuote: (name: string) => void;
}

export const EastAfricaPage: React.FC<EastAfricaPageProps> = ({
  onSelectSafari,
  onRequestQuote
}) => {
  const { safaris, brandSettings } = useCms();

  const eastAfricaSafaris = safaris.filter(
    (s) =>
      s.destinationsFormatted.toLowerCase().includes("east africa") ||
      s.destinationsFormatted.toLowerCase().includes("tanzania") ||
      s.destinationsFormatted.toLowerCase().includes("kenya") ||
      s.durationDays >= 8
  );

  const countries = [
    {
      country: "Uganda",
      title: "The Primate & Water Sanctuary",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      description:
        "Over half of the world's mountain gorillas, Africa's highest chimpanzee density in Kibale, the thunderous Murchison Falls on the Nile, and the snow-capped Rwenzori Mountains.",
      highlights: ["Mountain Gorilla Trekking", "Chimpanzees in Kibale", "Murchison Falls", "Tree-Climbing Lions"]
    },
    {
      country: "Kenya",
      title: "The Great Savannah Theater",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
      description:
        "Home of the classic African safari. Witness the Great Wildebeest Migration across the Masai Mara, elephant herds framed against Mount Kilimanjaro in Amboseli, and rich Maasai traditions.",
      highlights: ["Masai Mara Migration", "Amboseli Kilimanjaro Views", "Big Cat Densities", "Maasai Cultural Trails"]
    },
    {
      country: "Tanzania",
      title: "The Endless Plains & Volcanic Calderas",
      image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
      description:
        "The Serengeti's boundless horizons, the dramatic Ngorongoro Crater teeming with 30,000 animals inside a collapsed volcanic bowl, and the turquoise waters of the Zanzibar Archipelago.",
      highlights: ["Serengeti National Park", "Ngorongoro Crater Caldera", "Tarangire Elephants", "Zanzibar Island Extension"]
    },
    {
      country: "Rwanda",
      title: "Land of a Thousand Hills",
      image: "https://images.unsplash.com/photo-1544911845-1a7c6b8f4b1e?auto=format&fit=crop&w=1200&q=80",
      description:
        "The misty bamboo slopes of Volcanoes National Park, where Dian Fossey pioneered mountain gorilla conservation, combined with tranquil Lake Kivu and vibrant Kigali.",
      highlights: ["Volcanoes Gorilla Trekking", "Golden Monkey Tracking", "Scenic Lake Kivu", "Kigali Cultural Arts"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#171A17] text-[#F7F4EC] pt-24">
      {/* Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-zoom-bg"
          style={{ backgroundImage: `url('${brandSettings.eastAfricaHeroImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171A17] via-[#073F27]/80 to-black/70" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4 animate-slide-up">
          <div className="inline-flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-[#F4B41A]" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#F4B41A]">
              Regional Safari Circuits
            </span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold text-[#F7F4EC] leading-tight">
            Uganda & East Africa Expeditions
          </h1>

          <p className="text-base sm:text-lg text-[#F7F4EC]/85 font-light max-w-2xl mx-auto leading-relaxed">
            Sonnenpfad Safaris connects the primeval rainforests of Uganda with the boundless golden savannahs of Kenya, Tanzania, and Rwanda for the ultimate East African safari.
          </p>
        </div>
      </section>

      {/* Cross-Border Advantage Strip */}
      <section className="py-12 bg-[#101210] border-y border-[#D99A00]/25">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-[#171A17] border border-[#D99A00]/20 flex items-start gap-3">
            <Plane className="w-5 h-5 text-[#F4B41A] shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-xs text-[#F7F4EC] uppercase tracking-wider mb-1">
                Seamless Regional Flights
              </h4>
              <p className="text-xs text-[#F7F4EC]/70">
                Short bush flights connecting Entebbe, Bwindi, Masai Mara, and Serengeti without lengthy overland borders.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#171A17] border border-[#D99A00]/20 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#25D366] shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-xs text-[#F7F4EC] uppercase tracking-wider mb-1">
                Single East Africa Tourist Visa
              </h4>
              <p className="text-xs text-[#F7F4EC]/70">
                One consolidated $100 visa grants seamless multi-entry travel across Uganda, Kenya, and Rwanda.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#171A17] border border-[#D99A00]/20 flex items-start gap-3">
            <Compass className="w-5 h-5 text-[#D99A00] shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-xs text-[#F7F4EC] uppercase tracking-wider mb-1">
                Primates + The Great Migration
              </h4>
              <p className="text-xs text-[#F7F4EC]/70">
                Combine the thrill of mountain gorilla trekking with the thundering wildebeest river crossings of the Mara-Serengeti.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* East African Destinations Grid */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#F4B41A] block mb-2">
            The Great Rift Valley & Beyond
          </span>
          <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#F7F4EC]">
            Four Iconic Destinations. One Master Journey.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {countries.map((c, idx) => (
            <div
              key={c.country}
              className="bg-[#101210] border border-[#D99A00]/30 overflow-hidden flex flex-col justify-between hover:border-[#F4B41A] transition-all"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden">
                  <img
                    src={c.image}
                    alt={c.country}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101210] via-black/30 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-[#073F27] text-[#F4B41A] text-xs font-bold uppercase tracking-widest px-3 py-1 border border-[#D99A00]/40">
                      {c.country}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <h3 className="font-editorial text-2xl font-bold text-[#F7F4EC]">
                    {c.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#F7F4EC]/80 font-light leading-relaxed">
                    {c.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[10px] font-semibold text-[#D99A00] uppercase tracking-wider block mb-1">
                      Key Highlights:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {c.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-[11px] text-[#F7F4EC]/90 bg-[#171A17] px-2.5 py-1 border border-[#D99A00]/20"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-[#D99A00]/15">
                <button
                  onClick={() => onRequestQuote(`${c.country} Cross-Border Safari`)}
                  className="w-full py-3 bg-[#073F27] hover:bg-[#0a4d30] text-[#F7F4EC] text-xs font-semibold uppercase tracking-wider border border-[#D99A00]/50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Plan {c.country} Itinerary</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F4B41A]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured East African Safaris */}
      <section className="py-20 bg-[#101210] border-t border-[#D99A00]/25">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#F4B41A] block mb-2">
              Cross-Border Expeditions
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#F7F4EC]">
              Featured East Africa Journeys
            </h2>
            <p className="text-xs sm:text-sm text-[#F7F4EC]/75 font-light mt-2">
              Curated multi-country itineraries designed for private groups, honeymooners, and photography expeditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eastAfricaSafaris.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-[#171A17] border border-[#D99A00]/30 overflow-hidden flex flex-col justify-between hover:border-[#D99A00] transition-colors"
              >
                <div>
                  <div className="relative h-60 w-full overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-[#073F27]/90 text-[#F4B41A] text-xs font-bold px-2.5 py-1 border border-[#D99A00]/40 flex items-center gap-1.5 font-mono">
                      <span>{pkg.duration}</span>
                      <span className="text-[#D99A00]">·</span>
                      <span className="text-[#F7F4EC]">{pkg.formattedPriceUGX || `UGX ${pkg.priceUGX.toLocaleString()}`}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs text-[#D99A00]">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{pkg.destinationsFormatted}</span>
                    </div>

                    <h3 className="font-editorial text-2xl font-bold text-[#F7F4EC] leading-snug">
                      {pkg.title}
                    </h3>

                    <p className="text-xs text-[#F7F4EC]/75 font-light line-clamp-3">
                      {pkg.overview}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#D99A00]/20 flex items-center gap-3">
                  <button
                    onClick={() => onSelectSafari(pkg)}
                    className="btn-glass-forest flex-1 text-xs py-3 px-4"
                  >
                    <span>Inspect Safari</span>
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

      {/* Direct Contact Banner */}
      <section className="py-20 bg-[#073F27] text-center border-t border-[#D99A00]/40">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#F7F4EC]">
            Ready to Explore East Africa?
          </h2>
          <p className="text-xs sm:text-sm text-[#F7F4EC]/85 font-light leading-relaxed">
            Our East Africa safari architects are available to answer flight questions, recommend optimal seasonal timing for the migration, and book gorilla permits.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onRequestQuote("Custom East Africa Journey")}
              className="btn-glass-gold py-4 px-8"
            >
              <span>Design East Africa Safari</span>
              <ArrowRight className="w-4 h-4 text-[#073F27]" />
            </button>
            <a
              href={`https://wa.me/${brandSettings.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass-whatsapp py-4 px-8 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#042617]" />
              <span>Chat on WhatsApp: {brandSettings.whatsapp}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
