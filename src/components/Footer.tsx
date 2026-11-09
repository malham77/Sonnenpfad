import React from "react";
import { SonnenpfadLogo } from "./SonnenpfadLogo";
import { MessageCircle, Phone, Mail, MapPin, ArrowUpRight, Lock, Coffee } from "lucide-react";

interface FooterProps {
  onNavigate: (tab: string) => void;
  onWhatsAppClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onWhatsAppClick }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#073F27] border-t border-[#D99A00]/40 text-[#F7F4EC] relative overflow-hidden">
      {/* Subtle Sonnenpfad Sun Motif in background */}
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-[600px] h-[600px] rounded-full border border-[#D99A00]/10 pointer-events-none" />
      <div className="absolute right-0 bottom-0 translate-x-1/3 translate-y-1/3 w-[450px] h-[450px] rounded-full border border-[#D99A00]/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#D99A00]/25">
          {/* Col 1: Brand & Promise */}
          <div className="lg:col-span-2 space-y-4">
            <SonnenpfadLogo size="lg" />
            <p className="font-editorial text-lg italic text-[#F4B41A]">
              Discover Uganda & East Africa. Follow the Path to Adventure.
            </p>
            <p className="text-xs sm:text-sm text-[#F7F4EC]/80 leading-relaxed font-light max-w-sm">
              Sonnenpfad means "sun path". We curate luxury, tailor-made safari expeditions across Uganda's ancient rainforests, wild savannahs, the Great Migration of Serengeti and Masai Mara, and roasted East African single-origin coffee.
            </p>

            <div className="pt-2">
              <button
                onClick={onWhatsAppClick}
                className="btn-glass-whatsapp text-xs py-2.5 px-5 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 text-[#042617]" />
                <span>Chat on WhatsApp: +256 773 333108</span>
              </button>
            </div>
          </div>

          {/* Col 2: Explore Navigation */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#D99A00] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F7F4EC]/80">
              {[
                { id: "home", label: "Home" },
                { id: "about", label: "About Sonnenpfad" },
                { id: "safaris", label: "Our Safaris" },
                { id: "east-africa", label: "East Africa Expeditions" },
                { id: "shop", label: "Specialty Coffee Shop" },
                { id: "destinations", label: "Destinations Map" },
                { id: "experiences", label: "Safari Experiences" },
                { id: "gallery", label: "Photos & Videos" },
                { id: "plan", label: "Custom Safari Builder" },
                { id: "contact", label: "Contact Us" }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onNavigate(item.id);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-[#F4B41A] transition-colors cursor-pointer text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Safaris & Coffee */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#D99A00] mb-4">
              Signature Safaris
            </h4>
            <ul className="space-y-2.5 text-xs text-[#F7F4EC]/80">
              {[
                "Gorilla Trekking Bwindi",
                "Chimpanzee Primates Kibale",
                "Murchison Falls & Nile River",
                "Serengeti Great Migration",
                "Queen Elizabeth Wildlife",
                "Mount Elgon Coffee Treks",
                "Rwenzori Alpine Expeditions",
                "Bespoke Private Itineraries"
              ].map((name) => (
                <li key={name}>
                  <button
                    onClick={() => {
                      onNavigate("safaris");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="hover:text-[#F4B41A] transition-colors cursor-pointer text-left"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact & Social */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#D99A00] mb-4">
              Contact & Location
            </h4>
            <div className="space-y-3 text-xs text-[#F7F4EC]/85">
              <div>
                <span className="font-semibold text-[#F7F4EC] block">Sonnenpfad Safaris Uganda Ltd</span>
                <span className="text-[#F7F4EC]/70">Registered Uganda Tour Operator</span>
              </div>

              <div className="flex items-start gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-[#D99A00] shrink-0 mt-0.5" />
                <a
                  href="tel:+256773333108"
                  className="hover:text-[#F4B41A] transition-colors font-mono"
                >
                  +256 773 333108
                </a>
              </div>

              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D99A00] shrink-0 mt-0.5" />
                <span className="text-[#F7F4EC]/75">
                  info@sonnenpfadsafaris.com
                </span>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D99A00] shrink-0 mt-0.5" />
                <span className="text-[#F7F4EC]/75">
                  Entebbe / Kampala, Uganda · East Africa
                </span>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-semibold text-[#D99A00] uppercase block mb-1">
                  Follow Our Expeditions
                </span>
                <a
                  href="https://www.tiktok.com/@kisacathy1900?_r=1&_t=ZS-9AJFAoC3tqs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#F4B41A] hover:underline"
                >
                  <span>TikTok: @kisacathy1900</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Discreet Owner Link without prominent public buttons) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F7F4EC]/60">
          <div>
            © {currentYear} Sonnenpfad Safaris Uganda Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Authentic Uganda Safari Brand</span>
            <span className="text-[#D99A00]">·</span>
            <span>Sustainable & Responsible Tourism</span>
            <span className="text-[#D99A00]">·</span>
            {/* Discreet Owner Gateway (No public login button, subtle keyhole for the owner) */}
            <button
              onClick={() => {
                onNavigate("admin");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-[#F7F4EC]/30 hover:text-[#F4B41A] transition-colors flex items-center gap-1 cursor-pointer"
              title="Discreet Owner Gateway"
              aria-label="Owner Gateway"
            >
              <Lock className="w-3 h-3" />
              <span>Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
