import React, { useState } from "react";
import { DESTINATIONS, Destination } from "../data/destinationsData";
import { MapPin, Compass, ArrowRight, Mountain, Trees, Waves, Sparkles } from "lucide-react";

interface InteractiveUgandaMapProps {
  onSelectDestination?: (dest: Destination) => void;
  onRequestQuote?: (destName: string) => void;
}

export const InteractiveUgandaMap: React.FC<InteractiveUgandaMapProps> = ({
  onSelectDestination,
  onRequestQuote
}) => {
  const [selectedId, setSelectedId] = useState<string>("dest-bwindi");
  const selectedDest = DESTINATIONS.find((d) => d.id === selectedId) || DESTINATIONS[0];

  return (
    <div className="w-full bg-[#101210] border border-[#D99A00]/20 rounded-none p-6 md:p-10 my-10">
      <div className="flex flex-col lg:flex-row gap-10 items-stretch">
        {/* LEFT / TOP: Stylized Uganda Map Viewport */}
        <div className="flex-1 relative min-h-[460px] md:min-h-[560px] bg-[#073F27]/20 border border-[#D99A00]/30 overflow-hidden flex items-center justify-center p-4">
          {/* Subtle Map Grid lines */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(217, 154, 0, 0.2) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(217, 154, 0, 0.2) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px"
            }}
          />

          {/* Map Compass Rose Watermark */}
          <div className="absolute top-6 right-6 pointer-events-none flex flex-col items-center opacity-30">
            <Compass className="w-10 h-10 text-[#D99A00]" />
            <span className="text-[10px] tracking-widest text-[#F7F4EC] uppercase mt-1">N</span>
          </div>

          {/* Stylized SVG Map of Uganda */}
          <svg
            viewBox="0 0 600 620"
            className="w-full h-full max-h-[520px] select-none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="ugandaFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#073F27" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#0a4d30" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#042617" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0f3443" />
                <stop offset="100%" stopColor="#1a535c" />
              </linearGradient>
              <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Uganda Country Boundary Path (Stylized accurate geometry) */}
            <path
              d="
                M 190 60 
                C 240 45, 340 40, 430 70 
                C 490 90, 520 150, 490 220 
                C 475 255, 450 300, 470 360 
                C 490 410, 480 470, 410 490 
                C 380 500, 340 505, 300 505
                C 230 505, 170 570, 110 580 
                C 80 575, 75 520, 95 480 
                C 115 440, 110 390, 125 340 
                C 140 280, 150 200, 130 160 
                C 115 130, 140 80, 190 60 
                Z
              "
              fill="url(#ugandaFill)"
              stroke="#D99A00"
              strokeWidth="1.8"
              strokeDasharray="none"
              className="transition-all duration-500"
            />

            {/* Lake Victoria (South / Southeast) */}
            <path
              d="
                M 340 505 
                C 410 490, 490 490, 510 560 
                C 460 610, 360 610, 310 570 
                C 310 535, 330 515, 340 505 
                Z
              "
              fill="url(#waterGrad)"
              opacity="0.6"
              stroke="#2a7b88"
              strokeWidth="1.2"
            />
            <text x="390" y="555" fill="#a4d7dc" fontSize="11" fontStyle="italic" opacity="0.8">
              Lake Victoria
            </text>

            {/* Lake Albert (Northwest edge) */}
            <path
              d="M 170 230 C 190 270, 175 320, 150 350 C 140 330, 145 280, 160 240 Z"
              fill="url(#waterGrad)"
              opacity="0.6"
              stroke="#2a7b88"
              strokeWidth="1"
            />
            <text x="110" y="290" fill="#a4d7dc" fontSize="10" fontStyle="italic" opacity="0.7">
              Lake Albert
            </text>

            {/* River Nile flow path (Murchison Falls to Lake Albert & Jinja) */}
            <path
              d="M 370 470 C 350 400, 320 350, 240 270 C 210 240, 190 240, 170 250"
              stroke="#38a3a5"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              fill="none"
              opacity="0.7"
            />
            <text x="270" y="325" fill="#38a3a5" fontSize="10" fontStyle="italic" opacity="0.8">
              The River Nile
            </text>

            {/* Safari Path Circuit Line Connecting Core Parks */}
            <path
              d="
                M 350 460 
                L 240 220 
                L 190 340 
                L 155 420 
                L 140 530 
                L 270 480 
                Z
              "
              stroke="#D99A00"
              strokeWidth="1"
              strokeDasharray="5 4"
              opacity="0.45"
              fill="none"
            />

            {/* Interactive Location Markers */}
            {DESTINATIONS.map((dest) => {
              // Convert coords from percentage to SVG viewport [600, 620]
              const px = (dest.mapCoords.x / 100) * 600;
              const py = (dest.mapCoords.y / 100) * 620;
              const isSelected = dest.id === selectedId;

              return (
                <g
                  key={dest.id}
                  onClick={() => setSelectedId(dest.id)}
                  className="cursor-pointer group"
                >
                  {/* Selection Pulse Ring */}
                  {isSelected && (
                    <circle
                      cx={px}
                      cy={py}
                      r="16"
                      stroke="#F4B41A"
                      strokeWidth="1.5"
                      fill="none"
                      className="animate-ping opacity-60 origin-center"
                    />
                  )}

                  {/* Marker Outer Ring */}
                  <circle
                    cx={px}
                    cy={py}
                    r={isSelected ? "9" : "6"}
                    fill={isSelected ? "#F4B41A" : "#073F27"}
                    stroke={isSelected ? "#FFFFFF" : "#D99A00"}
                    strokeWidth="2"
                    className="transition-all duration-300 group-hover:scale-125"
                  />

                  {/* Inner Core */}
                  <circle
                    cx={px}
                    cy={py}
                    r={isSelected ? "4" : "2.5"}
                    fill={isSelected ? "#073F27" : "#F4B41A"}
                  />

                  {/* Marker Label */}
                  <text
                    x={px + 12}
                    y={py + 4}
                    fill={isSelected ? "#F4B41A" : "#F7F4EC"}
                    fontSize={isSelected ? "12" : "10"}
                    fontWeight={isSelected ? "700" : "500"}
                    letterSpacing="0.04em"
                    className="select-none transition-colors duration-200"
                    style={{ textShadow: "0 2px 4px rgba(0,0,0,0.8)" }}
                  >
                    {dest.name.replace(" National Park", "")}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Quick Legend at bottom of map */}
          <div className="absolute bottom-3 left-4 flex items-center gap-4 text-[11px] text-[#F7F4EC]/60 bg-[#101210]/80 px-3 py-1.5 border border-[#D99A00]/20">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F4B41A]" />
              <span>National Park</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 border-t border-dashed border-[#D99A00]" />
              <span>Safari Route</span>
            </div>
          </div>
        </div>

        {/* RIGHT / BOTTOM: Rich Selected Destination Detail Inspector */}
        <div className="w-full lg:w-[420px] flex flex-col justify-between bg-[#171A17] border border-[#D99A00]/30 p-6">
          <div>
            {/* Visual Header */}
            <div className="relative h-48 w-full overflow-hidden mb-5 border border-[#D99A00]/20">
              <img
                src={selectedDest.image}
                alt={selectedDest.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171A17] via-transparent to-black/20" />
              <div className="absolute top-3 right-3 bg-[#073F27]/90 text-[#F4B41A] text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 border border-[#D99A00]/40">
                {selectedDest.region}
              </div>
            </div>

            {/* Destination Name & Tagline */}
            <div className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D99A00] mb-1">
              Destination Spotlight
            </div>
            <h3 className="font-editorial text-2xl font-bold text-[#F7F4EC] leading-tight mb-1">
              {selectedDest.name}
            </h3>
            <p className="text-sm italic text-[#F4B41A] mb-3">
              "{selectedDest.tagline}"
            </p>

            {/* Description */}
            <p className="text-xs md:text-sm text-[#F7F4EC]/80 leading-relaxed mb-4">
              {selectedDest.description}
            </p>

            {/* Best For Tags (Clean inline text without pills per constitution) */}
            <div className="mb-4">
              <span className="text-[11px] font-semibold tracking-wider text-[#D99A00] uppercase block mb-1.5">
                Key Experiences
              </span>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#F7F4EC]/90">
                {selectedDest.bestFor.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span>{tag}</span>
                    {idx < selectedDest.bestFor.length - 1 && (
                      <span className="text-[#D99A00]" aria-hidden="true">·</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Highlights List */}
            <div className="mb-6">
              <span className="text-[11px] font-semibold tracking-wider text-[#D99A00] uppercase block mb-1.5">
                Highlights
              </span>
              <ul className="space-y-1.5 text-xs text-[#F7F4EC]/75">
                {selectedDest.keyHighlights.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-[#F4B41A] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[#D99A00]/20 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => {
                if (onSelectDestination) {
                  onSelectDestination(selectedDest);
                } else if (onRequestQuote) {
                  onRequestQuote(selectedDest.name);
                }
              }}
              className="flex-1 py-3 px-4 bg-[#073F27] hover:bg-[#0a4d30] text-[#F7F4EC] text-xs font-semibold uppercase tracking-wider border border-[#D99A00]/50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Destination</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F4B41A]" />
            </button>

            <button
              onClick={() => onRequestQuote && onRequestQuote(selectedDest.name)}
              className="py-3 px-4 bg-transparent hover:bg-[#F7F4EC]/10 text-[#F4B41A] text-xs font-semibold uppercase tracking-wider border border-[#D99A00]/40 transition-colors cursor-pointer"
            >
              Request Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
