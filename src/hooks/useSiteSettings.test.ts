import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useSiteSettings } from './useSiteSettings';

describe('useSiteSettings', () => {
    it('should return settings after loading', async () => {
        const { result } = renderHook(() => useSiteSettings());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.settings).toBeDefined();
        expect(typeof result.current.settings).toBe('object');
    });

    it('should have announcements', async () => {
        const { result } = renderHook(() => useSiteSettings());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.settings.announcements).toBeDefined();
        expect(Array.isArray(result.current.settings.announcements)).toBe(true);
        expect(result.current.settings.announcements.length).toBeGreaterThan(0);
    });

    it('should have whatsapp_phone', async () => {
        const { result } = renderHook(() => useSiteSettings());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.settings.whatsapp_phone).toBeDefined();
        expect(result.current.settings.whatsapp_phone).toBeTypeOf('string');
    });

    it('should have hero_slides', async () => {
        const { result } = renderHook(() => useSiteSettings());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.settings.hero_slides).toBeDefined();
        expect(Array.isArray(result.current.settings.hero_slides)).toBe(true);
    });

    it('should provide updateSetting and refresh functions', async () => {
        const { result } = renderHook(() => useSiteSettings());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.updateSetting).toBeTypeOf('function');
        expect(result.current.refresh).toBeTypeOf('function');
    });

    it('updateSetting should return success', async () => {
        const { result } = renderHook(() => useSiteSettings());

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        const response = await result.current.updateSetting('test_key', 'test_value');
        expect(response).toEqual({ success: true });
    });
});
