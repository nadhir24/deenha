
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

async function revert() {
    console.log('Reverting fake products from Supabase...');

    // 1. Delete the fake products by name
    await supabase.from('products').delete().eq('name', 'Instant Chiffon Hijab');
    await supabase.from('products').delete().eq('name', 'Premium Jersey Hijab');
    
    // 2. Revert Khadijah category
    await supabase.from('products').update({ category: 'Scarves' }).eq('name', 'Khadijah Chiffon Scarf');

    console.log('Database cleaned!');
}

revert();
