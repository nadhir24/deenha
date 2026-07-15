import { useState } from 'react';

export interface TikTokLiveStatus {
    isLive: boolean;
    viewerCount: number;
    mode: 'auto' | 'manual';
    loading: boolean;
    error: string | null;
}

export const useTikTokLive = () => {
    const [status] = useState<TikTokLiveStatus>({
        isLive: false,
        viewerCount: 0,
        mode: 'auto',
        loading: false,
        error: null
    });

    return status;
};
