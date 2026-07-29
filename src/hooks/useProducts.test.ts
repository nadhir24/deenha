import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useProducts } from './useProducts';

const mockProducts = [
    {
        id: 1,
        name: 'Mega Mendung Scarf',
        price: 150000,
        image: '/images/mega-mendung.jpg',
        category: 'Scarves',
    },
];

describe('useProducts', () => {
    beforeEach(() => {
        vi.stubGlobal(
            'fetch',
            vi.fn().mockResolvedValue({
                ok: true,
                status: 200,
                json: async () => mockProducts,
            })
        );
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('should return products after loading', async () => {
        const { result } = renderHook(() => useProducts());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.products.length).toBeGreaterThan(0);
        expect(result.current.error).toBeNull();
    });

    it('should return products with correct structure', async () => {
        const { result } = renderHook(() => useProducts());

        await waitFor(() => expect(result.current.loading).toBe(false));

        const product = result.current.products[0];
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('image');
        expect(product).toHaveProperty('category');
    });

    it('should provide a refresh function', async () => {
        const { result } = renderHook(() => useProducts());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.refresh).toBeTypeOf('function');
    });

    it('should surface an error when the API fails', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));

        const { result } = renderHook(() => useProducts());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBe('HTTP 500');
        expect(result.current.products).toHaveLength(0);
    });
});
