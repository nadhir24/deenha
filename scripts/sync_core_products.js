
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');
const envConfig = {};
const envFile = fs.readFileSync(envPath, 'utf-8');
envFile.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        envConfig[key.trim()] = value.trim();
    }
});

const supabaseUrl = envConfig['VITE_SUPABASE_URL'];
const supabaseKey = envConfig['VITE_SUPABASE_ANON_KEY'];

const supabase = createClient(supabaseUrl, supabaseKey);

async function sync() {
    console.log('Syncing Chiffon and Jersey products to Supabase...');

    const coreProducts = [
        {
            name: "Instant Chiffon Hijab",
            price: 159000,
            image: "/images/heritage-design-Aq2WvB4Gj1flwP1L.jpg",
            category: "Chiffon Hijab",
            size: ["170x70"],
            color: "Blush Pink",
            color_hex: "#FFB6C1",
            badge: "new",
            sold_count: 156,
            stock: 100,
            description: "Slip on a polished hijab look in under 30 seconds. Our instant chiffon hijab is designed for women who want full coverage without the fuss of pinning. Fabric: Lightweight chiffon — soft, breathable, and perfect for warm weather or all-day wear. Fit: One-size pull-on style with an inner jersey band that holds firmly without pins. Coverage: 170cm x 70cm — full shoulder and chest coverage."
        },
        {
            name: "Premium Jersey Hijab",
            price: 129000,
            image: "/images/bergo-A1aPwKX8JgfWab9g.png",
            category: "Jersey Hijab",
            size: ["Standard"],
            color: "Midnight Black",
            color_hex: "#1A1A1A",
            badge: "bestseller",
            sold_count: 284,
            stock: 100,
            description: "Soft. Stretchy. Stays in place. Our premium jersey hijab is a fan favourite for a reason — zero pins, all-day comfort, and effortlessly modest. Perfect for everyday wear, work, and everything in between."
        }
    ];

    for (const p of coreProducts) {
        // Upsert by name
        const { data: existing } = await supabase.from('products').select('id').eq('name', p.name).single();
        
        if (existing) {
            console.log(`Updating ${p.name}...`);
            await supabase.from('products').update(p).eq('id', existing.id);
        } else {
            console.log(`Inserting ${p.name}...`);
            await supabase.from('products').insert([p]);
        }
    }

    // Update existing Khadijah category
    console.log('Updating Khadijah Chiffon Scarf category...');
    await supabase.from('products').update({ category: 'Chiffon Hijab' }).eq('name', 'Khadijah Chiffon Scarf');

    console.log('Done!');
}

sync();
