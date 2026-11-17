/**
 * Sonnenpfad Safaris Uganda Ltd - Supabase Database Connector (Cloudflare Pages Ready)
 * Project: https://ujodbxzzibfypfgqsnpj.supabase.co
 */

import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL =
  (typeof window !== 'undefined' && (window as any).__ENV__?.VITE_SUPABASE_URL) ||
  'https://ujodbxzzibfypfgqsnpj.supabase.co';
export const SUPABASE_ANON_KEY =
  (typeof window !== 'undefined' && (window as any).__ENV__?.VITE_SUPABASE_ANON_KEY) ||
  'sb_publishable_uxtIygW_RFAXCSpjmN7Rbw_nd6IqhWX';
export const SUPABASE_DB_URL =
  'postgresql://postgres.ujodbxzzibfypfgqsnpj:[YOUR-PASSWORD]@aws-0-eu-west-3.pooler.supabase.com:5432/postgres';

// Initialize Supabase Client (Browser-direct for Cloudflare Pages & Local Dev)
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Idempotent SQL Schema script to run once in Supabase SQL Editor:
 * https://supabase.com/dashboard/project/ujodbxzzibfypfgqsnpj/sql
 */
export const SUPABASE_SCHEMA_SQL = `-- Sonnenpfad Safaris Master Database Schema (Cloudflare Pages & Supabase Direct)
-- Paste & Run in: https://supabase.com/dashboard/project/ujodbxzzibfypfgqsnpj/sql

-- 1. Safaris Table
CREATE TABLE IF NOT EXISTS public.safaris (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  duration TEXT NOT NULL,
  duration_days INT DEFAULT 3,
  destinations TEXT[] DEFAULT '{}',
  destinations_formatted TEXT,
  price_ugx BIGINT NOT NULL,
  formatted_price_ugx TEXT,
  image TEXT NOT NULL,
  overview TEXT,
  highlights TEXT[] DEFAULT '{}',
  included TEXT[] DEFAULT '{}',
  excluded TEXT[] DEFAULT '{}',
  accommodation_level TEXT DEFAULT 'Luxury',
  is_flagship BOOLEAN DEFAULT false,
  likes_count INT DEFAULT 0,
  itinerary JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Products Table (Expedition Gear & Specialty Coffee)
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  origin TEXT,
  category TEXT NOT NULL,
  price BIGINT NOT NULL,
  original_price BIGINT,
  weight TEXT,
  rating NUMERIC DEFAULT 5,
  reviews_count INT DEFAULT 0,
  image TEXT NOT NULL,
  is_sale BOOLEAN DEFAULT false,
  in_stock BOOLEAN DEFAULT true,
  description TEXT,
  flavor_notes TEXT[] DEFAULT '{}',
  likes_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Customer Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  date TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  product_name TEXT NOT NULL,
  quantity INT DEFAULT 1,
  total_amount BIGINT NOT NULL,
  delivery_address TEXT NOT NULL,
  grind_preference TEXT,
  notes TEXT,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Item & Section Comments Table
CREATE TABLE IF NOT EXISTS public.comments (
  id TEXT PRIMARY KEY,
  item_id TEXT NOT NULL,
  author TEXT NOT NULL,
  rating INT DEFAULT 5,
  text TEXT NOT NULL,
  item_type TEXT DEFAULT 'general',
  date TEXT NOT NULL,
  status TEXT DEFAULT 'Published',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.comments ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'Published';

-- 5. Verified Guest Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  author TEXT NOT NULL,
  country TEXT NOT NULL,
  tour_name TEXT NOT NULL,
  rating INT DEFAULT 5,
  date TEXT NOT NULL,
  overall_score INT DEFAULT 95,
  wildlife_score INT DEFAULT 95,
  guide_score INT DEFAULT 95,
  lodging_score INT DEFAULT 95,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'Verified Guest',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Business Settings, Map Coordinates & Admin Passcode Table
CREATE TABLE IF NOT EXISTS public.settings (
  id TEXT PRIMARY KEY DEFAULT 'primary_config',
  phone TEXT DEFAULT '+256 773 333108',
  whatsapp TEXT DEFAULT '+256 773 333108',
  email TEXT DEFAULT 'info@sonnenpfadsafaris.com',
  tiktok TEXT DEFAULT '@kisacathy1900',
  tiktok_url TEXT DEFAULT 'https://www.tiktok.com/@kisacathy1900',
  address TEXT DEFAULT 'Plot 14 Entebbe Road, Kampala, Uganda',
  map_embed_url TEXT,
  admin_passcode TEXT DEFAULT 'sonnenpfad2026',
  moderation_mode TEXT DEFAULT 'auto',
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS admin_passcode TEXT DEFAULT 'sonnenpfad2026';
ALTER TABLE public.settings ADD COLUMN IF NOT EXISTS moderation_mode TEXT DEFAULT 'auto';

-- 7. TikTok Video Feed Table
CREATE TABLE IF NOT EXISTS public.tiktoks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  video_url TEXT NOT NULL,
  thumbnail TEXT NOT NULL,
  views TEXT,
  likes TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Item Likes Counter Table
CREATE TABLE IF NOT EXISTS public.likes (
  item_id TEXT PRIMARY KEY,
  count INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Privacy & Data Deletion Requests Table
CREATE TABLE IF NOT EXISTS public.deletion_requests (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  contact_info TEXT NOT NULL,
  record_scope TEXT DEFAULT 'All Personal Records',
  reason TEXT,
  status TEXT DEFAULT 'Pending Review',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security & Idempotent Policies
ALTER TABLE public.safaris ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tiktoks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deletion_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public access safaris" ON public.safaris;
CREATE POLICY "Public access safaris" ON public.safaris FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access products" ON public.products;
CREATE POLICY "Public access products" ON public.products FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access orders" ON public.orders;
CREATE POLICY "Public access orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access comments" ON public.comments;
CREATE POLICY "Public access comments" ON public.comments FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access reviews" ON public.reviews;
CREATE POLICY "Public access reviews" ON public.reviews FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access settings" ON public.settings;
CREATE POLICY "Public access settings" ON public.settings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access tiktoks" ON public.tiktoks;
CREATE POLICY "Public access tiktoks" ON public.tiktoks FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access likes" ON public.likes;
CREATE POLICY "Public access likes" ON public.likes FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access deletion_requests" ON public.deletion_requests;
CREATE POLICY "Public access deletion_requests" ON public.deletion_requests FOR ALL USING (true) WITH CHECK (true);
`;

export interface SupabaseDiagnosticResult {
  connected: boolean;
  url: string;
  latencyMs: number;
  tables: Record<string, { status: 'ok' | 'needs_table_creation'; error?: string | null }>;
  allReady: boolean;
  message: string;
}

/**
 * Direct browser-to-Supabase diagnostic (works on pure static Cloudflare Pages)
 */
export async function testSupabaseConnection(): Promise<SupabaseDiagnosticResult> {
  const start = performance.now();
  const tableSpecs: Array<{ name: string; col: string }> = [
    { name: 'safaris', col: 'id' },
    { name: 'products', col: 'id' },
    { name: 'orders', col: 'id' },
    { name: 'comments', col: 'id' },
    { name: 'reviews', col: 'id' },
    { name: 'settings', col: 'id' },
    { name: 'tiktoks', col: 'id' },
    { name: 'likes', col: 'item_id' },
    { name: 'deletion_requests', col: 'id' },
  ];

  const tables: Record<string, { status: 'ok' | 'needs_table_creation'; error?: string | null }> = {};
  let anyNetworkSuccess = false;

  await Promise.all(
    tableSpecs.map(async ({ name, col }) => {
      try {
        const { error } = await supabase.from(name).select(col).limit(1);
        anyNetworkSuccess = true;
        if (!error) {
          tables[name] = { status: 'ok', error: null };
        } else {
          tables[name] = { status: 'needs_table_creation', error: error.message };
        }
      } catch (err: any) {
        tables[name] = { status: 'needs_table_creation', error: err?.message || 'Connection error' };
      }
    })
  );

  const latencyMs = Math.round(performance.now() - start);
  const allReady = Object.values(tables).every((t) => t.status === 'ok');
  const readyCount = Object.values(tables).filter((t) => t.status === 'ok').length;

  return {
    connected: anyNetworkSuccess,
    url: SUPABASE_URL,
    latencyMs,
    tables,
    allReady,
    message: allReady
      ? `All ${tableSpecs.length} tables live & connected at ${SUPABASE_URL} (${latencyMs}ms)`
      : `${readyCount}/${tableSpecs.length} tables active at ${SUPABASE_URL} (${latencyMs}ms) — run SQL script once to initialize missing tables.`,
  };
}

if (typeof window !== 'undefined') {
  (window as any).supabase = supabase;
  (window as any).testSupabaseConnection = testSupabaseConnection;
  (window as any).SUPABASE_SCHEMA_SQL = SUPABASE_SCHEMA_SQL;
  (window as any).SUPABASE_URL = SUPABASE_URL;
  (window as any).SUPABASE_DB_URL = SUPABASE_DB_URL;
}
