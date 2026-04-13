import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../../data/products';
import ProductCard from '../shop/ProductCard';
import QuickViewModal from '../ui/QuickViewModal';
import { useProducts } from '../../hooks/useProducts';
import { useTranslation } from 'react-i18next';
import { getOptimizedImage } from '../../lib/images';

interface CollectionHighlightProps {
    title: string;
    bannerImage: string;
    collectionTitle: string;
    collectionDescription: string;
    category: string;
    isReversed?: boolean;
    productIds?: string[];
}

const CollectionHighlight = ({
    title,
    bannerImage,
    collectionTitle,
    collectionDescription,
    category,
    productIds = []
}: CollectionHighlightProps) => {
    const { t } = useTranslation();
    const { products, loading } = useProducts();
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Parallax Transform
    const yBanner = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

    // Filter products by IDs if provided, otherwise by category
    const collectionProducts = productIds && productIds.length > 0
        ? products.filter(p => productIds.includes(String(p.id)))
        : products
            .filter(p => {
                if (category === 'New Arrival') return p.badge === 'new';
                return p.category.toLowerCase() === category.toLowerCase();
            })
            .slice(0, 4);

    if (loading && products.length === 0) return null;

    return (
        <section ref={sectionRef} className="py-16 bg-white dark:bg-primary overflow-hidden transition-colors duration-300">
            <div className="w-full">
                {/* Main Banner Image - Full Width Editorial Style */}
                <motion.div
                    className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden mb-16"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                >
                    <motion.img
                        src={getOptimizedImage(bannerImage, 2000, 85)}
                        alt={collectionTitle}
                        className="absolute inset-0 w-full h-[120%] object-cover"
                        style={{ y: yBanner, scale: 1.05 }}
                        transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    
                    {/* Integrated Text Overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 lg:p-24 flex flex-col items-start justify-end text-left z-10">
                        <motion.h3 
                            className="text-white/80 text-[10px] md:text-xs uppercase font-bold tracking-[0.4em] mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            {title}
                        </motion.h3>
                        
                        <motion.h2
                            className="font-display text-5xl md:text-7xl lg:text-8xl font-normal mb-6 text-white drop-shadow-lg max-w-4xl"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            {collectionTitle}
                        </motion.h2>
                        
                        <motion.p 
                            className="text-white/90 text-sm md:text-lg font-light italic max-w-2xl mb-10 drop-shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            {collectionDescription.split('\n')[0]}
                        </motion.p>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                        >
                            <Link
                                to={`/shop?${productIds && productIds.length > 0 ? `ids=${productIds.join(',')}` : `category=${encodeURIComponent(category === 'New Arrival' ? '' : category)}`}`}
                                className="text-[11px] uppercase tracking-[0.3em] font-medium text-white border-b border-white pb-1 hover:border-accent-gold hover:text-accent-gold transition-all duration-500 inline-block"
                            >
                                {t('product.discover', 'Discover the Collection')}
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Section Divider */}
                <div className="flex justify-center mb-16">
                    <div className="w-[60px] h-[1px] bg-accent-gold/60" />
                </div>

                {/* Related Products Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
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
