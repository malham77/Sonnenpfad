/**
 * Sonnenpfad Safaris Uganda Ltd - Global Engine & Database System
 * Powers all HTML pages: index.html, safaris.html, east-africa.html,
 * destinations.html, shop.html, gallery.html, reviews.html, about.html,
 * contact.html, and admin.html.
 */

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
  itinerary: {
    day: number;
    title: string;
    description: string;
    accommodation?: string;
  }[];
}

export interface CoffeeProduct {
  id: string;
  name: string;
  origin: string;
  category: "Single Origin" | "Espresso Roast" | "Coffee Blends" | "Accessories" | "Skincare";
  roastLevel: "Light" | "Medium" | "Medium-Dark" | "Dark" | "Espresso" | "Artisanal Accessory" | "Botanical";
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
  grindPreference: string;
  notes?: string;
  status: "Pending" | "Confirmed" | "Dispatched" | "Delivered";
}

export interface MediaItem {
  id: string;
  type: "image" | "video";
  title: string;
  category: "Wildlife" | "Gorillas" | "Savannah" | "Landscape" | "Community";
  location: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  caption: string;
  videoDuration?: string;
}

export const formatUGX = (amount: number): string => {
  return "UGX " + amount.toLocaleString("en-US");
};

// INITIAL SEED DATA
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
    itinerary: [
      {
        day: 1,
        title: "Entebbe / Kampala to Bwindi Forest",
        description:
          "Depart Entebbe early morning in your private 4x4 Land Cruiser. Stop at the Equator for photography, then journey through rolling terraced hills of southwestern Uganda to your forest lodge.",
        accommodation: "Buhoma Lodge / Sanctuary Gorilla Forest Camp"
      },
      {
        day: 2,
        title: "The Gorilla Trekking Encounter",
        description:
          "After an early breakfast and briefing at the ranger station, venture into the ancient impenetrable canopy. Once located, spend one unforgettable hour observing the silverback, females, and playful infants.",
        accommodation: "Buhoma Lodge"
      },
      {
        day: 3,
        title: "Scenic Return to Entebbe",
        description:
          "Enjoy a sunrise breakfast over the misty canopy before beginning the return drive, arriving in Entebbe in time for your evening flight."
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
    itinerary: [
      { day: 1, title: "Arrival in Entebbe, Uganda", description: "VIP airport reception and transfer to luxury lakeside hotel." },
      { day: 2, title: "Flight to Kibale Primate Capital", description: "Afternoon chimpanzee habituation and Bigodi swamp walk." },
      { day: 3, title: "Queen Elizabeth National Park", description: "Kazinga Channel boat cruise teeming with hippos and elephants." },
      { day: 4, title: "Ishasha Tree-Climbing Lions to Bwindi", description: "Search for fig-tree lions and proceed to misty Bwindi." },
      { day: 5, title: "Mountain Gorilla Trekking", description: "Breathtaking trek to spend one hour with the mountain gorillas." },
      { day: 6, title: "Bush Flight to Masai Mara, Kenya", description: "Fly across the border into the heart of the Great Savannah." },
      { day: 7, title: "Masai Mara Big Cat & Migration Safari", description: "Follow cheetah coalitions and river crossing spectacles." },
      { day: 8, title: "Masai Mara to Serengeti National Park", description: "Cross into Tanzania's endless plains." },
      { day: 9, title: "Serengeti Full-Day Game Drives", description: "Witness predator-prey dynamics on the boundless plains." },
      { day: 10, title: "Ngorongoro Crater Caldera", description: "Descend 600m to encounter black rhinos and flamingo lakes." }
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
    itinerary: [
      { day: 1, title: "Drive to Kibale Forest", description: "Scenic transit past tea plantations into Kibale." },
      { day: 2, title: "Chimpanzee Tracking & Transfer to Queen Elizabeth", description: "Track chimps in the morning; afternoon scenic drive to Queen Elizabeth." },
      { day: 3, title: "Kasenyi Game Drive & Kazinga Channel Cruise", description: "Morning lions, elephants, kobs; afternoon boat safari." },
      { day: 4, title: "Ishasha Tree Lions to Bwindi", description: "Track famous tree-climbing lions in southern Queen Elizabeth." },
      { day: 5, title: "Mountain Gorilla Trekking in Bwindi", description: "Awe-inspiring face-to-face encounter with gorillas." },
      { day: 6, title: "Lake Bunyonyi Relaxation", description: "Unwind at Africa's second deepest lake with dugout canoe ride." },
      { day: 7, title: "Return to Entebbe", description: "Scenic drive back with stop at the Equator." }
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
    included: ["All national park and conservation entry fees", "Customized 4x4 safari vehicle with binoculars and cooler", "All luxury tented camp accommodations and full board"],
    excluded: ["Hot air balloon flight upgrade ($450)", "Visas and personal insurance"],
    accommodationLevel: "Luxury",
    itinerary: [
      { day: 1, title: "Arrive Nairobi, Kenya", description: "Transfer to boutique colonial hotel." },
      { day: 2, title: "Amboseli National Park", description: "Elephants beneath the snows of Mount Kilimanjaro." },
      { day: 3, title: "Amboseli to Masai Mara", description: "Scenic flight into the world's greatest predator habitat." },
      { day: 4, title: "Masai Mara Full Day Safari", description: "Wildebeest, lions, leopards, and cheetah hunts." },
      { day: 5, title: "Cross Border into Serengeti", description: "Transit to central Serengeti's Seronera Valley." }
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
    itinerary: [
      { day: 1, title: "Ziwa Rhino Tracking & Drive to Murchison", description: "Walk with rhinos at Ziwa Sanctuary, then drive north." },
      { day: 2, title: "Savannah Game Drive & Nile Falls Cruise", description: "Lions, giraffes, elephants; afternoon boat safari." },
      { day: 3, title: "Top of the Falls & Lake Albert Delta", description: "Explore the Nile gorge and look for the elusive Shoebill." }
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
    itinerary: [
      { day: 1, title: "Kigali to Volcanoes National Park", description: "Kigali Genocide Memorial visit and scenic drive into the Virungas." },
      { day: 2, title: "Golden Monkey Tracking in Volcanoes", description: "Encounter playful endemic golden monkeys in bamboo forests." },
      { day: 3, title: "Cross Cyanika Border to Bwindi Forest", description: "Cross into Uganda's rugged mountain gorilla territory." }
    ]
  }
];

const DEFAULT_COFFEE: CoffeeProduct[] = [
  {
    id: "cof-1",
    name: "Mount Elgon Peaberry Reserve",
    origin: "Mount Elgon Slopes, Eastern Uganda",
    category: "Single Origin",
    roastLevel: "Medium",
    price: 65000,
    originalPrice: 85000,
    weight: "250g Whole Bean",
    rating: 5,
    reviewsCount: 38,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    inStock: true,
    flavorNotes: ["Wild Bergamot", "Dark Cocoa", "Candied Orange"],
    description: "Hand-picked peaberry coffee beans shade-grown on volcanic slopes at 2,000m altitude. Highly prized for intense sweetness and silky crema."
  },
  {
    id: "cof-2",
    name: "Rwenzori Glacier Mist Arabica",
    origin: "Mountains of the Moon, Western Uganda",
    category: "Single Origin",
    roastLevel: "Medium-Dark",
    price: 75000,
    originalPrice: 90000,
    weight: "250g Whole Bean",
    rating: 5,
    reviewsCount: 29,
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80",
    isSale: false,
    inStock: true,
    flavorNotes: ["Black Currant", "Roasted Almond", "Brown Sugar"],
    description: "Grown along the glacial runoff slopes of the Rwenzori Mountains. Naturally washed, crisp acidity and lingering dark chocolate finish."
  },
  {
    id: "cof-3",
    name: "Sonnenpfad Savannah Dawn Espresso",
    origin: "Uganda & Tanzania Rift Valley Blend",
    category: "Espresso Roast",
    roastLevel: "Espresso",
    price: 80000,
    weight: "500g Whole Bean",
    rating: 5,
    reviewsCount: 42,
    image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    inStock: true,
    flavorNotes: ["Caramel Molasses", "Hazelnut", "Spiced Nutmeg"],
    description: "Our signature safari camp espresso blend. Full-bodied, thick crema, developed specifically to energize your early morning dawn game drives."
  },
  {
    id: "cof-4",
    name: "Kigezi Gorilla Highlands Dark Roast",
    origin: "Bwindi & Kisoro Highlands, Uganda",
    category: "Single Origin",
    roastLevel: "Dark",
    price: 70000,
    originalPrice: 85000,
    weight: "250g Ground",
    rating: 5,
    reviewsCount: 19,
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80",
    isSale: false,
    inStock: true,
    flavorNotes: ["Smoky Oak", "Dark Molasses", "Clove"],
    description: "Cultivated by local communities directly bordering Bwindi Forest. A portion of every bag funds community gorilla conservation corridors."
  },
  {
    id: "cof-5",
    name: "Kilimanjaro Summit Bourbon Arabica",
    origin: "Mount Kilimanjaro Slopes, Tanzania",
    category: "Single Origin",
    roastLevel: "Medium",
    price: 85000,
    weight: "250g Whole Bean",
    rating: 5,
    reviewsCount: 31,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
    isSale: true,
    inStock: true,
    flavorNotes: ["Red Apple", "Honey Blossom", "Milk Chocolate"],
    description: "Pure heirloom bourbon variety grown on the fertile volcanic southern slopes of Kilimanjaro. Delicate floral notes and smooth finish."
  },
  {
    id: "cof-6",
    name: "Handcrafted Olive Wood Coffee Tamper",
    origin: "East African Artisan Carvers",
    category: "Accessories",
    roastLevel: "Artisanal Accessory",
    price: 130000,
    originalPrice: 160000,
    weight: "Solid Olive Wood & Stainless Steel (58mm)",
    rating: 5,
    reviewsCount: 14,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
    isSale: false,
    inStock: true,
    flavorNotes: ["58mm Precision Base", "Ergonomic Grip"],
    description: "Carved from salvaged wild olive wood with surgical grade stainless steel base. Hand-finished with beeswax by master artisans in Kampala."
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
    content:
      "Trekking the mountain gorillas in Bwindi with Sonnenpfad Safaris was the single most transcendent experience of our lives. Standing four meters from the silverback was humbling beyond words. Our driver-guide Alex navigated every terrain with unmatched poise and safety. Everything exceeded luxury expectations.",
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
    content:
      "A masterclass in safari architecture. From tracking chimpanzees in Kibale to witnessing a river crossing of over 10,000 wildebeests in the Serengeti, Sonnenpfad Safaris orchestrated regional flights, park permissions, and five-star bush camps with military precision. Highly recommended.",
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
    content:
      "Sonnenpfad Safaris treats you like royalty from start to finish. Watching the Nile surge through Murchison Falls while sipping fresh Mount Elgon coffee from their roastery was unforgettable. The Land Cruiser was immaculate and the kids loved spotting tree lions and giraffes!",
    status: "Verified Guest"
  }
];

const DEFAULT_GALLERY: MediaItem[] = [
  {
    id: "gal-1",
    type: "video",
    title: "Mountain Gorilla Family Encounter",
    category: "Gorillas",
    location: "Bwindi Impenetrable National Park, Uganda",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    caption: "Intimate moments with the habituated Rushegura gorilla family deep in the Bwindi mist.",
    videoDuration: "1:45"
  },
  {
    id: "gal-2",
    type: "video",
    title: "Serengeti & Masai Mara Wildebeest Crossing",
    category: "Savannah",
    location: "Serengeti-Mara Ecosystem, East Africa",
    mediaUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80",
    caption: "Thundering hooves and dramatic Mara River crossing action during the Great Migration.",
    videoDuration: "2:10"
  },
  {
    id: "gal-3",
    type: "image",
    title: "Silverback Gazing into the Canopy",
    category: "Gorillas",
    location: "Bwindi Impenetrable, Uganda",
    mediaUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    caption: "A magnificent 200kg silverback pausing in the dense bamboo thicket."
  },
  {
    id: "gal-4",
    type: "image",
    title: "Tree-Climbing Lions of Ishasha",
    category: "Wildlife",
    location: "Queen Elizabeth National Park, Uganda",
    mediaUrl: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
    caption: "Prides resting high in sycamore fig branches escaping the afternoon heat."
  },
  {
    id: "gal-5",
    type: "image",
    title: "Sunrise over Mount Elgon Coffee Slopes",
    category: "Landscape",
    location: "Mount Elgon, Eastern Uganda",
    mediaUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=80",
    caption: "Volcanic slopes where Sonnenpfad specialty Arabica beans are hand-picked."
  },
  {
    id: "gal-6",
    type: "image",
    title: "Thunderous Victoria Nile at Murchison Falls",
    category: "Landscape",
    location: "Murchison Falls National Park, Uganda",
    mediaUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    caption: "The entire Victoria Nile channeled through a 7-meter rock cleft."
  }
];

const DEFAULT_SLIDES = [
  {
    id: "slide-1",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=2000&q=85",
    eyebrow: "Wanderers Across East Africa",
    scriptTitle: "adventurous",
    mainTitle: "Your Journey Begins",
    subtitle: "A journey of a thousand miles starts with a single step. Import full custom itineraries across Uganda, Kenya, Tanzania, and Rwanda with Sonnenpfad Safaris.",
    badge: "East Africa Flagship"
  },
  {
    id: "slide-2",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=2000&q=85",
    eyebrow: "Primeval Primate Sanctuaries",
    scriptTitle: "unforgettable",
    mainTitle: "Face to Face With Mountain Gorillas",
    subtitle: "Deep in the mist of Bwindi Impenetrable Forest and Volcanoes National Park, share quiet moments with humanity's closest wild cousins.",
    badge: "Uganda & Rwanda"
  },
  {
    id: "slide-3",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2000&q=85",
    eyebrow: "The Great Migration Circuit",
    scriptTitle: "breathtaking",
    mainTitle: "Boundless Savannahs of East Africa",
    subtitle: "Witness over two million wildebeest and zebras crossing the Mara-Serengeti ecosystem, stalked by big cats and ancient Nile crocodiles.",
    badge: "Serengeti & Masai Mara"
  }
];

// CLIENT DATABASE ENGINE (LocalStorage Persistence)
export const db = {
  getSafaris(): SafariPackage[] {
    try {
      const stored = localStorage.getItem("sonnenpfad_safaris");
      return stored ? JSON.parse(stored) : DEFAULT_SAFARIS;
    } catch {
      return DEFAULT_SAFARIS;
    }
  },
  saveSafaris(items: SafariPackage[]) {
    localStorage.setItem("sonnenpfad_safaris", JSON.stringify(items));
  },
  getCoffee(): CoffeeProduct[] {
    try {
      const stored = localStorage.getItem("sonnenpfad_coffee_products");
      return stored ? JSON.parse(stored) : DEFAULT_COFFEE;
    } catch {
      return DEFAULT_COFFEE;
    }
  },
  saveCoffee(items: CoffeeProduct[]) {
    localStorage.setItem("sonnenpfad_coffee_products", JSON.stringify(items));
  },
  getReviews(): CustomerReview[] {
    try {
      const stored = localStorage.getItem("sonnenpfad_reviews");
      return stored ? JSON.parse(stored) : DEFAULT_REVIEWS;
    } catch {
      return DEFAULT_REVIEWS;
    }
  },
  saveReviews(items: CustomerReview[]) {
    localStorage.setItem("sonnenpfad_reviews", JSON.stringify(items));
  },
  addReview(newReview: Omit<CustomerReview, "id" | "date" | "status">) {
    const reviews = this.getReviews();
    const created: CustomerReview = {
      ...newReview,
      id: "rev-" + Date.now(),
      date: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      status: "Verified Guest"
    };
    reviews.unshift(created);
    this.saveReviews(reviews);
    return created;
  },
  getOrders(): CoffeeOrder[] {
    try {
      const stored = localStorage.getItem("sonnenpfad_coffee_orders");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },
  saveOrders(orders: CoffeeOrder[]) {
    localStorage.setItem("sonnenpfad_coffee_orders", JSON.stringify(orders));
  },
  addOrder(order: Omit<CoffeeOrder, "id" | "date" | "status">) {
    const orders = this.getOrders();
    const created: CoffeeOrder = {
      ...order,
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toISOString().slice(0, 10),
      status: "Pending"
    };
    orders.unshift(created);
    this.saveOrders(orders);
    return created;
  },
  getGallery(): MediaItem[] {
    try {
      const stored = localStorage.getItem("sonnenpfad_gallery");
      return stored ? JSON.parse(stored) : DEFAULT_GALLERY;
    } catch {
      return DEFAULT_GALLERY;
    }
  },
  saveGallery(items: MediaItem[]) {
    localStorage.setItem("sonnenpfad_gallery", JSON.stringify(items));
  },
  getSlides() {
    try {
      const stored = localStorage.getItem("sonnenpfad_slides");
      return stored ? JSON.parse(stored) : DEFAULT_SLIDES;
    } catch {
      return DEFAULT_SLIDES;
    }
  },
  saveSlides(slides: any[]) {
    localStorage.setItem("sonnenpfad_slides", JSON.stringify(slides));
  },
  getAdminPassword(): string {
    return localStorage.getItem("sonnenpfad_admin_pw") || "sonnenpfad2026";
  },
  setAdminPassword(pw: string) {
    localStorage.setItem("sonnenpfad_admin_pw", pw);
  },
  exportFullBackup(): string {
    return JSON.stringify(
      {
        safaris: this.getSafaris(),
        coffee: this.getCoffee(),
        reviews: this.getReviews(),
        orders: this.getOrders(),
        gallery: this.getGallery(),
        slides: this.getSlides(),
        exportedAt: new Date().toISOString()
      },
      null,
      2
    );
  },
  importFullBackup(jsonText: string): boolean {
    try {
      const data = JSON.parse(jsonText);
      if (data.safaris) this.saveSafaris(data.safaris);
      if (data.coffee) this.saveCoffee(data.coffee);
      if (data.reviews) this.saveReviews(data.reviews);
      if (data.orders) this.saveOrders(data.orders);
      if (data.gallery) this.saveGallery(data.gallery);
      if (data.slides) this.saveSlides(data.slides);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
};

// GLOBAL THEME CONTROLLER
export function initTheme() {
  const saved = localStorage.getItem("sonnenpfad_theme") || "dark";
  const html = document.documentElement;
  if (saved === "light") {
    html.classList.add("light");
  } else {
    html.classList.remove("light");
  }

  // Update theme toggle buttons
  document.querySelectorAll(".theme-toggle-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const isLight = html.classList.toggle("light");
      localStorage.setItem("sonnenpfad_theme", isLight ? "light" : "dark");
    });
  });
}

// GLOBAL NAVIGATION CONTROLLER
export function initNavigation() {
  // Mobile 3-Bars Menu Toggle
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

  // Search Overlay
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

  // Close modals on escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-container").forEach((m) => m.classList.add("hidden"));
    }
  });
}

// COFFEE ORDER & WHATSAPP DISPATCHER
export function openCoffeeOrderModal(product: CoffeeProduct) {
  const modal = document.getElementById("coffeeOrderModal");
  if (!modal) return;

  const titleEl = document.getElementById("orderModalProductTitle");
  const priceEl = document.getElementById("orderModalProductPrice");
  const imgEl = document.getElementById("orderModalProductImg") as HTMLImageElement;
  const productIdInput = document.getElementById("orderModalProductId") as HTMLInputElement;

  if (titleEl) titleEl.textContent = product.name;
  if (priceEl) priceEl.textContent = formatUGX(product.price);
  if (imgEl) imgEl.src = product.image;
  if (productIdInput) productIdInput.value = product.id;

  modal.classList.remove("hidden");
}

// INQUIRY / TOUR MODAL DISPATCHER
export function openTourModal(safari: SafariPackage) {
  const modal = document.getElementById("tourDossierModal");
  if (!modal) return;

  const titleEl = document.getElementById("tourModalTitle");
  const destEl = document.getElementById("tourModalDest");
  const priceEl = document.getElementById("tourModalPrice");
  const descEl = document.getElementById("tourModalOverview");
  const imgEl = document.getElementById("tourModalImg") as HTMLImageElement;

  if (titleEl) titleEl.textContent = safari.title;
  if (destEl) destEl.textContent = safari.destinationsFormatted;
  if (priceEl) priceEl.textContent = safari.formattedPriceUGX;
  if (descEl) descEl.textContent = safari.overview;
  if (imgEl) imgEl.src = safari.image;

  modal.classList.remove("hidden");
}

// AUTO INITIALIZE ON DOM READY
if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initNavigation();
  });
}
