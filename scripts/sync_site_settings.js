
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const DEFAULT_ANNOUNCEMENTS = [
    "🌙 Pre-Raya Special: Luxury Hampers & Signature Scarves Highlights",
    "🌍 International Shipping Available",
    "✨ Complimentary Shipping on Orders over Rp 500.000",
    "🎁 Use DEENHA10 for 10% off your first purchase"
];

const DEFAULT_SLIDES = [
    {
        type: 'video',
        src: "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/promo_video.mp4",
        title: "",
        subtitle: "",
        description: "."
    },
    {
        type: 'video',
        src: "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/summer_collection.mp4",
        title: "",
        subtitle: "",
        description: "."
    },
    {
        type: 'video',
        src: "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/vintage_flower.mp4",
        title: "",
        subtitle: "",
        description: "  ."
    },
    {
        type: 'video',
        src: "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/pashmina_crinkle.mp4",
        title: "",
        subtitle: "",
        description: ""
    },
    {
        type: 'video',
        src: "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/hampers_mukena.mp4",
        title: "",
        subtitle: "",
        description: ""
    }
];

const DEFAULT_HIGHLIGHTS = [
    {
        title: "Pre-Raya Special",
        bannerImage: "/images/hampers-1-dWxvylrBJ6IBxzqB.jpg",
        collectionTitle: "Luxury Hampers",
        collectionDescription: "The perfect gift of gratitude. Our curated Raya hampers are elegantly packaged with our signature touch, making them the ultimate way to share joy with your loved ones.",
        category: "Hampers"
    },
    {
        title: "Raya Essentials",
        bannerImage: "/images/image-1-m5KMww5a1eHrGa7j.jpg",
        collectionTitle: "Signature Scarves",
        collectionDescription: "Discover our most-loved Monogram and Crystal series. Crafted from premium voal for effortless elegance during your Raya celebrations.",
        category: "Scarves"
    },
    {
        title: "New Season",
        bannerImage: "/images/new-arrival-mv0WD7ngy7FZoWXE.jpg",
        collectionTitle: "Pre-Raya Lookbook",
        collectionDescription: "From timeless silhouettes to modern modest wear, explore our latest release designed specifically for the upcoming holy season.",
        category: "New Arrival"
    },
    {
        title: "Spiritual Series",
        bannerImage: "/images/image-product-3-YKb36NKv2VHk924E.jpg",
        collectionTitle: "Prayer Sets",
        collectionDescription: "Experience serenity in every prayer with our premium prayer sets, featuring delicate lace and breathable fabrics for ultimate comfort.",
        category: "Pray Set"
    }
];

async function syncSettings() {
    console.log('Syncing site settings to Supabase...');

    const settings = [
        { key: 'announcements', value: DEFAULT_ANNOUNCEMENTS },
        { key: 'hero_slides', value: DEFAULT_SLIDES },
        { key: 'home_highlights', value: DEFAULT_HIGHLIGHTS }
    ];

    for (const { key, value } of settings) {
        console.log(`Updating ${key}...`);
        const { error } = await supabase
            .from('site_settings')
            .upsert({ key, value, updated_at: new Date().toISOString() });

        if (error) {
            console.error(`Error updating ${key}:`, error.message);
        } else {
            console.log(`Successfully updated ${key}.`);
        }
    }

    console.log('Sync complete!');
}

syncSettings();
