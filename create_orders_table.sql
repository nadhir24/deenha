-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id BIGSERIAL PRIMARY KEY,
    order_number TEXT UNIQUE NOT NULL,
    items JSONB NOT NULL,
    total_price NUMERIC NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    customer_phone TEXT,
    notes TEXT,
    stock_deducted BOOLEAN DEFAULT FALSE
);

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow anonymous to insert (so customers can checkout)
CREATE POLICY "Allow anonymous inserts" ON orders
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users (admins) to select and update
CREATE POLICY "Allow authenticated users to manage orders" ON orders
    FOR ALL USING (auth.role() = 'authenticated');
