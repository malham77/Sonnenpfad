import React, { useState } from "react";
import { useCms, TourReview } from "../context/CmsContext";
import { Star, MapPin, ChevronLeft, ChevronRight, CheckCircle2, Quote, Award, Plus, MessageSquare } from "lucide-react";

export const TopReviewsSection: React.FC = () => {
  const { reviews, openReviewModal } = useCms();
  const [activeIndex, setActiveIndex] = useState(0);

  if (!reviews || reviews.length === 0) return null;

  const current = reviews[activeIndex % reviews.length];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section id="reviews" className="py-24 bg-[#101210] relative overflow-hidden border-b border-[#D99A00]/25">
      {/* Background Accent glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#073F27]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top Header & Leave Review Trigger */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#F4B41A]" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#F4B41A]">
                East Africa Traveller Reviews ({reviews.length})
              </span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-5xl font-bold text-[#F7F4EC] leading-tight">
              What Our Guests Say About Sonnenpfad
            </h2>
          </div>

          {/* Action button to open CustomerReviewModal */}
          <button
            onClick={openReviewModal}
            className="btn-glass-gold text-xs py-3 px-6 shadow-xl shrink-0 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-[#073F27]" />
            <span>Rate & Leave a Review</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual guest photo with luxury glass border & rating */}
          <div className="lg:col-span-5 relative animate-slide-left">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#D99A00]/40 shadow-2xl bg-black">
              <img
                src={current.avatar}
                alt={current.author}
                className="w-full h-[460px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101210] via-black/30 to-transparent" />

              {/* Verified Guest Floating Pill */}
              <div className="absolute top-4 left-4 bg-[#073F27]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D99A00]/50 flex items-center gap-2 shadow-lg">
                <CheckCircle2 className="w-4 h-4 text-[#25D366]" />
                <span className="text-xs font-bold text-[#F7F4EC] tracking-wider uppercase">
                  {current.status || "Verified Guest"}
                </span>
              </div>

              {/* Overall Score Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#171A17]/90 backdrop-blur-xl border border-[#D99A00]/40 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-[#D99A00] uppercase tracking-wider block">
                    Satisfaction Index
                  </span>
                  <p className="text-xs text-[#F7F4EC]/80 font-medium">{current.tourName}</p>
                </div>
                <div className="text-right">
                  <span className="font-editorial text-3xl font-bold text-[#F4B41A]">
                    {current.overallScore}%
                  </span>
                  <span className="text-[10px] text-[#25D366] block font-mono">
                    {current.rating} ★★★★★
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Review Narrative & Score Breakdown */}
          <div className="lg:col-span-7 space-y-6 animate-slide-right">
            {/* Stars & Tour Name */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex text-[#F4B41A]">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-xs text-[#D99A00] font-semibold tracking-wider uppercase">
                {current.tourName}
              </span>
              <span className="text-xs text-[#F7F4EC]/50 font-mono">· {current.date}</span>
            </div>

            {/* Review Content */}
            <div className="relative pl-6 border-l-2 border-[#D99A00]/50">
              <Quote className="w-8 h-8 text-[#D99A00]/30 absolute -top-2 -left-4 -z-10" />
              <p className="text-base sm:text-xl text-[#F7F4EC]/90 font-light leading-relaxed italic">
                "{current.content}"
              </p>
            </div>

            <div>
              <h4 className="font-editorial text-2xl font-bold text-[#F7F4EC]">
                {current.author}
              </h4>
              <p className="text-xs text-[#D99A00] flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{current.country}</span>
              </p>
            </div>

            {/* Score Breakdown Bars */}
            <div className="pt-4 border-t border-[#D99A00]/25 space-y-3 max-w-lg">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F4B41A] block mb-2">
                Tour Review Score Breakdown
              </span>

              {/* Wildlife Encounter */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#F7F4EC]/80 font-medium">Wildlife & Primate Sighting</span>
                  <span className="font-mono text-[#F4B41A] font-bold">{current.wildlifeScore}%</span>
                </div>
                <div className="h-2 w-full bg-[#171A17] rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#D99A00] to-[#F4B41A] rounded-full transition-all duration-1000"
                    style={{ width: `${current.wildlifeScore}%` }}
                  />
                </div>
              </div>

              {/* Driver & Guide */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#F7F4EC]/80 font-medium">Driver-Guide Knowledge & Safety</span>
                  <span className="font-mono text-[#F4B41A] font-bold">{current.guideScore}%</span>
                </div>
                <div className="h-2 w-full bg-[#171A17] rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#D99A00] to-[#F4B41A] rounded-full transition-all duration-1000"
                    style={{ width: `${current.guideScore}%` }}
                  />
                </div>
              </div>

              {/* Lodging & Comfort */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#F7F4EC]/80 font-medium">Lodge Hospitality & Meals</span>
                  <span className="font-mono text-[#F4B41A] font-bold">{current.lodgingScore}%</span>
                </div>
                <div className="h-2 w-full bg-[#171A17] rounded-full overflow-hidden border border-white/10">
                  <div
                    className="h-full bg-gradient-to-r from-[#D99A00] to-[#F4B41A] rounded-full transition-all duration-1000"
                    style={{ width: `${current.lodgingScore}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Navigation Carousel Controls */}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-11 h-11 rounded-full bg-[#171A17] hover:bg-[#073F27] border border-[#D99A00]/40 text-[#F7F4EC] hover:text-[#F4B41A] flex items-center justify-center transition-all cursor-pointer shadow-md"
                  aria-label="Previous review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="w-11 h-11 rounded-full bg-[#171A17] hover:bg-[#073F27] border border-[#D99A00]/40 text-[#F7F4EC] hover:text-[#F4B41A] flex items-center justify-center transition-all cursor-pointer shadow-md"
                  aria-label="Next review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <span className="text-xs text-[#F7F4EC]/50 font-mono ml-2">
                  Review 0{activeIndex + 1} of 0{reviews.length}
                </span>
              </div>

              <button
                onClick={openReviewModal}
                className="text-xs text-[#F4B41A] hover:underline flex items-center gap-1 font-bold cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Add Your Review</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
