export interface ExperienceItem {
  id: string;
  title: string;
  headline: string;
  copy: string;
  image: string;
  ctaText: string;
  tag: string;
  keyDetails: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-gorilla",
    title: "Gorilla Trekking",
    headline: "Face to Face with the Wild",
    copy: "Walk beneath an ancient forest canopy in search of one of the world's most remarkable primates. A gorilla trek is not simply another wildlife sighting. The forest journey, anticipation and eventual encounter combine to create an experience many travellers remember for the rest of their lives.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Explore Gorilla Safaris",
    tag: "Bwindi & Mgahinga",
    keyDetails: [
      "Strictly limited to 8 visitors per gorilla family per day",
      "One magical hour of quiet observation in their natural habitat",
      "Trekking led by expert trackers and armed conservation rangers",
      "Support direct community conservation protecting mountain gorillas"
    ]
  },
  {
    id: "exp-chimpanzee",
    title: "Chimpanzee Experiences",
    headline: "Into the Primate Forest",
    copy: "Discover the energy of Uganda's tropical forests while searching for chimpanzees and other primates. Combine your chimpanzee experience with birding, nature and photography for a deeper exploration of Uganda's forest ecosystems.",
    image: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Explore Chimpanzee Safaris",
    tag: "Kibale & Kyambura",
    keyDetails: [
      "Over 1,500 chimpanzees in Kibale's protected rainforest",
      "Habituation experience options available for extended time",
      "Observe grooming, vocal pant-hoots, and tree canopy acrobatics",
      "Encounter 12 other primate species in the same forest"
    ]
  },
  {
    id: "exp-wildlife",
    title: "Wildlife Safaris",
    headline: "Africa in Motion",
    copy: "Watch elephants move across open landscapes, encounter buffalo, antelope and other wildlife, and search for predators while travelling through some of Uganda's most beautiful protected areas.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Explore Wildlife Safaris",
    tag: "Murchison, Queen Elizabeth & Kidepo",
    keyDetails: [
      "Lions, leopards, cheetahs, and hyenas in natural habitats",
      "Custom 4WD open-roof safari Land Cruisers with charging ports",
      "Uncrowded wilderness tracks away from tourist masses",
      "Sunrise and golden-hour sunset game drives"
    ]
  },
  {
    id: "exp-boat",
    title: "Boat Safaris",
    headline: "See Uganda from the Water",
    copy: "Some of Uganda's most memorable wildlife encounters happen from the water. Journey along iconic waterways while watching hippos, crocodiles, elephants and abundant birdlife along the banks.",
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Explore Water Safaris",
    tag: "Kazinga Channel & The River Nile",
    keyDetails: [
      "World's largest hippo concentration along Kazinga Channel",
      "Approaching elephants drinking and bathing at water's edge",
      "Spectacular view of Murchison Falls from the base riverbed",
      "Exceptional vantage points for telephoto photography"
    ]
  },
  {
    id: "exp-cultural",
    title: "Cultural Experiences",
    headline: "Meet the People Behind the Destination",
    copy: "Uganda is much more than its wildlife. Responsible cultural experiences give travellers opportunities to learn about local traditions, food, music, crafts and everyday life while respecting the communities being visited.",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Discover Cultural Journeys",
    tag: "Batwa, Karamojong & Baganda",
    keyDetails: [
      "Batwa ancient hunter-gatherer forest survival demonstrations",
      "Karamojong traditional Manyatta village visits in Kidepo",
      "Ugandan organic coffee and banana cuisine masterclasses",
      "Direct ethical benefit sharing with community host cooperatives"
    ]
  },
  {
    id: "exp-birdwatching",
    title: "Birdwatching Expeditions",
    headline: "The Avian Wonder of Africa",
    copy: "Uganda's forests, wetlands, savannahs and waterways create outstanding opportunities for bird enthusiasts. Offer specialised birding itineraries ranging from short excursions to longer multi-destination expeditions.",
    image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Plan a Birding Expedition",
    tag: "Over 1,060 Bird Species",
    keyDetails: [
      "The prehistoric Shoebill Stork in Mabamba and Delta swamps",
      "Albertine Rift Endemics found nowhere else on earth",
      "Specialist ornithological safari guides with audio playback gear",
      "Comprehensive multi-habitat birding checklists"
    ]
  },
  {
    id: "exp-hiking",
    title: "Hiking & Mountains",
    headline: "Explore Africa on Foot",
    copy: "Explore the Rwenzori Mountains, Mount Elgon and other scenic landscapes on journeys created for travellers who prefer experiencing Africa on foot.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Explore Mountain Treks",
    tag: "Rwenzori & Mount Elgon",
    keyDetails: [
      "Glacier peaks rising above tropical equatorial mist",
      "Challenging 7-9 day Margherita Peak (5,109m) ascents",
      "Scenic 1-3 day foothill walks and crater lake rim hikes",
      "Pristine alpine flora and moss-hung fairy tale forests"
    ]
  },
  {
    id: "exp-nile",
    title: "Nile Adventures",
    headline: "At the Source of the World's Greatest River",
    copy: "Experience the adrenaline and majesty of the River Nile. From peaceful sunset cruises and white-water kayaking to stand-up paddleboarding and sport fishing.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Discover Nile Safaris",
    tag: "Jinja & Murchison",
    keyDetails: [
      "World-class white-water rafting on warm equatorial waters",
      "Cruises to the historical Source of the Nile",
      "World record Nile Perch catch-and-release fishing",
      "Tranquil boutique riverside lodge stays"
    ]
  },
  {
    id: "exp-photography",
    title: "Photographic Safaris",
    headline: "Framing the African Light",
    copy: "Customized journeys designed around golden-hour light, unobstructed vehicle positions, and patience in the field for enthusiast and professional photographers.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Plan a Photo Safari",
    tag: "Bespoke Guidance",
    keyDetails: [
      "Vehicle window seats with beanbag supports and charging invertors",
      "Guides trained in animal positioning relative to the sun",
      "Ample time spent at sightings without rushing to the next stop",
      "Specialist permits for early morning and late evening drives"
    ]
  },
  {
    id: "exp-family",
    title: "Family Safaris",
    headline: "Inspiring Wonder Across Generations",
    copy: "Carefully paced safaris featuring comfortable family lodge villas, engaging ranger junior programs, swimming pools, and unforgettable memories for all ages.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Plan a Family Safari",
    tag: "All Ages Welcome",
    keyDetails: [
      "Spacious family suites and interconnecting luxury safari tents",
      "Shorter drive times and child-friendly wildlife education",
      "Safe walking safaris and boat cruises suited for younger travellers",
      "Private dedicated safari vehicle for total family flexibility"
    ]
  },
  {
    id: "exp-private",
    title: "Private Tailor-Made Safaris",
    headline: "Exclusively Your Uganda",
    copy: "Every Sonnenpfad safari can be chartered as an exclusive private journey crafted around your personal interests, schedule, and preferred pace.",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1600&q=80",
    ctaText: "Design a Private Safari",
    tag: "Total Exclusivity",
    keyDetails: [
      "100% private vehicle and personal lead safari director",
      "Flexible daily schedule adapted on the fly to your wishes",
      "Charter flight options between remote airstrips to save time",
      "VIP meet & greet and fast-track airport assistance"
    ]
  }
];
