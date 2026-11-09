export interface Destination {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  region: string;
  country: "Uganda" | "Kenya" | "Tanzania" | "Rwanda" | "Cross-Border East Africa";
  mapCoords: { x: number; y: number }; // percentage on stylized map
  bestFor: string[];
  keyHighlights: string[];
  bestTimeToVisit: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "dest-bwindi",
    slug: "bwindi",
    name: "Bwindi Impenetrable National Park",
    tagline: "Ancient mist-covered gorilla sanctuary.",
    description: "Deep in southwestern Uganda lies one of Africa's most extraordinary rainforest environments. Bwindi is internationally renowned for sheltering nearly half of the world's surviving mountain gorillas.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80",
    region: "Southwestern Uganda",
    country: "Uganda",
    mapCoords: { x: 23, y: 82 },
    bestFor: ["Gorilla trekking", "Forest experiences", "Photography", "Culture"],
    keyHighlights: [
      "Over 450 mountain gorillas (half the global population)",
      "Ancient afro-montane forest dating back 25,000 years",
      "Over 350 recorded species of forest birds",
      "Batwa cultural heritage experiences"
    ],
    bestTimeToVisit: "June to September and December to February (dry seasons)"
  },
  {
    id: "dest-serengeti",
    slug: "serengeti",
    name: "Serengeti National Park",
    tagline: "The world's greatest wildlife spectacle.",
    description: "Endless golden plains stretching to the horizon, where millions of wildebeest, zebras, and gazelles thunder on their annual Great Migration, followed closely by Africa's apex predators.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1400&q=80",
    region: "Northern Tanzania",
    country: "Tanzania",
    mapCoords: { x: 62, y: 88 },
    bestFor: ["Great Migration", "Big 5 Game Drives", "Predator Encounters", "Hot Air Ballooning"],
    keyHighlights: [
      "Over 1.5 million wildebeest during the Great Migration",
      "Dense populations of lions, leopards, cheetahs, and spotted hyenas",
      "Scenic Mara River crocodile crossings",
      "Endless open savannah sunsets under East African skies"
    ],
    bestTimeToVisit: "July to October for river crossings; December to March for calving season"
  },
  {
    id: "dest-masai-mara",
    slug: "masai-mara",
    name: "Masai Mara National Reserve",
    tagline: "Iconic East African big cat theatre.",
    description: "Kenya's premier safari reserve, contiguous with the Serengeti, famous for exceptional big cat sightings, rolling acacia plains, and the dramatic Mara River migration crossings.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=80",
    region: "Southwestern Kenya",
    country: "Kenya",
    mapCoords: { x: 78, y: 70 },
    bestFor: ["Big Cats", "Great Migration", "Maasai Culture", "Luxury Tented Camps"],
    keyHighlights: [
      "Unrivalled density of lions, leopards, and cheetahs",
      "Dramatic river crossings during the Great Migration (July - October)",
      "Traditional Maasai warrior cultural villages",
      "Sunrise hot air balloon safaris over the savannah"
    ],
    bestTimeToVisit: "July to October for migration; January to March for resident big cats"
  },
  {
    id: "dest-murchison",
    slug: "murchison-falls",
    name: "Murchison Falls National Park",
    tagline: "Feel the thundering power of the Nile.",
    description: "Experience dramatic landscapes, wildlife and the River Nile in one of Uganda's best-known protected areas. Combine wildlife viewing with boat experiences and spectacular waterfall scenery.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80",
    region: "Northwestern Uganda",
    country: "Uganda",
    mapCoords: { x: 38, y: 32 },
    bestFor: ["Game drives", "Nile cruises", "Waterfalls", "Wildlife", "Birding"],
    keyHighlights: [
      "The world's most powerful waterfall forcing the Nile through a 7m gap",
      "Boat cruise to the base of the falls with huge Nile crocodiles",
      "Rothschild giraffes, lions, elephants, and leopards",
      "Shoebill stork sightings in the Lake Albert delta"
    ],
    bestTimeToVisit: "December to February and June to September"
  },
  {
    id: "dest-ngorongoro",
    slug: "ngorongoro-crater",
    name: "Ngorongoro Conservation Area",
    tagline: "The Garden of Eden volcanic caldera.",
    description: "A UNESCO World Heritage site and the world's largest unbroken, unflooded volcanic caldera. The crater floor shelters over 25,000 large mammals, including rare black rhinos and massive flamingo flocks.",
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1400&q=80",
    region: "Northern Tanzania",
    country: "Tanzania",
    mapCoords: { x: 68, y: 92 },
    bestFor: ["Black Rhinos", "Caldera Panorama", "Big 5 Game", "Maasai Coexistence"],
    keyHighlights: [
      "260 square kilometre volcanic caldera teeming with wildlife",
      "Highest predator density in Africa with massive pride lions",
      "Critically endangered East African black rhinos",
      "Alkaline Lake Magadi hosting thousands of pink lesser flamingos"
    ],
    bestTimeToVisit: "Year-round wildlife viewing; June to September dry season"
  },
  {
    id: "dest-queen",
    slug: "queen-elizabeth",
    name: "Queen Elizabeth National Park",
    tagline: "Where savannah meets shimmering water.",
    description: "Discover diverse landscapes, rich wildlife and beautiful waterways. Search the plains for wildlife, explore the Ishasha tree-climbing lions and experience the famous Kazinga Channel hippo sanctuary.",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1400&q=80",
    region: "Western Uganda",
    country: "Uganda",
    mapCoords: { x: 25, y: 64 },
    bestFor: ["Lions", "Elephants", "Hippos", "Boat safaris", "Photography"],
    keyHighlights: [
      "World-famous tree-climbing lions of Ishasha",
      "Kazinga Channel boat safari with extraordinary hippo density",
      "Kasenyi plains predator game drives",
      "Explosion crater lakes and Great Rift Valley escarpment"
    ],
    bestTimeToVisit: "Year-round; January to February and June to July are peak dry"
  },
  {
    id: "dest-volcanoes",
    slug: "volcanoes-national-park",
    name: "Volcanoes National Park",
    tagline: "In the heart of the Virunga volcanoes.",
    description: "Rwanda's celebrated sanctuary on the slopes of the dormant Virunga volcanoes. Famous as Dian Fossey's historic base and home to endangered mountain gorillas and rare golden monkeys.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80",
    region: "Northern Rwanda",
    country: "Rwanda",
    mapCoords: { x: 21, y: 92 },
    bestFor: ["Mountain Gorillas", "Golden Monkeys", "Volcanic Hikes", "Dian Fossey Trek"],
    keyHighlights: [
      "Direct luxury gorilla trekking in bamboo cloud forests",
      "Troops of endangered golden monkeys",
      "Majestic Virunga volcano backdrop (Karisimbi & Bisoke)",
      "Seamless connection with Uganda's Bwindi and Queen Elizabeth"
    ],
    bestTimeToVisit: "June to September and December to February"
  },
  {
    id: "dest-kibale",
    slug: "kibale",
    name: "Kibale National Park",
    tagline: "Primate capital of the world.",
    description: "Dense tropical forest and remarkable biodiversity make Kibale an essential destination for travellers interested in chimpanzees and forest adventures in East Africa.",
    image: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?auto=format&fit=crop&w=1400&q=80",
    region: "Western Uganda",
    country: "Uganda",
    mapCoords: { x: 32, y: 55 },
    bestFor: ["Chimpanzees", "Primates", "Forest walks", "Birding", "Photography"],
    keyHighlights: [
      "Highest primate density in Africa with 13 primate species",
      "Over 1,500 wild chimpanzees living in habituated troops",
      "Bigodi Wetland Sanctuary community-managed nature trail",
      "Stunning Ndali-Kasenda volcanic crater lake field"
    ],
    bestTimeToVisit: "December to February and June to September"
  }
];
