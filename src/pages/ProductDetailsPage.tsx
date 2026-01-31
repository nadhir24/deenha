import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/shop/ProductCard';

const ProductDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const { products, loading } = useProducts();
    const { addToCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();

    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState('description');

    const product = products.find(p => p.id === Number(id));
    const isWishlisted = product ? isInWishlist(product.id) : false;

    // Related products (same category, excluding current)
    const relatedProducts = products
        .filter(p => p.category === product?.category && p.id !== product?.id)
        .slice(0, 4);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (product && product.size.length > 0) {
            setSelectedSize(product.size[0]);
        }
    }, [product]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 border-2 border-accent-gold border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-[10px] uppercase font-bold tracking-[0.3em] text-secondary">Discovering Excellence...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h2 className="font-display text-3xl mb-4">Product Not Found</h2>
                    <Link to="/" className="text-accent-gold hover:underline">Return Home</Link>
                </div>
            </div>
        );
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'details', label: 'Details & Care' },
        { id: 'shipping', label: 'Shipping & Returns' }
    ];

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, selectedSize, product.color, quantity);
        }
    };

    return (
        <main className="pt-44 pb-24 bg-white">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                {/* Breadcrumbs */}
                <nav className="flex items-center gap-2 mb-12 text-[10px] uppercase font-bold tracking-widest text-secondary">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link to={`/shop?category=${product.category}`} className="hover:text-primary transition-colors">{product.category}</Link>
                    <span>/</span>
                    <span className="text-primary">{product.name}</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-32">
                    {/* Image Gallery with Zoom */}
                    <div className="relative group overflow-hidden bg-surface-secondary shadow-lg aspect-[3/4]">
                        <motion.div
                            className="w-full h-full cursor-zoom-in"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            onMouseMove={(e) => {
                                const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
                                const x = ((e.clientX - left) / width) * 100;
                                const y = ((e.clientY - top) / height) * 100;
                                const img = e.currentTarget.querySelector('img');
                                if (img) {
                                    img.style.transformOrigin = `${x}% ${y}%`;
                                    img.style.transform = 'scale(2)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                const img = e.currentTarget.querySelector('img');
                                if (img) {
                                    img.style.transform = 'scale(1)';
                                }
                            }}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover transition-transform duration-500 ease-out"
                            />
                        </motion.div>

                        {/* Zoom Hint */}
                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <span className="text-[10px] uppercase font-bold tracking-[0.2em] bg-white/80 backdrop-blur-sm px-4 py-2 text-primary shadow-sm">
                                Hover to Explore Details
                            </span>
                        </div>
                    </div>

                    {/* Product Info */}
                    <motion.div
                        className="flex flex-col"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="mb-10">
                            <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">
                                {product.category} {product.badge && `• ${product.badge.toUpperCase()}`}
                            </span>
                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-6">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4 mb-8">
                                <span className="text-2xl font-bold tracking-widest text-primary">
                                    {formatPrice(product.price)}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-lg text-secondary line-through opacity-50">
                                        {formatPrice(product.originalPrice)}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Selection Options */}
                        <div className="space-y-10 mb-12">
                            {/* Color */}
                            <div>
                                <span className="text-[10px] uppercase font-bold tracking-[0.3em] mb-4 block">Color: <span className="text-secondary">{product.color}</span></span>
                                <div className="flex gap-3">
                                    <div
                                        className="w-8 h-8 rounded-none border-2 border-primary p-0.5"
                                        title={product.color}
                                    >
                                        <div className="w-full h-full" style={{ backgroundColor: product.colorHex }} />
                                    </div>
                                </div>
                            </div>

                            {/* Size selection */}
                            {product.size.length > 0 && (
                                <div>
                                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] mb-4 block">Select Size</span>
                                    <div className="flex flex-wrap gap-3">
                                        {product.size.map(s => (
                                            <button
                                                key={s}
                                                onClick={() => setSelectedSize(s)}
                                                className={`min-w-[60px] h-12 flex items-center justify-center border text-[11px] font-bold tracking-widest transition-all duration-300 ${selectedSize === s
                                                    ? 'bg-primary text-white border-primary'
                                                    : 'border-black/10 text-primary hover:border-primary'
                                                    }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Quantity */}
                            <div>
                                <span className="text-[10px] uppercase font-bold tracking-[0.3em] mb-4 block">Quantity</span>
                                <div className="inline-flex items-center border border-black/10">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-surface-secondary transition-colors"
                                    >—</button>
                                    <span className="w-12 text-center text-sm font-bold">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-12 flex items-center justify-center hover:bg-surface-secondary transition-colors"
                                    >+</button>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-6 mb-16">
                            <div className="flex items-center justify-between py-4 border-y border-black/5">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-secondary">Inventory Status</span>
                                <span className={`text-[11px] font-bold tracking-widest ${(product.stock || 0) > 0 ? 'text-green-600' : 'text-red-500'
                                    }`}>
                                    {(product.stock || 0) > 0
                                        ? (product.stock! <= 5 ? `ONLY ${product.stock} PIECES REMAINING` : 'AVAILABLE IN ATELIER')
                                        : 'CURRENTLY UNAVAILABLE'}
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <motion.button
                                    onClick={handleAddToCart}
                                    disabled={(product.stock || 0) === 0}
                                    className={`flex-1 py-5 text-[11px] font-bold uppercase tracking-[0.4em] transition-all duration-500 shadow-xl ${(product.stock || 0) === 0
                                        ? 'bg-secondary cursor-not-allowed opacity-50 text-white'
                                        : 'bg-primary text-white hover:bg-accent-gold'
                                        }`}
                                    whileTap={(product.stock || 0) > 0 ? { scale: 0.98 } : {}}
                                >
                                    {(product.stock || 0) === 0 ? 'Currently Out of Stock' : 'Add to Discovery'}
                                </motion.button>
                                <motion.button
                                    onClick={() => toggleWishlist(product.id)}
                                    className={`w-16 h-16 flex items-center justify-center border transition-all duration-500 ${isWishlisted ? 'bg-accent-gold border-accent-gold text-white shadow-lg' : 'border-black/10 text-primary hover:border-primary'
                                        }`}
                                    whileTap={{ scale: 0.92 }}
                                >
                                    <svg className="w-6 h-6" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </motion.button>
                            </div>
                        </div>

                        {/* Information Tabs */}
                        <div className="border-t border-black/5 pt-10">
                            <div className="flex gap-8 mb-8">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`text-[10px] uppercase font-bold tracking-[0.2em] relative pb-2 transition-colors ${activeTab === tab.id ? 'text-primary' : 'text-secondary hover:text-primary'
                                            }`}
                                    >
                                        {tab.label}
                                        {activeTab === tab.id && (
                                            <motion.div
                                                layoutId="activeTabDetails"
                                                className="absolute bottom-0 left-0 right-0 h-[1px] bg-accent-gold"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className="text-secondary text-sm leading-relaxed max-w-lg">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {activeTab === 'description' && (
                                            <p>This premium {product.name} is designed with the modern woman in mind. Combining traditional modesty with global style, it features exceptional craftmanship and the highest quality materials selected for both elegance and longevity.</p>
                                        )}
                                        {activeTab === 'details' && (
                                            <ul className="list-disc pl-4 space-y-2">
                                                <li>Premium material with soft texture</li>
                                                <li>Signature {product.category} collection</li>
                                                <li>Hand wash recommended for preservation</li>
                                                <li>Crafted with attention to detail</li>
                                            </ul>
                                        )}
                                        {activeTab === 'shipping' && (
                                            <p>Deenha provides worldwide shipping. Orders are usually processed within 1-2 business days. Complimentary shipping available for regional orders above a certain threshold. Returns are accepted within 7 days of receipt in original condition.</p>
                                        )}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <section className="pt-24 border-t border-black/5">
                        <div className="text-center mb-16">
                            <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">
                                Completion
                            </span>
                            <h2 className="font-display text-4xl font-normal tracking-tight mb-4 italic">
                                You May Also Like
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} onQuickView={() => { }} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
};

export default ProductDetailsPage;
