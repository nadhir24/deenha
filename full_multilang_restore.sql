-- 1. Create Journals Table (Full Multilingual Support)
CREATE TABLE IF NOT EXISTS journals (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    image_url TEXT NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    published BOOLEAN DEFAULT true,
    
    -- ENGLISH (Default)
    title_en TEXT NOT NULL,
    excerpt_en TEXT NOT NULL,
    content_en TEXT NOT NULL,
    category_en TEXT NOT NULL,

    -- INDONESIAN
    title_id TEXT,
    excerpt_id TEXT,
    content_id TEXT,
    category_id TEXT,

    -- FRENCH
    title_fr TEXT,
    excerpt_fr TEXT,
    content_fr TEXT,
    category_fr TEXT,

    -- CHINESE
    title_zh TEXT,
    excerpt_zh TEXT,
    content_zh TEXT,
    category_zh TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Clear old data to prevent duplicates
TRUNCATE TABLE journals;

-- 3. Insert All 5 Articles with Full Translations
INSERT INTO journals (
    slug, image_url, date, 
    
    -- EN
    title_en, excerpt_en, content_en, category_en,
    -- ID
    title_id, excerpt_id, content_id, category_id,
    -- FR
    title_fr, excerpt_fr, content_fr, category_fr,
    -- ZH
    title_zh, excerpt_zh, content_zh, category_zh
) VALUES 

-- ARTICLE 1: PREMIUM VOAL
(
    'guide-to-premium-voal', 
    '/images/image-1-m5KMww5a1eHrGa7j.jpg', 
    '2026-03-09',
    
    -- EN
    'The Ultimate Guide to Premium Voal: Why the Eliza Series is a Wardrobe Essential',
    'Discover the secrets behind high-quality voal fabric. Learn why it stays upright on your forehead and how to style it for maximum elegance.',
    '<p>Voal has long been a favorite among hijab-wearing women, but not all voal is created equal. At DEENHA, we spent months sourcing the perfect blend for our Eliza series. The result? A fabric that redefined our expectations of what a daily scarf can be.</p><h3>What makes Premium Voal different?</h3><p>Most standard voal scarves can feel stiff or, conversely, too limp to hold a shape. Premium voal is characterized by its high thread count and unique weave. This gives the Eliza series its signature ''stay-up'' quality—it stands perfectly on the forehead without needing pins to hold the peak in place.</p>',
    'Fabric Guide',

    -- ID
    'Panduan Lengkap Voal Premium: Mengapa Seri Eliza Wajib Ada di Lemari Anda',
    'Temukan rahasia di balik kain voal berkualitas tinggi. Pelajari mengapa ia tetap tegak di dahi dan cara menatanya untuk keanggunan maksimal.',
    '<p>Voal telah lama menjadi favorit di kalangan wanita berhijab, tetapi tidak semua voal diciptakan sama. Di DEENHA, kami menghabiskan waktu berbulan-bulan untuk mencari campuran yang sempurna untuk seri Eliza kami. Hasilnya? Kain yang mendefinisikan ulang harapan kami tentang apa itu scarf harian.</p><h3>Apa yang membuat Voal Premium berbeda?</h3><p>Kebanyakan scarf voal standar bisa terasa kaku atau, sebaliknya, terlalu lemas untuk mempertahankan bentuknya. Voal premium ditandai dengan jumlah benang yang tinggi dan tenunan yang unik. Ini memberikan seri Eliza kualitas khas ''tegak''—ia berdiri sempurna di dahi tanpa memerlukan jarum pentul untuk menjaga puncaknya tetap di tempatnya.</p>',
    'Panduan Kain',

    -- FR
    'Le Guide Ultime du Voile Premium : Pourquoi la Série Eliza est Essentielle',
    'Découvrez les secrets du tissu voal de haute qualité. Apprenez pourquoi il reste droit sur votre front et comment le coiffer pour une élégance maximale.',
    '<p>Le voile est depuis longtemps un favori parmi les femmes portant le hijab, mais tous les voiles ne se valent pas. Chez DEENHA, nous avons passé des mois à trouver le mélange parfait pour notre série Eliza. Le résultat ? Un tissu qui a redéfini nos attentes.</p><h3>Qu''est-ce qui rend le Voile Premium différent ?</h3><p>La plupart des écharpes en voile standard peuvent sembler raides ou, à l''inverse, trop molles pour tenir une forme. Le voile premium se caractérise par son nombre de fils élevé et son tissage unique. Cela donne à la série Eliza sa qualité signature de "tenue parfaite".</p>',
    'Guide des Tissus',

    -- ZH
    '高级巴里纱终极指南：为什么 Eliza 系列是衣橱必备品',
    '探索优质巴里纱面料背后的秘密。了解为什么它能保持在额头挺立，以及如何打造极致优雅的造型。',
    '<p>巴里纱长期以来一直是戴头巾女性的最爱，但并非所有的巴里纱都是一样的。在 DEENHA，我们花了数月时间为 Eliza 系列寻找完美的混合面料。结果如何？一种重新定义了我们要对日常头巾期望的面料。</p><h3>优质巴里纱有什么不同？</h3><p>大多数标准的巴里纱围巾可能会感觉僵硬，或者相反，太软而无法保持形状。优质巴里纱的特点是高支数和独特的编织工艺。这赋予了 Eliza 系列标志性的“挺立”品质——它可以完美地立在额头上，无需别针固定。</p>',
    '面料指南'
),

-- ARTICLE 2: LUNA SILK
(
    'mastering-luna-silk', 
    '/images/image-2-A85ewwvLJairzx6O.jpg', 
    '2026-03-08',

    -- EN
    'Mastering the Luna Silk: Elegant Draping for Special Occasions',
    'Silk scarves offer a natural sheen and sophisticated drape. Here is your step-by-step guide to maintaining the luxury look of your Luna Silk collection.',
    '<p>There is something undeniably sophisticated about the natural sheen of silk. The Luna Silk Scarf collection was designed for those moments that require an extra touch of luxury—weddings, Eid celebrations, and formal dinners.</p><h3>The Art of the Silk Drape</h3><p>Silk is famous for its flow. Unlike voal, which is structured, silk is all about movement. To master the Luna Silk, focus on styles that allow the fabric to ''puddle'' slightly at the shoulders.</p>',
    'Style Tips',

    -- ID
    'Menguasai Luna Silk: Draping Elegan untuk Acara Spesial',
    'Scarf sutra menawarkan kilau alami dan drape yang canggih. Berikut adalah panduan langkah demi langkah Anda untuk menjaga tampilan mewah koleksi Luna Silk Anda.',
    '<p>Ada sesuatu yang tidak terbantahkan kecanggihannya tentang kilau alami sutra. Koleksi Luna Silk Scarf dirancang untuk saat-saat yang membutuhkan sentuhan kemewahan ekstra—pernikahan, perayaan Idul Fitri, dan makan malam formal.</p><h3>Seni Draping Sutra</h3><p>Sutra terkenal dengan kelembutannya yang mengalir. Berbeda dengan voal yang berstruktur, sutra adalah tentang gerakan. Untuk menguasai Luna Silk, fokuslah pada gaya yang membiarkan kain ''jatuh'' sedikit di bahu.</p>',
    'Tips Gaya',

    -- FR
    'Maîtriser la Soie Luna : Drapé Élégant pour les Occasions Spéciales',
    'Les écharpes en soie offrent un éclat naturel et un drapé sophistiqué. Voici votre guide étape par étape pour entretenir le look luxueux de votre collection Luna Silk.',
    '<p>Il y a quelque chose d''indéniablement sophistiqué dans l''éclat naturel de la soie. La collection Luna Silk a été conçue pour ces moments qui nécessitent une touche de luxe supplémentaire—mariages, célébrations de l''Aïd et dîners formels.</p><h3>L''Art du Drapé de Soie</h3><p>La soie est célèbre pour sa fluidité. Contrairement au voile, qui est structuré, la soie est tout en mouvement.</p>',
    'Conseils de Style',

    -- ZH
    '掌握 Luna 丝绸：特殊场合的优雅垂坠',
    '真丝围巾具有自然光泽和精致的垂坠感。这是您保持 Luna Silk 系列奢华外观的分步指南。',
    '<p>丝绸的自然光泽无可否认地散发着精致气息。Luna Silk 围巾系列专为那些需要额外奢华感的时刻而设计——婚礼、开斋节庆祝活动和正式晚宴。</p><h3>丝绸垂坠的艺术</h3><p>丝绸以其流动性而闻名。与有结构的巴里纱不同，丝绸完全在于动感。</p>',
    '风格建议'
),

-- ARTICLE 3: EID PALETTE
(
    'eid-2026-palette-guide', 
    'https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/Arabic_Series/MAIN_1770873530013_DSCF5668 Copy.jpg', 
    '2026-03-08',

    -- EN
    'Eid 2026: Choosing the Perfect Palette for Your Family Moments',
    'The upcoming holy season is all about serenity. Explore our curated color palettes from the Arabic Series to match your family''s festive look.',
    '<p>Eid is more than a celebration; it''s a collection of memories. This year, the trend shifts toward earthy tones and deep, serene colors that symbolize peace and heritage.</p><h3>The Arabic Series: A Journey in Color</h3><p>Our Arabic Series features deep maroons, sandy beiges, and midnight blues. For families looking to coordinate, we recommend choosing one ''anchor'' color.</p>',
    'Collections',

    -- ID
    'Idul Fitri 2026: Memilih Palet Sempurna untuk Momen Keluarga Anda',
    'Musim suci mendatang adalah tentang ketenangan. Jelajahi palet warna terkurasi kami dari Seri Arab untuk mencocokkan tampilan meriah keluarga Anda.',
    '<p>Idul Fitri lebih dari sekadar perayaan; itu adalah kumpulan kenangan. Tahun ini, tren bergeser ke arah warna-warna bumi dan warna yang dalam dan tenang yang melambangkan kedamaian dan warisan budaya.</p><h3>Seri Arab: Perjalanan dalam Warna</h3><p>Seri Arab kami menampilkan warna merah marun yang dalam, krem pasir, dan biru tengah malam.</p>',
    'Koleksi',

    -- FR
    'Aïd 2026 : Choisir la Palette Parfaite pour Vos Moments en Famille',
    'La prochaine saison sainte est placée sous le signe de la sérénité. Explorez nos palettes de couleurs sélectionnées de la Série Arabe pour assortir le look festif de votre famille.',
    '<p>L''Aïd est plus qu''une célébration ; c''est une collection de souvenirs. Cette année, la tendance s''oriente vers des tons terreux et des couleurs profondes et sereines qui symbolisent la paix et l''héritage.</p>',
    'Collections',

    -- ZH
    '2026 开斋节：为您的家庭时刻选择完美的色调',
    '即将到来的神圣季节充满了宁静。探索我们精选的阿拉伯系列调色板，搭配您家人的节日装扮。',
    '<p>开斋节不仅仅是一个庆祝活动；它是记忆的集合。今年的趋势转向大地色调和深沉、宁静的颜色，象征着和平与传承。</p>',
    '系列'
),

-- ARTICLE 4: TRAVEL ESSENTIALS
(
    'travel-modesty-essentials', 
    '/images/bergo-A1aPwKX8JgfWab9g.png', 
    '2026-03-07',

    -- EN
    'Travel Modesty Made Simple: Why Our Bergo and Pray Set are Must-Haves',
    'Traveling doesn''t mean compromising on modesty. Explore how our ironless Bergos and compact Pray Sets make every journey more peaceful.',
    '<p>Traveling as a hijabi often involves a delicate balance: you want to be comfortable for long flights, but you also need to be ready for prayer and sudden outings. This is where the DEENHA Travel System comes in.</p>',
    'Lifestyle',

    -- ID
    'Kesederhanaan Saat Bepergian: Mengapa Bergo dan Set Mukena Kami Wajib Dimiliki',
    'Bepergian bukan berarti mengabaikan kesopanan. Jelajahi bagaimana Bergo tanpa setrika dan Set Mukena ringkas kami membuat setiap perjalanan lebih damai.',
    '<p>Bepergian sebagai seorang hijabi sering kali melibatkan keseimbangan yang halus: Anda ingin merasa nyaman untuk penerbangan jauh, tetapi Anda juga perlu siap untuk shalat dan kegiatan mendadak.</p>',
    'Gaya Hidup',

    -- FR
    'Voyager en Toute Modestie : Pourquoi Nos Bergo et Sets de Prière sont Indispensables',
    'Voyager ne signifie pas compromettre la modestie. Découvrez comment nos Bergos sans repassage et nos Sets de Prière compacts rendent chaque voyage plus paisible.',
    '<p>Voyager en tant que hijabi implique souvent un équilibre délicat : vous voulez être à l''aise pour les longs vols, mais vous devez aussi être prête pour la prière et les sorties soudaines.</p>',
    'Style de Vie',

    -- ZH
    '旅行端庄变得简单：为什么我们的 Bergo 和祈祷套装是必备品',
    '旅行并不意味着在端庄上妥协。探索我们的免烫 Bergo 和紧凑型祈祷套装如何让每一次旅程更加宁静。',
    '<p>作为一个戴头巾的女性旅行通常涉及微妙的平衡：你想要长途飞行的舒适，但也需要随时准备祈祷和突然的外出。</p>',
    '生活方式'
),

-- ARTICLE 5: MONOGRAM
(
    'monogram-professional-style', 
    '/images/1770655455962_IMG_3048.jpg', 
    '2026-03-06',

    -- EN
    'The Power of Monogram: Elevating Your Professional Modest Look',
    'Make a statement in the boardroom. Our Monogram D series combines bold identity with subtle elegance for the modern working woman.',
    '<p>In a professional setting, your attire is your silent introduction. The Monogram D Series was created for the woman who wants to project confidence and refined taste without sacrificing her values.</p>',
    'Style Tips',

    -- ID
    'Kekuatan Monogram: Meningkatkan Tampilan Modest Profesional Anda',
    'Berikan pernyataan di ruang rapat. Seri Monogram D kami memadukan identitas yang berani dengan keanggunan halus untuk wanita pekerja modern.',
    '<p>Dalam lingkungan profesional, pakaian Anda adalah perkenalan diam Anda. Seri Monogram D diciptakan untuk wanita yang ingin memancarkan kepercayaan diri dan selera yang halus.</p>',
    'Tips Gaya',

    -- FR
    'Le Pouvoir du Monogramme : Élever Votre Look Professionnel Modeste',
    'Faites une déclaration dans la salle de réunion. Notre série Monogram D allie une identité audacieuse à une élégance subtile pour la femme active moderne.',
    '<p>Dans un cadre professionnel, votre tenue est votre introduction silencieuse. La série Monogram D a été créée pour la femme qui veut projeter confiance et goût raffiné.</p>',
    'Conseils de Style',

    -- ZH
    '字母图案的力量：提升您的职业端庄形象',
    '在会议室里发表声明。我们的 Monogram D 系列为现代职业女性结合了大的身份和微妙的优雅。',
    '<p>在职业环境中，你的着装是你无声的介绍。Monogram D 系列专为那些想要展现自信和精致品味而不牺牲价值观的女性而创造。</p>',
    '风格建议'
);
