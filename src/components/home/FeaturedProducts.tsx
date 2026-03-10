import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../../data/products';
import ProductCard from '../shop/ProductCard';
import QuickViewModal from '../ui/QuickViewModal';
import { useProducts } from '../../hooks/useProducts';
import { useTranslation } from 'react-i18next';

const FeaturedProducts = () => {
    const { t } = useTranslation();
    const { products, loading } = useProducts();
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

    const featuredProducts = products
        .filter(p => p.badge === 'new' || p.badge === 'bestseller')
        .slice(0, 4);

    if (loading && products.length === 0) return null;

    return (
        <section className="pt-20 pb-24 bg-surface-secondary scroll-mt-8" id="shop">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">
                        Pilihan Terkurasi
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight">
                        Koleksi Unggulan
                    </h2>
                </motion.div>

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
                        {t('featured.cta')}
                    </Link>
                </motion.div>
            </div>

            <QuickViewModal
                product={quickViewProduct}
                isOpen={!!quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
            />
        </section>
    );
};


export default FeaturedProducts;
