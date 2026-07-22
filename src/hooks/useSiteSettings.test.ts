import { beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useSiteSettings } from './useSiteSettings';

const fetchMock = vi.fn();

beforeEach(() => {
    fetchMock.mockReset();
    fetchMock.mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal('fetch', fetchMock);
});

describe('useSiteSettings', () => {
    it('returns static settings merged with remote overrides', async () => {
        fetchMock.mockResolvedValueOnce({ ok: true, json: async () => ({ whatsapp_phone: '6200000000000' }) });
        const { result } = renderHook(() => useSiteSettings());

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.settings.announcements.length).toBeGreaterThan(0);
        expect(result.current.settings.hero_slides.length).toBeGreaterThan(0);
        expect(result.current.settings.whatsapp_phone).toBe('6200000000000');
        expect(result.current.settings.world_series.categories.scarves).toBe(true);
    });

    it('falls back to static settings when remote fetch fails', async () => {
        fetchMock.mockRejectedValueOnce(new Error('offline'));
        const { result } = renderHook(() => useSiteSettings());
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.settings.whatsapp_phone).toBe('6281919234222');
    });

    it('persists an update through the API and updates local state', async () => {
        const { result } = renderHook(() => useSiteSettings());
        await waitFor(() => expect(result.current.loading).toBe(false));

        let response: { success: boolean } | undefined;
        await act(async () => {
            response = await result.current.updateSetting('world_series', { worlds: { heritage: false } });
        });

        expect(response).toEqual({ success: true });
        expect(fetchMock).toHaveBeenLastCalledWith('/api/site-settings/world_series', expect.objectContaining({ method: 'PUT' }));
        expect(result.current.settings.world_series.worlds.heritage).toBe(false);
    });

    it('reports a failed update without mutating settings', async () => {
        const { result } = renderHook(() => useSiteSettings());
        await waitFor(() => expect(result.current.loading).toBe(false));
        const previous = result.current.settings.world_series;
        fetchMock.mockResolvedValueOnce({ ok: false });

        let response: { success: boolean } | undefined;
        await act(async () => {
            response = await result.current.updateSetting('world_series', { worlds: {} });
        });

        expect(response).toEqual({ success: false });
        expect(result.current.settings.world_series).toEqual(previous);
    });
});
