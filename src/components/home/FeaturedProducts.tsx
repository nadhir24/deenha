import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../../data/products';
import ProductCard from '../shop/ProductCard';
import QuickViewModal from '../ui/QuickViewModal';
import { useProducts } from '../../hooks/useProducts';

const FeaturedProducts = () => {
    const { products, loading } = useProducts();
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

    // Get featured products (new and bestsellers)
    const featuredProducts = products
        .filter(p => p.badge === 'new' || p.badge === 'bestseller')
        .slice(0, 4);

    if (loading && products.length === 0) return null; // Or show skeleton

    return (
        <section className="pt-20 pb-24 bg-surface-secondary scroll-mt-8" id="shop">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">
                        Curated Selection
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight">
                        Featured Collection
                    </h2>
                </motion.div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProductCard
                                product={product}
                                onQuickView={setQuickViewProduct}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <Link
                        to="/shop"
                        className="inline-block bg-primary text-white px-12 py-5 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-accent-gold transition-colors duration-500 shadow-xl"
                    >
                        Explore The Atelier
                    </Link>
                </motion.div>
            </div>

            {/* Quick View Modal */}
            <QuickViewModal
                product={quickViewProduct}
                isOpen={!!quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
            />
        </section>
    );
};

export default FeaturedProducts;
