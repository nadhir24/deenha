-- Create FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    question_en TEXT NOT NULL,
    answer_en TEXT NOT NULL,
    question_id TEXT,
    answer_id TEXT,
    question_fr TEXT,
    answer_fr TEXT,
    question_zh TEXT,
    answer_zh TEXT,
    category TEXT DEFAULT 'General',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on faqs" ON faqs FOR SELECT USING (true);

-- Insert Initial FAQ Data
INSERT INTO faqs (question_en, answer_en, question_id, answer_id, category, sort_order) VALUES 
(
    'What materials do you use for your hijabs?', 
    'We use premium voal, silk blends, and high-quality jersey for maximum comfort and elegance.',
    'Bahan apa yang digunakan untuk hijab Anda?',
    'Kami menggunakan voal premium, campuran sutra, dan jersey berkualitas tinggi untuk kenyamanan dan keanggunan maksimal.',
    'Product', 1
),
(
    'Do you ship internationally?', 
    'Yes, we ship to over 50 countries worldwide including Singapore, Malaysia, and many more.',
    'Apakah Anda melayani pengiriman internasional?',
    'Ya, kami mengirim ke lebih dari 50 negara di seluruh dunia termasuk Singapura, Malaysia, dan banyak lagi.',
    'Shipping', 2
);
