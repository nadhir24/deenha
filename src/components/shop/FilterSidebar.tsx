import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../../data/products';
import { formatPrice } from '../../lib/currency';
import { useTranslation } from 'react-i18next';

interface FilterState {
    categories: string[];
    sizes: string[];
    colors: string[];
    priceRange: [number, number];
}

interface FilterSidebarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}

const FilterSidebar = ({ filters, onFilterChange }: FilterSidebarProps) => {
    const { t } = useTranslation();
    const [openSections, setOpenSections] = useState<string[]>([
        t('shop.categories'),
        t('shop.sizes'),
        t('shop.colors'),
        t('shop.price')
    ]);

    const categories = ['Scarves', 'Dresses', 'Bergo', 'Pray Set', 'Hampers'];
    const sizes = ['S', 'M', 'L', 'XL', 'All Size'];

    const toggleSection = (section: string) => {
        setOpenSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const clearFilters = () => {
        onFilterChange({
            categories: [],
            sizes: [],
            colors: [],
            priceRange: [0, 2000000],
        });
    };

    const [localPrice, setLocalPrice] = useState<number>(filters.priceRange[1]);

    useEffect(() => {
        setLocalPrice(filters.priceRange[1]);
    }, [filters.priceRange]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (localPrice !== filters.priceRange[1]) {
                onFilterChange({ ...filters, priceRange: [filters.priceRange[0], localPrice] });
            }
        }, 50);
        return () => clearTimeout(timer);
    }, [localPrice]);

    const AccordionSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
        const isOpen = openSections.includes(title);

        return (
            <div className="border-b border-border dark:border-white/10 py-4">
                <button
                    type="button"
                    className="w-full flex items-center justify-between text-left font-medium group"
                    onClick={() => toggleSection(title)}
                >
                    <span className="text-[11px] uppercase tracking-[0.2em] font-bold group-hover:text-accent-gold transition-colors text-primary dark:text-white">{title}</span>
                    <motion.svg
                        className="w-4 h-4 text-secondary dark:text-white/40"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                </button>
                <AnimatePresence initial={false}>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="pt-6 pb-2">
                                {children}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    };

    return (
        <aside className="w-full lg:w-64 shrink-0 lg:sticky lg:top-44 h-fit bg-white dark:bg-primary lg:pr-8 transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl text-primary dark:text-white">{t('shop.filter')}</h2>
                <button
                    type="button"
                    onClick={clearFilters}
                    className="text-[10px] uppercase tracking-widest font-bold text-secondary dark:text-white/40 hover:text-accent-gold transition-colors underline underline-offset-4"
                >
                    {t('shop.reset')}
                </button>
            </div>

            <div className="border-t border-border dark:border-white/10">
                {/* Category Filter */}
                <AccordionSection title={t('shop.categories')}>
                    <div className="space-y-4">
                        {categories.map((category) => (
                            <label
                                key={category}
                                className="flex items-center gap-4 cursor-pointer group"
                            >
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={filters.categories.includes(category)}
                                        onChange={() => {
                                            const newCategories = filters.categories.includes(category)
                                                ? filters.categories.filter(c => c !== category)
                                                : [...filters.categories, category];
                                            onFilterChange({ ...filters, categories: newCategories });
                                        }}
                                        className="sr-only"
                                    />
                                    <div className={`w-4 h-4 rounded-none border transition-all duration-300 ${filters.categories.includes(category)
                                        ? 'bg-primary border-primary'
                                        : 'border-border dark:border-white/10 group-hover:border-accent-gold'
                                        }`}>
                                        {filters.categories.includes(category) && (
                                            <motion.svg
                                                className="w-full h-full text-white p-0.5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </motion.svg>
                                        )}
                                    </div>
                                </div>
                                <span className={`text-[11px] uppercase tracking-widest transition-colors ${filters.categories.includes(category) ? 'font-bold text-primary dark:text-white' : 'text-secondary dark:text-white/40 group-hover:text-primary dark:group-hover:text-white'}`}>
                                    {category}
                                </span>
                            </label>
                        ))}
                    </div>
                </AccordionSection>

                {/* Size Filter */}
                <AccordionSection title={t('shop.sizes')}>
                    <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                            <button
                                type="button"
                                key={size}
                                onClick={() => {
                                    const newSizes = filters.sizes.includes(size)
                                        ? filters.sizes.filter(s => s !== size)
                                        : [...filters.sizes, size];
                                    onFilterChange({ ...filters, sizes: newSizes });
                                }}
                                className={`h-10 px-4 text-[10px] items-center justify-center flex font-bold tracking-widest transition-all duration-300 ${filters.sizes.includes(size)
                                    ? 'bg-primary text-white'
                                    : 'bg-surface-secondary dark:bg-white/5 text-secondary dark:text-white/40 hover:bg-border dark:hover:bg-white/10'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </AccordionSection>

                {/* Color Filter */}
                <AccordionSection title={t('shop.colors')}>
                    <div className="grid grid-cols-5 gap-3">
                        {colors.map((color) => (
                            <button
                                type="button"
                                key={color.name}
                                onClick={() => {
                                    const newColors = filters.colors.includes(color.name)
                                        ? filters.colors.filter(c => c !== color.name)
                                        : [...filters.colors, color.name];
                                    onFilterChange({ ...filters, colors: newColors });
                                }}
                                className={`w-full aspect-square relative group ${filters.colors.includes(color.name) ? 'ring-1 ring-primary ring-offset-2' : ''}`}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            >
                                {filters.colors.includes(color.name) && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className={`w-1 h-1 rounded-full ${['White', 'Cream', 'Bone'].includes(color.name) ? 'bg-black' : 'bg-white'}`} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </AccordionSection>

                {/* Price Filter */}
                <AccordionSection title={t('shop.price')}>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-secondary dark:text-white/40 notranslate">
                            <span>{formatPrice(filters.priceRange[0])}</span>
                            <span>{formatPrice(localPrice)}</span>
                        </div>
                        <div className="px-2">
                            <input
                                type="range"
                                min={0}
                                max={2000000}
                                step={50000}
                                value={localPrice}
                                onChange={(e) => setLocalPrice(Number(e.target.value))}
                                className="w-full accent-primary h-1 bg-surface-secondary dark:bg-white/10 cursor-pointer"
                            />
                        </div>
                    </div>
                </AccordionSection>
            </div>
        </aside>
    );
};

export default FilterSidebar;
