import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const DATA_FILE = path.resolve(__dirname, 'data', 'db.json');

app.use(express.json({ limit: '20mb' }));

// Ensure data directory exists
if (!fs.existsSync(path.resolve(__dirname, 'data'))) {
  fs.mkdirSync(path.resolve(__dirname, 'data'), { recursive: true });
}

// Default Data Seed
const DEFAULT_SETTINGS = {
  brandName: "Sonnenpfad Safaris Uganda Ltd",
  phone: "+256 773 333108",
  whatsapp: "+256 773 333108",
  email: "info@sonnenpfadsafaris.com",
  tiktok: "@kisacathy1900",
  tiktokUrl: "https://www.tiktok.com/@kisacathy1900",
  instagramUrl: "https://www.instagram.com/sonnenpfadsafaris",
  facebookUrl: "https://www.facebook.com/sonnenpfadsafaris",
  twitterUrl: "https://twitter.com/sonnenpfad",
  address: "Plot 14 Entebbe Road, Kampala, Uganda",
  operatingHours: "Mon – Sun: 24/7 Operations",
  location: {
    title: "Sonnenpfad Safaris Operations Centre",
    address: "Plot 14 Entebbe Road, Kampala, Uganda",
    latitude: 0.3136,
    longitude: 32.5811,
    zoom: 14,
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15959.035313936648!2d32.5711!3d0.3136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb8a7b97c0f1%3A0x6b77741d4f23b20!2sEntebbe%20Rd%2C%20Kampala!5e0!3m2!1sen!2sug!4v1700000000000!5m2!1sen!2sug"
  }
};

const DEFAULT_TIKTOKS = [
  {
    id: "tt-1",
    title: "Morning encounter with the Bwindi silverback gorilla family 🦍",
    videoUrl: "https://www.tiktok.com/@kisacathy1900",
    thumbnail: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    views: "18.4K",
    likes: "2.3K"
  },
  {
    id: "tt-2",
    title: "Cruising the Victoria Nile with massive hippos and Murchison Falls 🌊",
    videoUrl: "https://www.tiktok.com/@kisacathy1900",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    views: "24.9K",
    likes: "3.1K"
  },
  {
    id: "tt-3",
    title: "Tree-climbing lions resting in sycamore fig trees in Queen Elizabeth 🦁",
    videoUrl: "https://www.tiktok.com/@kisacathy1900",
    thumbnail: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80",
    views: "31.2K",
    likes: "4.8K"
  },
  {
    id: "tt-4",
    title: "Fresh harvest and roasting of Mount Elgon Peaberry Arabica coffee ☕",
    videoUrl: "https://www.tiktok.com/@kisacathy1900",
    thumbnail: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80",
    views: "12.6K",
    likes: "1.9K"
  }
];

function readDb(): any {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Error reading db file:", err);
  }
  return {
    settings: DEFAULT_SETTINGS,
    tiktoks: DEFAULT_TIKTOKS,
    likes: {},
    comments: {},
    orders: [],
    customSafaris: [],
    customProducts: [],
    reviews: []
  };
}

function writeDb(data: any): boolean {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error("Error writing db file:", err);
    return false;
  }
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// REST API Routes
app.get('/api/data', (req, res) => {
  const dbData = readDb();
  res.json({ success: true, data: dbData });
});

app.post('/api/data', (req, res) => {
  const incoming = req.body;
  if (!incoming) return res.status(400).json({ success: false, error: 'No data' });
  const ok = writeDb(incoming);
  res.json({ success: ok });
});

// Toggle Likes for any item (safari, product, gallery, etc.)
app.post('/api/like', (req, res) => {
  const { itemId, userIdentifier } = req.body;
  if (!itemId) return res.status(400).json({ error: 'Missing itemId' });
  
  const db = readDb();
  if (!db.likes) db.likes = {};
  if (!db.likes[itemId]) db.likes[itemId] = { count: 12, users: [] };

  const itemLikes = db.likes[itemId];
  const userId = userIdentifier || 'guest';
  const index = itemLikes.users.indexOf(userId);

  let liked = false;
  if (index > -1) {
    itemLikes.users.splice(index, 1);
    itemLikes.count = Math.max(0, itemLikes.count - 1);
    liked = false;
  } else {
    itemLikes.users.push(userId);
    itemLikes.count += 1;
    liked = true;
  }

  writeDb(db);
  res.json({ success: true, itemId, likesCount: itemLikes.count, liked });
});

// Post Comment / Review for any item
app.post('/api/comment', (req, res) => {
  const { itemId, author, rating, text, itemType } = req.body;
  if (!itemId || !author || !text) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const db = readDb();
  if (!db.comments) db.comments = {};
  if (!db.comments[itemId]) db.comments[itemId] = [];

  const newComment = {
    id: 'c-' + Date.now(),
    itemId,
    author: String(author).trim(),
    rating: Number(rating) || 5,
    text: String(text).trim(),
    itemType: itemType || 'general',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  };

  db.comments[itemId].unshift(newComment);
  writeDb(db);
  res.json({ success: true, comment: newComment, total: db.comments[itemId].length });
});

// Get comments for specific item
app.get('/api/comments/:itemId', (req, res) => {
  const db = readDb();
  const list = (db.comments && db.comments[req.params.itemId]) || [];
  res.json({ success: true, comments: list });
});

// Update Business Settings & Live Map Location
app.post('/api/settings', (req, res) => {
  const { settings } = req.body;
  if (!settings) return res.status(400).json({ error: 'Missing settings' });

  const db = readDb();
  db.settings = { ...db.settings, ...settings };
  writeDb(db);
  res.json({ success: true, settings: db.settings });
});

// Update TikTok Feed items
app.post('/api/tiktoks', (req, res) => {
  const { tiktoks } = req.body;
  if (!Array.isArray(tiktoks)) return res.status(400).json({ error: 'Expected array' });

  const db = readDb();
  db.tiktoks = tiktoks;
  writeDb(db);
  res.json({ success: true, tiktoks: db.tiktoks });
});

// Supabase Credentials
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ujodbxzzibfypfgqsnpj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_uxtIygW_RFAXCSpjmN7Rbw_nd6IqhWX';
const supabase = createSupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Supabase Status Endpoint
app.get('/api/supabase/status', async (req, res) => {
  try {
    const start = Date.now();
    const tableNames = ['safaris', 'products', 'orders', 'comments', 'settings', 'tiktoks'];
    const tables: Record<string, { status: string; error?: string | null }> = {};

    await Promise.all(
      tableNames.map(async (tbl) => {
        try {
          const { error } = await supabase.from(tbl).select('id').limit(1);
          if (!error) {
            tables[tbl] = { status: 'ok', error: null };
          } else {
            tables[tbl] = { status: 'needs_table_creation', error: error.message };
          }
        } catch (err: any) {
          tables[tbl] = { status: 'needs_table_creation', error: err?.message || 'Unknown error' };
        }
      })
    );

    const latency = Date.now() - start;

    res.json({
      success: true,
      url: SUPABASE_URL,
      projectUrl: SUPABASE_URL,
      connected: true,
      latencyMs: latency,
      safarisTableFound: tables.safaris?.status === 'ok',
      tables,
      error: null
    });
  } catch (err: any) {
    res.json({
      success: false,
      url: SUPABASE_URL,
      projectUrl: SUPABASE_URL,
      connected: false,
      error: err?.message || 'Connection error'
    });
  }
});

// Sync data between local DB and Supabase
app.post('/api/supabase/sync', async (req, res) => {
  const dbData = readDb();
  const results: any = { safaris: null, products: null, settings: null };

  try {
    // Attempt settings upsert
    if (dbData.settings) {
      const { error: setErr } = await supabase.from('settings').upsert({
        id: 'primary_config',
        phone: dbData.settings.phone,
        whatsapp: dbData.settings.whatsapp,
        email: dbData.settings.email,
        tiktok: dbData.settings.tiktok,
        tiktok_url: dbData.settings.tiktokUrl,
        address: dbData.settings.address,
        map_embed_url: dbData.settings.location?.mapEmbedUrl
      });
      results.settings = setErr ? setErr.message : 'synced';
    }

    res.json({ success: true, results });
  } catch (err: any) {
    res.json({ success: false, error: err?.message });
  }
});

// New Order Placement
app.post('/api/order', async (req, res) => {
  const order = req.body;
  if (!order || !order.customerName) return res.status(400).json({ error: 'Invalid order' });

  const db = readDb();
  if (!db.orders) db.orders = [];
  const created = {
    id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
    date: new Date().toISOString().slice(0, 10),
    status: 'Pending',
    ...order
  };
  db.orders.unshift(created);
  writeDb(db);

  // Sync with Supabase orders table if created
  try {
    await supabase.from('orders').insert({
      id: created.id,
      date: created.date,
      customer_name: created.customerName,
      phone: created.phone,
      product_name: created.productName,
      quantity: created.quantity,
      total_amount: created.totalAmount,
      delivery_address: created.deliveryAddress,
      grind_preference: created.grindPreference,
      status: created.status
    });
  } catch (e) {
    // Graceful fallback to local JSON database
  }

  res.json({ success: true, order: created });
});

// Vite Middleware Delegate
let viteMiddleware: any = null;

app.use((req, res, next) => {
  if (req.path.startsWith('/api') || req.path === '/health') {
    return next();
  }

  if (viteMiddleware) {
    return viteMiddleware(req, res, next);
  }

  // Instant fallback while Vite is initializing
  if (req.method === 'GET' && (req.path === '/' || req.path.endsWith('.html'))) {
    const fileName = req.path === '/' ? 'index.html' : req.path.slice(1);
    const filePath = path.resolve(__dirname, fileName);
    if (fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }
  }

  next();
});

// Start Express server immediately on port 3000
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Sonnenpfad Safaris] Dev Server immediately listening on http://0.0.0.0:${PORT}`);
});

// Initialize Vite in the background without blocking port 3000
async function initVite() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
        watch: null,
      },
      appType: 'spa'
    });
    viteMiddleware = vite.middlewares;
    console.log('[Sonnenpfad Safaris] Vite middlewares attached successfully');
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }
}

initVite().catch((err) => {
  console.error('[Sonnenpfad Safaris] Error initializing Vite:', err);
});

// Graceful termination
process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
