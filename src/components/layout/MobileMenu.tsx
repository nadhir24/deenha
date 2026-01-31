import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const menuItems = [
        { name: 'Home', href: '/' },
        { name: 'The Atelier', href: '/shop' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' }
    ];

    const menuVariants = {
        closed: {
            clipPath: 'circle(0% at calc(100% - 40px) 40px)',
            transition: { duration: 0.5, ease: 'easeInOut' }
        },
        open: {
            clipPath: 'circle(150% at calc(100% - 40px) 40px)',
            transition: { duration: 0.5, ease: 'easeInOut' }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, x: 50 },
        open: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { delay: 0.3 + i * 0.1, duration: 0.3 }
        })
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black/20 z-[70] lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Menu */}
                    <motion.div
                        className="fixed inset-0 bg-white z-[80] lg:hidden flex flex-col"
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 hover:bg-surface-secondary rounded-full transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Logo */}
                        <div className="pt-16 px-8 flex flex-col items-center">
                            <img src="/assets/logo.png" alt="DEENHA" className="h-20 w-auto brightness-0" />
                        </div>

                        {/* Menu Items */}
                        <nav className="flex-1 flex flex-col justify-center px-12 space-y-8">
                            {menuItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    variants={itemVariants}
                                    custom={i}
                                >
                                    <Link
                                        to={item.href}
                                        className="text-4xl font-display font-light uppercase tracking-widest hover:text-accent-gold transition-colors flex items-center justify-between group"
                                        onClick={onClose}
                                    >
                                        <span>{item.name}</span>
                                        <svg className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Footer */}
                        <div className="px-12 pb-12 space-y-6">
                            <div className="flex flex-wrap gap-x-8 gap-y-4">
                                <a
                                    href="https://www.instagram.com/deenha.official/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-bold tracking-[0.3em] text-secondary hover:text-primary transition-colors uppercase"
                                >
                                    Instagram
                                </a>
                                <a
                                    href="https://shopee.co.id/deenha"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-bold tracking-[0.3em] text-secondary hover:text-primary transition-colors uppercase"
                                >
                                    Shopee
                                </a>
                                <a
                                    href="https://www.tokopedia.com/deenha"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-bold tracking-[0.3em] text-secondary hover:text-primary transition-colors uppercase"
                                >
                                    Tokopedia
                                </a>
                            </div>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-secondary opacity-50">
                                © 2026 DEENHA HIJAB. ALL RIGHTS RESERVED.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
