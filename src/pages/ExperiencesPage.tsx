import React from "react";
import { EXPERIENCES, ExperienceItem } from "../data/experiencesData";
import { ArrowRight, Compass, Sparkles, Check } from "lucide-react";

interface ExperiencesPageProps {
  onRequestQuote: (expTitle: string) => void;
}

export const ExperiencesPage: React.FC<ExperiencesPageProps> = ({ onRequestQuote }) => {
  return (
    <div className="min-h-screen bg-[#171A17] text-[#F7F4EC] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-[#D99A00]" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#F4B41A]">
              Beyond the Ordinary Safari
            </span>
            <span className="h-px w-6 bg-[#D99A00]" />
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-[#F7F4EC] leading-tight mb-3">
            Experience Uganda Differently
          </h1>
          <p className="text-xs sm:text-sm text-[#F7F4EC]/75 font-light leading-relaxed">
            Every wildlife encounter is an intimate connection. Explore our collection of private experiences across Uganda's ancient rainforests, waterways, and local communities.
          </p>
        </div>

        {/* Experiences List */}
        <div className="space-y-16">
          {EXPERIENCES.map((exp, idx) => {
            const isReverse = idx % 2 === 1;
            return (
              <div
                key={exp.id}
                className="bg-[#101210] border border-[#D99A00]/30 overflow-hidden shadow-2xl"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isReverse ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Visual Image */}
                  <div className={`lg:col-span-6 relative h-[380px] w-full overflow-hidden ${isReverse ? "lg:order-2" : ""}`}>
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101210] via-transparent to-transparent opacity-60" />
                    <div className="absolute top-4 left-4 bg-[#073F27]/90 text-[#F4B41A] text-xs font-bold px-3 py-1 border border-[#D99A00]/40">
                      {exp.tag}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`lg:col-span-6 p-8 lg:p-12 space-y-4 ${isReverse ? "lg:order-1" : ""}`}>
                    <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D99A00] block">
                      {exp.title}
                    </span>
                    <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#F7F4EC]">
                      {exp.headline}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#F7F4EC]/80 font-light leading-relaxed">
                      {exp.copy}
                    </p>

                    <div className="pt-2 border-t border-[#D99A00]/20 space-y-2">
                      <span className="text-[11px] font-semibold text-[#F4B41A] uppercase tracking-wider block">
                        What to Expect:
                      </span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F7F4EC]/75">
                        {exp.keyDetails.map((kd, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3.5 h-3.5 text-[#25D366] shrink-0 mt-0.5" />
                            <span>{kd}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => onRequestQuote(exp.title)}
                        className="px-6 py-3 bg-[#073F27] hover:bg-[#0a4d30] text-[#F7F4EC] text-xs font-semibold uppercase tracking-wider border border-[#D99A00] transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <span>{exp.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#F4B41A]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
