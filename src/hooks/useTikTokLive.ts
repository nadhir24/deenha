import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const POLL_INTERVAL = 60 * 60 * 1000; // 1 hour
const SLEEP_START = 0; // 00:00
const SLEEP_END = 7;   // 07:00

export interface TikTokLiveStatus {
    isLive: boolean;
    viewerCount: number;
    mode: 'auto' | 'manual';
    loading: boolean;
    error: string | null;
}

export const useTikTokLive = () => {
    const [status, setStatus] = useState<TikTokLiveStatus>({
        isLive: false,
        viewerCount: 0,
        mode: 'auto',
        loading: true,
        error: null
    });

    const isSleepTime = () => {
        const hour = new Date().getHours();
        return hour >= SLEEP_START && hour < SLEEP_END;
    };

    const fetchStatus = useCallback(async (isInitial = false) => {
        try {
            // Static mode: Always offline or get from static settings
            setStatus({
                isLive: false,
                viewerCount: 0,
                mode: 'auto',
                loading: false,
                error: null
            });
        } catch (err: any) {
            console.error("Error in useTikTokLive:", err);
            setStatus(prev => ({ ...prev, loading: false, error: err.message }));
        }
    }, []);

    useEffect(() => {
        fetchStatus(true);
        const interval = setInterval(() => fetchStatus(), POLL_INTERVAL);
        return () => clearInterval(interval);
    }, [fetchStatus]);

    return status;
};
