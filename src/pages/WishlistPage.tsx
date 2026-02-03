import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/shop/ProductCard';

const WishlistPage = () => {
    const { wishlist } = useWishlist();
    const { products, loading } = useProducts();

    const wishlistedProducts = products.filter(product => wishlist.includes(product.id));

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-secondary">
                <div className="w-8 h-8 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <main className="pt-32 pb-24 bg-surface-secondary min-h-screen">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Your Curated List
                    </motion.span>
                    <motion.h1
                        className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Wishlist
                    </motion.h1>
                </div>

                {/* Content */}
                {wishlist.length === 0 ? (
                    <motion.div
                        className="flex flex-col items-center justify-center py-20 bg-white border border-black/5 shadow-sm rounded-none"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="w-16 h-16 mb-6 text-black/20">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <p className="font-display text-xl mb-2 text-primary">Your wishlist is currently empty</p>
                        <p className="text-secondary text-sm mb-8">Start curating your personal collection today.</p>
                        <Link
                            to="/shop"
                            className="bg-primary text-white border border-primary px-8 py-3 text-[10px] uppercase font-bold tracking-[0.3em] hover:bg-white hover:text-primary transition-colors"
                        >
                            Explore Collection
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
                        <AnimatePresence>
                            {wishlistedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onQuickView={() => { }}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </main>
    );
};

export default WishlistPage;
