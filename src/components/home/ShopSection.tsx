import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../../data/products';
import FilterSidebar from '../shop/FilterSidebar';
import SortDropdown from '../shop/SortDropdown';
import ProductCard from '../shop/ProductCard';
import QuickViewModal from '../ui/QuickViewModal';
import { useProducts } from '../../hooks/useProducts';

type SortOption = 'newest' | 'price-low' | 'price-high' | 'bestseller';

interface FilterState {
    categories: string[];
    sizes: string[];
    colors: string[];
    priceRange: [number, number];
}

const ShopSection = () => {
    const { products, loading } = useProducts();
    const [searchParams, setSearchParams] = useSearchParams();

    // Initialize state from URL only once
    const [filters, setFilters] = useState<FilterState>(() => {
        const category = searchParams.get('category');
        return {
            categories: category ? [category] : [],
            sizes: [],
            colors: [],
            priceRange: [0, 1000000],
        };
    });

    const [sortBy, setSortBy] = useState<SortOption>('newest');
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Filter and sort products (Memoized)
    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (filters.categories.length > 0) {
            result = result.filter(p => filters.categories.includes(p.category));
        }
        if (filters.sizes.length > 0) {
            result = result.filter(p => p.size.some(s => filters.sizes.includes(s)));
        }
        if (filters.colors.length > 0) {
            result = result.filter(p => filters.colors.includes(p.color));
        }
        result = result.filter(
            p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
        );

        switch (sortBy) {
            case 'price-low': result.sort((a, b) => a.price - b.price); break;
            case 'price-high': result.sort((a, b) => b.price - a.price); break;
            case 'bestseller': result.sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0)); break;
            case 'newest':
            default: result.sort((a, b) => (a.badge === 'new' ? -1 : b.badge === 'new' ? 1 : 0)); break;
        }

        return result;
    }, [filters, sortBy, products]);

    // Update URL sync with debounce - prevents layout/interaction 'jumping'
    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams();
            if (filters.categories.length === 1) {
                params.set('category', filters.categories[0]);
            }
            // Only update if it actually changed to avoid recursive updates
            if (params.toString() !== searchParams.toString()) {
                setSearchParams(params, { replace: true });
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [filters.categories]);

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    const activeFilterCount =
        filters.categories.length +
        filters.sizes.length +
        filters.colors.length +
        (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000 ? 1 : 0);

    if (loading && products.length === 0) {
        return (
            <section className="py-20 bg-white min-h-[400px] flex items-center justify-center">
                <p className="text-secondary animate-pulse">Loading products collection...</p>
            </section>
        );
    }

    return (
        <section className="py-20 bg-white" id="all-products">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">
                        Our Entire Collection
                    </span>
                    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight">
                        Explore All Products
                    </h2>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Mobile Filter Toggle */}
                    <div className="lg:hidden flex items-center justify-between mb-4">
                        <button
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filters
                            {activeFilterCount > 0 && (
                                <span className="bg-accent-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>
                        <SortDropdown value={sortBy} onChange={setSortBy} />
                    </div>

                    {/* Mobile Filters Panel */}
                    {showMobileFilters && (
                        <motion.div
                            className="lg:hidden bg-white p-4 rounded-xl border border-border mb-4"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                        >
                            <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
                        </motion.div>
                    )}

                    {/* Desktop Sidebar */}
                    <div className="hidden lg:block">
                        <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1 min-h-[600px]">
                        {/* Top Bar */}
                        <div className="hidden lg:flex items-center justify-between mb-6">
                            <p className="text-secondary text-sm">
                                Showing <span className="font-medium text-primary">{filteredProducts.length}</span> products
                            </p>
                            <SortDropdown value={sortBy} onChange={setSortBy} />
                        </div>

                        {/* Grid with Layout Animations */}
                        {filteredProducts.length > 0 ? (
                            <motion.div
                                layout
                                className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredProducts.map((product) => (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ProductCard
                                                product={product}
                                                onQuickView={setQuickViewProduct}
                                            />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <div className="text-center py-20 bg-surface-secondary/30 rounded-2xl">
                                <div className="text-6xl mb-4">🔍</div>
                                <h3 className="font-display text-xl mb-2">No products found</h3>
                                <p className="text-secondary mb-4">Try adjusting your filters</p>
                                <button
                                    onClick={() => handleFilterChange({
                                        categories: [],
                                        sizes: [],
                                        colors: [],
                                        priceRange: [0, 1000000],
                                    })}
                                    className="text-accent-gold hover:underline font-bold tracking-widest text-[10px] uppercase"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Quick View Modal */}
            <QuickViewModal
                product={quickViewProduct}
                isOpen={!!quickViewProduct}
                onClose={() => setQuickViewProduct(null)}
            />
        </section>
    );
};

export default ShopSection;
