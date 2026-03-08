
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

async function generateSitemap() {
    console.log('--- Generating Dynamic Sitemap ---');

    // Static routes
    const routes = [
        { path: '', priority: '1.0', changefreq: 'daily' },
        { path: '/shop', priority: '0.9', changefreq: 'daily' },
        { path: '/about', priority: '0.7', changefreq: 'monthly' },
        { path: '/faq', priority: '0.8', changefreq: 'monthly' },
        { path: '/ramadan', priority: '0.8', changefreq: 'weekly' },
        { path: '/login', priority: '0.1', changefreq: 'never' },
    ];

    try {
        // Fetch all products
        const { data: products, error } = await supabase
            .from('products')
            .select('id, created_at');

        if (error) throw error;

        // Build XML
        const baseUrl = 'https://www.deenha.com';
        const today = new Date().toISOString().split('T')[0];

        let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
        xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

        // Add static routes
        routes.forEach(route => {
            xml += '  <url>\n';
            xml += `    <loc>${baseUrl}${route.path}</loc>\n`;
            xml += `    <lastmod>${today}</lastmod>\n`;
            xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
            xml += `    <priority>${route.priority}</priority>\n`;
            xml += '  </url>\n';
        });

        // Add dynamic product routes
        if (products && products.length > 0) {
            console.log(`Found ${products.length} products to include.`);
            products.forEach(product => {
                const lastmod = product.created_at ? product.created_at.split('T')[0] : today;
                xml += '  <url>\n';
                xml += `    <loc>${baseUrl}/product/${product.id}</loc>\n`;
                xml += `    <lastmod>${lastmod}</lastmod>\n`;
                xml += `    <changefreq>weekly</changefreq>\n`;
                xml += `    <priority>0.6</priority>\n`;
                xml += '  </url>\n';
            });
        }

        xml += '</urlset>';

        // Write to public folder
        const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
        fs.writeFileSync(sitemapPath, xml);

        console.log(`Successfully generated sitemap with ${routes.length + (products?.length || 0)} URLs.`);
        console.log(`Location: ${sitemapPath}`);

    } catch (err) {
        console.error('Error generating sitemap:', err.message);
    }
}

generateSitemap();
