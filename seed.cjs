const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
    {
        name: "Eliza Premium Voal Scarf",
        price: 189000,
        image: "/images/image-1-m5KMww5a1eHrGa7j.jpg",
        category: "Scarves",
        size: ["110x110"],
        color: "Dusty Rose",
        color_hex: "#D4A5A5",
        badge: "new",
        sold_count: 45,
        stock: 40,
        description: "Elegant and versatile, the Eliza Premium Voal Scarf is a wardrobe essential. Crafted from high-quality voal, it offers a soft touch and easy styling for any occasion. Perfect for both casual and formal looks.",
        variants: []
    },
    {
        name: "Luna Silk Scarf Collection",
        price: 259000,
        image: "/images/image-2-A85ewwvLJairzx6O.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Sage Green",
        color_hex: "#9CAF88",
        badge: "bestseller",
        sold_count: 128,
        stock: 128,
        description: "Soft. Shiny. Sophisticated. Our Luna Silk Scarf Collection brings a touch of luxury to your everyday style. The smooth texture ensures a flawless drape, making it perfect for special events or elevating your daily outfit.",
        variants: []
    },
    {
        name: "Amira Cotton Bergo",
        price: 149000,
        image: "/images/bergo-A1aPwKX8JgfWab9g.png",
        category: "Bergo",
        size: ["S", "M", "L"],
        color: "Black",
        color_hex: "#1A1A1A",
        sold_count: 89,
        stock: 100,
        description: "Slip on a polished look in seconds. The Amira Cotton Bergo is designed for women who want full coverage without the fuss of pinning. Soft, breathable, and perfect for all-day wear. A must-have for your modest wardrobe.",
        variants: []
    },
    {
        name: "Zahra Elegant Dress",
        price: 459000,
        original_price: 599000,
        image: "/images/dress-YD0l6pXPkZSqM41l.png",
        category: "Dresses",
        size: ["S", "M", "L", "XL"],
        color: "Navy",
        color_hex: "#2C3E50",
        badge: "sale",
        sold_count: 67,
        stock: 50,
        description: "Graceful and timeless, the Zahra Elegant Dress features a flowing silhouette that flatters every figure. Made with premium fabric that moves with you, ensuring comfort and style for weddings, Eid, or formal gatherings.",
        variants: []
    },
    {
        name: "Fatima Premium Pray Set",
        price: 389000,
        image: "/images/prayset-mnlWv3KxDvf1NbQn.png",
        category: "Pray Set",
        size: ["All Size"],
        color: "White",
        color_hex: "#FFFFFF",
        badge: "bestseller",
        sold_count: 234,
        stock: 100,
        description: "Experience spiritual comfort with the Fatima Premium Pray Set. Crafted from soft, breathable material that keeps you cool during prayer. Includes a matching bag for easy travel and storage.",
        variants: []
    },
    {
        name: "Safa Printed Scarf",
        price: 159000,
        image: "/images/image-3-Awv4MMNq3XCKgVv3.jpg",
        category: "Scarves",
        size: ["110x110"],
        color: "Cream",
        color_hex: "#F5F5DC",
        sold_count: 56,
        stock: 50,
        description: "Add a pop of pattern to your look with the Safa Printed Scarf. Featuring unique designs and lightweight fabric, it's the perfect accessory to express your personal style while maintaining modesty.",
        variants: []
    },
    {
        name: "Mariam Daily Bergo",
        price: 129000,
        image: "/images/image-product-2-d951KrVPy9CvgLle.jpg",
        category: "Bergo",
        size: ["S", "M", "L"],
        color: "Camel",
        color_hex: "#C19A6B",
        badge: "new",
        sold_count: 34,
        stock: 50,
        description: "Your go-to for daily comfort. The Mariam Daily Bergo offers a practical, pin-less solution for busy days. Lightweight and durable, it withstands daily wear while keeping you looking neat and covered.",
        variants: []
    },
    {
        name: "Aisha Maxi Dress",
        price: 529000,
        image: "/images/image-product-4-Yan1yzVZD4UvpqW3.jpg",
        category: "Dresses",
        size: ["S", "M", "L", "XL"],
        color: "Burgundy",
        color_hex: "#800020",
        sold_count: 78,
        stock: 50,
        description: "Make a statement with the Aisha Maxi Dress. Its rich color and elegant cut create a stunning look for any special occasion. Designed with modesty and modern fashion in mind.",
        variants: []
    },
    {
        name: "Nadia Travel Pray Set",
        price: 349000,
        original_price: 429000,
        image: "/images/image-product-3-YKb36NKv2VHk924E.jpg",
        category: "Pray Set",
        size: ["All Size"],
        color: "Grey",
        color_hex: "#808080",
        badge: "sale",
        sold_count: 145,
        stock: 50,
        description: "Compact and convenient. The Nadia Travel Pray Set is lightweight and folds easily, making it the perfect companion for your journeys. Never compromise on your prayer essentials while on the go.",
        variants: []
    },
    {
        name: "Khadijah Chiffon Scarf",
        price: 179000,
        image: "/images/heritage-design-Aq2WvB4Gj1flwP1L.jpg",
        category: "Scarves",
        size: ["120x120"],
        color: "Blush Pink",
        color_hex: "#FFB6C1",
        sold_count: 98,
        stock: 50,
        description: "Hot weather hijab hack: go chiffon. Lightweight, breathable, and so elegant — our Khadijah Chiffon Scarf keeps you cool and covered all summer long. A wardrobe staple for every season.",
        variants: []
    },
    {
        name: "Yasmin Sport Bergo",
        price: 139000,
        image: "/images/bergo-A1aPwKX8JgfWab9g_943.png",
        category: "Bergo",
        size: ["S", "M", "L"],
        color: "Olive",
        color_hex: "#808000",
        badge: "new",
        sold_count: 23,
        stock: 50,
        description: "Stay active and modest with the Yasmin Sport Bergo. Designed with moisture-wicking fabric to keep you dry and comfortable during workouts. Secure fit ensures it stays in place while you move.",
        variants: []
    },
    {
        name: "Halima Abaya Dress",
        price: 679000,
        image: "/images/image-product-A85ewr03pkt7BqEa.jpg",
        category: "Dresses",
        size: ["S", "M", "L", "XL"],
        color: "Black",
        color_hex: "#1A1A1A",
        badge: "bestseller",
        sold_count: 189,
        stock: 20,
        description: "The epitome of modest elegance. The Halima Abaya Dress offers a loose, flowing fit that provides maximum coverage without sacrificing style. Perfect for formal events or religious gatherings.",
        variants: []
    },
    {
        name: "Signature Gift Box",
        price: 450000,
        image: "/images/hampers-1-dWxvylrBJ6IBxzqB.jpg",
        category: "Hampers",
        size: ["Standard"],
        color: "Gold",
        color_hex: "#D4AF37",
        badge: "new",
        sold_count: 12,
        stock: 50,
        description: "Share the love with our Signature Gift Box. Curated with our finest products, it's the perfect gift for friends, family, or yourself. beautifully packaged to make every unboxing a special moment.",
        variants: []
    },
    {
        name: "Ramadan Blessing Hamper",
        price: 750000,
        image: "/images/hampers-2-AQExyJRDj2iGJGkQ.jpg",
        category: "Hampers",
        size: ["Premium"],
        color: "Pine Green",
        color_hex: "#01796F",
        badge: "bestseller",
        sold_count: 25,
        stock: 50,
        description: "Celebrate the holy month with the Ramadan Blessing Hamper. Filled with premium prayer essentials and treats, it's a thoughtful way to connect with loved ones during Ramadan.",
        variants: []
    },
    {
        name: "Cairo Series",
        price: 249000,
        image: "/images/CAIRO SERIES-20260211T044831Z-1-001/CAIRO SERIES/DSCF2139 Copy.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Sage Teal",
        color_hex: "#7A9E8E",
        badge: "new",
        stock: 50,
        variants: [
            { name: "Cairo Series", color: "Sage Teal", colorHex: "#7A9E8E", image: "/images/CAIRO SERIES-20260211T044831Z-1-001/CAIRO SERIES/DSCF2139 Copy.jpg", stock: 50 },
            { name: "Cairo Series", color: "Rose Brown", colorHex: "#A67B6B", image: "/images/CAIRO SERIES-20260211T044831Z-1-001/CAIRO SERIES/1614405676264.jpg", stock: 50 },
            { name: "Cairo Series", color: "Olive Brown", colorHex: "#6B7B3A", image: "/images/CAIRO SERIES-20260211T044831Z-1-001/CAIRO SERIES/1614405676587.jpg", stock: 50 },
            { name: "Cairo Series", color: "Navy Grey", colorHex: "#5C6670", image: "/images/CAIRO SERIES-20260211T044831Z-1-001/CAIRO SERIES/1614405678222.jpg", stock: 50 }
        ]
    },
    {
        name: "Hagia Sophia Series",
        price: 285000,
        image: "/images/HAGIA SOPHIA SERIES (285K)-20260211T044838Z-1-001/HAGIA SOPHIA SERIES (285K)/DSCF2052 Copy.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Lavender",
        color_hex: "#8B7D9A",
        badge: "new",
        stock: 50,
        variants: [
            { name: "Hagia Sophia Series", color: "Lavender", colorHex: "#8B7D9A", image: "/images/HAGIA SOPHIA SERIES (285K)-20260211T044838Z-1-001/HAGIA SOPHIA SERIES (285K)/DSCF2052 Copy.jpg", stock: 50 },
            { name: "Hagia Sophia Series", color: "Brown Olive", colorHex: "#8B6B3A", image: "/images/HAGIA SOPHIA SERIES (285K)-20260211T044838Z-1-001/HAGIA SOPHIA SERIES (285K)/1614405675905.jpg", stock: 50 },
            { name: "Hagia Sophia Series", color: "Blue Mosaic", colorHex: "#5B9EC4", image: "/images/HAGIA SOPHIA SERIES (285K)-20260211T044838Z-1-001/HAGIA SOPHIA SERIES (285K)/DSCF2631 Copy.jpg", stock: 50 },
            { name: "Hagia Sophia Series", color: "Silver Grey", colorHex: "#8A9099", image: "/images/HAGIA SOPHIA SERIES (285K)-20260211T044838Z-1-001/HAGIA SOPHIA SERIES (285K)/1614405676060.jpg", stock: 50 }
        ]
    },
    {
        name: "Kintsugi Japan Series",
        price: 249000,
        image: "/images/KINTSUGI JAPAN SERIES-20260211T044833Z-1-001/KINTSUGI JAPAN SERIES/FEED 1.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Beige Gold",
        color_hex: "#C4A46C",
        badge: "new",
        stock: 50,
        variants: [
            { name: "Kintsugi Japan Series", color: "Beige Gold", colorHex: "#C4A46C", image: "/images/KINTSUGI JAPAN SERIES-20260211T044833Z-1-001/KINTSUGI JAPAN SERIES/FEED 1.jpg", stock: 50 },
            { name: "Kintsugi Japan Series", color: "Sage Green", colorHex: "#9CAF88", image: "/images/KINTSUGI JAPAN SERIES-20260211T044833Z-1-001/KINTSUGI JAPAN SERIES/IMG_4326.jpg", stock: 50 },
            { name: "Kintsugi Japan Series", color: "Light Blue", colorHex: "#A8C4D6", image: "/images/KINTSUGI JAPAN SERIES-20260211T044833Z-1-001/KINTSUGI JAPAN SERIES/IMG_4338.jpg", stock: 50 }
        ]
    },
    {
        name: "Borneo Scarves",
        price: 249000,
        image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Borneo Scarves Series/_DSC1648 Copy.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Mauve",
        color_hex: "#9B8B7A",
        badge: "new",
        stock: 50,
        variants: [
            { name: "Borneo Scarves", color: "Mauve", colorHex: "#9B8B7A", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Borneo Scarves Series/_DSC1648 Copy.jpg", stock: 50 },
            { name: "Borneo Scarves", color: "Teal", colorHex: "#5F7A7E", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Borneo Scarves Series/_DSC1681 Copy.jpg", stock: 50 },
            { name: "Borneo Scarves", color: "Light Grey", colorHex: "#C5C5C5", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Borneo Scarves Series/_DSC8283_.jpg", stock: 50 }
        ]
    },
    {
        name: "Kawung Scarves",
        price: 249000,
        image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Kawung Scarves Series/IMG_6310.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Dusty Rose",
        color_hex: "#8B7090",
        badge: "new",
        stock: 50,
        variants: [
            { name: "Kawung Scarves", color: "Dusty Rose", colorHex: "#8B7090", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Kawung Scarves Series/IMG_6310.jpg", stock: 50 },
            { name: "Kawung Scarves", color: "Sage Grey", colorHex: "#8A9488", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Kawung Scarves Series/IMG_6315.jpg", stock: 50 },
            { name: "Kawung Scarves", color: "Maroon Beige", colorHex: "#8B5A4A", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Kawung Scarves Series/IMG_6320.jpg", stock: 50 },
            { name: "Kawung Scarves", color: "Dark Teal", colorHex: "#3A4A4A", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Kawung Scarves Series/IMG_6325.jpg", stock: 50 }
        ]
    },
    {
        name: "Parang Scarves",
        price: 249000,
        image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Parang Scarves Series/_DSC9499 copy IG.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Camel",
        color_hex: "#A07050",
        badge: "new",
        stock: 50,
        variants: [
            { name: "Parang Scarves", color: "Camel", colorHex: "#A07050", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Parang Scarves Series/_DSC9499 copy IG.jpg", stock: 50 },
            { name: "Parang Scarves", color: "Emerald Teal", colorHex: "#3A6B5A", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Parang Scarves Series/IMG_0577.jpeg", stock: 50 },
            { name: "Parang Scarves", color: "Blue Turquoise", colorHex: "#5B8A9A", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Parang Scarves Series/IMG_0582.jpeg", stock: 50 },
            { name: "Parang Scarves", color: "Dusty Pink", colorHex: "#B08A8A", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Parang Scarves Series/IMG_0586.jpeg", stock: 50 }
        ]
    },
    {
        name: "Songket Scarves",
        price: 249000,
        image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Songket Scarves Series/IMG_6351.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Navy Blue",
        color_hex: "#5A6B7B",
        badge: "new",
        stock: 50,
        variants: [
            { name: "Songket Scarves", color: "Navy Blue", colorHex: "#5A6B7B", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Songket Scarves Series/IMG_6351.jpg", stock: 50 },
            { name: "Songket Scarves", color: "Rose Pink", colorHex: "#C06080", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Songket Scarves Series/IMG_6370.jpg", stock: 50 },
            { name: "Songket Scarves", color: "Teal Brown", colorHex: "#6A7B70", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Songket Scarves Series/IMG_6375.jpg", stock: 50 },
            { name: "Songket Scarves", color: "Lilac Grey", colorHex: "#9A8A9A", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Songket Scarves Series/IMG_0898.jpg", stock: 50 }
        ]
    },
    {
        name: "Lombok Scarves",
        price: 249000,
        image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Lombok Scarves Series (Sejauh Mata Memandang)/DSCF2189 Copy.jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Terracotta",
        color_hex: "#C25B4E",
        badge: "new",
        stock: 50,
        variants: [
            { name: "Lombok Scarves", color: "Terracotta", colorHex: "#C25B4E", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Lombok Scarves Series (Sejauh Mata Memandang)/DSCF2189 Copy.jpg", stock: 50 },
            { name: "Lombok Scarves", color: "Emerald Green", colorHex: "#2E6B4A", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Lombok Scarves Series (Sejauh Mata Memandang)/DSCF2493 Copy.jpg", stock: 50 },
            { name: "Lombok Scarves", color: "White Blue", colorHex: "#B8D0E0", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Lombok Scarves Series (Sejauh Mata Memandang)/DSCF2540 Copy.jpg", stock: 50 },
            { name: "Lombok Scarves", color: "Camel Orange", colorHex: "#C08040", image: "/images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara/Lombok Scarves Series (Sejauh Mata Memandang)/DSCF2578 Copy.jpg", stock: 50 }
        ]
    },
    {
        name: "Tokyo Exclusive",
        price: 249000,
        image: "/images/Tokyo Exclusive/Pic/Pic (1).jpg",
        category: "Scarves",
        size: ["115x115"],
        color: "Navy Mocha",
        color_hex: "#4A3B32",
        badge: "new",
        stock: 50,
        variants: [
            { name: "Tokyo Exclusive", color: "Navy Mocha", colorHex: "#4A3B32", image: "/images/Tokyo Exclusive/Pic/Pic (1).jpg", stock: 50 },
            { name: "Tokyo Exclusive", color: "Ash Blue", colorHex: "#6A7B8C", image: "/images/Tokyo Exclusive/Pic/Pic (2).jpg", stock: 50 },
            { name: "Tokyo Exclusive", color: "Sand Beige", colorHex: "#C2B290", image: "/images/Tokyo Exclusive/Pic/Pic (5).jpg", stock: 50 },
            { name: "Tokyo Exclusive", color: "Burgundy Rose", colorHex: "#8A3B4C", image: "/images/Tokyo Exclusive/Pic/Pic (6).jpg", stock: 50 }
        ]
    }
];

async function seed() {
    console.log('Seeding products to Supabase...');

    // 1. Clear existing products
    console.log('Cleaning up existing products...');
    const { error: deleteError } = await supabase.from('products').delete().neq('id', 0);
    if (deleteError) {
        console.error('Error cleaning table:', deleteError);
        console.log('Hint: Check if your RLS policy allows DELETE for anon role, or use SERVICE_ROLE_KEY.');
        return;
    }

    // 2. Insert new products
    console.log(`Inserting ${products.length} products...`);
    const { data, error } = await supabase.from('products').insert(products);

    if (error) {
        console.error('Error seeding products:', error);
        console.log('Hint: Check if your RLS policy allows INSERT for anon role.');
    } else {
        console.log('Successfully seeded database!');
    }
}

seed();
