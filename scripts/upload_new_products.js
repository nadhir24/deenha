
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

// Helper to list files in a directory
function listFiles(dirPath) {
    const fullPath = path.resolve(__dirname, '..', dirPath);
    if (!fs.existsSync(fullPath)) return [];
    return fs.readdirSync(fullPath).filter(f => !f.startsWith('.'));
}

async function uploadProducts() {
    console.log('Starting upload for new products...');

    const productsToUpload = [
        {
            name: "Alyssum Flowers Series",
            dir: "public/new_products/Alyssum Flowers Series",
            logic: "alyssum", // 1 model color, reuse photos for variants
            price: 249000,
            category: "Scarves"
        },
        {
            name: "Monogram Gradasi",
            dir: "public/new_products/Monogram Gradasi",
            logic: "monogram", // Mockups and model photos
            price: 249000,
            category: "Scarves"
        },
        {
            name: "Arabic Series",
            dir: "public/new_products/Arabic Series",
            logic: "arabic", // All colors modeled
            price: 249000,
            category: "Scarves"
        },
        {
            name: "Keffiyeh Deenha",
            dir: "public/new_products/Keffiyeh Deenha",
            logic: "keffiyeh", // 3 model photos, 5 scarf colors (mockups)
            price: 249000,
            category: "Scarves"
        }
    ];

    for (const p of productsToUpload) {
        console.log(`\nProcessing ${p.name}...`);

        // 1. Clean up old (optional, but good for idempotency)
        await supabase.from('products').delete().eq('name', p.name);

        const files = listFiles(p.dir);
        let variants = [];

        if (p.logic === 'alyssum') {
            // "1 warna yang di pake model mka masukan 3 foto sama" 
            // Interpret: Create 5 generic color variants, but used recycled model photos.
            // User specifically mentioned DSCF9549.
            const modelPhoto = files.find(f => f.includes('DSCF9549')) || files.find(f => f.startsWith('DSCF'));

            // Create 5 generic variants
            const colors = ['Mauve', 'Sage', 'Dusty Pink', 'Grey', 'Black'];
            const hexes = ['#B784A7', '#9CAF88', '#D4A5A5', '#808080', '#1A1A1A'];

            for (let i = 0; i < 5; i++) {
                // If we want "3 foto sama", we might want to rotate through 3 different photos if available?
                // Or just use the one model photo. User said "file DSCF9549".
                // I'll use the same photo for all to be safe and strictly follow "file DSCF9549".
                variants.push({
                    file: path.join(p.dir, modelPhoto),
                    color: colors[i],
                    hex: hexes[i],
                    stock: 50
                });
            }

        } else if (p.logic === 'monogram') {
            // "scan ada warna apa saja... untuk monogram kan ada tuh rame rame"
            // Mockups: 251224AA-1 to 5.
            const mockups = files.filter(f => f.includes('mockupD') || f.match(/^\d+AA/));

            mockups.forEach((f, idx) => {
                variants.push({
                    file: path.join(p.dir, f),
                    color: `Series ${idx + 1}`,
                    hex: ['#A0522D', '#CD853F', '#DEB887', '#F4A460', '#D2691E'][idx] || '#CCCCCC',
                    stock: 50
                });
            });

        } else if (p.logic === 'arabic') {
            // "ada smua warna pilih aja modelnya" -> many DSCF files.
            // Pick ~6 distinct files as variants.
            const modelPhotos = files.filter(f => f.startsWith('DSCF')).slice(0, 6);

            modelPhotos.forEach((f, idx) => {
                variants.push({
                    file: path.join(p.dir, f),
                    color: `Arabic ${idx + 1}`,
                    hex: ['#556B2F', '#800000', '#483D8B', '#2F4F4F', '#A0522D', '#000000'][idx],
                    stock: 50
                });
            });
        } else if (p.logic === 'keffiyeh') {
            // "masukan 3 foto model dengan warna sama dan scarves masing masing 5 warna"
            // Variants should be the scarves (colors).
            // Images for variants should probably be the mockups (HJB...) so users see the scarf.
            const mockups = files.filter(f => f.includes('mockupD') || f.startsWith('HJB'));

            mockups.forEach((f, idx) => {
                variants.push({
                    file: path.join(p.dir, f),
                    color: `Keffiyeh ${idx + 1}`,
                    hex: ['#8B4513', '#2F4F4F', '#556B2F', '#800000', '#191970'][idx],
                    stock: 50
                });
            });
        }

        // Upload and process variants
        const processedVariants = [];
        for (const v of variants) {
            const filePath = path.resolve(__dirname, '..', v.file);
            const fileBuffer = fs.readFileSync(filePath);
            const fileName = path.basename(v.file);
            const storagePath = `${p.name.replace(/\s+/g, '_')}/${Date.now()}_${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(storagePath, fileBuffer, {
                    contentType: fileName.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg',
                    upsert: true
                });

            if (uploadError) {
                console.error(`Error uploading ${fileName}:`, uploadError);
                continue;
            }

            const { data: { publicUrl } } = supabase.storage.from('products').getPublicUrl(storagePath);

            processedVariants.push({
                color: v.color,
                colorHex: v.hex,
                image: publicUrl,
                stock: v.stock
            });
            console.log(`  Uploaded ${v.color}`);
        }

        if (processedVariants.length > 0) {
            // Determine main image
            // For Alyssum: use variant image (model).
            // For Monogram/Keffiyeh: Try to use a MODEL photo as the main product image if possible.
            // But since current schema and frontend usually display variant[0] image, we'll stick to variant image for now
            // UNLESS we want to specifically set `image` column to a model photo?

            let mainImage = processedVariants[0].image;

            if (p.logic === 'monogram' || p.logic === 'keffiyeh') {
                // Find a model photo to set as main image
                const modelReviewFiles = files.filter(f => f.startsWith('DSCF'));
                if (modelReviewFiles.length > 0) {
                    const randomModel = modelReviewFiles[0]; // Or random
                    const filePath = path.resolve(__dirname, '..', p.dir, randomModel);
                    const storagePath = `${p.name.replace(/\s+/g, '_')}/MAIN_${Date.now()}_${randomModel}`;

                    await supabase.storage.from('products').upload(storagePath, fs.readFileSync(filePath), { contentType: 'image/jpeg', upsert: true });
                    const { data } = supabase.storage.from('products').getPublicUrl(storagePath);
                    mainImage = data.publicUrl;
                    console.log('  Uploaded separate Main Model Image');
                }
            }

            const { error } = await supabase.from('products').insert({
                name: p.name,
                price: p.price,
                category: p.category,
                image: mainImage, // This allows the card to show the Model, even if variants are Mockups
                size: ['115x115'],
                variants: processedVariants,
                stock: 50
            });

            if (error) console.error('Insert error:', error);
            else console.log(`✓ Created ${p.name}`);
        }
    }
}

uploadProducts();
