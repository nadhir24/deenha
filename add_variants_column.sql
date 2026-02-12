
-- Add a variants column to the products table to support multiple color variants per product
-- Using JSONB allows flexible storage of variant data (name, color, hex, image, stock)
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS variants JSONB DEFAULT '[]'::jsonb;

-- Optional: Create an index if we plan to query inside the JSONB often (not strictly needed for just reading)
-- CREATE INDEX idx_products_variants ON products USING GIN (variants);
