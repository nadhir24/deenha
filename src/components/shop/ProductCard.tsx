import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { Product } from '../../data/products';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '../../lib/currency';
import { getOptimizedImage } from '../../lib/images';

interface ProductCardProps {
    product: Product;
    onQuickView: (product: Product) => void;
}

const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
    const { t } = useTranslation();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const getBadgeClass = (badge: string) => {
        switch (badge) {
            case 'new':
                return 'bg-accent-gold text-white';
            case 'bestseller':
                return 'bg-primary text-white';
            case 'sale':
                return 'bg-accent-rose text-white';
            default:
                return '';
        }
    };

    const getBadgeText = (badge: string) => {
        switch (badge) {
            case 'new':
                return t('product.badge.new');
            case 'bestseller':
                return t('product.badge.bestseller');
            case 'sale':
                return t('product.badge.sale');
            default:
                return '';
        }
    };

    return (
        <motion.div
            className="product-card group relative bg-white dark:bg-primary overflow-hidden flex flex-col items-center text-center transition-colors duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Image Container - Square/Portrait blend */}
            <Link to={`/product/${product.id}`} className="relative w-full aspect-[3/4] overflow-hidden bg-[#F9F9F9] dark:bg-white/5 block">
                <img
                    src={getOptimizedImage(product.image, 400, 70)}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${product.stock === 0 ? 'grayscale opacity-60' : ''}`}
                    loading="lazy"
                />

                {/* Sold Out Overlay */}
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="text-white text-[12px] font-bold tracking-[0.5em] uppercase border border-white/30 px-6 py-2">
                            {t('product.sold_out')}
                        </span>
                    </div>
                )}

                {/* Subtle Luxury Gradient on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />

                {/* Badge - Minimalist */}
                {product.badge && product.stock !== 0 && (
                    <div className={`absolute top-0 left-0 px-3 py-1 text-[10px] font-bold tracking-widest ${getBadgeClass(product.badge)}`}>
                        {getBadgeText(product.badge)}
                    </div>
                )}

                {/* Low Stock Indicator */}
                {product.stock !== undefined && product.stock > 0 && product.stock <= 5 && (
                    <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 text-[8px] font-bold tracking-widest animate-pulse">
                        {t('product.only_left', { count: product.stock })}
                    </div>
                )}
            </Link>

            {/* Wishlist Button - Clean Circle */}
            <motion.button
                className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${isWishlisted ? 'bg-accent-gold shadow-lg' : 'bg-white/80 dark:bg-white/10 hover:bg-white dark:hover:bg-white shadow-sm'}`}
                onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product.id);
                }}
                whileTap={{ scale: 0.9 }}
                aria-label={isWishlisted ? t('product.remove_wishlist', 'Remove from Wishlist') : t('product.add_wishlist', 'Add to Wishlist')}
            >
                <svg
                    className={`w-4 h-4 transition-colors ${isWishlisted ? 'text-white' : 'text-primary dark:text-white'}`}
                    fill={isWishlisted ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
            </motion.button>

            {/* Quick View - Luxury Slide-up */}
            <div className="absolute inset-x-0 top-[60%] py-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 z-10">
                <button
                    className="bg-primary/90 dark:bg-accent-gold/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-3 hover:bg-accent-gold dark:hover:bg-white dark:hover:text-black transition-colors"
                    onClick={() => onQuickView(product)}
                >
                    {t('product.quick_discovery')}
                </button>
            </div>

            {/* Product Info - Elegantly Centered */}
            <div className="py-6 px-4 flex flex-col items-center">
                <Link to={`/product/${product.id}`} className="flex flex-col items-center">
                    {/* Category/Collection */}
                    <span className="text-[10px] uppercase tracking-[0.2em] text-secondary dark:text-white/75 mb-2">
                        {product.category}
                    </span>

                    {/* Name - Playfair Display for Elegance */}
                    <h3 className="font-display text-lg md:text-xl text-primary dark:text-white mb-3 hover:text-accent-gold transition-colors duration-300 notranslate">
                        {product.name}
                    </h3>

                    {/* Price - Clean & Bold */}
                    <div className="flex flex-col items-center gap-1">
                        <span className="font-bold text-sm tracking-widest text-primary dark:text-white notranslate">
                            {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-xs text-secondary dark:text-white/40 line-through opacity-60 notranslate">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                    </div>
                </Link>

                {/* Color/Options */}
                <div className="mt-4 flex gap-1.5 items-center">
                    {product.variants && product.variants.length > 0 ? (
                        <>
                            {product.variants.slice(0, 3).map((v, i) => (
                                <div
                                    key={i}
                                    className="w-2.5 h-2.5 rounded-full border border-black/10 dark:border-white/20"
                                    style={{ backgroundColor: v.colorHex }}
                                    title={v.color}
                                />
                            ))}
                            {product.variants.length > 3 && (
                                <span className="text-[8px] text-secondary dark:text-white/40 tracking-widest">+{product.variants.length - 3}</span>
                            )}
                        </>
                    ) : (
                        <>
                            <div
                                className="w-2.5 h-2.5 rounded-full border border-black/10 dark:border-white/20"
                                style={{ backgroundColor: product.colorHex }}
                            />
                            <span className="text-[9px] uppercase tracking-widest text-secondary dark:text-white/40">{product.color}</span>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
