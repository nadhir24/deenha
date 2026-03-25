export interface JournalArticle {
    id: string;
    slug: string;
    image_url: string;
    date: string;
    published: boolean;
    title_en: string;
    excerpt_en: string;
    content_en: string;
    category_en: string;
    title_id: string;
    excerpt_id: string;
    content_id: string;
    category_id: string;
    title?: string;
    excerpt?: string;
    content?: string;
    category?: string;
    [key: string]: any;
}

export const journals: JournalArticle[] = [
    {
        id: "1",
        slug: "cara-memilih-hijab-voal-premium",
        image_url: "/images/image-1-m5KMww5a1eHrGa7j.jpg",
        date: "2026-03-24",
        published: true,
        title_en: "How to Choose a Premium Voal Hijab: The Complete Buyer's Guide",
        excerpt_en: "Not all voal hijabs are created equal. Learn what separates premium quality voal from everyday fabric — and why it matters for your daily look.",
        content_en: `<h2>What Makes Voal Hijab 'Premium'?</h2><p>When shopping for a voal hijab, it can be tempting to go for the cheapest option available. But premium voal — the kind used in DEENHA's Eliza and Safa collections — offers a noticeably different experience in terms of texture, drape, and longevity.</p><h2>Key Indicators of High-Quality Voal</h2><ul><li><strong>Thread count:</strong> Higher thread counts mean a smoother, more lustrous finish that photographs beautifully.</li><li><strong>Weight and drape:</strong> Quality voal falls effortlessly, creating natural folds without bunching.</li><li><strong>Colorfastness:</strong> Premium voal holds its color through multiple washes, unlike cheaper alternatives that fade quickly.</li><li><strong>Inner lining:</strong> A good voal hijab often features a lightweight inner layer to prevent slipping without adding bulk.</li></ul><h2>How to Test Voal Quality In-Store or Online</h2><p>When shopping in person, hold the fabric up to the light. A high-quality voal will be semi-sheer with an even weave, free of knots or inconsistencies. When shopping online, check the fabric weight listed in grams (gsm). For everyday wear, 65–80 gsm strikes the ideal balance between coverage and breathability.</p><h2>Why DEENHA Voal Stands Apart</h2><p>DEENHA sources only certified premium voal for our Eliza and Safa Printed Scarf collections. Every piece is pre-washed for softness, pre-shrunk for a perfect fit, and finished with hand-rolled or laser-cut edges for a polished look that lasts season after season.</p>`,
        category_en: "Fabric Guide",
        title_id: "Cara Memilih Hijab Voal Premium: Panduan Lengkap Pembeli",
        excerpt_id: "Tidak semua hijab voal sama. Pelajari apa yang membedakan kualitas voal premium dari kain biasa — dan mengapa itu penting untuk tampilan harian Anda.",
        content_id: `<h2>Apa yang Membuat Hijab Voal 'Premium'?</h2><p>Saat berbelanja hijab voal, mungkin tergoda untuk memilih opsi termurah. Namun voal premium — seperti yang digunakan dalam koleksi Eliza dan Safa DEENHA — menawarkan pengalaman yang sangat berbeda dalam hal tekstur, jatuhnya kain, dan ketahanan.</p><h2>Indikator Utama Voal Berkualitas Tinggi</h2><ul><li><strong>Jumlah benang:</strong> Jumlah benang yang lebih tinggi menghasilkan hasil akhir yang lebih halus dan berkilau, indah saat difoto.</li><li><strong>Berat dan jatuh kain:</strong> Voal berkualitas jatuh dengan mudah, menciptakan lipatan alami tanpa menggelembung.</li><li><strong>Ketahanan warna:</strong> Voal premium mempertahankan warnanya melalui banyak kali cuci, tidak seperti alternatif murah yang cepat pudar.</li><li><strong>Lapisan dalam:</strong> Hijab voal yang baik sering memiliki lapisan dalam ringan untuk mencegah tergelincir tanpa menambah volume.</li></ul><h2>Cara Menguji Kualitas Voal</h2><p>Saat berbelanja langsung, pegang kain menghadap cahaya. Voal berkualitas tinggi akan semi-transparan dengan anyaman merata, bebas dari simpul atau ketidakkonsistenan. Saat berbelanja online, periksa berat kain yang tercantum dalam gram (gsm). Untuk pemakaian sehari-hari, 65–80 gsm mencapai keseimbangan ideal antara penutupan dan kenyamanan.</p>`,
        category_id: "Panduan Kain"
    },
    {
        id: "2",
        slug: "tutorial-lilit-hijab-segi-empat",
        image_url: "/images/image-2-A85ewwvLJairzx6O.jpg",
        date: "2026-03-23",
        published: true,
        title_en: "5 Effortless Square Hijab Styles for Every Occasion",
        excerpt_en: "From boardroom to brunch — master five versatile square hijab styles that take less than 5 minutes each.",
        content_en: `<h2>Why Square Hijabs Are a Wardrobe Staple</h2><p>Square hijabs — including the 115x115 cm format used by DEENHA — are remarkably versatile. Their symmetrical shape allows for dozens of styling variations, from structured office looks to relaxed casual drapes.</p><h2>Style 1: The Classic Paris Fold</h2><p>Fold your square hijab diagonally into a triangle. Place the folded edge at your forehead, bring both ends around your neck, then tuck or pin at the side. Perfect for formal occasions.</p><h2>Style 2: The Turkish Style</h2><p>Great for thicker or patterned fabrics like DEENHA's Cairo Series. Fold into a triangle, pin at the chin, then wrap each end across your chest and pin at the shoulder for a structured, modest look.</p><h2>Style 3: The Layered Side Drape</h2><p>Place the hijab asymmetrically with more length on one side. Wrap the shorter end around your head and secure, then let the longer end drape naturally over one shoulder. Effortlessly elegant for events.</p><h2>Style 4: The Puff Crown</h2><p>Pull your inner cap slightly forward at the crown before laying your square hijab over it to create volume at the top. Particularly stunning with DEENHA's Hagia Sophia Series in Lavender or Blue Mosaic.</p><h2>Style 5: The Simple Tuck</h2><p>The fastest style — fold into a triangle, place on head, and tuck both ends loosely at the back. Ideal for grocery runs or busy mornings when every minute counts.</p>`,
        category_en: "Style Tips",
        title_id: "5 Gaya Hijab Segi Empat yang Mudah untuk Setiap Kesempatan",
        excerpt_id: "Dari rapat kerja hingga brunch — kuasai lima gaya hijab segi empat serbaguna yang masing-masing membutuhkan kurang dari 5 menit.",
        content_id: `<h2>Mengapa Hijab Segi Empat adalah Pokok Lemari Pakaian</h2><p>Hijab segi empat — termasuk format 115x115 cm yang digunakan DEENHA — sangat serbaguna. Bentuknya yang simetris memungkinkan puluhan variasi gaya, dari tampilan kantor yang terstruktur hingga draping kasual yang santai.</p><h2>Gaya 1: Lipatan Paris Klasik</h2><p>Lipat hijab segi empat Anda secara diagonal menjadi segitiga. Letakkan tepi yang dilipat di dahi Anda, bawa kedua ujungnya mengelilingi leher, lalu selipkan atau sematkan di samping. Sempurna untuk acara formal.</p><h2>Gaya 2: Gaya Turki</h2><p>Cocok untuk kain yang lebih tebal atau bermotif seperti Cairo Series DEENHA. Lipat menjadi segitiga, sematkan di dagu, lalu bungkus masing-masing ujung melintasi dada dan sematkan di bahu untuk tampilan yang terstruktur dan sopan.</p>`,
        category_id: "Tips Gaya"
    },
    {
        id: "3",
        slug: "koleksi-warisan-nusantara-batik-hijab",
        image_url: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Kawung Scarves Series/IMG_6310.jpg",
        date: "2026-03-22",
        published: true,
        title_en: "Warisan Nusantara: How Indonesian Heritage Inspires DEENHA's Batik Scarf Collections",
        excerpt_en: "Kawung, Parang, Songket, Borneo — discover the rich cultural stories woven into every DEENHA Warisan Nusantara scarf.",
        content_en: `<h2>The Story Behind Warisan Nusantara</h2><p>Indonesia's textile heritage is among the richest in the world. From the geometric precision of Kawung to the dynamic diagonal lines of Parang, each pattern carries centuries of meaning. DEENHA's Warisan Nusantara collection was born from a desire to honour that legacy — adapting timeless motifs into wearable, modern scarves designed for the Muslim woman of today.</p><h2>Kawung: Symbol of Royalty</h2><p>The Kawung pattern — four oval shapes arranged around a central point — originates from the royal courts of Central Java. In the DEENHA Kawung Scarves, this motif is rendered in sophisticated earthy tones: Dusty Rose, Sage Grey, Maroon Beige, and Dark Teal.</p><h2>Parang: Strength in Motion</h2><p>Parang's characteristic diagonal blade-like design symbolises strength, perseverance, and the continuous flow of water. Available in Camel, Emerald Teal, Blue Turquoise, and Dusty Pink — the DEENHA Parang Scarves pair beautifully with neutral abayas and dresses.</p><h2>Songket: Gold Threads of Minang Culture</h2><p>Traditionally woven with gold and silver threads in Minangkabau culture, Songket represents prosperity and celebration. Our Songket Scarves interpret this tradition in four contemporary colourways: Navy Blue, Rose Pink, Teal Brown, and Lilac Grey.</p><h2>Borneo & Lombok: Celebrating Diversity</h2><p>Beyond Java, the Warisan Nusantara collection extends to the rich textiles of Borneo and the vibrant weaving traditions of Lombok. Each piece is a tribute to the extraordinary diversity of Indonesian craftsmanship.</p>`,
        category_en: "Collections",
        title_id: "Warisan Nusantara: Bagaimana Warisan Indonesia Menginspirasi Koleksi Batik Scarf DEENHA",
        excerpt_id: "Kawung, Parang, Songket, Borneo — temukan kisah budaya kaya yang terjalin dalam setiap scarf Warisan Nusantara DEENHA.",
        content_id: `<h2>Kisah di Balik Warisan Nusantara</h2><p>Warisan tekstil Indonesia adalah salah satu yang terkaya di dunia. Dari presisi geometris Kawung hingga garis diagonal dinamis Parang, setiap motif membawa makna berabad-abad. Koleksi Warisan Nusantara DEENHA lahir dari keinginan untuk menghormati warisan tersebut — mengadaptasi motif abadi menjadi scarf modern yang dapat dipakai, dirancang untuk wanita Muslim masa kini.</p><h2>Kawung: Simbol Keanggunan Kraton</h2><p>Motif Kawung — empat bentuk oval yang tersusun di sekitar titik tengah — berasal dari istana kerajaan Jawa Tengah. Dalam DEENHA Kawung Scarves, motif ini dirender dalam warna bumi yang canggih: Dusty Rose, Sage Grey, Maroon Beige, dan Dark Teal.</p><h2>Parang: Kekuatan dalam Gerak</h2><p>Desain diagonal khas Parang yang menyerupai bilah melambangkan kekuatan, ketekunan, dan aliran air yang terus-menerus. Tersedia dalam Camel, Emerald Teal, Blue Turquoise, dan Dusty Pink — DEENHA Parang Scarves sangat cocok dipadukan dengan abaya dan gaun netral.</p>`,
        category_id: "Koleksi"
    },
    {
        id: "4",
        slug: "hijab-untuk-lebaran-idul-fitri-2026",
        image_url: "/images/CAIRO SERIES-20260211T044831Z-1-001/CAIRO SERIES/DSCF2139 Copy.jpg",
        date: "2026-03-21",
        published: true,
        title_en: "The Ultimate Eid Al-Fitr 2026 Hijab Style Guide",
        excerpt_en: "Eid is 30 days away. Here's how to choose the perfect scarf, colour palette, and outfit combination to make this Eid your most stylish yet.",
        content_en: `<h2>Planning Your Eid Look Starts Now</h2><p>Raya season is the most important fashion moment of the year for Muslim women worldwide. With just weeks to go, now is the ideal time to finalise your Eid outfit — especially your hijab, which sets the tone for your entire ensemble.</p><h2>2026 Eid Colour Trends</h2><p>This year's dominant palette leans towards warmed neutrals and rich jewel tones. Think Sage Teal, Lavender, Dusty Rose, and deep Emerald — all colours featured prominently in DEENHA's heritage and classic collections. Muted earth tones continue to dominate modern Muslim fashion, complementing the soft silhouettes of this season's modest dresses.</p><h2>Matching Your Hijab to Your Outfit</h2><ul><li><strong>Pastel dresses:</strong> Pair with a contrasting Sage Teal (Cairo Series) or Lavender (Hagia Sophia Series) scarf for a fresh, modern look.</li><li><strong>Rich jewel-tone dresses:</strong> Opt for a neutral Beige Gold (Kintsugi Japan Series) to prevent clashing while maintaining elegance.</li><li><strong>All-white outfits:</strong> Any coloured scarf from the Warisan Nusantara collection adds a cultural accent that photographs beautifully at open houses.</li></ul><h2>Don't Forget Texture</h2><p>Eid photos last forever — make sure your hijab's texture reads well in pictures. Silk-blend and voal hijabs like DEENHA's premium scarves have a slight sheen that catches light beautifully, making you look polished both in person and on camera.</p>`,
        category_en: "Collections",
        title_id: "Panduan Gaya Hijab Idul Fitri 2026 Terlengkap",
        excerpt_id: "Lebaran tinggal 30 hari. Berikut cara memilih scarf, palet warna, dan kombinasi busana yang sempurna untuk menjadikan Lebaran ini yang paling stylish.",
        content_id: `<h2>Merencanakan Penampilan Lebaran Dimulai Sekarang</h2><p>Musim Lebaran adalah momen fashion terpenting dalam setahun bagi wanita Muslim di seluruh dunia. Dengan hanya beberapa minggu lagi, sekarang adalah waktu ideal untuk menyelesaikan pakaian Lebaran Anda — terutama hijab Anda, yang menentukan keseluruhan penampilan.</p><h2>Tren Warna Lebaran 2026</h2><p>Palet dominan tahun ini condong ke arah netral hangat dan warna batu permata yang kaya. Pikirkan Sage Teal, Lavender, Dusty Rose, dan Emerald yang dalam — semua warna yang ditampilkan secara menonjol dalam koleksi warisan dan klasik DEENHA. Warna bumi yang lembut terus mendominasi fashion muslim modern, melengkapi siluet lembut dari gaun modest musim ini.</p>`,
        category_id: "Koleksi"
    },
    {
        id: "5",
        slug: "merawat-hijab-agar-awet",
        image_url: "/images/image-product-2-d951KrVPy9CvgLle.jpg",
        date: "2026-03-20",
        published: true,
        title_en: "How to Care for Your Hijab to Make It Last for Years",
        excerpt_en: "A premium hijab is an investment. Follow these expert washing, drying, and storage tips to keep your DEENHA scarves looking brand-new.",
        content_en: `<h2>Washing: The Most Important Step</h2><p>The most common reason premium hijabs degrade prematurely is incorrect washing. Here's the golden rule: hand wash your voal and silk-blend scarves in cold water with a gentle, pH-neutral detergent. Machine washing — even on delicate cycles — creates friction that damages fine weaves over time.</p><h2>Step-by-Step Hand Washing Guide</h2><ol><li>Fill a basin with cool water and add a small amount of delicate fabric wash.</li><li>Submerge the hijab and gently swirl — never wring or scrub.</li><li>Allow to soak for 5 minutes maximum.</li><li>Rinse thoroughly with cool water until all soap is removed.</li><li>Press gently between two clean towels to remove excess water. Never twist.</li></ol><h2>Drying: Air is Your Best Friend</h2><p>Never tumble dry your scarves. Instead, lay them flat on a clean dry towel or hang them on a padded hanger in a shaded, well-ventilated area. Direct sunlight causes colour fading, especially on rich-toned voal like DEENHA's Cairo and Hagia Sophia Series.</p><h2>Ironing and Steaming</h2><p>Use a steamer rather than a dry iron for DEENHA voal and silk-blend scarves. If you must iron, use the lowest heat setting and always place a clean cotton cloth between the iron and the fabric. Never iron directly on printed or embroidered areas.</p><h2>Storage Tips</h2><p>Fold scarves loosely and store flat in a drawer, or roll them to prevent crease lines. Avoid wire hangers — they leave permanent shoulder marks. For long-term storage, wrap your scarves in acid-free tissue paper to maintain their colour and structure.</p>`,
        category_en: "Care Guide",
        title_id: "Cara Merawat Hijab agar Tahan Lama Bertahun-tahun",
        excerpt_id: "Hijab premium adalah investasi. Ikuti tips mencuci, mengeringkan, dan menyimpan ini agar scarf DEENHA Anda tetap tampak baru.",
        content_id: `<h2>Mencuci: Langkah Terpenting</h2><p>Penyebab paling umum hijab premium cepat rusak adalah cara mencuci yang salah. Ini adalah aturan emasnya: cuci tangan scarf voal dan silk-blend Anda dengan air dingin menggunakan deterjen lembut pH-netral. Mencuci dengan mesin — bahkan pada siklus halus sekalipun — menciptakan gesekan yang merusak anyaman halus dari waktu ke waktu.</p><h2>Panduan Langkah demi Langkah Mencuci Tangan</h2><ol><li>Isi baskom dengan air dingin dan tambahkan sedikit sabun cuci kain lembut.</li><li>Rendam hijab dan aduk perlahan — jangan peras atau gosok.</li><li>Biarkan merendam maksimal 5 menit.</li><li>Bilas secara menyeluruh dengan air dingin hingga semua sabun hilang.</li><li>Tekan perlahan di antara dua handuk bersih untuk menghilangkan kelebihan air. Jangan diputar.</li></ol>`,
        category_id: "Panduan Perawatan"
    },
    {
        id: "6",
        slug: "gaya-hijab-kantor-profesional",
        image_url: "/images/image-product-4-Yan1yzVZD4UvpqW3.jpg",
        date: "2026-03-19",
        published: true,
        title_en: "Professional Hijab Styles for the Modern Working Woman",
        excerpt_en: "Looking polished and modest in the workplace doesn't require a compromise. Here are our top picks for office-ready hijab styles.",
        content_en: `<h2>Why Hijab Styling Matters at Work</h2><p>First impressions in a professional setting are formed within seconds. A well-styled hijab communicates confidence, intentionality, and attention to detail — qualities valued in any workplace. The key is choosing fabrics and colours that read as 'put together' under office lighting.</p><h2>Best Fabrics for the Office</h2><p>For corporate environments, semi-structured fabrics that hold their shape throughout a long work day are ideal. DEENHA's voal-based scarves (Eliza, Safa, Khadijah Chiffon) are excellent choices — lightweight enough to stay comfortable in air-conditioned spaces, yet structured enough to look polished by 5 PM.</p><h2>Colour Choices That Command Respect</h2><p>Neutral and jewel tones consistently outperform bright or neon hues in formal work environments. Our top office-colour recommendations from the DEENHA range: Navy Grey (Cairo Series), Silver Grey (Hagia Sophia Series), and Beige Gold (Kintsugi Japan Series).</p><h2>The One-Minute Office Style</h2><p>When running late, a simple triangle fold with both ends tucked neatly under your chin takes under 60 seconds and looks impeccably neat. Pre-pin your hijab the night before for busy mornings — your future self will thank you.</p><h2>Accessories That Elevate</h2><p>A single understated brooch or hijab pin in gold or silver adds a finishing touch without overwhelming your look. Pair with DEENHA's structured Hagia Sophia Series for a boardroom-ready ensemble.</p>`,
        category_en: "Style Tips",
        title_id: "Gaya Hijab Profesional untuk Wanita Karir Modern",
        excerpt_id: "Tampil rapi dan sopan di tempat kerja tidak memerlukan kompromi. Berikut pilihan terbaik kami untuk gaya hijab siap kantor.",
        content_id: `<h2>Mengapa Gaya Hijab Penting di Tempat Kerja</h2><p>Kesan pertama dalam lingkungan profesional terbentuk dalam hitungan detik. Hijab yang ditata dengan baik mengkomunikasikan kepercayaan diri, kesengajaan, dan perhatian terhadap detail — kualitas yang dihargai di tempat kerja mana pun. Kuncinya adalah memilih kain dan warna yang terlihat 'rapi' di bawah pencahayaan kantor.</p><h2>Bahan Terbaik untuk Kantor</h2><p>Untuk lingkungan korporat, kain semi-terstruktur yang mempertahankan bentuknya sepanjang hari kerja yang panjang adalah ideal. Scarf berbahan voal DEENHA (Eliza, Safa, Khadijah Chiffon) adalah pilihan sangat baik — cukup ringan untuk tetap nyaman di ruangan ber-AC, namun cukup terstruktur untuk terlihat rapi hingga pukul 5 sore.</p>`,
        category_id: "Tips Gaya"
    },
    {
        id: "7",
        slug: "kintsugi-filosofi-keindahan-jepang",
        image_url: "/images/KINTSUGI JAPAN SERIES-20260211T044833Z-1-001/KINTSUGI JAPAN SERIES/FEED 1.jpg",
        date: "2026-03-18",
        published: true,
        title_en: "Kintsugi: The Japanese Philosophy of Golden Healing Behind Our Latest Collection",
        excerpt_en: "Kintsugi — the art of repairing broken pottery with gold — is a celebration of imperfection. Discover how this ancient philosophy inspired DEENHA's newest scarf series.",
        content_en: `<h2>What is Kintsugi?</h2><p>Kintsugi (金継ぎ), meaning 'golden joinery', is a centuries-old Japanese art form of repairing broken ceramics with lacquer mixed with gold, silver, or platinum powder. Rather than hiding the damage, kintsugi celebrates it — treating the breaks as part of the object's history and beauty.</p><h2>The Philosophy of Embracing Imperfection</h2><p>At its core, kintsugi embodies <em>wabi-sabi</em> — the Japanese worldview that finds beauty in imperfection, impermanence, and incompleteness. For the Muslim woman, this philosophy resonates deeply: our faith teaches us that beauty is not in perfection, but in sincerity, resilience, and grace in the face of difficulty.</p><h2>How DEENHA Translates Kintsugi into Fabric</h2><p>The DEENHA Kintsugi Japan Series features subtle golden thread accents woven into premium voal, evoking the gold veins of repaired pottery. The three colourways — Beige Gold, Sage Green, and Light Blue — were chosen to reflect the serene, contemplative aesthetic of Japanese minimalism.</p><h2>Wearing Your Kintsugi Scarf</h2><p>The Beige Gold variant pairs magnificently with cream or ivory dresses for formal events. The Sage Green offers a grounding, earthy energy perfect for daytime gatherings. Light Blue, the most versatile of the three, works seamlessly from office to open house.</p>`,
        category_en: "Collections",
        title_id: "Kintsugi: Filosofi Jepang tentang Penyembuhan Emas di Balik Koleksi Terbaru Kami",
        excerpt_id: "Kintsugi — seni memperbaiki keramik yang pecah dengan emas — adalah perayaan ketidaksempurnaan. Temukan bagaimana filosofi kuno ini menginspirasi seri scarf terbaru DEENHA.",
        content_id: `<h2>Apa itu Kintsugi?</h2><p>Kintsugi (金継ぎ), yang berarti 'penyambungan emas', adalah bentuk seni Jepang berusia berabad-abad untuk memperbaiki keramik yang pecah dengan pernis yang dicampur bubuk emas, perak, atau platinum. Daripada menyembunyikan kerusakan, kintsugi merayakannya — memperlakukan retakan sebagai bagian dari sejarah dan keindahan objek tersebut.</p><h2>Filosofi Memeluk Ketidaksempurnaan</h2><p>Pada intinya, kintsugi mewujudkan wabi-sabi — pandangan dunia Jepang yang menemukan keindahan dalam ketidaksempurnaan, ketidakkekalan, dan ketidaklengkapan. Bagi wanita Muslim, filosofi ini sangat beresonansi: agama kita mengajarkan bahwa keindahan bukan pada kesempurnaan, tetapi pada ketulusan, ketahanan, dan keanggunan dalam menghadapi kesulitan.</p>`,
        category_id: "Koleksi"
    },
    {
        id: "8",
        slug: "hagia-sophia-inspirasi-arsitektur-istanbul",
        image_url: "/images/HAGIA SOPHIA SERIES (285K)-20260211T044838Z-1-001/HAGIA SOPHIA SERIES (285K)/DSCF2052 Copy.jpg",
        date: "2026-03-17",
        published: true,
        title_en: "Hagia Sophia: The Architectural Wonder That Inspired Our Most Luxurious Scarf",
        excerpt_en: "Standing at the crossroads of two civilisations, Hagia Sophia has captivated the world for 1,500 years. Now, it inspires DEENHA's most premium Rp 285,000 scarf series.",
        content_en: `<h2>A Monument at the Crossroads of History</h2><p>Built in 537 AD in Constantinople (modern-day Istanbul), Hagia Sophia has served as a Byzantine cathedral, an Ottoman mosque, a secular museum, and once again a mosque. Its layered history makes it one of the most powerful symbols of the encounter between East and West, tradition and modernity — themes deeply relevant to the modern Muslim woman.</p><h2>The Colours of Hagia Sophia</h2><p>Walk inside Hagia Sophia and you are immediately struck by its extraordinary palette: warm gold mosaics against cool grey stone, rich purple silk curtains catching the light of a thousand lanterns, blue mosaic tiles dancing beneath massive domed skylights. These are the exact colours distilled into DEENHA's Hagia Sophia Series: Lavender, Brown Olive, Blue Mosaic, and Silver Grey.</p><h2>Why This Series is Priced at Rp 285,000</h2><p>The Hagia Sophia Series uses a heavier, more structured voal weave than our standard collection — the same fabric weight preferred by luxury modest fashion houses in Istanbul and Dubai. The additional GSM (grams per square metre) provides superior drape, better colour depth, and a longer lifespan through repeated wear.</p><h2>Styling the Hagia Sophia Series for Different Occasions</h2><p>The Lavender makes an outstanding choice for nikah ceremonies and engagement events. Blue Mosaic is the most eye-catching option for Eid photography. Silver Grey offers quiet authority for professional settings. Brown Olive, perhaps the most versatile, transitions flawlessly from morning prayers to evening gatherings.</p>`,
        category_en: "Collections",
        title_id: "Hagia Sophia: Keajaiban Arsitektur Istanbul yang Menginspirasi Scarf Termewah Kami",
        excerpt_id: "Berdiri di persimpangan dua peradaban, Hagia Sophia telah memikat dunia selama 1.500 tahun. Kini, ia menginspirasi seri scarf premium DEENHA seharga Rp 285.000.",
        content_id: `<h2>Monumen di Persimpangan Sejarah</h2><p>Dibangun pada tahun 537 M di Konstantinopel (Istanbul modern), Hagia Sophia telah berfungsi sebagai katedral Byzantium, masjid Ottoman, museum sekuler, dan sekali lagi menjadi masjid. Sejarahnya yang berlapis menjadikannya salah satu simbol paling kuat dari pertemuan antara Timur dan Barat, tradisi dan modernitas — tema yang sangat relevan bagi wanita Muslim modern.</p><h2>Warna-warna Hagia Sophia</h2><p>Masuk ke dalam Hagia Sophia dan Anda langsung terpukau oleh paletnya yang luar biasa: mosaik emas hangat berlatar batu abu-abu dingin, tirai sutra ungu kaya menangkap cahaya seribu lentera, ubin mosaik biru menari di bawah kubah langit-langit yang masif. Inilah warna-warna yang didistilasi menjadi Seri Hagia Sophia DEENHA: Lavender, Brown Olive, Blue Mosaic, dan Silver Grey.</p>`,
        category_id: "Koleksi"
    },
    {
        id: "9",
        slug: "tips-berpakaian-muslimah-syari",
        image_url: "/images/dress-YD0l6pXPkZSqM41l.png",
        date: "2026-03-16",
        published: true,
        title_en: "Syar'i Style That Doesn't Sacrifice Fashion: A Modern Guide",
        excerpt_en: "Being syar'i and being stylish are not opposites. Discover how DEENHA designs for the woman who refuses to choose between faith and fashion.",
        content_en: `<h2>Redefining Modest Fashion</h2><p>For too long, the conversation around syar'i dressing has focused on what to avoid rather than what to embrace. DEENHA's design philosophy begins from a different premise: that full coverage, loose silhouettes, and quality fabrics are not limitations — they are tools for expressing sophisticated, intentional style.</p><h2>The Four Pillars of Syar'i Style</h2><ol><li><strong>Coverage:</strong> Covers awrat completely, including neck and hands. DEENHA's Halima Abaya and Zahra Elegant Dress are designed with this standard at their core.</li><li><strong>Looseness:</strong> Does not reveal body shape. Our A-line and straight-cut designs achieve this without adding visual bulk.</li><li><strong>Opacity:</strong> Not see-through. All DEENHA fabrics are tested for adequate opacity under studio lighting before production.</li><li><strong>Non-adorning:</strong> Does not attract inappropriate attention. Subtle patterns and muted palettes keep the focus on character, not skin.</li></ol><h2>Where Modest Fashion Meets Personal Style</h2><p>Within these parameters, the world of colour, texture, layering, and accessories is still vast. A Navy Zahra Elegant Dress with a Kintsugi Beige Gold scarf and simple gold jewellery creates a look that is simultaneously modest, elegant, and distinctly personal.</p>`,
        category_en: "Lifestyle",
        title_id: "Gaya Syar'i yang Tidak Mengorbankan Fashion: Panduan Modern",
        excerpt_id: "Menjadi syar'i dan menjadi stylish bukan hal yang bertentangan. Temukan bagaimana DEENHA mendesain untuk wanita yang menolak memilih antara iman dan fashion.",
        content_id: `<h2>Mendefinisikan Ulang Fashion Modest</h2><p>Terlalu lama, pembicaraan tentang berpakaian syar'i berfokus pada apa yang harus dihindari daripada apa yang harus dipeluk. Filosofi desain DEENHA dimulai dari premis yang berbeda: bahwa penutupan penuh, siluet longgar, dan kain berkualitas bukan batasan — melainkan alat untuk mengekspresikan gaya yang canggih dan penuh pertimbangan.</p><h2>Empat Pilar Gaya Syar'i</h2><ol><li><strong>Penutupan:</strong> Menutup aurat sepenuhnya, termasuk leher dan tangan. Halima Abaya dan Zahra Elegant Dress DEENHA dirancang dengan standar ini sebagai intinya.</li><li><strong>Kelonggaran:</strong> Tidak memperlihatkan bentuk tubuh. Desain potongan A-line dan lurus kami mencapai ini tanpa menambah volume visual.</li></ol>`,
        category_id: "Gaya Hidup"
    },
    {
        id: "10",
        slug: "baju-hampers-hari-raya-hadiah-terbaik",
        image_url: "/images/hampers-1-dWxvylrBJ6IBxzqB.jpg",
        date: "2026-03-15",
        published: true,
        title_en: "Why a DEENHA Hamper is the Most Thoughtful Eid Gift You Can Give",
        excerpt_en: "In a world of generic gift vouchers, a curated luxury hamper stands apart. Here's why DEENHA hampers are becoming the go-to gift choice for Eid 2026.",
        content_en: `<h2>The Problem with Conventional Eid Gifts</h2><p>Every year, millions of Eid gifts are exchanged — and a significant portion of them are forgotten within days. Generic cookies, mass-produced chocolates, and impersonal vouchers fail to communicate what a heartfelt gift should: that you know the recipient, you value the relationship, and you've invested thought into this moment.</p><h2>The Art of the Curated Hamper</h2><p>A well-constructed hamper is fundamentally different. It tells a story. DEENHA's Signature Gift Box and Ramadan Blessing Hamper are curated with the Muslim woman in mind — combining premium prayer essentials, signature scarves, and elegant packaging that makes the unboxing experience itself a celebration.</p><h2>What's Inside the DEENHA Signature Gift Box (Rp 450,000)</h2><p>Our Signature Gift Box is designed as a complete style moment: a DEENHA scarf of your choice, wrapped in gold tissue paper and placed in our signature branded box with a handwritten gift card slot. The presentation alone makes it unmistakably luxurious.</p><h2>The Ramadan Blessing Hamper (Rp 750,000): For Those Who Deserve the Best</h2><p>Our premium hamper tier includes a premium prayer set, a heritage-series scarf, and curated Ramadan essentials — all presented in our signature gift box with a personalised message. Ideal for mothers, mothers-in-law, mentors, and close friends.</p><h2>Order Early: Hamper Season Sells Out Fast</h2><p>In previous years, DEENHA hampers sold out 2–3 weeks before Eid. We recommend placing your order by early Ramadan to guarantee availability and allow time for personalised packaging.</p>`,
        category_en: "Lifestyle",
        title_id: "Mengapa Hampers DEENHA adalah Hadiah Lebaran Paling Berkesan yang Bisa Anda Berikan",
        excerpt_id: "Di dunia yang penuh voucher hadiah generik, hamper mewah yang terkurasi sangat berbeda. Inilah mengapa hampers DEENHA menjadi pilihan hadiah utama untuk Lebaran 2026.",
        content_id: `<h2>Masalah dengan Hadiah Lebaran Konvensional</h2><p>Setiap tahun, jutaan hadiah Lebaran dipertukarkan — dan sebagian besar dilupakan dalam beberapa hari. Kue generik, coklat produksi massal, dan voucher tidak personal gagal mengkomunikasikan apa yang seharusnya disampaikan hadiah yang tulus: bahwa Anda mengenal penerimanya, Anda menghargai hubungan tersebut, dan Anda telah menginvestasikan pikiran dalam momen ini.</p>`,
        category_id: "Gaya Hidup"
    },
    {
        id: "11",
        slug: "perbedaan-bergo-dan-hijab-segi-empat",
        image_url: "/images/bergo-A1aPwKX8JgfWab9g.png",
        date: "2026-03-14",
        published: true,
        title_en: "Bergo vs Scarf: Which Hijab Style is Right for You?",
        excerpt_en: "Both bergo and square scarves have their place in a Muslim woman's wardrobe. We break down the pros, cons, and best occasions for each.",
        content_en: `<h2>Understanding the Core Difference</h2><p>A bergo (also known as a slip-on or instant hijab) is a pre-sewn hijab that can be worn in seconds without pinning. A square scarf, on the other hand, requires folding and pinning — but offers far more versatility in terms of styling options. Both have legitimate places in a well-rounded modest wardrobe.</p><h2>When to Choose Bergo</h2><p>Bergo hijabs — including DEENHA's Amira Cotton Bergo, Mariam Daily Bergo, and Yasmin Sport Bergo — are the practical choice for: daily wear at home or for quick errands, exercise and physical activity (especially the sport bergo), travel when you need easy on/off coverage, and humid climates where minimal layering is preferred.</p><h2>When to Choose a Square Scarf</h2><p>Square scarves like DEENHA's heritage and premium series are the right choice for: formal events, weddings, and Eid celebrations, photoshoots and special occasions where styling detail matters, wearing with formal dresses and abayas, and days when you want to feel particularly put-together and confident.</p><h2>Building the Ideal Modest Wardrobe</h2><p>The answer isn't either/or — it's both. We recommend at minimum: 2–3 bergo hijabs (one for daily use, one for sport/travel, one in a neutral for impromptu formal situations), and 4–6 premium square scarves in a mix of neutrals and accent colours that coordinate with your dress collection.</p>`,
        category_en: "Style Tips",
        title_id: "Bergo vs Hijab Segi Empat: Pilihan Mana yang Tepat untuk Anda?",
        excerpt_id: "Bergo dan scarf segi empat masing-masing memiliki tempatnya dalam lemari pakaian wanita Muslim. Kami menguraikan pro, kontra, dan kesempatan terbaik untuk masing-masing.",
        content_id: `<h2>Memahami Perbedaan Utama</h2><p>Bergo (dikenal juga sebagai hijab instan) adalah hijab yang sudah dijahit yang bisa dipakai dalam hitungan detik tanpa peniti. Scarf segi empat, di sisi lain, memerlukan pelipatan dan penyematan — tetapi menawarkan jauh lebih banyak versatilitas dalam hal pilihan gaya. Keduanya memiliki tempat yang sah dalam lemari pakaian modest yang baik.</p><h2>Kapan Memilih Bergo</h2><p>Hijab bergo — termasuk Amira Cotton Bergo, Mariam Daily Bergo, dan Yasmin Sport Bergo DEENHA — adalah pilihan praktis untuk: pemakaian sehari-hari di rumah atau untuk keperluan cepat, olahraga dan aktivitas fisik (terutama sport bergo), perjalanan ketika Anda membutuhkan penutupan yang mudah dipasang/dilepas.</p>`,
        category_id: "Tips Gaya"
    },
    {
        id: "12",
        slug: "wisata-tokyo-fashion-muslim-jepang",
        image_url: "/images/Tokyo Exclusive/Pic/Pic (1).jpg",
        date: "2026-03-13",
        published: true,
        title_en: "Muslim-Friendly Travel in Tokyo: Style Tips from Our Tokyo Exclusive Collection",
        excerpt_en: "Tokyo is one of Asia's most Muslim-friendly cities, and it's calling. Here's how to dress modestly, comfortably, and stylishly for a Japanese adventure.",
        content_en: `<h2>Tokyo's Growing Muslim-Friendly Scene</h2><p>Japan's capital has undergone a quiet revolution in Muslim traveller infrastructure. From halal-certified restaurants in Shibuya to prayer rooms in major shopping malls and airports, Tokyo has become one of Asia's most accessible destinations for Muslim travellers. Indonesia remains one of Japan's fastest-growing tourist sources — making this guide more relevant than ever.</p><h2>The Climate Challenge</h2><p>Tokyo's seasons are dramatic. Summers are hot and humid (demanding breathable, lightweight fabrics), while winters are dry and cold (requiring layering without bulk). The DEENHA Tokyo Exclusive collection was designed with these extremes in mind — a versatile series that layers beautifully across all four seasons.</p><h2>What to Wear in Each Season</h2><ul><li><strong>Spring (March–May):</strong> DEENHA's Sand Beige or Ash Blue Tokyo Exclusive scarves pair beautifully with light midi dresses for sakura season photography.</li><li><strong>Summer (June–August):</strong> Navy Mocha with a lightweight linen dress and minimal accessories — maximum coverage, minimum heat retention.</li><li><strong>Autumn (September–November):</strong> Burgundy Rose against the fiery autumn foliage for spectacular colour-coordination in Nikko or Arashiyama.</li><li><strong>Winter (December–February):</strong> Layer all four Tokyo Exclusive colourways as neck scarves over your coat for a sophisticated, warm street-style look in Harajuku or Ginza.</li></ul>`,
        category_en: "Lifestyle",
        title_id: "Wisata Ramah Muslim di Tokyo: Tips Gaya dari Koleksi Tokyo Exclusive Kami",
        excerpt_id: "Tokyo adalah salah satu kota paling ramah Muslim di Asia, dan ia memanggil. Berikut cara berpakaian dengan sopan, nyaman, dan stylish untuk petualangan Jepang.",
        content_id: `<h2>Perkembangan Tokyo yang Ramah Muslim</h2><p>Ibu kota Jepang telah mengalami revolusi diam-diam dalam infrastruktur wisatawan Muslim. Dari restoran bersertifikat halal di Shibuya hingga ruang sholat di pusat perbelanjaan dan bandara utama, Tokyo telah menjadi salah satu destinasi paling mudah diakses di Asia bagi wisatawan Muslim. Indonesia tetap menjadi salah satu sumber turis yang tumbuh paling cepat ke Jepang — membuat panduan ini semakin relevan.</p>`,
        category_id: "Gaya Hidup"
    },
    {
        id: "13",
        slug: "cara-mix-match-hijab-berbagai-warna",
        image_url: "/images/image-3-Awv4MMNq3XCKgVv3.jpg",
        date: "2026-03-12",
        published: true,
        title_en: "The Muslim Woman's Colour Theory: How to Mix and Match Your Hijab Like a Stylist",
        excerpt_en: "Stop guessing which hijab goes with which outfit. Master the basics of colour theory and start creating effortlessly coordinated looks every single day.",
        content_en: `<h2>Why Colour Theory Matters for Hijab Styling</h2><p>A hijab is often the largest single block of colour in a Muslim woman's outfit — making it the piece that most powerfully affects the overall impression of an ensemble. Understanding the basics of colour theory removes the guesswork and elevates everyday dressing from functional to intentional.</p><h2>The Colour Wheel: Your New Best Friend</h2><p>Colours that sit opposite each other on the colour wheel (complementary colours) create dynamic, high-contrast pairings. A Blue Mosaic (Hagia Sophia Series) hijab with a terracotta dress is a perfect complementary pairing. Colours adjacent on the wheel (analogous colours) create harmonious, soothing looks — Sage Teal (Cairo Series) with an olive green abaya, for example.</p><h2>The Safe Neutrals Formula</h2><p>When in doubt, reach for a neutral. DEENHA's Silver Grey, Beige Gold, Navy Grey, and Sand Beige are universal neutrals that pair with virtually any outfit colour. Build your core hijab wardrobe around two or three of these before adding accent colours.</p><h2>Seasonal Colour Palettes</h2><p>Our seasonal recommendations: Spring — Dusty Rose, Sage Green, Lavender. Summer — Light Blue, White Blue, Silver Grey. Autumn — Camel, Terracotta, Maroon Beige. Winter — Navy Mocha, Dark Teal, Burgundy Rose. Conveniently, these are all available across DEENHA's heritage and premium collections.</p>`,
        category_en: "Style Tips",
        title_id: "Teori Warna untuk Wanita Muslim: Cara Mix and Match Hijab seperti Stylist",
        excerpt_id: "Berhenti menebak hijab mana yang cocok dengan outfit mana. Kuasai dasar teori warna dan mulailah menciptakan tampilan yang terkoordinasi dengan mudah setiap hari.",
        content_id: `<h2>Mengapa Teori Warna Penting untuk Gaya Hijab</h2><p>Hijab sering kali merupakan blok warna tunggal terbesar dalam pakaian wanita Muslim — menjadikannya potongan yang paling kuat mempengaruhi kesan keseluruhan dari sebuah pakaian. Memahami dasar teori warna menghilangkan tebak-tebakan dan meningkatkan penampilan sehari-hari dari fungsional menjadi penuh pertimbangan.</p>`,
        category_id: "Tips Gaya"
    },
    {
        id: "14",
        slug: "mukena-sholat-nyaman-berkualitas",
        image_url: "/images/prayset-mnlWv3KxDvf1NbQn.png",
        date: "2026-03-11",
        published: true,
        title_en: "What Makes a Premium Prayer Set Worth the Investment",
        excerpt_en: "Not all mukena are equal. Here's what separates a prayer set you'll use daily for years from one that pills, shrinks, or loses its shape after a few washes.",
        content_en: `<h2>The Purpose of Quality in Ibadah</h2><p>In Islamic tradition, approaching Allah in a state of cleanliness and dignity is not merely recommended — it is an expression of respect. A well-made prayer set contributes to this: one that fits correctly, stays in place during prayer, and feels comfortable through long sujood and standing positions enhances focus and khushoo' in worship.</p><h2>What to Look for in a Premium Prayer Set</h2><p>DEENHA's Fatima Premium Pray Set and Nadia Travel Pray Set are engineered around four key criteria that separate lasting quality from fast fashion:</p><ol><li><strong>Fabric weight (GSM):</strong> Too light and the fabric is see-through and flimsy. Too heavy and it becomes uncomfortable in warm climates. DEENHA prayer sets use a carefully calibrated mid-weight fabric tested for both opacity and breathability.</li><li><strong>Pre-shrunk construction:</strong> Our mukena fabric is pre-shrunk before cutting, preventing the frustrating post-wash size reduction that affects cheaper sets.</li><li><strong>Elastic quality:</strong> The elastic at the head and wrist openings is a common failure point. DEENHA uses high-recovery elastic that maintains its shape across hundreds of wears.</li><li><strong>Storage bag:</strong> A proper drawstring bag keeps your mukena clean and compact for travel — included with both DEENHA prayer sets.</li></ol><h2>Travel Prayer Set: The Nadia Advantage</h2><p>At Rp 349,000 (sale from Rp 429,000), the Nadia Travel Pray Set is designed specifically for the Muslim woman on the go. Folds to the size of a paperback book. Comes in a compact storage bag. Available in the ever-versatile Grey colourway.</p>`,
        category_en: "Care Guide",
        title_id: "Apa yang Membuat Mukena Premium Bernilai untuk Diinvestasikan",
        excerpt_id: "Tidak semua mukena sama. Inilah yang membedakan mukena yang akan Anda gunakan setiap hari selama bertahun-tahun dari yang berbulu, menyusut, atau kehilangan bentuknya setelah beberapa kali cuci.",
        content_id: `<h2>Tujuan Kualitas dalam Ibadah</h2><p>Dalam tradisi Islam, menghadap Allah dalam keadaan bersih dan bermartabat bukan hanya dianjurkan — melainkan ekspresi rasa hormat. Mukena yang dibuat dengan baik berkontribusi pada hal ini: yang pas dengan benar, tetap di tempatnya selama sholat, dan terasa nyaman dalam posisi sujood dan berdiri yang panjang, meningkatkan fokus dan kekhusyukan dalam ibadah.</p>`,
        category_id: "Panduan Perawatan"
    },
    {
        id: "15",
        slug: "cairo-series-inspirasi-mesir-kuno",
        image_url: "/images/CAIRO SERIES-20260211T044831Z-1-001/CAIRO SERIES/DSCF2139 Copy.jpg",
        date: "2026-03-10",
        published: true,
        title_en: "Cairo Series: Where Ancient Egypt Meets Contemporary Modest Fashion",
        excerpt_en: "From the minarets of Al-Azhar to the shores of the Nile — the Cairo Series captures the timeless elegance of the Arab world's most iconic city.",
        content_en: `<h2>Cairo: A City That Defines Islamic Civilisation</h2><p>Few cities carry the weight of history that Cairo does. Home to Al-Azhar University (founded 975 AD), the Khan el-Khalili bazaar, and the pyramids, Cairo represents the intersection of Islamic scholarship, trade, and art that defined a civilisation. It is a fitting muse for DEENHA's Arabic heritage collection.</p><h2>The Colours of Cairo</h2><p>Cairo's palette is dictated by its desert landscape and Islamic architecture. The warm sand of the Sahara. The sage green of mosque tiles. The dusty rose of crumbling ancient walls. The navy grey of a Nile twilight. These are the exact four colours that define the DEENHA Cairo Series: Sage Teal, Rose Brown, Olive Brown, and Navy Grey.</p><h2>The Fabric Choice</h2><p>The Cairo Series uses DEENHA's standard premium voal in the 115x115 cm format — the perfect square for versatile styling. The fabric's slight sheen evokes the lustre of Cairene silk markets, while its soft drape references the flowing robes of the city's elegant inhabitants.</p><h2>Wearing Cairo: Our Recommended Pairings</h2><p>Sage Teal with a cream or white abaya for Eid prayers. Rose Brown with a camel-coloured dress for an autumn wedding. Olive Brown with denim for effortlessly modest casual wear. Navy Grey with a grey trouser suit for corporate elegance that still speaks to heritage.</p>`,
        category_en: "Collections",
        title_id: "Cairo Series: Ketika Mesir Kuno Bertemu Fashion Modest Kontemporer",
        excerpt_id: "Dari menara Al-Azhar hingga tepi Sungai Nil — Cairo Series menangkap keanggunan abadi kota paling ikonik di dunia Arab.",
        content_id: `<h2>Kairo: Kota yang Mendefinisikan Peradaban Islam</h2><p>Sedikit kota yang membawa beban sejarah seperti Kairo. Rumah bagi Universitas Al-Azhar (didirikan 975 M), bazaar Khan el-Khalili, dan piramida, Kairo merepresentasikan persilangan antara ilmu pengetahuan Islam, perdagangan, dan seni yang mendefinisikan sebuah peradaban. Ini adalah muse yang tepat untuk koleksi warisan Arab DEENHA.</p>`,
        category_id: "Koleksi"
    }
];
