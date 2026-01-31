import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface InstagramPost {
    id: number;
    image_url: string;
    post_url: string;
}

export const useInstagram = () => {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('instagram_posts')
                .select('*')
                .order('id', { ascending: false })
                .limit(6);

            if (error) throw error;
            setPosts(data || []);
        } catch (err) {
            console.error('Error fetching IG posts:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return { posts, loading, refresh: fetchPosts };
};
