import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'bestseller';

interface SortDropdownProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}

const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const options: { value: SortOption; label: string }[] = [
        { value: 'newest', label: t('shop.sort.newest') },
        { value: 'price-low', label: t('shop.sort.price_low') },
        { value: 'price-high', label: t('shop.sort.price_high') },
        { value: 'bestseller', label: t('shop.sort.bestseller') },
    ];

    const currentLabel = options.find(opt => opt.value === value)?.label || t('shop.sort.label');

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <motion.button
                className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:border-accent-gold transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                whileTap={{ scale: 0.98 }}
            >
                <span className="text-sm font-medium">{currentLabel}</span>
                <motion.svg
                    className="w-4 h-4 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </motion.svg>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-hover border border-border overflow-hidden z-20"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {options.map((option) => (
                            <button
                                key={option.value}
                                className={`w-full px-4 py-3 text-sm text-left hover:bg-surface-secondary transition-colors ${value === option.value ? 'bg-surface-accent text-accent-gold font-medium' : ''
                                    }`}
                                onClick={() => {
                                    onChange(option.value);
                                    setIsOpen(false);
                                }}
                            >
                                {option.label}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SortDropdown;
