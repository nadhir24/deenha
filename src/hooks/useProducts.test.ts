import { describe, it, expect } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useProducts } from './useProducts';

describe('useProducts', () => {
    it('should return products after loading', async () => {
        const { result } = renderHook(() => useProducts());

        await act(async () => {
            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });
        });

        expect(result.current.products.length).toBeGreaterThan(0);
        expect(result.current.error).toBeNull();
    });

    it('should return products with correct structure', async () => {
        const { result } = renderHook(() => useProducts());

        await act(async () => {
            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });
        });

        const product = result.current.products[0];
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('image');
        expect(product).toHaveProperty('category');
    });

    it('should provide a refresh function', async () => {
        const { result } = renderHook(() => useProducts());

        await act(async () => {
            await waitFor(() => {
                expect(result.current.loading).toBe(false);
            });
        });

        expect(result.current.refresh).toBeTypeOf('function');
    });
});
