import React, { useState } from "react";
import { useCms, MediaItem, CoffeeProduct, CoffeeOrder, TourReview, formatUGX } from "../context/CmsContext";
import { SafariPackage } from "../data/safarisData";
import {
  Lock,
  Unlock,
  Key,
  Shield,
  ShieldCheck,
  Database,
  Download,
  Upload,
  Settings,
  Image as ImageIcon,
  Compass,
  Video,
  FileText,
  Mail,
  Plus,
  Trash2,
  Edit,
  Save,
  Check,
  RefreshCw,
  ArrowRight,
  Eye,
  Coffee,
  ShoppingBag,
  LogOut,
  AlertCircle,
  MapPin,
  Flame,
  Phone,
  Send,
  User,
  Star,
  Award
} from "lucide-react";

export const AdminDashboardPage: React.FC = () => {
  const {
    brandSettings,
    updateBrandSettings,
    safaris,
    addSafari,
    updateSafari,
    deleteSafari,
    gallery,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    story,
    updateStory,
    inquiries,
    deleteInquiry,
    heroSlides,
    addHeroSlide,
    removeHeroSlide,
    coffeeProducts,
    addCoffeeProduct,
    deleteCoffeeProduct,
    coffeeOrders,
    deleteCoffeeOrder,
    updateOrderStatus,
    reviews,
    updateReviewStatus,
    deleteReview,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    changeAdminPassword,
    hasCustomPassword,
    exportBackupJson,
    importBackupJson,
    resetAllToDefault
  } = useCms();

  // Authentication State
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Tabs
  const [activeTab, setActiveTab] = useState<
    | "storage"
    | "coffee"
    | "orders"
    | "reviews"
    | "slideshow"
    | "images"
    | "safaris"
    | "gallery"
    | "story"
    | "inquiries"
    | "settings"
  >("storage");
  const [successToast, setSuccessToast] = useState<string>("");

  // Safaris edit state
  const [editingSafari, setEditingSafari] = useState<SafariPackage | null>(null);
  const [isNewSafari, setIsNewSafari] = useState<boolean>(false);

  // Gallery add state
  const [newMedia, setNewMedia] = useState<{
    type: "image" | "video";
    title: string;
    category: MediaItem["category"];
    location: string;
    mediaUrl: string;
    thumbnailUrl: string;
    caption: string;
    videoDuration: string;
  }>({
    type: "image",
    title: "",
    category: "Wildlife",
    location: "",
    mediaUrl: "",
    thumbnailUrl: "",
    caption: "",
    videoDuration: "1:00"
  });

  // New Slide State
  const [newSlideUrl, setNewSlideUrl] = useState("");

  // New Coffee Product State in UGX
  const [newCoffee, setNewCoffee] = useState<{
    name: string;
    origin: string;
    category: CoffeeProduct["category"];
    roastLevel: CoffeeProduct["roastLevel"];
    price: number;
    originalPrice?: number;
    weight: string;
    image: string;
    isSale: boolean;
    flavorNotesString: string;
    description: string;
  }>({
    name: "",
    origin: "Mount Elgon, Eastern Uganda",
    category: "Single Origin",
    roastLevel: "Medium",
    price: 65000,
    originalPrice: 85000,
    weight: "250g Whole Bean",
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
    isSale: false,
    flavorNotesString: "Chocolate, Honey, Orange Blossom",
    description: "Sustainably shade-grown specialty East African coffee hand-picked and micro-roasted in small batches."
  });

  const notify = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(""), 4500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setAuthError("");
      notify("Welcome back! Admin dashboard unlocked.");
    } else {
      setAuthError("Incorrect password. Please try again or use the default passcode.");
    }
  };

  // Convert uploaded image file to DataURL for live instant rendering
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onComplete: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          onComplete(reader.result);
          notify("Image uploaded successfully and updated live!");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadBackup = () => {
    const jsonStr = exportBackupJson();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sonnenpfad-safaris-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    notify("Full JSON backup downloaded to your device!");
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result;
        if (typeof text === "string") {
          const res = importBackupJson(text);
          if (res.success) {
            notify("All data restored successfully from backup!");
          } else {
            alert("Error restoring backup: " + res.error);
          }
        }
      };
      reader.readAsText(file);
    }
  };

  // 1. SECURITY LOGIN GATE
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#101210] text-[#F7F4EC] pt-32 pb-20 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-[#171A17] border-2 border-[#D99A00]/40 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 relative overflow-hidden animate-slide-up">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#073F27] border-2 border-[#F4B41A] text-[#F4B41A] flex items-center justify-center mx-auto shadow-lg">
              <Lock className="w-8 h-8" />
            </div>
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#F4B41A] block">
              Discreet Owner Portal
            </span>
            <h1 className="font-editorial text-3xl font-bold text-[#F7F4EC]">
              Owner Authentication
            </h1>
            <p className="text-xs text-[#F7F4EC]/75 font-light leading-relaxed">
              Protected administration interface for Sonnenpfad Safaris Uganda Ltd.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-xl text-xs text-red-200 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                Enter Master Passcode
              </label>
              <input
                type="password"
                required
                placeholder="Master Passcode"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-[#101210] border border-[#D99A00]/40 rounded-full px-5 py-3 text-sm text-[#F7F4EC] placeholder-[#F7F4EC]/40 focus:outline-none focus:border-[#F4B41A]"
              />
            </div>

            <button
              type="submit"
              className="btn-glass-gold w-full text-center justify-center py-3.5"
            >
              <Unlock className="w-4 h-4 text-[#073F27]" />
              <span>Unlock Admin Dashboard</span>
            </button>
          </form>

          <div className="p-4 bg-[#101210] border border-[#D99A00]/20 rounded-2xl text-[11px] text-[#F7F4EC]/70 space-y-1">
            <p className="font-semibold text-[#F4B41A]">Master Key Notice:</p>
            <p>
              Default master passcode is: <code className="text-[#25D366] font-mono font-bold">sonnenpfad2026</code>
            </p>
            <p className="text-[10px] text-[#F7F4EC]/50">
              You can change this passcode to your own private secret inside Settings once logged in.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 2. UNLOCKED ADMIN DASHBOARD
  return (
    <div className="min-h-screen bg-[#101210] text-[#F7F4EC] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Dashboard Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-[#D99A00]/30 gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#F4B41A]">
                Authenticated as Owner
              </span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-bold text-[#F7F4EC]">
              Sonnenpfad Safari Admin CMS
            </h1>
            <p className="text-xs sm:text-sm text-[#F7F4EC]/75 mt-1 font-light">
              Edit all images, hero slideshows, safari packages, coffee products (UGX), customer reviews & orders live.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadBackup}
              className="btn-glass-gold text-xs py-2.5 px-5"
              title="Download offline JSON backup file"
            >
              <Download className="w-3.5 h-3.5 text-[#073F27]" />
              <span>Export Full Backup</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="btn-glass-dark text-xs py-2.5 px-5"
              title="Lock dashboard"
            >
              <LogOut className="w-3.5 h-3.5 text-[#F4B41A]" />
              <span>Lock / Exit</span>
            </button>
          </div>
        </div>

        {/* Success Alert Toast */}
        {successToast && (
          <div className="mb-6 p-4 bg-[#073F27] border-2 border-[#25D366] text-[#F7F4EC] rounded-2xl text-xs sm:text-sm flex items-center gap-3 animate-slide-down shadow-xl">
            <Check className="w-5 h-5 text-[#25D366] shrink-0" />
            <span className="font-medium">{successToast}</span>
          </div>
        )}

        {/* Tab Navigation Menu */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#D99A00]/25 pb-4 mb-8">
          {[
            { id: "storage", label: "Where Is Data Stored?", icon: Database },
            { id: "coffee", label: `Coffee Products (${coffeeProducts.length})`, icon: Coffee },
            { id: "orders", label: `Coffee Orders (${coffeeOrders.length})`, icon: ShoppingBag },
            { id: "reviews", label: `Customer Reviews (${reviews.length})`, icon: Star },
            { id: "slideshow", label: `Hero Slideshow (${heroSlides.length})`, icon: Eye },
            { id: "images", label: "Official Logo & Site Images", icon: ImageIcon },
            { id: "safaris", label: `Safari Packages (${safaris.length})`, icon: Compass },
            { id: "gallery", label: `Gallery Photos & Videos (${gallery.length})`, icon: Video },
            { id: "story", label: "Story & East Africa Vision", icon: FileText },
            { id: "inquiries", label: `Guest Inquiries (${inquiries.length})`, icon: Mail },
            { id: "settings", label: "Passcode & Contact Settings", icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setEditingSafari(null);
                }}
                className={`px-4 py-2.5 text-xs font-bold tracking-wider uppercase rounded-full border transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-[#073F27] border-[#F4B41A] text-[#F4B41A] shadow-lg scale-105"
                    : "bg-[#171A17] border-white/10 text-[#F7F4EC]/75 hover:border-[#D99A00]/50 hover:text-[#F7F4EC]"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: WHERE IS OUR DATA STORED? */}
        {activeTab === "storage" && (
          <div className="space-y-6 animate-slide-up">
            <div className="bg-[#171A17] border-2 border-[#D99A00]/40 rounded-3xl p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#073F27] border border-[#F4B41A] text-[#F4B41A] flex items-center justify-center">
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#F4B41A]">
                    Architecture & Data Sovereignty
                  </span>
                  <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#F7F4EC]">
                    Where Is Your Website Data Stored?
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                <div className="p-5 bg-[#101210] border border-[#D99A00]/25 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-[#F4B41A]">
                    <ShieldCheck className="w-5 h-5 text-[#25D366]" />
                    <h3 className="font-editorial text-lg font-bold">100% Private Local Database</h3>
                  </div>
                  <p className="text-xs text-[#F7F4EC]/75 leading-relaxed">
                    All your safaris, coffee items, customer reviews, orders, hero slideshows, uploaded images, and stories are saved directly into your browser's persistent client database engine (LocalStorage).
                  </p>
                </div>

                <div className="p-5 bg-[#101210] border border-[#D99A00]/25 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-[#F4B41A]">
                    <RefreshCw className="w-5 h-5 text-[#D99A00]" />
                    <h3 className="font-editorial text-lg font-bold">Live Instant Rendering</h3>
                  </div>
                  <p className="text-xs text-[#F7F4EC]/75 leading-relaxed">
                    Whatever you add or edit on this dashboard instantly updates the live website in real-time without delay.
                  </p>
                </div>

                <div className="p-5 bg-[#101210] border border-[#D99A00]/25 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-[#F4B41A]">
                    <Download className="w-5 h-5 text-[#F4B41A]" />
                    <h3 className="font-editorial text-lg font-bold">Offline JSON Master Backup</h3>
                  </div>
                  <p className="text-xs text-[#F7F4EC]/75 leading-relaxed">
                    Download a full JSON backup anytime to safeguard all your content or transfer it to another browser with 1 click.
                  </p>
                </div>
              </div>

              {/* Database Metrics Table */}
              <div className="p-6 bg-[#101210] border border-white/10 rounded-2xl">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#F4B41A] mb-4">
                  Current Database Records
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-4 text-center font-mono">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-2xl font-bold text-[#F4B41A]">{safaris.length}</span>
                    <span className="block text-[10px] text-white/50 uppercase mt-1">Safaris</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-2xl font-bold text-[#25D366]">{coffeeProducts.length}</span>
                    <span className="block text-[10px] text-white/50 uppercase mt-1">Coffee Items</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-2xl font-bold text-[#F4B41A]">{coffeeOrders.length}</span>
                    <span className="block text-[10px] text-white/50 uppercase mt-1">Orders</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-2xl font-bold text-[#25D366]">{reviews.length}</span>
                    <span className="block text-[10px] text-white/50 uppercase mt-1">Reviews</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-2xl font-bold text-[#D99A00]">{gallery.length}</span>
                    <span className="block text-[10px] text-white/50 uppercase mt-1">Media</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <span className="text-2xl font-bold text-[#F7F4EC]">{heroSlides.length}</span>
                    <span className="block text-[10px] text-white/50 uppercase mt-1">Slides</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#D99A00]/25">
                <button
                  onClick={handleDownloadBackup}
                  className="btn-glass-gold text-xs py-3 px-6 w-full sm:w-auto"
                >
                  <Download className="w-4 h-4 text-[#073F27]" />
                  <span>Download Complete JSON Backup</span>
                </button>

                <label className="btn-glass-dark text-xs py-3 px-6 cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2">
                  <Upload className="w-4 h-4 text-[#F4B41A]" />
                  <span>Restore Database from File</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SPECIALTY COFFEE PRODUCTS MANAGER (IN UGX) */}
        {activeTab === "coffee" && (
          <div className="space-y-8 animate-slide-up">
            <div className="bg-[#171A17] border-2 border-[#D99A00]/30 rounded-3xl p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-editorial text-2xl font-bold text-[#F7F4EC]">
                    Specialty Coffee Products Catalog (UGX)
                  </h2>
                  <p className="text-xs text-[#F7F4EC]/70 mt-1">
                    Add, edit, or delete any coffee beans, blends, tampers, or skincare items sold on the website.
                  </p>
                </div>
                <div className="px-4 py-1.5 rounded-full bg-[#073F27] border border-[#D99A00]/40 text-xs font-mono font-bold text-[#F4B41A] shrink-0">
                  Total Products: {coffeeProducts.length}
                </div>
              </div>

              {/* Add New Coffee Form */}
              <div className="p-6 bg-[#101210] border border-[#D99A00]/30 rounded-2xl space-y-4">
                <h4 className="text-xs font-bold uppercase text-[#F4B41A] tracking-wider flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  <span>Add New Coffee Product</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mount Elgon Peaberry Reserve"
                      value={newCoffee.name}
                      onChange={(e) => setNewCoffee({ ...newCoffee, name: e.target.value })}
                      className="w-full bg-[#171A17] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC] focus:outline-none focus:border-[#F4B41A]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                      Origin Region *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Mount Elgon, Eastern Uganda"
                      value={newCoffee.origin}
                      onChange={(e) => setNewCoffee({ ...newCoffee, origin: e.target.value })}
                      className="w-full bg-[#171A17] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC] focus:outline-none focus:border-[#F4B41A]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                      Category
                    </label>
                    <select
                      value={newCoffee.category}
                      onChange={(e) => setNewCoffee({ ...newCoffee, category: e.target.value as any })}
                      className="w-full bg-[#171A17] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC] focus:outline-none focus:border-[#F4B41A]"
                    >
                      <option value="Single Origin">Single Origin</option>
                      <option value="Espresso Roast">Espresso Roast</option>
                      <option value="Coffee Blends">Coffee Blends</option>
                      <option value="Accessories">Accessories (Tamper/Press)</option>
                      <option value="Skincare">Skincare (Body Scrub)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                      Roast Level / Type
                    </label>
                    <select
                      value={newCoffee.roastLevel}
                      onChange={(e) => setNewCoffee({ ...newCoffee, roastLevel: e.target.value as any })}
                      className="w-full bg-[#171A17] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC] focus:outline-none focus:border-[#F4B41A]"
                    >
                      <option value="Light">Light Roast</option>
                      <option value="Medium">Medium Roast</option>
                      <option value="Medium-Dark">Medium-Dark Roast</option>
                      <option value="Dark">Dark Roast</option>
                      <option value="Espresso">Espresso Roast</option>
                      <option value="Artisanal Accessory">Artisanal Accessory</option>
                      <option value="Botanical">Botanical / Skincare</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                      Price (UGX) *
                    </label>
                    <input
                      type="number"
                      step="1000"
                      value={newCoffee.price}
                      onChange={(e) => setNewCoffee({ ...newCoffee, price: Number(e.target.value) })}
                      className="w-full bg-[#171A17] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC] focus:outline-none focus:border-[#F4B41A]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                      Weight / Packaging
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 250g Whole Bean"
                      value={newCoffee.weight}
                      onChange={(e) => setNewCoffee({ ...newCoffee, weight: e.target.value })}
                      className="w-full bg-[#171A17] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC] focus:outline-none focus:border-[#F4B41A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                      Flavor Notes (comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Wild Bergamot, Dark Cocoa, Honey"
                      value={newCoffee.flavorNotesString}
                      onChange={(e) => setNewCoffee({ ...newCoffee, flavorNotesString: e.target.value })}
                      className="w-full bg-[#171A17] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC] focus:outline-none focus:border-[#F4B41A]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                      Product Photo (Paste URL or Upload File)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="https://..."
                        value={newCoffee.image}
                        onChange={(e) => setNewCoffee({ ...newCoffee, image: e.target.value })}
                        className="flex-1 bg-[#171A17] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC]"
                      />
                      <label className="px-3 py-2 bg-[#073F27] border border-[#D99A00]/40 rounded-xl text-xs font-bold text-[#F4B41A] cursor-pointer hover:bg-[#0a4d30] shrink-0">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, (url) => setNewCoffee({ ...newCoffee, image: url }))}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={newCoffee.description}
                    onChange={(e) => setNewCoffee({ ...newCoffee, description: e.target.value })}
                    className="w-full bg-[#171A17] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC] resize-none focus:outline-none focus:border-[#F4B41A]"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!newCoffee.name.trim()) {
                      alert("Please provide coffee name!");
                      return;
                    }
                    const notes = newCoffee.flavorNotesString
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean);

                    addCoffeeProduct({
                      name: newCoffee.name.trim(),
                      origin: newCoffee.origin.trim(),
                      category: newCoffee.category,
                      roastLevel: newCoffee.roastLevel,
                      price: newCoffee.price,
                      originalPrice: newCoffee.originalPrice,
                      weight: newCoffee.weight,
                      rating: 5,
                      reviewsCount: 14,
                      image: newCoffee.image,
                      isSale: newCoffee.isSale,
                      inStock: true,
                      flavorNotes: notes.length > 0 ? notes : ["Rich Aroma", "Clean Finish"],
                      description: newCoffee.description.trim()
                    });
                    notify(`Added "${newCoffee.name}" (${formatUGX(newCoffee.price)}) to Coffee Roastery!`);
                    setNewCoffee({ ...newCoffee, name: "" });
                  }}
                  className="btn-glass-gold text-xs py-3 px-8"
                >
                  <Plus className="w-4 h-4 text-[#073F27]" />
                  <span>Publish Coffee Product</span>
                </button>
              </div>

              {/* Existing Coffee Catalog List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {coffeeProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 bg-[#101210] border border-[#D99A00]/30 rounded-2xl flex items-center justify-between gap-3 shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-16 h-16 object-cover rounded-xl bg-black/60 shrink-0 border border-white/10"
                      />
                      <div>
                        <span className="text-[10px] text-[#F4B41A] uppercase font-bold tracking-wider block">
                          {p.category} · {p.roastLevel}
                        </span>
                        <h4 className="font-editorial text-base font-bold text-[#F7F4EC] leading-tight">
                          {p.name}
                        </h4>
                        <span className="text-xs text-[#F4B41A] font-mono font-bold">
                          {formatUGX(p.price)}
                        </span>
                        <span className="text-[10px] text-white/50 block truncate max-w-[180px]">
                          {p.origin}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (window.confirm(`Delete coffee item "${p.name}"?`)) {
                          deleteCoffeeProduct(p.id);
                          notify("Coffee product removed from shop.");
                        }
                      }}
                      className="p-2.5 border border-red-500/40 text-red-400 hover:bg-red-500/20 rounded-full transition-all cursor-pointer shrink-0"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CUSTOMER COFFEE ORDERS INBOX */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-slide-up">
            <div className="bg-[#171A17] border-2 border-[#D99A00]/30 rounded-3xl p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-editorial text-2xl font-bold text-[#F7F4EC]">
                    Live Coffee Orders Inbox ({coffeeOrders.length})
                  </h2>
                  <p className="text-xs text-[#F7F4EC]/70 mt-1">
                    Customer orders placed through the website form. All amounts calculated in UGX.
                  </p>
                </div>
              </div>

              {coffeeOrders.length === 0 ? (
                <div className="p-12 text-center bg-[#101210] border border-[#D99A00]/25 rounded-2xl">
                  <Coffee className="w-12 h-12 text-[#D99A00]/50 mx-auto mb-3" />
                  <h3 className="font-editorial text-xl font-bold text-[#F7F4EC]">
                    No Orders in Queue
                  </h3>
                  <p className="text-xs text-[#F7F4EC]/60 mt-1">
                    When visitors click "Order via WhatsApp", their orders appear here automatically.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {coffeeOrders.map((ord) => (
                    <div
                      key={ord.id}
                      className="p-6 bg-[#101210] border border-[#D99A00]/30 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#073F27] text-[#F4B41A] border border-[#D99A00]/40">
                            #{ord.id}
                          </span>
                          <span className="text-xs text-white/50">{ord.date}</span>
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                              ord.status === "Delivered"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-500/40"
                                : ord.status === "Dispatched"
                                ? "bg-blue-950 text-blue-400 border border-blue-500/40"
                                : "bg-[#D99A00]/20 text-[#F4B41A] border border-[#D99A00]/40"
                            }`}
                          >
                            Status: {ord.status}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-editorial text-xl font-bold text-[#F7F4EC]">
                            {ord.productName} × {ord.quantity} bag(s)
                          </h4>
                          <p className="text-xs text-[#F4B41A] font-mono font-bold mt-0.5">
                            Total: {formatUGX(ord.totalAmount)} · Grind: {ord.grindPreference}
                          </p>
                        </div>

                        <div className="text-xs text-[#F7F4EC]/80 space-y-0.5 pt-1">
                          <p>
                            <strong>Customer:</strong> {ord.customerName} · <strong>WhatsApp:</strong>{" "}
                            <span className="font-mono text-[#25D366]">{ord.phone}</span>
                          </p>
                          <p>
                            <strong>Delivery Hotel / Address:</strong> {ord.deliveryAddress}
                          </p>
                          {ord.notes && (
                            <p className="text-white/60 italic">
                              <strong>Notes:</strong> "{ord.notes}"
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <select
                          value={ord.status}
                          onChange={(e) => {
                            updateOrderStatus(ord.id, e.target.value as any);
                            notify(`Order #${ord.id} status updated to ${e.target.value}`);
                          }}
                          className="bg-[#171A17] border border-[#D99A00]/40 text-xs text-[#F7F4EC] rounded-xl px-3 py-2"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Dispatched">Dispatched</option>
                          <option value="Delivered">Delivered</option>
                        </select>

                        <a
                          href={`https://wa.me/${ord.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                            ord.customerName
                          )}%2C%20thank%20you%20for%20your%20Sonnenpfad%20coffee%20order%20for%20${encodeURIComponent(
                            ord.productName
                          )}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-glass-whatsapp text-xs py-2 px-4"
                        >
                          <Send className="w-3.5 h-3.5 text-[#042617]" />
                          <span>Chat on WhatsApp</span>
                        </a>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete order #${ord.id}?`)) {
                              deleteCoffeeOrder(ord.id);
                              notify("Order deleted.");
                            }
                          }}
                          className="p-2 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-full transition-all cursor-pointer"
                          title="Delete Order"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOMER REVIEWS & RATINGS TRACKER */}
        {activeTab === "reviews" && (
          <div className="space-y-6 animate-slide-up">
            <div className="bg-[#171A17] border-2 border-[#D99A00]/30 rounded-3xl p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-editorial text-2xl font-bold text-[#F7F4EC]">
                    Customer Reviews & Feedback Tracker ({reviews.length})
                  </h2>
                  <p className="text-xs text-[#F7F4EC]/70 mt-1">
                    Track all ratings, scores, and customer comments submitted live on the website.
                  </p>
                </div>
              </div>

              {/* Review Statistics Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-center">
                <div className="p-4 bg-[#101210] border border-[#D99A00]/30 rounded-2xl">
                  <span className="text-3xl font-bold text-[#F4B41A]">
                    {(reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1)).toFixed(1)}
                  </span>
                  <span className="block text-[11px] text-white/50 uppercase mt-1">Average Stars</span>
                </div>
                <div className="p-4 bg-[#101210] border border-[#D99A00]/30 rounded-2xl">
                  <span className="text-3xl font-bold text-[#25D366]">
                    {(reviews.reduce((acc, r) => acc + r.overallScore, 0) / (reviews.length || 1)).toFixed(0)}%
                  </span>
                  <span className="block text-[11px] text-white/50 uppercase mt-1">Satisfaction Index</span>
                </div>
                <div className="p-4 bg-[#101210] border border-[#D99A00]/30 rounded-2xl">
                  <span className="text-3xl font-bold text-[#F4B41A]">
                    {(reviews.reduce((acc, r) => acc + r.wildlifeScore, 0) / (reviews.length || 1)).toFixed(0)}%
                  </span>
                  <span className="block text-[11px] text-white/50 uppercase mt-1">Wildlife Score</span>
                </div>
                <div className="p-4 bg-[#101210] border border-[#D99A00]/30 rounded-2xl">
                  <span className="text-3xl font-bold text-[#25D366]">
                    {(reviews.reduce((acc, r) => acc + r.guideScore, 0) / (reviews.length || 1)).toFixed(0)}%
                  </span>
                  <span className="block text-[11px] text-white/50 uppercase mt-1">Guide Score</span>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 bg-[#101210] border border-[#D99A00]/25 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="flex text-[#F4B41A]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span className="text-xs text-white/50 font-mono">· {rev.date}</span>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#073F27] text-[#F4B41A] border border-[#D99A00]/40">
                          {rev.status || "Verified Guest"}
                        </span>
                      </div>

                      <h4 className="font-editorial text-xl font-bold text-[#F7F4EC]">
                        {rev.author} <span className="text-xs font-normal text-[#D99A00]">({rev.country})</span>
                      </h4>

                      <p className="text-xs font-bold text-[#F4B41A]">
                        Service: {rev.tourName}
                      </p>

                      <p className="text-xs text-[#F7F4EC]/85 italic bg-black/30 p-3 rounded-xl border border-white/5">
                        "{rev.content}"
                      </p>

                      <div className="flex flex-wrap gap-4 text-[11px] text-white/60 font-mono pt-1">
                        <span>Wildlife: {rev.wildlifeScore}%</span>
                        <span>Guide: {rev.guideScore}%</span>
                        <span>Lodging: {rev.lodgingScore}%</span>
                        <span className="text-[#F4B41A] font-bold">Overall: {rev.overallScore}%</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 shrink-0">
                      <select
                        value={rev.status || "Verified Guest"}
                        onChange={(e) => {
                          updateReviewStatus(rev.id, e.target.value as any);
                          notify(`Review status updated to ${e.target.value}`);
                        }}
                        className="bg-[#171A17] border border-[#D99A00]/40 text-xs text-[#F7F4EC] rounded-xl px-3 py-2"
                      >
                        <option value="Verified Guest">Verified Guest</option>
                        <option value="Featured">Featured on Homepage</option>
                        <option value="Approved">Approved</option>
                        <option value="Pending Approval">Pending Approval</option>
                      </select>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete review by "${rev.author}"?`)) {
                            deleteReview(rev.id);
                            notify("Review deleted from database.");
                          }
                        }}
                        className="p-2 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-full transition-all cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: HERO SLIDESHOW */}
        {activeTab === "slideshow" && (
          <div className="space-y-8 animate-slide-up">
            <div className="bg-[#171A17] border-2 border-[#D99A00]/30 rounded-3xl p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-editorial text-2xl font-bold text-[#F7F4EC]">
                    Hero Background Slideshow
                  </h2>
                  <p className="text-xs text-[#F7F4EC]/70 mt-1">
                    Hero images automatically rotate continuously on the homepage with smooth crossfades.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#101210] border border-[#D99A00]/25 rounded-2xl space-y-3">
                <h4 className="text-xs font-bold uppercase text-[#F4B41A] tracking-wider">
                  Add New Slide Image
                </h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Paste image URL (https://...)"
                    value={newSlideUrl}
                    onChange={(e) => setNewSlideUrl(e.target.value)}
                    className="flex-1 bg-[#171A17] border border-[#D99A00]/30 rounded-xl px-4 py-2 text-xs text-[#F7F4EC]"
                  />
                  <label className="btn-glass-forest text-xs py-2 px-5 cursor-pointer text-center">
                    Upload from Device
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, (url) => addHeroSlide(url))}
                      className="hidden"
                    />
                  </label>
                  <button
                    onClick={() => {
                      if (newSlideUrl.trim()) {
                        addHeroSlide(newSlideUrl.trim());
                        setNewSlideUrl("");
                        notify("Slide added!");
                      }
                    }}
                    className="btn-glass-gold text-xs py-2 px-6"
                  >
                    Add Slide
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {heroSlides.map((slideUrl, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-2xl overflow-hidden border border-[#D99A00]/30 bg-black h-48"
                  >
                    <img
                      src={slideUrl}
                      alt={`Hero Slide ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between p-4">
                      <span className="text-xs font-bold text-[#F4B41A]">Slide #{idx + 1}</span>
                      <button
                        onClick={() => {
                          if (heroSlides.length <= 1) {
                            alert("You need at least 1 hero slide!");
                            return;
                          }
                          removeHeroSlide(idx);
                          notify("Slide removed.");
                        }}
                        className="p-2 rounded-full bg-red-600/80 hover:bg-red-600 text-white cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: BRAND & LOGO */}
        {activeTab === "images" && (
          <div className="space-y-8 animate-slide-up">
            <div className="bg-[#171A17] border-2 border-[#D99A00]/30 rounded-3xl p-8 space-y-6">
              <h2 className="font-editorial text-2xl font-bold text-[#F7F4EC]">
                Official Brand Logo & Section Backgrounds
              </h2>

              <div className="p-6 bg-[#101210] border border-[#D99A00]/30 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                <img
                  src={brandSettings.logoUrl}
                  alt="Sonnenpfad Safaris Logo"
                  className="w-36 h-36 object-contain bg-white rounded-2xl p-2 shadow-xl border border-[#D99A00]"
                />
                <div className="space-y-3 flex-1 text-center md:text-left">
                  <h3 className="font-editorial text-xl font-bold text-[#F7F4EC]">
                    Current Brand Logo
                  </h3>
                  <p className="text-xs text-[#F7F4EC]/75">
                    Displayed prominently on headers, drawers, hero banners, and PDF quotes.
                  </p>
                  <label className="btn-glass-gold text-xs py-2 px-6 cursor-pointer inline-flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#073F27]" />
                    <span>Upload New Logo File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileUpload(e, (url) => updateBrandSettings({ logoUrl: url }))
                      }
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { key: "heroBgImage", label: "Primary Hero Banner Image" },
                  { key: "introImage", label: "Safari Overview Intro Image" },
                  { key: "gorillaBgImage", label: "Mountain Gorilla Dossier Background" },
                  { key: "sunsetBgImage", label: "Sunset Safari CTA Background" },
                  { key: "eastAfricaHeroImage", label: "East Africa Cross-Border Hero Image" }
                ].map((item) => (
                  <div
                    key={item.key}
                    className="p-4 bg-[#101210] border border-white/10 rounded-2xl space-y-3"
                  >
                    <span className="text-xs font-bold text-[#F4B41A] block">{item.label}</span>
                    <img
                      src={(brandSettings as any)[item.key]}
                      alt={item.label}
                      className="w-full h-32 object-cover rounded-xl"
                    />
                    <label className="btn-glass-forest text-[11px] py-2 px-4 cursor-pointer w-full text-center block">
                      Upload New Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload(e, (url) =>
                            updateBrandSettings({ [item.key]: url } as any)
                          )
                        }
                        className="hidden"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: SAFARIS & TOURS (WITH UGX PRICES) */}
        {activeTab === "safaris" && (
          <div className="space-y-8 animate-slide-up">
            <div className="flex justify-between items-center">
              <h2 className="font-editorial text-2xl font-bold text-[#F7F4EC]">
                Manage Safaris & Expeditions ({safaris.length})
              </h2>
              <button
                onClick={() => {
                  setIsNewSafari(true);
                  setEditingSafari({
                    id: "pkg-" + Date.now(),
                    slug: "new-safari-" + Date.now(),
                    title: "New East African Journey",
                    duration: "7 Days / 6 Nights",
                    durationDays: 7,
                    destinations: ["Uganda & East Africa"],
                    destinationsFormatted: "Uganda, Kenya & Tanzania",
                    tagline: "Tailor-made private expedition across East Africa.",
                    overview: "Overview description here...",
                    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
                    highlights: ["Gorilla trekking in Bwindi", "Great Migration game drives"],
                    accommodationLevel: "Luxury Safari Lodges",
                    priceUGX: 9500000,
                    formattedPriceUGX: "UGX 9,500,000",
                    itinerary: [
                      { day: 1, title: "Arrival in Entebbe", description: "VIP reception and transfer." }
                    ],
                    included: ["Park entries", "Dedicated guide", "4x4 Land Cruiser"],
                    excluded: ["International flights"],
                    importantNotes: ["Valid passport with at least 6 months validity required."],
                    faqs: [
                      {
                        question: "What is the packing recommendation for this safari?",
                        answer: "Light breathable clothing, waterproof hiking boots, rain jacket, and insect repellent."
                      }
                    ]
                  });
                }}
                className="btn-glass-gold text-xs py-2.5 px-6"
              >
                <Plus className="w-4 h-4 text-[#073F27]" />
                <span>Create New Safari</span>
              </button>
            </div>

            {!editingSafari ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {safaris.map((s) => (
                  <div
                    key={s.id}
                    className="p-5 bg-[#171A17] border border-[#D99A00]/30 rounded-2xl flex flex-col justify-between shadow-xl"
                  >
                    <div>
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-40 object-cover rounded-xl mb-3"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-[#F4B41A]">
                          {s.duration}
                        </span>
                        <span className="text-xs font-mono font-bold text-[#F4B41A]">
                          {s.formattedPriceUGX || (s.priceUGX ? formatUGX(s.priceUGX) : "UGX Price upon request")}
                        </span>
                      </div>
                      <h3 className="font-editorial text-xl font-bold text-[#F7F4EC] mt-0.5">
                        {s.title}
                      </h3>
                      <p className="text-xs text-white/60 line-clamp-2 mt-1">{s.overview}</p>
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/10">
                      <button
                        onClick={() => {
                          setIsNewSafari(false);
                          setEditingSafari(s);
                        }}
                        className="flex-1 btn-glass-forest text-xs py-2"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${s.title}"?`)) {
                            deleteSafari(s.id);
                            notify("Safari package deleted.");
                          }
                        }}
                        className="p-2 border border-red-500/40 text-red-400 rounded-full hover:bg-red-500/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-[#171A17] border-2 border-[#D99A00]/40 rounded-3xl p-8 space-y-4">
                <h3 className="font-editorial text-2xl font-bold text-[#F4B41A]">
                  {isNewSafari ? "Create New Safari Package" : `Edit: ${editingSafari.title}`}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editingSafari.title}
                      onChange={(e) =>
                        setEditingSafari({ ...editingSafari, title: e.target.value })
                      }
                      className="w-full bg-[#101210] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={editingSafari.duration}
                      onChange={(e) =>
                        setEditingSafari({ ...editingSafari, duration: e.target.value })
                      }
                      className="w-full bg-[#101210] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                      Price in UGX
                    </label>
                    <input
                      type="number"
                      step="50000"
                      value={editingSafari.priceUGX || 5000000}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setEditingSafari({
                          ...editingSafari,
                          priceUGX: val,
                          formattedPriceUGX: formatUGX(val)
                        });
                      }}
                      className="w-full bg-[#101210] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={editingSafari.image}
                    onChange={(e) =>
                      setEditingSafari({ ...editingSafari, image: e.target.value })
                    }
                    className="w-full bg-[#101210] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                    Overview
                  </label>
                  <textarea
                    rows={3}
                    value={editingSafari.overview}
                    onChange={(e) =>
                      setEditingSafari({ ...editingSafari, overview: e.target.value })
                    }
                    className="w-full bg-[#101210] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC]"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      if (isNewSafari) {
                        addSafari(editingSafari);
                        notify(`Safari "${editingSafari.title}" created.`);
                      } else {
                        updateSafari(editingSafari.id, editingSafari);
                        notify(`Safari "${editingSafari.title}" saved.`);
                      }
                      setEditingSafari(null);
                    }}
                    className="btn-glass-gold text-xs py-3 px-8"
                  >
                    Save Safari
                  </button>
                  <button
                    onClick={() => setEditingSafari(null)}
                    className="btn-glass-dark text-xs py-3 px-6"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: GALLERY & VIDEOS */}
        {activeTab === "gallery" && (
          <div className="space-y-8 animate-slide-up">
            <div className="bg-[#171A17] border-2 border-[#D99A00]/30 rounded-3xl p-8 space-y-6">
              <h2 className="font-editorial text-2xl font-bold text-[#F7F4EC]">
                Add Photo or Video to Live Gallery
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                    Media Type
                  </label>
                  <select
                    value={newMedia.type}
                    onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value as any })}
                    className="w-full bg-[#101210] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC]"
                  >
                    <option value="image">Photograph</option>
                    <option value="video">Video Clip (MP4 / WebM)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Silverback Mountain Gorilla"
                    value={newMedia.title}
                    onChange={(e) => setNewMedia({ ...newMedia, title: e.target.value })}
                    className="w-full bg-[#101210] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                    Category
                  </label>
                  <select
                    value={newMedia.category}
                    onChange={(e) => setNewMedia({ ...newMedia, category: e.target.value as any })}
                    className="w-full bg-[#101210] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC]"
                  >
                    <option value="Gorillas">Gorillas</option>
                    <option value="Wildlife">Wildlife</option>
                    <option value="East Africa">East Africa</option>
                    <option value="Landscapes">Landscapes</option>
                    <option value="Culture">Culture</option>
                    <option value="Adventure">Adventure</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="Bwindi Forest, Uganda"
                    value={newMedia.location}
                    onChange={(e) => setNewMedia({ ...newMedia, location: e.target.value })}
                    className="w-full bg-[#101210] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                  Media URL or File Upload
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://... (Image or MP4 Video)"
                    value={newMedia.mediaUrl}
                    onChange={(e) => setNewMedia({ ...newMedia, mediaUrl: e.target.value })}
                    className="flex-1 bg-[#101210] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-xs text-[#F7F4EC]"
                  />
                  <label className="btn-glass-forest text-xs py-2 px-5 cursor-pointer shrink-0">
                    Upload File
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) =>
                        handleFileUpload(e, (url) => setNewMedia({ ...newMedia, mediaUrl: url }))
                      }
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <button
                onClick={() => {
                  if (!newMedia.title || !newMedia.mediaUrl) {
                    alert("Please provide title and media URL/upload!");
                    return;
                  }
                  addGalleryItem(newMedia);
                  notify(`Added "${newMedia.title}" to gallery.`);
                  setNewMedia({ ...newMedia, title: "", mediaUrl: "" });
                }}
                className="btn-glass-gold text-xs py-3 px-8"
              >
                <Plus className="w-4 h-4 text-[#073F27]" />
                <span>Publish to Live Gallery</span>
              </button>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 border-t border-white/10">
                {gallery.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-[#101210] border border-white/10 rounded-2xl space-y-2 relative group"
                  >
                    {item.type === "video" ? (
                      <div className="relative w-full h-28 bg-black rounded-xl overflow-hidden flex items-center justify-center">
                        <Video className="w-8 h-8 text-[#F4B41A]" />
                      </div>
                    ) : (
                      <img
                        src={item.mediaUrl}
                        alt={item.title}
                        className="w-full h-28 object-cover rounded-xl"
                      />
                    )}
                    <h5 className="font-editorial text-sm font-bold text-[#F7F4EC] truncate">
                      {item.title}
                    </h5>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete "${item.title}"?`)) {
                          deleteGalleryItem(item.id);
                          notify("Media item deleted.");
                        }
                      }}
                      className="text-[11px] text-red-400 hover:text-red-300 font-bold"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: STORY & EAST AFRICA SCOPE */}
        {activeTab === "story" && (
          <div className="bg-[#171A17] border-2 border-[#D99A00]/30 rounded-3xl p-8 space-y-6 animate-slide-up">
            <h2 className="font-editorial text-2xl font-bold text-[#F7F4EC]">
              Edit Our Story & East Africa Vision
            </h2>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                Headline
              </label>
              <input
                type="text"
                value={story.headline}
                onChange={(e) => updateStory({ headline: e.target.value })}
                className="w-full bg-[#101210] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-sm text-[#F7F4EC]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                Main Story
              </label>
              <textarea
                rows={4}
                value={story.mainStory}
                onChange={(e) => updateStory({ mainStory: e.target.value })}
                className="w-full bg-[#101210] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-sm text-[#F7F4EC] resize-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                East Africa Scope
              </label>
              <textarea
                rows={4}
                value={story.eastAfricaScope}
                onChange={(e) => updateStory({ eastAfricaScope: e.target.value })}
                className="w-full bg-[#101210] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-sm text-[#F7F4EC] resize-none"
              />
            </div>

            <button
              onClick={() => notify("Story updated live!")}
              className="btn-glass-gold text-xs py-3 px-8"
            >
              <Save className="w-4 h-4 text-[#073F27]" />
              <span>Save Story Updates</span>
            </button>
          </div>
        )}

        {/* TAB 10: GUEST INQUIRIES */}
        {activeTab === "inquiries" && (
          <div className="space-y-6 animate-slide-up">
            <h2 className="font-editorial text-2xl font-bold text-[#F7F4EC]">
              Guest Safari Inquiries ({inquiries.length})
            </h2>

            {inquiries.length === 0 ? (
              <div className="p-12 text-center bg-[#171A17] border border-[#D99A00]/25 rounded-3xl">
                <Mail className="w-10 h-10 text-[#D99A00]/50 mx-auto mb-2" />
                <p className="text-sm font-semibold text-[#F7F4EC]">No guest inquiries yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-6 bg-[#171A17] border border-[#D99A00]/30 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-[#F4B41A] bg-[#073F27] px-2.5 py-0.5 rounded-full border border-[#D99A00]/30">
                          {inq.refCode}
                        </span>
                        <span className="text-xs text-[#F7F4EC]/50">{inq.date}</span>
                      </div>
                      <h4 className="font-editorial text-xl font-bold text-[#F7F4EC]">
                        {inq.name} ({inq.country})
                      </h4>
                      <p className="text-xs text-[#F7F4EC]/80">
                        <strong>Email:</strong> {inq.email} · <strong>WhatsApp:</strong> {inq.phone}
                      </p>
                      {inq.interests && (
                        <p className="text-xs text-[#D99A00] mt-1">
                          <strong>Tour:</strong> {inq.interests} ({inq.duration})
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(
                          inq.name
                        )}%2C%20thank%20you%20for%20contacting%20Sonnenpfad%20Safaris.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-glass-whatsapp text-xs py-2 px-4"
                      >
                        Reply on WhatsApp
                      </a>

                      <button
                        onClick={() => {
                          if (window.confirm("Delete inquiry?")) {
                            deleteInquiry(inq.id);
                            notify("Inquiry deleted.");
                          }
                        }}
                        className="p-2 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded-full"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 11: SETTINGS & PASSCODE */}
        {activeTab === "settings" && (
          <div className="bg-[#171A17] border-2 border-[#D99A00]/30 rounded-3xl p-8 space-y-8 animate-slide-up">
            <div className="p-6 bg-[#101210] border border-[#D99A00]/30 rounded-2xl space-y-4">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-[#F4B41A]" />
                <h3 className="font-editorial text-xl font-bold text-[#F7F4EC]">
                  Change Admin Master Passcode
                </h3>
              </div>
              <p className="text-xs text-[#F7F4EC]/70">
                Update the secret password used to access this dashboard.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl">
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                    New Passcode
                  </label>
                  <input
                    type="password"
                    placeholder="Enter at least 4 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[#171A17] border border-[#D99A00]/30 rounded-xl px-4 py-2.5 text-xs text-[#F7F4EC]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                    Confirm New Passcode
                  </label>
                  <input
                    type="password"
                    placeholder="Re-type passcode"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#171A17] border border-[#D99A00]/30 rounded-xl px-4 py-2.5 text-xs text-[#F7F4EC]"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (newPassword.length < 4) {
                    alert("Passcode must be at least 4 characters.");
                    return;
                  }
                  if (newPassword !== confirmPassword) {
                    alert("Passwords do not match!");
                    return;
                  }
                  changeAdminPassword(newPassword);
                  setNewPassword("");
                  setConfirmPassword("");
                  notify("Master passcode updated successfully!");
                }}
                className="btn-glass-gold text-xs py-2.5 px-6"
              >
                <Save className="w-4 h-4 text-[#073F27]" />
                <span>Save New Passcode</span>
              </button>
            </div>

            <div>
              <h3 className="font-editorial text-xl font-bold text-[#F7F4EC] mb-4">
                Brand & Contact Channels
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={brandSettings.brandName}
                    onChange={(e) => updateBrandSettings({ brandName: e.target.value })}
                    className="w-full bg-[#101210] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-sm text-[#F7F4EC]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-[#D99A00] block mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={brandSettings.whatsapp}
                    onChange={(e) => updateBrandSettings({ whatsapp: e.target.value })}
                    className="w-full bg-[#101210] border border-[#D99A00]/30 rounded-xl px-3 py-2 text-sm text-[#F7F4EC]"
                  />
                </div>
              </div>

              <button
                onClick={() => notify("Settings saved live!")}
                className="btn-glass-forest text-xs py-3 px-8 mt-4"
              >
                <Save className="w-4 h-4 text-[#F4B41A]" />
                <span>Save Settings</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
