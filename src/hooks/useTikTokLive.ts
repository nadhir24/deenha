import { useState, useEffect } from 'react';
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

    const fetchStatus = async (force = false) => {
        // Skip polling during sleep time unless it's a forced fetch (e.g. first load)
        if (!force && isSleepTime()) {
            console.log("TikTok Live: Skipping poll during sleep time");
            return;
        }

        try {
            // Check if we already fetched recently in this browser session
            const lastFetched = localStorage.getItem('tiktok_last_fetched');
            const now = Date.now();

            if (!force && lastFetched && (now - parseInt(lastFetched) < POLL_INTERVAL)) {
                // We have a recent result, no need to hit the function
                const cachedStatus = localStorage.getItem('tiktok_live_status');
                if (cachedStatus) {
                    setStatus({ ...JSON.parse(cachedStatus), loading: false, error: null });
                    return;
                }
            }

            const { data, error } = await supabase.functions.invoke('tiktok-live');

            if (error) throw error;

            const newStatus = {
                isLive: data.isLive,
                viewerCount: data.viewerCount || 0,
                mode: data.mode || 'auto',
                loading: false,
                error: null
            };

            setStatus(newStatus);
            localStorage.setItem('tiktok_last_fetched', now.toString());
            localStorage.setItem('tiktok_live_status', JSON.stringify(newStatus));

        } catch (err: any) {
            console.error("Error fetching TikTok Live status:", err);
            setStatus(prev => ({ ...prev, loading: false, error: err.message }));
        }
    };

    useEffect(() => {
        // Initial fetch
        fetchStatus(true);

        // Set up interval
        const interval = setInterval(() => fetchStatus(), POLL_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    return status;
};
