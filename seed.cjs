const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
        stock: 20
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
        sold_count: 128
    },
    {
        name: "Amira Cotton Bergo",
        price: 149000,
        image: "/images/bergo-A1aPwKX8JgfWab9g.png",
        category: "Bergo",
        size: ["S", "M", "L"],
        color: "Black",
        color_hex: "#1A1A1A",
        sold_count: 89
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
        sold_count: 67
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
        sold_count: 234
    },
    {
        name: "Safa Printed Scarf",
        price: 159000,
        image: "/images/image-3-Awv4MMNq3XCKgVv3.jpg",
        category: "Scarves",
        size: ["110x110"],
        color: "Cream",
        color_hex: "#F5F5DC",
        sold_count: 56
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
        sold_count: 34
    },
    {
        name: "Aisha Maxi Dress",
        price: 529000,
        image: "/images/image-product-4-Yan1yzVZD4UvpqW3.jpg",
        category: "Dresses",
        size: ["S", "M", "L", "XL"],
        color: "Burgundy",
        color_hex: "#800020",
        sold_count: 78
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
        sold_count: 145
    },
    {
        name: "Khadijah Chiffon Scarf",
        price: 179000,
        image: "/images/heritage-design-Aq2WvB4Gj1flwP1L.jpg",
        category: "Scarves",
        size: ["120x120"],
        color: "Blush Pink",
        color_hex: "#FFB6C1",
        sold_count: 98
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
        sold_count: 23
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
        stock: 20
    }
];

async function seed() {
    console.log('Seeding products to Supabase...');
    const { data, error } = await supabase
        .from('products')
        .insert(products);

    if (error) {
        console.error('Error seeding data:', error);
    } else {
        console.log('Successfully seeded all products!');
    }
}

seed();
