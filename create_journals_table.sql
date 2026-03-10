-- Create Journals Table
CREATE TABLE IF NOT EXISTS journals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    image_url TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    published BOOLEAN DEFAULT true,
    
    -- English Content
    title_en TEXT NOT NULL,
    excerpt_en TEXT NOT NULL,
    content_en TEXT NOT NULL,
    category_en TEXT NOT NULL,

    -- Indonesian Content
    title_id TEXT NOT NULL,
    excerpt_id TEXT NOT NULL,
    content_id TEXT NOT NULL,
    category_id TEXT NOT NULL,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE journals ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access on journals" 
ON journals FOR SELECT 
USING (published = true);

-- Insert current articles as seed data
INSERT INTO journals (
    slug, image_url, date, 
    title_en, excerpt_en, content_en, category_en,
    title_id, excerpt_id, content_id, category_id
) VALUES 
(
    'guide-to-premium-voal', 
    '/images/image-1-m5KMww5a1eHrGa7j.jpg', 
    '2026-03-09',
    'The Ultimate Guide to Premium Voal: Why the Eliza Series is a Wardrobe Essential',
    'Discover the secrets behind high-quality voal fabric. Learn why it stays upright on your forehead and how to style it for maximum elegance.',
    '<p>Voal has long been a favorite among hijab-wearing women...</p>', -- (singkat saja untuk contoh)
    'Fabric Guide',
    'Panduan Lengkap Voal Premium: Mengapa Seri Eliza Wajib Ada di Lemari Anda',
    'Temukan rahasia di balik kain voal berkualitas tinggi. Pelajari mengapa ia tetap tegak di dahi dan cara menatanya untuk keanggunan maksimal.',
    '<p>Voal telah lama menjadi favorit di kalangan wanita berhijab...</p>',
    'Panduan Kain'
);
