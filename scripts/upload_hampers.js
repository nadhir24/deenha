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

async function uploadHampers() {
    console.log('Starting Hampers upload...');

    const hamperDir = 'public/new_products/Hampers';
    const fullDir = path.resolve(__dirname, '..', hamperDir);

    if (!fs.existsSync(fullDir)) {
        console.error('Directory not found:', fullDir);
        return;
    }

    const files = fs.readdirSync(fullDir).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg') || f.toLowerCase().endsWith('.png'));

    console.log(`Found ${files.length} images.`);

    // Palettes for dummy hex
    const goldPalette = ['#D4AF37', '#C5A028', '#B8860B', '#DAA520', '#FFD700', '#F0E68C', '#BDB76B', '#E6E6FA', '#FFF0F5'];

    const variants = files.map((file, index) => ({
        color: `Set ${String.fromCharCode(65 + index)}`, // Set A, Set B...
        file: file,
        hex: goldPalette[index % goldPalette.length],
        stock: 50
    }));

    const product = {
        name: "Deenha Ramadan Hampers",
        // description: "Exclusive Hampers Collection for Ramadan 2026. Perfect for sharing the joy and blessings of the holy month.",
        price: 499000,
        category: "Hampers",
        variants: variants,
        mainFile: files[0] // Default to first file
    };

    console.log(`Processing ${product.name}...`);

    // Cleanup old entries
    const { error: deleteError } = await supabase.from('products').delete().eq('name', product.name);
    if (deleteError) console.error("Error deleting old product:", deleteError);

    const processedVariants = [];
    let mainImageUrl = null;

    // Upload Variants
    for (const v of product.variants) {
        const filePath = path.join(fullDir, v.file);
        const buffer = fs.readFileSync(filePath);
        const storagePath = `${product.name.replace(/\s+/g, '_')}/${Date.now()}_${v.color.replace(/\s+/g, '')}_${path.basename(v.file)}`;

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
            stock: v.stock
        });
        console.log(`  Uploaded variant: ${v.color}`);

        // Set main image from the first variant if not set
        if (!mainImageUrl && v.file === product.mainFile) {
            mainImageUrl = data.publicUrl;
        }
    }

    if (processedVariants.length > 0) {
        const finalImage = mainImageUrl || processedVariants[0].image;

        const { error: insertError } = await supabase.from('products').insert({
            name: product.name,
            // description: product.description,
            price: product.price,
            category: product.category,
            image: finalImage,
            size: ['Standard'],
            variants: processedVariants,
            stock: 50,
            badge: "new"
        });

        if (insertError) console.error('Insert error:', insertError);
        else console.log(`✓ Created ${product.name}`);
    } else {
        console.log(`Skipped ${product.name} (No variants uploaded)`);
    }
}

uploadHampers();
