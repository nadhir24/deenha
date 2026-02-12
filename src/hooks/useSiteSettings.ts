import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export const useSiteSettings = () => {
    const [settings, setSettings] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);

    const fetchSettings = useCallback(async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('site_settings')
                .select('*');

            if (error) throw error;

            const settingsMap = (data || []).reduce((acc: any, item: any) => {
                acc[item.key] = item.value;
                return acc;
            }, {});

            setSettings(settingsMap);
        } catch (err) {
            console.error('Error fetching site settings:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateSetting = async (key: string, value: any) => {
        try {
            const { error } = await supabase
                .from('site_settings')
                .upsert({ key, value, updated_at: new Date().toISOString() });

            if (error) throw error;

            setSettings(prev => ({ ...prev, [key]: value }));
            return { success: true };
        } catch (err: any) {
            console.error(`Error updating setting ${key}:`, err);
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    return { settings, loading, updateSetting, refresh: fetchSettings };
};
