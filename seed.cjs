// Seed script - uses dynamic import to load TS products
// Usage: node seed.cjs

const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const fs = require('fs');
const path = require('path');

// Read the TS file and extract products via regex
const src = fs.readFileSync(path.join(__dirname, 'src/data/products.ts'), 'utf-8');

// Split by object pattern - each product starts with "    {"
const blocks = src.split(/^\s*\{$/m).slice(1); // skip everything before first {

const products = [];
for (const block of blocks) {
    const obj = {};
    
    // name
    const nameM = block.match(/name:\s*['"](.+?)['"]/);
    if (nameM) obj.name = nameM[1];
    else continue; // skip non-product blocks
    
    // price
    const priceM = block.match(/price:\s*(\d+)/);
    obj.price = priceM ? parseInt(priceM[1]) : 0;
    
    // originalPrice
    const origM = block.match(/originalPrice:\s*(\d+)/);
    obj.originalPrice = origM ? parseInt(origM[1]) : 0;
    
    // image
    const imgM = block.match(/image:\s*['"](.+?)['"]/);
    obj.image = imgM ? imgM[1] : '';
    
    // category
    const catM = block.match(/category:\s*['"](.+?)['"]/);
    obj.category = catM ? catM[1] : '';
    
    // size
    const sizeM = block.match(/size:\s*\[([^\]]*)\]/);
    if (sizeM) {
        obj.size = sizeM[1].match(/['"]([^'"]+)['"]/g)?.map(s => s.replace(/['"]/g, '')) || [];
    } else {
        obj.size = [];
    }
    
    // color
    const colorM = block.match(/color:\s*['"](.+?)['"]/);
    obj.color = colorM ? colorM[1] : '';
    
    // colorHex
    const hexM = block.match(/colorHex:\s*['"](.+?)['"]/);
    obj.colorHex = hexM ? hexM[1] : '';
    
    // badge
    const badgeM = block.match(/badge:\s*['"](.+?)['"]/);
    obj.badge = badgeM ? badgeM[1] : '';
    
    // stock
    const stockM = block.match(/stock:\s*(\d+)/);
    obj.stock = stockM ? parseInt(stockM[1]) : 0;
    
    // soldCount
    const soldM = block.match(/soldCount:\s*(\d+)/);
    obj.soldCount = soldM ? parseInt(soldM[1]) : 0;
    
    products.push(obj);
}

console.log(`Parsed ${products.length} products from products.ts`);

if (products.length === 0) {
    console.error('No products parsed! Check products.ts format.');
    process.exit(1);
}

(async () => {
    // Delete old db to start fresh
    const dbPath = './database.sqlite';
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
    
    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            price INTEGER,
            originalPrice INTEGER,
            image TEXT,
            category TEXT,
            size TEXT,
            color TEXT,
            colorHex TEXT,
            badge TEXT,
            stock INTEGER DEFAULT 0,
            soldCount INTEGER DEFAULT 0
        )
    `);

    const stmt = await db.prepare(
        `INSERT INTO products (name, price, originalPrice, image, category, size, color, colorHex, badge, stock, soldCount)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    );

    for (const p of products) {
        const size = Array.isArray(p.size) ? p.size.join(',') : (p.size || '');
        await stmt.run(p.name, p.price, p.originalPrice, p.image, p.category, size, p.color, p.colorHex || '', p.badge, p.stock, p.soldCount);
    }

    await stmt.finalize();

    const count = await db.get('SELECT COUNT(*) as count FROM products');
    console.log(`Seeded ${count.count} products into SQLite.`);
    
    // Show first 3 for verification
    const sample = await db.all('SELECT id, name, price, category, image FROM products LIMIT 3');
    console.log('Sample:', JSON.stringify(sample, null, 2));
    
    await db.close();
})();
