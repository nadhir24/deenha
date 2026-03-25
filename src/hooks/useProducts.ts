import { useState, useEffect } from 'react';
import { products as staticProducts, Product } from '../data/products';

export const useProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            // Simulate a small delay for consistency
            await new Promise(resolve => setTimeout(resolve, 100));
            setProducts(staticProducts);
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
