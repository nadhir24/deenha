import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { supabase } from '../../lib/supabase';
import { useTranslation } from 'react-i18next';
import { useFormatPrice } from '../../hooks/useFormatPrice';

const WHATSAPP_PHONE = import.meta.env.VITE_WHATSAPP_PHONE || '6281919234222';

const CartDrawer = () => {
    const { t } = useTranslation();
    const formatPrice = useFormatPrice();
    const { cartItems, removeFromCart, cartTotal, isCartOpen, setIsCartOpen, clearCart } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const generateOrderNumber = () => {
        const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        const random = Math.floor(1000 + Math.random() * 9000);
        return `DN-${date}-${random}`;
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        setIsCheckingOut(true);
        const orderNumber = generateOrderNumber();

        try {
            // 1. Create order in database
            const { error: orderError } = await supabase.from('orders').insert({
                order_number: orderNumber,
                items: cartItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    size: item.selectedSize,
                    color: item.selectedColor,
                    quantity: item.quantity,
                    price: item.price
                })),
                total_price: cartTotal,
                status: 'pending'
            });

            if (orderError) throw orderError;

            // 2. Prepare WhatsApp message
            let message = `${t('whatsapp.order_prefix')}\n\n`;
            message += `*${t('whatsapp.order_id')}: ${orderNumber}*\n`;
            message += `-------------------\n`;

            cartItems.forEach(item => {
                message += `- ${item.name} (${item.selectedSize}, ${item.selectedColor}) x${item.quantity}\n`;
            });

            message += `\n*${t('whatsapp.total')}: ${formatPrice(cartTotal)}*\n\n`;
            message += t('whatsapp.instructions');

            const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

            // 3. Clear cart and redirect
            clearCart();
            setIsCartOpen(false);
            window.open(whatsappUrl, '_blank');
        } catch (err) {
            console.error('Checkout error:', err);
            alert(t('cart.error'));
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                    />

                    {/* Drawer */}
                    <motion.div
                        className="fixed inset-y-0 right-0 z-[101] w-full max-w-md bg-white dark:bg-primary shadow-2xl flex flex-col transition-colors duration-300"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-border dark:border-white/10 flex items-center justify-between">
                            <h2 className="font-display text-xl font-semibold text-primary dark:text-white">{t('cart.title')} ({cartItems.length})</h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-surface-secondary dark:hover:bg-white/5 rounded-full transition-colors text-secondary dark:text-white/75"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center text-secondary dark:text-white/40">
                                    <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <p>{t('cart.empty')}</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-4 text-accent-gold font-medium hover:underline"
                                    >
                                        Lanjutkan Belanja
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item, index) => (
                                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 group">
                                        <div className="w-20 h-24 bg-surface-secondary dark:bg-white/5 rounded-lg overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-medium line-clamp-2 text-primary dark:text-white text-sm">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(index)}
                                                    className="text-secondary hover:text-red-500 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="text-xs text-secondary dark:text-white/40 mt-1 uppercase tracking-widest">
                                                {item.selectedSize} | {item.selectedColor}
                                            </p>
                                            <div className="mt-auto flex justify-between items-center">
                                                <span className="text-sm text-secondary">Jumlah: {item.quantity}</span>
                                                <span className="font-medium notranslate">
                                                    {formatPrice(item.price * item.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-border dark:border-white/10 bg-surface-secondary/30 dark:bg-white/5 transition-colors duration-300">
                                <p className="text-[10px] text-secondary dark:text-white/40 text-center mb-6 leading-relaxed bg-accent-gold/5 dark:bg-accent-gold/10 py-3 px-4 rounded-lg border border-accent-gold/20">
                                    {t('cart.popup_warning')}
                                </p>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-secondary dark:text-white/75 uppercase text-[10px] font-bold tracking-[0.2em]">{t('cart.total')}</span>
                                    <span className="text-2xl font-display italic text-primary dark:text-white notranslate">
                                        {formatPrice(cartTotal)}
                                    </span>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className={`w-full btn-primary rounded-lg py-4 flex items-center justify-center gap-2 ${isCheckingOut ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isCheckingOut ? (
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent animate-spin rounded-full" />
                                    ) : (
                                        <>
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                                alt="WhatsApp"
                                                className="w-6 h-6"
                                            />
                                            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                                                {t('cart.checkout_wa')}
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
