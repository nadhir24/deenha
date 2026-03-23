import { describe, it, expect, vi, beforeEach } from 'vitest';
import { formatPrice } from './currency';
import i18n from 'i18next';

// Mock i18next
vi.mock('i18next', () => ({
    default: {
        language: 'id',
    },
}));

describe('formatPrice', () => {
    beforeEach(() => {
        vi.resetModules();
    });

    it('should format IDR correctly when language is id', () => {
        // @ts-ignore
        i18n.language = 'id';
        const result = formatPrice(150000);
        // Use a regex to match Rp and the number with dots, ignoring non-breaking spaces
        expect(result).toMatch(/Rp.*150\.000/);
    });

    it('should format USD correctly when language is en', () => {
        // @ts-ignore
        i18n.language = 'en';
        const result = formatPrice(150000);
        // 150000 * 0.000064 = 9.6
        expect(result).toMatch(/\$9\.60/);
    });

    it('should format EUR correctly when language is fr', () => {
        // @ts-ignore
        i18n.language = 'fr';
        const result = formatPrice(150000);
        // 150000 * 0.000059 = 8.85
        expect(result).toContain('8,85');
        expect(result).toContain('€');
    });

    it('should fallback to IDR for unknown language', () => {
        // @ts-ignore
        i18n.language = 'de';
        const result = formatPrice(150000);
        expect(result).toMatch(/Rp.*150\.000/);
    });
});
