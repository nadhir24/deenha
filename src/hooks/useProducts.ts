import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../data/products';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('id', { ascending: true });

            if (error) throw error;

            // Map database fields to our Product interface if names differ
            const mappedProducts: Product[] = (data || []).map(p => ({
                id: p.id,
                name: p.name,
                name_en: p.name_en,
                name_id: p.name_id,
                name_fr: p.name_fr,
                name_zh: p.name_zh,
                price: p.price,
                originalPrice: p.original_price,
                image: p.image,
                category: p.category,
                category_en: p.category_en,
                category_id: p.category_id,
                category_fr: p.category_fr,
                category_zh: p.category_zh,
                size: p.size || [],
                color: p.color,
                colorHex: p.color_hex,
                badge: p.badge,
                soldCount: p.sold_count,
                stock: p.stock || 0,
                description: p.description,
                description_en: p.description_en,
                description_id: p.description_id,
                description_fr: p.description_fr,
                description_zh: p.description_zh,
                variants: p.variants || []
            }));

            setProducts(mappedProducts);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return { products, loading, error, refresh: fetchProducts };
};
