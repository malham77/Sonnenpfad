export interface SafariDay {
  day: number;
  title: string;
  description: string;
  accommodation?: string;
  meals?: string;
}

export interface SafariPackage {
  id: string;
  slug: string;
  title: string;
  duration: string;
  durationDays: number;
  destinations: string[];
  destinationsFormatted: string;
  tagline: string;
  overview: string;
  image: string;
  highlights: string[];
  itinerary: SafariDay[];
  accommodationLevel: string;
  priceUGX: number;
  formattedPriceUGX: string;
  included: string[];
  excluded: string[];
  importantNotes: string[];
  faqs: { question: string; answer: string }[];
  isFlagship?: boolean;
}

export const SAFARI_PACKAGES: SafariPackage[] = [
  {
    id: "pkg-1",
    slug: "3-day-gorilla-encounter",
    title: "3 Days — Mountain Gorilla Encounter",
    duration: "3 Days / 2 Nights",
    durationDays: 3,
    destinations: ["Bwindi Impenetrable National Park, Uganda"],
    destinationsFormatted: "Bwindi Impenetrable Forest, Uganda",
    tagline: "Enter one of East Africa's most ancient rainforests for an intimate encounter with wild mountain gorillas.",
    overview: "Deep in southwestern Uganda lies Bwindi Impenetrable National Park, an ancient rainforest sheltering nearly half of the world's surviving mountain gorillas. This 3-day signature safari is crafted for travellers seeking an unforgettable, deeply moving wildlife experience in the shortest possible timeframe without compromising on comfort and authenticity.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Scenic journey through southwestern Uganda's rolling terraced Kigezi hills",
      "Guided mountain gorilla trekking with experienced Uganda Wildlife Authority rangers",
      "Immersion in ancient mist-covered Bwindi rainforest",
      "Local community & Batwa cultural heritage encounter",
      "World-class East African wildlife photography opportunities"
    ],
    accommodationLevel: "Luxury & Boutique Rainforest Lodges (Sanctuary Gorilla Forest Camp / Mahogany Springs)",
    priceUGX: 5200000,
    formattedPriceUGX: "UGX 5,200,000",
    itinerary: [
      {
        day: 1,
        title: "Journey to Bwindi Impenetrable Forest",
        description: "Meet your Sonnenpfad professional safari guide in Entebbe or Kampala and begin your journey towards southwestern Uganda. Travel through Uganda's lush countryside, stopping at the Equator for photography and lunch in Mbarara, before ascending through the terraced Kigezi highlands to Bwindi. Check into your lodge, relax to the sounds of the jungle, and prepare for tomorrow's encounter.",
        accommodation: "Luxury Rainforest Safari Lodge",
        meals: "Lunch & Dinner included"
      },
      {
        day: 2,
        title: "Mountain Gorilla Trekking in Bwindi",
        description: "After an early breakfast, proceed to the park headquarters for a comprehensive briefing by the Uganda Wildlife Authority rangers. Accompanied by experienced guides and trackers, enter the ancient rainforest in search of a habituated gorilla family. Trekking can take between 2 to 6 hours through dense vegetation. Upon locating the family, spend one awe-inspiring hour observing them feed, play, and interact. Return to your lodge to rest and enjoy an evening cultural fireside discussion.",
        accommodation: "Luxury Rainforest Safari Lodge",
        meals: "Breakfast, Packed Lunch & Dinner included"
      },
      {
        day: 3,
        title: "Scenic Return Journey",
        description: "Awake to the mist rising above the rainforest canopy. Enjoy a leisurely breakfast overlooking the valley before beginning your scenic return journey towards Entebbe or Kampala, carrying with you memories of one of Africa's most remarkable wildlife experiences.",
        accommodation: "Departure",
        meals: "Breakfast & Lunch included"
      }
    ],
    included: [
      "Official Mountain Gorilla Trekking Permit included",
      "Dedicated 4x4 Safari Land Cruiser with pop-up roof for photography",
      "Services of an experienced English/German-speaking Sonnenpfad safari guide",
      "2 nights luxury lodge accommodation on full board basis",
      "All park entry fees, ranger fees, and local community visits",
      "Complimentary mineral water and refreshments in the vehicle",
      "Emergency medical evacuation cover across East Africa"
    ],
    excluded: [
      "International flights and visa fees",
      "Personal travel and medical insurance",
      "Gratuities for rangers, guides, and lodge staff",
      "Premium alcoholic beverages and personal expenses",
      "Optional porter fees during gorilla trekking"
    ],
    importantNotes: [
      "Gorilla trekking requires moderate physical fitness as trails traverse steep and uneven forest terrain.",
      "Minimum age for gorilla trekking in Uganda and East Africa is 15 years old.",
      "Bring sturdy waterproof hiking boots, garden gloves, long trousers, and lightweight rain gear."
    ],
    faqs: [
      {
        question: "How difficult is gorilla trekking?",
        answer: "The trek can take from 2 to 6 hours depending on where the gorilla family spent the night. Experienced trackers guide you at a comfortable pace with regular rest stops."
      },
      {
        question: "How close do we get to the mountain gorillas?",
        answer: "Park regulations require maintaining a 7-metre (23-foot) distance to protect the primates from human pathogens, though gorillas often wander closer on their own."
      }
    ]
  },
  {
    id: "pkg-2",
    slug: "5-day-gorillas-savannah",
    title: "5 Days — Gorillas & Queen Elizabeth Savannah",
    duration: "5 Days / 4 Nights",
    durationDays: 5,
    destinations: ["Bwindi Impenetrable National Park", "Queen Elizabeth National Park"],
    destinationsFormatted: "Bwindi Gorillas + Queen Elizabeth Savannah",
    tagline: "A beautiful combination of East Africa's ancient rainforest and open savannah big game.",
    overview: "This expedition pairs two of East Africa's most celebrated ecosystems: the savannah plains and shimmering waterways of Queen Elizabeth National Park with the primeval misty slopes of Bwindi. Encounter tree-climbing lions, majestic herds of elephants, pods of hippos along the Kazinga Channel, and culminate with mountain gorillas.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Mountain gorilla trekking in the Bwindi rainforest",
      "Sunrise savannah game drives across Kasenyi plains",
      "Private boat cruise on the famous Kazinga Channel",
      "Searching for tree-climbing lions in the southern Ishasha sector",
      "Massive elephant herds, buffalo, leopards, and over 600 bird species"
    ],
    accommodationLevel: "Premium Wilderness Lodges (Mweya Safari Lodge / Ishasha Wilderness Camp / Bwindi Lodge)",
    priceUGX: 7800000,
    formattedPriceUGX: "UGX 7,800,000",
    itinerary: [
      {
        day: 1,
        title: "Journey to Queen Elizabeth National Park",
        description: "Depart Entebbe/Kampala heading west through lush green tea plantations and scenic countryside, arriving at Queen Elizabeth National Park in time for sunset drinks overlooking the Great Rift Valley.",
        accommodation: "Luxury Safari Lodge overlooking the Kazinga Channel",
        meals: "Lunch & Dinner"
      },
      {
        day: 2,
        title: "Kasenyi Game Drive & Kazinga Channel Boat Cruise",
        description: "Early morning game drive along the Kasenyi plains in search of lions, leopards, Uganda kobs, and savannah elephants. In the afternoon, embark on an exclusive 2-hour boat cruise along the Kazinga Channel, witnessing one of the world's highest concentrations of hippos and riverbank wildlife.",
        accommodation: "Luxury Safari Lodge",
        meals: "Breakfast, Lunch & Dinner"
      },
      {
        day: 3,
        title: "Ishasha Tree-Climbing Lions to Bwindi Rainforest",
        description: "Travel through the southern Ishasha sector, famed for lions that drape themselves in the branches of fig trees to escape the heat and ground insects. Continue south into the terraced hills of Bwindi.",
        accommodation: "Bwindi Rainforest Luxury Lodge",
        meals: "Breakfast, Lunch & Dinner"
      },
      {
        day: 4,
        title: "Mountain Gorilla Trekking",
        description: "The highlight of your journey: embark on a guided trek into Bwindi's dense canopy to spend one peaceful hour with a wild mountain gorilla family. Afternoon at leisure or visit the local village.",
        accommodation: "Bwindi Rainforest Luxury Lodge",
        meals: "Breakfast, Packed Lunch & Dinner"
      },
      {
        day: 5,
        title: "Return Journey to Entebbe / Kampala",
        description: "Enjoy breakfast overlooking the rainforest canopy before driving back towards Entebbe, with an Equator crossing stop and airport transfer for evening departures.",
        accommodation: "Departure",
        meals: "Breakfast & Lunch"
      }
    ],
    included: [
      "Gorilla Trekking Permit included",
      "Kazinga Channel boat cruise",
      "All national park entries & Ishasha game tracking fees",
      "Custom 4WD Safari Land Cruiser with pop-up roof",
      "Full board lodge accommodation",
      "Dedicated professional safari guide"
    ],
    excluded: [
      "International flights and travel insurance",
      "Tips and lodge gratuities",
      "Drinks outside specified meals"
    ],
    importantNotes: [
      "Ideal safari for travellers wanting both classic big game savannah and rare primate encounters."
    ],
    faqs: [
      {
        question: "Can we see tree-climbing lions?",
        answer: "Ishasha is one of only two places in Africa where lions regularly climb trees. Sightings are frequent, especially during the warmer hours of late morning."
      }
    ]
  },
  {
    id: "pkg-3",
    slug: "7-day-primates-wildlife",
    title: "7 Days — Primates & East African Wildlife",
    duration: "7 Days / 6 Nights",
    durationDays: 7,
    destinations: ["Kibale National Park", "Queen Elizabeth National Park", "Bwindi Impenetrable National Park"],
    destinationsFormatted: "Kibale Chimps + Queen Elizabeth + Bwindi Gorillas",
    tagline: "Three legendary East African wilderness ecosystems. One unforgettable journey.",
    overview: "Begin among the dense tropical forests of Kibale, the primate capital of the world, before continuing into Queen Elizabeth National Park for classic African wildlife experiences. Finish deep inside the misty heights of Bwindi with Uganda's mountain gorillas.",
    image: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Chimpanzee habituation & tracking in Kibale Forest",
      "Bigodi wetland birding sanctuary & community walk",
      "Savannah predators, elephants, and Kazinga Channel boat safari",
      "Ishasha tree-climbing lions exploration",
      "Mountain gorilla trekking in Bwindi Impenetrable Forest"
    ],
    accommodationLevel: "Boutique Eco-Lodges & Luxury Wilderness Retreats",
    priceUGX: 9900000,
    formattedPriceUGX: "UGX 9,900,000",
    itinerary: [
      { day: 1, title: "Kampala/Entebbe to Kibale Forest", description: "Drive west through lush tea estates and the foothills of the Rwenzori mountains to Kibale National Park.", meals: "Lunch & Dinner" },
      { day: 2, title: "Chimpanzee Tracking & Bigodi Wetland", description: "Trek through Kibale's towering jungle canopy to spend an exhilarating morning observing wild chimpanzee troops.", meals: "Breakfast, Lunch & Dinner" },
      { day: 3, title: "Kibale to Queen Elizabeth National Park", description: "Scenic transfer passing volcanic crater lakes and crossing the Equator into Queen Elizabeth National Park.", meals: "Breakfast, Lunch & Dinner" },
      { day: 4, title: "Savannah Game Drive & Kazinga Channel Cruise", description: "Sunrise safari drive tracking lions and leopards, followed by an afternoon water safari on Kazinga Channel.", meals: "Breakfast, Lunch & Dinner" },
      { day: 5, title: "Queen Elizabeth through Ishasha to Bwindi", description: "Search for tree-climbing lions in Ishasha before climbing into the cool highlands of Bwindi.", meals: "Breakfast, Lunch & Dinner" },
      { day: 6, title: "Mountain Gorilla Trekking in Bwindi", description: "Immerse yourself in the primeval rainforest for your life-changing gorilla encounter.", meals: "Breakfast, Packed Lunch & Dinner" },
      { day: 7, title: "Return Journey to Entebbe", description: "Scenic return drive to Entebbe with farewell lunch and departure transfer.", meals: "Breakfast & Lunch" }
    ],
    included: [
      "Official Gorilla Trekking Permit",
      "Chimpanzee Tracking Permit in Kibale",
      "All park entries & boat cruises",
      "Private 4WD Land Cruiser and professional guide",
      "6 nights boutique lodge accommodation on full board"
    ],
    excluded: ["International flights", "Visas", "Gratuities", "Personal items"],
    importantNotes: ["Uganda is home to more than 1,500 wild chimpanzees in Kibale alone."],
    faqs: [
      {
        question: "How do chimpanzee and gorilla trekking compare?",
        answer: "Chimpanzees are faster and spend more time high in the tree canopy calling to one another, while gorillas spend more time calmly on the forest floor feeding and interacting."
      }
    ]
  },
  {
    id: "pkg-4",
    slug: "8-day-wildlife-primates",
    title: "8 Days — East Africa Wildlife & Primates Circuit",
    duration: "8 Days / 7 Nights",
    durationDays: 8,
    destinations: ["Kibale", "Queen Elizabeth", "Bwindi", "Lake Mburo National Park"],
    destinationsFormatted: "Kibale + Queen Elizabeth + Bwindi + Lake Mburo",
    tagline: "Designed for travellers who want to experience East Africa's remarkable biodiversity within one journey.",
    overview: "Experience primates in tropical forest, classic savannah wildlife, mountain gorillas, and the peaceful acacia environment of Lake Mburo. This 8-day itinerary introduces you to East Africa's premier ecosystems with ample time for walking safaris and serene boat journeys.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Chimpanzees in Kibale's primal rainforest canopy",
      "Classic African big game across Queen Elizabeth savannah",
      "Kazinga Channel boat cruise with elephants and hippos",
      "Bwindi mountain gorilla trekking encounter",
      "Guided walking safari among zebras and impalas in Lake Mburo"
    ],
    accommodationLevel: "Luxury Safari Lodges & Tented Camps",
    priceUGX: 12500000,
    formattedPriceUGX: "UGX 12,500,000",
    itinerary: [
      { day: 1, title: "Entebbe to Kibale Forest", description: "Begin your journey into western Uganda through picturesque villages and tea estates.", meals: "Lunch & Dinner" },
      { day: 2, title: "Kibale Chimpanzee Tracking & Crater Lakes", description: "Morning with the chimpanzees, afternoon exploring scenic volcanic crater rim walks.", meals: "Breakfast, Lunch & Dinner" },
      { day: 3, title: "Transfer to Queen Elizabeth National Park", description: "Cross the equator into the northern savannah sector of Queen Elizabeth.", meals: "Breakfast, Lunch & Dinner" },
      { day: 4, title: "Kasenyi Plains & Kazinga Boat Safari", description: "Dawn game drive followed by a private boat journey along the Kazinga Channel.", meals: "Breakfast, Lunch & Dinner" },
      { day: 5, title: "Ishasha Plains to Bwindi Forest", description: "Search for fig-tree resting lions before winding into the Bwindi rainforest.", meals: "Breakfast, Lunch & Dinner" },
      { day: 6, title: "Mountain Gorilla Trekking", description: "An awe-inspiring day in the presence of Uganda's wild mountain gorillas.", meals: "Breakfast, Packed Lunch & Dinner" },
      { day: 7, title: "Bwindi to Lake Mburo National Park", description: "Drive east to Lake Mburo, enjoying an afternoon boat ride or sunset game drive.", meals: "Breakfast, Lunch & Dinner" },
      { day: 8, title: "Bush Walking Safari & Return to Entebbe", description: "Experience wildlife on foot with an armed ranger, encountering zebras, elands, and giraffes before returning to Entebbe.", meals: "Breakfast & Lunch" }
    ],
    included: [
      "Gorilla & Chimpanzee permits",
      "Lake Mburo walking safari with armed ranger",
      "All park fees and boat safaris",
      "Private 4WD Land Cruiser and expert Sonnenpfad guide",
      "Full board luxury lodge accommodation"
    ],
    excluded: ["International flights", "Personal expenses", "Tips"],
    importantNotes: ["Lake Mburo is the only national park in southern Uganda where you can safely take a guided walking safari."],
    faqs: [
      {
        question: "Is walking on foot in Lake Mburo safe?",
        answer: "Yes, accompanied by a highly trained Uganda Wildlife Authority ranger who knows animal behavior intimately."
      }
    ]
  },
  {
    id: "pkg-5",
    slug: "10-day-pearl-of-africa",
    title: "10 Days — Pearl of Africa & East Africa Explorer",
    duration: "10 Days / 9 Nights",
    durationDays: 10,
    destinations: ["Murchison Falls", "Kibale", "Queen Elizabeth", "Bwindi"],
    destinationsFormatted: "Murchison Falls + Kibale + Queen Elizabeth + Bwindi",
    tagline: "Four legendary destinations. One extraordinary East African safari.",
    overview: "Follow the Nile into Murchison Falls, explore the lush forests around Kibale, search for wildlife across Queen Elizabeth, and finish with mountain gorillas in Bwindi. A comprehensive expedition that captures the very soul of East Africa.",
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Stand at the top of thunderous Murchison Falls where the Nile squeezes through a 7-meter gorge",
      "Boat cruise to the base of Murchison Falls witnessing Nile crocodiles and hippos",
      "Rhino tracking on foot at Ziwa Rhino Sanctuary",
      "Chimpanzee tracking in Kibale Forest",
      "Kazinga Channel boat safari & Ishasha tree-climbing lions",
      "Intimate mountain gorilla trek in Bwindi"
    ],
    accommodationLevel: "Signature Luxury Safari Lodges (Paraa Safari Lodge / Chobe / Ndali / Clouds Mountain Gorilla Lodge)",
    priceUGX: 16800000,
    formattedPriceUGX: "UGX 16,800,000",
    itinerary: [
      { day: 1, title: "Arrival in Entebbe & Welcome", description: "Personal airport reception by Sonnenpfad team and transfer to your boutique hotel.", meals: "Dinner" },
      { day: 2, title: "Ziwa Rhino Sanctuary to Murchison Falls", description: "Track endangered southern white rhinos on foot at Ziwa before continuing to Murchison Falls National Park.", meals: "Breakfast, Lunch & Dinner" },
      { day: 3, title: "Savannah Game Drive & Nile River Boat Cruise", description: "Search for Rothschild giraffes, lions, and elephants, followed by a dramatic boat safari to the base of the falls.", meals: "Breakfast, Lunch & Dinner" },
      { day: 4, title: "Murchison Falls to Kibale Forest", description: "Scenic drive south through the Albertine Rift Valley and verdant tea terraces to Fort Portal.", meals: "Breakfast, Lunch & Dinner" },
      { day: 5, title: "Chimpanzee Experience & Bigodi Sanctuary", description: "Morning tracking Kibale's chimpanzee communities; afternoon community wetland conservation walk.", meals: "Breakfast, Lunch & Dinner" },
      { day: 6, title: "Kibale to Queen Elizabeth National Park", description: "Transfer along the Rwenzori mountain range into Queen Elizabeth.", meals: "Breakfast, Lunch & Dinner" },
      { day: 7, title: "Game Drive & Kazinga Channel", description: "Kasenyi lion tracking and afternoon cruise on the Kazinga Channel.", meals: "Breakfast, Lunch & Dinner" },
      { day: 8, title: "Queen Elizabeth to Bwindi Impenetrable", description: "Traverse the Ishasha sector searching for tree-climbing lions before reaching Bwindi.", meals: "Breakfast, Lunch & Dinner" },
      { day: 9, title: "Mountain Gorilla Trekking", description: "The premier highlight of your safari: tracking wild mountain gorillas in Bwindi.", meals: "Breakfast, Packed Lunch & Dinner" },
      { day: 10, title: "Return to Entebbe / Onward Departure", description: "Scenic transfer back to Entebbe for your evening outbound flight.", meals: "Breakfast & Lunch" }
    ],
    included: [
      "Gorilla Permit & Chimpanzee Permit",
      "Ziwa Rhino Sanctuary tracking on foot",
      "Murchison Falls boat cruise and top-of-falls access",
      "Kazinga Channel boat cruise",
      "All park fees, game drives, and 4x4 private transport",
      "9 nights luxury accommodation"
    ],
    excluded: ["International airfare", "Visas", "Personal tips"],
    importantNotes: ["Murchison Falls is the world's most powerful waterfall by water volume squeezed through a narrow canyon."],
    faqs: [
      {
        question: "Is this tour suitable for families?",
        answer: "Yes, this itinerary offers rich diversity and comfortable lodges. Please note children must be 15 or older to trek gorillas and chimpanzees."
      }
    ]
  },
  {
    id: "pkg-6",
    slug: "14-day-grand-uganda-expedition",
    title: "14 Days — Grand East Africa Expedition",
    duration: "14 Days / 13 Nights",
    durationDays: 14,
    destinations: ["Murchison Falls", "Kibale", "Queen Elizabeth", "Bwindi", "Lake Mburo", "Jinja / Nile"],
    destinationsFormatted: "Kampala/Entebbe → Murchison Falls → Kibale → Queen Elizabeth → Bwindi → Lake Mburo → Entebbe",
    tagline: "Sonnenpfad's flagship expedition — the ultimate journey across East Africa.",
    overview: "The definitive East African adventure. Experience every facet of the region: the raw power of the Nile, white rhino tracking on foot, chimpanzees swinging through rainforest canopies, open savannah predators, tree-climbing lions, mountain gorillas in the mist, serene walking safaris, and rich cultural encounters.",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1600&q=80",
    highlights: [
      "Wildlife game drives across 4 distinct East African national parks",
      "Nile river cruises & thunderous Murchison Falls viewpoints",
      "Chimpanzee tracking in Kibale Forest Primate Capital",
      "Gorilla trekking deep within Bwindi Impenetrable Forest",
      "Boat safaris along Kazinga Channel and Lake Mburo",
      "Guided nature and bush walking safaris on foot",
      "Authentic cultural encounters with local East African communities",
      "Exceptional wildlife photography opportunities with expert guidance",
      "Handpicked boutique eco-lodges and luxury wilderness retreats"
    ],
    accommodationLevel: "East Africa's Finest Luxury & Boutique Safari Lodges (Exclusive Full Board)",
    priceUGX: 23500000,
    formattedPriceUGX: "UGX 23,500,000",
    isFlagship: true,
    itinerary: [
      { day: 1, title: "Welcome to Entebbe, Uganda", description: "VIP airport reception and transfer to your peaceful lakeside retreat in Entebbe.", meals: "Dinner" },
      { day: 2, title: "Ziwa Rhino Sanctuary & Journey to Murchison Falls", description: "Track wild southern white rhinos on foot before arriving in Murchison Falls National Park.", meals: "Breakfast, Lunch & Dinner" },
      { day: 3, title: "Northern Savannah Game Drive & Nile Boat Cruise", description: "Search for lions, leopards, giraffes, and take an afternoon boat cruise to the foot of Murchison Falls.", meals: "Breakfast, Lunch & Dinner" },
      { day: 4, title: "Top of the Falls & Transfer to Hoima / Fort Portal", description: "Witness the Nile compress into a 7-meter gorge before driving through countryside landscapes.", meals: "Breakfast, Lunch & Dinner" },
      { day: 5, title: "Into Kibale Forest Primate Sanctuary", description: "Arrive at Kibale Forest, surrounded by green crater lakes and tea gardens.", meals: "Breakfast, Lunch & Dinner" },
      { day: 6, title: "Chimpanzee Tracking & Bigodi Wetland Sanctuary", description: "Follow chimpanzee troops through the forest and explore community conservation wetlands.", meals: "Breakfast, Lunch & Dinner" },
      { day: 7, title: "Rwenzori Foothills to Queen Elizabeth National Park", description: "Scenic transfer passing beneath the 'Mountains of the Moon' into Queen Elizabeth.", meals: "Breakfast, Lunch & Dinner" },
      { day: 8, title: "Kasenyi Lion Tracking & Kazinga Channel Safari", description: "Morning predator game drive followed by world-renowned Kazinga Channel water safari.", meals: "Breakfast, Lunch & Dinner" },
      { day: 9, title: "Tree-Climbing Lions of Ishasha", description: "Dedicated game tracking in Ishasha for lions lounging in ancient fig trees.", meals: "Breakfast, Lunch & Dinner" },
      { day: 10, title: "Ascent into Bwindi Impenetrable Rainforest", description: "Climb through misty mountain passes to your luxury rainforest lodge.", meals: "Breakfast, Lunch & Dinner" },
      { day: 11, title: "Bwindi Mountain Gorilla Trekking", description: "The pinnacle experience: spending an hour face-to-face with a wild mountain gorilla family.", meals: "Breakfast, Packed Lunch & Dinner" },
      { day: 12, title: "Transfer to Lake Mburo National Park", description: "Scenic drive eastward to the rolling acacia savannah of Lake Mburo.", meals: "Breakfast, Lunch & Dinner" },
      { day: 13, title: "Bush Walking Safari & Sunset Lake Cruise", description: "Walk on foot alongside zebras and impalas, followed by a tranquil evening boat ride.", meals: "Breakfast, Lunch & Dinner" },
      { day: 14, title: "Equator Crossing & Farewell Transfer to Entebbe", description: "Celebrate your journey with an Equator photo stop and transfer to Entebbe for international departures.", meals: "Breakfast & Lunch" }
    ],
    included: [
      "Official Mountain Gorilla Trekking Permit",
      "Official Chimpanzee Tracking Permit",
      "Ziwa Rhino Sanctuary permit",
      "All national park entries, ranger fees, and conservation levies",
      "Private customized 4x4 Land Cruiser with pop-up photography roof",
      "Senior Sonnenpfad lead safari director throughout",
      "13 nights luxury lodge accommodation on full board",
      "All boat cruises (Murchison Falls, Kazinga Channel, Lake Mburo)",
      "Bush walking safari and community cultural experiences"
    ],
    excluded: ["International flights", "East Africa entry visa", "Tips and personal insurance"],
    importantNotes: [
      "This expedition can be fully customized according to your preferred pace, accommodation tastes, or special interests (e.g. photography, birding, wellness)."
    ],
    faqs: [
      {
        question: "Can we customize the lodges or duration of this flagship expedition?",
        answer: "Absolutely. Sonnenpfad Safaris specializes in bespoke itineraries tailored to private individuals, families, and small private groups across East Africa."
      }
    ]
  }
];
