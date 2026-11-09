import React, { useState, useEffect } from "react";
import { CmsProvider, useCms } from "./context/CmsContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { SafariModal } from "./components/SafariModal";
import { CoffeeOrderModal } from "./components/CoffeeOrderModal";
import { CustomerReviewModal } from "./components/CustomerReviewModal";
import { SearchOverlay } from "./components/SearchOverlay";
import { HomePage } from "./pages/HomePage";
import { SafarisPage } from "./pages/SafarisPage";
import { EastAfricaPage } from "./pages/EastAfricaPage";
import { DestinationsPage } from "./pages/DestinationsPage";
import { ExperiencesPage } from "./pages/ExperiencesPage";
import { ShopPage } from "./pages/ShopPage";
import { GalleryPage } from "./pages/GalleryPage";
import { PlanSafariPage } from "./pages/PlanSafariPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { SafariPackage } from "./data/safarisData";

function MainAppContent() {
  const [currentPage, setCurrentPage] = useState<string>("home");
  const [selectedSafari, setSelectedSafari] = useState<SafariPackage | null>(null);
  const [quoteSafariName, setQuoteSafariName] = useState<string>("");
  const { brandSettings, theme } = useCms();

  // Listen to browser hash changes for routing
  useEffect(() => {
    const syncRouteFromHash = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (
        [
          "home",
          "safaris",
          "east-africa",
          "destinations",
          "experiences",
          "shop",
          "gallery",
          "plan",
          "about",
          "contact",
          "admin"
        ].includes(hash)
      ) {
        setCurrentPage(hash);
      } else if (!hash) {
        setCurrentPage("home");
      }
    };

    syncRouteFromHash();
    window.addEventListener("hashchange", syncRouteFromHash);
    return () => window.removeEventListener("hashchange", syncRouteFromHash);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenWhatsApp = (customText?: string) => {
    const defaultText = `Hello Sonnenpfad Safaris (${brandSettings.brandName}), I would like to inquire about an East African safari.`;
    const encoded = encodeURIComponent(customText || defaultText);
    const cleanNumber = brandSettings.whatsapp.replace(/[^0-9]/g, "");
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, "_blank");
  };

  const handleRequestQuote = (name: string) => {
    setQuoteSafariName(name);
    handleNavigate("contact");
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
        theme === "light"
          ? "bg-[#FFFFFF] text-[#0F172A] selection:bg-[#F4B41A] selection:text-[#073F27]"
          : "bg-[#0B0E0B] text-[#F7F4EC] selection:bg-[#D99A00] selection:text-[#073F27]"
      }`}
    >
      {/* 1. Header with Wanderers Style Navbar (image_ba9be8c7.png) */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* 2. Full-Screen Quick Search Overlay (image_196d9ac4.png) */}
      <SearchOverlay onNavigate={handleNavigate} />

      {/* 3. Separate Modular Page Routing with Semantic HTML structure */}
      <main className="flex-1">
        {currentPage === "home" && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectSafari={(s) => setSelectedSafari(s)}
            onRequestQuote={handleRequestQuote}
          />
        )}

        {currentPage === "safaris" && (
          <SafarisPage
            onSelectSafari={(s) => setSelectedSafari(s)}
            onRequestQuote={handleRequestQuote}
          />
        )}

        {currentPage === "east-africa" && (
          <EastAfricaPage
            onSelectSafari={(s) => setSelectedSafari(s)}
            onRequestQuote={handleRequestQuote}
          />
        )}

        {currentPage === "destinations" && (
          <DestinationsPage onRequestQuote={handleRequestQuote} />
        )}

        {currentPage === "experiences" && (
          <ExperiencesPage onRequestQuote={handleRequestQuote} />
        )}

        {currentPage === "shop" && <ShopPage />}

        {currentPage === "gallery" && (
          <GalleryPage onOpenAdmin={() => handleNavigate("admin")} />
        )}

        {currentPage === "plan" && <PlanSafariPage />}

        {currentPage === "about" && (
          <AboutPage
            onPlanClick={() => handleNavigate("plan")}
            onContactClick={() => handleNavigate("contact")}
          />
        )}

        {currentPage === "contact" && (
          <ContactPage initialSubject={quoteSafariName} />
        )}

        {currentPage === "admin" && <AdminDashboardPage />}
      </main>

      {/* 4. Footer */}
      <Footer
        onNavigate={handleNavigate}
        onWhatsAppClick={() => handleOpenWhatsApp()}
      />

      {/* 5. Persistent Floating WhatsApp Quick-Chat */}
      <FloatingWhatsApp onOpenDirect={() => handleOpenWhatsApp()} />

      {/* 6. Safari Deep Inspection Dossier Modal */}
      <SafariModal
        safari={selectedSafari}
        onClose={() => setSelectedSafari(null)}
        onRequestQuote={handleRequestQuote}
        onWhatsAppChat={(msg) => handleOpenWhatsApp(msg)}
      />

      {/* 7. Dedicated Interactive Coffee Order Modal */}
      <CoffeeOrderModal />

      {/* 8. Dedicated Interactive Customer Review & Rating Modal */}
      <CustomerReviewModal />
    </div>
  );
}

export default function App() {
  return (
    <CmsProvider>
      <MainAppContent />
    </CmsProvider>
  );
}
