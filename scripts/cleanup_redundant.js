
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
        const [key, value] = line.split('=');
        if (key && value) {
            envConfig[key.trim()] = value.trim();
        }
    });
} catch (e) {
    console.error('Error reading .env:', e);
    process.exit(1);
}

const supabase = createClient(envConfig['VITE_SUPABASE_URL'], envConfig['VITE_SUPABASE_ANON_KEY']);

async function run() {
    console.log('Searching for redundant products...');
    const { data, error } = await supabase
        .from('products')
        .select('id, name')
        .or('name.eq.Monogram D - Rose,name.eq.Monogram D - Emerald');

    if (error) {
        console.error('Error fetching:', error);
        return;
    }

    console.log('Found:', data);

    if (data && data.length > 0) {
        const ids = data.map(p => p.id);
        console.log('Deleting IDs:', ids);
        const { error: delError } = await supabase
            .from('products')
            .delete()
            .in('id', ids);

        if (delError) console.error('Error deleting:', delError);
        else console.log('Successfully deleted redundant products');
    } else {
        console.log('No redundant products found to delete.');
    }
}

run();
