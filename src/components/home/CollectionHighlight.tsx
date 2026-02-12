import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../../data/products';
import ProductCard from '../shop/ProductCard';
import QuickViewModal from '../ui/QuickViewModal';
import { useProducts } from '../../hooks/useProducts';

interface CollectionHighlightProps {
    title: string;
    bannerImage: string;
    collectionTitle: string;
    collectionDescription: string;
    category: string;
    isReversed?: boolean;
}

const CollectionHighlight = ({
    title,
    bannerImage,
    collectionTitle,
    collectionDescription,
    category
}: CollectionHighlightProps) => {
    const { products, loading } = useProducts();
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

    // Filter products by category and limit to 4
    // If category is "New Arrival", filter by badge
    const collectionProducts = products
        .filter(p => {
            if (category === 'New Arrival') return p.badge === 'new';
            return p.category.toLowerCase() === category.toLowerCase();
        })
        .slice(0, 4);

    if (loading && products.length === 0) return null;

    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Small Title on Top */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-primary text-xs uppercase font-bold tracking-[0.4em]">
                        {title}
                    </h3>
                </motion.div>

                {/* Main Banner Image - Premium Framed Style */}
                <motion.div
                    className="relative w-full aspect-[21/10] md:aspect-[21/8] overflow-hidden mb-16 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                >
                    <img
                        src={bannerImage}
                        alt={collectionTitle}
                        className="w-full h-full object-cover transition-transform duration-[2s] hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-700 hover:opacity-0" />
                </motion.div>

                {/* Collection Text Content */}
                <motion.div
                    className="text-center mb-20 max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-8 uppercase text-primary">
                        {collectionTitle}
                    </h2>
                    <div className="w-12 h-[1px] bg-accent-gold mx-auto mb-8" />
                    <p className="text-secondary text-sm md:text-base leading-relaxed mb-10 px-4 font-light italic">
                        {collectionDescription}
                    </p>
                    <Link
                        to={`/shop?category=${encodeURIComponent(category === 'New Arrival' ? '' : category)}`}
                        className="inline-block relative px-12 py-4 text-[11px] font-bold uppercase tracking-[0.4em] group overflow-hidden"
                    >
                        <span className="relative z-10 text-white group-hover:text-primary transition-colors duration-500">Shop Now</span>
                        <div className="absolute inset-0 bg-primary group-hover:bg-white border border-primary transition-all duration-500" />
                    </Link>
                </motion.div>

                {/* Related Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                    {collectionProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (index * 0.1), duration: 0.8 }}
                        >
                            <ProductCard
                                product={product}
                                onQuickView={setQuickViewProduct}
                            />
                        </motion.div>
                    ))}
                </div>
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

export default CollectionHighlight;
