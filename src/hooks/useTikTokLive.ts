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
            // 1. Get current settings from database directly (Source of Truth)
            const { data: settingData, error: fetchError } = await supabase
                .from('site_settings')
                .select('value')
                .eq('key', 'tiktok_live_settings')
                .single();

            if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

            let settings = settingData?.value;

            // If no settings found, it might mean the SQL hasn't run or is delayed
            if (!settings) {
                setStatus(prev => ({ ...prev, loading: false }));
                return;
            }

            // 2. Determine isLive based on mode
            let isLive = false;
            let viewerCount = 0;
            let mode: 'auto' | 'manual' = settings.mode || 'auto';

            if (mode === 'manual') {
                isLive = settings.manual_status === 'on';
                viewerCount = settings.viewer_count || 0;
            } else {
                isLive = settings.is_live || false;
                viewerCount = settings.viewer_count || 0;
            }

            setStatus({
                isLive,
                viewerCount,
                mode,
                loading: false,
                error: null
            });

            // 3. Background: Refresh 'auto' status via Edge Function if needed
            const lastChecked = settings.last_checked ? new Date(settings.last_checked) : null;
            const needsRefresh = !lastChecked || (Date.now() - lastChecked.getTime() > POLL_INTERVAL);

            if (mode === 'auto' && !isSleepTime() && (needsRefresh || isInitial)) {
                // Background update
                supabase.functions.invoke('tiktok-live').then(({ data }) => {
                    if (data && !data.error && data.isLive !== isLive) {
                        setStatus(prev => ({ ...prev, isLive: data.isLive, viewerCount: data.viewerCount }));
                    }
                }).catch(() => { });
            }

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
