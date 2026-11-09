import React from "react";
import { ContactSection } from "../components/ContactSection";
import { useCms } from "../context/CmsContext";
import { Phone, Mail, MapPin, MessageCircle, Clock, ShieldCheck } from "lucide-react";

interface ContactPageProps {
  initialSubject?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ initialSubject }) => {
  const { brandSettings } = useCms();

  const handleWhatsApp = (text?: string) => {
    const msg = encodeURIComponent(
      text || `Hello Sonnenpfad Safaris (${brandSettings.brandName}), I would like to plan an East African safari.`
    );
    window.open(`https://wa.me/${brandSettings.whatsapp.replace(/[^0-9]/g, "")}?text=${msg}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#171A17] text-[#F7F4EC] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-[#D99A00]" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#F4B41A]">
              Connect With Sonnenpfad
            </span>
            <span className="h-px w-6 bg-[#D99A00]" />
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-[#F7F4EC] leading-tight mb-3">
            Let's Plan Your African Journey
          </h1>
          <p className="text-xs sm:text-sm text-[#F7F4EC]/75 font-light leading-relaxed">
            Your next adventure begins with a simple conversation. Speak directly with our Uganda and East Africa safari architects.
          </p>
        </div>

        {/* Contact Component with Form */}
        <div className="mb-16">
          <ContactSection
            initialSubject={initialSubject}
            onWhatsAppClick={(msg) => handleWhatsApp(msg)}
          />
        </div>

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#101210] border border-[#D99A00]/25 p-8">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-[#F4B41A] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F7F4EC] mb-1">
                Fast Response Time
              </h4>
              <p className="text-xs text-[#F7F4EC]/70">
                Inquiries via form or email are answered within 24 hours. WhatsApp receives immediate real-time replies.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F7F4EC] mb-1">
                Verified Safari Operator
              </h4>
              <p className="text-xs text-[#F7F4EC]/70">
                Sonnenpfad Safaris Uganda Ltd is an officially registered Ugandan company operating across East Africa.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-[#D99A00] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F7F4EC] mb-1">
                Direct WhatsApp Helpline
              </h4>
              <p className="text-xs text-[#F7F4EC]/70">
                Save <strong>{brandSettings.whatsapp}</strong> in your phone for instant safari advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
