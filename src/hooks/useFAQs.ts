import { useState, useEffect, useCallback } from 'react';
import { faqs as staticFaqs, FAQ as FAQInterface } from '../data/faqs';
import { useTranslation } from 'react-i18next';

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    sort_order: number;
}

export const useFAQs = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const { i18n } = useTranslation();

    const fetchFaqs = useCallback(async () => {
        try {
            setLoading(true);
            const lang = i18n.language;

            const mappedData: FAQ[] = staticFaqs.map((item: any) => ({
                id: item.id,
                question: item[`question_${lang}`] || item.question_en,
                answer: item[`answer_${lang}`] || item.answer_en,
                category: item.category,
                sort_order: item.sort_order
            }));

            setFaqs(mappedData);
        } catch (err) {
            console.error('Error fetching faqs:', err);
        } finally {
            setLoading(false);
        }
    }, [i18n.language]);

    useEffect(() => {
        fetchFaqs();
    }, [fetchFaqs]);

    return { faqs, loading, refresh: fetchFaqs };
};
