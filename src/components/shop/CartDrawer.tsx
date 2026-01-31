import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const CartDrawer = () => {
    const { cartItems, removeFromCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();

    const phoneNumber = '6281234567890';

    const generateMessage = () => {
        if (cartItems.length === 0) return '';

        let message = 'Halo Deenha! Saya ingin memesan:\n\n';
        cartItems.forEach(item => {
            message += `- ${item.name} (${item.selectedSize}, ${item.selectedColor}) x${item.quantity}\n`;
        });

        message += `\nTotal: Rp ${cartTotal.toLocaleString('id-ID')}`;
        return encodeURIComponent(message);
    };

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${generateMessage()}`;

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
                        className="fixed inset-y-0 right-0 z-[101] w-full max-w-md bg-white shadow-2xl flex flex-col"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-border flex items-center justify-between">
                            <h2 className="font-display text-xl font-semibold">Shopping Cart ({cartItems.length})</h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="p-2 hover:bg-surface-secondary rounded-full transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center text-secondary">
                                    <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    <p>Your cart is empty</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-4 text-accent-gold font-medium hover:underline"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item, index) => (
                                    <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                                        <div className="w-20 h-24 bg-surface-secondary rounded-lg overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-medium line-clamp-2">{item.name}</h3>
                                                <button
                                                    onClick={() => removeFromCart(index)}
                                                    className="text-secondary hover:text-red-500 transition-colors"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <p className="text-sm text-secondary mt-1">
                                                {item.selectedSize} | {item.selectedColor}
                                            </p>
                                            <div className="mt-auto flex justify-between items-center">
                                                <span className="text-sm text-secondary">Qty: {item.quantity}</span>
                                                <span className="font-medium">
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price * item.quantity)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-4 border-t border-border bg-surface-secondary/30">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-secondary">Total</span>
                                    <span className="text-xl font-semibold">
                                        {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(cartTotal)}
                                    </span>
                                </div>
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full btn-primary rounded-lg py-4 flex items-center justify-center gap-2"
                                >
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                        alt="WhatsApp"
                                        className="w-6 h-6"
                                    />
                                    Checkout via WhatsApp
                                </a>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
