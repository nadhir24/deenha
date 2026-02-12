
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env manually
const envPath = path.resolve(__dirname, '../.env');
console.log('Reading .env from:', envPath);
const envConfig = {};

try {
    const envFile = fs.readFileSync(envPath, 'utf-8');
    envFile.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            envConfig[key.trim()] = value.trim();
        }
    });
} catch (e) {
    console.error('Error reading .env:', e);
    process.exit(1);
}

const supabaseUrl = envConfig['VITE_SUPABASE_URL'];
const supabaseKey = envConfig['VITE_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================================
// PRODUCT GROUPS
// Cairo, Hagia Sophia, Kintsugi = same as before
// Warisan Nusantara = 5 SEPARATE products, each with color variants
// ============================================================

const productGroups = [
    // ── Cairo Series ──────────────────────────────────────
    {
        name: 'Cairo Series',
        price: 249000,
        category: 'Scarves',
        size: ['115x115'],
        badge: 'new',
        variants: [
            {
                file: 'public/new_products/CAIRO SERIES/DSCF2139 Copy.jpg',
                color: 'Sage Teal',
                hex: '#7A9E8E',
                stock: 50
            },
            {
                file: 'public/new_products/CAIRO SERIES/1614405676264.jpg',
                color: 'Rose Brown',
                hex: '#A67B6B',
                stock: 50
            },
            {
                file: 'public/new_products/CAIRO SERIES/1614405676587.jpg',
                color: 'Olive Brown',
                hex: '#6B7B3A',
                stock: 50
            },
            {
                file: 'public/new_products/CAIRO SERIES/1614405678222.jpg',
                color: 'Navy Grey',
                hex: '#5C6670',
                stock: 50
            }
        ]
    },

    // ── Hagia Sophia Series ───────────────────────────────
    {
        name: 'Hagia Sophia Series',
        price: 285000,
        category: 'Scarves',
        size: ['115x115'],
        badge: 'new',
        variants: [
            {
                file: 'public/new_products/HAGIA SOPHIA SERIES (285K)/DSCF2052 Copy.jpg',
                color: 'Lavender',
                hex: '#8B7D9A',
                stock: 50
            },
            {
                file: 'public/new_products/HAGIA SOPHIA SERIES (285K)/1614405675905.jpg',
                color: 'Brown Olive',
                hex: '#8B6B3A',
                stock: 50
            },
            {
                file: 'public/new_products/HAGIA SOPHIA SERIES (285K)/DSCF2631 Copy.jpg',
                color: 'Blue Mosaic',
                hex: '#5B9EC4',
                stock: 50
            },
            {
                file: 'public/new_products/HAGIA SOPHIA SERIES (285K)/1614405676060.jpg',
                color: 'Silver Grey',
                hex: '#8A9099',
                stock: 50
            }
        ]
    },

    // ── Kintsugi Japan Series ─────────────────────────────
    {
        name: 'Kintsugi Japan Series',
        price: 249000,
        category: 'Scarves',
        size: ['115x115'],
        badge: 'new',
        variants: [
            {
                file: 'public/new_products/KINTSUGI JAPAN SERIES/FEED 1.jpg',
                color: 'Beige Gold',
                hex: '#C4A46C',
                stock: 50
            },
            {
                file: 'public/new_products/KINTSUGI JAPAN SERIES/IMG_4326.jpg',
                color: 'Sage Green',
                hex: '#9CAF88',
                stock: 50
            },
            {
                file: 'public/new_products/KINTSUGI JAPAN SERIES/IMG_4338.jpg',
                color: 'Light Blue',
                hex: '#A8C4D6',
                stock: 50
            }
        ]
    },

    // ══════════════════════════════════════════════════════
    // WARISAN NUSANTARA — 5 separate products
    // ══════════════════════════════════════════════════════

    // ── Borneo Scarves ────────────────────────────────────
    {
        name: 'Borneo Scarves',
        price: 249000,
        category: 'Scarves',
        size: ['115x115'],
        badge: 'new',
        variants: [
            {
                file: 'public/new_products/Warisan Nusantara/Borneo Scarves Series/_DSC1648 Copy.jpg',
                color: 'Mauve',
                hex: '#9B8B7A',
                stock: 50
            },
            {
                file: 'public/new_products/Warisan Nusantara/Borneo Scarves Series/_DSC1681 Copy.jpg',
                color: 'Teal',
                hex: '#5F7A7E',
                stock: 50
            },
            {
                file: 'public/new_products/Warisan Nusantara/Borneo Scarves Series/_DSC8283_.jpg',
                color: 'Light Grey',
                hex: '#C5C5C5',
                stock: 50
            }
        ]
    },

    // ── Kawung Scarves ────────────────────────────────────
    {
        name: 'Kawung Scarves',
        price: 249000,
        category: 'Scarves',
        size: ['115x115'],
        badge: 'new',
        variants: [
            {
                file: 'public/new_products/Warisan Nusantara/Kawung Scarves Series/IMG_6310.jpg',
                color: 'Dusty Rose',
                hex: '#8B7090',
                stock: 50
            },
            {
                file: 'public/new_products/Warisan Nusantara/Kawung Scarves Series/IMG_6315.jpg',
                color: 'Sage Grey',
                hex: '#8A9488',
                stock: 50
            },
            {
                file: 'public/new_products/Warisan Nusantara/Kawung Scarves Series/IMG_6320.jpg',
                color: 'Maroon Beige',
                hex: '#8B5A4A',
                stock: 50
            },
            {
                file: 'public/new_products/Warisan Nusantara/Kawung Scarves Series/IMG_6325.jpg',
                color: 'Dark Teal',
                hex: '#3A4A4A',
                stock: 50
            }
        ]
    },

    // ── Parang Scarves ────────────────────────────────────
    {
        name: 'Parang Scarves',
        price: 249000,
        category: 'Scarves',
        size: ['115x115'],
        badge: 'new',
        variants: [
            {
                file: 'public/new_products/Warisan Nusantara/Parang Scarves Series/_DSC9499 copy IG.jpg',
                color: 'Camel',
                hex: '#A07050',
                stock: 50
            },
            {
                file: 'public/new_products/Warisan Nusantara/Parang Scarves Series/IMG_0577.jpeg',
                color: 'Emerald Teal',
                hex: '#3A6B5A',
                stock: 50
            },
            {
                file: 'public/new_products/Warisan Nusantara/Parang Scarves Series/IMG_0582.jpeg',
                color: 'Blue Turquoise',
                hex: '#5B8A9A',
                stock: 50
            },
            {
                file: 'public/new_products/Warisan Nusantara/Parang Scarves Series/IMG_0586.jpeg',
                color: 'Dusty Pink',
                hex: '#B08A8A',
                stock: 50
            }
        ]
    },

    // ── Songket Scarves ───────────────────────────────────
    {
        name: 'Songket Scarves',
        price: 249000,
        category: 'Scarves',
        size: ['115x115'],
        badge: 'new',
        variants: [
            {
                file: 'public/new_products/Warisan Nusantara/Songket Scarves Series/IMG_6351.jpg',
                color: 'Navy Blue',
                hex: '#5A6B7B',
                stock: 50
            },
            {
                file: 'public/new_products/Warisan Nusantara/Songket Scarves Series/IMG_6370.jpg',
                color: 'Rose Pink',
                hex: '#C06080',
                stock: 50
            },
            {
                file: 'public/new_products/Warisan Nusantara/Songket Scarves Series/IMG_6375.jpg',
                color: 'Teal Brown',
                hex: '#6A7B70',
                stock: 50
            },
            {
                file: 'public/new_products/Warisan Nusantara/Songket Scarves Series/IMG_0898.jpg',
                color: 'Lilac Grey',
                hex: '#9A8A9A',
                stock: 50
            }
        ]
    },

    // ── Lombok Scarves ───────────────────────────────────
    {
        name: 'Lombok Scarves',
        price: 249000,
        category: 'Scarves',
        size: ['115x115'],
        badge: 'new',
        variants: [
            {
                file: 'public/new_products/Warisan Nusantara/Lombok Scarves Series (Sejauh Mata Memandang)/DSCF2189 Copy.jpg',
                color: 'Terracotta',
                hex: '#C25B4E',
                stock: 50
            },
            {
                file: 'public/new_products/Warisan Nusantara/Lombok Scarves Series (Sejauh Mata Memandang)/DSCF2493 Copy.jpg',
                color: 'Emerald Green',
                hex: '#2E6B4A',
                stock: 50
            },
            {
                file: 'public/new_products/Warisan Nusantara/Lombok Scarves Series (Sejauh Mata Memandang)/DSCF2540 Copy.jpg',
                color: 'White Blue',
                hex: '#B8D0E0',
                stock: 50
            },
            {
                file: 'public/new_products/Warisan Nusantara/Lombok Scarves Series (Sejauh Mata Memandang)/DSCF2578 Copy.jpg',
                color: 'Camel Orange',
                hex: '#C08040',
                stock: 50
            }
        ]
    }
];

async function uploadProducts() {
    console.log('Starting upload...');
    console.log('Attempting to upload to "products" bucket...');

    for (const group of productGroups) {
        console.log(`\n${'═'.repeat(50)}`);
        console.log(`Processing: ${group.name}`);
        console.log(`${'═'.repeat(50)}`);

        // 1. Delete existing products with this name to avoid duplicates
        const { error: deleteError } = await supabase
            .from('products')
            .delete()
            .like('name', `${group.name}%`);

        if (deleteError) {
            console.error('Error deleting old products:', deleteError);
        } else {
            console.log(`Cleaned up old entries for ${group.name}`);
        }

        const processedVariants = [];

        // 2. Upload images for each variant
        for (const variant of group.variants) {
            const filePath = path.resolve(__dirname, '..', variant.file);
            if (!fs.existsSync(filePath)) {
                console.error(`File not found: ${filePath}`);
                continue;
            }

            const fileBuffer = fs.readFileSync(filePath);
            const fileName = path.basename(variant.file);
            const sanitizedSeries = group.name.replace(/\s+/g, '_');
            const timestamp = Date.now();
            const sanitizedFileName = `${timestamp}_${fileName.replace(/\s+/g, '_')}`;
            const storagePath = `${sanitizedSeries}/${sanitizedFileName}`;

            // Detect content type
            const ext = path.extname(fileName).toLowerCase();
            const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';

            console.log(`  Uploading ${variant.color}: ${fileName}...`);
            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(storagePath, fileBuffer, {
                    contentType,
                    upsert: true
                });

            if (uploadError) {
                console.error(`  Error uploading ${fileName}:`, uploadError);
                continue;
            }

            const { data: { publicUrl } } = supabase.storage
                .from('products')
                .getPublicUrl(storagePath);

            processedVariants.push({
                name: group.name,
                color: variant.color,
                colorHex: variant.hex,
                image: publicUrl,
                stock: variant.stock
            });
            console.log(`  ✓ ${variant.color} uploaded`);
        }

        if (processedVariants.length === 0) {
            console.error(`No valid variants for ${group.name}, skipping insert.`);
            continue;
        }

        // 3. Insert product entry with variants JSON
        const mainVariant = processedVariants[0];

        const productPayload = {
            name: group.name,
            price: group.price,
            original_price: null,
            category: group.category,
            image: mainVariant.image,
            color: mainVariant.color,
            color_hex: mainVariant.colorHex,
            badge: group.badge,
            size: group.size || ['115x115'],
            stock: 50,
            variants: processedVariants
        };

        const { error: insertError } = await supabase
            .from('products')
            .insert([productPayload]);

        if (insertError) {
            console.error(`Error inserting ${group.name}:`, insertError);
        } else {
            console.log(`✓ Successfully added ${group.name} (${processedVariants.length} variants)`);
        }
    }

    // Also clean up the old "Warisan Nusantara" single product
    console.log('\nCleaning up old "Warisan Nusantara" umbrella product...');
    const { error: cleanupError } = await supabase
        .from('products')
        .delete()
        .eq('name', 'Warisan Nusantara');

    if (cleanupError) {
        console.error('Error cleaning up:', cleanupError);
    } else {
        console.log('✓ Old umbrella product removed');
    }

    console.log('\n' + '═'.repeat(50));
    console.log('Done! All products uploaded.');
    console.log('═'.repeat(50));
}

uploadProducts();
