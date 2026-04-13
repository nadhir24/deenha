export interface Product {
    id: number;
    name: string;
    name_en?: string;
    name_id?: string;
    name_fr?: string;
    name_zh?: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: 'Scarves' | 'Dresses' | 'Bergo' | 'Pray Set' | 'Hampers';
    category_en?: string;
    category_id?: string;
    category_fr?: string;
    category_zh?: string;
    size: string[];
    color: string;
    colorHex: string;
    badge?: 'new' | 'bestseller' | 'sale';
    soldCount?: number;
    stock?: number;
    description?: string;
    description_en?: string;
    description_id?: string;
    description_fr?: string;
    description_zh?: string;
    variants?: {
        name: string;
        color: string;
        colorHex: string;
        image: string;
        stock?: number;
    }[];
}

export const products: Product[] = [
    {
        id: 1,
        name: "Eliza Premium Voal Scarf",
        price: 189000,
        image: "/images/image-1-m5KMww5a1eHrGa7j.jpg",
        category: "Scarves",
        size: ["110x110"],
        color: "Dusty Rose",
        colorHex: "#D4A5A5",
        badge: "new",
        soldCount: 45,
        description: "Elegant and versatile, the Eliza Premium Voal Scarf is a wardrobe essential. Crafted from high-quality voal, it offers a soft touch and easy styling for any occasion. Perfect for both casual and formal looks."
    },
    {
        id: 2,
        name: "Luna Silk Scarf Collection",
        price: 259000,
        image: "/images/image-2-A85ewwvLJairzx6O.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Sage Green",
        colorHex: "#9CAF88",
        badge: "bestseller",
        soldCount: 128,
        description: "Soft. Shiny. Sophisticated. Our Luna Silk Scarf Collection brings a touch of luxury to your everyday style. The smooth texture ensures a flawless drape, making it perfect for special events or elevating your daily outfit."
    },
    {
        id: 3,
        name: "Amira Cotton Bergo",
        price: 149000,
        image: "/images/bergo-A1aPwKX8JgfWab9g.png",
        category: "Bergo",
        size: ["S", "M", "L"],
        color: "Black",
        colorHex: "#1A1A1A",
        soldCount: 89,
        description: "Slip on a polished look in seconds. The Amira Cotton Bergo is designed for women who want full coverage without the fuss of pinning. Soft, breathable, and perfect for all-day wear. A must-have for your modest wardrobe."
    },
    {
        id: 4,
        name: "Zahra Elegant Dress",
        price: 459000,
        originalPrice: 599000,
        image: "/images/dress-YD0l6pXPkZSqM41l.png",
        category: "Dresses",
        size: ["S", "M", "L", "XL"],
        color: "Navy",
        colorHex: "#2C3E50",
        badge: "sale",
        soldCount: 67,
        description: "Graceful and timeless, the Zahra Elegant Dress features a flowing silhouette that flatters every figure. Made with premium fabric that moves with you, ensuring comfort and style for weddings, Eid, or formal gatherings."
    },
    {
        id: 5,
        name: "Fatima Premium Pray Set",
        price: 389000,
        image: "/images/prayset-mnlWv3KxDvf1NbQn.png",
        category: "Pray Set",
        size: ["All Size"],
        color: "White",
        colorHex: "#FFFFFF",
        badge: "bestseller",
        soldCount: 234,
        description: "Experience spiritual comfort with the Fatima Premium Pray Set. Crafted from soft, breathable material that keeps you cool during prayer. Includes a matching bag for easy travel and storage."
    },
    {
        id: 6,
        name: "Safa Printed Scarf",
        price: 159000,
        image: "/images/image-3-Awv4MMNq3XCKgVv3.jpg",
        category: "Scarves",
        size: ["110x110"],
        color: "Cream",
        colorHex: "#F5F5DC",
        soldCount: 56,
        description: "Add a pop of pattern to your look with the Safa Printed Scarf. Featuring unique designs and lightweight fabric, it's the perfect accessory to express your personal style while maintaining modesty."
    },
    {
        id: 7,
        name: "Mariam Daily Bergo",
        price: 129000,
        image: "/images/image-product-2-d951KrVPy9CvgLle.jpg",
        category: "Bergo",
        size: ["S", "M", "L"],
        color: "Camel",
        colorHex: "#C19A6B",
        badge: "new",
        soldCount: 34,
        description: "Your go-to for daily comfort. The Mariam Daily Bergo offers a practical, pin-less solution for busy days. Lightweight and durable, it withstands daily wear while keeping you looking neat and covered."
    },
    {
        id: 8,
        name: "Aisha Maxi Dress",
        price: 529000,
        image: "/images/image-product-4-Yan1yzVZD4UvpqW3.jpg",
        category: "Dresses",
        size: ["S", "M", "L", "XL"],
        color: "Burgundy",
        colorHex: "#800020",
        soldCount: 78,
        description: "Make a statement with the Aisha Maxi Dress. Its rich color and elegant cut create a stunning look for any special occasion. Designed with modesty and modern fashion in mind."
    },
    {
        id: 9,
        name: "Nadia Travel Pray Set",
        price: 349000,
        originalPrice: 429000,
        image: "/images/image-product-3-YKb36NKv2VHk924E.jpg",
        category: "Pray Set",
        size: ["All Size"],
        color: "Grey",
        colorHex: "#808080",
        badge: "sale",
        soldCount: 145,
        description: "Compact and convenient. The Nadia Travel Pray Set is lightweight and folds easily, making it the perfect companion for your journeys. Never compromise on your prayer essentials while on the go."
    },
    {
        id: 10,
        name: "Khadijah Chiffon Scarf",
        price: 179000,
        image: "/images/heritage-design-Aq2WvB4Gj1flwP1L.jpg",
        category: "Scarves",
        size: ["120x120"],
        color: "Blush Pink",
        colorHex: "#FFB6C1",
        soldCount: 98,
        description: "Hot weather hijab hack: go chiffon. Lightweight, breathable, and so elegant — our Khadijah Chiffon Scarf keeps you cool and covered all summer long. A wardrobe staple for every season."
    },
    {
        id: 11,
        name: "Yasmin Sport Bergo",
        price: 139000,
        image: "/images/bergo-A1aPwKX8JgfWab9g_943.png",
        category: "Bergo",
        size: ["S", "M", "L"],
        color: "Olive",
        colorHex: "#808000",
        badge: "new",
        soldCount: 23,
        description: "Stay active and modest with the Yasmin Sport Bergo. Designed with moisture-wicking fabric to keep you dry and comfortable during workouts. Secure fit ensures it stays in place while you move."
    },
    {
        id: 12,
        name: "Halima Abaya Dress",
        price: 679000,
        image: "/images/image-product-A85ewr03pkt7BqEa.jpg",
        category: "Dresses",
        size: ["S", "M", "L", "XL"],
        color: "Black",
        colorHex: "#1A1A1A",
        badge: "bestseller",
        soldCount: 189,
        stock: 20,
        description: "The epitome of modest elegance. The Halima Abaya Dress offers a loose, flowing fit that provides maximum coverage without sacrificing style. Perfect for formal events or religious gatherings."
    },
    {
        id: 13,
        name: "Signature Gift Box",
        price: 450000,
        image: "/images/hampers-1-dWxvylrBJ6IBxzqB.jpg",
        category: "Hampers",
        size: ["Standard"],
        color: "Gold",
        colorHex: "#D4AF37",
        badge: "new",
        soldCount: 12,
        description: "Share the love with our Signature Gift Box. Curated with our finest products, it's the perfect gift for friends, family, or yourself. beautifully packaged to make every unboxing a special moment."
    },
    {
        id: 15,
        name: "Cairo Series",
        price: 249000,
        image: "/images/CAIRO SERIES-20260211T044831Z-1-001/CAIRO SERIES/DSCF2139 Copy.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Sage Teal",
        colorHex: "#7A9E8E",
        badge: "new",
        description: "Inspired by the timeless beauty of Egyptian architecture. The Cairo Series features intricate geometric patterns on premium voal, available in four earthy tones that pair effortlessly with any outfit.",
        variants: [
            { name: "Cairo Series", color: "Sage Teal", colorHex: "#7A9E8E", image: "/images/CAIRO SERIES-20260211T044831Z-1-001/CAIRO SERIES/DSCF2139 Copy.jpg", stock: 50 },
            { name: "Cairo Series", color: "Rose Brown", colorHex: "#A67B6B", image: "/images/CAIRO SERIES-20260211T044831Z-1-001/CAIRO SERIES/1614405676264.jpg", stock: 50 },
            { name: "Cairo Series", color: "Olive Brown", colorHex: "#6B7B3A", image: "/images/CAIRO SERIES-20260211T044831Z-1-001/CAIRO SERIES/1614405676587.jpg", stock: 50 },
            { name: "Cairo Series", color: "Navy Grey", colorHex: "#5C6670", image: "/images/CAIRO SERIES-20260211T044831Z-1-001/CAIRO SERIES/1614405678222.jpg", stock: 50 }
        ]
    },
    {
        id: 16,
        name: "Hagia Sophia Series",
        price: 285000,
        image: "/images/HAGIA SOPHIA SERIES (285K)-20260211T044838Z-1-001/HAGIA SOPHIA SERIES (285K)/DSCF2052 Copy.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Lavender",
        colorHex: "#8B7D9A",
        badge: "new",
        description: "A tribute to Istanbul's iconic landmark. The Hagia Sophia Series blends mosaic-inspired motifs with a modern silhouette, crafted from silky-smooth fabric that drapes beautifully and feels luxurious against the skin.",
        variants: [
            { name: "Hagia Sophia Series", color: "Lavender", colorHex: "#8B7D9A", image: "/images/HAGIA SOPHIA SERIES (285K)-20260211T044838Z-1-001/HAGIA SOPHIA SERIES (285K)/DSCF2052 Copy.jpg", stock: 50 },
            { name: "Hagia Sophia Series", color: "Brown Olive", colorHex: "#8B6B3A", image: "/images/HAGIA SOPHIA SERIES (285K)-20260211T044838Z-1-001/HAGIA SOPHIA SERIES (285K)/1614405675905.jpg", stock: 50 },
            { name: "Hagia Sophia Series", color: "Blue Mosaic", colorHex: "#5B9EC4", image: "/images/HAGIA SOPHIA SERIES (285K)-20260211T044838Z-1-001/HAGIA SOPHIA SERIES (285K)/DSCF2631 Copy.jpg", stock: 50 },
            { name: "Hagia Sophia Series", color: "Silver Grey", colorHex: "#8A9099", image: "/images/HAGIA SOPHIA SERIES (285K)-20260211T044838Z-1-001/HAGIA SOPHIA SERIES (285K)/1614405676060.jpg", stock: 50 }
        ]
    },
    {
        id: 17,
        name: "Kintsugi Japan Series",
        price: 249000,
        image: "/images/KINTSUGI JAPAN SERIES-20260211T044833Z-1-001/KINTSUGI JAPAN SERIES/FEED 1.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Beige Gold",
        colorHex: "#C4A46C",
        badge: "new",
        description: "Embrace the art of imperfection. The Kintsugi Japan Series draws from the Japanese philosophy of finding beauty in broken things, featuring delicate gold-veined patterns on premium voal fabric.",
        variants: [
            { name: "Kintsugi Japan Series", color: "Beige Gold", colorHex: "#C4A46C", image: "/images/KINTSUGI JAPAN SERIES-20260211T044833Z-1-001/KINTSUGI JAPAN SERIES/FEED 1.jpg", stock: 50 },
            { name: "Kintsugi Japan Series", color: "Sage Green", colorHex: "#9CAF88", image: "/images/KINTSUGI JAPAN SERIES-20260211T044833Z-1-001/KINTSUGI JAPAN SERIES/IMG_4326.jpg", stock: 50 },
            { name: "Kintsugi Japan Series", color: "Light Blue", colorHex: "#A8C4D6", image: "/images/KINTSUGI JAPAN SERIES-20260211T044833Z-1-001/KINTSUGI JAPAN SERIES/IMG_4338.jpg", stock: 50 }
        ]
    },
    {
        id: 18,
        name: "Borneo Scarves",
        price: 249000,
        image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Borneo Scarves Series/_DSC1648 Copy.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Mauve",
        colorHex: "#9B8B7A",
        badge: "new",
        description: "Part of our Warisan Nusantara collection. The Borneo Scarves celebrate the rich textile heritage of Kalimantan with nature-inspired motifs, printed on soft voal that flows gracefully with every movement.",
        variants: [
            { name: "Borneo Scarves", color: "Mauve", colorHex: "#9B8B7A", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Borneo Scarves Series/_DSC1648 Copy.jpg", stock: 50 },
            { name: "Borneo Scarves", color: "Teal", colorHex: "#5F7A7E", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Borneo Scarves Series/_DSC1681 Copy.jpg", stock: 50 },
            { name: "Borneo Scarves", color: "Light Grey", colorHex: "#C5C5C5", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Borneo Scarves Series/_DSC8283_.jpg", stock: 50 }
        ]
    },
    {
        id: 19,
        name: "Kawung Scarves",
        price: 249000,
        image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Kawung Scarves Series/IMG_6310.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Dusty Rose",
        colorHex: "#8B7090",
        badge: "new",
        description: "Rooted in Javanese tradition. The Kawung Scarves feature the iconic kawung batik pattern — a symbol of purity and wisdom — reimagined in contemporary colorways on lightweight, breathable voal.",
        variants: [
            { name: "Kawung Scarves", color: "Dusty Rose", colorHex: "#8B7090", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Kawung Scarves Series/IMG_6310.jpg", stock: 50 },
            { name: "Kawung Scarves", color: "Sage Grey", colorHex: "#8A9488", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Kawung Scarves Series/IMG_6315.jpg", stock: 50 },
            { name: "Kawung Scarves", color: "Maroon Beige", colorHex: "#8B5A4A", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Kawung Scarves Series/IMG_6320.jpg", stock: 50 },
            { name: "Kawung Scarves", color: "Dark Teal", colorHex: "#3A4A4A", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Kawung Scarves Series/IMG_6325.jpg", stock: 50 }
        ]
    },
    {
        id: 20,
        name: "Parang Scarves",
        price: 249000,
        image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Parang Scarves Series/_DSC9499 copy IG.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Camel",
        colorHex: "#A07050",
        badge: "new",
        description: "The Parang motif represents strength and continuity. Our Parang Scarves bring this powerful Javanese batik pattern to life with rich, warm tones on premium voal — perfect for making a bold yet modest statement.",
        variants: [
            { name: "Parang Scarves", color: "Camel", colorHex: "#A07050", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Parang Scarves Series/_DSC9499 copy IG.jpg", stock: 50 },
            { name: "Parang Scarves", color: "Emerald Teal", colorHex: "#3A6B5A", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Parang Scarves Series/IMG_0577.jpeg", stock: 50 },
            { name: "Parang Scarves", color: "Blue Turquoise", colorHex: "#5B8A9A", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Parang Scarves Series/IMG_0582.jpeg", stock: 50 },
            { name: "Parang Scarves", color: "Dusty Pink", colorHex: "#B08A8A", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Parang Scarves Series/IMG_0586.jpeg", stock: 50 }
        ]
    },
    {
        id: 21,
        name: "Songket Scarves",
        price: 249000,
        image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Songket Scarves Series/IMG_6351.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Navy Blue",
        colorHex: "#5A6B7B",
        badge: "new",
        description: "Woven with heritage. The Songket Scarves draw from the intricate gold-threaded songket weaving tradition of Sumatra and Malaysia, translated into elegant printed patterns on silky voal fabric.",
        variants: [
            { name: "Songket Scarves", color: "Navy Blue", colorHex: "#5A6B7B", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Songket Scarves Series/IMG_6351.jpg", stock: 50 },
            { name: "Songket Scarves", color: "Rose Pink", colorHex: "#C06080", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Songket Scarves Series/IMG_6370.jpg", stock: 50 },
            { name: "Songket Scarves", color: "Teal Brown", colorHex: "#6A7B70", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Songket Scarves Series/IMG_6375.jpg", stock: 50 },
            { name: "Songket Scarves", color: "Lilac Grey", colorHex: "#9A8A9A", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Songket Scarves Series/IMG_0898.jpg", stock: 50 }
        ]
    },
    {
        id: 22,
        name: "Lombok Scarves",
        price: 249000,
        image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Lombok Scarves Series (Sejauh Mata Memandang)/DSCF2189 Copy.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Terracotta",
        colorHex: "#C25B4E",
        badge: "new",
        description: "As far as the eye can see. The Lombok Scarves capture the island's breathtaking landscapes — from terracotta sunsets to emerald coastlines — in vivid prints on premium voal that feels as light as a tropical breeze.",
        variants: [
            { name: "Lombok Scarves", color: "Terracotta", colorHex: "#C25B4E", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Lombok Scarves Series (Sejauh Mata Memandang)/DSCF2189 Copy.jpg", stock: 50 },
            { name: "Lombok Scarves", color: "Emerald Green", colorHex: "#2E6B4A", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Lombok Scarves Series (Sejauh Mata Memandang)/DSCF2493 Copy.jpg", stock: 50 },
            { name: "Lombok Scarves", color: "White Blue", colorHex: "#B8D0E0", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Lombok Scarves Series (Sejauh Mata Memandang)/DSCF2540 Copy.jpg", stock: 50 },
            { name: "Lombok Scarves", color: "Camel Orange", colorHex: "#C08040", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Lombok Scarves Series (Sejauh Mata Memandang)/DSCF2578 Copy.jpg", stock: 50 }
        ]
    },

    {
        id: 23,
        name: "Alyssum Flowers Series",
        price: 249000,
        image: "/images/Alyssum Flowers Series/DSCF9440 Copy.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Multi",
        colorHex: "#D4A5A5",
        badge: "new",
        description: "Blooming with elegance. The Alyssum Flowers Series features delicate floral prints inspired by the sweet alyssum flower, printed on soft voal in five romantic colorways. Perfect for adding a feminine touch to any look.",
        variants: [
            { name: "Alyssum 1", color: "Rose Pink", colorHex: "#D8BFD8", image: "/images/Alyssum Flowers Series/DSCF9442 Copy.jpg", stock: 30 },
            { name: "Alyssum 2", color: "Silver Grey", colorHex: "#C0C0C0", image: "/images/Alyssum Flowers Series/DSCF9447 Copy.jpg", stock: 30 },
            { name: "Alyssum 3", color: "Dusty Blue", colorHex: "#708090", image: "/images/Alyssum Flowers Series/DSCF9451 Copy.jpg", stock: 30 },
            { name: "Alyssum 4", color: "Mauve", colorHex: "#9370DB", image: "/images/Alyssum Flowers Series/DSCF9462 Copy.jpg", stock: 30 },
            { name: "Alyssum 5", color: "Beige Cream", colorHex: "#F5F5DC", image: "/images/Alyssum Flowers Series/DSCF9454 Copy.jpg", stock: 30 }
        ]
    },
    {
        id: 24,
        name: "Arabic Series",
        price: 249000,
        image: "/images/Arabic Series/DSCF5668 Copy.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Deep Teal",
        colorHex: "#2C3E50",
        badge: "new",
        description: "Calligraphy meets couture. The Arabic Series showcases flowing Arabic-inspired patterns in rich, jewel-toned colorways. Crafted from premium voal with a silky finish that elevates your everyday hijab style.",
        variants: [
            { name: "Arabic 1", color: "Purple Magenta", colorHex: "#7D3C5C", image: "/images/Arabic Series/DSCF5668 Copy.jpg", stock: 40 },
            { name: "Arabic 2", color: "Grey Mauve", colorHex: "#8E7C84", image: "/images/Arabic Series/DSCF5826 Copy.jpg", stock: 40 },
            { name: "Arabic 3", color: "Beige Cream", colorHex: "#B59E8E", image: "/images/Arabic Series/DSCF5872 Copy.jpg", stock: 40 },
            { name: "Arabic 4", color: "Navy Blue", colorHex: "#2B2D42", image: "/images/Arabic Series/DSCF5905 Copy.jpg", stock: 40 },
            { name: "Arabic 5", color: "Rose Pink", colorHex: "#D8BFD8", image: "/images/Arabic Series/DSCF6093 Copy.jpg", stock: 40 }
        ]
    },
    {
        id: 25,
        name: "Keffiyeh Series",
        price: 249000,
        image: "/images/Keffiyeh/HJB211224A-1-mockupD.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Monochrome",
        colorHex: "#1A1A1A",
        badge: "new",
        description: "A symbol of solidarity and style. Our Keffiyeh Series reinterprets the traditional Palestinian keffiyeh pattern into a modern hijab scarf, available in five versatile colors. Lightweight and easy to style for daily wear.",
        variants: [
            { name: "Keffiyeh 1", color: "Grey", colorHex: "#A9A9A9", image: "/images/Keffiyeh/HJB211224A-1-mockupD.jpg", stock: 100 },
            { name: "Keffiyeh 2", color: "Cream", colorHex: "#F5F5DC", image: "/images/Keffiyeh/HJB211224A-2-mockupD.jpg", stock: 100 },
            { name: "Keffiyeh 3", color: "Black", colorHex: "#1A1A1A", image: "/images/Keffiyeh/HJB211224A-3-mockupD.jpg", stock: 100 },
            { name: "Keffiyeh 4", color: "Dusty Rose", colorHex: "#C9A8A0", image: "/images/Keffiyeh/HJB211224A-4-mockupD.jpg", stock: 100 },
            { name: "Keffiyeh 5", color: "Dark Olive", colorHex: "#556B2F", image: "/images/Keffiyeh/HJB211224A-5-mockupD.jpg", stock: 100 }
        ]
    },
    {
        id: 26,
        name: "Monogram Gradasi",
        price: 249000,
        image: "/images/Monogram Gradasi/251224AA-1-mockupD.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Burgundy",
        colorHex: "#4A2028",
        badge: "new",
        description: "Our signature, elevated. The Monogram Gradasi features the DEENHA monogram in a stunning gradient effect, creating a subtle yet luxurious look. A statement piece that tells the world you value quality and craftsmanship.",
        variants: [
            { name: "Monogram 1", color: "Burgundy", colorHex: "#4A2028", image: "/images/Monogram Gradasi/251224AA-1-mockupD.jpg", stock: 50 },
            { name: "Monogram 2", color: "Cream", colorHex: "#B5A48A", image: "/images/Monogram Gradasi/251224AA-2-mockupD.jpg", stock: 50 },
            { name: "Monogram 3", color: "Dusty Rose", colorHex: "#C9A8A0", image: "/images/Monogram Gradasi/251224AA-3-mockupD.jpg", stock: 50 },
            { name: "Monogram 4", color: "Charcoal", colorHex: "#4A4A4A", image: "/images/Monogram Gradasi/251224AA-4-mockupD.jpg", stock: 50 },
            { name: "Monogram 5", color: "Dark Olive", colorHex: "#8B7E3A", image: "/images/Monogram Gradasi/251224AA-5-mockupD.jpg", stock: 50 }
        ]
    },

];

export const categories = [
    { name: "Scarves", count: 16, image: "/images/image-1-m5KMww5a1eHrGa7j.jpg" },
    { name: "Dresses", count: 3, image: "/images/dress-YD0l6pXPkZSqM41l.png" },
    { name: "Bergo", count: 3, image: "/images/bergo-A1aPwKX8JgfWab9g.png" },
    { name: "Pray Set", count: 2, image: "/images/prayset-mnlWv3KxDvf1NbQn.png" },
    { name: "Hampers", count: 2, image: "/images/hampers-1-dWxvylrBJ6IBxzqB.jpg" }
];

export const colors = [
    { name: "Black", hex: "#1A1A1A" },
    { name: "White", hex: "#FFFFFF" },
    { name: "Cream", hex: "#F5F5DC" },
    { name: "Dusty Rose", hex: "#D4A5A5" },
    { name: "Sage Green", hex: "#9CAF88" },
    { name: "Navy", hex: "#2C3E50" },
    { name: "Grey", hex: "#808080" },
    { name: "Camel", hex: "#C19A6B" },
];
