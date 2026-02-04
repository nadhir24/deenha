import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface InstagramPost {
    id: number;
    image_url: string;
    post_url: string;
    video_url?: string;
    is_video?: boolean;
}

const FALLBACK_POSTS: InstagramPost[] = [
    {
        id: 1,
        post_url: "https://www.instagram.com/p/DUS3CqAASqn/",
        image_url: "/ig%20image/1.jpg",
        is_video: false
    },
    {
        id: 2,
        post_url: "https://www.instagram.com/p/DULpUtgktmX/",
        image_url: "/ig%20image/2.jpg",
        is_video: false
    },
    {
        id: 3,
        post_url: "https://www.instagram.com/p/DSZaBWSk7QF/",
        image_url: "/ig%20image/3.webp",
        is_video: false
    },
    {
        id: 4,
        post_url: "https://www.instagram.com/p/DKboZc1zJ13/",
        image_url: "/ig%20image/4-thumbnail.png",
        video_url: "/ig%20image/4.mp4",
        is_video: true
    },
    {
        id: 5,
        post_url: "https://www.instagram.com/p/DSUfzZEE6CN/",
        image_url: "/ig%20image/5.webp",
        is_video: false
    },
    {
        id: 6,
        post_url: "https://www.instagram.com/p/DSHVo4yk2F4/",
        image_url: "/ig%20image/6.webp",
        is_video: false
    }
];

export const useInstagram = () => {
    const [posts, setPosts] = useState<InstagramPost[]>(FALLBACK_POSTS);
    const [loading, setLoading] = useState(false);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('instagram_posts')
                .select('*')
                .order('id', { ascending: false })
                .limit(6);

            if (error) throw error;

            if (data && data.length > 0) {
                setPosts(data);
            } else {
                setPosts(FALLBACK_POSTS);
            }
        } catch (err) {
            console.error('Error fetching IG posts:', err);
            setPosts(FALLBACK_POSTS);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return { posts, loading, refresh: fetchPosts };
};
