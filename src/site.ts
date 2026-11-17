/**
 * Sonnenpfad Safaris Uganda Ltd - Global Engine & Direct Supabase Database System
 * Designed for zero-server Cloudflare Pages static hosting with direct Supabase persistence.
 */

import {
  supabase,
  testSupabaseConnection,
  SUPABASE_SCHEMA_SQL,
  SUPABASE_URL,
  SUPABASE_DB_URL,
} from "./supabase";
import * as googleMedia from "./googleMedia";

export interface SafariPackage {
  id: string;
  title: string;
  duration: string;
  durationDays: number;
  destinations: string[];
  destinationsFormatted: string;
  priceUGX: number;
  formattedPriceUGX: string;
  image: string;
  altText?: string;
  overview: string;
  highlights: string[];
  included: string[];
  excluded: string[];
  accommodationLevel: "Luxury" | "Premium" | "Mid-Range";
  isFlagship?: boolean;
  likesCount?: number;
  itinerary: {
    day: number;
    title: string;
    description: string;
    accommodation?: string;
  }[];
}

export interface ShopProduct {
  id: string;
  name: string;
  origin: string;
  category:
    | "Specialty Coffee"
    | "Expedition Gear"
    | "Optics & Binoculars"
    | "Apparel & Hats"
    | "Accessories"
    | "Skincare";
  roastLevel?: string;
  price: number;
  originalPrice?: number;
  weight: string;
  rating: number;
  reviewsCount: number;
  image: string;
  altText?: string;
  isSale?: boolean;
  inStock: boolean;
  flavorNotes: string[];
  description: string;
  likesCount?: number;
}

export interface CommentItem {
  id: string;
  itemId: string;
  author: string;
  rating: number;
  text: string;
  itemType: string;
  date: string;
  status?: "Published" | "Pending Approval" | "Hidden";
}

export interface CustomerReview {
  id: string;
  author: string;
  country: string;
  tourName: string;
  rating: number;
  date: string;
  overallScore: number;
  wildlifeScore: number;
  guideScore: number;
  lodgingScore: number;
  content: string;
  status:
    | "Verified Guest"
    | "Featured on Homepage"
    | "Approved"
    | "Pending Approval"
    | "Hidden";
}

export interface CoffeeOrder {
  id: string;
  date: string;
  customerName: string;
  phone: string;
  email: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  deliveryAddress: string;
  grindPreference?: string;
  notes?: string;
  status: "Pending" | "Confirmed" | "Dispatched" | "Delivered";
}

export interface TikTokItem {
  id: string;
  title: string;
  videoUrl: string;
  thumbnail: string;
  views: string;
  likes: string;
}

export interface DeletionRequest {
  id: string;
  fullName: string;
  contactInfo: string;
  recordScope: string;
  reason?: string;
  status: "Pending Review" | "Completed";
  createdAt: string;
}

export const formatUGX = (amount: number): string => {
  return "UGX " + Number(amount || 0).toLocaleString("en-US");
};

export function escapeHtml(str: unknown): string {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// =========================================================================
// 1. LICENSED LOCAL MEDIA & DEFAULT SEED DATA (NO FAKE REVIEWS / CLAIMS)
// =========================================================================

const DEFAULT_SAFARIS: SafariPackage[] = [
  {
    id: "saf-1",
    title: "3-Day Bwindi Mountain Gorilla Trekking Expedition",
    duration: "3 Days / 2 Nights",
    durationDays: 3,
    destinations: ["Bwindi Impenetrable Forest", "Equator Crossing"],
    destinationsFormatted: "Bwindi Impenetrable National Park",
    priceUGX: 5200000,
    formattedPriceUGX: "UGX 5,200,000",
    image: "./assets/images/bwindi-gorilla.jpg",
    altText: "Silverback mountain gorilla resting among emerald ferns in Bwindi Impenetrable Forest, Uganda",
    overview:
      "Observe endangered mountain gorillas in Bwindi Impenetrable National Park with licensed Uganda Wildlife Authority rangers. Includes a guided tracking session, forest lodge accommodation, and private 4x4 transport from Entebbe or Kampala. Minimum age for gorilla permits is 15 years per UWA regulations.",
    highlights: [
      "Official UWA mountain gorilla tracking permit coordination",
      "Scenic drive through the Kigezi Highlands and Equator landmark",
      "Full-board stay at eco-lodges bordering the rainforest canopy",
    ],
    included: [
      "UWA Mountain Gorilla Trekking Permit",
      "Private 4x4 Safari Land Cruiser with pop-up roof & licensed driver-guide",
      "2 nights full-board lodge accommodation",
      "National park entry fees and bottled drinking water in vehicle",
    ],
    excluded: [
      "International flights and entry visas",
      "Optional community porter fees during the forest trek",
      "Personal travel insurance and gratuities",
    ],
    accommodationLevel: "Luxury",
    likesCount: 0,
    itinerary: [
      {
        day: 1,
        title: "Entebbe / Kampala to Bwindi Forest",
        description:
          "Depart Entebbe in a private 4x4 Land Cruiser with an Equator stopover before arriving at Bwindi.",
        accommodation: "Buhoma Sector Forest Lodge",
      },
      {
        day: 2,
        title: "Mountain Gorilla Tracking",
        description:
          "Morning ranger briefing followed by a guided forest trek to observe a habituated gorilla family for one regulated hour.",
        accommodation: "Buhoma Sector Forest Lodge",
      },
      {
        day: 3,
        title: "Return Transfer to Kampala / Entebbe",
        description: "Morning breakfast overlooking the forest canopy followed by the return journey.",
      },
    ],
  },
  {
    id: "saf-2",
    title: "14-Day Grand East Africa: Primates & Great Migration",
    duration: "14 Days / 13 Nights",
    durationDays: 14,
    destinations: ["Bwindi", "Kibale", "Queen Elizabeth", "Serengeti", "Masai Mara", "Ngorongoro"],
    destinationsFormatted: "Uganda, Kenya & Tanzania Cross-Border Circuit",
    priceUGX: 24500000,
    formattedPriceUGX: "UGX 24,500,000",
    image: "./assets/images/hero-savannah.jpg",
    altText: "Private 4x4 safari Land Cruiser observing elephants across golden East African savannah plains",
    overview:
      "A comprehensive multi-country East African itinerary linking Uganda primate sanctuaries with the seasonal wildlife plains of Serengeti, Ngorongoro Conservation Area, and Masai Mara.",
    highlights: [
      "Mountain gorilla trekking in Bwindi & chimpanzee tracking in Kibale",
      "Game drives across Serengeti, Masai Mara & Ngorongoro Crater",
      "Kazinga Channel boat excursion in Queen Elizabeth National Park",
    ],
    included: [
      "Coordinated UWA primate permits (gorillas and chimpanzees)",
      "Scheduled regional flights & private 4x4 safari vehicles",
      "Boutique lodges and tented camps on full-board basis",
    ],
    excluded: ["International airfare", "Entry visas", "Personal travel insurance"],
    accommodationLevel: "Luxury",
    isFlagship: true,
    likesCount: 0,
    itinerary: [
      { day: 1, title: "Entebbe Arrival", description: "Airport reception and transfer to lakeside accommodation." },
      { day: 2, title: "Kibale Primate Sanctuary", description: "Guided chimpanzee forest walk and wetland trail." },
      { day: 3, title: "Queen Elizabeth National Park", description: "Afternoon launch cruise along the Kazinga Channel." },
    ],
  },
  {
    id: "saf-3",
    title: "7-Day Pearls of Uganda: Gorillas, Chimps & Savannah",
    duration: "7 Days / 6 Nights",
    durationDays: 7,
    destinations: ["Kibale Forest", "Queen Elizabeth", "Bwindi Impenetrable"],
    destinationsFormatted: "Kibale, Queen Elizabeth & Bwindi Forest",
    priceUGX: 9900000,
    formattedPriceUGX: "UGX 9,900,000",
    image: "./assets/images/ishasha-lions.jpg",
    altText: "Lions resting on fig tree branches in Ishasha sector of Queen Elizabeth National Park, Uganda",
    overview:
      "Combines chimpanzee tracking in Kibale Forest, tree-climbing lion game drives in Ishasha, a Kazinga Channel boat cruise, and Bwindi mountain gorilla trekking in one continuous Ugandan circuit.",
    highlights: [
      "Bwindi mountain gorilla permit and Kibale chimpanzee permit",
      "Ishasha southern sector tree-climbing lion game drives",
      "Private 4x4 Land Cruiser with bilingual Ugandan naturalist guide",
    ],
    included: [
      "Gorilla and chimpanzee tracking permits",
      "Private 4x4 safari Land Cruiser & driver-guide",
      "6 nights full-board lodge accommodation",
    ],
    excluded: ["International flights", "Visas", "Personal insurance"],
    accommodationLevel: "Premium",
    likesCount: 0,
    itinerary: [
      { day: 1, title: "Kampala to Kibale Forest", description: "Transit through western tea estates to Kibale." },
      { day: 2, title: "Chimpanzee Tracking & Queen Elizabeth", description: "Morning forest trek and afternoon crater drive." },
    ],
  },
  {
    id: "saf-4",
    title: "10-Day Serengeti & Masai Mara Savannah Circuit",
    duration: "10 Days / 9 Nights",
    durationDays: 10,
    destinations: ["Masai Mara", "Serengeti", "Ngorongoro Crater", "Amboseli"],
    destinationsFormatted: "Kenya & Tanzania Savannah Reserves",
    priceUGX: 16800000,
    formattedPriceUGX: "UGX 16,800,000",
    image: "./assets/images/hero-savannah.jpg",
    altText: "Elephants crossing East African grasslands near a green 4x4 safari vehicle at sunset",
    overview:
      "Seasonal overland wildlife circuit exploring the Serengeti plains, Masai Mara river corridors, Ngorongoro caldera, and Amboseli elephant reserves.",
    highlights: [
      "Guided game drives timed to seasonal migration routes",
      "Full-day descent into Ngorongoro Conservation Area",
      "Amboseli savannah drives facing Mount Kilimanjaro",
    ],
    included: ["Conservation and national park fees", "4x4 safari vehicle", "Full-board lodge stays"],
    excluded: ["Optional balloon excursions", "Visas and travel insurance"],
    accommodationLevel: "Luxury",
    likesCount: 0,
    itinerary: [
      { day: 1, title: "Nairobi Reception", description: "Arrival briefing and overnight lodge stay." },
      { day: 2, title: "Amboseli Wildlife Reserve", description: "Afternoon game drive beneath Kilimanjaro." },
    ],
  },
  {
    id: "saf-5",
    title: "5-Day Murchison Falls & Ziwa Rhino Explorer",
    duration: "5 Days / 4 Nights",
    durationDays: 5,
    destinations: ["Murchison Falls", "Budongo Forest", "Ziwa Rhino Sanctuary"],
    destinationsFormatted: "Murchison Falls & Victoria Nile",
    priceUGX: 7800000,
    formattedPriceUGX: "UGX 7,800,000",
    image: "./assets/images/murchison-nile.jpg",
    altText: "Murchison Falls surging through narrow gorge on the Victoria Nile at sunrise in Uganda",
    overview:
      "Track southern white rhinos on foot at Ziwa Rhino Sanctuary, cruise along the Victoria Nile to the base of Murchison Falls, and explore Budongo Forest Reserve.",
    highlights: [
      "Guided on-foot rhino tracking at Ziwa Rhino Sanctuary",
      "Victoria Nile boat excursion to the base of Murchison Falls",
      "Top-of-the-falls geological overlook and northern savannah drive",
    ],
    included: ["Park entry fees, boat launch, Ziwa & Budongo permits", "Full-board safari lodge stays"],
    excluded: ["Personal drinks", "Travel insurance and gratuities"],
    accommodationLevel: "Premium",
    likesCount: 0,
    itinerary: [
      { day: 1, title: "Ziwa Rhino Sanctuary to Murchison Falls", description: "Guided rhino walk en route to northern Uganda." },
    ],
  },
  {
    id: "saf-6",
    title: "8-Day Rwanda & Uganda Primate Route",
    duration: "8 Days / 7 Nights",
    durationDays: 8,
    destinations: ["Volcanoes National Park", "Lake Kivu", "Bwindi Impenetrable"],
    destinationsFormatted: "Rwanda & Southwestern Uganda",
    priceUGX: 12500000,
    formattedPriceUGX: "UGX 12,500,000",
    image: "./assets/images/bwindi-gorilla.jpg",
    altText: "Mountain gorilla surrounded by lush vegetation in the Virunga and Bwindi highlands",
    overview:
      "Cross-border primate route linking Rwanda's Volcanoes National Park and Lake Kivu with southwestern Uganda's Bwindi Impenetrable Forest.",
    highlights: [
      "Volcanoes National Park golden monkey & gorilla habitats",
      "Lake Kivu shore stay and cross-border Cyanika/Katuna transfer",
      "Bwindi forest canopy lodge experience",
    ],
    included: ["Cross-border 4x4 transport and scheduled park permits", "Boutique lodge stays"],
    excluded: ["East Africa Tourist Visa fees", "Gratuities"],
    accommodationLevel: "Luxury",
    likesCount: 0,
    itinerary: [
      { day: 1, title: "Kigali to Volcanoes National Park", description: "City transfer north into the Virunga foothills." },
    ],
  },
];

const DEFAULT_PRODUCTS: ShopProduct[] = [
  {
    id: "prod-1",
    name: "Mount Elgon Peaberry Reserve Coffee",
    origin: "Mount Elgon Slopes, Eastern Uganda",
    category: "Specialty Coffee",
    roastLevel: "Medium Roast",
    price: 65000,
    originalPrice: 85000,
    weight: "250g Whole Bean",
    rating: 5,
    reviewsCount: 0,
    image: "./assets/images/elgon-coffee.jpg",
    altText: "Roasted Mount Elgon Ugandan Arabica coffee beans in burlap bag with ceramic pour-over carafe",
    isSale: true,
    inStock: true,
    flavorNotes: ["Citrus Zest", "Dark Cocoa", "Brown Sugar"],
    description:
      "Small-batch single-origin Arabica harvested from high-altitude volcanic soils on Mount Elgon (1,800m–2,100m).",
    likesCount: 0,
  },
  {
    id: "prod-2",
    name: "Rwenzori Highland Washed Arabica",
    origin: "Rwenzori Foothills, Western Uganda",
    category: "Specialty Coffee",
    roastLevel: "Medium-Dark Roast",
    price: 75000,
    originalPrice: 90000,
    weight: "250g Whole Bean",
    rating: 5,
    reviewsCount: 0,
    image: "./assets/images/elgon-coffee.jpg",
    altText: "Freshly roasted Ugandan Rwenzori Arabica coffee beans prepared for brewing",
    isSale: false,
    inStock: true,
    flavorNotes: ["Black Currant", "Roasted Almond", "Caramel"],
    description:
      "Naturally washed Arabica sourced from farming cooperatives bordering the Rwenzori mountain foothills.",
    likesCount: 0,
  },
  {
    id: "prod-3",
    name: "Savannah Dawn Espresso Blend",
    origin: "Uganda Rift Valley Blend",
    category: "Specialty Coffee",
    roastLevel: "Espresso Roast",
    price: 80000,
    weight: "500g Bag",
    rating: 5,
    reviewsCount: 0,
    image: "./assets/images/elgon-coffee.jpg",
    altText: "Savannah Dawn espresso blend coffee beans and ceramic carafe on travertine stone",
    isSale: false,
    inStock: true,
    flavorNotes: ["Molasses", "Hazelnut", "Warm Spice"],
    description:
      "Full-bodied morning roast balanced for camp stove brewing, stovetop moka pots, and espresso extraction.",
    likesCount: 0,
  },
  {
    id: "prod-4",
    name: "Heavy-Duty Gorilla Trekking Gaiters",
    origin: "Water-Resistant Canvas",
    category: "Expedition Gear",
    price: 115000,
    originalPrice: 140000,
    weight: "Pair (Adjustable S/M/L)",
    rating: 5,
    reviewsCount: 0,
    image: "./assets/images/safari-gear.jpg",
    altText: "Olive waterproof gorilla trekking gaiters alongside binoculars, khaki hat, and vacuum flask",
    isSale: true,
    inStock: true,
    flavorNotes: ["Mud & Nettle Shield", "Underboot Strap", "Adjustable Calf Closure"],
    description:
      "Designed for rainforest trails in Bwindi and Kibale to shield lower trousers and boots from trail mud, moisture, and forest ants.",
    likesCount: 0,
  },
  {
    id: "prod-5",
    name: "Wildlife Field Binoculars 10x42 HD",
    origin: "Multi-Coated Roof Prism",
    category: "Optics & Binoculars",
    price: 540000,
    originalPrice: 650000,
    weight: "Fog-Resistant Body",
    rating: 5,
    reviewsCount: 0,
    image: "./assets/images/safari-gear.jpg",
    altText: "Matte black 10x42 wildlife safari binoculars with neck strap and lens caps",
    isSale: false,
    inStock: true,
    flavorNotes: ["10x42 Magnification", "Dawn Light Clarity", "Rubber Armored Grip"],
    description:
      "Calibrated for long-range wildlife observation during early morning savannah drives and canopy primate searches.",
    likesCount: 0,
  },
  {
    id: "prod-6",
    name: "Wide-Brim UPF Sun Safari Hat",
    origin: "Breathable Cotton Canvas",
    category: "Apparel & Hats",
    price: 60000,
    originalPrice: 75000,
    weight: "Adjustable Fit",
    rating: 5,
    reviewsCount: 0,
    image: "./assets/images/safari-gear.jpg",
    altText: "Khaki wide-brim breathable safari sun hat with leather chin cord",
    isSale: true,
    inStock: true,
    flavorNotes: ["Wide Sun Brim", "Mesh Crown Vent", "Packable Canvas"],
    description:
      "Lightweight sun protection engineered for open pop-up roof game drives across equatorial East Africa.",
    likesCount: 0,
  },
  {
    id: "prod-7",
    name: "Stainless Vacuum Safari Flask 1.2L",
    origin: "18/8 Food-Grade Steel",
    category: "Accessories",
    price: 95000,
    originalPrice: 120000,
    weight: "1.2 Litre Capacity",
    rating: 5,
    reviewsCount: 0,
    image: "./assets/images/safari-gear.jpg",
    altText: "Brushed stainless steel 1.2 litre vacuum insulated safari coffee flask",
    isSale: false,
    inStock: true,
    flavorNotes: ["Double-Wall Insulated", "Integrated Cup Lid", "Leakproof Seal"],
    description:
      "Insulated expedition flask keeping hot coffee or cold drinking water temperature-stable during full-day game drives.",
    likesCount: 0,
  },
];

// ZERO FAKE REVIEWS: Reviews come exclusively from real guest submissions in Supabase / localStorage
const DEFAULT_REVIEWS: CustomerReview[] = [];
const DEFAULT_COMMENTS: Record<string, CommentItem[]> = {};

const DEFAULT_SETTINGS = {
  phone: "+256 773 333108",
  whatsapp: "+256 773 333108",
  email: "info@sonnenpfadsafaris.com",
  tiktok: "@kisacathy1900",
  tiktokUrl: "https://www.tiktok.com/@kisacathy1900",
  address: "Plot 14 Entebbe Road, Kampala, Uganda",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.035313936648!2d32.5711!3d0.3136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb8a7b97c0f1%3A0x6b77741d4f23b20!2sEntebbe%20Rd%2C%20Kampala!5e0!3m2!1sen!2sug!4v1700000000000!5m2!1sen!2sug",
  moderationMode: "auto" as "auto" | "manual",
};

const MY_REVIEWS_KEY = "sonnenpfad_my_review_ids";
const MY_COMMENTS_KEY = "sonnenpfad_my_comment_ids";

function readIdSet(storageKey: string): string[] {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function addIdToSet(storageKey: string, id: string) {
  try {
    const existing = readIdSet(storageKey);
    if (!existing.includes(id)) {
      existing.unshift(id);
      localStorage.setItem(storageKey, JSON.stringify(existing.slice(0, 200)));
    }
  } catch {}
}

function removeIdFromSet(storageKey: string, id: string) {
  try {
    const filtered = readIdSet(storageKey).filter((x) => x !== id);
    localStorage.setItem(storageKey, JSON.stringify(filtered));
  } catch {}
}

function isPublicStatus(status?: string): boolean {
  return status !== "Hidden" && status !== "Pending Approval";
}

function mapCommentRow(d: any): CommentItem {
  return {
    id: d.id,
    itemId: d.item_id,
    author: d.author,
    rating: Number(d.rating) || 5,
    text: d.text,
    itemType: d.item_type || "general",
    date: d.date,
    status: (d.status as CommentItem["status"]) || "Published",
  };
}

function normalizeAssetPath(url?: string, fallback = "./assets/images/hero-savannah.jpg"): string {
  const raw = String(url || "").trim();
  if (!raw) return fallback;
  if (raw.startsWith("/assets/")) return "." + raw;
  return raw;
}

const SITE_MEDIA_PREFIX = "__site_media__|";
const SHOP_PRODUCT_MIRROR_PREFIX = "__shop_prod__";
const SHOP_PRODUCT_MIRROR_MARKER = "__shop_product__";

function isSiteMediaRow(row: any): boolean {
  if (!row) return false;
  return (
    String(row.id || "").startsWith("smedia-") ||
    String(row.views || "").startsWith(SITE_MEDIA_PREFIX)
  );
}

function isShopMirrorRow(row: any): boolean {
  if (!row) return false;
  return (
    String(row.id || "").startsWith(SHOP_PRODUCT_MIRROR_PREFIX) ||
    String(row.views || "") === SHOP_PRODUCT_MIRROR_MARKER
  );
}

function isInternalSyncRow(row: any): boolean {
  return isSiteMediaRow(row) || isShopMirrorRow(row);
}

const DEFAULT_TIKTOKS: TikTokItem[] = [
  {
    id: "tt-1",
    title: "Bwindi Impenetrable Forest silverback tracking briefing and canopy scenes",
    videoUrl: "https://www.tiktok.com/@kisacathy1900",
    thumbnail: "./assets/images/bwindi-gorilla.jpg",
    views: "Official Clip",
    likes: "TikTok Reel",
  },
  {
    id: "tt-2",
    title: "Victoria Nile boat launch approaching the gorge at Murchison Falls",
    videoUrl: "https://www.tiktok.com/@kisacathy1900",
    thumbnail: "./assets/images/murchison-nile.jpg",
    views: "Official Clip",
    likes: "TikTok Reel",
  },
  {
    id: "tt-3",
    title: "Tree-climbing lions in sycamore fig branches in Ishasha, Queen Elizabeth",
    videoUrl: "https://www.tiktok.com/@kisacathy1900",
    thumbnail: "./assets/images/ishasha-lions.jpg",
    views: "Official Clip",
    likes: "TikTok Reel",
  },
  {
    id: "tt-4",
    title: "Mount Elgon highland Arabica harvest and roast dispatch in Kampala",
    videoUrl: "https://www.tiktok.com/@kisacathy1900",
    thumbnail: "./assets/images/elgon-coffee.jpg",
    views: "Official Clip",
    likes: "TikTok Reel",
  },
];

function mapSafariRow(d: any): SafariPackage {
  return {
    id: d.id,
    title: d.title,
    duration: d.duration,
    durationDays: d.duration_days || 3,
    destinations: d.destinations || [],
    destinationsFormatted: d.destinations_formatted || d.title,
    priceUGX: Number(d.price_ugx),
    formattedPriceUGX: d.formatted_price_ugx || "UGX " + Number(d.price_ugx).toLocaleString("en-US"),
    image: normalizeAssetPath(d.image, "./assets/images/hero-savannah.jpg"),
    altText: d.title,
    overview: d.overview || "",
    highlights: d.highlights || [],
    included: d.included || [],
    excluded: d.excluded || [],
    accommodationLevel: d.accommodation_level || "Luxury",
    isFlagship: Boolean(d.is_flagship),
    likesCount: Number(d.likes_count) || 0,
    itinerary: d.itinerary || [],
  };
}

function toSafariRow(s: SafariPackage) {
  return {
    id: s.id,
    title: s.title,
    duration: s.duration,
    duration_days: s.durationDays,
    destinations: s.destinations,
    destinations_formatted: s.destinationsFormatted,
    price_ugx: s.priceUGX,
    formatted_price_ugx: s.formattedPriceUGX,
    image: s.image,
    overview: s.overview,
    highlights: s.highlights,
    included: s.included,
    excluded: s.excluded,
    accommodation_level: s.accommodationLevel,
    is_flagship: s.isFlagship || false,
    likes_count: s.likesCount || 0,
    itinerary: s.itinerary || [],
  };
}

function toProductRow(p: ShopProduct) {
  return {
    id: p.id,
    name: p.name,
    origin: p.origin,
    category: p.category,
    price: p.price,
    original_price: p.originalPrice || null,
    weight: p.weight,
    rating: p.rating,
    reviews_count: p.reviewsCount,
    image: p.image,
    is_sale: p.isSale || false,
    in_stock: p.inStock,
    description: p.description,
    flavor_notes: p.flavorNotes || [],
    likes_count: p.likesCount || 0,
  };
}

function mapProductRow(d: any): ShopProduct {
  return {
    id: d.id,
    name: d.name,
    origin: d.origin || "East Africa",
    category: d.category,
    price: Number(d.price),
    originalPrice: d.original_price ? Number(d.original_price) : undefined,
    weight: d.weight || "Standard",
    rating: Number(d.rating) || 5,
    reviewsCount: Number(d.reviews_count) || 0,
    image: normalizeAssetPath(d.image, "./assets/images/safari-gear.jpg"),
    altText: d.name,
    isSale: Boolean(d.is_sale),
    inStock: d.in_stock !== false,
    flavorNotes: d.flavor_notes || [],
    description: d.description || "",
    likesCount: Number(d.likes_count) || 0,
  };
}

function toShopMirrorRow(p: ShopProduct) {
  return {
    id: SHOP_PRODUCT_MIRROR_PREFIX + p.id,
    title: p.name,
    video_url: p.category,
    thumbnail: p.image,
    views: SHOP_PRODUCT_MIRROR_MARKER,
    likes: JSON.stringify({
      ...p,
      image: normalizeAssetPath(p.image, "./assets/images/safari-gear.jpg"),
    }),
  };
}

function mapShopMirrorRow(d: any): ShopProduct | null {
  if (!d) return null;
  try {
    if (d.likes && String(d.likes).trim().startsWith("{")) {
      const parsed = JSON.parse(d.likes);
      if (parsed && parsed.name) {
        return {
          ...parsed,
          id: String(parsed.id || String(d.id || "").replace(SHOP_PRODUCT_MIRROR_PREFIX, "")),
          price: Number(parsed.price) || 0,
          originalPrice: parsed.originalPrice ? Number(parsed.originalPrice) : undefined,
          rating: Number(parsed.rating) || 5,
          reviewsCount: Number(parsed.reviewsCount) || 0,
          inStock: parsed.inStock !== false,
          image: normalizeAssetPath(parsed.image || d.thumbnail, "./assets/images/safari-gear.jpg"),
        };
      }
    }
  } catch {}
  return {
    id: String(d.id || "").replace(SHOP_PRODUCT_MIRROR_PREFIX, ""),
    name: d.title || "Sonnenpfad Expedition Item",
    origin: "East Africa",
    category: (d.video_url || "Expedition Gear") as ShopProduct["category"],
    price: 0,
    weight: "Standard",
    rating: 5,
    reviewsCount: 0,
    image: normalizeAssetPath(d.thumbnail, "./assets/images/safari-gear.jpg"),
    inStock: true,
    flavorNotes: [],
    description: "",
    likesCount: 0,
  };
}

function mapReviewRow(d: any): CustomerReview {
  return {
    id: d.id,
    author: d.author,
    country: d.country,
    tourName: d.tour_name,
    rating: Number(d.rating) || 5,
    date: d.date,
    overallScore: Number(d.overall_score) || 95,
    wildlifeScore: Number(d.wildlife_score) || 95,
    guideScore: Number(d.guide_score) || 95,
    lodgingScore: Number(d.lodging_score) || 95,
    content: d.content,
    status: (d.status as CustomerReview["status"]) || "Verified Guest",
  };
}

function mapOrderRow(d: any): CoffeeOrder {
  return {
    id: d.id,
    date: d.date,
    customerName: d.customer_name,
    phone: d.phone,
    email: d.email || "",
    productName: d.product_name,
    quantity: Number(d.quantity) || 1,
    totalAmount: Number(d.total_amount) || 0,
    deliveryAddress: d.delivery_address,
    grindPreference: d.grind_preference || "",
    notes: d.notes || "",
    status: (d.status as CoffeeOrder["status"]) || "Pending",
  };
}

// =========================================================================
// 2. LIVE SUPABASE + LOCALSTORAGE SYNC ENGINE
// =========================================================================
export const db = {
  async fetchLive() {
    try {
      const [settingsRes, safarisRes, productsRes, tiktoksRes, reviewsRes, ordersRes, likesRes, commentsRes] =
        await Promise.allSettled([
          supabase.from("settings").select("*").eq("id", "primary_config").maybeSingle(),
          supabase.from("safaris").select("*").order("created_at", { ascending: false }),
          supabase.from("products").select("*").order("created_at", { ascending: false }),
          supabase.from("tiktoks").select("*").order("created_at", { ascending: false }),
          supabase.from("reviews").select("*").order("created_at", { ascending: false }),
          supabase.from("orders").select("*").order("created_at", { ascending: false }),
          supabase.from("likes").select("item_id, count"),
          supabase.from("comments").select("*").order("created_at", { ascending: false }),
        ]);

      if (settingsRes.status === "fulfilled" && !settingsRes.value.error && settingsRes.value.data) {
        const s = settingsRes.value.data;
        const localSaved = this.getSettings();
        const merged = {
          ...DEFAULT_SETTINGS,
          phone: s.phone || DEFAULT_SETTINGS.phone,
          whatsapp: s.whatsapp || DEFAULT_SETTINGS.whatsapp,
          email: s.email || DEFAULT_SETTINGS.email,
          tiktok: s.tiktok || DEFAULT_SETTINGS.tiktok,
          tiktokUrl: s.tiktok_url || DEFAULT_SETTINGS.tiktokUrl,
          address: s.address || DEFAULT_SETTINGS.address,
          mapEmbedUrl: s.map_embed_url || DEFAULT_SETTINGS.mapEmbedUrl,
          moderationMode: (s.moderation_mode || localSaved.moderationMode || "auto") as "auto" | "manual",
        };
        localStorage.setItem("sonnenpfad_settings", JSON.stringify(merged));
        if (s.admin_passcode) {
          localStorage.setItem("sonnenpfad_admin_pw", String(s.admin_passcode));
        }
      }

      if (safarisRes.status === "fulfilled" && !safarisRes.value.error && safarisRes.value.data?.length) {
        localStorage.setItem(
          "sonnenpfad_safaris",
          JSON.stringify(safarisRes.value.data.map(mapSafariRow))
        );
      }

      const mirroredProductRows: ShopProduct[] =
        tiktoksRes.status === "fulfilled" && !tiktoksRes.value.error && Array.isArray(tiktoksRes.value.data)
          ? (tiktoksRes.value.data as any[])
              .filter((d) => isShopMirrorRow(d))
              .map(mapShopMirrorRow)
              .filter((p): p is ShopProduct => Boolean(p))
          : [];

      const nativeProductsOk =
        productsRes.status === "fulfilled" && !productsRes.value.error && Array.isArray(productsRes.value.data);

      if (mirroredProductRows.length > 0 && (!nativeProductsOk || (productsRes.value.data?.length || 0) === 0)) {
        localStorage.setItem("sonnenpfad_shop_products", JSON.stringify(mirroredProductRows));
      } else if (nativeProductsOk && productsRes.value.data!.length > 0) {
        const nativeMapped = productsRes.value.data!.map(mapProductRow);
        if (mirroredProductRows.length > 0) {
          const mirrorMap = new Map(mirroredProductRows.map((p) => [p.id, p]));
          const combined = [
            ...mirroredProductRows,
            ...nativeMapped.filter((np) => !mirrorMap.has(np.id)),
          ];
          localStorage.setItem("sonnenpfad_shop_products", JSON.stringify(combined));
        } else {
          localStorage.setItem("sonnenpfad_shop_products", JSON.stringify(nativeMapped));
        }
      }

      if (tiktoksRes.status === "fulfilled" && !tiktoksRes.value.error && tiktoksRes.value.data) {
        const reelRows = (tiktoksRes.value.data as any[]).filter((d) => !isInternalSyncRow(d));
        if (reelRows.length > 0) {
          const mappedTt = reelRows.map((d: any) => ({
            id: d.id,
            title: d.title,
            videoUrl: d.video_url,
            thumbnail: normalizeAssetPath(d.thumbnail, "./assets/images/bwindi-gorilla.jpg"),
            views: d.views || "Official Clip",
            likes: d.likes || "TikTok Reel",
          }));
          localStorage.setItem("sonnenpfad_tiktoks", JSON.stringify(mappedTt));
        }
      }

      if (reviewsRes.status === "fulfilled" && !reviewsRes.value.error && reviewsRes.value.data) {
        localStorage.setItem(
          "sonnenpfad_reviews",
          JSON.stringify(reviewsRes.value.data.map(mapReviewRow))
        );
      }

      if (ordersRes.status === "fulfilled" && !ordersRes.value.error && ordersRes.value.data) {
        localStorage.setItem(
          "sonnenpfad_coffee_orders",
          JSON.stringify(ordersRes.value.data.map(mapOrderRow))
        );
      }

      if (likesRes.status === "fulfilled" && !likesRes.value.error && likesRes.value.data) {
        for (const row of likesRes.value.data as any[]) {
          if (row && row.item_id) {
            localStorage.setItem("sonnenpfad_likes_" + row.item_id, String(Number(row.count) || 0));
          }
        }
      }

      if (commentsRes.status === "fulfilled" && !commentsRes.value.error && commentsRes.value.data) {
        const grouped: Record<string, CommentItem[]> = {};
        for (const row of commentsRes.value.data as any[]) {
          const item = mapCommentRow(row);
          if (!grouped[item.itemId]) grouped[item.itemId] = [];
          grouped[item.itemId].push(item);
        }
        // Refresh cached per-item comment keys from cloud snapshot
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const k = localStorage.key(i);
          if (k && k.startsWith("sonnenpfad_comments_")) {
            const itemId = k.replace("sonnenpfad_comments_", "");
            if (!grouped[itemId]) {
              localStorage.setItem(k, "[]");
            }
          }
        }
        for (const [itemId, items] of Object.entries(grouped)) {
          localStorage.setItem("sonnenpfad_comments_" + itemId, JSON.stringify(items));
        }
      }
    } catch {
      // Offline fallback cleanly uses local storage
    }

    hydrateLiveSiteContent();
    return {
      settings: this.getSettings(),
      tiktoks: this.getTiktoks(),
    };
  },

  getItemLikeCount(itemId: string, fallbackCount: number = 0): number {
    try {
      const val = localStorage.getItem("sonnenpfad_likes_" + itemId);
      if (val !== null) return Number(val) || 0;
    } catch {}
    return Number(fallbackCount) || 0;
  },

  async getSafaris(): Promise<SafariPackage[]> {
    try {
      const { data, error } = await supabase
        .from("safaris")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        const mapped = data.map(mapSafariRow);
        localStorage.setItem("sonnenpfad_safaris", JSON.stringify(mapped));
        return mapped;
      }
    } catch {}

    try {
      const stored = localStorage.getItem("sonnenpfad_safaris");
      const parsed: SafariPackage[] = stored ? JSON.parse(stored) : DEFAULT_SAFARIS;
      return parsed.map((s) => ({ ...s, image: normalizeAssetPath(s.image, "./assets/images/hero-savannah.jpg") }));
    } catch {
      return DEFAULT_SAFARIS;
    }
  },

  async saveSafaris(items: SafariPackage[]) {
    localStorage.setItem("sonnenpfad_safaris", JSON.stringify(items));
  },

  async addSafari(item: Omit<SafariPackage, "id"> & { id?: string }) {
    const id = item.id || "saf-" + Date.now();
    const completeItem: SafariPackage = { ...item, id };
    const existingBefore = await this.getSafaris();
    const deduped = [completeItem, ...existingBefore.filter((s) => s.id !== completeItem.id)];

    try {
      const { count } = await supabase
        .from("safaris")
        .select("id", { count: "exact", head: true });
      if (!count || count === 0) {
        await supabase.from("safaris").upsert(deduped.map(toSafariRow));
      } else {
        await supabase.from("safaris").upsert(toSafariRow(completeItem));
      }
    } catch {}

    await this.saveSafaris(deduped);
    hydrateLiveSiteContent();
    return completeItem;
  },

  async deleteSafari(id: string) {
    const existingBefore = await this.getSafaris();
    const filtered = existingBefore.filter((s) => s.id !== id);
    try {
      const { count } = await supabase
        .from("safaris")
        .select("id", { count: "exact", head: true });
      if ((!count || count === 0) && filtered.length > 0) {
        await supabase.from("safaris").upsert(filtered.map(toSafariRow));
      } else {
        await supabase.from("safaris").delete().eq("id", id);
      }
    } catch {}
    await this.saveSafaris(filtered);
    hydrateLiveSiteContent();
  },

  async getProducts(): Promise<ShopProduct[]> {
    try {
      const [nativeRes, mirrorRes] = await Promise.allSettled([
        supabase.from("products").select("*").order("created_at", { ascending: false }),
        supabase
          .from("tiktoks")
          .select("*")
          .like("id", `${SHOP_PRODUCT_MIRROR_PREFIX}%`)
          .order("created_at", { ascending: false }),
      ]);

      const nativeOk =
        nativeRes.status === "fulfilled" && !nativeRes.value.error && Array.isArray(nativeRes.value.data);
      const nativeList = nativeOk ? nativeRes.value.data!.map(mapProductRow) : [];

      const mirrorOk =
        mirrorRes.status === "fulfilled" && !mirrorRes.value.error && Array.isArray(mirrorRes.value.data);
      const mirrorList = mirrorOk
        ? (mirrorRes.value.data as any[])
            .map(mapShopMirrorRow)
            .filter((p): p is ShopProduct => Boolean(p))
        : [];

      if (mirrorList.length > 0 && (!nativeOk || nativeList.length === 0)) {
        localStorage.setItem("sonnenpfad_shop_products", JSON.stringify(mirrorList));
        return mirrorList;
      }

      if (nativeOk && nativeList.length > 0) {
        if (mirrorList.length > 0) {
          const mirrorMap = new Map(mirrorList.map((p) => [p.id, p]));
          const merged = [
            ...mirrorList,
            ...nativeList.filter((np) => !mirrorMap.has(np.id)),
          ];
          localStorage.setItem("sonnenpfad_shop_products", JSON.stringify(merged));
          return merged;
        }
        localStorage.setItem("sonnenpfad_shop_products", JSON.stringify(nativeList));
        return nativeList;
      }

      if (mirrorList.length > 0) {
        localStorage.setItem("sonnenpfad_shop_products", JSON.stringify(mirrorList));
        return mirrorList;
      }
    } catch {}

    try {
      const stored = localStorage.getItem("sonnenpfad_shop_products");
      const parsed: ShopProduct[] = stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
      return parsed.map((p) => ({ ...p, image: normalizeAssetPath(p.image, "./assets/images/safari-gear.jpg") }));
    } catch {
      return DEFAULT_PRODUCTS;
    }
  },

  async saveProducts(items: ShopProduct[]) {
    localStorage.setItem("sonnenpfad_shop_products", JSON.stringify(items));
  },

  async addProduct(item: Omit<ShopProduct, "id"> & { id?: string }): Promise<ShopProduct & { cloudSynced?: boolean }> {
    const id = item.id || "prod-" + Date.now();
    const completeItem: ShopProduct & { cloudSynced?: boolean } = { ...item, id };
    const existingBefore = await this.getProducts();
    const deduped = [completeItem, ...existingBefore.filter((p) => p.id !== completeItem.id)];

    let nativeSynced = false;
    let mirrorSynced = false;

    try {
      const { count, error: countErr } = await supabase
        .from("products")
        .select("id", { count: "exact", head: true });
      if (!countErr) {
        if (!count || count === 0) {
          const { error: upsertAllErr } = await supabase.from("products").upsert(deduped.map(toProductRow));
          nativeSynced = !upsertAllErr;
        } else {
          const { error: upsertOneErr } = await supabase.from("products").upsert(toProductRow(completeItem));
          nativeSynced = !upsertOneErr;
        }
      }
    } catch {}

    try {
      const { count: mirrorCount, error: mirrorCountErr } = await supabase
        .from("tiktoks")
        .select("id", { count: "exact", head: true })
        .like("id", `${SHOP_PRODUCT_MIRROR_PREFIX}%`);
      if (!mirrorCountErr) {
        if (!mirrorCount || mirrorCount === 0) {
          const { error: mirrorAllErr } = await supabase.from("tiktoks").upsert(deduped.map(toShopMirrorRow));
          mirrorSynced = !mirrorAllErr;
        } else {
          const { error: mirrorOneErr } = await supabase.from("tiktoks").upsert(toShopMirrorRow(completeItem));
          mirrorSynced = !mirrorOneErr;
        }
      }
    } catch {}

    await this.saveProducts(deduped);
    hydrateLiveSiteContent();
    completeItem.cloudSynced = nativeSynced || mirrorSynced;
    return completeItem;
  },

  async deleteProduct(id: string): Promise<{ ok: boolean; cloudSynced: boolean }> {
    const existingBefore = await this.getProducts();
    const filtered = existingBefore.filter((p) => p.id !== id);
    let nativeOk = false;
    let mirrorOk = false;

    try {
      const { count, error: countErr } = await supabase
        .from("products")
        .select("id", { count: "exact", head: true });
      if (!countErr) {
        if ((!count || count === 0) && filtered.length > 0) {
          const { error } = await supabase.from("products").upsert(filtered.map(toProductRow));
          nativeOk = !error;
        } else {
          const { error } = await supabase.from("products").delete().eq("id", id);
          nativeOk = !error;
        }
      }
    } catch {}

    try {
      const { count: mirrorCount, error: mirrorCountErr } = await supabase
        .from("tiktoks")
        .select("id", { count: "exact", head: true })
        .like("id", `${SHOP_PRODUCT_MIRROR_PREFIX}%`);
      if (!mirrorCountErr) {
        if ((!mirrorCount || mirrorCount === 0) && filtered.length > 0) {
          const { error } = await supabase.from("tiktoks").upsert(filtered.map(toShopMirrorRow));
          mirrorOk = !error;
        } else {
          const { error } = await supabase
            .from("tiktoks")
            .delete()
            .eq("id", SHOP_PRODUCT_MIRROR_PREFIX + id);
          mirrorOk = !error;
        }
      }
    } catch {}

    await this.saveProducts(filtered);
    hydrateLiveSiteContent();
    return { ok: true, cloudSynced: nativeOk || mirrorOk };
  },

  async getOrders(): Promise<CoffeeOrder[]> {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        const mapped = data.map(mapOrderRow);
        localStorage.setItem("sonnenpfad_coffee_orders", JSON.stringify(mapped));
        return mapped;
      }
    } catch {}

    try {
      return JSON.parse(localStorage.getItem("sonnenpfad_coffee_orders") || "[]");
    } catch {
      return [];
    }
  },

  async addOrder(order: {
    customerName: string;
    phone: string;
    email?: string;
    productName: string;
    quantity: number;
    totalAmount: number;
    deliveryAddress: string;
    grindPreference?: string;
    notes?: string;
  }): Promise<CoffeeOrder> {
    const newOrder: CoffeeOrder = {
      id: "ORD-" + Date.now().toString().slice(-6),
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      customerName: order.customerName,
      phone: order.phone,
      email: order.email || "",
      productName: order.productName,
      quantity: Number(order.quantity) || 1,
      totalAmount: Number(order.totalAmount) || 0,
      deliveryAddress: order.deliveryAddress,
      grindPreference: order.grindPreference || "",
      notes: order.notes || "",
      status: "Pending",
    };

    try {
      await supabase.from("orders").insert({
        id: newOrder.id,
        date: newOrder.date,
        customer_name: newOrder.customerName,
        phone: newOrder.phone,
        email: newOrder.email,
        product_name: newOrder.productName,
        quantity: newOrder.quantity,
        total_amount: newOrder.totalAmount,
        delivery_address: newOrder.deliveryAddress,
        grind_preference: newOrder.grindPreference,
        notes: newOrder.notes,
        status: newOrder.status,
      });
    } catch {}

    try {
      const local = JSON.parse(localStorage.getItem("sonnenpfad_coffee_orders") || "[]");
      local.unshift(newOrder);
      localStorage.setItem("sonnenpfad_coffee_orders", JSON.stringify(local));
    } catch {}

    return newOrder;
  },

  async clearOrders() {
    try {
      await supabase.from("orders").delete().neq("id", "");
    } catch {}
    localStorage.setItem("sonnenpfad_coffee_orders", "[]");
  },

  // Authorship Ownership Helpers (so visitors can edit/delete their own posts without login)
  getMyReviewIds(): string[] {
    return readIdSet(MY_REVIEWS_KEY);
  },

  isMyReview(id: string): boolean {
    return readIdSet(MY_REVIEWS_KEY).includes(id);
  },

  getMyCommentIds(): string[] {
    return readIdSet(MY_COMMENTS_KEY);
  },

  isMyComment(id: string): boolean {
    return readIdSet(MY_COMMENTS_KEY).includes(id);
  },

  // Reviews System (Authentic user-submitted reviews + Owner moderation control)
  async getReviews(includeUnpublished: boolean = false): Promise<CustomerReview[]> {
    let list: CustomerReview[] = [];
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        list = data.map(mapReviewRow);
        localStorage.setItem("sonnenpfad_reviews", JSON.stringify(list));
      }
    } catch {}

    if (list.length === 0) {
      try {
        const stored = localStorage.getItem("sonnenpfad_reviews");
        list = stored ? JSON.parse(stored) : DEFAULT_REVIEWS;
      } catch {
        list = DEFAULT_REVIEWS;
      }
    }

    return includeUnpublished ? list : list.filter((r) => isPublicStatus(r.status));
  },

  async addReview(input: {
    author: string;
    country: string;
    tourName: string;
    rating: number;
    content: string;
  }): Promise<CustomerReview> {
    const modMode = this.getSettings().moderationMode || "auto";
    const initialStatus: CustomerReview["status"] =
      modMode === "manual" ? "Pending Approval" : "Verified Guest";

    const newRev: CustomerReview = {
      id: "rev-" + Date.now(),
      author: input.author.trim(),
      country: input.country.trim(),
      tourName: input.tourName.trim(),
      rating: Number(input.rating) || 5,
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      overallScore: Math.min(100, (Number(input.rating) || 5) * 20),
      wildlifeScore: Math.min(100, (Number(input.rating) || 5) * 20),
      guideScore: Math.min(100, (Number(input.rating) || 5) * 20),
      lodgingScore: Math.min(100, (Number(input.rating) || 5) * 20),
      content: input.content.trim(),
      status: initialStatus,
    };

    try {
      await supabase.from("reviews").insert({
        id: newRev.id,
        author: newRev.author,
        country: newRev.country,
        tour_name: newRev.tourName,
        rating: newRev.rating,
        date: newRev.date,
        overall_score: newRev.overallScore,
        wildlife_score: newRev.wildlifeScore,
        guide_score: newRev.guideScore,
        lodging_score: newRev.lodgingScore,
        content: newRev.content,
        status: newRev.status,
      });
    } catch {}

    try {
      const existing: CustomerReview[] = JSON.parse(
        localStorage.getItem("sonnenpfad_reviews") || "[]"
      );
      existing.unshift(newRev);
      localStorage.setItem("sonnenpfad_reviews", JSON.stringify(existing));
      addIdToSet(MY_REVIEWS_KEY, newRev.id);
    } catch {}

    hydrateLiveSiteContent();
    return newRev;
  },

  async updateReview(
    id: string,
    patch: Partial<{
      author: string;
      country: string;
      tourName: string;
      rating: number;
      content: string;
      status: CustomerReview["status"];
    }>
  ): Promise<CustomerReview | null> {
    const existingList = await this.getReviews(true);
    const current = existingList.find((r) => r.id === id);
    if (!current) return null;

    const nextRating = patch.rating !== undefined ? Number(patch.rating) || 5 : current.rating;
    const score = Math.min(100, nextRating * 20);
    const updated: CustomerReview = {
      ...current,
      author: patch.author !== undefined ? patch.author.trim() : current.author,
      country: patch.country !== undefined ? patch.country.trim() : current.country,
      tourName: patch.tourName !== undefined ? patch.tourName.trim() : current.tourName,
      rating: nextRating,
      overallScore: score,
      wildlifeScore: score,
      guideScore: score,
      lodgingScore: score,
      content: patch.content !== undefined ? patch.content.trim() : current.content,
      status: patch.status !== undefined ? patch.status : current.status,
    };

    try {
      await supabase
        .from("reviews")
        .update({
          author: updated.author,
          country: updated.country,
          tour_name: updated.tourName,
          rating: updated.rating,
          overall_score: updated.overallScore,
          wildlife_score: updated.wildlifeScore,
          guide_score: updated.guideScore,
          lodging_score: updated.lodgingScore,
          content: updated.content,
          status: updated.status,
        })
        .eq("id", id);
    } catch {}

    try {
      const localList: CustomerReview[] = JSON.parse(
        localStorage.getItem("sonnenpfad_reviews") || "[]"
      );
      const nextLocal = localList.some((r) => r.id === id)
        ? localList.map((r) => (r.id === id ? updated : r))
        : [updated, ...localList];
      localStorage.setItem("sonnenpfad_reviews", JSON.stringify(nextLocal));
    } catch {}

    hydrateLiveSiteContent();
    return updated;
  },

  async deleteReview(id: string): Promise<boolean> {
    try {
      await supabase.from("reviews").delete().eq("id", id);
    } catch {}

    try {
      const localList: CustomerReview[] = JSON.parse(
        localStorage.getItem("sonnenpfad_reviews") || "[]"
      );
      localStorage.setItem(
        "sonnenpfad_reviews",
        JSON.stringify(localList.filter((r) => r.id !== id))
      );
      removeIdFromSet(MY_REVIEWS_KEY, id);
    } catch {}

    hydrateLiveSiteContent();
    return true;
  },

  saveReviews(items: CustomerReview[]) {
    localStorage.setItem("sonnenpfad_reviews", JSON.stringify(items));
  },

  async toggleLike(itemId: string): Promise<{ count: number; liked: boolean }> {
    const likesKey = "sonnenpfad_likes_" + itemId;
    const userLikedKey = "sonnenpfad_user_liked_" + itemId;
    const hasLiked = localStorage.getItem(userLikedKey) === "true";
    const nextLiked = !hasLiked;
    let currentCount = Number(localStorage.getItem(likesKey) || 0);

    try {
      const { data, error } = await supabase
        .from("likes")
        .select("count")
        .eq("item_id", itemId)
        .maybeSingle();

      if (!error && data && typeof data.count === "number") {
        currentCount = data.count;
      }

      const nextCount = nextLiked ? currentCount + 1 : Math.max(0, currentCount - 1);
      await supabase.from("likes").upsert({
        item_id: itemId,
        count: nextCount,
        updated_at: new Date().toISOString(),
      });

      localStorage.setItem(likesKey, String(nextCount));
      localStorage.setItem(userLikedKey, String(nextLiked));
      return { count: nextCount, liked: nextLiked };
    } catch {
      const nextCount = nextLiked ? currentCount + 1 : Math.max(0, currentCount - 1);
      localStorage.setItem(likesKey, String(nextCount));
      localStorage.setItem(userLikedKey, String(nextLiked));
      return { count: nextCount, liked: nextLiked };
    }
  },

  getCommentCount(itemId: string): number {
    try {
      const raw = localStorage.getItem("sonnenpfad_comments_" + itemId);
      if (!raw) return 0;
      const arr: CommentItem[] = JSON.parse(raw);
      return Array.isArray(arr) ? arr.filter((c) => isPublicStatus(c.status)).length : 0;
    } catch {
      return 0;
    }
  },

  async getComments(
    itemId: string,
    includeUnpublished: boolean = false
  ): Promise<CommentItem[]> {
    let list: CommentItem[] = [];
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("item_id", itemId)
        .order("created_at", { ascending: false });
      if (!error && data) {
        list = data.map(mapCommentRow);
        localStorage.setItem("sonnenpfad_comments_" + itemId, JSON.stringify(list));
      }
    } catch {}

    if (list.length === 0) {
      try {
        const local = localStorage.getItem("sonnenpfad_comments_" + itemId);
        list = local ? JSON.parse(local) : DEFAULT_COMMENTS[itemId] || [];
      } catch {
        list = DEFAULT_COMMENTS[itemId] || [];
      }
    }

    return includeUnpublished ? list : list.filter((c) => isPublicStatus(c.status));
  },

  async getAllComments(includeUnpublished: boolean = true): Promise<CommentItem[]> {
    const combined: CommentItem[] = [];
    const seen = new Set<string>();

    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        for (const d of data) {
          seen.add(d.id);
          combined.push(mapCommentRow(d));
        }
      }
    } catch {}

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("sonnenpfad_comments_")) {
        try {
          const arr: CommentItem[] = JSON.parse(localStorage.getItem(key) || "[]");
          for (const c of arr) {
            if (!seen.has(c.id)) {
              seen.add(c.id);
              combined.push({ ...c, status: c.status || "Published" });
            }
          }
        } catch {}
      }
    }

    return includeUnpublished
      ? combined
      : combined.filter((c) => isPublicStatus(c.status));
  },

  async addComment(
    itemId: string,
    author: string,
    text: string,
    rating: number = 5,
    itemType: string = "general"
  ): Promise<CommentItem> {
    const modMode = this.getSettings().moderationMode || "auto";
    const status: CommentItem["status"] =
      modMode === "manual" ? "Pending Approval" : "Published";

    const created: CommentItem = {
      id: "c-" + Date.now(),
      itemId,
      author: author.trim(),
      rating: Number(rating) || 5,
      text: text.trim(),
      itemType,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      status,
    };

    try {
      const payload = {
        id: created.id,
        item_id: created.itemId,
        author: created.author,
        rating: created.rating,
        text: created.text,
        item_type: created.itemType,
        date: created.date,
        status: created.status,
      };
      const { error } = await supabase.from("comments").insert(payload);
      if (error && error.message?.toLowerCase().includes("status")) {
        const { status: _omit, ...legacyPayload } = payload;
        await supabase.from("comments").insert(legacyPayload);
      }
    } catch {}

    const localKey = "sonnenpfad_comments_" + itemId;
    const localExisting: CommentItem[] = JSON.parse(localStorage.getItem(localKey) || "[]");
    const merged = [created, ...localExisting.filter((c) => c.id !== created.id)];
    localStorage.setItem(localKey, JSON.stringify(merged));
    addIdToSet(MY_COMMENTS_KEY, created.id);
    updateSectionCommentBadges();
    return created;
  },

  async updateComment(
    id: string,
    itemId: string,
    patch: Partial<{
      author: string;
      text: string;
      rating: number;
      status: CommentItem["status"];
    }>
  ): Promise<CommentItem | null> {
    const all = await this.getAllComments(true);
    const current = all.find((c) => c.id === id);
    if (!current) return null;

    const targetItemId = itemId || current.itemId;
    const updated: CommentItem = {
      ...current,
      author: patch.author !== undefined ? patch.author.trim() : current.author,
      text: patch.text !== undefined ? patch.text.trim() : current.text,
      rating: patch.rating !== undefined ? Number(patch.rating) || 5 : current.rating,
      status: patch.status !== undefined ? patch.status : current.status || "Published",
    };

    try {
      const updatePayload: Record<string, any> = {
        author: updated.author,
        text: updated.text,
        rating: updated.rating,
        status: updated.status,
      };
      const { error } = await supabase.from("comments").update(updatePayload).eq("id", id);
      if (error && error.message?.toLowerCase().includes("status")) {
        const { status: _omit, ...legacyUpdate } = updatePayload;
        await supabase.from("comments").update(legacyUpdate).eq("id", id);
      }
    } catch {}

    const localKey = "sonnenpfad_comments_" + targetItemId;
    try {
      const localExisting: CommentItem[] = JSON.parse(localStorage.getItem(localKey) || "[]");
      const nextLocal = localExisting.some((c) => c.id === id)
        ? localExisting.map((c) => (c.id === id ? updated : c))
        : [updated, ...localExisting];
      localStorage.setItem(localKey, JSON.stringify(nextLocal));
    } catch {}

    updateSectionCommentBadges();
    return updated;
  },

  async deleteComment(id: string, itemId?: string): Promise<boolean> {
    try {
      await supabase.from("comments").delete().eq("id", id);
    } catch {}

    try {
      if (itemId) {
        const key = "sonnenpfad_comments_" + itemId;
        const arr: CommentItem[] = JSON.parse(localStorage.getItem(key) || "[]");
        localStorage.setItem(key, JSON.stringify(arr.filter((c) => c.id !== id)));
      } else {
        for (let i = 0; i < localStorage.length; i++) {
          const k = localStorage.key(i);
          if (k && k.startsWith("sonnenpfad_comments_")) {
            const arr: CommentItem[] = JSON.parse(localStorage.getItem(k) || "[]");
            if (arr.some((c) => c.id === id)) {
              localStorage.setItem(k, JSON.stringify(arr.filter((c) => c.id !== id)));
            }
          }
        }
      }
      removeIdFromSet(MY_COMMENTS_KEY, id);
    } catch {}

    updateSectionCommentBadges();
    return true;
  },

  // Data Deletion & Privacy Compliance API
  async submitDeletionRequest(input: {
    fullName: string;
    contactInfo: string;
    recordScope: string;
    reason?: string;
  }): Promise<{ request: DeletionRequest; cloudSynced: boolean }> {
    const req: DeletionRequest = {
      id: "DEL-" + Date.now().toString().slice(-6),
      fullName: input.fullName.trim(),
      contactInfo: input.contactInfo.trim(),
      recordScope: input.recordScope || "All Personal Records",
      reason: (input.reason || "").trim(),
      status: "Pending Review",
      createdAt: new Date().toISOString(),
    };

    let cloudSynced = false;
    try {
      const { error } = await supabase.from("deletion_requests").insert({
        id: req.id,
        full_name: req.fullName,
        contact_info: req.contactInfo,
        record_scope: req.recordScope,
        reason: req.reason || "",
        status: req.status,
      });
      if (!error) cloudSynced = true;
    } catch {}

    try {
      const existing: DeletionRequest[] = JSON.parse(
        localStorage.getItem("sonnenpfad_deletion_requests") || "[]"
      );
      existing.unshift(req);
      localStorage.setItem("sonnenpfad_deletion_requests", JSON.stringify(existing));
    } catch {}

    return { request: req, cloudSynced };
  },

  async getDeletionRequests(): Promise<DeletionRequest[]> {
    try {
      const { data, error } = await supabase
        .from("deletion_requests")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        const mapped: DeletionRequest[] = data.map((d: any) => ({
          id: d.id,
          fullName: d.full_name,
          contactInfo: d.contact_info,
          recordScope: d.record_scope || "All Personal Records",
          reason: d.reason || "",
          status: (d.status as DeletionRequest["status"]) || "Pending Review",
          createdAt: d.created_at || new Date().toISOString(),
        }));
        localStorage.setItem("sonnenpfad_deletion_requests", JSON.stringify(mapped));
        return mapped;
      }
    } catch {}

    try {
      return JSON.parse(localStorage.getItem("sonnenpfad_deletion_requests") || "[]");
    } catch {
      return [];
    }
  },

  async fulfillDeletionRequest(requestId: string, fullName: string, contactInfo: string) {
    const cleanName = fullName.trim();
    const cleanContact = contactInfo.trim();

    try {
      if (cleanContact) {
        await supabase.from("orders").delete().eq("phone", cleanContact);
        await supabase.from("orders").delete().eq("email", cleanContact);
      }
      if (cleanName) {
        await supabase.from("orders").delete().ilike("customer_name", cleanName);
        await supabase.from("reviews").delete().ilike("author", cleanName);
        await supabase.from("comments").delete().ilike("author", cleanName);
      }
      await supabase
        .from("deletion_requests")
        .update({ status: "Completed" })
        .eq("id", requestId);
    } catch {}

    try {
      const requests: DeletionRequest[] = JSON.parse(
        localStorage.getItem("sonnenpfad_deletion_requests") || "[]"
      ).map((r: DeletionRequest) => (r.id === requestId ? { ...r, status: "Completed" } : r));
      localStorage.setItem("sonnenpfad_deletion_requests", JSON.stringify(requests));

      const orders: CoffeeOrder[] = JSON.parse(
        localStorage.getItem("sonnenpfad_coffee_orders") || "[]"
      ).filter(
        (o: CoffeeOrder) =>
          o.phone !== cleanContact &&
          o.email !== cleanContact &&
          o.customerName.toLowerCase() !== cleanName.toLowerCase()
      );
      localStorage.setItem("sonnenpfad_coffee_orders", JSON.stringify(orders));

      const reviews: CustomerReview[] = JSON.parse(
        localStorage.getItem("sonnenpfad_reviews") || "[]"
      ).filter((r: CustomerReview) => r.author.toLowerCase() !== cleanName.toLowerCase());
      localStorage.setItem("sonnenpfad_reviews", JSON.stringify(reviews));
    } catch {}
  },

  wipeLocalUserData() {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith("sonnenpfad_") && k !== "sonnenpfad_admin_pw") {
          keysToRemove.push(k);
        }
      }
      keysToRemove.forEach((k) => localStorage.removeItem(k));
    } catch {}
  },

  getSettings() {
    try {
      const stored = localStorage.getItem("sonnenpfad_settings");
      if (stored) return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    } catch {}
    return { ...DEFAULT_SETTINGS };
  },

  async fetchSettings() {
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .eq("id", "primary_config")
        .maybeSingle();
      if (!error && data) {
        const localSaved = this.getSettings();
        const merged = {
          ...DEFAULT_SETTINGS,
          phone: data.phone || DEFAULT_SETTINGS.phone,
          whatsapp: data.whatsapp || DEFAULT_SETTINGS.whatsapp,
          email: data.email || DEFAULT_SETTINGS.email,
          tiktok: data.tiktok || DEFAULT_SETTINGS.tiktok,
          tiktokUrl: data.tiktok_url || DEFAULT_SETTINGS.tiktokUrl,
          address: data.address || DEFAULT_SETTINGS.address,
          mapEmbedUrl: data.map_embed_url || DEFAULT_SETTINGS.mapEmbedUrl,
          moderationMode: (data.moderation_mode || localSaved.moderationMode || "auto") as "auto" | "manual",
        };
        localStorage.setItem("sonnenpfad_settings", JSON.stringify(merged));
        if (data.admin_passcode) {
          localStorage.setItem("sonnenpfad_admin_pw", String(data.admin_passcode));
        }
        return merged;
      }
    } catch {}
    return this.getSettings();
  },

  async saveSettings(settings: any): Promise<{ ok: boolean; cloudSynced: boolean }> {
    const merged = { ...DEFAULT_SETTINGS, ...settings };
    localStorage.setItem("sonnenpfad_settings", JSON.stringify(merged));

    let cloudSynced = false;
    try {
      const activePass = localStorage.getItem("sonnenpfad_admin_pw") || "sonnenpfad2026";
      const payload = {
        id: "primary_config",
        phone: merged.phone,
        whatsapp: merged.whatsapp,
        email: merged.email,
        tiktok: merged.tiktok,
        tiktok_url: merged.tiktokUrl,
        address: merged.address,
        map_embed_url: merged.mapEmbedUrl,
        admin_passcode: activePass,
        moderation_mode: merged.moderationMode || "auto",
        updated_at: new Date().toISOString(),
      };
      const { error } = await supabase.from("settings").upsert(payload);
      if (error && error.message?.toLowerCase().includes("moderation_mode")) {
        const { moderation_mode: _omit, ...legacyPayload } = payload;
        const { error: retryErr } = await supabase.from("settings").upsert(legacyPayload);
        if (!retryErr) cloudSynced = true;
      } else if (!error) {
        cloudSynced = true;
      }
    } catch {}

    hydrateLiveSiteContent();
    return { ok: true, cloudSynced };
  },

  async verifyAdminPasscode(inputPass: string): Promise<boolean> {
    const cleanInput = (inputPass || "").trim();
    if (!cleanInput) return false;

    let storedPass = localStorage.getItem("sonnenpfad_admin_pw") || "";
    try {
      const { data, error } = await supabase
        .from("settings")
        .select("admin_passcode")
        .eq("id", "primary_config")
        .maybeSingle();
      if (!error && data && data.admin_passcode) {
        storedPass = String(data.admin_passcode).trim();
        localStorage.setItem("sonnenpfad_admin_pw", storedPass);
      }
    } catch {}

    const activePass = storedPass || "sonnenpfad2026";
    return cleanInput === activePass;
  },

  async updateAdminPasscode(
    currentPass: string,
    newPass: string
  ): Promise<{ ok: boolean; cloudSynced?: boolean; error?: string }> {
    const cleanCurrent = (currentPass || "").trim();
    const cleanNew = (newPass || "").trim();

    if (cleanNew.length < 4) {
      return { ok: false, error: "New passcode must be at least 4 characters long." };
    }

    const valid = await this.verifyAdminPasscode(cleanCurrent);
    if (!valid) {
      return { ok: false, error: "Current passcode does not match our records." };
    }

    localStorage.setItem("sonnenpfad_admin_pw", cleanNew);

    let cloudSynced = false;
    try {
      const curSettings = this.getSettings();
      const payload = {
        id: "primary_config",
        phone: curSettings.phone,
        whatsapp: curSettings.whatsapp,
        email: curSettings.email,
        tiktok: curSettings.tiktok,
        tiktok_url: curSettings.tiktokUrl,
        address: curSettings.address,
        map_embed_url: curSettings.mapEmbedUrl,
        admin_passcode: cleanNew,
        moderation_mode: curSettings.moderationMode || "auto",
        updated_at: new Date().toISOString(),
      };
      const { error } = await supabase.from("settings").upsert(payload);
      if (error && error.message?.toLowerCase().includes("moderation_mode")) {
        const { moderation_mode: _omit, ...legacyPayload } = payload;
        const { error: retryErr } = await supabase.from("settings").upsert(legacyPayload);
        if (!retryErr) cloudSynced = true;
      } else if (!error) {
        cloudSynced = true;
      }
    } catch {}

    return { ok: true, cloudSynced };
  },

  getTiktoks(): TikTokItem[] {
    try {
      const stored = localStorage.getItem("sonnenpfad_tiktoks");
      if (stored) {
        const parsed: TikTokItem[] = JSON.parse(stored);
        return parsed
          .filter((t) => !isInternalSyncRow(t))
          .map((t) => ({ ...t, thumbnail: normalizeAssetPath(t.thumbnail, "./assets/images/bwindi-gorilla.jpg") }));
      }
    } catch {}
    return DEFAULT_TIKTOKS;
  },

  async fetchTiktoks(): Promise<TikTokItem[]> {
    try {
      const { data, error } = await supabase
        .from("tiktoks")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data) {
        const reelRows = data.filter((d: any) => !isInternalSyncRow(d));
        if (reelRows.length > 0) {
          const mapped: TikTokItem[] = reelRows.map((d: any) => ({
            id: d.id,
            title: d.title,
            videoUrl: d.video_url,
            thumbnail: normalizeAssetPath(d.thumbnail, "./assets/images/bwindi-gorilla.jpg"),
            views: d.views || "Official Clip",
            likes: d.likes || "TikTok Reel",
          }));
          localStorage.setItem("sonnenpfad_tiktoks", JSON.stringify(mapped));
          return mapped;
        }
      }
    } catch {}
    return this.getTiktoks();
  },

  async saveTiktoks(tiktoks: TikTokItem[]) {
    localStorage.setItem("sonnenpfad_tiktoks", JSON.stringify(tiktoks));
    try {
      if (tiktoks.length > 0) {
        await supabase.from("tiktoks").upsert(
          tiktoks.map((t) => ({
            id: t.id,
            title: t.title,
            video_url: t.videoUrl,
            thumbnail: t.thumbnail,
            views: t.views,
            likes: t.likes,
          }))
        );
      }
    } catch {}
    hydrateLiveSiteContent();
  },

  async deleteTiktok(id: string) {
    try {
      await supabase.from("tiktoks").delete().eq("id", id);
    } catch {}
    const filtered = this.getTiktoks().filter((t) => t.id !== id);
    localStorage.setItem("sonnenpfad_tiktoks", JSON.stringify(filtered));
    hydrateLiveSiteContent();
  },

  async syncAllToSupabase() {
    const safaris = await this.getSafaris();
    const products = await this.getProducts();
    const settings = this.getSettings();
    const tiktoks = this.getTiktoks();
    const reviews = await this.getReviews(true);
    const activePass = localStorage.getItem("sonnenpfad_admin_pw") || "sonnenpfad2026";

    const errors: string[] = [];

    const settingsPayload = {
      id: "primary_config",
      phone: settings.phone,
      whatsapp: settings.whatsapp,
      email: settings.email,
      tiktok: settings.tiktok,
      tiktok_url: settings.tiktokUrl,
      address: settings.address,
      map_embed_url: settings.mapEmbedUrl,
      admin_passcode: activePass,
      moderation_mode: settings.moderationMode || "auto",
      updated_at: new Date().toISOString(),
    };
    let { error: settingsErr } = await supabase.from("settings").upsert(settingsPayload);
    if (settingsErr && settingsErr.message?.toLowerCase().includes("moderation_mode")) {
      const { moderation_mode: _omit, ...legacyPayload } = settingsPayload;
      settingsErr = (await supabase.from("settings").upsert(legacyPayload)).error;
    }
    if (settingsErr) errors.push(`settings: ${settingsErr.message}`);

    if (safaris.length > 0) {
      const { error } = await supabase.from("safaris").upsert(
        safaris.map((s) => ({
          id: s.id,
          title: s.title,
          duration: s.duration,
          duration_days: s.durationDays || 3,
          destinations: s.destinations || [],
          destinations_formatted: s.destinationsFormatted || s.title,
          price_ugx: s.priceUGX,
          formatted_price_ugx: s.formattedPriceUGX || formatUGX(s.priceUGX),
          image: s.image,
          overview: s.overview || "",
          highlights: s.highlights || [],
          included: s.included || [],
          excluded: s.excluded || [],
          accommodation_level: s.accommodationLevel || "Luxury",
          is_flagship: Boolean(s.isFlagship),
          likes_count: s.likesCount || 0,
          itinerary: s.itinerary || [],
        }))
      );
      if (error) errors.push(`safaris: ${error.message}`);
    }

    if (products.length > 0) {
      const { error } = await supabase.from("products").upsert(
        products.map((p) => ({
          id: p.id,
          name: p.name,
          origin: p.origin || "East Africa",
          category: p.category,
          price: p.price,
          original_price: p.originalPrice || null,
          weight: p.weight || "Standard",
          rating: p.rating || 5,
          reviews_count: p.reviewsCount || 0,
          image: p.image,
          is_sale: Boolean(p.isSale),
          in_stock: p.inStock !== false,
          description: p.description || "",
          flavor_notes: p.flavorNotes || [],
          likes_count: p.likesCount || 0,
        }))
      );
      const { error: mirrorErr } = await supabase.from("tiktoks").upsert(products.map(toShopMirrorRow));
      if (error && mirrorErr) errors.push(`products: ${error.message}`);
    }

    await googleMedia.savePreferredWorkspaceEmail(googleMedia.getPreferredWorkspaceEmail());

    if (tiktoks.length > 0) {
      const { error } = await supabase.from("tiktoks").upsert(
        tiktoks.map((t) => ({
          id: t.id,
          title: t.title,
          video_url: t.videoUrl,
          thumbnail: t.thumbnail,
          views: t.views,
          likes: t.likes,
        }))
      );
      if (error) errors.push(`tiktoks: ${error.message}`);
    }

    if (reviews.length > 0) {
      const { error } = await supabase.from("reviews").upsert(
        reviews.map((r) => ({
          id: r.id,
          author: r.author,
          country: r.country,
          tour_name: r.tourName,
          rating: r.rating || 5,
          date: r.date,
          overall_score: r.overallScore || 95,
          wildlife_score: r.wildlifeScore || 95,
          guide_score: r.guideScore || 95,
          lodging_score: r.lodgingScore || 95,
          content: r.content,
          status: r.status || "Verified Guest",
        }))
      );
      if (error) errors.push(`reviews: ${error.message}`);
    }

    return {
      success: errors.length === 0,
      errors,
      counts: {
        safaris: safaris.length,
        products: products.length,
        tiktoks: tiktoks.length,
        reviews: reviews.length,
      },
    };
  },
};

// =========================================================================
// 3. IN-PAGE TOAST NOTIFICATION (CLEAN SVG ICONS, ZERO EMOJIS)
// =========================================================================
export function showToast(
  message: string,
  variant: "success" | "error" | "info" = "success"
) {
  if (typeof document === "undefined") return;
  let container = document.getElementById("sonnenpfadToastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "sonnenpfadToastContainer";
    container.setAttribute("role", "status");
    container.setAttribute("aria-live", "polite");
    container.className =
      "fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  const styles =
    variant === "error"
      ? "bg-red-50 border-red-500 text-red-950"
      : variant === "info"
        ? "bg-amber-50 border-amber-500 text-amber-950"
        : "bg-[#073F27] border-[#F4B41A] text-white";

  const iconSvg =
    variant === "error"
      ? `<svg class="w-4 h-4 shrink-0 text-red-700" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>`
      : variant === "info"
        ? `<svg class="w-4 h-4 shrink-0 text-amber-800" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
        : `<svg class="w-4 h-4 shrink-0 text-[#F4B41A]" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>`;

  toast.className = `pointer-events-auto flex items-start gap-2.5 p-3.5 rounded-2xl border-2 shadow-2xl text-xs font-semibold transition-all duration-300 ${styles}`;
  toast.innerHTML = `${iconSvg}<span class="leading-snug">${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// =========================================================================
// 4. ROTATING HERO SECTION (CHANGING IMAGES + EDITORIAL HEADLINE/SUBTITLE)
// =========================================================================
const HERO_SLIDES = [
  {
    image: "./assets/images/hero-savannah.jpg",
    alt: "Sonnenpfad private 4x4 safari Land Cruiser observing wild elephants across sunlit East African plains",
    kicker: "East Africa Premier Safaris & Coffee Roastery",
    tag: "Kenya & Tanzania · Savannah Expeditions",
    headline: "Your East African Journey Begins Here",
    subtext:
      "Private 4x4 Land Cruiser safaris, licensed national park permits, and small-batch Mount Elgon Arabica coffee curated from our Kampala operations center.",
    ctaLabel: "Explore All Tours",
    ctaHref: "safaris.html",
  },
  {
    image: "./assets/images/bwindi-gorilla.jpg",
    alt: "Silverback mountain gorilla resting among emerald ferns in misty Bwindi Impenetrable Forest, Uganda",
    kicker: "Bwindi Impenetrable Forest · UNESCO Sanctuary",
    tag: "Uganda · Mountain Gorilla Trekking (Ages 15+)",
    headline: "Face to Face With Bwindi Silverbacks",
    subtext:
      "Guided primate expeditions led by licensed Uganda Wildlife Authority rangers in southwestern Uganda, paired with full-board rainforest lodge stays.",
    ctaLabel: "View Gorilla Itineraries",
    ctaHref: "safaris.html",
  },
  {
    image: "./assets/images/murchison-nile.jpg",
    alt: "Murchison Falls crashing through the Victoria Nile gorge under warm morning sunlight in Uganda",
    kicker: "Victoria Nile · Murchison Falls & Ziwa",
    tag: "Uganda · Nile Cruises & Rhino Tracking",
    headline: "Discover the Surge of the Victoria Nile",
    subtext:
      "Combine on-foot white rhino tracking at Ziwa Sanctuary with private Victoria Nile boat launches to the base of Murchison Falls.",
    ctaLabel: "Discover National Parks",
    ctaHref: "destinations.html",
  },
];

export function initHeroShowcase() {
  const heroBg = document.getElementById("heroBg") as HTMLImageElement | null;
  const heroKicker = document.getElementById("heroKicker");
  const heroTag = document.getElementById("heroTag");
  const heroHeadline = document.getElementById("heroHeadline");
  const heroSubtext = document.getElementById("heroSubtext");
  const heroCtaPrimary = document.getElementById("heroCtaPrimary") as HTMLAnchorElement | null;
  const heroPrevBtn = document.getElementById("heroPrevBtn");
  const heroNextBtn = document.getElementById("heroNextBtn");
  const heroPauseBtn = document.getElementById("heroPauseBtn");
  const dotsContainer = document.getElementById("heroSlideDots");

  if (!heroBg || !heroHeadline) return;

  let index = 0;
  let paused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let intervalId: number | null = null;

  function renderSlide(nextIdx: number) {
    index = (nextIdx + HERO_SLIDES.length) % HERO_SLIDES.length;
    const slide = HERO_SLIDES[index];

    if (heroBg) {
      heroBg.style.opacity = "0.25";
      setTimeout(() => {
        heroBg.src = slide.image;
        heroBg.alt = slide.alt;
        heroBg.style.opacity = "1";
      }, 180);
    }
    if (heroKicker) heroKicker.textContent = slide.kicker;
    if (heroTag) heroTag.textContent = slide.tag;
    if (heroHeadline) heroHeadline.textContent = slide.headline;
    if (heroSubtext) heroSubtext.textContent = slide.subtext;
    if (heroCtaPrimary) {
      const span = heroCtaPrimary.querySelector("span");
      if (span) span.textContent = slide.ctaLabel;
      heroCtaPrimary.href = slide.ctaHref;
    }

    if (dotsContainer) {
      const buttons = dotsContainer.querySelectorAll("button");
      buttons.forEach((b, i) => {
        b.setAttribute("aria-selected", i === index ? "true" : "false");
        if (i === index) {
          b.className =
            "px-3.5 py-1.5 rounded-full text-[11px] font-extrabold bg-[#F4B41A] text-[#042617] border-2 border-white shadow-md transition-all cursor-pointer";
        } else {
          b.className =
            "px-3.5 py-1.5 rounded-full text-[11px] font-bold bg-[#042617]/90 text-white border border-white/60 hover:bg-[#073F27] transition-all cursor-pointer";
        }
      });
    }
  }

  function startTimer() {
    if (intervalId) window.clearInterval(intervalId);
    if (!paused) {
      intervalId = window.setInterval(() => renderSlide(index + 1), 6500);
    }
  }

  if (dotsContainer) {
    dotsContainer.querySelectorAll("button").forEach((btn, idx) => {
      btn.addEventListener("click", () => {
        renderSlide(idx);
        startTimer();
      });
    });
  }

  if (heroPrevBtn) {
    heroPrevBtn.addEventListener("click", () => {
      renderSlide(index - 1);
      startTimer();
    });
  }

  if (heroNextBtn) {
    heroNextBtn.addEventListener("click", () => {
      renderSlide(index + 1);
      startTimer();
    });
  }

  if (heroPauseBtn) {
    heroPauseBtn.textContent = paused ? "Resume Slides" : "Pause Slides";
    heroPauseBtn.setAttribute("aria-pressed", String(paused));
    heroPauseBtn.addEventListener("click", () => {
      paused = !paused;
      heroPauseBtn.textContent = paused ? "Resume Slides" : "Pause Slides";
      heroPauseBtn.setAttribute("aria-pressed", String(paused));
      startTimer();
    });
  }

  // Keyboard arrow navigation when focused inside hero controls
  const heroSection = heroHeadline.closest("section");
  if (heroSection) {
    heroSection.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        renderSlide(index - 1);
        startTimer();
      } else if (e.key === "ArrowRight") {
        renderSlide(index + 1);
        startTimer();
      }
    });
  }

  renderSlide(0);
  startTimer();
}

// =========================================================================
// 5. LIVE CONTENT HYDRATION (SAFARIS + SHOP + REVIEWS + TIKTOK + SETTINGS)
// =========================================================================
export async function hydrateLiveSiteContent() {
  if (typeof document === "undefined") return;
  const s = db.getSettings();
  const waDigits = String(s.whatsapp || "+256773333108").replace(/[^0-9]/g, "") || "256773333108";
  const phoneDigits = String(s.phone || "+256773333108").replace(/[^0-9+]/g, "") || "+256773333108";

  // 1) Sync Global Header & Contact Links Across Any Page
  const topPhoneLink = document.getElementById("topPhoneLink") as HTMLAnchorElement | null;
  if (topPhoneLink && s.phone) {
    topPhoneLink.href = `tel:${phoneDigits}`;
    topPhoneLink.textContent = s.phone;
  }

  const topTiktokLink = document.getElementById("topTiktokLink") as HTMLAnchorElement | null;
  if (topTiktokLink && s.tiktokUrl) {
    topTiktokLink.href = s.tiktokUrl;
    topTiktokLink.title = `TikTok ${s.tiktok || "@kisacathy1900"}`;
  }

  document.querySelectorAll<HTMLAnchorElement>('a[href^="https://wa.me/"]').forEach((anchor) => {
    try {
      const url = new URL(anchor.href);
      anchor.href = `https://wa.me/${waDigits}${url.search}`;
    } catch {}
  });

  document.querySelectorAll<HTMLAnchorElement>('a[href^="mailto:"]').forEach((anchor) => {
    if (s.email) {
      anchor.href = `mailto:${s.email}`;
      if (anchor.textContent && anchor.textContent.includes("@")) {
        anchor.textContent = s.email;
      }
    }
  });

  const closingWaText = document.getElementById("closingWhatsappText");
  if (closingWaText && s.whatsapp) {
    closingWaText.textContent = `WhatsApp: ${s.whatsapp}`;
  }

  const footerWaLink = document.getElementById("footerWhatsappLink") as HTMLAnchorElement | null;
  if (footerWaLink && s.whatsapp) {
    footerWaLink.textContent = s.whatsapp;
    footerWaLink.href = `https://wa.me/${waDigits}`;
  }

  const drawerWaLink = document.getElementById("mobileDrawerWhatsapp") as HTMLAnchorElement | null;
  if (drawerWaLink && s.whatsapp) {
    drawerWaLink.textContent = s.whatsapp;
    drawerWaLink.href = `https://wa.me/${waDigits}`;
  }

  const drawerTiktok = document.getElementById("mobileDrawerTiktok") as HTMLAnchorElement | null;
  if (drawerTiktok && s.tiktokUrl) {
    drawerTiktok.href = s.tiktokUrl;
    drawerTiktok.textContent = `TikTok ${s.tiktok || "@kisacathy1900"}`;
  }

  const homeTiktokHandle = document.getElementById("homeTiktokHandle");
  if (homeTiktokHandle && s.tiktok) {
    homeTiktokHandle.textContent = `TikTok Feed: ${s.tiktok}`;
  }

  const homeTiktokFollowBtn = document.getElementById("homeTiktokFollowBtn") as HTMLAnchorElement | null;
  if (homeTiktokFollowBtn && s.tiktokUrl) {
    homeTiktokFollowBtn.href = s.tiktokUrl;
    const span = homeTiktokFollowBtn.querySelector("span");
    if (span) span.textContent = `Follow ${s.tiktok || "@kisacathy1900"} on TikTok`;
  }

  const addrEl = document.getElementById("liveAddressDisplay");
  if (addrEl && s.address) addrEl.textContent = s.address;

  const footerAddrEl = document.getElementById("footerAddressDisplay");
  if (footerAddrEl && s.address) footerAddrEl.textContent = s.address;

  const drawerAddrEl = document.getElementById("mobileDrawerAddress");
  if (drawerAddrEl && s.address) drawerAddrEl.textContent = `Head Office: ${s.address}`;

  const mapIframe = document.getElementById("liveMapIframe") as HTMLIFrameElement | null;
  if (mapIframe && s.mapEmbedUrl) mapIframe.src = s.mapEmbedUrl;

  // 2) Hydrate Featured Safaris + Header Tours Dropdown From Live DB
  const homeSafarisGrid = document.getElementById("homeSafarisGrid");
  const navToursDropdown = document.getElementById("navToursDropdown");
  if (homeSafarisGrid || navToursDropdown) {
    const safaris = await db.getSafaris();

    const safarisCountLabel = document.getElementById("homeSafarisCountLabel");
    if (safarisCountLabel && safaris.length > 0) {
      safarisCountLabel.textContent = `View All ${safaris.length} Safaris (UGX)`;
    }

    if (navToursDropdown && safaris.length > 0) {
      navToursDropdown.innerHTML = safaris
        .slice(0, 5)
        .map(
          (saf) =>
            `<a href="safaris.html" class="block px-3 py-2 rounded-xl text-xs text-[#0F172A] hover:bg-[#F1F5F9] truncate">${escapeHtml(saf.title)} (${escapeHtml(saf.formattedPriceUGX || formatUGX(saf.priceUGX))})</a>`
        )
        .join("");
    }

    if (homeSafarisGrid && safaris.length > 0) {
      const sortedSafaris = [...safaris].sort((a, b) => Number(Boolean(b.isFlagship)) - Number(Boolean(a.isFlagship)));
      const featuredSafaris = sortedSafaris.slice(0, 3);

      homeSafarisGrid.innerHTML = featuredSafaris
        .map((saf) => {
          const priceStr = saf.formattedPriceUGX || formatUGX(saf.priceUGX);
          const likes = db.getItemLikeCount(saf.id, saf.likesCount || 0);
          const waMsg = encodeURIComponent(
            `Hello Sonnenpfad Safaris, I am inquiring about the ${saf.title} (${priceStr}).`
          );
          return `
            <article class="min-w-0 bg-white ${saf.isFlagship ? "border-2 border-[#073F27] shadow-md relative" : "border border-[#CBD5E1] shadow-sm hover:border-[#073F27]"} rounded-3xl overflow-hidden flex flex-col justify-between transition-all">
              ${saf.isFlagship ? `<div class="absolute top-3 left-3 bg-[#073F27] text-[#F4B41A] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full z-10">Flagship Circuit</div>` : ""}
              <div>
                <div class="relative h-60 w-full overflow-hidden bg-[#F1F5F9]">
                  <img src="${escapeHtml(saf.image)}" alt="${escapeHtml(saf.altText || saf.title)}" loading="lazy" referrerpolicy="no-referrer" onerror="window.handleMediaImgError&&window.handleMediaImgError(this,'./assets/images/hero-savannah.jpg')" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  <div class="absolute bottom-3 left-3 flex flex-wrap items-center gap-2 pr-3">
                    <span class="bg-[#073F27] px-2.5 py-1 text-white font-bold text-xs rounded-full">${escapeHtml(saf.duration)}</span>
                    <span class="bg-white px-2.5 py-1 text-[#0F172A] font-bold text-xs rounded-full border border-[#CBD5E1] font-mono">${escapeHtml(priceStr)}</span>
                  </div>
                  <button type="button" onclick="handleLikeClick(this, '${escapeHtml(saf.id)}')" aria-pressed="${localStorage.getItem("sonnenpfad_user_liked_" + saf.id) === "true" ? "true" : "false"}" aria-label="Like ${escapeHtml(saf.title)}" class="like-btn ${localStorage.getItem("sonnenpfad_user_liked_" + saf.id) === "true" ? "is-liked" : ""} absolute top-3 right-3 px-2.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs shadow cursor-pointer">
                    <svg class="like-heart-icon w-3.5 h-3.5" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    <span class="like-count font-mono font-bold text-[11px]" data-like-id="${escapeHtml(saf.id)}">${likes}</span>
                  </button>
                </div>
                <div class="p-5 sm:p-6 space-y-2">
                  <span class="text-xs text-[#7C4D00] font-bold block">${escapeHtml(saf.destinationsFormatted || (saf.destinations || []).join(" · "))}</span>
                  <h3 class="font-editorial text-2xl font-bold text-[#0F172A]">${escapeHtml(saf.title)}</h3>
                  <p class="text-xs text-[#334155] leading-relaxed line-clamp-3">${escapeHtml(saf.overview)}</p>
                </div>
              </div>
              <div class="p-5 sm:p-6 pt-3 border-t border-[#E2E8F0] space-y-3">
                <button type="button" onclick="openItemFeedbackModal('${escapeHtml(saf.id)}', '${escapeHtml(saf.title).replace(/'/g, "\\'")}', 'safari')" class="text-xs font-bold text-[#073F27] hover:underline cursor-pointer block text-left">
                  Comments &amp; Traveller Notes (<span data-comment-count-id="${escapeHtml(saf.id)}">${db.getCommentCount(saf.id)}</span>)
                </button>
                <div class="flex flex-wrap gap-2.5">
                  <a href="safaris.html" class="btn-glass-forest flex-1 min-w-[130px] text-xs py-2.5 px-3 text-center justify-center">View Itinerary</a>
                  <a href="https://wa.me/${waDigits}?text=${waMsg}" target="_blank" rel="noopener noreferrer" class="btn-glass-gold flex-1 min-w-[130px] text-xs py-2.5 px-3 text-center justify-center">Inquire Tour</a>
                </div>
              </div>
            </article>
          `;
        })
        .join("");
    }
  }

  // 3) Hydrate Homepage Featured Shop Collection Directly From Live Shop Database (1:1 Parity With shop.html)
  const homeShopGrid = document.getElementById("homeShopGrid");
  if (homeShopGrid) {
    const allProducts = await db.getProducts();
    const activeProducts = allProducts.filter((p) => p.inStock !== false);
    const countLabel = document.getElementById("homeShopCountLabel");
    if (countLabel && activeProducts.length > 0) {
      countLabel.textContent = `Explore All ${activeProducts.length} Shop Items`;
    }

    if (activeProducts.length === 0) {
      homeShopGrid.innerHTML = `
        <div class="sm:col-span-2 lg:col-span-3 p-8 bg-white border border-[#CBD5E1] rounded-3xl text-center space-y-2 shadow-sm">
          <h3 class="font-editorial text-xl font-bold text-[#0F172A]">No Active Shop Products Listed</h3>
          <p class="text-xs text-[#334155]">Add or publish items inside Shop Catalog Manager to display them here.</p>
        </div>
      `;
    } else {
      const highlightProducts = activeProducts.slice(0, 6);
      homeShopGrid.innerHTML = highlightProducts
        .map((item) => {
          const likes = db.getItemLikeCount(item.id, item.likesCount || 0);
          return `
            <article class="min-w-0 p-5 bg-white border border-[#CBD5E1] rounded-3xl flex flex-col justify-between hover:border-[#073F27] transition-all duration-300 shadow-sm">
              <div>
                <div class="relative h-52 w-full overflow-hidden rounded-2xl mb-4 bg-[#F1F5F9]">
                  <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.altText || item.name)}" loading="lazy" referrerpolicy="no-referrer" onerror="window.handleMediaImgError&&window.handleMediaImgError(this,'./assets/images/safari-gear.jpg')" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                  ${item.isSale ? `<span class="absolute top-3 left-3 bg-[#073F27] text-[#F4B41A] text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full">Featured Offer</span>` : ""}
                  <span class="absolute bottom-3 left-3 bg-white/95 text-[#0F172A] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-lg border border-[#CBD5E1] max-w-[calc(100%-1.5rem)] truncate">${escapeHtml(item.weight || item.origin)}</span>
                </div>

                <div class="space-y-2">
                  <div class="flex items-center justify-between gap-2 text-[10px] font-bold tracking-wider uppercase">
                    <span class="text-[#7C4D00] truncate">${escapeHtml(item.category)}</span>
                    <span class="text-[#073F27] shrink-0">${Number(item.rating || 5).toFixed(1)} / 5.0</span>
                  </div>

                  <h3 class="font-editorial text-xl font-bold text-[#0F172A] line-clamp-2">${escapeHtml(item.name)}</h3>

                  <div class="flex flex-wrap items-center gap-2.5">
                    <span class="text-base font-mono font-bold text-[#073F27]">${escapeHtml(formatUGX(item.price))}</span>
                    ${item.originalPrice ? `<span class="text-xs text-[#64748B] line-through font-mono">${escapeHtml(formatUGX(item.originalPrice))}</span>` : ""}
                  </div>

                  <p class="text-xs text-[#334155] leading-relaxed line-clamp-3">${escapeHtml(item.description)}</p>
                </div>
              </div>

              <div class="pt-4 border-t border-[#E2E8F0] mt-4 space-y-3">
                <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <button type="button" onclick="handleLikeClick(this, '${escapeHtml(item.id)}')" aria-pressed="${localStorage.getItem("sonnenpfad_user_liked_" + item.id) === "true" ? "true" : "false"}" aria-label="Like ${escapeHtml(item.name)}" class="like-btn ${localStorage.getItem("sonnenpfad_user_liked_" + item.id) === "true" ? "is-liked" : ""} flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-colors cursor-pointer shrink-0">
                    <svg class="like-heart-icon w-4 h-4" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    <span class="like-count font-mono font-bold" data-like-id="${escapeHtml(item.id)}">${likes}</span>
                  </button>

                  <button type="button" onclick="openItemFeedbackModal('${escapeHtml(item.id)}', '${escapeHtml(item.name).replace(/'/g, "\\'")}', 'product')" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#CBD5E1] bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#073F27] text-xs font-bold transition-colors cursor-pointer min-w-0">
                    <span>Comments (<span data-comment-count-id="${escapeHtml(item.id)}">${db.getCommentCount(item.id)}</span>)</span>
                  </button>
                </div>

                <a href="shop.html?order=${encodeURIComponent(item.id)}" class="btn-glass-gold w-full text-center justify-center text-xs py-3 px-4 leading-snug">
                  Order Now (${escapeHtml(formatUGX(item.price))})
                </a>
              </div>
            </article>
          `;
        })
        .join("");
    }
  }

  // 4) Sync Likes Badges & White/Red Like Button States & Section Comment Counts
  syncLikeButtonsUI();
  updateSectionCommentBadges();

  // 5) Hydrate Homepage Reviews Grid with ONLY approved public reviews (Featured first)
  const homeReviewsGrid = document.getElementById("homeReviewsGrid");
  if (homeReviewsGrid) {
    const reviews = await db.getReviews(false);
    const summaryEl = document.getElementById("homeReviewsSummary");

    if (reviews.length === 0) {
      if (summaryEl) {
        summaryEl.textContent = "0 Verified Submissions Yet";
      }
      homeReviewsGrid.innerHTML = `
        <div class="md:col-span-3 p-8 bg-white border border-[#CBD5E1] rounded-3xl text-center space-y-3 shadow-sm">
          <h3 class="font-editorial text-2xl font-bold text-[#0F172A]">No Guest Reviews Published Yet</h3>
          <p class="text-sm text-[#334155] max-w-xl mx-auto">
            We publish only genuine expedition feedback submitted directly by travellers. Share your review after completing your safari or coffee order.
          </p>
          <div class="pt-2">
            <a href="reviews.html" class="btn-glass-gold text-xs py-2.5 px-6">Be the First to Leave a Review</a>
          </div>
        </div>
      `;
    } else {
      const sorted = [...reviews].sort(
        (a, b) =>
          Number(b.status === "Featured on Homepage") -
          Number(a.status === "Featured on Homepage")
      );
      const avg = (
        sorted.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / sorted.length
      ).toFixed(1);
      if (summaryEl) {
        summaryEl.textContent = `Average ${avg} / 5.0 across ${sorted.length} guest ${sorted.length === 1 ? "review" : "reviews"}`;
      }
      homeReviewsGrid.innerHTML = sorted
        .slice(0, 3)
        .map(
          (r) => `
          <article class="p-6 bg-white border ${r.status === "Featured on Homepage" ? "border-2 border-[#073F27]" : "border-[#CBD5E1]"} rounded-3xl space-y-4 shadow-sm flex flex-col justify-between">
            <div class="space-y-3">
              <div class="flex items-center justify-between text-xs gap-2">
                <span class="text-[#7C4D00] font-bold" aria-label="${Number(r.rating) || 5} out of 5 stars">${Number(r.rating) || 5}.0 / 5.0 Stars</span>
                <span class="px-2 py-0.5 rounded-full ${r.status === "Featured on Homepage" ? "bg-[#073F27] text-[#F4B41A]" : "bg-[#F1F5F9] text-[#073F27] border border-[#CBD5E1]"} text-[10px] font-bold">${escapeHtml(r.status || "Verified Guest")}</span>
              </div>
              <p class="text-sm text-[#334155] leading-relaxed italic">"${escapeHtml(r.content)}"</p>
            </div>
            <div class="border-t border-[#CBD5E1] pt-3">
              <h3 class="font-editorial text-lg font-bold text-[#0F172A]">${escapeHtml(r.author)}</h3>
              <span class="text-xs text-[#7C4D00] font-semibold block">${escapeHtml(r.country)} · ${escapeHtml(r.date)}</span>
              <span class="text-[11px] text-[#475569] block mt-0.5">${escapeHtml(r.tourName)}</span>
            </div>
          </article>
        `
        )
        .join("");
    }
  }

  // 6) Hydrate TikTok Grid (Clean UI without emojis)
  const ttGrid = document.getElementById("tiktokFeedGrid");
  if (ttGrid) {
    const tiktoks = db.getTiktoks();
    if (tiktoks && tiktoks.length > 0) {
      ttGrid.innerHTML = tiktoks
        .slice(0, 4)
        .map(
          (tt) => `
          <a href="${escapeHtml(tt.videoUrl)}" target="_blank" rel="noopener noreferrer" class="group bg-white border border-[#CBD5E1] rounded-3xl overflow-hidden shadow-md hover:border-[#7C4D00] transition-all flex flex-col justify-between">
            <div class="relative aspect-[9/16] w-full overflow-hidden bg-[#0F172A]">
              <img src="${escapeHtml(tt.thumbnail)}" alt="${escapeHtml(tt.title)}" loading="lazy" referrerpolicy="no-referrer" onerror="window.handleMediaImgError&&window.handleMediaImgError(this,'./assets/images/bwindi-gorilla.jpg')" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-14 h-14 rounded-full bg-[#073F27]/95 border-2 border-[#F4B41A] text-[#F4B41A] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform" aria-hidden="true">
                  <svg class="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              <div class="absolute top-3 left-3 bg-black/75 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-white keep-white">
                ${escapeHtml(tt.views || "TikTok Video")}
              </div>
              <div class="absolute bottom-3 left-3 right-3 text-xs text-white">
                <span class="font-bold text-[#F4B41A] block">${escapeHtml(s.tiktok || "@kisacathy1900")}</span>
                <p class="line-clamp-2 text-[11px] text-white keep-white">${escapeHtml(tt.title)}</p>
              </div>
            </div>
            <div class="p-3 bg-[#F8FAFC] text-center border-t border-[#CBD5E1] text-xs font-bold text-[#073F27] group-hover:text-[#7C4D00] transition-colors">
              Watch Reel on TikTok
            </div>
          </a>
        `
        )
        .join("");
    }
  }

  syncLikeButtonsUI();
  updateSectionCommentBadges();
  try {
    window.dispatchEvent(new CustomEvent("sonnenpfad:data-updated"));
  } catch {}
}

// =========================================================================
// 6. SEO CANONICAL SYNC & COOKIE / PRIVACY PREFERENCES BANNER
// =========================================================================
export function syncCanonicalSeo() {
  if (typeof document === "undefined" || typeof window === "undefined") return;
  const cleanUrl = window.location.origin + window.location.pathname;
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = cleanUrl;
}

export function initCookieConsent() {
  if (typeof document === "undefined") return;
  if (window.location.pathname.includes("admin.html")) return;
  if (localStorage.getItem("sonnenpfad_cookie_choice")) return;

  const bar = document.createElement("div");
  bar.id = "cookieConsentBar";
  bar.setAttribute("role", "dialog");
  bar.setAttribute("aria-label", "Privacy and browser storage preferences");
  bar.className =
    "fixed bottom-3 left-3 right-3 sm:left-auto sm:right-5 sm:max-w-md z-40 bg-white border-2 border-[#073F27] rounded-2xl p-4 shadow-2xl text-xs text-[#0F172A]";
  bar.innerHTML = `
    <div class="space-y-2.5">
      <div class="flex items-center justify-between gap-2">
        <strong class="text-[#073F27] font-bold uppercase tracking-wider text-[11px]">Privacy &amp; Essential Storage</strong>
        <a href="cookie-policy.html" class="text-[11px] font-bold text-[#7C4D00] underline">Cookie Policy</a>
      </div>
      <p class="text-[11px] text-[#334155] leading-relaxed">
        We use strictly necessary browser storage only to keep your inquiry preferences and item likes working. We do not use advertising or cross-site tracking cookies.
      </p>
      <div class="flex flex-wrap items-center gap-2 pt-1">
        <button type="button" id="acceptEssentialBtn" class="px-3.5 py-2 rounded-full bg-[#073F27] text-white font-bold text-[11px] cursor-pointer hover:bg-[#0A5233]">
          Accept Essential Storage
        </button>
        <a href="privacy-policy.html#data-deletion" class="px-3 py-2 rounded-full bg-[#F1F5F9] text-[#0F172A] border border-[#CBD5E1] font-bold text-[11px] hover:bg-[#E2E8F0]">
          Data Deletion
        </a>
      </div>
    </div>
  `;
  document.body.appendChild(bar);

  const acceptBtn = document.getElementById("acceptEssentialBtn");
  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      try {
        localStorage.setItem("sonnenpfad_cookie_choice", "essential_only");
      } catch {}
      bar.remove();
    });
  }
}

// =========================================================================
// 7. THEME, KEYBOARD NAVIGATION & ACCESSIBLE CONTROLS
// =========================================================================
export function initTheme() {
  const html = document.documentElement;
  html.classList.add("light");
  html.classList.remove("dark");
  try {
    localStorage.setItem("sonnenpfad_theme", "light");
  } catch {}
}

export function initNavigation() {
  const mobileToggle = document.getElementById("mobileMenuToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  const mobileClose = document.getElementById("mobileDrawerClose");

  const openMobileDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove("hidden");
    mobileToggle?.setAttribute("aria-expanded", "true");
    mobileClose?.focus();
  };

  const closeMobileDrawer = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add("hidden");
    mobileToggle?.setAttribute("aria-expanded", "false");
    mobileToggle?.focus();
  };

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", openMobileDrawer);
  }
  if (mobileClose && mobileDrawer) {
    mobileClose.addEventListener("click", closeMobileDrawer);
  }

  const searchBtn = document.getElementById("navSearchBtn");
  const searchOverlay = document.getElementById("searchOverlay");
  const searchClose = document.getElementById("searchOverlayClose");

  if (searchBtn && searchOverlay) {
    searchBtn.addEventListener("click", () => {
      searchOverlay.classList.remove("hidden");
      const input = searchOverlay.querySelector("input");
      if (input) input.focus();
    });
  }
  if (searchClose && searchOverlay) {
    searchClose.addEventListener("click", () => {
      searchOverlay.classList.add("hidden");
      searchBtn?.focus();
    });
  }

  // Keyboard accessible dropdown menus
  document.querySelectorAll<HTMLElement>("[data-nav-dropdown]").forEach((wrapper) => {
    const trigger = wrapper.querySelector<HTMLElement>("[data-dropdown-trigger]");
    if (!trigger) return;

    trigger.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        if (e.key !== "Enter" || !wrapper.classList.contains("nav-dropdown-open")) {
          e.preventDefault();
          wrapper.classList.add("nav-dropdown-open");
          trigger.setAttribute("aria-expanded", "true");
          const firstItem = wrapper.querySelector<HTMLElement>(".dropdown-menu a");
          firstItem?.focus();
        }
      } else if (e.key === "Escape") {
        wrapper.classList.remove("nav-dropdown-open");
        trigger.setAttribute("aria-expanded", "false");
        trigger.focus();
      }
    });

    wrapper.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        wrapper.classList.remove("nav-dropdown-open");
        trigger.setAttribute("aria-expanded", "false");
        trigger.focus();
      }
    });
  });

  // Global Escape handler for drawers, overlays, and modals
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    if (mobileDrawer && !mobileDrawer.classList.contains("hidden")) closeMobileDrawer();
    if (searchOverlay && !searchOverlay.classList.contains("hidden")) {
      searchOverlay.classList.add("hidden");
      searchBtn?.focus();
    }
    const feedbackModal = document.getElementById("globalFeedbackModal");
    if (feedbackModal && !feedbackModal.classList.contains("hidden")) {
      feedbackModal.classList.add("hidden");
    }
    const prodModal = document.getElementById("productOrderModal");
    if (prodModal && !prodModal.classList.contains("hidden")) {
      prodModal.classList.add("hidden");
    }
    const revModal = document.getElementById("reviewModal");
    if (revModal && !revModal.classList.contains("hidden")) {
      revModal.classList.add("hidden");
    }
  });
}

export function updateSectionCommentBadges() {
  if (typeof document === "undefined") return;
  document.querySelectorAll<HTMLElement>("[data-comment-count-id]").forEach((el) => {
    const itemId = el.getAttribute("data-comment-count-id");
    if (itemId) {
      el.textContent = String(db.getCommentCount(itemId));
    }
  });
}

// =========================================================================
// 8. INTERACTIVE COMMENT & RATING MODAL (CUSTOMER EDIT/DELETE + MODERATION)
// =========================================================================
export async function openItemFeedbackModal(
  itemId: string,
  itemName: string,
  itemType: string = "item",
  options: { editingId?: string | null; confirmingDeleteId?: string | null } = {}
) {
  let modal = document.getElementById("globalFeedbackModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "globalFeedbackModal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "feedbackItemTitle");
    modal.className =
      "fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto";
    modal.innerHTML = `
      <div class="relative w-full max-w-xl bg-white border-2 border-[#CBD5E1] rounded-3xl p-6 sm:p-8 text-[#0F172A] shadow-2xl space-y-5 animate-slide-up my-8">
        <button id="closeFeedbackModalBtn" type="button" aria-label="Close comments dialog" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] flex items-center justify-center cursor-pointer border border-[#CBD5E1]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div class="border-b border-[#CBD5E1] pb-3 pr-10">
          <span id="feedbackTypeBadge" class="text-[10px] font-bold uppercase tracking-widest text-[#7C4D00] block">Community Comments</span>
          <h2 id="feedbackItemTitle" class="font-editorial text-2xl font-bold text-[#0F172A] mt-0.5">Section Name</h2>
        </div>

        <form id="feedbackForm" class="space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-[#CBD5E1]">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <span class="text-xs font-bold uppercase text-[#7C4D00] block">Share Your Comment (Display Name Only)</span>
            <span id="feedbackModerationNotice" class="hidden text-[10px] font-bold text-[#073F27] bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-full">Reviewed before publishing</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label for="feedbackAuthor" class="sr-only">Your Display Name</label>
              <input id="feedbackAuthor" type="text" required maxlength="80" placeholder="Your Display Name *" class="w-full bg-white border border-[#94A3B8] rounded-xl px-3 py-2 text-xs text-[#0F172A]" />
            </div>
            <div>
              <label for="feedbackRating" class="sr-only">Rating</label>
              <select id="feedbackRating" class="w-full bg-white border border-[#94A3B8] rounded-xl px-3 py-2 text-xs text-[#0F172A]">
                <option value="5">5.0 Stars (Excellent)</option>
                <option value="4">4.0 Stars (Very Good)</option>
                <option value="3">3.0 Stars (Good)</option>
              </select>
            </div>
          </div>
          <div>
            <label for="feedbackText" class="sr-only">Comment text</label>
            <textarea id="feedbackText" required rows="2" maxlength="600" placeholder="Share helpful notes or questions for this section..." class="w-full bg-white border border-[#94A3B8] rounded-xl px-3 py-2 text-xs text-[#0F172A] resize-none"></textarea>
          </div>
          <label class="flex items-start gap-2 text-[11px] text-[#334155] cursor-pointer">
            <input id="feedbackAgeConsent" type="checkbox" required class="mt-0.5 accent-[#073F27]" />
            <span>I confirm I am 18+ years old (or submitting with parent/guardian consent) and agree to our <a href="privacy-policy.html" class="underline font-bold text-[#073F27]">Privacy Policy</a>.</span>
          </label>
          <button type="submit" class="btn-glass-gold text-xs py-2 px-5">Publish Comment</button>
        </form>

        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase text-[#334155] tracking-wider block">Published Comments</span>
            <span id="feedbackCommentsCountLabel" class="text-[11px] font-mono font-bold text-[#073F27]">0 comments</span>
          </div>
          <div id="feedbackCommentsList" class="space-y-2.5 max-h-72 overflow-y-auto pr-1"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    document.getElementById("closeFeedbackModalBtn")?.addEventListener("click", () => {
      modal?.classList.add("hidden");
    });
  }

  const titleEl = document.getElementById("feedbackItemTitle");
  if (titleEl) titleEl.textContent = itemName;

  const badgeEl = document.getElementById("feedbackTypeBadge");
  if (badgeEl) {
    const typeMap: Record<string, string> = {
      safari: "Safari Itinerary Comments",
      product: "Shop Product Comments",
      destination: "National Park Section Comments",
      circuit: "East Africa Circuit Comments",
      gallery: "Photography Archive Comments",
      section: "Section Comments & Questions",
    };
    badgeEl.textContent = typeMap[itemType] || "Community Comments";
  }

  const modNoticeEl = document.getElementById("feedbackModerationNotice");
  const isManualMod = (db.getSettings().moderationMode || "auto") === "manual";
  if (modNoticeEl) {
    modNoticeEl.classList.toggle("hidden", !isManualMod);
  }

  // Show approved public comments + visitor's own pending comments so they can see/edit/delete them
  const allItemComments = await db.getComments(itemId, true);
  const myIds = new Set(db.getMyCommentIds());
  const visibleComments = allItemComments.filter(
    (c) => isPublicStatus(c.status) || (c.status === "Pending Approval" && myIds.has(c.id))
  );

  const countLabelEl = document.getElementById("feedbackCommentsCountLabel");
  if (countLabelEl) {
    const pubCount = visibleComments.filter((c) => isPublicStatus(c.status)).length;
    countLabelEl.textContent = `${pubCount} ${pubCount === 1 ? "published comment" : "published comments"}`;
  }

  const listEl = document.getElementById("feedbackCommentsList");
  if (listEl) {
    if (visibleComments.length === 0) {
      listEl.innerHTML = `<p class="text-xs text-[#475569] italic">No published comments for this section yet.</p>`;
    } else {
      listEl.innerHTML = visibleComments
        .map((c) => {
          const isMine = myIds.has(c.id);
          const isEditing = options.editingId === c.id;
          const isConfirmingDelete = options.confirmingDeleteId === c.id;
          const isPending = c.status === "Pending Approval";

          if (isEditing) {
            return `
              <form data-inline-edit-id="${escapeHtml(c.id)}" class="p-3.5 bg-amber-50/70 border-2 border-[#D99A00] rounded-xl space-y-2.5">
                <div class="flex items-center justify-between text-xs">
                  <span class="font-bold text-[#7C4D00] uppercase tracking-wider text-[10px]">Editing Your Comment</span>
                  <button type="button" data-cancel-edit class="text-[11px] font-bold text-[#475569] hover:text-[#0F172A] cursor-pointer">Cancel</button>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input type="text" data-edit-author required maxlength="80" value="${escapeHtml(c.author)}" class="w-full bg-white border border-[#94A3B8] rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A]" />
                  <select data-edit-rating class="w-full bg-white border border-[#94A3B8] rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A]">
                    <option value="5" ${Number(c.rating) === 5 ? "selected" : ""}>5.0 Stars (Excellent)</option>
                    <option value="4" ${Number(c.rating) === 4 ? "selected" : ""}>4.0 Stars (Very Good)</option>
                    <option value="3" ${Number(c.rating) === 3 ? "selected" : ""}>3.0 Stars (Good)</option>
                  </select>
                </div>
                <textarea data-edit-text required rows="2" maxlength="600" class="w-full bg-white border border-[#94A3B8] rounded-lg px-2.5 py-1.5 text-xs text-[#0F172A] resize-none">${escapeHtml(c.text)}</textarea>
                <div class="flex items-center justify-end gap-2">
                  <button type="button" data-cancel-edit class="px-3 py-1 rounded-lg bg-white border border-[#CBD5E1] text-[11px] font-bold text-[#0F172A] cursor-pointer">Cancel</button>
                  <button type="submit" class="px-3.5 py-1 rounded-lg bg-[#073F27] text-white text-[11px] font-bold cursor-pointer">Save Changes</button>
                </div>
              </form>
            `;
          }

          return `
            <div class="p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl space-y-1.5">
              <div class="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-[#0F172A]">${escapeHtml(c.author)}</span>
                  ${isMine ? `<span class="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-300 text-[#073F27] text-[10px] font-bold">Yours</span>` : ""}
                  ${isPending ? `<span class="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-300 text-[#7C4D00] text-[10px] font-bold">Awaiting Owner Approval</span>` : ""}
                </div>
                <span class="text-[#7C4D00] font-bold">${Number(c.rating) || 5}.0 Stars · <span class="text-[#475569] text-[10px]">${escapeHtml(c.date)}</span></span>
              </div>
              <p class="text-xs text-[#334155]">${escapeHtml(c.text)}</p>
              ${
                isMine
                  ? isConfirmingDelete
                    ? `<div class="pt-2 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 text-[11px]">
                        <span class="font-bold text-red-800">Delete your comment permanently?</span>
                        <div class="flex items-center gap-1.5">
                          <button type="button" data-cancel-delete class="px-2.5 py-1 rounded-lg bg-white border border-[#CBD5E1] font-bold text-[#0F172A] cursor-pointer">Keep</button>
                          <button type="button" data-confirm-delete-id="${escapeHtml(c.id)}" class="px-2.5 py-1 rounded-lg bg-red-600 text-white font-bold cursor-pointer">Confirm Delete</button>
                        </div>
                      </div>`
                    : `<div class="pt-1.5 border-t border-[#E2E8F0] flex items-center justify-end gap-2">
                        <button type="button" data-start-edit-id="${escapeHtml(c.id)}" class="px-2.5 py-1 rounded-lg bg-white hover:bg-[#E2E8F0] border border-[#CBD5E1] text-[11px] font-bold text-[#073F27] cursor-pointer">Edit</button>
                        <button type="button" data-start-delete-id="${escapeHtml(c.id)}" class="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 border border-red-300 text-[11px] font-bold text-red-800 cursor-pointer">Delete</button>
                      </div>`
                  : ""
              }
            </div>
          `;
        })
        .join("");

      listEl.querySelectorAll<HTMLButtonElement>("[data-start-edit-id]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const cid = btn.getAttribute("data-start-edit-id");
          openItemFeedbackModal(itemId, itemName, itemType, { editingId: cid });
        });
      });

      listEl.querySelectorAll<HTMLButtonElement>("[data-cancel-edit]").forEach((btn) => {
        btn.addEventListener("click", () => {
          openItemFeedbackModal(itemId, itemName, itemType);
        });
      });

      listEl.querySelectorAll<HTMLFormElement>("[data-inline-edit-id]").forEach((editForm) => {
        editForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const cid = editForm.getAttribute("data-inline-edit-id") || "";
          const nextAuthor = (editForm.querySelector("[data-edit-author]") as HTMLInputElement).value;
          const nextRating = Number((editForm.querySelector("[data-edit-rating]") as HTMLSelectElement).value);
          const nextText = (editForm.querySelector("[data-edit-text]") as HTMLTextAreaElement).value;
          await db.updateComment(cid, itemId, {
            author: nextAuthor,
            rating: nextRating,
            text: nextText,
          });
          showToast("Your comment has been updated.");
          openItemFeedbackModal(itemId, itemName, itemType);
        });
      });

      listEl.querySelectorAll<HTMLButtonElement>("[data-start-delete-id]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const cid = btn.getAttribute("data-start-delete-id");
          openItemFeedbackModal(itemId, itemName, itemType, { confirmingDeleteId: cid });
        });
      });

      listEl.querySelectorAll<HTMLButtonElement>("[data-cancel-delete]").forEach((btn) => {
        btn.addEventListener("click", () => {
          openItemFeedbackModal(itemId, itemName, itemType);
        });
      });

      listEl.querySelectorAll<HTMLButtonElement>("[data-confirm-delete-id]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          const cid = btn.getAttribute("data-confirm-delete-id") || "";
          await db.deleteComment(cid, itemId);
          showToast("Your comment has been deleted.");
          openItemFeedbackModal(itemId, itemName, itemType);
        });
      });
    }
  }

  const form = document.getElementById("feedbackForm");
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const author = (document.getElementById("feedbackAuthor") as HTMLInputElement).value;
      const rating = Number((document.getElementById("feedbackRating") as HTMLSelectElement).value);
      const text = (document.getElementById("feedbackText") as HTMLTextAreaElement).value;

      const created = await db.addComment(itemId, author, text, rating, itemType);
      (document.getElementById("feedbackText") as HTMLTextAreaElement).value = "";
      if (created.status === "Pending Approval") {
        showToast("Comment submitted and awaiting owner approval before public display.", "info");
      } else {
        showToast("Your comment has been published.");
      }
      openItemFeedbackModal(itemId, itemName, itemType);
    };
  }

  modal.classList.remove("hidden");
  if (!options.editingId && !options.confirmingDeleteId) {
    (document.getElementById("feedbackAuthor") as HTMLInputElement | null)?.focus();
  }
}

export function syncLikeButtonsUI() {
  document.querySelectorAll<HTMLElement>(".like-count[data-like-id]").forEach((el) => {
    const itemId = el.getAttribute("data-like-id");
    if (!itemId) return;
    el.textContent = String(db.getItemLikeCount(itemId, Number(el.textContent) || 0));
    const btn = el.closest("button");
    if (btn) {
      btn.classList.add("like-btn");
      const isLiked = localStorage.getItem("sonnenpfad_user_liked_" + itemId) === "true";
      btn.classList.toggle("is-liked", isLiked);
      btn.setAttribute("aria-pressed", String(isLiked));
    }
  });
}

export async function handleLikeClick(btnEl: HTMLElement, itemId: string) {
  btnEl.classList.add("like-btn");
  const result = await db.toggleLike(itemId);
  const countEl = btnEl.querySelector(".like-count");
  if (countEl) {
    countEl.textContent = String(result.count);
  }
  btnEl.classList.toggle("is-liked", result.liked);
  btnEl.setAttribute("aria-pressed", String(result.liked));
  syncLikeButtonsUI();
}

// Attach globally to window for standalone multi-page HTML pages
if (typeof window !== "undefined") {
  (window as any).db = db;
  (window as any).supabase = supabase;
  (window as any).testSupabaseConnection = testSupabaseConnection;
  (window as any).SUPABASE_SCHEMA_SQL = SUPABASE_SCHEMA_SQL;
  (window as any).SUPABASE_URL = SUPABASE_URL;
  (window as any).SUPABASE_DB_URL = SUPABASE_DB_URL;
  (window as any).openItemFeedbackModal = openItemFeedbackModal;
  (window as any).openFeedbackModal = openItemFeedbackModal;
  (window as any).handleLikeClick = handleLikeClick;
  (window as any).handleCardLike = (itemId: string, btnEl: HTMLElement) =>
    handleLikeClick(btnEl, itemId);
  (window as any).syncLikeButtonsUI = syncLikeButtonsUI;
  (window as any).formatUGX = formatUGX;
  (window as any).escapeHtml = escapeHtml;
  (window as any).showToast = showToast;
  (window as any).hydrateLiveSiteContent = hydrateLiveSiteContent;
  (window as any).updateSectionCommentBadges = updateSectionCommentBadges;
  (window as any).googleMedia = googleMedia;
  (window as any).handleMediaImgError = googleMedia.handleMediaImgError;
}

function bootSonnenpfadSite() {
  initTheme();
  syncCanonicalSeo();
  initNavigation();
  initHeroShowcase();
  initCookieConsent();
  hydrateLiveSiteContent();
  db.fetchLive();
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootSonnenpfadSite);
  } else {
    bootSonnenpfadSite();
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && !window.location.pathname.includes("admin.html")) {
      db.fetchLive();
    }
  });
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e: StorageEvent) => {
    if (e.key && e.key.startsWith("sonnenpfad_")) {
      hydrateLiveSiteContent();
    }
  });
}
