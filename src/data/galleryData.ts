export interface GalleryItem {
  id: string;
  title: string;
  category: "Wildlife" | "Gorillas" | "Landscapes" | "Culture" | "Adventure" | "Our Guests";
  location: string;
  image: string;
  caption: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "Silverback in the Morning Mist",
    category: "Gorillas",
    location: "Bwindi Impenetrable National Park",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80",
    caption: "A dominant mountain gorilla silverback surveying his family group amidst the moss-covered trees of Bwindi."
  },
  {
    id: "gal-2",
    title: "Savannah Elephant Herd at Sunset",
    category: "Wildlife",
    location: "Queen Elizabeth National Park",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
    caption: "Matriarch leading her family across the Kasenyi savannah as the sun drops behind the Rwenzori peaks."
  },
  {
    id: "gal-3",
    title: "The Thunderous Nile Gorge",
    category: "Landscapes",
    location: "Murchison Falls National Park",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
    caption: "The entire Victoria Nile forced violently through a 7-meter rock fissure into the Devil's Cauldron below."
  },
  {
    id: "gal-4",
    title: "Curious Chimpanzee in Canopy",
    category: "Wildlife",
    location: "Kibale National Park",
    image: "https://images.unsplash.com/photo-1551009175-8a68da93d5f9?auto=format&fit=crop&w=1600&q=80",
    caption: "A young wild chimpanzee looking down through the dense emerald fig canopy of Kibale Forest."
  },
  {
    id: "gal-5",
    title: "Tree-Climbing Lioness in Ishasha",
    category: "Wildlife",
    location: "Queen Elizabeth National Park",
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1600&q=80",
    caption: "A lioness resting gracefully across the wide branches of an ancient sycamore fig tree in southern Ishasha."
  },
  {
    id: "gal-6",
    title: "White Water on the White Nile",
    category: "Adventure",
    location: "Jinja, River Nile",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80",
    caption: "Navigating exhilarating Grade 5 rapids at the historic source of the River Nile."
  },
  {
    id: "gal-7",
    title: "Traditional Dance & Celebration",
    category: "Culture",
    location: "Kigezi & Batwa Heritage",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1600&q=80",
    caption: "Local community dancers sharing ancestral songs and rhythmic movements by the evening fire."
  },
  {
    id: "gal-8",
    title: "Rothschild Giraffe Tower",
    category: "Wildlife",
    location: "Murchison Falls National Park",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    caption: "Endangered Rothschild giraffes striding elegantly through the golden borassus palm savannah."
  },
  {
    id: "gal-9",
    title: "Mist Over the Rwenzori Mountains",
    category: "Landscapes",
    location: "Rwenzori National Park",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80",
    caption: "The mystical 'Mountains of the Moon' emerging above equatorial cloud banks."
  },
  {
    id: "gal-10",
    title: "Quiet Moment in the Rainforest",
    category: "Gorillas",
    location: "Bwindi Impenetrable National Park",
    image: "https://images.unsplash.com/photo-1574063413132-355dbfd83e25?auto=format&fit=crop&w=1600&q=80",
    caption: "A tender moment between mother and infant gorilla captured in peaceful morning sunlight."
  },
  {
    id: "gal-11",
    title: "Bush Walking Safari Encounter",
    category: "Adventure",
    location: "Lake Mburo National Park",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80",
    caption: "Tracking Burchell's zebras on foot alongside a knowledgeable Uganda Wildlife Authority ranger."
  },
  {
    id: "gal-12",
    title: "Sunset Sundowners with Sonnenpfad",
    category: "Our Guests",
    location: "Albertine Rift Escarpment",
    image: "https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1600&q=80",
    caption: "Travellers enjoying fresh local refreshments as the African sun sets across the endless valley."
  }
];
