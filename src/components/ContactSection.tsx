import React, { useState } from "react";
import { MessageCircle, Phone, Mail, MapPin, Send, Check } from "lucide-react";

interface ContactSectionProps {
  initialSubject?: string;
  onWhatsAppClick: (customText?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialSubject,
  onWhatsAppClick
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    email: "",
    phoneWhatsApp: "",
    travelDates: "",
    numberOfTravellers: "2 travellers",
    safariInterests: initialSubject || "Gorilla Trekking & Savannah Wildlife",
    approximateDuration: "7–10 days",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [inquiryRef, setInquiryRef] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = "SP-" + Math.floor(100000 + Math.random() * 900000);
    setInquiryRef(ref);
    setSubmitted(true);

    // Save locally
    try {
      const existing = JSON.parse(localStorage.getItem("sonnenpfad_contact_messages") || "[]");
      existing.unshift({ ref, date: new Date().toISOString(), ...formData });
      localStorage.setItem("sonnenpfad_contact_messages", JSON.stringify(existing));
    } catch {
      // Ignore
    }
  };

  const handleSendViaWhatsApp = () => {
    const text =
      `Hello Sonnenpfad Safaris Ltd,\n\n` +
      `I would like to enquire about a Uganda Safari:\n` +
      `• Name: ${formData.fullName || "Prospective Traveller"}\n` +
      `• Country: ${formData.country || "Not specified"}\n` +
      `• Email: ${formData.email || "Not specified"}\n` +
      `• WhatsApp/Phone: ${formData.phoneWhatsApp || "Not specified"}\n` +
      `• Travel Dates: ${formData.travelDates || "Flexible"}\n` +
      `• Travellers: ${formData.numberOfTravellers}\n` +
      `• Interests: ${formData.safariInterests}\n` +
      `• Duration: ${formData.approximateDuration}\n` +
      (formData.message ? `• Message: ${formData.message}\n` : "") +
      `\nPlease get in touch with recommended itineraries and a quote. Thank you!`;

    onWhatsAppClick(text);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Direct Agency Information & WhatsApp Priority */}
        <div className="lg:col-span-5 space-y-8 bg-[#101210] border border-[#D99A00]/30 p-8">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D99A00] block mb-2">
              Uganda Safari Headquarters
            </span>
            <h3 className="font-editorial text-3xl font-bold text-[#F7F4EC] leading-tight mb-2">
              Sonnenpfad Safaris Uganda Ltd
            </h3>
            <p className="text-xs sm:text-sm text-[#F7F4EC]/80 font-light leading-relaxed">
              Your next adventure may begin with a simple conversation. Whether you already know exactly where you want to go or need help choosing the right itinerary, contact Sonnenpfad Safaris Uganda Ltd and start planning your journey through the Pearl of Africa.
            </p>
          </div>

          {/* Quick WhatsApp Action Box */}
          <div className="bg-[#073F27]/30 border border-[#D99A00]/40 p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#25D366] text-[#042617] flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F4B41A] block">
                  Fastest Communication Route
                </span>
                <span className="text-sm font-semibold text-[#F7F4EC]">
                  WhatsApp Direct Concierge
                </span>
              </div>
            </div>

            <p className="text-xs text-[#F7F4EC]/75 leading-relaxed">
              Message us directly on WhatsApp for real-time answers to your Uganda travel questions, permit checks, or quick quotes.
            </p>

            <button
              onClick={() => handleSendViaWhatsApp()}
              className="btn-glass-whatsapp w-full text-center justify-center text-xs py-3.5"
            >
              <MessageCircle className="w-4 h-4 text-[#042617]" />
              <span>Message +256 773 333108</span>
            </button>
          </div>

          {/* Direct Details */}
          <div className="space-y-4 text-xs sm:text-sm text-[#F7F4EC]/85 pt-2">
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#D99A00] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-[#F7F4EC]">Telephone / WhatsApp</span>
                <a href="tel:+256773333108" className="hover:text-[#F4B41A] transition-colors">
                  +256 773 333108
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#D99A00] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-[#F7F4EC]">Official Email Inquiries</span>
                <span className="text-[#F7F4EC]/75">info@sonnenpfadsafaris.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#D99A00] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-[#F7F4EC]">Operating Location</span>
                <span className="text-[#F7F4EC]/75">Entebbe / Kampala, Uganda</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Complete Safari Enquiry Form */}
        <div className="lg:col-span-7 bg-[#101210] border border-[#D99A00]/30 p-8 sm:p-10">
          {submitted ? (
            <div className="text-center py-10 space-y-5">
              <div className="w-16 h-16 bg-[#073F27] border border-[#D99A00] flex items-center justify-center mx-auto text-[#F4B41A]">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-editorial text-3xl font-bold text-[#F7F4EC]">
                Safari Enquiry Submitted
              </h3>
              <p className="text-xs sm:text-sm text-[#F7F4EC]/80 max-w-md mx-auto">
                Thank you, <strong>{formData.fullName}</strong>. Your enquiry (Ref:{" "}
                <span className="font-mono text-[#F4B41A]">{inquiryRef}</span>) has been recorded. Our safari planners will reach back within 24 hours.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => handleSendViaWhatsApp()}
                  className="w-full sm:w-auto px-6 py-3 bg-[#25D366] text-[#042617] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send copy to WhatsApp</span>
                </button>

                <button
                  onClick={() => setSubmitted(false)}
                  className="w-full sm:w-auto px-6 py-3 border border-[#D99A00]/40 text-[#F7F4EC] text-xs font-semibold uppercase tracking-wider hover:border-[#F4B41A] cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="border-b border-[#D99A00]/20 pb-4 mb-2">
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D99A00] block mb-1">
                  Enquiry Form
                </span>
                <h3 className="font-editorial text-2xl font-bold text-[#F7F4EC]">
                  Request a Tailor-Made Safari Proposal
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#D99A00] uppercase mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Mueller"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-[#171A17] border border-[#D99A00]/30 px-4 py-3 text-sm text-[#F7F4EC] focus:border-[#F4B41A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D99A00] uppercase mb-1">
                    Country of Residence *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Germany, Switzerland, USA"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full bg-[#171A17] border border-[#D99A00]/30 px-4 py-3 text-sm text-[#F7F4EC] focus:border-[#F4B41A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D99A00] uppercase mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. david@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#171A17] border border-[#D99A00]/30 px-4 py-3 text-sm text-[#F7F4EC] focus:border-[#F4B41A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D99A00] uppercase mb-1">
                    WhatsApp / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+49 170 1234567"
                    value={formData.phoneWhatsApp}
                    onChange={(e) => setFormData({ ...formData, phoneWhatsApp: e.target.value })}
                    className="w-full bg-[#171A17] border border-[#D99A00]/30 px-4 py-3 text-sm text-[#F7F4EC] focus:border-[#F4B41A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D99A00] uppercase mb-1">
                    Approximate Travel Dates
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. August 2027 or flexible"
                    value={formData.travelDates}
                    onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                    className="w-full bg-[#171A17] border border-[#D99A00]/30 px-4 py-3 text-sm text-[#F7F4EC] focus:border-[#F4B41A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D99A00] uppercase mb-1">
                    Number of Travellers
                  </label>
                  <select
                    value={formData.numberOfTravellers}
                    onChange={(e) => setFormData({ ...formData, numberOfTravellers: e.target.value })}
                    className="w-full bg-[#171A17] border border-[#D99A00]/30 px-4 py-3 text-sm text-[#F7F4EC] focus:border-[#F4B41A] focus:outline-none"
                  >
                    <option value="1 Solo Traveller">1 Solo Traveller</option>
                    <option value="2 travellers (Couple / Pair)">2 Travellers (Couple / Pair)</option>
                    <option value="3-4 travellers (Small Group / Family)">3–4 Travellers (Small Group)</option>
                    <option value="5-8 travellers (Family / Friends)">5–8 Travellers</option>
                    <option value="9+ travellers (Private Charter)">9+ Travellers (Private Charter)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D99A00] uppercase mb-1">
                    Safari Interests
                  </label>
                  <input
                    type="text"
                    placeholder="Gorillas, Chimpanzees, Big 5, River Nile..."
                    value={formData.safariInterests}
                    onChange={(e) => setFormData({ ...formData, safariInterests: e.target.value })}
                    className="w-full bg-[#171A17] border border-[#D99A00]/30 px-4 py-3 text-sm text-[#F7F4EC] focus:border-[#F4B41A] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#D99A00] uppercase mb-1">
                    Approximate Duration
                  </label>
                  <select
                    value={formData.approximateDuration}
                    onChange={(e) => setFormData({ ...formData, approximateDuration: e.target.value })}
                    className="w-full bg-[#171A17] border border-[#D99A00]/30 px-4 py-3 text-sm text-[#F7F4EC] focus:border-[#F4B41A] focus:outline-none"
                  >
                    <option value="1–3 days">1–3 Days</option>
                    <option value="4–6 days">4–6 Days</option>
                    <option value="7–10 days">7–10 Days</option>
                    <option value="11–14 days">11–14 Days</option>
                    <option value="15+ days">15+ Days</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D99A00] uppercase mb-1">
                  Message / Special Wishes
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your expectations, preferred lodge level, dietary needs, or any specific wildlife you dream of seeing..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#171A17] border border-[#D99A00]/30 px-4 py-3 text-sm text-[#F7F4EC] focus:border-[#F4B41A] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  className="btn-glass-gold w-full sm:flex-1 py-4 text-xs"
                >
                  <Send className="w-4 h-4 text-[#073F27]" />
                  <span>Send Safari Enquiry</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSendViaWhatsApp()}
                  className="btn-glass-whatsapp w-full sm:w-auto px-7 py-4 text-xs"
                  title="Connect via WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-[#042617]" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
