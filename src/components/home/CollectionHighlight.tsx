import { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../../data/products';
import ProductCard from '../shop/ProductCard';
import QuickViewModal from '../ui/QuickViewModal';
import { useProducts } from '../../hooks/useProducts';
import { useTranslation } from 'react-i18next';

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

    // Parallax & Reveal Transforms
    const yBanner = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    const clipPath = useTransform(
        scrollYProgress,
        [0, 0.4],
        ["inset(15% 10% 15% 10%)", "inset(0% 0% 0% 0%)"]
    );
    const letterSpacing = useTransform(scrollYProgress, [0, 0.6], ["-0.05em", "0.2em"]);
    const opacityTitle = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

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
        <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
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

                {/* Main Banner Image - Premium Framed Style with Parallax */}
                <motion.div
                    className="relative w-full aspect-[21/10] md:aspect-[21/8] overflow-hidden mb-16 shadow-2xl rounded-sm"
                    style={{ clipPath }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                >
                    <motion.img
                        src={bannerImage}
                        alt={collectionTitle}
                        className="absolute inset-0 w-full h-[140%] object-cover"
                        style={{ y: yBanner }}
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity duration-700 hover:opacity-0" />
                </motion.div>

                {/* Collection Text Content with Kinetic Typography */}
                <motion.div
                    className="text-center mb-20 max-w-4xl mx-auto"
                    style={{ opacity: opacityTitle }}
                >
                    <motion.h2
                        className="font-display text-4xl md:text-6xl lg:text-7xl font-normal mb-8 uppercase text-primary inline-block"
                        style={{ letterSpacing }}
                    >
                        {collectionTitle}
                    </motion.h2>
                    <div className="w-12 h-[1px] bg-accent-gold mx-auto mb-8" />
                    <p className="text-secondary text-sm md:text-lg leading-relaxed mb-10 px-4 font-light italic max-w-2xl mx-auto">
                        {collectionDescription}
                    </p>
                    <Link
                        to={`/shop?${productIds && productIds.length > 0 ? `ids=${productIds.join(',')}` : `category=${encodeURIComponent(category === 'New Arrival' ? '' : category)}`}`}
                        className="inline-block relative px-12 py-4 text-[11px] font-bold uppercase tracking-[0.4em] group overflow-hidden"
                    >
                        <span className="relative z-10 text-white group-hover:text-primary transition-colors duration-500">{t('product.shop_now')}</span>
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
