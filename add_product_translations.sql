-- Add translation columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS name_en TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS name_id TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS name_fr TEXT;
ALTER TABLE products ADD COLUMN IF NOT EXISTS name_zh TEXT;

-- Sync name_id with name
UPDATE products SET name_id = name WHERE name_id IS NULL;

-- Update Arabic Series (ID: 46) translations
UPDATE products SET 
    name_fr = 'Série arabe',
    name_en = 'Arabic Series',
    name_id = 'Seri Arab'
WHERE id = 46 OR name = 'Arabic Series';

-- Add others if needed
UPDATE products SET name_fr = 'Série Eliza' WHERE name LIKE 'Eliza%';
UPDATE products SET name_fr = 'Collection de soie Luna' WHERE name LIKE 'Luna%';
UPDATE products SET name_fr = 'Bergo en coton Amira' WHERE name LIKE 'Amira%';
UPDATE products SET name_fr = 'Robe Zahra' WHERE name LIKE 'Zahra%';
UPDATE products SET name_fr = 'Ensemble de prière Fatima' WHERE name LIKE 'Fatima%';
UPDATE products SET name_fr = 'Série Monogramme D' WHERE name LIKE 'Monogram D%';
UPDATE products SET name_fr = 'Série Hagia Sophia' WHERE name LIKE 'Hagia Sophia%';
UPDATE products SET name_fr = 'Série Cairo' WHERE name LIKE 'Cairo%';
UPDATE products SET name_fr = 'Keffieh Deenha' WHERE name LIKE 'Keffiyeh%';
