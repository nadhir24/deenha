import { useState, useEffect, useCallback } from 'react';
import { siteSettings as staticSettings } from '../data/siteSettings';

export const useSiteSettings = () => {
    const [settings, setSettings] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);

    const fetchSettings = useCallback(async () => {
        try {
            setLoading(true);
            setSettings(staticSettings);
        } catch (err) {
            console.error('Error fetching site settings:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const updateSetting = async (key: string, value: any) => {
        // Disabled for static setup to ensure 0 egress
        console.log(`Update ignored for ${key}: static mode enabled.`);
        setSettings(prev => ({ ...prev, [key]: value }));
        return { success: true };
    };

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    return { settings, loading, updateSetting, refresh: fetchSettings };
};
