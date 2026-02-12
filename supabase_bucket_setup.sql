-- Create the products bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Set up security policies for the products bucket
-- Allow public read access
CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'products' );

-- Allow authenticated and anonymous uploads (warning: this is open to public, consider restricting in production)
CREATE POLICY "Public Insert" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'products' );

-- Allow public update/delete (optional, generally not recommended for public, but useful for this demo)
-- CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING ( bucket_id = 'products' );
-- CREATE POLICY "Public Delete" ON storage.objects FOR DELETE USING ( bucket_id = 'products' );
