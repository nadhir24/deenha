-- 1. Buat Tabel Jurnal (Jika belum ada)
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
    title_id TEXT NOT NULL,
    excerpt_id TEXT NOT NULL,
    content_id TEXT NOT NULL,
    category_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Hapus data lama agar tidak duplikat saat dijalankan ulang
TRUNCATE TABLE journals;

-- 3. Masukkan SEMUA 5 Artikel Jurnal Anda
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
    '<p>Voal has long been a favorite among hijab-wearing women, but not all voal is created equal. At DEENHA, we spent months sourcing the perfect blend for our Eliza series. The result? A fabric that redefined our expectations of what a daily scarf can be.</p><h3>What makes Premium Voal different?</h3><p>Most standard voal scarves can feel stiff or, conversely, too limp to hold a shape. Premium voal is characterized by its high thread count and unique weave. This gives the Eliza series its signature ''stay-up'' quality—it stands perfectly on the forehead without needing pins to hold the peak in place.</p>',
    'Fabric Guide',
    'Panduan Lengkap Voal Premium: Mengapa Seri Eliza Wajib Ada di Lemari Anda',
    'Temukan rahasia di balik kain voal berkualitas tinggi. Pelajari mengapa ia tetap tegak di dahi dan cara menatanya untuk keanggunan maksimal.',
    '<p>Voal telah lama menjadi favorit di kalangan wanita berhijab, tetapi tidak semua voal diciptakan sama. Di DEENHA, kami menghabiskan waktu berbulan-bulan untuk mencari campuran yang sempurna untuk seri Eliza kami. Hasilnya? Kain yang mendefinisikan ulang harapan kami tentang apa itu scarf harian.</p><h3>Apa yang membuat Voal Premium berbeda?</h3><p>Kebanyakan scarf voal standar bisa terasa kaku atau, sebaliknya, terlalu lemas untuk mempertahankan bentuknya. Voal premium ditandai dengan jumlah benang yang tinggi dan tenunan yang unik. Ini memberikan seri Eliza kualitas khas ''tegak''—ia berdiri sempurna di dahi tanpa memerlukan jarum pentul untuk menjaga puncaknya tetap di tempatnya.</p>',
    'Panduan Kain'
),
(
    'mastering-luna-silk', 
    '/images/image-2-A85ewwvLJairzx6O.jpg', 
    '2026-03-08',
    'Mastering the Luna Silk: Elegant Draping for Special Occasions',
    'Silk scarves offer a natural sheen and sophisticated drape. Here is your step-by-step guide to maintaining the luxury look of your Luna Silk collection.',
    '<p>There is something undeniably sophisticated about the natural sheen of silk. The Luna Silk Scarf collection was designed for those moments that require an extra touch of luxury.</p>',
    'Style Tips',
    'Menguasai Luna Silk: Draping Elegan untuk Acara Spesial',
    'Scarf sutra menawarkan kilau alami dan drape yang canggih. Berikut adalah panduan langkah demi langkah Anda untuk menjaga tampilan mewah koleksi Luna Silk Anda.',
    '<p>Ada sesuatu yang tidak terbantahkan kecanggihannya tentang kilau alami sutra. Koleksi Luna Silk Scarf dirancang untuk saat-saat yang membutuhkan sentuhan kemewahan ekstra.</p>',
    'Tips Gaya'
),
(
    'eid-2026-palette-guide', 
    'https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/Arabic_Series/MAIN_1770873530013_DSCF5668%20Copy.jpg', 
    '2026-03-08',
    'Eid 2026: Choosing the Perfect Palette for Your Family Moments',
    'The upcoming holy season is all about serenity. Explore our curated color palettes from the Arabic Series to match your family''s festive look.',
    '<p>Eid is more than a celebration; it''s a collection of memories. This year, the trend shifts toward earthy tones and deep, serene colors.</p>',
    'Collections',
    'Idul Fitri 2026: Memilih Palet Sempurna untuk Momen Keluarga Anda',
    'Musim suci mendatang adalah tentang ketenangan. Jelajahi palet warna terkurasi kami dari Seri Arab untuk mencocokkan tampilan meriah keluarga Anda.',
    '<p>Idul Fitri lebih dari sekadar perayaan; itu adalah kumpulan kenangan. Tahun ini, tren bergeser ke arah warna-warna bumi dan warna yang dalam dan tenang.</p>',
    'Koleksi'
),
(
    'travel-modesty-essentials', 
    '/images/bergo-A1aPwKX8JgfWab9g.png', 
    '2026-03-07',
    'Travel Modesty Made Simple: Why Our Bergo and Pray Set are Must-Haves',
    'Traveling doesn''t mean compromising on modesty. Explore how our ironless Bergos and compact Pray Sets make every journey more peaceful.',
    '<p>Traveling as a hijabi often involves a delicate balance: you want to be comfortable for long flights, but you also need to be ready for prayer.</p>',
    'Lifestyle',
    'Kesederhanaan Saat Bepergian: Mengapa Bergo dan Set Mukena Kami Wajib Dimiliki',
    'Bepergian bukan berarti mengabaikan kesopanan. Jelajahi bagaimana Bergo tanpa setrika dan Set Mukena ringkas kami membuat setiap perjalanan lebih damai.',
    '<p>Bepergian sebagai seorang hijabi sering kali melibatkan keseimbangan yang halus: Anda ingin merasa nyaman untuk penerbangan jauh, tetapi Anda juga perlu siap untuk shalat.</p>',
    'Gaya Hidup'
),
(
    'monogram-professional-style', 
    'https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/Monogram_D_Series/1770655455962_IMG_3048.jpg', 
    '2026-03-06',
    'The Power of Monogram: Elevating Your Professional Modest Look',
    'Make a statement in the boardroom. Our Monogram D series combines bold identity with subtle elegance for the modern working woman.',
    '<p>In a professional setting, your attire is your silent introduction. The Monogram D Series was created for the woman who wants to project confidence.</p>',
    'Style Tips',
    'Kekuatan Monogram: Meningkatkan Tampilan Modest Profesional Anda',
    'Berikan pernyataan di ruang rapat. Seri Monogram D kami memadukan identitas yang berani dengan keanggunan halus untuk wanita pekerja modern.',
    '<p>Dalam lingkungan profesional, pakaian Anda adalah perkenalan diam Anda. Seri Monogram D diciptakan untuk wanita yang ingin memancarkan kepercayaan diri.</p>',
    'Tips Gaya'
);
