import { useState } from 'react';

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
    // Always use local images - skip Supabase fetch for now
    const [posts] = useState<InstagramPost[]>(FALLBACK_POSTS);
    const [loading] = useState(false);

    const refresh = () => {
        // No-op for now since we're using local images
        console.log('Using local Instagram images');
    };

    return { posts, loading, refresh };
};
