import React, { createContext, useContext, useState, useEffect } from "react";
import { SAFARI_PACKAGES, SafariPackage } from "../data/safarisData";
import { DESTINATIONS, Destination } from "../data/destinationsData";
import { GALLERY_ITEMS, GalleryItem } from "../data/galleryData";

// Currency Formatter Utility for Ugandan Shillings (UGX)
export const formatUGX = (amount?: number | null): string => {
  if (amount == null || isNaN(amount)) return "UGX Price on Request";
  return `UGX ${Math.round(amount).toLocaleString("en-US")}`;
};

export interface MediaItem {
  id: string;
  type: "image" | "video";
  title: string;
  category: "Wildlife" | "Gorillas" | "Landscapes" | "Culture" | "Adventure" | "East Africa" | "Our Guests";
  location: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  caption: string;
  videoDuration?: string;
}

export interface BrandSettings {
  logoUrl: string;
  brandName: string;
  brandTagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroDescription: string;
  heroBgImage: string;
  introImage: string;
  gorillaBgImage: string;
  sunsetBgImage: string;
  eastAfricaHeroImage: string;
  phone: string;
  whatsapp: string;
  email: string;
  office: string;
  tiktokHandle: string;
  tiktokUrl: string;
}

export interface StoryContent {
  headline: string;
  mainStory: string;
  eastAfricaScope: string;
  philosophy: string;
}

export interface InquiryItem {
  id: string;
  refCode: string;
  date: string;
  name: string;
  country: string;
  email: string;
  phone: string;
  interests?: string;
  duration?: string;
  travelStyle?: string;
  travellers?: string;
  dates?: string;
  notes?: string;
  source: "builder" | "contact";
}

// Coffee & Coffee Products Model with UGX Pricing
export interface CoffeeProduct {
  id: string;
  name: string;
  origin: string;
  category: "Single Origin" | "Espresso Roast" | "Coffee Blends" | "Accessories" | "Skincare";
  roastLevel: "Light" | "Medium" | "Medium-Dark" | "Dark" | "Espresso" | "Artisanal Accessory" | "Botanical";
  price: number; // in UGX
  originalPrice?: number; // in UGX
  weight: string;
  rating: number;
  reviewsCount: number;
  image: string;
  isSale?: boolean;
  inStock: boolean;
  flavorNotes: string[];
  description: string;
}

export type ShopProduct = CoffeeProduct;

// Customer Coffee Order Model (in UGX)
export interface CoffeeOrder {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  productId: string;
  productName: string;
  quantity: number;
  grindPreference: string;
  totalAmount: number; // in UGX
  notes?: string;
  status: "Pending" | "Confirmed" | "Dispatched" | "Delivered";
}

// Customer Tour Review & Rating Model
export interface TourReview {
  id: string;
  author: string;
  country: string;
  tourName: string;
  date: string;
  avatar: string;
  rating: number; // 1-5 stars
  overallScore: number; // percentage (e.g. 98)
  wildlifeScore: number; // percentage
  guideScore: number; // percentage
  lodgingScore: number; // percentage
  content: string;
  status: "Verified Guest" | "Approved" | "Pending Approval" | "Featured";
  adminNotes?: string;
}

interface CmsContextType {
  // Theme Toggle: dark (deep black) and light (pure white daylight)
  theme: "dark" | "light";
  toggleTheme: () => void;
  brandSettings: BrandSettings;
  updateBrandSettings: (newSettings: Partial<BrandSettings>) => void;
  safaris: SafariPackage[];
  addSafari: (safari: SafariPackage) => void;
  updateSafari: (id: string, safari: Partial<SafariPackage>) => void;
  deleteSafari: (id: string) => void;
  gallery: MediaItem[];
  addGalleryItem: (item: Omit<MediaItem, "id">) => void;
  updateGalleryItem: (id: string, item: Partial<MediaItem>) => void;
  deleteGalleryItem: (id: string) => void;
  story: StoryContent;
  updateStory: (newStory: Partial<StoryContent>) => void;
  inquiries: InquiryItem[];
  addInquiry: (inquiry: Omit<InquiryItem, "id" | "date">) => void;
  deleteInquiry: (id: string) => void;
  // Hero Slides
  heroSlides: string[];
  setHeroSlides: (slides: string[]) => void;
  addHeroSlide: (url: string) => void;
  removeHeroSlide: (index: number) => void;
  // Coffee Shop Products (UGX)
  coffeeProducts: CoffeeProduct[];
  shopProducts: CoffeeProduct[];
  addCoffeeProduct: (product: Omit<CoffeeProduct, "id">) => void;
  updateCoffeeProduct: (id: string, product: Partial<CoffeeProduct>) => void;
  deleteCoffeeProduct: (id: string) => void;
  addShopProduct: (product: Omit<CoffeeProduct, "id">) => void;
  deleteShopProduct: (id: string) => void;
  // Coffee Orders Management
  coffeeOrders: CoffeeOrder[];
  addCoffeeOrder: (order: Omit<CoffeeOrder, "id" | "date" | "status">) => CoffeeOrder;
  deleteCoffeeOrder: (id: string) => void;
  updateOrderStatus: (id: string, status: CoffeeOrder["status"]) => void;
  // Order Modal Helpers
  selectedCoffeeForOrder: CoffeeProduct | null;
  openCoffeeOrderModal: (product: CoffeeProduct) => void;
  closeCoffeeOrderModal: () => void;
  // Customer Reviews & Rating Engine
  reviews: TourReview[];
  addCustomerReview: (review: Omit<TourReview, "id" | "date" | "status" | "avatar"> & { avatar?: string }) => TourReview;
  updateReviewStatus: (id: string, status: TourReview["status"]) => void;
  deleteReview: (id: string) => void;
  isReviewModalOpen: boolean;
  openReviewModal: () => void;
  closeReviewModal: () => void;
  // Quick Search Overlay
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  // Admin Authentication
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPassword: (newPass: string) => void;
  hasCustomPassword: boolean;
  // Data Storage Info & Backup/Restore
  exportBackupJson: () => string;
  importBackupJson: (jsonString: string) => { success: boolean; error?: string };
  resetAllToDefault: () => void;
}

const DEFAULT_BRAND: BrandSettings = {
  logoUrl: "/assets/aistudio/WhatsApp_Image_2026-09-29_at_21.35.55_c9561e3f.jpeg",
  brandName: "Sonnenpfad Safaris Uganda Ltd",
  brandTagline: "Discover Uganda & East Africa. Follow the Sun Path to Adventure.",
  heroHeadline: "Discover Uganda & East Africa.",
  heroSubheadline: "Follow the Sun Path to Adventure.",
  heroDescription:
    "Journey through wild savannahs, ancient rainforests, the Great Migration of Serengeti and Masai Mara, legendary rivers and vibrant communities with Sonnenpfad Safaris.",
  heroBgImage:
    "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2400&q=85",
  introImage:
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80",
  gorillaBgImage:
    "https://images.unsplash.com/photo-1544911845-1a7c6b8f4b1e?auto=format&fit=crop&w=2400&q=85",
  sunsetBgImage:
    "https://images.unsplash.com/photo-1504006833117-8886a355efbf?auto=format&fit=crop&w=2400&q=85",
  eastAfricaHeroImage:
    "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2400&q=85",
  phone: "+256 773 333108",
  whatsapp: "+256 773 333108",
  email: "info@sonnenpfadsafaris.com",
  office: "Entebbe / Kampala, Uganda · East Africa Expeditions",
  tiktokHandle: "@kisacathy1900",
  tiktokUrl: "https://www.tiktok.com/@kisacathy1900?_r=1&_t=ZS-9AJFAoC3tqs"
};

const DEFAULT_STORY: StoryContent = {
  headline: "Sonnenpfad Means 'Sun Path' — Exploring the Breadth of East Africa",
  mainStory:
    "Sonnenpfad means 'sun path' in German — reflecting our core belief that travel is an uplifting journey toward discovery. Rooted in Uganda, the Pearl of Africa, Sonnenpfad Safaris introduces travellers to the sublime wildlife, untamed ecosystems, and welcoming people across the East African landscape.",
  eastAfricaScope:
    "We curate seamless cross-border expeditions spanning Uganda, Kenya, Tanzania, and Rwanda. From the mist-draped volcanic mountain gorilla sanctuaries of Bwindi and Volcanoes National Park to the sweeping golden plains of the Serengeti and Masai Mara during the Great Migration, our private journeys offer the ultimate African wilderness tapestry.",
  philosophy:
    "Our goal is simple: to help every traveller experience East Africa in a way that feels personal, authentic, safe, and deeply enriching. Every journey is adapted around the traveller with private 4x4 Land Cruisers, expert driver-guides, and hand-selected eco-lodges."
};

const INITIAL_MEDIA: MediaItem[] = [
  {
    id: "med-1",
    type: "image",
    title: "Silverback in Morning Mist",
    category: "Gorillas",
    location: "Bwindi Impenetrable National Park, Uganda",
    mediaUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    caption: "A dominant mountain gorilla silverback surveying his family group amidst the moss-covered trees of Bwindi."
  },
  {
    id: "med-2",
    type: "image",
    title: "Elephant Herd Crossing at Golden Hour",
    category: "Wildlife",
    location: "Queen Elizabeth National Park, Uganda",
    mediaUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
    caption: "Matriarch leading her family across the Kasenyi savannah as the sun drops behind the Rwenzori peaks."
  },
  {
    id: "med-v1",
    type: "video",
    title: "The Great East African Migration & Nile River",
    category: "East Africa",
    location: "Serengeti & Murchison Falls Circuit",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80",
    caption: "Cinematic wildlife footage capturing big cats, elephants and sweeping savannah plains across East Africa.",
    videoDuration: "1:24"
  },
  {
    id: "med-3",
    type: "image",
    title: "The Thunderous Nile Gorge",
    category: "Landscapes",
    location: "Murchison Falls National Park, Uganda",
    mediaUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    caption: "The entire Victoria Nile forced violently through a 7-meter rock fissure into the Devil's Cauldron below."
  },
  {
    id: "med-v2",
    type: "video",
    title: "Intimate Mountain Gorilla Encounter",
    category: "Gorillas",
    location: "Bwindi Forest Canopy, Uganda",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1544911845-1a7c6b8f4b1e?auto=format&fit=crop&w=1200&q=80",
    caption: "Watch gentle giants feeding peacefully beneath the emerald rainforest canopy.",
    videoDuration: "0:48"
  },
  {
    id: "med-4",
    type: "image",
    title: "Great Migration Across the Mara-Serengeti Plains",
    category: "East Africa",
    location: "Serengeti & Masai Mara Eco-Region",
    mediaUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    caption: "Endless herds of wildebeests and zebras following the rains across East Africa's iconic grasslands."
  },
  {
    id: "med-5",
    type: "image",
    title: "Tree-Climbing Lioness in Ishasha",
    category: "Wildlife",
    location: "Queen Elizabeth National Park, Uganda",
    mediaUrl: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1600&q=80",
    caption: "A lioness resting gracefully across the wide branches of an ancient sycamore fig tree."
  },
  {
    id: "med-6",
    type: "image",
    title: "White Water Rafting on the Nile",
    category: "Adventure",
    location: "Jinja, Source of the River Nile",
    mediaUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80",
    caption: "Navigating exhilarating rapids at the historic source of the River Nile."
  },
  {
    id: "med-7",
    type: "image",
    title: "East African Cultural Heritage & Dance",
    category: "Culture",
    location: "Uganda & East African Communities",
    mediaUrl: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1600&q=80",
    caption: "Local community dancers sharing ancestral songs and rhythmic movements by the evening fire."
  }
];

const EAST_AFRICA_SAFARIS: SafariPackage[] = [
  ...SAFARI_PACKAGES,
  {
    id: "pkg-ea-1",
    slug: "12-day-east-africa-primates-migration",
    title: "12 Days — East Africa Primates & Great Migration",
    duration: "12 Days / 11 Nights",
    durationDays: 12,
    destinations: ["Uganda (Bwindi & Kibale)", "Kenya (Masai Mara)", "Tanzania (Serengeti)"],
    destinationsFormatted: "Uganda Gorillas + Kenya Mara + Tanzania Serengeti",
    tagline: "The crown jewel of African travel: Gorilla trekking paired with the world's greatest wildlife migration.",
    overview:
      "Witness the two ultimate highlights of the African continent in one seamless expedition. Begin with chimpanzees in Kibale and endangered mountain gorillas in Uganda's Bwindi before flying eastward into Kenya and Tanzania's iconic savannah plains for the legendary Big 5 and Great Migration.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Mountain Gorilla Trekking in Bwindi Impenetrable Forest",
      "Chimpanzee habituation walk in Kibale Primate Capital",
      "Seamless scenic flight transfer between Entebbe and Masai Mara / Serengeti",
      "Witnessing the Great Migration crossing crocodile-filled rivers",
      "Big 5 predator drives: lions, leopards, cheetahs, rhinos and elephants",
      "Exclusive luxury safari tented camps under East African stars"
    ],
    accommodationLevel: "Premier 5-Star Luxury Safari Lodges & Private Tented Camps",
    priceUGX: 24500000,
    formattedPriceUGX: "UGX 24,500,000",
    itinerary: [
      { day: 1, title: "Arrival in Entebbe, Uganda", description: "VIP reception and transfer to your luxury boutique hotel overlooking Lake Victoria." },
      { day: 2, title: "Scenic Flight to Bwindi Rainforest", description: "Fly to southwestern Uganda and ascend into the misty rainforest of Bwindi." },
      { day: 3, title: "Mountain Gorilla Trekking", description: "Spend a magical, life-defining hour face-to-face with a wild mountain gorilla family." },
      { day: 4, title: "Kibale Forest Primate Safari", description: "Trek chimpanzees and experience the lush biodiversity of Kibale." },
      { day: 5, title: "Cross-Border Flight to Masai Mara, Kenya", description: "Clear brief border formalities and touch down directly into the heart of the Mara." },
      { day: 6, title: "Full Day Big 5 Game Drives in Masai Mara", description: "Sunrise to sunset tracking lions, cheetahs and immense herds of herbivores." },
      { day: 7, title: "Masai Mara to Serengeti National Park, Tanzania", description: "Cross into the legendary endless plains of the Serengeti." },
      { day: 8, title: "Serengeti Great Migration Tracking", description: "Follow the thundering herds of over a million wildebeest and zebras." },
      { day: 9, title: "Ngorongoro Crater Caldera Safari", description: "Descend into the UNESCO World Heritage volcanic caldera, home to black rhinos and flamingo lakes." },
      { day: 10, title: "Lake Manyara & Rift Valley Escarpment", description: "Search for tree-climbing lions and hundreds of water bird species." },
      { day: 11, title: "Cultural Encounter & Farewell Campfire", description: "Authentic Maasai warrior cultural visit and luxury farewell dinner." },
      { day: 12, title: "Departure via Kilimanjaro or Nairobi", description: "Transfer to the international airport for your homeward journey." }
    ],
    included: [
      "Official Mountain Gorilla Trekking Permit",
      "Chimpanzee Tracking Permit",
      "All regional inter-park flight transfers in East Africa",
      "4x4 Safari Land Cruisers with pop-up roofs throughout",
      "All national park entries & crater service fees",
      "11 nights luxury accommodation on full board basis",
      "Dedicated lead bilingual safari guide"
    ],
    excluded: ["International intercontinental flights", "Visas for Uganda, Kenya & Tanzania", "Gratuities"],
    importantNotes: [
      "Visas can be obtained under the East Africa Tourist Visa covering Uganda, Kenya and Rwanda."
    ],
    faqs: [
      {
        question: "Can this tour be arranged in reverse or tailored?",
        answer: "Yes, our East Africa specialists customize the flow, starting from either Entebbe, Nairobi, or Kilimanjaro."
      }
    ]
  }
];

const DEFAULT_HERO_SLIDES: string[] = [
  "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2400&q=85"
];

// Curated East African & Ugandan Specialty Coffee with Authentic UGX Prices
const DEFAULT_COFFEE_PRODUCTS: CoffeeProduct[] = [
  {
    id: "cof-1",
    name: "Mount Elgon Bugisu AA Arabica",
    origin: "Mount Elgon, Eastern Uganda (1,800m - 2,200m)",
    category: "Single Origin",
    roastLevel: "Medium",
    price: 65000,
    originalPrice: 85000,
    weight: "250g / 8.8oz (Whole Bean or Ground)",
    rating: 5,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    inStock: true,
    flavorNotes: ["Wild Bergamot", "Dark Chocolate", "Cranberry", "Honey Finish"],
    description: "Sourced from the mineral-dense volcanic soils of Mount Elgon. Handpicked by local cooperative smallholders and sun-dried on African raised beds for an extraordinarily bright, aromatic cup."
  },
  {
    id: "cof-2",
    name: "Rwenzori Mountains of the Moon Espresso",
    origin: "Rwenzori Glacial Foothills, Western Uganda (2,000m)",
    category: "Espresso Roast",
    roastLevel: "Espresso",
    price: 75000,
    weight: "250g Whole Bean",
    rating: 5,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    flavorNotes: ["Black Cherry", "Dark Cacao", "Roasted Hazelnut", "Velvety Crema"],
    description: "Grown along the misty, glacier-fed slopes of the Rwenzori Mountains. Roasted slow and deep to produce a velvety crema with dark bittersweet chocolate and ripe berry undertones."
  },
  {
    id: "cof-3",
    name: "Bwindi Gorilla Conservation Shade Coffee",
    origin: "Bwindi Impenetrable Forest Border, Uganda",
    category: "Single Origin",
    roastLevel: "Medium-Dark",
    price: 80000,
    originalPrice: 95000,
    weight: "300g Tin",
    rating: 5,
    reviewsCount: 52,
    image: "https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    inStock: true,
    flavorNotes: ["Caramel", "Plum", "Brown Sugar", "Earthy Spice"],
    description: "100% shade-grown Arabica farmed by communities bordering the Bwindi gorilla sanctuary. A portion of every bag directly funds community anti-poaching scouts and mountain gorilla habitat buffer zones."
  },
  {
    id: "cof-4",
    name: "Nile Sunrise Native Wild Robusta Reserve",
    origin: "Lake Victoria Basin, Jinja & Central Uganda",
    category: "Single Origin",
    roastLevel: "Dark",
    price: 55000,
    weight: "250g Whole Bean",
    rating: 5,
    reviewsCount: 21,
    image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    flavorNotes: ["Toasted Walnut", "Molasses", "Cedarwood", "Extra High Caffeine"],
    description: "Uganda is the ancestral birthplace of wild Robusta coffee. This rare, wet-processed specialty reserve is intense, full-bodied and packs double the antioxidant caffeine kick of standard arabica."
  },
  {
    id: "cof-5",
    name: "East Africa Grand Safari Trio Tasting Box",
    origin: "Uganda (Bugisu), Kenya (Nyeri), Tanzania (Kilimanjaro)",
    category: "Coffee Blends",
    roastLevel: "Medium",
    price: 130000,
    originalPrice: 160000,
    weight: "3 x 150g Specialty Gift Box",
    rating: 5,
    reviewsCount: 44,
    image: "https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    inStock: true,
    flavorNotes: ["Jasmine Floral", "Blackberry", "Sweet Tangerine", "Caramel"],
    description: "A luxury tasting journey traversing East Africa's top coffee regions: Uganda's Bugisu AA, Kenya's blackcurrant Nyeri, and Tanzania's sweet peaberry Kilimanjaro in a commemorative presentation box."
  },
  {
    id: "cof-6",
    name: "Hand-Carved Olive Wood Coffee Scoop & Tamper",
    origin: "Handcrafted by East African Woodcraft Artisans",
    category: "Accessories",
    roastLevel: "Artisanal Accessory",
    price: 85000,
    weight: "1 Solid Olive Wood Piece",
    rating: 5,
    reviewsCount: 17,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    flavorNotes: ["Natural Olive Grain", "Food-Safe Beeswax Sealed", "Durable"],
    description: "Artisanal dual-purpose coffee measure scoop and espresso tamper hand-carved from sustainably salvaged East African olive wood with stunning natural grain patterns."
  },
  {
    id: "cof-7",
    name: "Organic Coffee Bean & Nilotica Shea Body Scrub",
    origin: "Ugandan Roasted Grounds & Northern Shea Butter",
    category: "Skincare",
    roastLevel: "Botanical",
    price: 70000,
    weight: "200ml Glass Jar",
    rating: 5,
    reviewsCount: 33,
    image: "https://images.unsplash.com/photo-1608248597359-2e663a8a9147?auto=format&fit=crop&w=800&q=80",
    inStock: true,
    flavorNotes: ["Fresh Espresso", "Vanilla Bean", "Raw Cocoa", "Nilotica Shea"],
    description: "Rejuvenating spa exfoliant combining micro-ground Sonnenpfad roasted coffee beans with rare Ugandan Nilotica shea butter. Boosts skin microcirculation and leaves skin silken and glowingly scented."
  },
  {
    id: "cof-8",
    name: "Insulated Safari French Press & Field Tumbler Kit",
    origin: "Sonnenpfad Safari Gear Division",
    category: "Accessories",
    roastLevel: "Artisanal Accessory",
    price: 150000,
    originalPrice: 180000,
    weight: "500ml Double-Wall Steel Kit",
    rating: 5,
    reviewsCount: 26,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    inStock: true,
    flavorNotes: ["Double-Wall Vacuum", "Zero Sludge Microfilter", "Rugged Matte Olive"],
    description: "Double-wall stainless steel travel french press that brews fresh coffee inside your open-top safari cruiser and keeps it piping hot for 8 hours across early morning game drives."
  }
];

const DEFAULT_COFFEE_ORDERS: CoffeeOrder[] = [
  {
    id: "ord-101",
    date: "Today, 10:15 AM",
    customerName: "Julian Weber",
    phone: "+49 170 549321",
    email: "julian.weber@alpen-travel.de",
    deliveryAddress: "Entebbe Serena Hotel, Room 304 (or DHL to Frankfurt)",
    productId: "cof-1",
    productName: "Mount Elgon Bugisu AA Arabica",
    quantity: 3,
    grindPreference: "Whole Bean (Fresh Sealed)",
    totalAmount: 195000,
    notes: "Please deliver before our flight to Kilimanjaro on Friday.",
    status: "Confirmed"
  },
  {
    id: "ord-102",
    date: "Yesterday, 4:40 PM",
    customerName: "Sarah Jenkins",
    phone: "+44 7911 123456",
    email: "sarah.j@safari-enthusiast.co.uk",
    deliveryAddress: "Bwindi Lodge, Buhoma Gate",
    productId: "cof-3",
    productName: "Bwindi Gorilla Conservation Shade Coffee",
    quantity: 2,
    grindPreference: "French Press / Coarse",
    totalAmount: 160000,
    notes: "Loving the gorilla tracking! Wanted to take real conservation coffee home.",
    status: "Dispatched"
  }
];

const DEFAULT_REVIEWS: TourReview[] = [
  {
    id: "rev-1",
    author: "Elena Rostova & David Miller",
    country: "Germany & United Kingdom",
    tourName: "Action Safari & Gorilla Trek",
    date: "October 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    overallScore: 98,
    wildlifeScore: 100,
    guideScore: 100,
    lodgingScore: 95,
    content: "The gorilla encounter in Bwindi was spiritual, and our driver-guide was phenomenal. Every lodge exceeded expectations and the cross-border flight to Masai Mara was effortless. Sonnenpfad Safaris delivered the trip of a lifetime.",
    status: "Featured"
  },
  {
    id: "rev-2",
    author: "Dr. Marcus & Sarah Weber",
    country: "Switzerland",
    tourName: "12 Days East Africa Primates & Great Migration",
    date: "September 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    overallScore: 99,
    wildlifeScore: 100,
    guideScore: 99,
    lodgingScore: 98,
    content: "From the thunder of Murchison Falls to watching thousands of wildebeest plunge across the river in Serengeti, the logistics were flawless. Cathy and the Sonnenpfad team were in touch daily via WhatsApp.",
    status: "Featured"
  },
  {
    id: "rev-3",
    author: "Claire & Thomas Dubois",
    country: "France",
    tourName: "Queen Elizabeth & Bwindi Wildlife Odyssey",
    date: "August 2026",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    rating: 5,
    overallScore: 96,
    wildlifeScore: 98,
    guideScore: 100,
    lodgingScore: 92,
    content: "Seeing tree-climbing lions in Ishasha and having silverbacks walk within meters was unforgettable. The Land Cruiser was immaculate with charging points and chilled drinks. Highly recommended!",
    status: "Verified Guest"
  }
];

const CmsContext = createContext<CmsContextType | undefined>(undefined);

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state: dark and light
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const saved = localStorage.getItem("sonnenpfad_theme");
      if (saved === "light" || saved === "dark") return saved;
      return "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sonnenpfad_theme", theme);
      if (theme === "light") {
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
      }
    } catch {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const [brandSettings, setBrandSettings] = useState<BrandSettings>(() => {
    try {
      const saved = localStorage.getItem("sonnenpfad_brand_settings");
      return saved ? { ...DEFAULT_BRAND, ...JSON.parse(saved) } : DEFAULT_BRAND;
    } catch {
      return DEFAULT_BRAND;
    }
  });

  const [safaris, setSafaris] = useState<SafariPackage[]>(() => {
    try {
      const saved = localStorage.getItem("sonnenpfad_safaris");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((s: any) => {
            const priceUGX = s.priceUGX || (s.durationDays ? s.durationDays * 1200000 : 5200000);
            return {
              ...s,
              priceUGX,
              formattedPriceUGX: s.formattedPriceUGX || formatUGX(priceUGX)
            };
          });
        }
      }
      return EAST_AFRICA_SAFARIS;
    } catch {
      return EAST_AFRICA_SAFARIS;
    }
  });

  const [gallery, setGallery] = useState<MediaItem[]>(() => {
    try {
      const saved = localStorage.getItem("sonnenpfad_gallery_media");
      return saved ? JSON.parse(saved) : INITIAL_MEDIA;
    } catch {
      return INITIAL_MEDIA;
    }
  });

  const [story, setStory] = useState<StoryContent>(() => {
    try {
      const saved = localStorage.getItem("sonnenpfad_story");
      return saved ? { ...DEFAULT_STORY, ...JSON.parse(saved) } : DEFAULT_STORY;
    } catch {
      return DEFAULT_STORY;
    }
  });

  const [inquiries, setInquiries] = useState<InquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem("sonnenpfad_inquiries");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [heroSlides, setHeroSlides] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("sonnenpfad_hero_slides");
      return saved ? JSON.parse(saved) : DEFAULT_HERO_SLIDES;
    } catch {
      return DEFAULT_HERO_SLIDES;
    }
  });

  const [coffeeProducts, setCoffeeProducts] = useState<CoffeeProduct[]>(() => {
    try {
      const saved = localStorage.getItem("sonnenpfad_coffee_products");
      return saved ? JSON.parse(saved) : DEFAULT_COFFEE_PRODUCTS;
    } catch {
      return DEFAULT_COFFEE_PRODUCTS;
    }
  });

  const [coffeeOrders, setCoffeeOrders] = useState<CoffeeOrder[]>(() => {
    try {
      const saved = localStorage.getItem("sonnenpfad_coffee_orders");
      return saved ? JSON.parse(saved) : DEFAULT_COFFEE_ORDERS;
    } catch {
      return DEFAULT_COFFEE_ORDERS;
    }
  });

  // Customer Reviews & Ratings state
  const [reviews, setReviews] = useState<TourReview[]>(() => {
    try {
      const saved = localStorage.getItem("sonnenpfad_reviews");
      return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
    } catch {
      return DEFAULT_REVIEWS;
    }
  });

  const [isReviewModalOpen, setIsReviewModalOpen] = useState<boolean>(false);
  const [selectedCoffeeForOrder, setSelectedCoffeeForOrder] = useState<CoffeeProduct | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Admin Authentication State
  const [adminPassword, setAdminPassword] = useState<string>(() => {
    return localStorage.getItem("sonnenpfad_admin_password") || "sonnenpfad2026";
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("sonnenpfad_admin_session") === "active";
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem("sonnenpfad_brand_settings", JSON.stringify(brandSettings));
    } catch {}
  }, [brandSettings]);

  useEffect(() => {
    try {
      localStorage.setItem("sonnenpfad_safaris", JSON.stringify(safaris));
    } catch {}
  }, [safaris]);

  useEffect(() => {
    try {
      localStorage.setItem("sonnenpfad_gallery_media", JSON.stringify(gallery));
    } catch {}
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem("sonnenpfad_story", JSON.stringify(story));
    } catch {}
  }, [story]);

  useEffect(() => {
    try {
      localStorage.setItem("sonnenpfad_inquiries", JSON.stringify(inquiries));
    } catch {}
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem("sonnenpfad_hero_slides", JSON.stringify(heroSlides));
    } catch {}
  }, [heroSlides]);

  useEffect(() => {
    try {
      localStorage.setItem("sonnenpfad_coffee_products", JSON.stringify(coffeeProducts));
    } catch {}
  }, [coffeeProducts]);

  useEffect(() => {
    try {
      localStorage.setItem("sonnenpfad_coffee_orders", JSON.stringify(coffeeOrders));
    } catch {}
  }, [coffeeOrders]);

  useEffect(() => {
    try {
      localStorage.setItem("sonnenpfad_reviews", JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  const updateBrandSettings = (newSettings: Partial<BrandSettings>) => {
    setBrandSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const addSafari = (newSafari: SafariPackage) => {
    setSafaris((prev) => [newSafari, ...prev]);
  };

  const updateSafari = (id: string, updated: Partial<SafariPackage>) => {
    setSafaris((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
  };

  const deleteSafari = (id: string) => {
    setSafaris((prev) => prev.filter((s) => s.id !== id));
  };

  const addGalleryItem = (item: Omit<MediaItem, "id">) => {
    const newItem: MediaItem = {
      ...item,
      id: "media-" + Date.now()
    };
    setGallery((prev) => [newItem, ...prev]);
  };

  const updateGalleryItem = (id: string, item: Partial<MediaItem>) => {
    setGallery((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...item } : m))
    );
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((m) => m.id !== id));
  };

  const updateStory = (newStory: Partial<StoryContent>) => {
    setStory((prev) => ({ ...prev, ...newStory }));
  };

  const addInquiry = (inquiry: Omit<InquiryItem, "id" | "date">) => {
    const newInquiry: InquiryItem = {
      ...inquiry,
      id: "inq-" + Date.now(),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      })
    };
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== id));
  };

  const addHeroSlide = (url: string) => {
    if (!url.trim()) return;
    setHeroSlides((prev) => [...prev, url]);
  };

  const removeHeroSlide = (index: number) => {
    setHeroSlides((prev) => prev.filter((_, idx) => idx !== index));
  };

  const addCoffeeProduct = (prod: Omit<CoffeeProduct, "id">) => {
    const newProd: CoffeeProduct = {
      ...prod,
      id: "cof-" + Date.now()
    };
    setCoffeeProducts((prev) => [newProd, ...prev]);
  };

  const updateCoffeeProduct = (id: string, updated: Partial<CoffeeProduct>) => {
    setCoffeeProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deleteCoffeeProduct = (id: string) => {
    setCoffeeProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addShopProduct = addCoffeeProduct;
  const deleteShopProduct = deleteCoffeeProduct;

  const addCoffeeOrder = (orderData: Omit<CoffeeOrder, "id" | "date" | "status">): CoffeeOrder => {
    const newOrder: CoffeeOrder = {
      ...orderData,
      id: "ord-" + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      status: "Pending"
    };
    setCoffeeOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const deleteCoffeeOrder = (id: string) => {
    setCoffeeOrders((prev) => prev.filter((o) => o.id !== id));
  };

  const updateOrderStatus = (id: string, status: CoffeeOrder["status"]) => {
    setCoffeeOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  // Customer Reviews & Ratings Engine
  const addCustomerReview = (
    reviewData: Omit<TourReview, "id" | "date" | "status" | "avatar"> & { avatar?: string }
  ): TourReview => {
    const newRev: TourReview = {
      ...reviewData,
      id: "rev-" + Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      avatar:
        reviewData.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      status: "Verified Guest"
    };
    setReviews((prev) => [newRev, ...prev]);
    return newRev;
  };

  const updateReviewStatus = (id: string, status: TourReview["status"]) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const openReviewModal = () => setIsReviewModalOpen(true);
  const closeReviewModal = () => setIsReviewModalOpen(false);

  // Order Modal controls
  const openCoffeeOrderModal = (product: CoffeeProduct) => {
    setSelectedCoffeeForOrder(product);
  };

  const closeCoffeeOrderModal = () => {
    setSelectedCoffeeForOrder(null);
  };

  // Search Overlay controls
  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  // Admin Auth handlers
  const loginAdmin = (password: string): boolean => {
    if (password === adminPassword) {
      setIsAdminLoggedIn(true);
      localStorage.setItem("sonnenpfad_admin_session", "active");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem("sonnenpfad_admin_session");
  };

  const changeAdminPassword = (newPass: string) => {
    if (!newPass || newPass.trim().length < 4) return;
    setAdminPassword(newPass.trim());
    localStorage.setItem("sonnenpfad_admin_password", newPass.trim());
  };

  // Backup & Export / Restore helpers
  const exportBackupJson = (): string => {
    const exportData = {
      backupTimestamp: new Date().toISOString(),
      appName: "Sonnenpfad Safaris Uganda Ltd",
      brandSettings,
      safaris,
      gallery,
      story,
      inquiries,
      heroSlides,
      coffeeProducts,
      coffeeOrders,
      reviews
    };
    return JSON.stringify(exportData, null, 2);
  };

  const importBackupJson = (jsonString: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.brandSettings) setBrandSettings(parsed.brandSettings);
      if (Array.isArray(parsed.safaris)) setSafaris(parsed.safaris);
      if (Array.isArray(parsed.gallery)) setGallery(parsed.gallery);
      if (parsed.story) setStory(parsed.story);
      if (Array.isArray(parsed.inquiries)) setInquiries(parsed.inquiries);
      if (Array.isArray(parsed.heroSlides)) setHeroSlides(parsed.heroSlides);
      if (Array.isArray(parsed.coffeeProducts)) setCoffeeProducts(parsed.coffeeProducts);
      else if (Array.isArray(parsed.shopProducts)) setCoffeeProducts(parsed.shopProducts);
      if (Array.isArray(parsed.coffeeOrders)) setCoffeeOrders(parsed.coffeeOrders);
      if (Array.isArray(parsed.reviews)) setReviews(parsed.reviews);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || "Invalid backup format." };
    }
  };

  const resetAllToDefault = () => {
    setBrandSettings(DEFAULT_BRAND);
    setSafaris(EAST_AFRICA_SAFARIS);
    setGallery(INITIAL_MEDIA);
    setStory(DEFAULT_STORY);
    setHeroSlides(DEFAULT_HERO_SLIDES);
    setCoffeeProducts(DEFAULT_COFFEE_PRODUCTS);
    setCoffeeOrders(DEFAULT_COFFEE_ORDERS);
    setReviews(DEFAULT_REVIEWS);
    localStorage.removeItem("sonnenpfad_brand_settings");
    localStorage.removeItem("sonnenpfad_safaris");
    localStorage.removeItem("sonnenpfad_gallery_media");
    localStorage.removeItem("sonnenpfad_story");
    localStorage.removeItem("sonnenpfad_hero_slides");
    localStorage.removeItem("sonnenpfad_coffee_products");
    localStorage.removeItem("sonnenpfad_coffee_orders");
    localStorage.removeItem("sonnenpfad_reviews");
  };

  return (
    <CmsContext.Provider
      value={{
        theme,
        toggleTheme,
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
        addInquiry,
        deleteInquiry,
        heroSlides,
        setHeroSlides,
        addHeroSlide,
        removeHeroSlide,
        coffeeProducts,
        shopProducts: coffeeProducts,
        addCoffeeProduct,
        updateCoffeeProduct,
        deleteCoffeeProduct,
        addShopProduct,
        deleteShopProduct,
        coffeeOrders,
        addCoffeeOrder,
        deleteCoffeeOrder,
        updateOrderStatus,
        selectedCoffeeForOrder,
        openCoffeeOrderModal,
        closeCoffeeOrderModal,
        reviews,
        addCustomerReview,
        updateReviewStatus,
        deleteReview,
        isReviewModalOpen,
        openReviewModal,
        closeReviewModal,
        isSearchOpen,
        openSearch,
        closeSearch,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        changeAdminPassword,
        hasCustomPassword: adminPassword !== "sonnenpfad2026",
        exportBackupJson,
        importBackupJson,
        resetAllToDefault
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error("useCms must be used within a CmsProvider");
  }
  return context;
};
