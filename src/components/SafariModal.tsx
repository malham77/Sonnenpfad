import React, { useState } from "react";
import { SafariPackage } from "../data/safarisData";
import {
  X,
  Check,
  Clock,
  MapPin,
  Compass,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Star,
  Info,
  Calendar,
  Layers,
  Image as ImageIcon,
  User,
  Mail,
  Phone,
  Send
} from "lucide-react";
import { useCms } from "../context/CmsContext";

interface SafariModalProps {
  safari: SafariPackage | null;
  onClose: () => void;
  onRequestQuote: (safariName: string) => void;
  onWhatsAppChat: (text: string) => void;
}

export const SafariModal: React.FC<SafariModalProps> = ({
  safari,
  onClose,
  onRequestQuote,
  onWhatsAppChat
}) => {
  const { brandSettings, addInquiry } = useCms();
  const [activeTab, setActiveTab] = useState<"info" | "plan" | "location" | "gallery" | "reviews">("info");
  const [activeDay, setActiveDay] = useState<number | null>(1);

  // Booking Form State (Template Images 4 & 5 Match)
  const [bookName, setBookName] = useState("");
  const [bookEmail, setBookEmail] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookTravellers, setBookTravellers] = useState("2 Travellers");
  const [bookMessage, setBookMessage] = useState("");
  const [isBookSubmitted, setIsBookSubmitted] = useState(false);

  if (!safari) return null;

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookName || !bookEmail) {
      alert("Please provide your name and email.");
      return;
    }

    addInquiry({
      refCode: "SPF-" + Math.floor(1000 + Math.random() * 9000),
      name: bookName,
      country: "Direct Web Request",
      email: bookEmail,
      phone: bookPhone || "N/A",
      interests: safari.title,
      duration: safari.duration,
      travelStyle: safari.accommodationLevel,
      travellers: bookTravellers,
      notes: bookMessage,
      source: "contact"
    });

    setIsBookSubmitted(true);

    // Also trigger instant WhatsApp notification
    const text = encodeURIComponent(
      `Hello Sonnenpfad Safaris, my name is ${bookName}. I would like to book the "${safari.title}" (${safari.duration}) for ${bookTravellers}. Email: ${bookEmail}, Phone: ${bookPhone || "N/A"}.`
    );
    window.open(`https://wa.me/${brandSettings.whatsapp.replace(/[^0-9]/g, "")}?text=${text}`, "_blank");
  };

  const handleWhatsApp = () => {
    const message = `Hello Sonnenpfad Safaris, I would like to inquire about the "${safari.title}" safari. Please share details and availability.`;
    onWhatsAppChat(message);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative w-full max-w-5xl bg-[#171A17] border-2 border-[#D99A00]/40 rounded-3xl text-[#F7F4EC] shadow-2xl overflow-hidden my-6 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-11 h-11 bg-black/70 hover:bg-[#D99A00] text-[#F7F4EC] hover:text-[#073F27] border border-white/20 hover:border-[#D99A00] rounded-full flex items-center justify-center transition-all cursor-pointer shadow-xl"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Visual Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={safari.image}
            alt={safari.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171A17] via-[#171A17]/40 to-black/30" />

          {/* Badges and Title */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-[#F4B41A] uppercase mb-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{safari.duration}</span>
              </span>
              <span className="text-[#D99A00]">·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{safari.destinationsFormatted}</span>
              </span>
              <span className="text-[#D99A00]">·</span>
              <span className="bg-[#D99A00] text-[#073F27] px-2.5 py-0.5 rounded-full font-bold">
                From {safari.formattedPriceUGX || `UGX ${safari.priceUGX.toLocaleString()}`}
              </span>
            </div>
            <h2 id="modal-title" className="font-editorial text-2xl sm:text-4xl font-bold text-[#F7F4EC] leading-tight">
              {safari.title}
            </h2>
          </div>
        </div>

        {/* 5-TAB NAVIGATION BAR (Template Images 4 & 5 Match) */}
        <div className="bg-[#101210] border-b border-[#D99A00]/30 px-6 flex flex-wrap items-center gap-2 sm:gap-4 overflow-x-auto">
          {[
            { id: "info", label: "Information", icon: Info },
            { id: "plan", label: "Tour Plan", icon: Layers },
            { id: "location", label: "Tour Location", icon: MapPin },
            { id: "gallery", label: "Gallery", icon: ImageIcon },
            { id: "reviews", label: "Reviews & Scores", icon: Star }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "border-[#F4B41A] text-[#F4B41A]"
                    : "border-transparent text-[#F7F4EC]/60 hover:text-[#F7F4EC]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#F4B41A]" : "text-[#D99A00]"}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Main Content Split: Details Left, "Book This Tour" Sticky Right */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7/8 Columns: Tab Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* TAB 1: INFORMATION */}
              {activeTab === "info" && (
                <div className="space-y-6 animate-slide-up">
                  <div>
                    <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#D99A00] mb-2">
                      Safari Overview
                    </h3>
                    <p className="text-sm sm:text-base text-[#F7F4EC]/90 leading-relaxed font-light">
                      {safari.overview}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="bg-[#073F27]/30 border border-[#D99A00]/30 rounded-2xl p-5">
                    <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#F4B41A] mb-3">
                      Expedition Highlights
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {safari.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#F7F4EC]/90">
                          <Check className="w-4 h-4 text-[#F4B41A] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Inclusions & Exclusions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-[#101210] border border-[#D99A00]/25 rounded-xl">
                      <h5 className="text-[11px] font-bold uppercase text-[#25D366] tracking-wider mb-2">
                        Included in Journey
                      </h5>
                      <ul className="text-xs text-[#F7F4EC]/80 space-y-1.5">
                        {safari.included.map((inc, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-[#25D366]">✓</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-[#101210] border border-[#D99A00]/25 rounded-xl">
                      <h5 className="text-[11px] font-bold uppercase text-red-400 tracking-wider mb-2">
                        Excluded
                      </h5>
                      <ul className="text-xs text-[#F7F4EC]/80 space-y-1.5">
                        {safari.excluded.map((exc, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-red-400">✗</span>
                            <span>{exc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TOUR PLAN (Itinerary) */}
              {activeTab === "plan" && (
                <div className="space-y-3 animate-slide-up">
                  <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#D99A00] mb-3">
                    Daily Schedule & Encounters
                  </h3>
                  {safari.itinerary.map((day) => {
                    const isOpen = activeDay === day.day;
                    return (
                      <div
                        key={day.day}
                        className="border border-[#D99A00]/25 bg-[#101210] rounded-xl overflow-hidden"
                      >
                        <button
                          onClick={() => setActiveDay(isOpen ? null : day.day)}
                          className="w-full px-5 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#073F27]/25 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full border border-[#D99A00]/50 bg-[#073F27] text-[#F4B41A] text-xs font-bold flex items-center justify-center shrink-0">
                              {day.day}
                            </span>
                            <span className="font-editorial text-base sm:text-lg font-bold text-[#F7F4EC]">
                              Day {day.day} — {day.title}
                            </span>
                          </div>
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-[#F4B41A]" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-[#D99A00]" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#F7F4EC]/80 border-t border-white/10 leading-relaxed font-light">
                            <p className="mb-2">{day.description}</p>
                            {day.accommodation && (
                              <p className="text-xs text-[#D99A00] font-medium">
                                <strong>Accommodation:</strong> {day.accommodation}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* TAB 3: TOUR LOCATION */}
              {activeTab === "location" && (
                <div className="space-y-4 animate-slide-up">
                  <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#D99A00]">
                    Protected Wilderness & Route
                  </h3>
                  <div className="p-6 bg-[#101210] border border-[#D99A00]/30 rounded-2xl space-y-3">
                    <p className="text-xs text-[#F7F4EC]/85 font-light leading-relaxed">
                      This private safari takes you through prime ecosystems:{" "}
                      <strong className="text-[#F4B41A]">{safari.destinationsFormatted}</strong>.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {safari.destinations.map((d) => (
                        <span
                          key={d}
                          className="text-xs px-3 py-1 bg-[#073F27] text-[#F4B41A] border border-[#D99A00]/40 rounded-full flex items-center gap-1.5"
                        >
                          <MapPin className="w-3 h-3" />
                          <span>{d}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: GALLERY */}
              {activeTab === "gallery" && (
                <div className="space-y-4 animate-slide-up">
                  <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#D99A00]">
                    Safari Visual Dossier
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <img
                      src={safari.image}
                      alt={safari.title}
                      className="rounded-xl h-44 w-full object-cover border border-[#D99A00]/25"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80"
                      alt="Gorilla Encounter"
                      className="rounded-xl h-44 w-full object-cover border border-[#D99A00]/25"
                    />
                  </div>
                </div>
              )}

              {/* TAB 5: REVIEWS & SCORE BREAKDOWN (Template Image 5 Match) */}
              {activeTab === "reviews" && (
                <div className="space-y-6 animate-slide-up">
                  <h3 className="font-editorial text-2xl font-bold text-[#F7F4EC]">
                    Tour Review Scores & Score Breakdown
                  </h3>

                  <div className="p-6 bg-[#101210] border border-[#D99A00]/30 rounded-2xl space-y-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#F7F4EC] font-semibold">Overall Satisfaction</span>
                        <span className="font-mono text-[#F4B41A] font-bold">98%</span>
                      </div>
                      <div className="h-2.5 w-full bg-[#171A17] rounded-full overflow-hidden border border-white/10">
                        <div className="h-full bg-gradient-to-r from-[#D99A00] to-[#F4B41A] rounded-full w-[98%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#F7F4EC] font-semibold">Wildlife Sightings</span>
                        <span className="font-mono text-[#F4B41A] font-bold">100%</span>
                      </div>
                      <div className="h-2.5 w-full bg-[#171A17] rounded-full overflow-hidden border border-white/10">
                        <div className="h-full bg-gradient-to-r from-[#D99A00] to-[#F4B41A] rounded-full w-[100%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#F7F4EC] font-semibold">Safety & Lead Guide</span>
                        <span className="font-mono text-[#F4B41A] font-bold">99%</span>
                      </div>
                      <div className="h-2.5 w-full bg-[#171A17] rounded-full overflow-hidden border border-white/10">
                        <div className="h-full bg-gradient-to-r from-[#D99A00] to-[#F4B41A] rounded-full w-[99%]" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#F7F4EC] font-semibold">Luxury Lodges & Hospitality</span>
                        <span className="font-mono text-[#F4B41A] font-bold">96%</span>
                      </div>
                      <div className="h-2.5 w-full bg-[#171A17] rounded-full overflow-hidden border border-white/10">
                        <div className="h-full bg-gradient-to-r from-[#D99A00] to-[#F4B41A] rounded-full w-[96%]" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right 5 Columns: STICKY "BOOK THIS TOUR" CARD (Template Images 4 & 5 Match) */}
            <div className="lg:col-span-5 bg-[#101210] border-2 border-[#D99A00]/40 rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="border-b border-[#D99A00]/25 pb-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#F4B41A] block">
                    Reserve Departure
                  </span>
                  <span className="text-xs font-mono font-bold text-[#F4B41A]">
                    {safari.formattedPriceUGX || `UGX ${safari.priceUGX.toLocaleString()}`}
                  </span>
                </div>
                <h4 className="font-editorial text-2xl font-bold text-[#F7F4EC]">
                  Book This Tour
                </h4>
                <p className="text-xs text-[#F7F4EC]/70 font-light mt-0.5">
                  Direct private booking with dedicated safari architects. Price in UGX per person.
                </p>
              </div>

              {isBookSubmitted ? (
                <div className="p-4 bg-[#073F27] border border-[#25D366] rounded-2xl text-center space-y-2">
                  <Check className="w-8 h-8 text-[#25D366] mx-auto" />
                  <p className="text-xs font-bold text-[#F7F4EC]">Inquiry Dispatched!</p>
                  <p className="text-[11px] text-[#F7F4EC]/80 font-light">
                    Our team will reply on WhatsApp and email with complete availability and pricing.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                      Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        className="w-full bg-[#171A17] border border-[#D99A00]/30 rounded-xl px-4 py-2.5 text-xs text-[#F7F4EC] focus:outline-none focus:border-[#F4B41A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Your email address"
                      value={bookEmail}
                      onChange={(e) => setBookEmail(e.target.value)}
                      className="w-full bg-[#171A17] border border-[#D99A00]/30 rounded-xl px-4 py-2.5 text-xs text-[#F7F4EC] focus:outline-none focus:border-[#F4B41A]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                      WhatsApp / Phone
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +1 555 123 4567"
                      value={bookPhone}
                      onChange={(e) => setBookPhone(e.target.value)}
                      className="w-full bg-[#171A17] border border-[#D99A00]/30 rounded-xl px-4 py-2.5 text-xs text-[#F7F4EC] focus:outline-none focus:border-[#F4B41A]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                      Party Size
                    </label>
                    <select
                      value={bookTravellers}
                      onChange={(e) => setBookTravellers(e.target.value)}
                      className="w-full bg-[#171A17] border border-[#D99A00]/30 rounded-xl px-4 py-2.5 text-xs text-[#F7F4EC] focus:outline-none"
                    >
                      <option value="1 Solo Traveller">1 Solo Traveller</option>
                      <option value="2 Travellers (Couple / Friends)">2 Travellers (Couple / Friends)</option>
                      <option value="3-5 Travellers (Small Family)">3-5 Travellers (Small Family)</option>
                      <option value="6+ Travellers (Private Group)">6+ Travellers (Private Group)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn-glass-gold w-full text-center justify-center mt-2"
                  >
                    <Send className="w-4 h-4 text-[#073F27]" />
                    <span>Send Booking Request</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="btn-glass-whatsapp w-full text-center justify-center text-xs mt-1"
                  >
                    <MessageCircle className="w-4 h-4 text-[#042617]" />
                    <span>Direct WhatsApp Chat</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
