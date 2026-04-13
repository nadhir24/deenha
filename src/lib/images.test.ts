import { describe, it, expect } from 'vitest';
import { getOptimizedImage } from './images';

describe('getOptimizedImage', () => {
    it('should return original URL for non-supabase URLs', () => {
        expect(getOptimizedImage('/images/local.jpg')).toBe('/images/local.jpg');
        expect(getOptimizedImage('https://example.com/img.jpg')).toBe('https://example.com/img.jpg');
    });

    it('should return empty string for empty input', () => {
        expect(getOptimizedImage('')).toBe('');
    });

    it('should convert supabase object URL to render URL with params', () => {
        const input = 'https://abc.supabase.co/storage/v1/object/public/images/photo.jpg';
        const result = getOptimizedImage(input, 600, 75);
        expect(result).toBe('https://abc.supabase.co/storage/v1/render/image/public/images/photo.jpg?width=600&quality=75');
    });

    it('should use default width=800 and quality=80', () => {
        const input = 'https://abc.supabase.co/storage/v1/object/public/images/photo.jpg';
        const result = getOptimizedImage(input);
        expect(result).toContain('width=800');
        expect(result).toContain('quality=80');
    });

    it('should update params on already-optimized render URLs', () => {
        const input = 'https://abc.supabase.co/storage/v1/render/image/public/images/photo.jpg?width=400&quality=50';
        const result = getOptimizedImage(input, 1200, 90);
        expect(result).toBe('https://abc.supabase.co/storage/v1/render/image/public/images/photo.jpg?width=1200&quality=90');
    });

    it('should return original URL if supabase URL has no object/public path', () => {
        const input = 'https://abc.supabase.co/some/other/path.jpg';
        const result = getOptimizedImage(input);
        expect(result).toBe(input);
    });
});
