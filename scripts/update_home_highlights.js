
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

async function update() {
    console.log('Fetching current site settings (home_highlights)...');
    const { data: setting, error: fetchError } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'home_highlights')
        .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
        console.error('Fetch error:', fetchError);
        return;
    }

    const currentHighlights = setting?.value || [];
    
    // Check if Jersey/Chiffon highlight already exists
    const hasDaily = currentHighlights.some(h => h.category === 'Chiffon Hijab' || h.category === 'Jersey Hijab');

    if (!hasDaily) {
        console.log('Adding Daily Essentials highlight...');
        const newHighlight = {
            title: "Daily Essentials",
            bannerImage: "/images/heritage-design-Aq2WvB4Gj1flwP1L.jpg",
            collectionTitle: "Chiffon & Jersey",
            collectionDescription: "Effortless modesty for your everyday. Our Instant Chiffon and Premium Jersey collections are designed for comfort, durability, and style that stays in place.",
            category: "Chiffon Hijab",
            productIds: []
        };
        
        const updatedHighlights = [...currentHighlights];
        // Insert at index 1 to make it very visible
        updatedHighlights.splice(1, 0, newHighlight);

        const { error: updateError } = await supabase
            .from('site_settings')
            .upsert({ key: 'home_highlights', value: updatedHighlights });

        if (updateError) console.error('Update error:', updateError);
        else console.log('Successfully added Daily Essentials to homepage highlights!');
    } else {
        console.log('Daily Essentials highlight already exists on homepage.');
    }
}

update();
