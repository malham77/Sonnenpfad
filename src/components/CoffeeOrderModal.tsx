import React, { useState } from "react";
import { X, Coffee, Check, Send, ShieldCheck, Sparkles, MapPin, Phone, Mail, User } from "lucide-react";
import { useCms, CoffeeProduct, formatUGX } from "../context/CmsContext";

export const CoffeeOrderModal: React.FC = () => {
  const { selectedCoffeeForOrder, closeCoffeeOrderModal, addCoffeeOrder, brandSettings } = useCms();

  const [quantity, setQuantity] = useState<number>(1);
  const [grind, setGrind] = useState<string>("Whole Bean (Fresh Sealed)");
  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!selectedCoffeeForOrder) return null;

  const product = selectedCoffeeForOrder;
  const totalPrice = product.price * quantity;

  const grindOptions = [
    "Whole Bean (Fresh Sealed)",
    "Espresso Grind (Fine)",
    "Pour Over & Filter (Medium)",
    "French Press (Coarse)",
    "Cold Brew (Extra Coarse)"
  ];

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      return;
    }

    // 1. Save order to CMS database
    addCoffeeOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.trim() || "N/A",
      deliveryAddress: address.trim(),
      productId: product.id,
      productName: product.name,
      quantity,
      grindPreference: grind,
      totalAmount: totalPrice,
      notes: notes.trim()
    });

    // 2. Format pre-typed message for WhatsApp in UGX
    const message = `☕ *NEW SONNENPFAD COFFEE ORDER* ☕\n\n` +
      `*Product:* ${product.name}\n` +
      `*Origin:* ${product.origin}\n` +
      `*Quantity:* ${quantity} bag(s)\n` +
      `*Grind Preference:* ${grind}\n` +
      `*Total Price:* ${formatUGX(totalPrice)}\n\n` +
      `*Customer Name:* ${customerName.trim()}\n` +
      `*WhatsApp / Phone:* ${phone.trim()}\n` +
      `*Email:* ${email.trim() || "Not provided"}\n` +
      `*Delivery Location / Hotel:* ${address.trim()}\n` +
      (notes.trim() ? `*Special Notes:* ${notes.trim()}\n\n` : `\n`) +
      `Please confirm order availability and delivery schedule in Uganda / East Africa. Thank you!`;

    const cleanNumber = brandSettings.whatsapp.replace(/[^0-9]/g, "");
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encoded}`;

    setSubmitted(true);

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
      closeCoffeeOrderModal();
      setSubmitted(false);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-[#171A17] border border-[#D99A00]/40 rounded-3xl shadow-2xl overflow-hidden my-8 text-[#F7F4EC]">
        {/* Top Header */}
        <div className="relative px-6 py-5 bg-gradient-to-r from-[#073F27] via-[#042617] to-[#101210] border-b border-[#D99A00]/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D99A00]/20 border border-[#D99A00] flex items-center justify-center text-[#F4B41A]">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#F4B41A]">
                Sonnenpfad Specialty Coffee Roastery
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl font-bold text-[#F7F4EC] leading-tight">
                Order Fresh East African Coffee (UGX)
              </h3>
            </div>
          </div>

          <button
            onClick={closeCoffeeOrderModal}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-[#F7F4EC] transition-all cursor-pointer"
            aria-label="Close order dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-10 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#25D366]/20 border border-[#25D366] text-[#25D366] flex items-center justify-center animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h4 className="font-editorial text-2xl font-bold text-[#F4B41A]">
              Order Saved & Connecting to WhatsApp...
            </h4>
            <p className="text-sm text-[#F7F4EC]/80 max-w-md">
              Your order has been recorded into our database. WhatsApp is opening now with your pre-typed order details ({formatUGX(totalPrice)}) ready to send to our roast master.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitOrder} className="p-6 space-y-5">
            {/* Selected Product Summary Box */}
            <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-[#101210] border border-white/10">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-[#D99A00]/40 shrink-0 shadow-lg"
              />
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#D99A00]/20 text-[#F4B41A] border border-[#D99A00]/30">
                    {product.category}
                  </span>
                  <span className="text-xs text-[#D99A00]">·</span>
                  <span className="text-xs text-[#F7F4EC]/70">{product.roastLevel}</span>
                </div>
                <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#F7F4EC] mt-1">
                  {product.name}
                </h4>
                <p className="text-xs text-[#F7F4EC]/70 flex items-center gap-1 justify-center sm:justify-start mt-0.5">
                  <MapPin className="w-3 h-3 text-[#D99A00]" />
                  <span>{product.origin}</span>
                </p>
                <div className="mt-2 flex items-center gap-3 justify-center sm:justify-start font-mono">
                  <span className="text-base font-bold text-[#F4B41A]">
                    {formatUGX(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs line-through text-white/40">
                      {formatUGX(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-white/50">({product.weight})</span>
                </div>
              </div>
            </div>

            {/* Quantity & Grind Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Quantity Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D99A00] mb-1.5">
                  Quantity (Bags / Units)
                </label>
                <div className="flex items-center gap-3 bg-[#101210] border border-white/15 rounded-xl p-1.5">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-[#F7F4EC] font-bold text-lg flex items-center justify-center transition-all cursor-pointer"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-mono text-base font-bold text-[#F7F4EC]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 rounded-lg bg-[#073F27] hover:bg-[#0a4d30] text-[#F4B41A] font-bold text-lg flex items-center justify-center transition-all cursor-pointer border border-[#D99A00]/40"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Grind Preference */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D99A00] mb-1.5">
                  Grind Preference
                </label>
                <select
                  value={grind}
                  onChange={(e) => setGrind(e.target.value)}
                  className="w-full bg-[#101210] border border-white/15 rounded-xl px-3 py-2.5 text-xs text-[#F7F4EC] focus:outline-none focus:border-[#F4B41A]"
                >
                  {grindOptions.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#101210] text-[#F7F4EC]">
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F4B41A] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                <span>Your Order & Delivery Information</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#F7F4EC]/80 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Cathy Kisa"
                    className="w-full bg-[#101210] border border-white/15 rounded-xl px-3 py-2 text-xs text-[#F7F4EC] placeholder-white/30 focus:outline-none focus:border-[#F4B41A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#F7F4EC]/80 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +256 773 333108"
                    className="w-full bg-[#101210] border border-white/15 rounded-xl px-3 py-2 text-xs text-[#F7F4EC] placeholder-white/30 focus:outline-none focus:border-[#F4B41A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#F7F4EC]/80 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="cathy@example.com"
                    className="w-full bg-[#101210] border border-white/15 rounded-xl px-3 py-2 text-xs text-[#F7F4EC] placeholder-white/30 focus:outline-none focus:border-[#F4B41A]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#F7F4EC]/80 mb-1">
                    Delivery Hotel / Address in Uganda *
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. Kampala Serena Hotel / Entebbe Lodge"
                    className="w-full bg-[#101210] border border-white/15 rounded-xl px-3 py-2 text-xs text-[#F7F4EC] placeholder-white/30 focus:outline-none focus:border-[#F4B41A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#F7F4EC]/80 mb-1">
                  Special Notes or Flight Details
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Need fresh whole beans sealed for flight luggage..."
                  className="w-full bg-[#101210] border border-white/15 rounded-xl px-3 py-2 text-xs text-[#F7F4EC] placeholder-white/30 focus:outline-none focus:border-[#F4B41A] resize-none"
                />
              </div>
            </div>

            {/* Total in UGX and Action Buttons */}
            <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-[#F7F4EC]/70 uppercase tracking-wider block">
                  Total Order Amount (UGX)
                </span>
                <span className="text-2xl font-bold font-mono text-[#F4B41A]">
                  {formatUGX(totalPrice)}
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={closeCoffeeOrderModal}
                  className="flex-1 sm:flex-initial px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#F7F4EC]/70 hover:text-white border border-white/20 transition-all cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 sm:flex-initial btn-glass-whatsapp py-3 px-6 shadow-2xl"
                >
                  <Send className="w-4 h-4 text-[#042617]" />
                  <span>Send Order to WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Direct WhatsApp Assurance */}
            <p className="text-[11px] text-center text-[#F7F4EC]/60 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
              <span>
                Your order is saved into our database and dispatched directly to WhatsApp (+256 773 333108) for instant confirmation.
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
