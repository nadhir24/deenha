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

async function fixHighlights() {
    // 1. Fetch existing to preserve productIds and existing structure
    const { data: existingData } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'home_highlights')
        .single();

    let existingHighlights = [];
    if (existingData && existingData.value) {
        existingHighlights = existingData.value;
    }

    // Target translation mapping for known English categories
    const translations = {
        "Pre-Raya Special": {
            "title": "Spesial Pre-Raya",
            "collectionTitle": "Koleksi Terbaru",
            "collectionDescription": "Hadiah kesyukuran yang sempurna. Hampers Raya kami dikemas secara elegan dengan sentuhan khas kami, menjadikannya cara terbaik untuk berbagi kebahagiaan dengan orang tercinta."
        },
        "Raya Essentials": {
            "title": "Eksklusif Raya",
            "collectionTitle": "Warisan Indonesia",
            "collectionDescription": "Temukan koleksi eksklusif kami. Dibuat dari voal premium untuk keanggunan tanpa batas selama perayaan Raya Anda."
        },
        "New Seasons": {
            "title": "Musim Baru",
            "collectionTitle": "Katalog Pre-Raya",
            "collectionDescription": "Dari siluet abadi hingga pakaian modest modern, jelajahi rilis terbaru kami yang dirancang khusus untuk musim suci mendatang."
        },
        "Spiritual Series": {
            "title": "Seri Spiritual",
            "collectionTitle": "Perlengkapan Ibadah",
            "collectionDescription": "Rasakan ketenangan dalam setiap doa dengan set mukena premium kami, menampilkan benang berkualitas dan bahan yang sejuk untuk kenyamanan maksimal."
        }
    };

    // Update highlights
    const updatedHighlights = existingHighlights.map(h => {
        const tr = translations[h.title];
        if (tr) {
            return {
                ...h,
                title: tr.title,
                collectionTitle: tr.collectionTitle,
                collectionDescription: tr.collectionDescription,
                category: h.category
            };
        }
        return h;
    });

    // Save back to Supabase
    const { error } = await supabase
        .from('site_settings')
        .upsert({ key: 'home_highlights', value: updatedHighlights });

    if (error) {
        console.error("Error updating:", error);
    } else {
        console.log("Database updated successfully to Indonesian, preserving product IDs.");
    }
}

fixHighlights();
