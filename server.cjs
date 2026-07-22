const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const fs = require('fs');
const crypto = require('crypto');

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
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
};

// ===== SECURITY: In-Memory Rate Limiter =====
const rateLimitStore = new Map();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 100; // requests per window

// Cleanup expired IPs every 15 minutes to prevent memory leak
setInterval(() => {
    const now = Date.now();
    for (const [ip, timestamps] of rateLimitStore.entries()) {
        const active = timestamps.filter(time => now - time < RATE_LIMIT_WINDOW);
        if (active.length === 0) {
            rateLimitStore.delete(ip);
        } else {
            rateLimitStore.set(ip, active);
        }
    }
}, RATE_LIMIT_WINDOW);

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

// ===== SECURITY: Simple CSRF Middleware =====
const csrfMiddleware = (req, res, next) => {
    // Only check state-changing methods
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        const headerToken = req.headers['x-csrf-token'];
        const cookieToken = req.cookies?.['csrf-token'];
        
        // Skip CSRF check if no token configured (opt-in)
        if (process.env.CSRF_SECRET) {
            if (!headerToken || headerToken !== cookieToken) {
                return res.status(403).json({ error: 'Invalid CSRF token' });
            }
        }
    }
    next();
};

// Middleware
app.use(httpsRedirectMiddleware);
app.use(securityHeadersMiddleware);
app.use(rateLimitMiddleware);
app.use(cors(corsOptions));
app.use(csrfMiddleware);
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
        // Sanitize: use UUID instead of user-supplied originalname to prevent path traversal
        const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
        cb(null, crypto.randomUUID() + ext);
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
            stock INTEGER DEFAULT 0,
            soldCount INTEGER DEFAULT 0
        )
    `);

    await db.exec(`
        CREATE TABLE IF NOT EXISTS site_settings (
            key TEXT PRIMARY KEY,
            value TEXT NOT NULL,
            updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
        )
    `);

    // Add stock column if missing (migration for existing DBs)
    try { await db.exec('ALTER TABLE products ADD COLUMN stock INTEGER DEFAULT 0'); } catch (_) {}

    // Cek jika tabel kosong, masukkan data awal dari products.ts
    const count = await db.get('SELECT COUNT(*) as count FROM products');
    if (count.count === 0) {
        console.log("Database initialized — empty. Seed products manually via admin.");
    }
    
    // Wait for DB to be ready before serving requests
    await db.get('SELECT 1');
    console.log("Database ready.");
})();

// ===== R2 UPLOAD ENDPOINT =====
const { r2Client, R2_BUCKET_NAME } = require('./src/lib/r2-server.cjs');

// Multer storage untuk R2 upload (simpan sementara di disk, lalu upload ke R2)
const r2Storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'tmp/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const r2Upload = multer({ storage: r2Storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB max

app.post('/api/r2-upload', r2Upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const buffer = fs.readFileSync(req.file.path);
        const key = `products/${Date.now()}-${req.file.originalname}`;

        await r2Client.send(new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: req.file.mimetype,
        }));

        // Clean up local temp file
        fs.unlinkSync(req.file.path);

        // Return public URL
        const accountId = process.env.R2_ACCOUNT_ID || '9f44eca5c8a6dd7bc48de4203794cf51';
        const publicUrl = `https://pub-ff6d6f9405b741cbb0a6c4607c001d0c.r2.dev/${key}`;
        res.json({ url: publicUrl, key });
    } catch (error) {
        console.error('R2 upload error:', error);
        // Clean up on error
        try { fs.unlinkSync(req.file.path); } catch (_) {}
        res.status(500).json({ error: 'R2 upload failed: ' + error.message });
    }
});

// API Routes
app.get('/api/site-settings', async (req, res) => {
    try {
        const rows = await db.all('SELECT key, value FROM site_settings');
        const settings = {};
        for (const row of rows) {
            try { settings[row.key] = JSON.parse(row.value); } catch (_) { settings[row.key] = row.value; }
        }
        res.json(settings);
    } catch (error) {
        console.error('Error fetching site settings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/site-settings/:key', async (req, res) => {
    try {
        const key = String(req.params.key || '');
        if (!/^[a-z0-9_]{1,64}$/i.test(key)) return res.status(400).json({ error: 'Invalid setting key' });
        const value = JSON.stringify(req.body?.value);
        if (value === undefined || value.length > 100000) return res.status(400).json({ error: 'Invalid setting value' });
        await db.run(
            `INSERT INTO site_settings (key, value, updatedAt) VALUES (?, ?, CURRENT_TIMESTAMP)
             ON CONFLICT(key) DO UPDATE SET value=excluded.value, updatedAt=CURRENT_TIMESTAMP`,
            [key, value]
        );
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating site setting:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

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

app.post('/api/products', express.json(), async (req, res) => {
    try {
        const { name, price, originalPrice, category, size, color, colorHex, badge, image, stock } = req.body;

        const result = await db.run(
            `INSERT INTO products (name, price, originalPrice, image, category, size, color, colorHex, badge, stock) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, price, originalPrice || 0, image || '', category, size, color, colorHex, badge || '', stock || 0]
        );

        res.json({ id: result.lastID, success: true });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/api/products/:id', express.json(), async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        const { name, price, originalPrice, category, size, color, colorHex, badge, image, stock } = req.body;

        await db.run(
            `UPDATE products SET name=?, price=?, originalPrice=?, image=?, category=?, size=?, color=?, colorHex=?, badge=?, stock=? WHERE id=?`,
            [name, price, originalPrice || 0, image || '', category, size, color, colorHex, badge || '', stock || 0, id]
        );

        res.json({ success: true });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        
        // Validate ID is a positive integer
        if (!Number.isInteger(id) || id <= 0) {
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

const server = app.listen(port, () => {
    console.log(`Backend running at http://localhost:${port}`);
});

// ===== Graceful Shutdown =====
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Closing server & database...');
    server.close(() => {
        if (db) {
            db.close().then(() => {
                console.log('Database closed. Exiting.');
                process.exit(0);
            });
        } else {
            console.log('Server closed. Exiting.');
            process.exit(0);
        }
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received. Closing server & database...');
    server.close(() => {
        if (db) {
            db.close().then(() => {
                console.log('Database closed. Exiting.');
                process.exit(0);
            });
        } else {
            console.log('Server closed. Exiting.');
            process.exit(0);
        }
    });
});
