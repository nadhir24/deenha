import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useTranslation } from 'react-i18next';
import { useFormatPrice } from '../../hooks/useFormatPrice';
import { getOptimizedImage } from '../../lib/images';

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
    const { t } = useTranslation();
    const formatPrice = useFormatPrice();
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<string>('');

    // Reset selection when product changes
    useEffect(() => {
        if (product) {
            setSelectedSize(product.size[0] || '');
        }
    }, [product]);

    if (!product) return null;

    const handleAddToCart = () => {
        if (!selectedSize && product.size.length > 0) {
            alert(t('product.select_size'));
            return;
        }
        addToCart(product, selectedSize, product.color);
        onClose();
    };

    // ALWAYS use original product name per master's request
    const displayName = product.name;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pt-20 md:pt-8"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="bg-white max-w-5xl w-full max-h-[85vh] md:max-h-none flex flex-col md:flex-row overflow-y-auto md:overflow-hidden shadow-2xl relative scrollbar-hide">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 md:top-6 md:right-6 z-[110] p-2 bg-white/80 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-full text-primary hover:text-accent-gold shadow-sm md:shadow-none transition-all"
                            >
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Image Section */}
                            <div className="w-full md:w-1/2 min-h-[350px] md:min-h-0 bg-surface-secondary overflow-hidden relative">
                                <motion.img
                                    src={getOptimizedImage(product.image, 800, 80)}
                                    alt={displayName}
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                />
                                {product.badge && (
                                    <div className="absolute top-0 left-0 bg-primary text-white text-[9px] md:text-[10px] font-bold tracking-[0.2em] px-3 py-1.5 md:px-4 md:py-2 uppercase">
                                        {t(`product.badge.${product.badge}`)}
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center">
                                <div className="mb-6 md:mb-8">
                                    <span className="text-accent-gold text-[9px] md:text-[10px] uppercase font-bold tracking-[0.4em] mb-2 md:mb-4 block">
                                        {product.category}
                                    </span>
                                    <h2 className="font-display text-2xl md:text-4xl font-normal tracking-tight mb-3 md:mb-4 italic">
                                        {displayName}
                                    </h2>
                                    <div className="flex items-center gap-4">
                                        <span className="text-lg md:text-xl font-bold tracking-widest text-primary notranslate">
                                            {formatPrice(product.price)}
                                        </span>
                                        {product.originalPrice && (
                                            <span className="text-xs md:text-sm text-secondary line-through opacity-50 notranslate">
                                                {formatPrice(product.originalPrice)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Options Selection */}
                                <div className="space-y-6 md:space-y-8 mb-8 md:mb-10">
                                    {/* Size */}
                                    {product.size.length > 0 && (
                                        <div>
                                            <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] mb-3 block text-secondary">{t('product.select_size')}</span>
                                            <div className="flex flex-wrap gap-2">
                                                {product.size.map((size) => (
                                                    <button
                                                        key={size}
                                                        onClick={() => setSelectedSize(size)}
                                                        className={`h-9 px-3 md:h-10 md:px-4 border text-[9px] md:text-[10px] font-bold tracking-widest transition-all duration-300 ${selectedSize === size
                                                            ? 'border-primary bg-primary text-white'
                                                            : 'border-black/10 text-primary hover:border-primary'
                                                            }`}
                                                    >
                                                        {size}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Color Indicator */}
                                    <div>
                                        <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-[0.3em] mb-3 block text-secondary">{t('shop.colors')}</span>
                                        <div className="flex items-center gap-3">
                                            <div className="w-5 h-5 md:w-6 md:h-6 border border-black/10" style={{ backgroundColor: product.colorHex }} />
                                            <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-primary">{product.color}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="space-y-3 md:space-y-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-secondary">{t('product.inventory')}</span>
                                        <span className={`text-[9px] md:text-[10px] font-bold tracking-widest ${(product.stock || 0) > 0 ? 'text-green-600' : 'text-red-500'
                                            }`}>
                                            {(product.stock || 0) > 0
                                                ? (product.stock! <= 5 ? t('product.only_left', { count: product.stock }) : t('product.available'))
                                                : t('product.sold_out')}
                                        </span>
                                    </div>
                                    <motion.button
                                        onClick={handleAddToCart}
                                        disabled={(product.stock || 0) === 0}
                                        className={`w-full py-3.5 md:py-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 ${(product.stock || 0) === 0
                                            ? 'bg-secondary cursor-not-allowed opacity-50 text-white'
                                            : 'bg-primary text-white hover:bg-accent-gold'
                                            }`}
                                        whileTap={(product.stock || 0) > 0 ? { scale: 0.98 } : {}}
                                    >
                                        {(product.stock || 0) === 0 ? t('product.sold_out') : t('product.add_to_cart')}
                                    </motion.button>
                                    <Link
                                        to={`/product/${product.id}`}
                                        onClick={onClose}
                                        className="w-full border border-black/10 text-primary py-3.5 md:py-4 text-[10px] md:text-[11px] flex items-center justify-center font-bold uppercase tracking-[0.3em] hover:border-primary transition-colors duration-500"
                                    >
                                        {t('product.quick_discovery')}
                                    </Link>
                                </div>

                                {/* Footer Info */}
                                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-secondary mt-6 md:mt-8 text-center opacity-50">
                                    {t('announcement.free_shipping')}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default QuickViewModal;
