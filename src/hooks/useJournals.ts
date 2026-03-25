import { useState, useEffect, useCallback } from 'react';
import { journals as staticJournals, JournalArticle } from '../data/journals';
import { useTranslation } from 'react-i18next';

export const useJournals = () => {
    const [articles, setArticles] = useState<JournalArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const { i18n } = useTranslation();

    const fetchJournals = useCallback(async () => {
        try {
            setLoading(true);
            const lang = i18n.language;

            const mappedData: JournalArticle[] = staticJournals.map((item: any) => ({
                id: item.id,
                slug: item.slug,
                image_url: item.image_url,
                date: item.date,
                title: item[`title_${lang}`] || item.title_en || item.title,
                excerpt: item[`excerpt_${lang}`] || item.excerpt_en || item.excerpt,
                content: item[`content_${lang}`] || item.content_en || item.content,
                category: item[`category_${lang}`] || item.category_en || item.category,
                title_en: item.title_en,
                excerpt_en: item.excerpt_en,
                content_en: item.content_en,
                category_en: item.category_en,
                title_id: item.title_id,
                excerpt_id: item.excerpt_id,
                content_id: item.content_id,
                category_id: item.category_id
            }));

            setArticles(mappedData);
        } catch (err) {
            console.error('Error fetching journals:', err);
        } finally {
            setLoading(false);
        }
    }, [i18n.language]);

    useEffect(() => {
        fetchJournals();
    }, [fetchJournals]);

    return { articles, loading, refresh: fetchJournals };
};

export const fetchJournalBySlug = async (slug: string, language: string) => {
    try {
        const data = staticJournals.find(j => j.slug === slug);
        if (!data) return null;

        const lang = language;

        return {
            id: data.id,
            slug: data.slug,
            image_url: data.image_url,
            date: data.date,
            title: data[`title_${lang}`] || data.title_en || data.title,
            excerpt: data[`excerpt_${lang}`] || data.excerpt_en || data.excerpt,
            content: data[`content_${lang}`] || data.content_en || data.content,
            category: data[`category_${lang}`] || data.category_en || data.category
        } as JournalArticle;
    } catch (err) {
        console.error('Error fetching article by slug:', err);
        return null;
    }
};
