import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useCart } from '../../context/CartContext';

const WhatsAppButton = () => {
    const [showTooltip, setShowTooltip] = useState(false);
    const { cartItems, cartTotal } = useCart();

    const phoneNumber = '6281919234222';

    const generateMessage = () => {
        if (cartItems.length === 0) {
            return encodeURIComponent('Halo Deenha! Saya tertarik dengan produk Anda.');
        }

        let message = 'Halo Deenha! Saya ingin memesan:\n\n';
        cartItems.forEach(item => {
            message += `- ${item.name} (${item.selectedSize}, ${item.selectedColor}) x${item.quantity}\n`;
        });

        message += `\nTotal: Rp ${cartTotal.toLocaleString('id-ID')}`;
        return encodeURIComponent(message);
    };

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${generateMessage()}`;

    return (
        <div className="fixed bottom-6 right-6 z-40">
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        className="absolute bottom-full right-0 mb-3 px-4 py-2 bg-white rounded-lg shadow-hover text-sm font-medium whitespace-nowrap"
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    >
                        {cartItems.length > 0 ? 'Checkout via WhatsApp' : 'Chat with us! 💬'}
                        <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-3 h-3 bg-white" />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-btn flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-hover relative"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                    className="w-8 h-8"
                />
                {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold border-2 border-white">
                        {cartItems.length}
                    </span>
                )}
            </motion.a>
        </div>
    );
};

export default WhatsAppButton;
