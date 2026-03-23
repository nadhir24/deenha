
-- ==========================================
-- 1. SETUP TABEL DASAR & KEAMANAN (RLS)
-- ==========================================

-- Tabel Produk
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    name_en TEXT,
    name_id TEXT,
    name_fr TEXT,
    name_zh TEXT,
    price NUMERIC NOT NULL,
    original_price NUMERIC,
    image TEXT NOT NULL,
    category TEXT NOT NULL,
    category_en TEXT,
    category_id TEXT,
    category_fr TEXT,
    category_zh TEXT,
    size TEXT[] DEFAULT '{}',
    color TEXT,
    color_hex TEXT,
    badge TEXT,
    sold_count INTEGER DEFAULT 0,
    stock INTEGER DEFAULT 0,
    description TEXT,
    description_en TEXT,
    description_id TEXT,
    description_fr TEXT,
    description_zh TEXT,
    variants JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Journals (Articles)
CREATE TABLE IF NOT EXISTS journals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    image_url TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    published BOOLEAN DEFAULT true,
    title_en TEXT NOT NULL,
    excerpt_en TEXT NOT NULL,
    content_en TEXT NOT NULL,
    category_en TEXT NOT NULL,
    title_id TEXT,
    excerpt_id TEXT,
    content_id TEXT,
    category_id TEXT,
    title_fr TEXT,
    excerpt_fr TEXT,
    content_fr TEXT,
    category_fr TEXT,
    title_zh TEXT,
    excerpt_zh TEXT,
    content_zh TEXT,
    category_zh TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel FAQs
CREATE TABLE IF NOT EXISTS faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question_en TEXT NOT NULL,
    answer_en TEXT NOT NULL,
    question_id TEXT,
    answer_id TEXT,
    question_fr TEXT,
    answer_fr TEXT,
    question_zh TEXT,
    answer_zh TEXT,
    category TEXT DEFAULT 'General',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabel Orders
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    order_number TEXT UNIQUE NOT NULL,
    items JSONB NOT NULL,
    total_price NUMERIC NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    customer_phone TEXT,
    notes TEXT,
    stock_deducted BOOLEAN DEFAULT FALSE
);

-- KEAMANAN (Row Level Security)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Publik bisa baca
CREATE POLICY "Allow public read access" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON journals FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON faqs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON site_settings FOR SELECT USING (true);

-- Policy: Admin Bisa Edit (Authenticated)
CREATE POLICY "Allow admin manage" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin manage" ON journals FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin manage" ON faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin manage" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow admin manage" ON orders FOR ALL USING (auth.role() = 'authenticated');

-- Policy: Pelanggan Bisa Buat Order (Insert Only)
CREATE POLICY "Allow anonymous inserts" ON orders FOR INSERT WITH CHECK (true);


-- ==========================================
-- 2. INSERT DATA AWAL (SEEDING)
-- ==========================================

-- Kosongkan jika ada sisa (untuk fresh install)
TRUNCATE products, journals, faqs, site_settings RESTART IDENTITY CASCADE;

-- Masukkan Produk (Dari seed.cjs)
INSERT INTO products (name, price, image, category, size, color, color_hex, badge, sold_count, stock) VALUES 
('Eliza Premium Voal Scarf', 189000, '/images/image-1-m5KMww5a1eHrGa7j.jpg', 'Scarves', '{110x110}', 'Dusty Rose', '#D4A5A5', 'new', 45, 20),
('Luna Silk Scarf Collection', 259000, '/images/image-2-A85ewwvLJairzx6O.jpg', 'Scarves', '{115x115}', 'Sage Green', '#9CAF88', 'bestseller', 128, 50),
('Amira Cotton Bergo', 149000, '/images/bergo-A1aPwKX8JgfWab9g.png', 'Bergo', '{S,M,L}', 'Black', '#1A1A1A', NULL, 89, 100),
('Zahra Elegant Dress', 459000, '/images/dress-YD0l6pXPkZSqM41l.png', 'Dresses', '{S,M,L,XL}', 'Navy', '#2C3E50', 'sale', 67, 30),
('Fatima Premium Pray Set', 389000, '/images/prayset-mnlWv3KxDvf1NbQn.png', 'Pray Set', '{All Size}', 'White', '#FFFFFF', 'bestseller', 234, 15);

-- Masukkan FAQ
INSERT INTO faqs (question_en, answer_en, question_id, answer_id, category, sort_order) VALUES 
('What materials do you use?', 'Premium voal, silk, and jersey.', 'Bahan apa yang digunakan?', 'Voal premium, sutra, dan jersey.', 'Product', 1),
('Do you ship internationally?', 'Yes, to over 50 countries.', 'Apakah melayani pengiriman internasional?', 'Ya, ke lebih dari 50 negara.', 'Shipping', 2);

-- Masukkan Site Settings
INSERT INTO site_settings (key, value) VALUES 
('announcements', '["🌙 Pre-Raya Special: Luxury Hampers", "🌍 International Shipping Available"]'::jsonb),
('hero_slides', '[{"type": "video", "src": "/images/promo_video.mp4", "title": "New Collection"}]'::jsonb);

-- Masukkan Journals (Contoh satu saja)
INSERT INTO journals (slug, image_url, date, title_en, excerpt_en, content_en, category_en, title_id, excerpt_id, content_id, category_id) VALUES 
('guide-to-premium-voal', '/images/image-1-m5KMww5a1eHrGa7j.jpg', '2026-03-09',
'The Ultimate Guide to Premium Voal', 'Discover the secrets behind high-quality voal fabric.', '<p>Voal has long been a favorite...</p>', 'Fabric Guide',
'Panduan Lengkap Voal Premium', 'Temukan rahasia di balik kain voal berkualitas tinggi.', '<p>Voal telah lama menjadi favorit...</p>', 'Panduan Kain');

-- ==========================================
-- SELESAI
-- ==========================================
