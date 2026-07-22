import { useState, useEffect, useCallback } from 'react';
import { siteSettings as staticSettings } from '../data/siteSettings';

const API_BASE = import.meta.env.VITE_API_URL || '';

export const useSiteSettings = () => {
    const [settings, setSettings] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);

    const fetchSettings = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/api/site-settings`);
            const remote = response.ok ? await response.json() : {};
            setSettings({ ...staticSettings, ...remote });
        } catch (err) {
            console.error('Error fetching site settings:', err);
            setSettings(staticSettings);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateSetting = async (key: string, value: any) => {
        try {
            const response = await fetch(`${API_BASE}/api/site-settings/${encodeURIComponent(key)}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ value }),
            });
            if (!response.ok) return { success: false };
            setSettings(prev => ({ ...prev, [key]: value }));
            return { success: true };
        } catch (err) {
            console.error('Error updating site setting:', err);
            return { success: false };
        }
    };

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    return { settings, loading, updateSetting, refresh: fetchSettings };
};
