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
                price: p.price,
                originalPrice: p.original_price,
                image: p.image,
                category: p.category,
                size: p.size || [],
                color: p.color,
                colorHex: p.color_hex,
                badge: p.badge,
                soldCount: p.sold_count,
                stock: p.stock || 0
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
