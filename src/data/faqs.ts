export interface FAQ {
    id: string;
    question_en: string;
    answer_en: string;
    question_id: string;
    answer_id: string;
    category: string;
    sort_order: number;
}

export const faqs: FAQ[] = [
    {
        id: "1",
        question_en: 'What materials do you use for your hijabs?',
        answer_en: 'We use premium voal, silk blends, and high-quality jersey for maximum comfort and elegance.',
        question_id: 'Bahan apa yang digunakan untuk hijab Anda?',
        answer_id: 'Kami menggunakan voal premium, campuran sutra, dan jersey berkualitas tinggi untuk kenyamanan dan keanggunan maksimal.',
        category: 'Product',
        sort_order: 1
    },
    {
        id: "2",
        question_en: 'Do you ship internationally?',
        answer_en: 'Yes, we ship to over 50 countries worldwide including Singapore, Malaysia, and many more.',
        question_id: 'Apakah Anda melayani pengiriman internasional?',
        answer_id: 'Ya, kami mengirim ke lebih dari 50 negara di seluruh dunia termasuk Singapura, Malaysia, dan banyak lagi.',
        category: 'Shipping',
        sort_order: 2
    }
];
