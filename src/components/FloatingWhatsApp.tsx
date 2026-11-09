import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

interface FloatingWhatsAppProps {
  onOpenDirect: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenDirect }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Subtle contextual tooltip on hover */}
      {showTooltip && (
        <div className="mb-2 bg-[#171A17]/95 backdrop-blur-xl border-2 border-[#D99A00]/50 text-[#F7F4EC] p-3.5 rounded-2xl shadow-2xl text-xs max-w-xs animate-slide-up">
          <p className="font-bold text-[#F4B41A] mb-0.5">Sonnenpfad Safari Concierge</p>
          <p className="text-[#F7F4EC]/85 font-light">Chat live with our Uganda & East Africa safari specialists.</p>
        </div>
      )}

      <button
        onClick={onOpenDirect}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#25D366] to-[#2BF778] text-[#042617] shadow-[0_8px_32px_rgba(37,211,102,0.5)] flex items-center justify-center border-2 border-white/60 transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer group"
        aria-label="Chat on WhatsApp +256 773 333108"
      >
        <MessageCircle className="w-8 h-8 text-[#042617] group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};
