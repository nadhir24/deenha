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
        id: 14,
        name: "Ramadan Blessing Hamper",
        price: 750000,
        image: "/images/hampers-2-AQExyJRDj2iGJGkQ.jpg",
        category: "Hampers",
        size: ["Premium"],
        color: "Pine Green",
        colorHex: "#01796F",
        badge: "bestseller",
        soldCount: 25,
        description: "Celebrate the holy month with the Ramadan Blessing Hamper. Filled with premium prayer essentials and treats, it's a thoughtful way to connect with loved ones during Ramadan."
    }
];

export const categories = [
    { name: "Scarves", count: 4, image: "/images/image-1-m5KMww5a1eHrGa7j.jpg" },
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
