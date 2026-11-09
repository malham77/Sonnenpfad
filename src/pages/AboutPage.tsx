import React from "react";
import { useCms } from "../context/CmsContext";
import { Compass, ShieldCheck, HeartHandshake, Trees, Users, ArrowRight, MessageCircle } from "lucide-react";

interface AboutPageProps {
  onPlanClick: () => void;
  onContactClick: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onPlanClick, onContactClick }) => {
  const { story, brandSettings } = useCms();

  const values = [
    {
      title: "Wildlife Conservation",
      desc: "Strict adherence to distance limits and habituation protocols that safeguard endangered mountain gorillas and chimpanzees."
    },
    {
      title: "Protected Areas",
      desc: "Direct partnership with Uganda Wildlife Authority (UWA) rangers and East African park wardens on the conservation front lines."
    },
    {
      title: "Local Communities",
      desc: "Supporting indigenous Batwa, Karamojong and Maasai community cooperatives through fair employment and ethical cultural tourism."
    },
    {
      title: "Natural Environments",
      desc: "Strict leave-no-trace discipline, energy-efficient safari lodges, and eliminating single-use plastics on all game drives."
    }
  ];

  return (
    <div className="min-h-screen bg-[#171A17] text-[#F7F4EC] pt-24 pb-20">
      {/* Hero Banner with Fancy Background and Readable Text */}
      <section className="relative h-[60vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-zoom-bg"
          style={{ backgroundImage: `url('${brandSettings.introImage}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#171A17] via-[#073F27]/85 to-black/75" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-4 animate-slide-up">
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="h-px w-8 bg-[#D99A00]" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-[#F4B41A]">
              Our Heritage & Vision
            </span>
            <span className="h-px w-8 bg-[#D99A00]" />
          </div>

          <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-bold text-[#F7F4EC] leading-tight">
            The Sun Path to Discovery
          </h1>

          <p className="text-base sm:text-lg text-[#F7F4EC]/85 font-light max-w-2xl mx-auto leading-relaxed">
            Sonnenpfad means "sun path". We believe every journey across Uganda and East Africa should illuminate the spirit of genuine discovery.
          </p>
        </div>
      </section>

      {/* Main Story & East Africa Scope */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 animate-slide-left">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D99A00] block">
              The Sonnenpfad Philosophy
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#F7F4EC] leading-tight">
              {story.headline}
            </h2>

            <p className="text-sm sm:text-base text-[#F7F4EC]/85 font-light leading-relaxed">
              {story.mainStory}
            </p>

            <div className="p-6 bg-[#101210] border-l-2 border-[#F4B41A] my-6 space-y-2">
              <h3 className="font-editorial text-xl font-bold text-[#F4B41A]">
                Our East African Horizon
              </h3>
              <p className="text-xs sm:text-sm text-[#F7F4EC]/80 leading-relaxed font-light">
                {story.eastAfricaScope}
              </p>
            </div>

            <p className="text-sm sm:text-base text-[#F7F4EC]/85 font-light leading-relaxed">
              {story.philosophy}
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={onPlanClick}
                className="px-8 py-3.5 bg-[#D99A00] hover:bg-[#F4B41A] text-[#073F27] text-xs font-bold uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
              >
                Plan Your Safari
              </button>
              <button
                onClick={onContactClick}
                className="px-6 py-3.5 border border-[#D99A00]/50 text-[#F7F4EC] text-xs font-semibold uppercase tracking-wider hover:border-[#F4B41A] cursor-pointer"
              >
                Contact Our Team
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative animate-slide-right">
            <div className="relative h-[480px] w-full overflow-hidden border-2 border-[#D99A00]/30 shadow-2xl">
              <img
                src={brandSettings.sunsetBgImage}
                alt="Uganda sunset savannah"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101210] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#073F27]/90 border border-[#D99A00]/40">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#F4B41A] block mb-1">
                  East Africa Operations
                </span>
                <p className="text-xs text-[#F7F4EC]/90 font-light">
                  Headquartered in Uganda with private flight corridors into Kenya's Masai Mara and Tanzania's Serengeti.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible Tourism */}
      <section className="py-20 bg-[#101210] border-t border-[#D99A00]/25">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#25D366] block mb-2">
              Responsible Tourism
            </span>
            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#F7F4EC]">
              Travel With Purpose & Reverence
            </h2>
            <p className="text-xs sm:text-sm text-[#F7F4EC]/75 font-light mt-2">
              We operate safaris that actively protect wildlife habitats and directly enrich local African host communities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="bg-[#171A17] border border-[#D99A00]/25 p-6 space-y-3 hover:border-[#D99A00] transition-colors"
              >
                <div className="text-xs font-mono text-[#D99A00]">0{i + 1}</div>
                <h3 className="font-editorial text-xl font-bold text-[#F7F4EC]">
                  {v.title}
                </h3>
                <p className="text-xs text-[#F7F4EC]/75 font-light leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center flex flex-wrap items-center justify-center gap-4">
            <button onClick={onPlanClick} className="btn-glass-gold py-4 px-8">
              <span>Plan Your African Safari</span>
              <ArrowRight className="w-4 h-4 text-[#073F27]" />
            </button>
            <button onClick={onContactClick} className="btn-glass-forest py-4 px-8">
              <span>Contact Our Safari Architects</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
