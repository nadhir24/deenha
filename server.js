const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const fs = require('fs');

const app = express();
const port = 3001;

// ===== SECURITY: CORS Configuration =====
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173,https://www.deenha.com').split(',').map(o => o.trim());
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
};

// ===== SECURITY: In-Memory Rate Limiter =====
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 100; // requests per window

const rateLimitMiddleware = (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();
    
    if (!rateLimitStore.has(ip)) {
        rateLimitStore.set(ip, []);
    }
    
    const requests = rateLimitStore.get(ip).filter(time => now - time < RATE_LIMIT_WINDOW);
    
    if (requests.length >= RATE_LIMIT_MAX) {
        return res.status(429).json({ error: 'Too many requests' });
    }
    
    requests.push(now);
    rateLimitStore.set(ip, requests);
    next();
};

// ===== SECURITY: Security Headers Middleware =====
const securityHeadersMiddleware = (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
};

// ===== SECURITY: HTTPS Redirect Middleware =====
const httpsRedirectMiddleware = (req, res, next) => {
    if (process.env.NODE_ENV === 'production' && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect(301, 'https://' + req.get('host') + req.url);
    }
    next();
};

// Middleware
app.use(httpsRedirectMiddleware);
app.use(securityHeadersMiddleware);
app.use(rateLimitMiddleware);
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use('/public/images', express.static(path.join(__dirname, 'public/images')));

// ===== SECURITY: File Upload Validation =====
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

const fileFilter = (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, and WebP allowed.'));
    }
};

const upload = multer({ 
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

// ===== SECURITY: Input Validation Middleware =====
const validateProductInput = (req, res, next) => {
    const { name, price, category } = req.body;
    const validCategories = ['Scarves', 'Dresses', 'Bergo', 'Pray Set', 'Hampers'];
    
    // Validate name
    if (!name || typeof name !== 'string' || name.length < 1 || name.length > 255) {
        return res.status(400).json({ error: 'Name must be a string between 1-255 characters' });
    }
    
    // Validate price
    if (price === undefined || typeof price !== 'number' || price <= 0 || !Number.isInteger(price)) {
        return res.status(400).json({ error: 'Price must be a positive integer' });
    }
    
    // Validate category
    if (!category || !validCategories.includes(category)) {
        return res.status(400).json({ error: `Category must be one of: ${validCategories.join(', ')}` });
    }
    
    next();
};

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
    try {
        const products = await db.all('SELECT * FROM products');
        // Parse size string back to array
        const parsedProducts = products.map(p => ({
            ...p,
            size: p.size ? p.size.split(',') : []
        }));
        res.json(parsedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/products', upload.single('image'), validateProductInput, async (req, res) => {
    try {
        const { name, price, originalPrice, category, size, color, colorHex, badge } = req.body;
        const imagePath = req.file ? `/images/${req.file.filename}` : '';

        const result = await db.run(
            `INSERT INTO products (name, price, originalPrice, image, category, size, color, colorHex, badge) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, price, originalPrice, imagePath, category, size, color, colorHex, badge]
        );

        res.json({ id: result.lastID, success: true });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const id = req.params.id;
        
        // Validate ID is a number
        if (!Number.isInteger(parseInt(id))) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }
        
        await db.run('DELETE FROM products WHERE id = ?', [id]);
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ===== SECURITY: Error Handling Middleware =====
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    
    // Handle multer errors
    if (err instanceof multer.MulterError) {
        if (err.code === 'FILE_TOO_LARGE') {
            return res.status(413).json({ error: 'File too large. Max 5MB allowed.' });
        }
        return res.status(400).json({ error: 'File upload error' });
    }
    
    // Handle CORS errors
    if (err.message === 'CORS not allowed') {
        return res.status(403).json({ error: 'CORS not allowed' });
    }
    
    // Generic error
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});
