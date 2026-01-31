import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { Product } from '../../data/products';

interface ProductCardProps {
    product: Product;
    onQuickView: (product: Product) => void;
}

const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const isWishlisted = isInWishlist(product.id);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

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
                return 'NEW';
            case 'bestseller':
                return 'MUST HAVE';
            case 'sale':
                return 'OFFER';
            default:
                return '';
        }
    };

    return (
        <motion.div
            className="product-card group relative bg-white overflow-hidden flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {/* Image Container - Square/Portrait blend */}
            <Link to={`/product/${product.id}`} className="relative w-full aspect-[3/4] overflow-hidden bg-[#F9F9F9] block">
                <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 ${product.stock === 0 ? 'grayscale opacity-60' : ''}`}
                />

                {/* Sold Out Overlay */}
                {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="text-white text-[12px] font-bold tracking-[0.5em] uppercase border border-white/30 px-6 py-2">
                            Sold Out
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
                        ONLY {product.stock} LEFT
                    </div>
                )}
            </Link>

            {/* Wishlist Button - Clean Circle */}
            <motion.button
                className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${isWishlisted ? 'bg-accent-gold shadow-lg' : 'bg-white/80 hover:bg-white shadow-sm'}`}
                onClick={(e) => {
                    e.preventDefault();
                    toggleWishlist(product.id);
                }}
                whileTap={{ scale: 0.9 }}
            >
                <svg
                    className={`w-4 h-4 transition-colors ${isWishlisted ? 'text-white' : 'text-primary'}`}
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
                    className="bg-primary/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-3 hover:bg-accent-gold transition-colors"
                    onClick={() => onQuickView(product)}
                >
                    Quick Discovery
                </button>
            </div>

            {/* Product Info - Elegantly Centered */}
            <div className="py-6 px-4 flex flex-col items-center">
                <Link to={`/product/${product.id}`} className="flex flex-col items-center">
                    {/* Category/Collection */}
                    <span className="text-[10px] uppercase tracking-[0.2em] text-secondary mb-2">
                        {product.category}
                    </span>

                    {/* Name - Playfair Display for Elegance */}
                    <h3 className="font-display text-lg md:text-xl text-primary mb-3 hover:text-accent-gold transition-colors duration-300">
                        {product.name}
                    </h3>

                    {/* Price - Clean & Bold */}
                    <div className="flex flex-col items-center gap-1">
                        <span className="font-bold text-sm tracking-widest text-primary">
                            {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-xs text-secondary line-through opacity-60">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                    </div>
                </Link>

                {/* Color/Options */}
                <div className="mt-4 flex gap-1.5">
                    <div
                        className="w-2.5 h-2.5 rounded-full border border-black/10"
                        style={{ backgroundColor: product.colorHex }}
                    />
                    <span className="text-[9px] uppercase tracking-widest text-secondary">{product.color}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
