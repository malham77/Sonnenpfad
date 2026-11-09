import React from "react";
import { CustomSafariBuilder } from "../components/CustomSafariBuilder";
import { useCms } from "../context/CmsContext";
import { Compass, Sparkles, MessageCircle, ShieldCheck, Clock, Users } from "lucide-react";

export const PlanSafariPage: React.FC = () => {
  const { brandSettings } = useCms();

  return (
    <div className="min-h-screen bg-[#171A17] text-[#F7F4EC] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="h-px w-6 bg-[#D99A00]" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#F4B41A]">
              Bespoke Journey Designer
            </span>
            <span className="h-px w-6 bg-[#D99A00]" />
          </div>
          <h1 className="font-editorial text-4xl sm:text-6xl font-bold text-[#F7F4EC] leading-tight mb-3">
            Design Your Tailor-Made Safari
          </h1>
          <p className="text-xs sm:text-sm text-[#F7F4EC]/75 font-light leading-relaxed">
            Every traveller has different passions. Whether you dream of silent mountain gorilla encounters, chasing tree-climbing lions in Ishasha, or witnessing the Great Migration across Kenya and Tanzania, our 6-step planner configures your bespoke journey.
          </p>
        </div>

        {/* Builder Component */}
        <div className="mb-16">
          <CustomSafariBuilder />
        </div>

        {/* Helpful Travel Notes Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#101210] border border-[#D99A00]/25 p-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#F4B41A]">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Permit Guidance</span>
            </div>
            <p className="text-xs text-[#F7F4EC]/75 leading-relaxed font-light">
              Gorilla permits ($800) and Chimpanzee permits in Kibale are strictly limited. We advise booking 3–6 months in advance for peak dry seasons.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#D99A00]">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Optimal Timing</span>
            </div>
            <p className="text-xs text-[#F7F4EC]/75 leading-relaxed font-light">
              Uganda is a year-round destination on the equator. June–September and December–February provide the driest forest trails and clear game viewing.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#25D366]">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Fast WhatsApp Replies</span>
            </div>
            <p className="text-xs text-[#F7F4EC]/75 leading-relaxed font-light">
              Prefer to talk to a human directly? Reach out to Sonnenpfad Safaris on WhatsApp at {brandSettings.whatsapp} for immediate advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
