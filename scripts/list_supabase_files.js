
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

async function listFiles(prefix = '') {
    const { data, error } = await supabase.storage.from('products').list(prefix, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
    });

    if (error) {
        console.error(`Error listing ${prefix}:`, error);
        return;
    }

    for (const item of data) {
        if (item.id === null) {
            // It's a folder
            console.log(`DIR: ${prefix}${item.name}/`);
            await listFiles(`${prefix}${item.name}/`);
        } else {
            console.log(`FILE: ${prefix}${item.name}`);
        }
    }
}

listFiles();
