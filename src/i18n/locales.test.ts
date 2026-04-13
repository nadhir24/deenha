import { describe, it, expect } from 'vitest';
import en from './locales/en.json';
import id from './locales/id.json';
import fr from './locales/fr.json';
import zh from './locales/zh.json';

const locales = { en, id, fr, zh };

// Recursively get all keys from a nested object
const getKeys = (obj: Record<string, unknown>, prefix = ''): string[] => {
    return Object.entries(obj).flatMap(([key, value]) => {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            return getKeys(value as Record<string, unknown>, fullKey);
        }
        return [fullKey];
    });
};

describe('i18n locale files', () => {
    const enKeys = getKeys(en);

    it('should have all required top-level sections in EN', () => {
        expect(en).toHaveProperty('nav');
        expect(en).toHaveProperty('product');
        expect(en).toHaveProperty('shop');
        expect(en).toHaveProperty('cart');
        expect(en).toHaveProperty('footer');
    });

    it('all locales should have the same keys as EN', () => {
        for (const [lang, locale] of Object.entries(locales)) {
            if (lang === 'en') continue;
            const langKeys = getKeys(locale);

            for (const key of enKeys) {
                expect(langKeys, `Missing key "${key}" in ${lang}.json`).toContain(key);
            }
        }
    });

    it('product.default_details should be an array in all locales', () => {
        for (const [lang, locale] of Object.entries(locales)) {
            const details = (locale as any).product?.default_details;
            expect(Array.isArray(details), `product.default_details in ${lang}.json should be an array`).toBe(true);
            expect(details.length, `product.default_details in ${lang}.json should not be empty`).toBeGreaterThan(0);
        }
    });

    it('no locale value should be empty string', () => {
        for (const [lang, locale] of Object.entries(locales)) {
            const keys = getKeys(locale);
            for (const key of keys) {
                const value = key.split('.').reduce((obj: any, k) => obj?.[k], locale);
                if (typeof value === 'string') {
                    expect(value.length, `Empty string at "${key}" in ${lang}.json`).toBeGreaterThan(0);
                }
            }
        }
    });
});
