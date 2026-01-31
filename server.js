const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const fs = require('fs');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

// Setup Multer untuk Upload Gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './public/images';
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

let db;

// Database Initialization
(async () => {
    db = await open({
        filename: './database.sqlite',
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
            soldCount INTEGER DEFAULT 0
        )
    `);

    // Cek jika tabel kosong, masukkan data awal dari products.ts
    const count = await db.get('SELECT COUNT(*) as count FROM products');
    if (count.count === 0) {
        // Data awal bisa dimasukkan di sini jika perlu
        console.log("Database initialized.");
    }
})();

// API Routes
app.get('/api/products', async (req, res) => {
    const products = await db.all('SELECT * FROM products');
    // Parse size string back to array
    const parsedProducts = products.map(p => ({
        ...p,
        size: p.size ? p.size.split(',') : []
    }));
    res.json(parsedProducts);
});

app.post('/api/products', upload.single('image'), async (req, res) => {
    const { name, price, originalPrice, category, size, color, colorHex, badge } = req.body;
    const imagePath = req.file ? `/images/${req.file.filename}` : '';

    const result = await db.run(
        `INSERT INTO products (name, price, originalPrice, image, category, size, color, colorHex, badge) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, price, originalPrice, imagePath, category, size, color, colorHex, badge]
    );

    res.json({ id: result.lastID, success: true });
});

app.delete('/api/products/:id', async (req, res) => {
    await db.run('DELETE FROM products WHERE id = ?', [req.params.id]);
    res.json({ success: true });
});

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
