/**
 * Sonnenpfad Safaris Uganda Ltd - Global Engine & Live Database System
 * Fully connected to Supabase Database (https://ujodbxzzibfypfgqsnpj.supabase.co)
 * with live Express backend API (/api/*) and persistent fallback.
 */

import { supabase, testSupabaseConnection, SUPABASE_SCHEMA_SQL, SUPABASE_URL, SUPABASE_DB_URL } from './supabase';

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
  category: "Specialty Coffee" | "Expedition Gear" | "Optics & Binoculars" | "Apparel & Hats" | "Accessories" | "Skincare";
  roastLevel?: string;
  price: number;
  originalPrice?: number;
  weight: string;
  rating: number;
  reviewsCount: number;
  image: string;
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
  status: "Verified Guest" | "Featured on Homepage" | "Approved";
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

export const formatUGX = (amount: number): string => {
  return "UGX " + amount.toLocaleString("en-US");
};

// 1. DEFAULT SEED DATA
const DEFAULT_SAFARIS: SafariPackage[] = [
  {
    id: "saf-1",
    title: "3-Day Bwindi Ultimate Gorilla Trekking Experience",
    duration: "3 Days / 2 Nights",
    durationDays: 3,
    destinations: ["Bwindi Impenetrable Forest", "Equator Crossing"],
    destinationsFormatted: "Bwindi Impenetrable National Park",
    priceUGX: 5200000,
    formattedPriceUGX: "UGX 5,200,000",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    overview:
      "A thrilling encounter with endangered mountain gorillas in their ancient mist-shrouded rainforest home. Accompanied by experienced UWA rangers, track habituated gorilla families for a life-defining hour of quiet observation.",
    highlights: [
      "Guaranteed mountain gorilla tracking permit",
      "Scenic journey across the Kigezi Highlands (Switzerland of Africa)",
      "Official Equator monument stop & water vortex experiment",
      "Stay in boutique forest lodges overlooking the canopy"
    ],
    included: [
      "Official Mountain Gorilla Trekking Permit ($800 value)",
      "4x4 Safari Land Cruiser with pop-up roof & English-speaking guide",
      "2 nights full-board accommodation at premier lodge",
      "All park entry fees, bottled drinking water in vehicle"
    ],
    excluded: [
      "International flights and entry visas",
      "Porter fees during gorilla trek ($20 recommended)",
      "Personal travel insurance and gratuities"
    ],
    accommodationLevel: "Luxury",
    likesCount: 142,
    itinerary: [
      {
        day: 1,
        title: "Entebbe / Kampala to Bwindi Forest",
        description: "Depart Entebbe in private 4x4 Land Cruiser. Stop at the Equator for photography, then journey through rolling terraced hills to Bwindi.",
        accommodation: "Buhoma Lodge"
      },
      {
        day: 2,
        title: "The Gorilla Trekking Encounter",
        description: "Trek into the ancient forest canopy. Once located, spend one unforgettable hour observing the silverback and playful infants.",
        accommodation: "Buhoma Lodge"
      },
      {
        day: 3,
        title: "Scenic Return to Entebbe",
        description: "Sunrise breakfast over the misty canopy before beginning the scenic return drive to Entebbe."
      }
    ]
  },
  {
    id: "saf-2",
    title: "14-Day Grand East Africa: Primates, Savannah & Great Migration",
    duration: "14 Days / 13 Nights",
    durationDays: 14,
    destinations: ["Bwindi", "Kibale", "Queen Elizabeth", "Serengeti", "Masai Mara", "Ngorongoro"],
    destinationsFormatted: "Uganda, Kenya & Tanzania Multi-Country Circuit",
    priceUGX: 24500000,
    formattedPriceUGX: "UGX 24,500,000",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    overview:
      "The pinnacle East African expedition combining Uganda's mountain gorillas and chimpanzees with the thundering herds of the Serengeti and Masai Mara Great Migration, and the volcanic wildlife bowl of Ngorongoro.",
    highlights: [
      "Mountain gorillas in Bwindi & chimpanzees in Kibale Forest",
      "Great Wildebeest Migration across Serengeti and Masai Mara",
      "Full-day game descent into the Ngorongoro Crater caldera",
      "Tree-climbing lions of Ishasha & Kazinga Channel boat safari"
    ],
    included: [
      "All primate permits (Gorillas & Chimpanzees)",
      "Private regional bush flights between parks",
      "Luxury tented camps & boutique eco-lodges",
      "Dedicated senior safari architect & professional guide"
    ],
    excluded: ["International long-haul flights", "Luxury champagne upgrades", "Personal travel insurance"],
    accommodationLevel: "Luxury",
    isFlagship: true,
    likesCount: 289,
    itinerary: [
      { day: 1, title: "Arrival in Entebbe, Uganda", description: "VIP airport reception and transfer to luxury lakeside hotel." },
      { day: 2, title: "Flight to Kibale Primate Capital", description: "Afternoon chimpanzee habituation and Bigodi swamp walk." },
      { day: 3, title: "Queen Elizabeth National Park", description: "Kazinga Channel boat cruise teeming with hippos and elephants." },
      { day: 4, title: "Ishasha Tree-Climbing Lions to Bwindi", description: "Search for fig-tree lions and proceed to misty Bwindi." },
      { day: 5, title: "Mountain Gorilla Trekking", description: "Breathtaking trek to spend one hour with the mountain gorillas." }
    ]
  },
  {
    id: "saf-3",
    title: "7-Day Pearls of Uganda: Gorillas, Chimpanzees & Wildlife",
    duration: "7 Days / 6 Nights",
    durationDays: 7,
    destinations: ["Kibale Forest", "Queen Elizabeth", "Bwindi Impenetrable"],
    destinationsFormatted: "Kibale, Queen Elizabeth & Bwindi Forest",
    priceUGX: 9900000,
    formattedPriceUGX: "UGX 9,900,000",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
    overview:
      "A complete Ugandan primate and savannah circuit. Chimpanzee tracking in Kibale, boat cruises along the Kazinga Channel, savannah game drives with tree-climbing lions, and mountain gorillas in Bwindi.",
    highlights: [
      "Mountain gorilla trekking in Bwindi Impenetrable Forest",
      "Chimpanzee tracking in Kibale Forest (primate capital)",
      "Boat cruise on the Kazinga Channel with massive hippo pods",
      "Game drives across Kasenyi Plains and Ishasha tree-climbing lions"
    ],
    included: [
      "Bwindi gorilla tracking permit & Kibale chimpanzee permit",
      "Custom 4x4 Land Cruiser with open pop-up photographic roof",
      "6 nights boutique lodge accommodation, all meals"
    ],
    excluded: ["International airfare", "Visas", "Gratuities"],
    accommodationLevel: "Premium",
    likesCount: 176,
    itinerary: [
      { day: 1, title: "Drive to Kibale Forest", description: "Scenic transit past tea plantations into Kibale." },
      { day: 2, title: "Chimpanzee Tracking & Transfer to Queen Elizabeth", description: "Track chimps in morning; afternoon drive to Queen Elizabeth." }
    ]
  },
  {
    id: "saf-4",
    title: "10-Day Serengeti & Masai Mara Great Migration Odyssey",
    duration: "10 Days / 9 Nights",
    durationDays: 10,
    destinations: ["Masai Mara", "Serengeti", "Ngorongoro Crater", "Amboseli"],
    destinationsFormatted: "Kenya & Tanzania Savannah Plains",
    priceUGX: 16800000,
    formattedPriceUGX: "UGX 16,800,000",
    image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80",
    overview:
      "Follow the world's most breathtaking overland wildlife movement across the Mara-Serengeti ecosystem. Experience predator action, dramatic river crossings, and sweeping views of Mount Kilimanjaro.",
    highlights: [
      "Exclusive Mara River crossing vantage points",
      "Serengeti big cat tracking with master Maasai trackers",
      "Full day inside the Ngorongoro volcanic bowl",
      "Huge elephant tuskers of Amboseli with Kilimanjaro backdrop"
    ],
    included: ["All national park and conservation fees", "Customized 4x4 safari vehicle", "Luxury tented camp stays and full board"],
    excluded: ["Optional hot air balloon flight", "Visas and personal insurance"],
    accommodationLevel: "Luxury",
    likesCount: 215,
    itinerary: [
      { day: 1, title: "Arrive Nairobi, Kenya", description: "Transfer to boutique colonial hotel." },
      { day: 2, title: "Amboseli National Park", description: "Elephants beneath the snows of Mount Kilimanjaro." }
    ]
  },
  {
    id: "saf-5",
    title: "5-Day Murchison Falls & Chimpanzee Explorer",
    duration: "5 Days / 4 Nights",
    durationDays: 5,
    destinations: ["Murchison Falls", "Budongo Forest", "Ziwa Rhino Sanctuary"],
    destinationsFormatted: "Murchison Falls & Victoria Nile",
    priceUGX: 7800000,
    formattedPriceUGX: "UGX 7,800,000",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    overview:
      "Witness the world's most powerful surge of water as the Victoria Nile squeezes through a 7-meter gorge. Track wild white rhinos on foot at Ziwa, explore northern savannahs, and encounter chimpanzees in Budongo.",
    highlights: [
      "Foot tracking of southern white rhinos at Ziwa Sanctuary",
      "Boat cruise to the thunderous base of Murchison Falls",
      "Hike to the top of the falls where the Nile roars",
      "Northern delta game drives for Rothschild giraffes and lions"
    ],
    included: ["All park entry fees & boat excursions", "Ziwa rhino tracking permit", "Budongo chimp trek", "Full board safari lodge stay"],
    excluded: ["Optional delta boat cruise upgrade", "Alcoholic drinks & tips"],
    accommodationLevel: "Premium",
    likesCount: 164,
    itinerary: [
      { day: 1, title: "Ziwa Rhino Tracking & Drive to Murchison", description: "Walk with rhinos at Ziwa Sanctuary, then drive north." }
    ]
  },
  {
    id: "saf-6",
    title: "8-Day Rwanda & Uganda Primate Crown Expedition",
    duration: "8 Days / 7 Nights",
    durationDays: 8,
    destinations: ["Volcanoes National Park", "Lake Kivu", "Bwindi Impenetrable", "Queen Elizabeth"],
    destinationsFormatted: "Rwanda & Southwestern Uganda",
    priceUGX: 12500000,
    formattedPriceUGX: "UGX 12,500,000",
    image: "https://images.unsplash.com/photo-1544911845-1a7c6b8f4b1e?auto=format&fit=crop&w=1200&q=80",
    overview:
      "A cross-border primate pilgrimage connecting Rwanda's misty bamboo Virunga volcanoes with Uganda's ancient Bwindi rainforest. Experience golden monkey tracking, two unique gorilla habitats, and tranquil Lake Kivu.",
    highlights: [
      "Volcanoes National Park gorilla & golden monkey trekking",
      "Cross-border crossing into Uganda's Bwindi forest",
      "Serene shores and kayaking along Lake Kivu",
      "Savannah wildlife cruise along Queen Elizabeth's Kazinga Channel"
    ],
    included: ["All cross-border transfers and permits", "Luxury boutique lodge stays in Musanze and Bwindi", "Professional bilingual guide"],
    excluded: ["East Africa Tourist Visa ($100)", "Tips and personal souvenirs"],
    accommodationLevel: "Luxury",
    likesCount: 198,
    itinerary: [
      { day: 1, title: "Kigali to Volcanoes National Park", description: "Kigali Genocide Memorial visit and scenic drive into the Virungas." }
    ]
  }
];

// 2. EXPANDED LUXURY SAFARI & COFFEE SHOP PRODUCTS (Renamed to "Shop" with more products)
const DEFAULT_PRODUCTS: ShopProduct[] = [
  {
    id: "prod-1",
    name: "Mount Elgon Peaberry Reserve",
    origin: "Mount Elgon Slopes, Eastern Uganda",
    category: "Specialty Coffee",
    roastLevel: "Medium Roast",
    price: 65000,
    originalPrice: 85000,
    weight: "250g Whole Bean",
    rating: 5,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    inStock: true,
    flavorNotes: ["Wild Bergamot", "Dark Cocoa", "Candied Orange"],
    description: "Hand-picked peaberry coffee beans shade-grown on volcanic slopes at 2,000m altitude. Highly prized for intense sweetness and silky crema.",
    likesCount: 94
  },
  {
    id: "prod-2",
    name: "Rwenzori Glacier Mist Arabica",
    origin: "Mountains of the Moon, Western Uganda",
    category: "Specialty Coffee",
    roastLevel: "Medium-Dark Roast",
    price: 75000,
    originalPrice: 90000,
    weight: "250g Whole Bean",
    rating: 5,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80",
    isSale: false,
    inStock: true,
    flavorNotes: ["Black Currant", "Roasted Almond", "Brown Sugar"],
    description: "Grown along glacial runoff slopes of the Rwenzori Mountains. Naturally washed, crisp acidity and lingering dark chocolate finish.",
    likesCount: 78
  },
  {
    id: "prod-3",
    name: "Sonnenpfad Savannah Dawn Espresso",
    origin: "Uganda & Tanzania Rift Valley Blend",
    category: "Specialty Coffee",
    roastLevel: "Espresso Roast",
    price: 80000,
    weight: "500g Value Pack",
    rating: 5,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    inStock: true,
    flavorNotes: ["Caramel Molasses", "Hazelnut", "Spiced Nutmeg"],
    description: "Our signature early morning safari camp espresso blend. Full-bodied, thick golden crema, developed specifically to energize dawn game drives.",
    likesCount: 112
  },
  {
    id: "prod-4",
    name: "Kigezi Gorilla Highlands Dark Roast",
    origin: "Bwindi & Kisoro Highlands, Uganda",
    category: "Specialty Coffee",
    roastLevel: "Dark Roast",
    price: 70000,
    originalPrice: 85000,
    weight: "250g Ground",
    rating: 5,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    isSale: false,
    inStock: true,
    flavorNotes: ["Smoky Oak", "Dark Molasses", "Clove"],
    description: "Cultivated by local communities directly bordering Bwindi Forest. A portion of every bag funds community gorilla conservation corridors.",
    likesCount: 63
  },
  {
    id: "prod-5",
    name: "Kilimanjaro Summit Bourbon Arabica",
    origin: "Mount Kilimanjaro Slopes, Tanzania",
    category: "Specialty Coffee",
    roastLevel: "Medium Roast",
    price: 85000,
    weight: "250g Whole Bean",
    rating: 5,
    reviewsCount: 31,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    inStock: true,
    flavorNotes: ["Red Apple", "Honey Blossom", "Milk Chocolate"],
    description: "Pure heirloom bourbon variety grown on fertile volcanic southern slopes of Kilimanjaro. Delicate floral notes and smooth finish.",
    likesCount: 85
  },
  {
    id: "prod-6",
    name: "Heavy-Duty Gorilla Trekking Gaiters",
    origin: "Reinforced Waterproof Canvas",
    category: "Expedition Gear",
    price: 115000,
    originalPrice: 140000,
    weight: "Pair (Adjustable S/M/L)",
    rating: 5,
    reviewsCount: 22,
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    inStock: true,
    flavorNotes: ["Stinging Nettle Protection", "Steel Underboot Wire", "Breathable Waterproof"],
    description: "Essential for Bwindi forest trekking. Protects your legs from safari ants, thorny vines, stinging nettles, and thick volcanic mud.",
    likesCount: 134
  },
  {
    id: "prod-7",
    name: "Waterproof Expedition Backpack 45L",
    origin: "Ripstop 600D Military-Grade Nylon",
    category: "Expedition Gear",
    price: 280000,
    originalPrice: 350000,
    weight: "45 Litres + Rain Cover",
    rating: 5,
    reviewsCount: 18,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    inStock: true,
    flavorNotes: ["Ergonomic Lumbar Support", "Internal Hydration Sleeve", "Weather-Sealed Zippers"],
    description: "Rugged expedition daypack tailored for carrying cameras, rain gear, and water across rain-soaked forests and open savannah game reserves.",
    likesCount: 167
  },
  {
    id: "prod-8",
    name: "Bushnell NatureView HD Binoculars 10x42",
    origin: "Multi-Coated Optical Glass",
    category: "Optics & Binoculars",
    price: 540000,
    originalPrice: 650000,
    weight: "Fogproof & Nitrogen-Purged",
    rating: 5,
    reviewsCount: 27,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
    isSale: false,
    inStock: true,
    flavorNotes: ["10x Magnification", "Low-Light Dawn Clarity", "Shockproof Rubber Armor"],
    description: "Precision binoculars calibrated for spotting tree-climbing lions, leopard silhouettes, and rare forest birds in Kibale and Serengeti.",
    likesCount: 189
  },
  {
    id: "prod-9",
    name: "Wide-Brim UPF 50+ UV Safari Hat",
    origin: "Breathable Quick-Dry Cotton Canvas",
    category: "Apparel & Hats",
    price: 60000,
    originalPrice: 75000,
    weight: "Universal Fit with Wind Cord",
    rating: 5,
    reviewsCount: 35,
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    inStock: true,
    flavorNotes: ["UPF 50+ UV Block", "Mesh Ventilation Crown", "Crushable Packable"],
    description: "Classic savannah sun hat designed for full neck and face protection during open-roof game drives across Queen Elizabeth and Murchison.",
    likesCount: 92
  },
  {
    id: "prod-10",
    name: "Handcrafted Wild Olive Wood 58mm Tamper",
    origin: "East African Artisan Carvers",
    category: "Accessories",
    price: 130000,
    originalPrice: 160000,
    weight: "Solid Olive Wood & Steel (58mm)",
    rating: 5,
    reviewsCount: 14,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
    isSale: false,
    inStock: true,
    flavorNotes: ["Calibrated Flat Base", "Beeswax Finished", "Ergonomic Grip"],
    description: "Carved from salvaged wild olive wood with surgical grade stainless steel base. Hand-finished with beeswax by master artisans in Kampala.",
    likesCount: 57
  },
  {
    id: "prod-11",
    name: "Organic Arabica Coffee Body Scrub (300g)",
    origin: "Mount Elgon Peaberry & Cold-Pressed Shea",
    category: "Skincare",
    price: 45000,
    originalPrice: 60000,
    weight: "300g Glass Jar",
    rating: 5,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1608248597359-052065e89d60?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    inStock: true,
    flavorNotes: ["Caffeine Exfoliation", "Nilotica Shea Butter", "Vitamin E Nourishing"],
    description: "Revitalizing botanical scrub made from fresh ground Mount Elgon Arabica and wild Ugandan Nilotica shea butter. Leaves skin velvety and energized.",
    likesCount: 71
  },
  {
    id: "prod-12",
    name: "Double-Wall Stainless Vacuum Safari Flask 1.2L",
    origin: "Food-Grade 18/8 Stainless Steel",
    category: "Accessories",
    price: 95000,
    originalPrice: 120000,
    weight: "1.2 Litre Capacity",
    rating: 5,
    reviewsCount: 23,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80",
    isSale: false,
    inStock: true,
    flavorNotes: ["Keeps Hot 24 Hours", "Keeps Cold 36 Hours", "Leakproof Push-Button Stopper"],
    description: "Heavy-duty thermal flask with integrated serving cup. Keeps your Mount Elgon coffee steaming hot during freezing dawn game drives.",
    likesCount: 88
  }
];

const DEFAULT_REVIEWS: CustomerReview[] = [
  {
    id: "rev-1",
    author: "Elena & Marcus Weber",
    country: "Zurich, Switzerland",
    tourName: "3-Day Bwindi Ultimate Gorilla Trekking Experience",
    rating: 5,
    date: "November 2026",
    overallScore: 99,
    wildlifeScore: 100,
    guideScore: 100,
    lodgingScore: 98,
    content: "Trekking the mountain gorillas in Bwindi with Sonnenpfad Safaris was the single most transcendent experience of our lives. Standing four meters from the silverback was humbling beyond words. Our driver-guide Alex navigated every terrain with unmatched poise and safety.",
    status: "Featured on Homepage"
  },
  {
    id: "rev-2",
    author: "Dr. Arthur Pendelton",
    country: "Oxford, United Kingdom",
    tourName: "14-Day Grand East Africa: Primates, Savannah & Great Migration",
    rating: 5,
    date: "October 2026",
    overallScore: 98,
    wildlifeScore: 99,
    guideScore: 100,
    lodgingScore: 96,
    content: "A masterclass in safari architecture. From tracking chimpanzees in Kibale to witnessing a river crossing of over 10,000 wildebeests in the Serengeti, Sonnenpfad Safaris orchestrated regional flights, park permissions, and five-star bush camps with military precision.",
    status: "Featured on Homepage"
  },
  {
    id: "rev-3",
    author: "Kisa Cathy & Family",
    country: "Kampala, Uganda",
    tourName: "5-Day Murchison Falls & Chimpanzee Explorer",
    rating: 5,
    date: "September 2026",
    overallScore: 100,
    wildlifeScore: 100,
    guideScore: 100,
    lodgingScore: 100,
    content: "Sonnenpfad Safaris treats you like royalty from start to finish. Watching the Nile surge through Murchison Falls while sipping fresh Mount Elgon coffee from their roastery was unforgettable. The Land Cruiser was immaculate!",
    status: "Verified Guest"
  }
];

const DEFAULT_COMMENTS: Record<string, CommentItem[]> = {
  "saf-1": [
    {
      id: "com-1",
      itemId: "saf-1",
      author: "Beatriz L. (Madrid)",
      rating: 5,
      text: "The trek was demanding through the misty slopes, but our guide Alex and the rangers made us feel completely secure. The silverback was calm and majestic!",
      itemType: "safari",
      date: "Nov 4, 2026"
    },
    {
      id: "com-2",
      itemId: "saf-1",
      author: "Tobias Schmidt (Munich)",
      rating: 5,
      text: "Buhoma Lodge was breathtaking. Sleeping with the sounds of the Bwindi rainforest is pure magic. Highly recommend getting a porter!",
      itemType: "safari",
      date: "Oct 28, 2026"
    }
  ],
  "prod-1": [
    {
      id: "com-3",
      itemId: "prod-1",
      author: "Julian Vance (London)",
      rating: 5,
      text: "One of the sweetest peaberry coffees I have tasted. The orange blossom and cocoa notes shine through French press.",
      itemType: "product",
      date: "Nov 2, 2026"
    }
  ],
  "prod-6": [
    {
      id: "com-4",
      itemId: "prod-6",
      author: "Claire D. (Nairobi)",
      rating: 5,
      text: "Do NOT attempt gorilla trekking without these gaiters! The forest mud and ants are relentless. These kept my boots bone dry.",
      itemType: "product",
      date: "Oct 15, 2026"
    }
  ]
};

const DEFAULT_SETTINGS = {
  phone: "+256 773 333108",
  whatsapp: "+256 773 333108",
  email: "info@sonnenpfadsafaris.com",
  tiktok: "@kisacathy1900",
  tiktokUrl: "https://www.tiktok.com/@kisacathy1900",
  address: "Plot 14 Entebbe Road, Kampala, Uganda",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.035313936648!2d32.5711!3d0.3136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb8a7b97c0f1%3A0x6b77741d4f23b20!2sEntebbe%20Rd%2C%20Kampala!5e0!3m2!1sen!2sug!4v1700000000000!5m2!1sen!2sug",
};

const DEFAULT_TIKTOKS: TikTokItem[] = [
  {
    id: "tt-1",
    title: "Morning encounter with the Bwindi silverback gorilla family 🦍",
    videoUrl: "https://www.tiktok.com/@kisacathy1900",
    thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    views: "18.4K",
    likes: "2.3K",
  },
  {
    id: "tt-2",
    title: "Cruising the Victoria Nile with massive hippos and Murchison Falls 🌊",
    videoUrl: "https://www.tiktok.com/@kisacathy1900",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    views: "24.9K",
    likes: "3.1K",
  },
  {
    id: "tt-3",
    title: "Tree-climbing lions resting in sycamore fig trees in Queen Elizabeth 🦁",
    videoUrl: "https://www.tiktok.com/@kisacathy1900",
    thumbnail: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
    views: "31.2K",
    likes: "4.8K",
  },
  {
    id: "tt-4",
    title: "Fresh harvest and roasting of Mount Elgon Peaberry Arabica coffee ☕",
    videoUrl: "https://www.tiktok.com/@kisacathy1900",
    thumbnail: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80",
    views: "12.6K",
    likes: "1.9K",
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
    image: d.image,
    overview: d.overview || "",
    highlights: d.highlights || [],
    included: d.included || [],
    excluded: d.excluded || [],
    accommodationLevel: d.accommodation_level || "Luxury",
    isFlagship: Boolean(d.is_flagship),
    likesCount: Number(d.likes_count) || 50,
    itinerary: d.itinerary || [],
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
    reviewsCount: Number(d.reviews_count) || 12,
    image: d.image,
    isSale: Boolean(d.is_sale),
    inStock: d.in_stock !== false,
    flavorNotes: d.flavor_notes || [],
    description: d.description || "",
    likesCount: Number(d.likes_count) || 20,
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
    overallScore: Number(d.overall_score) || 98,
    wildlifeScore: Number(d.wildlife_score) || 100,
    guideScore: Number(d.guide_score) || 100,
    lodgingScore: Number(d.lodging_score) || 96,
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

// LIVE SUPABASE + LOCALSTORAGE SYNC ENGINE (100% Cloudflare Pages Static Compatible)
export const db = {
  async fetchLive() {
    try {
      const [settingsRes, safarisRes, productsRes, tiktoksRes, reviewsRes, ordersRes] = await Promise.allSettled([
        supabase.from("settings").select("*").eq("id", "primary_config").maybeSingle(),
        supabase.from("safaris").select("*").order("created_at", { ascending: false }),
        supabase.from("products").select("*").order("created_at", { ascending: false }),
        supabase.from("tiktoks").select("*").order("created_at", { ascending: false }),
        supabase.from("reviews").select("*").order("created_at", { ascending: false }),
        supabase.from("orders").select("*").order("created_at", { ascending: false }),
      ]);

      if (settingsRes.status === "fulfilled" && !settingsRes.value.error && settingsRes.value.data) {
        const s = settingsRes.value.data;
        const merged = {
          ...DEFAULT_SETTINGS,
          phone: s.phone || DEFAULT_SETTINGS.phone,
          whatsapp: s.whatsapp || DEFAULT_SETTINGS.whatsapp,
          email: s.email || DEFAULT_SETTINGS.email,
          tiktok: s.tiktok || DEFAULT_SETTINGS.tiktok,
          tiktokUrl: s.tiktok_url || DEFAULT_SETTINGS.tiktokUrl,
          address: s.address || DEFAULT_SETTINGS.address,
          mapEmbedUrl: s.map_embed_url || DEFAULT_SETTINGS.mapEmbedUrl,
        };
        localStorage.setItem("sonnenpfad_settings", JSON.stringify(merged));
        if (s.admin_passcode) {
          localStorage.setItem("sonnenpfad_admin_pw", String(s.admin_passcode));
        }
      }

      if (safarisRes.status === "fulfilled" && !safarisRes.value.error && safarisRes.value.data?.length) {
        localStorage.setItem("sonnenpfad_safaris", JSON.stringify(safarisRes.value.data.map(mapSafariRow)));
      }

      if (productsRes.status === "fulfilled" && !productsRes.value.error && productsRes.value.data?.length) {
        localStorage.setItem("sonnenpfad_shop_products", JSON.stringify(productsRes.value.data.map(mapProductRow)));
      }

      if (tiktoksRes.status === "fulfilled" && !tiktoksRes.value.error && tiktoksRes.value.data?.length) {
        const mappedTt = tiktoksRes.value.data.map((d: any) => ({
          id: d.id,
          title: d.title,
          videoUrl: d.video_url,
          thumbnail: d.thumbnail,
          views: d.views || "15.2K",
          likes: d.likes || "1.8K",
        }));
        localStorage.setItem("sonnenpfad_tiktoks", JSON.stringify(mappedTt));
      }

      if (reviewsRes.status === "fulfilled" && !reviewsRes.value.error && reviewsRes.value.data?.length) {
        localStorage.setItem("sonnenpfad_reviews", JSON.stringify(reviewsRes.value.data.map(mapReviewRow)));
      }

      if (ordersRes.status === "fulfilled" && !ordersRes.value.error && ordersRes.value.data?.length) {
        localStorage.setItem("sonnenpfad_coffee_orders", JSON.stringify(ordersRes.value.data.map(mapOrderRow)));
      }
    } catch {
      // Offline / table-not-initialized fallback safely uses localStorage defaults
    }

    hydrateLiveSiteContent();
    return {
      settings: this.getSettings(),
      tiktoks: this.getTiktoks(),
    };
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
      return stored ? JSON.parse(stored) : DEFAULT_SAFARIS;
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

    try {
      await supabase.from("safaris").upsert({
        id: completeItem.id,
        title: completeItem.title,
        duration: completeItem.duration,
        duration_days: completeItem.durationDays,
        destinations: completeItem.destinations,
        destinations_formatted: completeItem.destinationsFormatted,
        price_ugx: completeItem.priceUGX,
        formatted_price_ugx: completeItem.formattedPriceUGX,
        image: completeItem.image,
        overview: completeItem.overview,
        highlights: completeItem.highlights,
        included: completeItem.included,
        excluded: completeItem.excluded,
        accommodation_level: completeItem.accommodationLevel,
        is_flagship: completeItem.isFlagship || false,
        likes_count: completeItem.likesCount || 0,
        itinerary: completeItem.itinerary || [],
      });
    } catch {}

    const existing = await this.getSafaris();
    const deduped = [completeItem, ...existing.filter((s) => s.id !== completeItem.id)];
    await this.saveSafaris(deduped);
    return completeItem;
  },

  async deleteSafari(id: string) {
    try {
      await supabase.from("safaris").delete().eq("id", id);
    } catch {}
    const storedRaw = localStorage.getItem("sonnenpfad_safaris");
    const current: SafariPackage[] = storedRaw ? JSON.parse(storedRaw) : await this.getSafaris();
    const filtered = current.filter((s) => s.id !== id);
    await this.saveSafaris(filtered);
  },

  async getProducts(): Promise<ShopProduct[]> {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        const mapped = data.map(mapProductRow);
        localStorage.setItem("sonnenpfad_shop_products", JSON.stringify(mapped));
        return mapped;
      }
    } catch {}

    try {
      const stored = localStorage.getItem("sonnenpfad_shop_products");
      return stored ? JSON.parse(stored) : DEFAULT_PRODUCTS;
    } catch {
      return DEFAULT_PRODUCTS;
    }
  },

  async saveProducts(items: ShopProduct[]) {
    localStorage.setItem("sonnenpfad_shop_products", JSON.stringify(items));
  },

  async addProduct(item: Omit<ShopProduct, "id"> & { id?: string }) {
    const id = item.id || "prod-" + Date.now();
    const completeItem: ShopProduct = { ...item, id };

    try {
      await supabase.from("products").upsert({
        id: completeItem.id,
        name: completeItem.name,
        origin: completeItem.origin,
        category: completeItem.category,
        price: completeItem.price,
        original_price: completeItem.originalPrice || null,
        weight: completeItem.weight,
        rating: completeItem.rating,
        reviews_count: completeItem.reviewsCount,
        image: completeItem.image,
        is_sale: completeItem.isSale || false,
        in_stock: completeItem.inStock,
        description: completeItem.description,
        flavor_notes: completeItem.flavorNotes || [],
        likes_count: completeItem.likesCount || 0,
      });
    } catch {}

    const existing = await this.getProducts();
    const deduped = [completeItem, ...existing.filter((p) => p.id !== completeItem.id)];
    await this.saveProducts(deduped);
    return completeItem;
  },

  async deleteProduct(id: string) {
    try {
      await supabase.from("products").delete().eq("id", id);
    } catch {}
    const storedRaw = localStorage.getItem("sonnenpfad_shop_products");
    const current: ShopProduct[] = storedRaw ? JSON.parse(storedRaw) : await this.getProducts();
    const filtered = current.filter((p) => p.id !== id);
    await this.saveProducts(filtered);
  },

  // Orders System (Direct Supabase + LocalStorage)
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
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
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

  // Reviews System (Direct Supabase + LocalStorage)
  async getReviews(): Promise<CustomerReview[]> {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        const mapped = data.map(mapReviewRow);
        localStorage.setItem("sonnenpfad_reviews", JSON.stringify(mapped));
        return mapped;
      }
    } catch {}

    try {
      const stored = localStorage.getItem("sonnenpfad_reviews");
      return stored ? JSON.parse(stored) : DEFAULT_REVIEWS;
    } catch {
      return DEFAULT_REVIEWS;
    }
  },

  async addReview(input: {
    author: string;
    country: string;
    tourName: string;
    rating: number;
    content: string;
  }): Promise<CustomerReview> {
    const newRev: CustomerReview = {
      id: "rev-" + Date.now(),
      author: input.author.trim(),
      country: input.country.trim(),
      tourName: input.tourName.trim(),
      rating: Number(input.rating) || 5,
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      overallScore: 98,
      wildlifeScore: 100,
      guideScore: 100,
      lodgingScore: 96,
      content: input.content.trim(),
      status: "Verified Guest",
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
      const existing = JSON.parse(localStorage.getItem("sonnenpfad_reviews") || JSON.stringify(DEFAULT_REVIEWS));
      existing.unshift(newRev);
      localStorage.setItem("sonnenpfad_reviews", JSON.stringify(existing));
    } catch {}

    return newRev;
  },

  saveReviews(items: CustomerReview[]) {
    localStorage.setItem("sonnenpfad_reviews", JSON.stringify(items));
  },

  // Likes System (Direct Supabase `likes` table + LocalStorage)
  async toggleLike(itemId: string): Promise<{ count: number; liked: boolean }> {
    const likesKey = "sonnenpfad_likes_" + itemId;
    const userLikedKey = "sonnenpfad_user_liked_" + itemId;
    const hasLiked = localStorage.getItem(userLikedKey) === "true";
    const nextLiked = !hasLiked;
    let currentCount = Number(localStorage.getItem(likesKey) || 24);

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

  // Comments System (Direct Supabase + LocalStorage)
  async getComments(itemId: string): Promise<CommentItem[]> {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("item_id", itemId)
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        const mapped = data.map((d: any) => ({
          id: d.id,
          itemId: d.item_id,
          author: d.author,
          rating: Number(d.rating) || 5,
          text: d.text,
          itemType: d.item_type || "general",
          date: d.date,
        }));
        localStorage.setItem("sonnenpfad_comments_" + itemId, JSON.stringify(mapped));
        return mapped;
      }
    } catch {}

    const local = localStorage.getItem("sonnenpfad_comments_" + itemId);
    if (local) return JSON.parse(local);
    return DEFAULT_COMMENTS[itemId] || [];
  },

  async getAllComments(): Promise<CommentItem[]> {
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
          combined.push({
            id: d.id,
            itemId: d.item_id,
            author: d.author,
            rating: Number(d.rating) || 5,
            text: d.text,
            itemType: d.item_type || "general",
            date: d.date,
          });
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
              combined.push(c);
            }
          }
        } catch {}
      }
    }

    return combined;
  },

  async addComment(
    itemId: string,
    author: string,
    text: string,
    rating: number = 5,
    itemType: string = "general"
  ): Promise<CommentItem> {
    const created: CommentItem = {
      id: "c-" + Date.now(),
      itemId,
      author: author.trim(),
      rating,
      text: text.trim(),
      itemType,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };

    try {
      await supabase.from("comments").insert({
        id: created.id,
        item_id: created.itemId,
        author: created.author,
        rating: created.rating,
        text: created.text,
        item_type: created.itemType,
        date: created.date,
      });
    } catch {}

    const localKey = "sonnenpfad_comments_" + itemId;
    const localExisting: CommentItem[] = JSON.parse(localStorage.getItem(localKey) || "[]");
    const merged = [created, ...localExisting.filter((c) => c.id !== created.id)];
    localStorage.setItem(localKey, JSON.stringify(merged));
    return created;
  },

  // Settings & Admin Passcode Management
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
        const merged = {
          ...DEFAULT_SETTINGS,
          phone: data.phone || DEFAULT_SETTINGS.phone,
          whatsapp: data.whatsapp || DEFAULT_SETTINGS.whatsapp,
          email: data.email || DEFAULT_SETTINGS.email,
          tiktok: data.tiktok || DEFAULT_SETTINGS.tiktok,
          tiktokUrl: data.tiktok_url || DEFAULT_SETTINGS.tiktokUrl,
          address: data.address || DEFAULT_SETTINGS.address,
          mapEmbedUrl: data.map_embed_url || DEFAULT_SETTINGS.mapEmbedUrl,
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
      const { error } = await supabase.from("settings").upsert({
        id: "primary_config",
        phone: merged.phone,
        whatsapp: merged.whatsapp,
        email: merged.email,
        tiktok: merged.tiktok,
        tiktok_url: merged.tiktokUrl,
        address: merged.address,
        map_embed_url: merged.mapEmbedUrl,
        admin_passcode: activePass,
        updated_at: new Date().toISOString(),
      });
      if (!error) cloudSynced = true;
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
      const { error } = await supabase.from("settings").upsert({
        id: "primary_config",
        phone: curSettings.phone,
        whatsapp: curSettings.whatsapp,
        email: curSettings.email,
        tiktok: curSettings.tiktok,
        tiktok_url: curSettings.tiktokUrl,
        address: curSettings.address,
        map_embed_url: curSettings.mapEmbedUrl,
        admin_passcode: cleanNew,
        updated_at: new Date().toISOString(),
      });
      if (!error) cloudSynced = true;
    } catch {}

    return { ok: true, cloudSynced };
  },

  // TikTok Feed Management
  getTiktoks(): TikTokItem[] {
    try {
      const stored = localStorage.getItem("sonnenpfad_tiktoks");
      if (stored) return JSON.parse(stored);
    } catch {}
    return DEFAULT_TIKTOKS;
  },

  async fetchTiktoks(): Promise<TikTokItem[]> {
    try {
      const { data, error } = await supabase
        .from("tiktoks")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        const mapped: TikTokItem[] = data.map((d: any) => ({
          id: d.id,
          title: d.title,
          videoUrl: d.video_url,
          thumbnail: d.thumbnail,
          views: d.views || "18.4K",
          likes: d.likes || "2.3K",
        }));
        localStorage.setItem("sonnenpfad_tiktoks", JSON.stringify(mapped));
        return mapped;
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
    const reviews = await this.getReviews();
    const activePass = localStorage.getItem("sonnenpfad_admin_pw") || "sonnenpfad2026";

    const errors: string[] = [];

    const { error: settingsErr } = await supabase.from("settings").upsert({
      id: "primary_config",
      phone: settings.phone,
      whatsapp: settings.whatsapp,
      email: settings.email,
      tiktok: settings.tiktok,
      tiktok_url: settings.tiktokUrl,
      address: settings.address,
      map_embed_url: settings.mapEmbedUrl,
      admin_passcode: activePass,
      updated_at: new Date().toISOString(),
    });
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
          likes_count: s.likesCount || 50,
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
          reviews_count: p.reviewsCount || 12,
          image: p.image,
          is_sale: Boolean(p.isSale),
          in_stock: p.inStock !== false,
          description: p.description || "",
          flavor_notes: p.flavorNotes || [],
          likes_count: p.likesCount || 20,
        }))
      );
      if (error) errors.push(`products: ${error.message}`);
    }

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
          overall_score: r.overallScore || 98,
          wildlife_score: r.wildlifeScore || 100,
          guide_score: r.guideScore || 100,
          lodging_score: r.lodgingScore || 96,
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

// IN-PAGE TOAST NOTIFICATION (Replaces browser alert())
export function showToast(message: string, variant: "success" | "error" | "info" = "success") {
  if (typeof document === "undefined") return;
  let container = document.getElementById("sonnenpfadToastContainer");
  if (!container) {
    container = document.createElement("div");
    container.id = "sonnenpfadToastContainer";
    container.className = "fixed bottom-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  const styles =
    variant === "error"
      ? "bg-red-50 border-red-400 text-red-900"
      : variant === "info"
        ? "bg-amber-50 border-amber-400 text-amber-950"
        : "bg-[#073F27] border-[#F4B41A] text-white";

  const icon = variant === "error" ? "⚠️" : variant === "info" ? "ℹ️" : "✅";
  toast.className = `pointer-events-auto flex items-start gap-2.5 p-3.5 rounded-2xl border-2 shadow-2xl text-xs font-semibold transition-all duration-300 ${styles}`;
  toast.innerHTML = `<span class="text-sm shrink-0">${icon}</span><span class="leading-snug">${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(8px)";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// LIVE CONTENT HYDRATION ACROSS PAGES
export function hydrateLiveSiteContent() {
  if (typeof document === "undefined") return;
  const s = db.getSettings();

  const addrEl = document.getElementById("liveAddressDisplay");
  if (addrEl && s.address) addrEl.textContent = s.address;

  const mapIframe = document.getElementById("liveMapIframe") as HTMLIFrameElement | null;
  if (mapIframe && s.mapEmbedUrl) mapIframe.src = s.mapEmbedUrl;

  const ttGrid = document.getElementById("tiktokFeedGrid");
  if (ttGrid) {
    const tiktoks = db.getTiktoks();
    if (tiktoks && tiktoks.length > 0) {
      ttGrid.innerHTML = tiktoks
        .slice(0, 4)
        .map(
          (tt) => `
          <a href="${tt.videoUrl}" target="_blank" rel="noopener noreferrer" class="group bg-white border border-[#CBD5E1] rounded-3xl overflow-hidden shadow-lg hover:border-[#996500] transition-all flex flex-col justify-between">
            <div class="relative aspect-[9/16] w-full overflow-hidden bg-black">
              <img src="${tt.thumbnail}" alt="${tt.title}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-14 h-14 rounded-full bg-[#073F27]/90 border border-[#F4B41A] text-[#F4B41A] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  ▶
                </div>
              </div>
              <div class="absolute top-3 left-3 bg-black/70 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold text-white keep-white">
                👁 ${tt.views} views
              </div>
              <div class="absolute bottom-3 left-3 right-3 text-xs text-white">
                <span class="font-bold text-[#F4B41A] block">${s.tiktok || "@kisacathy1900"}</span>
                <p class="line-clamp-2 text-[11px] text-white/90 keep-white">${tt.title}</p>
              </div>
            </div>
            <div class="p-3 bg-[#F8FAFC] text-center border-t border-[#CBD5E1] text-xs font-bold text-[#996500] group-hover:text-[#073F27] transition-colors">
              Tap to Watch on TikTok →
            </div>
          </a>
        `
        )
        .join("");
    }
  }
}

// UI INITIALIZATION - Universal Daylight Light Theme (Dark Theme Removed)
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

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", () => {
      mobileDrawer.classList.remove("hidden");
    });
  }
  if (mobileClose && mobileDrawer) {
    mobileClose.addEventListener("click", () => {
      mobileDrawer.classList.add("hidden");
    });
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
    });
  }
}

// INTERACTIVE COMMENT & LIKE MODAL GENERATOR
export async function openItemFeedbackModal(itemId: string, itemName: string, itemType: string = "item") {
  let modal = document.getElementById("globalFeedbackModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "globalFeedbackModal";
    modal.className = "fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto";
    modal.innerHTML = `
      <div class="relative w-full max-w-xl bg-white border-2 border-[#CBD5E1] rounded-3xl p-6 sm:p-8 text-[#0F172A] shadow-2xl space-y-5 animate-slide-up my-8">
        <button onclick="document.getElementById('globalFeedbackModal').classList.add('hidden')" class="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] flex items-center justify-center cursor-pointer border border-[#CBD5E1]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>

        <div class="border-b border-[#CBD5E1] pb-3">
          <span class="text-[10px] font-bold uppercase tracking-widest text-[#996500] block">Community Reviews & Comments</span>
          <h2 id="feedbackItemTitle" class="font-editorial text-2xl font-bold text-[#0F172A] mt-0.5">Item Name</h2>
        </div>

        <form id="feedbackForm" class="space-y-3 bg-[#F8FAFC] p-4 rounded-2xl border border-[#CBD5E1]">
          <span class="text-xs font-bold uppercase text-[#996500] block">Post Your Comment & Rating</span>
          <div class="grid grid-cols-2 gap-3">
            <input id="feedbackAuthor" type="text" required placeholder="Your Name" class="bg-white border border-[#94A3B8] rounded-xl px-3 py-2 text-xs text-[#0F172A]" />
            <select id="feedbackRating" class="bg-white border border-[#94A3B8] rounded-xl px-3 py-2 text-xs text-[#0F172A]">
              <option value="5">★★★★★ (5 Stars)</option>
              <option value="4">★★★★ (4 Stars)</option>
              <option value="3">★★★ (3 Stars)</option>
            </select>
          </div>
          <textarea id="feedbackText" required rows="2" placeholder="Write your experience or question..." class="w-full bg-white border border-[#94A3B8] rounded-xl px-3 py-2 text-xs text-[#0F172A] resize-none"></textarea>
          <button type="submit" class="btn-glass-gold text-xs py-2 px-5">Submit Comment</button>
        </form>

        <div class="space-y-3">
          <span class="text-xs font-bold uppercase text-[#475569] tracking-wider block">Live Comments Feed</span>
          <div id="feedbackCommentsList" class="space-y-2.5 max-h-60 overflow-y-auto pr-1"></div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  const titleEl = document.getElementById("feedbackItemTitle");
  if (titleEl) titleEl.textContent = itemName;

  const comments = await db.getComments(itemId);
  const listEl = document.getElementById("feedbackCommentsList");
  if (listEl) {
    listEl.innerHTML =
      comments.length === 0
        ? `<p class="text-xs text-[#64748B] italic">No comments yet. Be the first to review!</p>`
        : comments
            .map(
              (c) => `
      <div class="p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl space-y-1">
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-[#0F172A]">${c.author}</span>
          <span class="text-[#996500] font-bold">${"★".repeat(c.rating || 5)} · <span class="text-[#64748B] text-[10px]">${c.date}</span></span>
        </div>
        <p class="text-xs text-[#334155]">${c.text}</p>
      </div>
    `
            )
            .join("");
  }

  const form = document.getElementById("feedbackForm");
  if (form) {
    form.onsubmit = async (e) => {
      e.preventDefault();
      const author = (document.getElementById("feedbackAuthor") as HTMLInputElement).value;
      const rating = Number((document.getElementById("feedbackRating") as HTMLSelectElement).value);
      const text = (document.getElementById("feedbackText") as HTMLTextAreaElement).value;

      await db.addComment(itemId, author, text, rating, itemType);
      (document.getElementById("feedbackText") as HTMLTextAreaElement).value = "";
      showToast("Your comment has been published!");
      openItemFeedbackModal(itemId, itemName, itemType);
    };
  }

  modal.classList.remove("hidden");
}

export async function handleLikeClick(btnEl: HTMLElement, itemId: string) {
  const result = await db.toggleLike(itemId);
  const countEl = btnEl.querySelector(".like-count");
  if (countEl) {
    countEl.textContent = String(result.count);
  }
  if (result.liked) {
    btnEl.classList.add("text-rose-600", "border-rose-400");
    btnEl.classList.remove("text-slate-700");
  } else {
    btnEl.classList.remove("text-rose-600", "border-rose-400");
    btnEl.classList.add("text-slate-700");
  }
}

// Attach globally to window for standalone HTML pages
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
  (window as any).handleCardLike = (itemId: string, btnEl: HTMLElement) => handleLikeClick(btnEl, itemId);
  (window as any).formatUGX = formatUGX;
  (window as any).showToast = showToast;
  (window as any).hydrateLiveSiteContent = hydrateLiveSiteContent;
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNavigation();
    hydrateLiveSiteContent();
    db.fetchLive();
  });
}

