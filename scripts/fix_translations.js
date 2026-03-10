import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');
const envConfig = {};

try {
    const envFile = fs.readFileSync(envPath, 'utf-8');
    envFile.split('\n').forEach(line => {
        const [key, ...rest] = line.split('=');
        if (key && rest.length > 0) {
            envConfig[key.trim()] = rest.join('=').trim();
        }
    });
} catch (e) {
    console.error('Error reading .env:', e);
    process.exit(1);
}

const supabaseUrl = envConfig['VITE_SUPABASE_URL'];
const supabaseKey = envConfig['VITE_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

async function fix() {
    const homeHighlights = [
        {
            "title": "Spesial Pre-Raya",
            "bannerImage": "/images/hampers-1-dWxvylrBJ6IBxzqB.jpg",
            "collectionTitle": "Hampers Mewah",
            "collectionDescription": "Hadiah kesyukuran yang sempurna. Hampers Raya kami dikemas secara elegan dengan sentuhan khas kami, menjadikannya cara terbaik untuk berbagi kebahagiaan dengan orang tercinta.",
            "category": "Hampers"
        },
        {
            "title": "Eksklusif Raya",
            "bannerImage": "/images/image-1-m5KMww5a1eHrGa7j.jpg",
            "collectionTitle": "Signature Scarves",
            "collectionDescription": "Temukan seri Monogram dan Crystal kami yang paling dicintai. Dibuat dari voal premium untuk keanggunan tanpa batas selama perayaan Raya Anda.",
            "category": "Scarves"
        },
        {
            "title": "Koleksi Terbaru",
            "bannerImage": "/images/new-arrival-mv0WD7ngy7FZoWXE.jpg",
            "collectionTitle": "Koleksi Baru",
            "collectionDescription": "Jelajahi rilisan terbaru dari DEENHA. Hadir dengan desain eksklusif yang memadukan keanggunan klasik dan kenyamanan modern untuk tampilan syar'i Anda.",
            "category": "New Arrival"
        }
    ];

    const announcements = [
        "🌙 Spesial Pre-Raya: Koleksi Hampers Mewah & Sorotan Scarf Signature",
        "🌍 Pengiriman Internasional Tersedia",
        "✨ Gratis Ongkir untuk Pesanan di atas Rp 500.000",
        "🎁 Gunakan DEENHA10 untuk diskon 10% pada pembelian pertama Anda"
    ];

    await supabase.from('site_settings').upsert([
        { key: 'home_highlights', value: homeHighlights },
        { key: 'announcements', value: announcements }
    ]);

    console.log("Database updated successfully to Indonesian.");
}

fix();
