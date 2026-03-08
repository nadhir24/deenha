
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

async function check() {
    const { data, error } = await supabase.from('products').select('*');
    if (error) console.error(error);
    else {
        console.log('--- LIVE PRODUCTS ---');
        data.forEach(p => {
            console.log(`[${p.id}] ${p.name} (${p.category}) - ${p.image}`);
        });
    }
}

check();
