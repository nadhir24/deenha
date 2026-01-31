import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../../data/products';
import { useCart } from '../../context/CartContext';

interface QuickViewModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<string>('');

    // Reset selection when product changes
    useEffect(() => {
        if (product) {
            setSelectedSize(product.size[0] || '');
        }
    }, [product]);

    if (!product) return null;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    const handleAddToCart = () => {
        if (!selectedSize && product.size.length > 0) {
            alert('Please select a size');
            return;
        }
        addToCart(product, selectedSize, product.color);
        onClose();
    };

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
                        className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="bg-white max-w-5xl w-full flex flex-col md:flex-row overflow-hidden shadow-2xl relative">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 z-10 p-2 text-primary hover:text-accent-gold transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Image Section */}
                            <div className="w-full md:w-1/2 aspect-[3/4] md:aspect-auto bg-surface-secondary overflow-hidden">
                                <motion.img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    initial={{ scale: 1.1 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                />
                                {product.badge && (
                                    <div className="absolute top-0 left-0 bg-primary text-white text-[10px] font-bold tracking-[0.2em] px-4 py-2 uppercase">
                                        {product.badge}
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <div className="mb-8">
                                    <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">
                                        {product.category}
                                    </span>
                                    <h2 className="font-display text-3xl md:text-4xl font-normal tracking-tight mb-4 italic">
                                        {product.name}
                                    </h2>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xl font-bold tracking-widest text-primary">
                                            {formatPrice(product.price)}
                                        </span>
                                        {product.originalPrice && (
                                            <span className="text-sm text-secondary line-through opacity-50">
                                                {formatPrice(product.originalPrice)}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Options Selection */}
                                <div className="space-y-8 mb-10">
                                    {/* Size */}
                                    {product.size.length > 0 && (
                                        <div>
                                            <span className="text-[10px] uppercase font-bold tracking-[0.3em] mb-3 block text-secondary">Select Size</span>
                                            <div className="flex flex-wrap gap-2">
                                                {product.size.map((size) => (
                                                    <button
                                                        key={size}
                                                        onClick={() => setSelectedSize(size)}
                                                        className={`h-10 px-4 border text-[10px] font-bold tracking-widest transition-all duration-300 ${selectedSize === size
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
                                        <span className="text-[10px] uppercase font-bold tracking-[0.3em] mb-3 block text-secondary">Color</span>
                                        <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 border border-black/10" style={{ backgroundColor: product.colorHex }} />
                                            <span className="text-[10px] uppercase tracking-widest text-primary">{product.color}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-secondary">Availability</span>
                                        <span className={`text-[10px] font-bold tracking-widest ${(product.stock || 0) > 0 ? 'text-green-600' : 'text-red-500'
                                            }`}>
                                            {(product.stock || 0) > 0
                                                ? (product.stock! <= 5 ? `ONLY ${product.stock} LEFT` : 'IN STOCK')
                                                : 'OUT OF STOCK'}
                                        </span>
                                    </div>
                                    <motion.button
                                        onClick={handleAddToCart}
                                        disabled={(product.stock || 0) === 0}
                                        className={`w-full py-4 text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-500 ${(product.stock || 0) === 0
                                                ? 'bg-secondary cursor-not-allowed opacity-50 text-white'
                                                : 'bg-primary text-white hover:bg-accent-gold'
                                            }`}
                                        whileTap={(product.stock || 0) > 0 ? { scale: 0.98 } : {}}
                                    >
                                        {(product.stock || 0) === 0 ? 'Out of Stock' : 'Add to Discovery'}
                                    </motion.button>
                                    <Link
                                        to={`/product/${product.id}`}
                                        onClick={onClose}
                                        className="w-full border border-black/10 text-primary py-4 text-[11px] flex items-center justify-center font-bold uppercase tracking-[0.3em] hover:border-primary transition-colors duration-500"
                                    >
                                        View Full Details
                                    </Link>
                                </div>

                                {/* Footer Info */}
                                <p className="text-[10px] uppercase tracking-[0.2em] text-secondary mt-8 text-center opacity-50">
                                    Free Regional Shipping on Orders Over 500K
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
