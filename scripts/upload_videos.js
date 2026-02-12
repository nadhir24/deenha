
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; // or service role key if needed

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadVideos() {
    const videoDir = path.join(process.cwd(), 'public', 'video');
    const files = fs.readdirSync(videoDir);

    console.log(`Found ${files.length} videos to upload...`);

    for (const file of files) {
        if (!file.endsWith('.mp4')) continue;

        const filePath = path.join(videoDir, file);
        const fileBuffer = fs.readFileSync(filePath);

        console.log(`Uploading ${file}...`);

        const { data, error } = await supabase.storage
            .from('products')
            .upload(`hero/${file}`, fileBuffer, {
                contentType: 'video/mp4',
                upsert: true
            });

        if (error) {
            console.error(`Error uploading ${file}:`, error.message);
        } else {
            const { data: { publicUrl } } = supabase.storage
                .from('products')
                .getPublicUrl(`hero/${file}`);

            console.log(`Successfully uploaded ${file}. Public URL: ${publicUrl}`);
        }
    }
}

uploadVideos();
