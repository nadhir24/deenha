-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous to read
CREATE POLICY "Allow public read access" ON site_settings
    FOR SELECT USING (true);

-- Allow authenticated users to manage
CREATE POLICY "Allow authenticated users to manage settings" ON site_settings
    FOR ALL USING (auth.role() = 'authenticated');

-- Initial Data
INSERT INTO site_settings (key, value) VALUES 
('announcements', '["🌙 Pre-Raya Special: Luxury Hampers & Signature Scarves Highlights", "🌍 International Shipping Available", "✨ Complimentary Shipping on Orders over Rp 500.000", "🎁 Use DEENHA10 for 10% off your first purchase"]'::jsonb),
('hero_slides', '[
    {
        "type": "video",
        "src": "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/promo_video.mp4",
        "title": "",
        "subtitle": "",
        "description": "."
    },
    {
        "type": "video",
        "src": "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/summer_collection.mp4",
        "title": "",
        "subtitle": "",
        "description": "."
    },
    {
        "type": "video",
        "src": "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/vintage_flower.mp4",
        "title": "",
        "subtitle": "",
        "description": "  ."
    }
]'::jsonb),
('home_highlights', '[
    {
        "title": "Pre-Raya Special",
        "bannerImage": "/images/hampers-1-dWxvylrBJ6IBxzqB.jpg",
        "collectionTitle": "Luxury Hampers",
        "collectionDescription": "The perfect gift of gratitude. Our curated Raya hampers are elegantly packaged with our signature touch, making them the ultimate way to share joy with your loved ones.",
        "category": "Hampers"
    },
    {
        "title": "Raya Essentials",
        "bannerImage": "/images/image-1-m5KMww5a1eHrGa7j.jpg",
        "collectionTitle": "Signature Scarves",
        "collectionDescription": "Discover our most-loved Monogram and Crystal series. Crafted from premium voal for effortless elegance during your Raya celebrations.",
        "category": "Scarves"
    }
]'::jsonb)
ON CONFLICT (key) DO NOTHING;
