import React from "react";
import { useCms } from "../context/CmsContext";

interface LogoProps {
  className?: string;
  variant?: "full" | "mark" | "stacked";
  size?: "sm" | "md" | "lg" | "xl";
  customLogoUrl?: string;
}

export const SonnenpfadLogo: React.FC<LogoProps> = ({
  className = "",
  variant = "full",
  size = "md",
  customLogoUrl
}) => {
  let cmsLogo = "/assets/aistudio/WhatsApp_Image_2026-09-29_at_21.35.55_c9561e3f.jpeg";
  try {
    const cms = useCms();
    if (cms?.brandSettings?.logoUrl) {
      cmsLogo = cms.brandSettings.logoUrl;
    }
  } catch {
    // fallback if outside context
  }

  const logoSrc = customLogoUrl || cmsLogo;

  const sizeClasses = {
    sm: "h-9 w-auto",
    md: "h-12 w-auto",
    lg: "h-16 w-auto",
    xl: "h-24 w-auto"
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Client Logo Emblem */}
      <div className="relative shrink-0 overflow-hidden rounded-full p-0.5 bg-gradient-to-tr from-[#D99A00] via-[#F4B41A] to-[#073F27] shadow-lg">
        <img
          src={logoSrc}
          alt="Sonnenpfad Safaris Uganda Ltd"
          className={`${sizeClasses[size]} aspect-square object-contain rounded-full bg-white transition-transform duration-500 hover:scale-105`}
          onError={(e) => {
            // Fallback to relative path if absolute asset path fails
            const target = e.currentTarget;
            if (!target.src.includes("public/")) {
              target.src = "/public/assets/aistudio/WhatsApp_Image_2026-09-29_at_21.35.55_c9561e3f.jpeg";
            }
          }}
        />
      </div>

      {/* Typography Wordmark if full variant */}
      {variant !== "mark" && (
        <div className="flex flex-col tracking-tight text-left">
          <span className="font-editorial text-lg md:text-xl font-bold tracking-wider text-[#F7F4EC] leading-none uppercase drop-shadow-sm">
            Sonnenpfad
          </span>
          <span className="text-[9px] md:text-[10px] tracking-[0.25em] text-[#D99A00] font-semibold uppercase mt-0.5">
            Safaris Uganda · East Africa
          </span>
        </div>
      )}
    </div>
  );
};
