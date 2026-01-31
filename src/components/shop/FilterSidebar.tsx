import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../../data/products';

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
    const [openSections, setOpenSections] = useState<string[]>(['Category', 'Size', 'Color', 'Price']);

    const categories = ['Scarves', 'Dresses', 'Bergo', 'Pray Set'];
    const sizes = ['S', 'M', 'L', 'XL', 'All Size'];

    const toggleSection = (section: string) => {
        setOpenSections(prev =>
            prev.includes(section)
                ? prev.filter(s => s !== section)
                : [...prev, section]
        );
    };

    const handleCategoryChange = (category: string) => {
        const newCategories = filters.categories.includes(category)
            ? filters.categories.filter(c => c !== category)
            : [...filters.categories, category];
        onFilterChange({ ...filters, categories: newCategories });
    };

    const handleSizeChange = (size: string) => {
        const newSizes = filters.sizes.includes(size)
            ? filters.sizes.filter(s => s !== size)
            : [...filters.sizes, size];
        onFilterChange({ ...filters, sizes: newSizes });
    };

    const handleColorChange = (color: string) => {
        const newColors = filters.colors.includes(color)
            ? filters.colors.filter(c => c !== color)
            : [...filters.colors, color];
        onFilterChange({ ...filters, colors: newColors });
    };

    const handlePriceChange = (value: number, index: 0 | 1) => {
        const newRange: [number, number] = [...filters.priceRange] as [number, number];
        newRange[index] = value;
        onFilterChange({ ...filters, priceRange: newRange });
    };

    const clearFilters = () => {
        onFilterChange({
            categories: [],
            sizes: [],
            colors: [],
            priceRange: [0, 1000000],
        });
    };

    const formatPrice = (price: number) => {
        if (price >= 1000000) {
            return `${(price / 1000000).toFixed(1)}M`;
        }
        return `${(price / 1000).toFixed(0)}K`;
    };

    // Local state for smooth slider interaction
    const [localPrice, setLocalPrice] = useState<number>(filters.priceRange[1]);

    // Update local price when external filters change (e.g. Reset)
    useEffect(() => {
        setLocalPrice(filters.priceRange[1]);
    }, [filters.priceRange]);

    // Smoothly update parent state after a short delay
    useEffect(() => {
        const timer = setTimeout(() => {
            if (localPrice !== filters.priceRange[1]) {
                onFilterChange({ ...filters, priceRange: [filters.priceRange[0], localPrice] });
            }
        }, 50); // Very short debounce for responsiveness
        return () => clearTimeout(timer);
    }, [localPrice]);

    const AccordionSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
        const isOpen = openSections.includes(title);

        return (
            <div className="border-b border-border py-4">
                <button
                    type="button"
                    className="w-full flex items-center justify-between text-left font-medium group"
                    onClick={() => toggleSection(title)}
                >
                    <span className="text-[11px] uppercase tracking-[0.2em] font-bold group-hover:text-accent-gold transition-colors">{title}</span>
                    <motion.svg
                        className="w-4 h-4 text-secondary"
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
        <aside className="w-full lg:w-64 shrink-0 sticky top-44 h-fit bg-white lg:pr-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl">Refine By</h2>
                <button
                    type="button"
                    onClick={clearFilters}
                    className="text-[10px] uppercase tracking-widest font-bold text-secondary hover:text-accent-gold transition-colors underline underline-offset-4"
                >
                    Reset
                </button>
            </div>

            <div className="border-t border-border">
                {/* Category Filter */}
                <AccordionSection title="Category">
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
                                        onChange={() => handleCategoryChange(category)}
                                        className="sr-only"
                                    />
                                    <div className={`w-4 h-4 rounded-none border transition-all duration-300 ${filters.categories.includes(category)
                                        ? 'bg-primary border-primary'
                                        : 'border-border group-hover:border-accent-gold'
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
                                <span className={`text-[11px] uppercase tracking-widest transition-colors ${filters.categories.includes(category) ? 'font-bold text-primary' : 'text-secondary group-hover:text-primary'}`}>
                                    {category}
                                </span>
                            </label>
                        ))}
                    </div>
                </AccordionSection>

                {/* Size Filter */}
                <AccordionSection title="Size">
                    <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                            <button
                                type="button"
                                key={size}
                                onClick={() => handleSizeChange(size)}
                                className={`h-10 px-4 text-[10px] items-center justify-center flex font-bold tracking-widest transition-all duration-300 ${filters.sizes.includes(size)
                                    ? 'bg-primary text-white'
                                    : 'bg-surface-secondary text-secondary hover:bg-border'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </AccordionSection>

                {/* Color Filter */}
                <AccordionSection title="Color">
                    <div className="grid grid-cols-5 gap-3">
                        {colors.map((color) => (
                            <button
                                type="button"
                                key={color.name}
                                onClick={() => handleColorChange(color.name)}
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
                <AccordionSection title="Price">
                    <div className="space-y-6">
                        <div className="flex items-center justify-between text-[10px] font-bold tracking-widest text-secondary">
                            <span>IDR {filters.priceRange[0].toLocaleString()}</span>
                            <span>IDR {localPrice.toLocaleString()}</span>
                        </div>
                        <div className="px-2">
                            <input
                                type="range"
                                min={0}
                                max={1000000}
                                step={10000}
                                value={localPrice}
                                onChange={(e) => setLocalPrice(Number(e.target.value))}
                                className="w-full accent-primary h-1 bg-surface-secondary cursor-pointer"
                            />
                        </div>
                    </div>
                </AccordionSection>
            </div>
        </aside>
    );
};

export default FilterSidebar;
