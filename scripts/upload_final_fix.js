import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env manually
const envPath = path.resolve(__dirname, '../.env');
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

async function uploadProducts() {
    console.log('Starting FINAL upload...');

    const products = [
        {
            name: "Alyssum Flowers Series",
            dir: "public/new_products/Alyssum Flowers Series",
            price: 249000,
            category: "Scarves",
            variants: [
                { color: "Mauve Pink", file: "DSCF9440 Copy.jpg", hex: "#D4A5A5" },
                { color: "Black", file: "DSCF9442 Copy.jpg", hex: "#1A1A1A" },
                { color: "Navy", file: "DSCF9447 Copy.jpg", hex: "#2C3E50" },
                { color: "Maroon", file: "DSCF9440 Copy.jpg", hex: "#800000" },
                { color: "Cream", file: "DSCF9456 Copy.jpg", hex: "#F5F5DC" }
            ],
            // Use the first variant request to drive the main image logic later
            mainFile: "DSCF9440 Copy.jpg"
        },
        {
            name: "Monogram Gradasi",
            dir: "public/new_products/Monogram Gradasi",
            price: 249000,
            category: "Scarves",
            variants: [
                { color: "Series 1 (Dark)", file: "DSCF9398 Copy.jpg", hex: "#3E2723" },
                { color: "Series 2 (Gold)", file: "251224AA-2-mockupD.jpg", hex: "#D4AF37" },
                { color: "Series 3 (Pink)", file: "251224AA-3-mockupD.jpg", hex: "#FFC0CB" },
                { color: "Series 4 (Silver)", file: "251224AA-4-mockupD.jpg", hex: "#C0C0C0" },
                { color: "Series 5 (Cream)", file: "251224AA-5-mockupD.jpg", hex: "#FFFDD0" }
            ],
            mainFile: "DSCF9398 Copy.jpg"
        },
        {
            name: "Arabic Series",
            dir: "public/new_products/Arabic Series",
            price: 249000,
            category: "Scarves",
            variants: [
                { color: "Dusty Purple", file: "DSCF5668 Copy.jpg", hex: "#800080" },
                { color: "Ash Grey", file: "DSCF5842 Copy.jpg", hex: "#808080" },
                { color: "Blush Pink", file: "DSCF6074 Copy.jpg", hex: "#FFB6C1" },
                { color: "Midnight Black", file: "DSCF6093 Copy.jpg", hex: "#1A1A1A" },
                { color: "Cream Maroon", file: "DSCF5925 Copy.jpg", hex: "#800000" },
                { color: "Terracotta", file: "DSCF5874 Copy.jpg", hex: "#E2725B" }
            ],
            mainFile: "DSCF5668 Copy.jpg"
        },
        {
            name: "Keffiyeh Deenha",
            dir: "public/new_products/Keffiyeh Deenha",
            price: 249000,
            category: "Scarves",
            variants: [
                { color: "White/Black", file: "DSCF9468 Copy.jpg", hex: "#FFFFFF" },
                { color: "Brown", file: "HJB211224A-1-mockupD.jpg", hex: "#8B4513" },
                { color: "Sage", file: "HJB211224A-2-mockupD.jpg", hex: "#9CAF88" },
                { color: "Grey", file: "HJB211224A-3-mockupD.jpg", hex: "#808080" },
                { color: "Maroon", file: "HJB211224A-4-mockupD.jpg", hex: "#800000" },
                { color: "Navy", file: "HJB211224A-5-mockupD.jpg", hex: "#000080" }
            ],
            mainFile: "DSCF9468 Copy.jpg"
        }
    ];

    for (const p of products) {
        console.log(`\nProcessing ${p.name}...`);

        // Cleanup old entries
        const { error: deleteError } = await supabase.from('products').delete().eq('name', p.name);
        if (deleteError) console.error("Error deleting old product:", deleteError);

        const processedVariants = [];
        let mainImageUrl = null;

        // Ensure main file exists
        if (p.mainFile) {
            const mPath = path.resolve(__dirname, '..', p.dir, p.mainFile);
            if (fs.existsSync(mPath)) {
                const buffer = fs.readFileSync(mPath);
                // Unique timestamp for main image
                const storagePath = `${p.name.replace(/\s+/g, '_')}/MAIN_${Date.now()}_${path.basename(p.mainFile)}`;
                const { error: uploadError } = await supabase.storage.from('products').upload(storagePath, buffer, { contentType: 'image/jpeg', upsert: true });
                if (!uploadError) {
                    const { data } = supabase.storage.from('products').getPublicUrl(storagePath);
                    mainImageUrl = data.publicUrl;
                    console.log(`  Uploaded separate Main Image: ${p.mainFile}`);
                }
            }
        }

        // Upload Variants
        for (const v of p.variants) {
            const filePath = path.resolve(__dirname, '..', p.dir, v.file);
            if (!fs.existsSync(filePath)) {
                console.error(`  Missing file: ${v.file}`);
                continue; // Skip missing files
            }

            const buffer = fs.readFileSync(filePath);
            const storagePath = `${p.name.replace(/\s+/g, '_')}/${Date.now()}_${v.color.replace(/\s+/g, '')}_${path.basename(v.file)}`;

            const { error: vUploadError } = await supabase.storage.from('products').upload(storagePath, buffer, { contentType: 'image/jpeg', upsert: true });
            if (vUploadError) {
                console.error(`  Error uploading variant ${v.file}:`, vUploadError);
                continue;
            }

            const { data } = supabase.storage.from('products').getPublicUrl(storagePath);

            processedVariants.push({
                color: v.color,
                colorHex: v.hex,
                image: data.publicUrl,
                stock: 50
            });
            console.log(`  Uploaded variant: ${v.color}`);
        }

        if (processedVariants.length > 0) {
            // Use explicitly uploaded main image if available, else first variant's image
            const finalImage = mainImageUrl || processedVariants[0].image;

            const { error: insertError } = await supabase.from('products').insert({
                name: p.name,
                price: p.price,
                category: p.category,
                image: finalImage,
                size: ['115x115'],
                variants: processedVariants,
                stock: 50,
                badge: "new"
            });

            if (insertError) console.error('Insert error:', insertError);
            else console.log(`✓ Created ${p.name}`);
        } else {
            console.log(`Skipped ${p.name} (No variants uploaded)`);
        }
    }
}

uploadProducts();
