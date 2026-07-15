import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { useCart } from '../../hooks/useAppCart';
import { useFormatPrice } from '../../hooks/useFormatPrice';

const WHATSAPP_PHONE = import.meta.env.VITE_WHATSAPP_PHONE || '6281919234222';

const WhatsAppButton = () => {
    const { t } = useTranslation();
    const formatPrice = useFormatPrice();
    const [showTooltip, setShowTooltip] = useState(false);
    const { cartItems, cartTotal } = useCart();

    const generateMessage = () => {
        if (cartItems.length === 0) {
            return encodeURIComponent(t('whatsapp.greeting'));
        }

        let message = `${t('whatsapp.order_prefix')}\n\n`;
        cartItems.forEach(item => {
            message += `- ${item.name} (${item.selectedSize}, ${item.selectedColor}) x${item.quantity}\n`;
        });

        message += `\n${t('whatsapp.total')}: ${formatPrice(cartTotal)}`;
        return encodeURIComponent(message);
    };

    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${generateMessage()}`;

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
                        {cartItems.length > 0 ? t('cart.checkout_wa') : t('benefits.premium_service_desc')}
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
