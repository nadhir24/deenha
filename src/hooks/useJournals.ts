import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';

export interface JournalArticle {
    id: string;
    slug: string;
    image_url: string;
    date: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
}

export const useJournals = () => {
    const [articles, setArticles] = useState<JournalArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const { i18n } = useTranslation();

    const fetchJournals = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('journals')
                .select('*')
                .eq('published', true)
                .order('date', { ascending: false });

            if (error) throw error;

            // DYNAMIC LANGUAGE SELECTION
            // It will look for title_id, title_en, title_fr, or title_zh based on current lang
            const lang = i18n.language;
            
            const mappedData: JournalArticle[] = (data || []).map((item: any) => ({
                id: item.id,
                slug: item.slug,
                image_url: item.image_url,
                date: item.date,
                title: item[`title_${lang}`] || item.title_en,
                excerpt: item[`excerpt_${lang}`] || item.excerpt_en,
                content: item[`content_${lang}`] || item.content_en,
                category: item[`category_${lang}`] || item.category_en
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
        const { data, error } = await supabase
            .from('journals')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error) throw error;

        const lang = language;

        return {
            id: data.id,
            slug: data.slug,
            image_url: data.image_url,
            date: data.date,
            title: data[`title_${lang}`] || data.title_en,
            excerpt: data[`excerpt_${lang}`] || data.excerpt_en,
            content: data[`content_${lang}`] || data.content_en,
            category: data[`category_${lang}`] || data.category_en
        } as JournalArticle;
    } catch (err) {
        console.error('Error fetching article by slug:', err);
        return null;
    }
};
