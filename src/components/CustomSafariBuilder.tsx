import React, { useState } from "react";
import { Check, ArrowRight, ArrowLeft, Send, Sparkles, MessageCircle, Calendar, Users, HeartHandshake, Compass } from "lucide-react";

interface SafariBuilderProps {
  initialInterest?: string;
  onSuccess?: () => void;
}

export const CustomSafariBuilder: React.FC<SafariBuilderProps> = ({
  initialInterest,
  onSuccess
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [inquiryCode, setInquiryCode] = useState<string>("");

  // Form State
  const [interests, setInterests] = useState<string[]>(
    initialInterest ? [initialInterest] : ["Gorillas", "Wildlife"]
  );
  const [duration, setDuration] = useState<string>("7–10 days");
  const [travelStyle, setTravelStyle] = useState<string>("Luxury");
  const [travellers, setTravellers] = useState<string>("Couple");
  const [travelPeriod, setTravelPeriod] = useState<string>("Within 3–6 months");
  const [specialPeriodNote, setSpecialPeriodNote] = useState<string>("");
  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    country: "",
    email: "",
    phoneWhatsApp: "",
    specialRequirements: ""
  });

  const allInterests = [
    "Gorillas",
    "Chimpanzees",
    "Wildlife",
    "Birding",
    "Culture",
    "Hiking",
    "Photography",
    "Adventure",
    "Relaxation"
  ];

  const durations = [
    { label: "1–3 days", desc: "Short gorilla trek or weekend getaway" },
    { label: "4–6 days", desc: "Gorillas & savannah highlights" },
    { label: "7–10 days", desc: "Comprehensive primates & wildlife" },
    { label: "11–14 days", desc: "Grand expedition across major national parks" },
    { label: "15+ days", desc: "In-depth expedition & remote wilderness" }
  ];

  const travelStyles = [
    {
      label: "Luxury",
      desc: "Top-tier safari lodges, exclusive views, personal butler service, fine dining"
    },
    {
      label: "Premium",
      desc: "Handpicked 4-star boutique lodges, authentic character, wonderful comfort"
    },
    {
      label: "Comfort",
      desc: "High quality mid-range eco-lodges with private en-suite facilities"
    }
  ];

  const travellerTypes = [
    { label: "Solo", desc: "Independent traveller looking for personal adventure" },
    { label: "Couple", desc: "Romantic safari, honeymoon or shared expedition" },
    { label: "Family", desc: "Multi-generational travel with tailored activities" },
    { label: "Friends", desc: "Group of companions traveling together" },
    { label: "Private Group", desc: "Custom private charter expedition" }
  ];

  const toggleInterest = (item: string) => {
    if (interests.includes(item)) {
      if (interests.length > 1) {
        setInterests(interests.filter((i) => i !== item));
      }
    } else {
      setInterests([...interests, item]);
    }
  };

  const handleNext = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = "SP-" + Math.floor(100000 + Math.random() * 900000);
    setInquiryCode(code);
    setSubmitted(true);

    // Prepare WhatsApp Message
    const text = encodeURIComponent(
      `Hello Sonnenpfad Safaris Ltd,\n\nI have designed a custom safari plan on your website (Ref: ${code}):\n\n` +
      `• Primary Interests: ${interests.join(", ")}\n` +
      `• Desired Duration: ${duration}\n` +
      `• Travel Style: ${travelStyle}\n` +
      `• Group Type: ${travellers}\n` +
      `• Travel Period: ${travelPeriod} ${specialPeriodNote ? `(${specialPeriodNote})` : ""}\n` +
      `• Guest Name: ${contactInfo.fullName}\n` +
      `• Country: ${contactInfo.country}\n` +
      `• Email: ${contactInfo.email}\n` +
      `• WhatsApp / Phone: ${contactInfo.phoneWhatsApp}\n` +
      (contactInfo.specialRequirements ? `• Notes: ${contactInfo.specialRequirements}\n` : "") +
      `\nPlease review my preferences and provide a personalized safari proposal. Thank you!`
    );

    // Save to local storage for persistence
    try {
      const existing = JSON.parse(localStorage.getItem("sonnenpfad_inquiries") || "[]");
      existing.unshift({
        code,
        date: new Date().toISOString(),
        interests,
        duration,
        travelStyle,
        travellers,
        travelPeriod,
        contactInfo
      });
      localStorage.setItem("sonnenpfad_inquiries", JSON.stringify(existing));
    } catch {
      // Ignore storage errors
    }

    if (onSuccess) onSuccess();
  };

  const triggerDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Sonnenpfad Safaris Ltd (Ref: ${inquiryCode}):\n\n` +
      `I would like to follow up on my custom safari plan for ${interests.join(", ")} (${duration}, ${travelStyle} style, ${travellers}).\n` +
      `My Name: ${contactInfo.fullName} (${contactInfo.country})`
    );
    window.open(`https://wa.me/256773333108?text=${text}`, "_blank");
  };

  if (submitted) {
    return (
      <div className="bg-[#101210] border border-[#D99A00]/40 p-8 md:p-12 text-center max-w-2xl mx-auto my-8">
        <div className="w-16 h-16 bg-[#073F27] border border-[#D99A00] flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-[#F4B41A]" />
        </div>
        <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#D99A00] block mb-2">
          Safari Plan Received
        </span>
        <h3 className="font-editorial text-3xl md:text-4xl font-bold text-[#F7F4EC] mb-4">
          Your Ugandan Journey is Taking Shape
        </h3>
        <p className="text-sm md:text-base text-[#F7F4EC]/80 leading-relaxed mb-6">
          Thank you, <strong className="text-[#F7F4EC]">{contactInfo.fullName}</strong>. Our safari specialists at Sonnenpfad Safaris Uganda Ltd have received your bespoke request (Reference <strong className="text-[#F4B41A] font-mono">{inquiryCode}</strong>).
        </p>
        <p className="text-xs text-[#F7F4EC]/65 mb-8">
          We will review your selected interests ({interests.join(", ")}), desired {duration} duration, and prepare a personalized day-by-day proposal with accommodation options.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={triggerDirectWhatsApp}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-[#042617] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat via WhatsApp (+256 773 333108)</span>
          </button>

          <button
            onClick={() => {
              setSubmitted(false);
              setCurrentStep(1);
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-transparent hover:bg-[#F7F4EC]/10 text-[#F7F4EC] text-xs font-semibold uppercase tracking-wider border border-[#D99A00]/40 transition-all cursor-pointer"
          >
            Plan Another Safari
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#101210] border border-[#D99A00]/30 p-6 md:p-12 max-w-4xl mx-auto shadow-2xl">
      {/* Step Progress Tracker */}
      <div className="mb-10">
        <div className="flex items-center justify-between text-xs font-medium text-[#F7F4EC]/60 mb-3">
          <span>STEP {currentStep} OF 6</span>
          <span className="text-[#F4B41A]">
            {currentStep === 1 && "Your Travel Interests"}
            {currentStep === 2 && "Duration"}
            {currentStep === 3 && "Travel Style"}
            {currentStep === 4 && "Who is Traveling"}
            {currentStep === 5 && "Preferred Timing"}
            {currentStep === 6 && "Contact Details"}
          </span>
        </div>
        <div className="w-full h-1 bg-[#171A17] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#073F27] via-[#D99A00] to-[#F4B41A] transition-all duration-500 ease-out"
            style={{ width: `${(currentStep / 6) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      <form onSubmit={handleSubmit}>
        {/* STEP 1: Interests */}
        {currentStep === 1 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D99A00] block mb-1">
                Step 1: Focus of Your Safari
              </span>
              <h3 className="font-editorial text-2xl md:text-3xl font-bold text-[#F7F4EC]">
                What experiences excite you most about Uganda?
              </h3>
              <p className="text-xs text-[#F7F4EC]/70 mt-1">
                Select all that apply. We will seamlessly intertwine these into your journey.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {allInterests.map((interest) => {
                const isSelected = interests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`p-4 border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#073F27] border-[#F4B41A] text-[#F7F4EC]"
                        : "bg-[#171A17] border-[#D99A00]/20 text-[#F7F4EC]/75 hover:border-[#D99A00]/60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">{interest}</span>
                      {isSelected ? (
                        <Check className="w-4 h-4 text-[#F4B41A]" />
                      ) : (
                        <span className="w-4 h-4 border border-[#D99A00]/30" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Duration */}
        {currentStep === 2 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D99A00] block mb-1">
                Step 2: Safari Length
              </span>
              <h3 className="font-editorial text-2xl md:text-3xl font-bold text-[#F7F4EC]">
                How much time do you have in Uganda?
              </h3>
            </div>

            <div className="space-y-3">
              {durations.map((item) => {
                const isSelected = duration === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setDuration(item.label)}
                    className={`w-full p-4 border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#073F27] border-[#F4B41A] text-[#F7F4EC]"
                        : "bg-[#171A17] border-[#D99A00]/20 text-[#F7F4EC]/75 hover:border-[#D99A00]/60"
                    }`}
                  >
                    <div>
                      <div className="font-editorial text-lg font-bold text-[#F7F4EC]">{item.label}</div>
                      <div className="text-xs text-[#F7F4EC]/65">{item.desc}</div>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-[#F4B41A]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: Travel Style */}
        {currentStep === 3 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D99A00] block mb-1">
                Step 3: Comfort & Lodge Preference
              </span>
              <h3 className="font-editorial text-2xl md:text-3xl font-bold text-[#F7F4EC]">
                Which style of accommodation suits you best?
              </h3>
            </div>

            <div className="space-y-3">
              {travelStyles.map((item) => {
                const isSelected = travelStyle === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setTravelStyle(item.label)}
                    className={`w-full p-5 border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#073F27] border-[#F4B41A] text-[#F7F4EC]"
                        : "bg-[#171A17] border-[#D99A00]/20 text-[#F7F4EC]/75 hover:border-[#D99A00]/60"
                    }`}
                  >
                    <div>
                      <div className="font-editorial text-xl font-bold text-[#F4B41A] mb-1">{item.label}</div>
                      <div className="text-xs sm:text-sm text-[#F7F4EC]/80">{item.desc}</div>
                    </div>
                    {isSelected && <Check className="w-5 h-5 text-[#F4B41A] shrink-0 ml-4" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Travellers */}
        {currentStep === 4 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D99A00] block mb-1">
                Step 4: Party Composition
              </span>
              <h3 className="font-editorial text-2xl md:text-3xl font-bold text-[#F7F4EC]">
                Who will be sharing this journey?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {travellerTypes.map((item) => {
                const isSelected = travellers === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setTravellers(item.label)}
                    className={`p-4 border text-left transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#073F27] border-[#F4B41A] text-[#F7F4EC]"
                        : "bg-[#171A17] border-[#D99A00]/20 text-[#F7F4EC]/75 hover:border-[#D99A00]/60"
                    }`}
                  >
                    <div>
                      <div className="font-editorial text-lg font-bold text-[#F7F4EC]">{item.label}</div>
                      <div className="text-xs text-[#F7F4EC]/65">{item.desc}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#F4B41A] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: Travel Period */}
        {currentStep === 5 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D99A00] block mb-1">
                Step 5: Travel Window
              </span>
              <h3 className="font-editorial text-2xl md:text-3xl font-bold text-[#F7F4EC]">
                When are you hoping to visit Uganda?
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {[
                "Within 1–3 months",
                "Within 3–6 months",
                "6–12 months out",
                "Next Year (2027)",
                "Specific Dates",
                "Completely Flexible"
              ].map((period) => {
                const isSelected = travelPeriod === period;
                return (
                  <button
                    key={period}
                    type="button"
                    onClick={() => setTravelPeriod(period)}
                    className={`p-4 border text-center transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "bg-[#073F27] border-[#F4B41A] text-[#F7F4EC] font-semibold"
                        : "bg-[#171A17] border-[#D99A00]/20 text-[#F7F4EC]/75 hover:border-[#D99A00]/60 text-xs sm:text-sm"
                    }`}
                  >
                    {period}
                  </button>
                );
              })}
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#D99A00] uppercase mb-1.5">
                Exact Dates or Seasonal Preference (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., July 10-22 or preferred dry season month"
                value={specialPeriodNote}
                onChange={(e) => setSpecialPeriodNote(e.target.value)}
                className="w-full bg-[#171A17] border border-[#D99A00]/30 px-4 py-3 text-sm text-[#F7F4EC] focus:border-[#F4B41A] focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* STEP 6: Contact & Special Requirements */}
        {currentStep === 6 && (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D99A00] block mb-1">
                Step 6: Finalize Your Plan
              </span>
              <h3 className="font-editorial text-2xl md:text-3xl font-bold text-[#F7F4EC]">
                Where shall we send your custom safari proposal?
              </h3>
            </div>

            {/* Quick Summary Pill Strip */}
            <div className="bg-[#073F27]/25 border border-[#D99A00]/25 p-4 mb-6 text-xs text-[#F7F4EC]/85 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span><strong>Interests:</strong> {interests.join(", ")}</span>
              <span className="text-[#D99A00]">·</span>
              <span><strong>Duration:</strong> {duration}</span>
              <span className="text-[#D99A00]">·</span>
              <span><strong>Style:</strong> {travelStyle}</span>
              <span className="text-[#D99A00]">·</span>
              <span><strong>Party:</strong> {travellers}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-[#D99A00] uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Sarah Jenkins"
                  value={contactInfo.fullName}
                  onChange={(e) => setContactInfo({ ...contactInfo, fullName: e.target.value })}
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
                  placeholder="e.g., United Kingdom, Germany, USA"
                  value={contactInfo.country}
                  onChange={(e) => setContactInfo({ ...contactInfo, country: e.target.value })}
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
                  placeholder="e.g., sarah@example.com"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  className="w-full bg-[#171A17] border border-[#D99A00]/30 px-4 py-3 text-sm text-[#F7F4EC] focus:border-[#F4B41A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#D99A00] uppercase mb-1">
                  WhatsApp / Phone (with country code) *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g., +44 7123 456789"
                  value={contactInfo.phoneWhatsApp}
                  onChange={(e) => setContactInfo({ ...contactInfo, phoneWhatsApp: e.target.value })}
                  className="w-full bg-[#171A17] border border-[#D99A00]/30 px-4 py-3 text-sm text-[#F7F4EC] focus:border-[#F4B41A] focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-[#D99A00] uppercase mb-1">
                Special Requirements or Dreams for This Trip
              </label>
              <textarea
                rows={3}
                placeholder="Mention any specific national parks, dietary preferences, mobility considerations, or anniversary celebrations..."
                value={contactInfo.specialRequirements}
                onChange={(e) => setContactInfo({ ...contactInfo, specialRequirements: e.target.value })}
                className="w-full bg-[#171A17] border border-[#D99A00]/30 px-4 py-3 text-sm text-[#F7F4EC] focus:border-[#F4B41A] focus:outline-none resize-none"
              />
            </div>
          </div>
        )}

        {/* Wizard Navigation Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-[#D99A00]/20 mt-8">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="btn-glass-dark text-xs py-2.5 px-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 6 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-glass-forest text-xs py-3 px-8"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4 text-[#F4B41A]" />
            </button>
          ) : (
            <button
              type="submit"
              className="btn-glass-gold text-xs py-3.5 px-8"
            >
              <Send className="w-4 h-4 text-[#073F27]" />
              <span>Request My Safari Plan</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
