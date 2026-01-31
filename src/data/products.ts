export interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: 'Scarves' | 'Dresses' | 'Bergo' | 'Pray Set';
    size: string[];
    color: string;
    colorHex: string;
    badge?: 'new' | 'bestseller' | 'sale';
    soldCount?: number;
    stock?: number;
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
        soldCount: 45
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
        soldCount: 128
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
        soldCount: 89
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
        soldCount: 67
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
        soldCount: 234
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
        soldCount: 56
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
        soldCount: 34
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
        soldCount: 78
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
        soldCount: 145
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
        soldCount: 98
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
        soldCount: 23
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
        stock: 20
    }
];

export const categories = [
    { name: "Scarves", count: 4, image: "/images/image-1-m5KMww5a1eHrGa7j.jpg" },
    { name: "Dresses", count: 3, image: "/images/dress-YD0l6pXPkZSqM41l.png" },
    { name: "Bergo", count: 3, image: "/images/bergo-A1aPwKX8JgfWab9g.png" },
    { name: "Pray Set", count: 2, image: "/images/prayset-mnlWv3KxDvf1NbQn.png" }
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
