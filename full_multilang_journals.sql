-- 1. Create Journals Table (with all 4 languages)
CREATE TABLE IF NOT EXISTS journals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    image_url TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    published BOOLEAN DEFAULT true,
    
    -- ENGLISH (EN)
    title_en TEXT NOT NULL,
    excerpt_en TEXT NOT NULL,
    content_en TEXT NOT NULL,
    category_en TEXT NOT NULL,

    -- INDONESIAN (ID)
    title_id TEXT NOT NULL,
    excerpt_id TEXT NOT NULL,
    content_id TEXT NOT NULL,
    category_id TEXT NOT NULL,

    -- FRENCH (FR)
    title_fr TEXT,
    excerpt_fr TEXT,
    content_fr TEXT,
    category_fr TEXT,

    -- CHINESE (ZH)
    title_zh TEXT,
    excerpt_zh TEXT,
    content_zh TEXT,
    category_zh TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Clear old data
TRUNCATE TABLE journals;

-- 3. Insert All 5 Articles
INSERT INTO journals (
    slug, image_url, date, 
    title_en, excerpt_en, content_en, category_en,
    title_id, excerpt_id, content_id, category_id,
    title_fr, excerpt_fr, content_fr, category_fr,
    title_zh, excerpt_zh, content_zh, category_zh
) VALUES 
(
    'guide-to-premium-voal', 
    '/images/image-1-m5KMww5a1eHrGa7j.jpg', 
    '2026-03-09',
    -- EN
    'The Ultimate Guide to Premium Voal: Why the Eliza Series is a Wardrobe Essential',
    'Discover the secrets behind high-quality voal fabric...',
    '<p>Voal has long been a favorite...</p>',
    'Fabric Guide',
    -- ID
    'Panduan Lengkap Voal Premium: Mengapa Seri Eliza Wajib Ada di Lemari Anda',
    'Temukan rahasia di balik kain voal berkualitas tinggi...',
    '<p>Voal telah lama menjadi favorit...</p>',
    'Panduan Kain',
    -- FR (Contoh)
    'Guide Complet du Voile Premium: Pourquoi Eliza est Essentielle',
    'Découvrez les secrets du tissu voal de haute qualité...',
    '<p>Le voile est un favori depuis longtemps...</p>',
    'Guide des Tissus',
    -- ZH (Contoh)
    '高级巴里纱指南：为什么 Eliza 系列是衣橱必备品',
    '探索优质巴里纱面料背后的秘密...',
    '<p>巴里纱长期以来一直是戴头巾女性最喜欢的...</p>',
    '面料指南'
),
-- (Artikel lainnya saya singkat, Anda bisa isi nanti via admin atau database)
(
    'mastering-luna-silk', '/images/image-2-A85ewwvLJairzx6O.jpg', '2026-03-08',
    'Mastering the Luna Silk: Elegant Draping for Special Occasions', 'Silk scarves offer a natural sheen...', '<p>Content...</p>', 'Style Tips',
    'Menguasai Luna Silk: Draping Elegan untuk Acara Spesial', 'Scarf sutra menawarkan kilau alami...', '<p>Konten...</p>', 'Tips Gaya',
    NULL, NULL, NULL, NULL, -- Kosongkan dulu untuk FR
    NULL, NULL, NULL, NULL  -- Kosongkan dulu untuk ZH
),
(
    'eid-2026-palette-guide', 'https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/Arabic_Series/MAIN_1770873530013_DSCF5668 Copy.jpg', '2026-03-08',
    'Eid 2026: Choosing the Perfect Palette', 'Explore curated color palettes...', '<p>Content...</p>', 'Collections',
    'Idul Fitri 2026: Memilih Palet Sempurna', 'Jelajahi palet warna terkurasi...', '<p>Konten...</p>', 'Koleksi',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL
),
(
    'travel-modesty-essentials', '/images/bergo-A1aPwKX8JgfWab9g.png', '2026-03-07',
    'Travel Modesty Made Simple', 'Traveling doesn''t mean compromising...', '<p>Content...</p>', 'Lifestyle',
    'Kesederhanaan Saat Bepergian', 'Bepergian bukan berarti mengabaikan...', '<p>Konten...</p>', 'Gaya Hidup',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL
),
(
    'monogram-professional-style', '/images/1770655455962_IMG_3048.jpg', '2026-03-06',
    'The Power of Monogram', 'Make a statement in the boardroom...', '<p>Content...</p>', 'Style Tips',
    'Kekuatan Monogram', 'Berikan pernyataan di ruang rapat...', '<p>Konten...</p>', 'Tips Gaya',
    NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL
);
