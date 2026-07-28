import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useTheme } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useTheme();

    const menuItems = [
        { name: 'Scarves', href: '/scarves' },
        { name: t('nav.journal'), href: '/journal' },
        { name: 'Shop', href: '/shop' },
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
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Menu */}
                    <motion.div
                        className="fixed inset-0 bg-white dark:bg-primary z-[80] lg:hidden flex flex-col transition-colors duration-300"
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        {/* Header Actions */}
                        <div className="absolute top-6 left-6 flex items-center space-x-4">
                            <button
                                onClick={toggleTheme}
                                className="p-2 bg-surface-secondary dark:bg-white/5 rounded-full transition-colors text-primary dark:text-white"
                                aria-label="Toggle Theme"
                            >
                                {theme === 'light' ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                )}
                            </button>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 bg-surface-secondary dark:bg-white/5 rounded-full transition-colors text-primary dark:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Logo */}
                        <div className="pt-20 px-8 flex flex-col items-center">
                            <img
                                src="/assets/logo.png"
                                alt="DEENHA"
                                className={`h-20 w-auto transition-all duration-300 ${theme === 'dark' ? 'brightness-0 invert' : 'brightness-0'}`}
                            />
                        </div>

                        {/* Menu Items */}
                        <nav className="flex-1 flex flex-col justify-center px-12 space-y-6">
                            {menuItems.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    variants={itemVariants}
                                    custom={i}
                                >
                                    <Link
                                        to={item.href}
                                        className="text-4xl font-display font-light uppercase tracking-widest text-primary dark:text-white hover:text-accent-gold dark:hover:text-accent-gold transition-colors flex items-center justify-between group"
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
                        <div className="px-12 pb-12 space-y-8">
                            <div className="space-y-4">
                                <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary/60 dark:text-white/40">{t('language.select')}</span>
                                <LanguageSelector isMobileMenu />
                            </div>

                            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t border-black/5 dark:border-white/5">
                                <a
                                    href="https://www.instagram.com/deenha.official/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-bold tracking-[0.3em] text-secondary hover:text-primary dark:text-white/75 dark:hover:text-white transition-colors uppercase"
                                >
                                    Instagram
                                </a>
                                <a
                                    href="https://shopee.co.id/deenha"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-bold tracking-[0.3em] text-secondary hover:text-primary dark:text-white/75 dark:hover:text-white transition-colors uppercase"
                                >
                                    Shopee
                                </a>
                                <a
                                    href="https://www.tokopedia.com/deenha"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-bold tracking-[0.3em] text-secondary hover:text-primary dark:text-white/75 dark:hover:text-white transition-colors uppercase"
                                >
                                    Tokopedia
                                </a>
                            </div>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-secondary dark:text-white/40 opacity-50">
                                {t('footer.rights')}
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
