import React, { useState, useEffect } from "react";
import { SonnenpfadLogo } from "./SonnenpfadLogo";
import {
  MessageCircle,
  Menu,
  X,
  ArrowRight,
  Compass,
  ShoppingBag,
  Search,
  Sun,
  Moon,
  Phone,
  ChevronDown,
  Coffee,
  Globe2,
  Star,
  Instagram,
  Facebook,
  Twitter
} from "lucide-react";
import { useCms } from "../context/CmsContext";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const {
    brandSettings,
    theme,
    toggleTheme,
    coffeeOrders,
    openSearch,
    openReviewModal,
    reviews
  } = useCms();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "HOME" },
    {
      id: "destinations",
      label: "DESTINATIONS",
      hasDropdown: true,
      dropdownItems: [
        { id: "destinations", label: "Uganda (Bwindi & Murchison)", desc: "Gorillas, Chimps & The Nile" },
        { id: "destinations", label: "Tanzania (Serengeti & Ngorongoro)", desc: "Great Migration & Crater" },
        { id: "destinations", label: "Kenya (Masai Mara)", desc: "Big Cat Theatre & Savannah" },
        { id: "destinations", label: "Rwanda (Volcanoes)", desc: "Virunga Mountain Gorillas" }
      ]
    },
    {
      id: "safaris",
      label: "TOURS",
      hasDropdown: true,
      dropdownItems: [
        { id: "safaris", label: "3 Days Mountain Gorilla Trek", desc: "Intimate Bwindi Encounter" },
        { id: "safaris", label: "5 Days Gorillas & Queen Elizabeth", desc: "Rainforest & Savannah Lions" },
        { id: "safaris", label: "7 Days Primates & Big Game", desc: "Chimps, Savannah & Gorillas" },
        { id: "safaris", label: "10 Days Pearl of Africa Explorer", desc: "Nile Falls & Big 5 Circuit" },
        { id: "safaris", label: "12 Days East Africa & Migration", desc: "Uganda, Kenya & Tanzania" },
        { id: "plan", label: "Custom Safari Designer", desc: "Bespoke Journey Builder" }
      ]
    },
    {
      id: "east-africa",
      label: "EAST AFRICA",
      hasDropdown: true,
      dropdownItems: [
        { id: "east-africa", label: "Cross-Border Expeditions", desc: "Seamless Multi-Country Flights" },
        { id: "east-africa", label: "The Great Migration Circuit", desc: "Serengeti & Masai Mara Plains" },
        { id: "east-africa", label: "East Africa Tourist Visa Guide", desc: "Single Visa for Uganda, Kenya & Rwanda" }
      ]
    },
    {
      id: "shop",
      label: "COFFEE SHOP",
      hasDropdown: true,
      dropdownItems: [
        { id: "shop", label: "Mount Elgon Bugisu AA", desc: "Volcanic Arabica (UGX 65,000)" },
        { id: "shop", label: "Rwenzori Glacial Espresso", desc: "High-Altitude Dark Roast (UGX 75,000)" },
        { id: "shop", label: "Bwindi Gorilla Conservation Coffee", desc: "Shade-Grown Beans (UGX 80,000)" },
        { id: "shop", label: "Olive Wood Scoop & Tamper", desc: "Handcrafted Barista Tool (UGX 85,000)" }
      ]
    },
    {
      id: "reviews",
      label: "REVIEWS",
      hasDropdown: true,
      dropdownItems: [
        { id: "home", label: `Guest Reviews & Ratings (${reviews.length})`, desc: "Verified Traveller Experiences" },
        { id: "write-review", label: "+ Leave Your Review & Rating", desc: "Share feedback with Sonnenpfad" }
      ]
    },
    {
      id: "pages",
      label: "PAGES",
      hasDropdown: true,
      dropdownItems: [
        { id: "about", label: "About Sonnenpfad Safaris", desc: "The Sun Path Philosophy" },
        { id: "gallery", label: "Photo & Video Gallery", desc: "Wildlife & Field Moments" },
        { id: "experiences", label: "Signature Experiences", desc: "Gorillas, Savannah & The Nile" },
        { id: "plan", label: "6-Step Safari Builder", desc: "Tailored Itinerary Designer" }
      ]
    },
    { id: "contact", label: "CONTACT" }
  ];

  const handleLinkClick = (pageId: string) => {
    if (pageId === "write-review") {
      openReviewModal();
      setActiveDropdown(null);
      return;
    }
    if (pageId === "reviews") {
      onNavigate("home");
      setTimeout(() => {
        const el = document.getElementById("reviews");
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      setActiveDropdown(null);
      return;
    }
    onNavigate(pageId);
    setMenuOpen(false);
    setActiveDropdown(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* 1. TOP UTILITY STRIP (Template Image Match - Socials on Left, Phone on Right) */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0A0C0A] border-b border-white/10 text-[11px] text-[#F7F4EC]/80 py-1.5 px-4 hidden md:block backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Social Icons and Telephone (Exact match to image_09e5cb8a.png) */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 text-white/80">
              <a
                href={brandSettings.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F4B41A] transition-colors"
                title="Follow Sonnenpfad on TikTok"
              >
                <span className="font-bold text-[10px] uppercase tracking-wider">TikTok</span>
              </a>
              <span className="text-white/20">·</span>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F4B41A] transition-colors"
                title="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F4B41A] transition-colors"
                title="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F4B41A] transition-colors"
                title="Twitter"
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            </div>

            <span className="text-white/20">|</span>

            {/* Direct Telephone link */}
            <a
              href={`tel:${brandSettings.whatsapp.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-1.5 hover:text-[#F4B41A] transition-colors font-mono"
            >
              <Phone className="w-3.5 h-3.5 text-[#F4B41A]" />
              <span>{brandSettings.whatsapp}</span>
            </a>
          </div>

          {/* Right: Currency Indicator & Operating Region */}
          <div className="flex items-center gap-4 text-[10px] tracking-wider uppercase">
            <span className="text-[#F4B41A] font-bold">
              CURRENCY: UGX (Ugandan Shillings)
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[#F7F4EC]/70">
              Uganda · Kenya · Tanzania · Rwanda
            </span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Matching image_09e5cb8a.png - Logo, Horizontal Center Links with Dropdowns, Search, Cart & Gold Menu) */}
      <header
        className={`fixed left-0 right-0 z-40 transition-all duration-300 md:top-[29px] top-0 ${
          isScrolled
            ? theme === "light"
              ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-xl py-3"
              : "bg-[#0A0C0A]/95 backdrop-blur-xl border-b border-[#D99A00]/25 shadow-2xl py-3"
            : theme === "light"
            ? "bg-white/90 backdrop-blur-md border-b border-slate-200 py-3 sm:py-4"
            : "bg-gradient-to-b from-black/95 via-black/70 to-transparent py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand Logo on Left */}
          <button
            onClick={() => handleLinkClick("home")}
            className="text-left cursor-pointer whitespace-nowrap shrink-0 group flex items-center gap-3"
            aria-label="Sonnenpfad Safaris Home"
          >
            <SonnenpfadLogo size="md" />
          </button>

          {/* Desktop Horizontal Navigation Links (Center, matching image_09e5cb8a.png) */}
          <nav className="hidden xl:flex items-center gap-5 lg:gap-6" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive =
                currentPage === link.id ||
                (link.id === "safaris" && currentPage === "safaris") ||
                (link.id === "pages" && ["about", "gallery", "experiences", "plan"].includes(currentPage));

              return (
                <div
                  key={link.id}
                  className="relative group"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className={`font-sans text-[12.5px] tracking-[0.14em] uppercase font-bold transition-all flex items-center gap-1 py-2 cursor-pointer ${
                      isActive
                        ? "text-[#F4B41A]"
                        : theme === "light"
                        ? "text-slate-800 hover:text-[#D99A00]"
                        : "text-[#F7F4EC] hover:text-[#F4B41A]"
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.hasDropdown && (
                      <ChevronDown className="w-3 h-3 transition-transform group-hover:rotate-180 opacity-60 group-hover:opacity-100" />
                    )}
                  </button>

                  {/* High-Contrast Dropdown Menu on Hover */}
                  {link.hasDropdown && (
                    <div
                      className={`absolute top-full left-0 w-72 rounded-2xl shadow-2xl p-2.5 transition-all duration-200 z-50 border ${
                        theme === "light"
                          ? "bg-white border-slate-200 text-slate-800"
                          : "bg-[#0E110E] border-[#D99A00]/40 text-[#F7F4EC]"
                      } ${
                        activeDropdown === link.id
                          ? "opacity-100 visible translate-y-0"
                          : "opacity-0 invisible -translate-y-2 pointer-events-none"
                      }`}
                    >
                      {link.dropdownItems?.map((dropItem, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleLinkClick(dropItem.id)}
                          className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer group/item flex items-center justify-between ${
                            theme === "light"
                              ? "hover:bg-slate-100"
                              : "hover:bg-[#073F27]"
                          }`}
                        >
                          <div>
                            <span className="block text-xs font-bold text-[#F4B41A] group-hover/item:text-[#D99A00]">
                              {dropItem.label}
                            </span>
                            <span className="block text-[10px] opacity-70 group-hover/item:opacity-100 mt-0.5">
                              {dropItem.desc}
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#F4B41A] transition-transform group-hover/item:translate-x-1" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Utility Controls: Search, Cart [0], Theme Switcher, and Golden Square Menu Button */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* 1. Search Icon */}
            <button
              onClick={openSearch}
              className={`p-2 transition-colors cursor-pointer ${
                theme === "light" ? "text-slate-800 hover:text-[#D99A00]" : "text-[#F7F4EC] hover:text-[#F4B41A]"
              }`}
              title="Search Safaris, Destinations & Coffee"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* 2. Cart Icon with Yellow Badge [0] */}
            <button
              onClick={() => handleLinkClick("shop")}
              className={`relative p-2 transition-colors cursor-pointer group ${
                theme === "light" ? "text-slate-800 hover:text-[#D99A00]" : "text-[#F7F4EC] hover:text-[#F4B41A]"
              }`}
              title="Sonnenpfad Coffee Shop Cart"
              aria-label="Coffee Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#F4B41A] text-[#073F27] font-bold text-[10px] flex items-center justify-center font-mono shadow-md">
                {coffeeOrders.length > 0 ? coffeeOrders.length : 0}
              </span>
            </button>

            {/* 3. Dark & Light Theme Switcher */}
            <button
              onClick={toggleTheme}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all cursor-pointer shadow-md ${
                theme === "light"
                  ? "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800"
                  : "bg-white/10 hover:bg-white/20 border-white/20 text-[#F4B41A]"
              }`}
              title={theme === "dark" ? "Switch to Daylight White Theme" : "Switch to Deep Black Theme"}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#F4B41A]" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800" />
              )}
            </button>

            {/* 4. Golden Square 3-Bars Menu Button (Matches image_09e5cb8a.png) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#F4B41A] hover:bg-[#e0a415] text-[#073F27] flex items-center justify-center shadow-lg transition-all cursor-pointer group"
              aria-label={menuOpen ? "Close navigation" : "Open navigation menu"}
              aria-expanded={menuOpen}
            >
              <div className="flex flex-col gap-1 w-5">
                <span
                  className={`h-0.5 w-full bg-[#073F27] transition-all duration-300 ${
                    menuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-[#073F27] transition-all duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-[#073F27] transition-all duration-300 ${
                    menuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* FULL-SCREEN NAVIGATION DRAWER */}
      {menuOpen && (
        <div
          className={`fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto animate-slide-down ${
            theme === "light"
              ? "bg-white text-slate-900"
              : "bg-[#042617]/98 backdrop-blur-2xl text-[#F7F4EC]"
          }`}
          role="dialog"
          aria-modal="true"
        >
          {/* Top Bar inside Drawer */}
          <div className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-[#D99A00]/30">
            <SonnenpfadLogo size="md" />

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="w-11 h-11 rounded-full bg-black/10 border border-[#D99A00]/50 text-[#F4B41A] flex items-center justify-center transition-all cursor-pointer"
                title="Toggle Theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-slate-800" />}
              </button>

              <button
                onClick={() => setMenuOpen(false)}
                className="w-11 h-11 rounded-full bg-black/10 border border-[#D99A00]/60 flex items-center justify-center transition-all cursor-pointer shadow-xl"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Navigation Links Grid with Multi-directional Slide Animations */}
          <div className="max-w-7xl mx-auto w-full px-6 py-8 flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5">
            {[
              { id: "home", label: "01. Home", desc: "Discover Uganda & East Africa Safaris" },
              { id: "destinations", label: "02. East Africa Destinations", desc: "Uganda, Kenya, Tanzania & Rwanda" },
              { id: "safaris", label: "03. Tours & Safari Collection", desc: "Mountain Gorillas, Great Migration & Nile" },
              { id: "east-africa", label: "04. Cross-Border Expeditions", desc: "Multi-Country Flights & Circuits" },
              { id: "shop", label: "05. Specialty Coffee Roastery", desc: "Mount Elgon AA & Rwenzori Beans in UGX" },
              { id: "reviews", label: `06. Guest Reviews & Ratings (${reviews.length})`, desc: "Verified Traveller Reviews" },
              { id: "gallery", label: "07. Photo & Video Gallery", desc: "East African Wildlife & Moments" },
              { id: "plan", label: "08. Custom Safari Designer", desc: "6-Step Bespoke Journey Builder" },
              { id: "about", label: "09. Our Story & Purpose", desc: "The Sun Path & Responsible Tourism" },
              { id: "contact", label: "10. Contact & Bookings", desc: "Direct WhatsApp & Safari Architects" }
            ].map((item, idx) => {
              const isActive = currentPage === item.id;
              const isEven = idx % 2 === 0;
              const animClass = isEven ? "animate-slide-left" : "animate-slide-right";

              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  style={{ animationDelay: `${idx * 0.03}s` }}
                  className={`text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer group flex items-center justify-between ${animClass} ${
                    isActive
                      ? "bg-[#073F27] border-[#F4B41A] text-[#F4B41A] shadow-xl"
                      : theme === "light"
                      ? "bg-slate-50 border-slate-200 hover:border-[#D99A00]"
                      : "bg-[#101210]/60 border-white/10 hover:border-[#D99A00] hover:bg-[#073F27]/50"
                  }`}
                >
                  <div>
                    <span
                      className={`font-editorial text-xl sm:text-2xl font-bold transition-colors ${
                        isActive
                          ? "text-[#F4B41A]"
                          : theme === "light"
                          ? "text-slate-800 group-hover:text-[#D99A00]"
                          : "text-[#F7F4EC] group-hover:text-[#F4B41A]"
                      }`}
                    >
                      {item.label}
                    </span>
                    <p className="text-xs opacity-70 font-light mt-0.5">
                      {item.desc}
                    </p>
                  </div>

                  <ArrowRight
                    className={`w-5 h-5 transition-transform group-hover:translate-x-1.5 ${
                      isActive ? "text-[#F4B41A]" : "text-[#D99A00]"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Bottom Contact Strip in Menu */}
          <div className="max-w-7xl mx-auto w-full px-6 py-6 border-t border-[#D99A00]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs opacity-90">
            <div className="flex items-center gap-4">
              <span className="font-bold">{brandSettings.brandName}</span>
              <span className="text-[#D99A00]">·</span>
              <span>All Prices Quoted in Ugandan Shillings (UGX)</span>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={`https://wa.me/${brandSettings.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-glass-whatsapp text-xs py-2.5 px-6"
              >
                <MessageCircle className="w-4 h-4 text-[#042617]" />
                <span>WhatsApp: {brandSettings.whatsapp}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
