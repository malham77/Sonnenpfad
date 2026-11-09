import React, { useState } from "react";
import { Star, X, Check, Award, Heart, ShieldCheck, MapPin, User, Compass } from "lucide-react";
import { useCms } from "../context/CmsContext";

export const CustomerReviewModal: React.FC = () => {
  const { isReviewModalOpen, closeReviewModal, addCustomerReview, safaris } = useCms();

  const [author, setAuthor] = useState("");
  const [country, setCountry] = useState("");
  const [tourName, setTourName] = useState(safaris[0]?.title || "East Africa Safari Expedition");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [wildlifeScore, setWildlifeScore] = useState(98);
  const [guideScore, setGuideScore] = useState(100);
  const [lodgingScore, setLodgingScore] = useState(95);
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isReviewModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    const overall = Math.round((wildlifeScore + guideScore + lodgingScore) / 3);

    addCustomerReview({
      author: author.trim(),
      country: country.trim() || "International Guest",
      tourName: tourName.trim(),
      rating,
      overallScore: overall,
      wildlifeScore,
      guideScore,
      lodgingScore,
      content: content.trim()
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closeReviewModal();
      setAuthor("");
      setContent("");
      setCountry("");
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-[#171A17] border border-[#D99A00]/40 rounded-3xl shadow-2xl overflow-hidden my-8 text-[#F7F4EC]">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#073F27] via-[#042617] to-[#101210] border-b border-[#D99A00]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D99A00]/20 border border-[#D99A00] flex items-center justify-center text-[#F4B41A]">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#F4B41A]">
                Sonnenpfad Traveller Community
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#F7F4EC] leading-tight">
                Rate & Review Your Safari Service
              </h3>
            </div>
          </div>

          <button
            onClick={closeReviewModal}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-[#F7F4EC] flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close review dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366] text-[#25D366] flex items-center justify-center animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-editorial text-2xl font-bold text-[#F4B41A]">
              Thank You! Your Review Is Published Live
            </h4>
            <p className="text-sm text-[#F7F4EC]/80 max-w-md">
              Your feedback and ratings have been saved directly to our database and are now live on the Sonnenpfad website.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Star Rating Interactive Selector */}
            <div className="p-4 bg-[#101210] border border-[#D99A00]/30 rounded-2xl text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F4B41A] block">
                Overall Rating
              </span>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 text-3xl sm:text-4xl transition-transform hover:scale-125 cursor-pointer focus:outline-none"
                    aria-label={`${star} Stars`}
                  >
                    <Star
                      className={`w-7 h-7 sm:w-9 sm:h-9 ${
                        (hoverRating || rating) >= star
                          ? "text-[#F4B41A] fill-[#F4B41A]"
                          : "text-white/20"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#F7F4EC]/70 font-medium">
                {rating === 5 && "★★★★★ Exceptional 5-Star East African Journey"}
                {rating === 4 && "★★★★ Very Good Safari"}
                {rating === 3 && "★★★ Satisfactory"}
                {rating < 3 && "Could Be Improved"}
              </p>
            </div>

            {/* Score Breakdown Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[#101210] border border-white/10 rounded-xl space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-[#F7F4EC]/80">Wildlife & Primates</span>
                  <span className="text-[#F4B41A] font-mono">{wildlifeScore}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="100"
                  value={wildlifeScore}
                  onChange={(e) => setWildlifeScore(Number(e.target.value))}
                  className="w-full accent-[#F4B41A] cursor-pointer"
                />
              </div>

              <div className="p-3 bg-[#101210] border border-white/10 rounded-xl space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-[#F7F4EC]/80">Guide & Driver</span>
                  <span className="text-[#F4B41A] font-mono">{guideScore}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="100"
                  value={guideScore}
                  onChange={(e) => setGuideScore(Number(e.target.value))}
                  className="w-full accent-[#F4B41A] cursor-pointer"
                />
              </div>

              <div className="p-3 bg-[#101210] border border-white/10 rounded-xl space-y-1">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-[#F7F4EC]/80">Lodging & Comfort</span>
                  <span className="text-[#F4B41A] font-mono">{lodgingScore}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="100"
                  value={lodgingScore}
                  onChange={(e) => setLodgingScore(Number(e.target.value))}
                  className="w-full accent-[#F4B41A] cursor-pointer"
                />
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-[#D99A00] uppercase mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena & Marcus Weber"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-[#101210] border border-white/15 rounded-xl px-3 py-2 text-xs text-[#F7F4EC] focus:outline-none focus:border-[#F4B41A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#D99A00] uppercase mb-1">
                  Your Home Country / City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Zurich, Switzerland / Uganda"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-[#101210] border border-white/15 rounded-xl px-3 py-2 text-xs text-[#F7F4EC] focus:outline-none focus:border-[#F4B41A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#D99A00] uppercase mb-1">
                Safari Tour or Service Experienced *
              </label>
              <select
                value={tourName}
                onChange={(e) => setTourName(e.target.value)}
                className="w-full bg-[#101210] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-[#F7F4EC] focus:outline-none focus:border-[#F4B41A]"
              >
                {safaris.map((s) => (
                  <option key={s.id} value={s.title} className="bg-[#101210] text-[#F7F4EC]">
                    {s.title}
                  </option>
                ))}
                <option value="Custom East Africa Expedition" className="bg-[#101210] text-[#F7F4EC]">
                  Custom East Africa Expedition (Tailored)
                </option>
                <option value="Specialty Coffee Roastery & Tasting" className="bg-[#101210] text-[#F7F4EC]">
                  Specialty Coffee Roastery & Tasting
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-[#D99A00] uppercase mb-1">
                Your Review & Comments *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Share your experience about the wildlife, mountain gorillas, driver-guide, vehicle comfort, and lodges..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-[#101210] border border-white/15 rounded-xl px-3 py-2 text-xs text-[#F7F4EC] focus:outline-none focus:border-[#F4B41A] resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={closeReviewModal}
                className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#F7F4EC]/70 hover:text-white border border-white/20 transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn-glass-gold py-2.5 px-6 shadow-xl"
              >
                <Check className="w-4 h-4 text-[#073F27]" />
                <span>Submit & Publish Review</span>
              </button>
            </div>

            <p className="text-[11px] text-center text-[#F7F4EC]/60 flex items-center justify-center gap-1.5 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Reviews are saved into our live database and immediately displayed across the site.</span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
