import { describe, it, expect } from 'vitest';
import { products, categories, colors, Product } from './products';

describe('Products data integrity', () => {
    it('should have at least 10 products', () => {
        expect(products.length).toBeGreaterThanOrEqual(10);
    });

    it('should have unique IDs', () => {
        const ids = products.map(p => p.id);
        const uniqueIds = new Set(ids);
        expect(uniqueIds.size).toBe(ids.length);
    });

    it('every product should have required fields', () => {
        products.forEach((product: Product) => {
            expect(product.id).toBeTypeOf('number');
            expect(product.name).toBeTypeOf('string');
            expect(product.name.length).toBeGreaterThan(0);
            expect(product.price).toBeTypeOf('number');
            expect(product.price).toBeGreaterThan(0);
            expect(product.image).toBeTypeOf('string');
            expect(product.image.length).toBeGreaterThan(0);
            expect(['Scarves', 'Dresses', 'Bergo', 'Pray Set', 'Hampers']).toContain(product.category);
            expect(Array.isArray(product.size)).toBe(true);
            expect(product.size.length).toBeGreaterThan(0);
            expect(product.color).toBeTypeOf('string');
            expect(product.colorHex).toMatch(/^#[0-9A-Fa-f]{6}$/);
        });
    });

    it('every product should have a description', () => {
        products.forEach((product: Product) => {
            expect(product.description, `Product "${product.name}" (id: ${product.id}) is missing a description`).toBeTypeOf('string');
            expect(product.description!.length, `Product "${product.name}" has an empty description`).toBeGreaterThan(10);
        });
    });

    it('badge should be valid if present', () => {
        products.forEach((product: Product) => {
            if (product.badge) {
                expect(['new', 'bestseller', 'sale']).toContain(product.badge);
            }
        });
    });

    it('originalPrice should be greater than price when present', () => {
        products.forEach((product: Product) => {
            if (product.originalPrice) {
                expect(product.originalPrice).toBeGreaterThan(product.price);
            }
        });
    });

    it('variants should have valid structure when present', () => {
        products.forEach((product: Product) => {
            if (product.variants && product.variants.length > 0) {
                product.variants.forEach(variant => {
                    expect(variant.name).toBeTypeOf('string');
                    expect(variant.color).toBeTypeOf('string');
                    expect(variant.colorHex).toMatch(/^#[0-9A-Fa-f]{6}$/);
                    expect(variant.image).toBeTypeOf('string');
                    expect(variant.image.length).toBeGreaterThan(0);
                });
            }
        });
    });

    it('stock should be non-negative when present', () => {
        products.forEach((product: Product) => {
            if (product.stock !== undefined) {
                expect(product.stock).toBeGreaterThanOrEqual(0);
            }
            if (product.variants) {
                product.variants.forEach(v => {
                    if (v.stock !== undefined) {
                        expect(v.stock).toBeGreaterThanOrEqual(0);
                    }
                });
            }
        });
    });
});

describe('Categories data', () => {
    it('should have at least 3 categories', () => {
        expect(categories.length).toBeGreaterThanOrEqual(3);
    });

    it('each category should have name, count, and image', () => {
        categories.forEach(cat => {
            expect(cat.name).toBeTypeOf('string');
            expect(cat.count).toBeTypeOf('number');
            expect(cat.count).toBeGreaterThan(0);
            expect(cat.image).toBeTypeOf('string');
        });
    });
});

describe('Colors data', () => {
    it('should have valid hex codes', () => {
        colors.forEach(color => {
            expect(color.name).toBeTypeOf('string');
            expect(color.hex).toMatch(/^#[0-9A-Fa-f]{6}$/);
        });
    });
});
