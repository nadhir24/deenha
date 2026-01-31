import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';

interface NavbarProps {
    onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { wishlistCount } = useWishlist();
    const { cartCount, setIsCartOpen } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();

    // Check if we are on the Home page
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'The Atelier', href: '/shop' },
        { name: 'About', href: '/about' }
    ];

    // Navbar should be solid if not on home page or if scrolled
    const isSolid = !isHome || scrolled;

    return (
        <header
            className={`fixed left-0 right-0 z-[60] transition-all duration-500 ${scrolled
                ? 'bg-white shadow-sm py-2 top-0'
                : `top-[36px] ${isHome ? 'bg-transparent py-8' : 'bg-white py-4 shadow-sm'}`
                }`}
        >
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-3 items-center">

                    {/* Left: Menu Links (Desktop) */}
                    <div className="hidden lg:flex items-center space-x-10">
                        {navLinks.slice(0, 2).map((link) => (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 ${isSolid ? 'text-black hover:text-accent-gold' : 'text-white hover:text-accent-gold'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={onMenuClick}
                            className={`p-2 ${isSolid ? 'text-black' : 'text-white'}`}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Center: Brand Identity */}
                    <div className="flex justify-center">
                        <Link to="/" className="group">
                            <img
                                src="/assets/logo.png"
                                alt="DEENHA"
                                className={`h-12 md:h-16 w-auto transition-all duration-700 ${isSolid ? 'brightness-0' : 'brightness-0 invert'
                                    }`}
                            />
                        </Link>
                    </div>

                    {/* Right: Actions & Links */}
                    <div className="flex items-center justify-end space-x-4 md:space-x-8">
                        {/* More Links on Desktop */}
                        <div className="hidden lg:flex items-center space-x-10 mr-4">
                            {navLinks.slice(2).map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={`text-[11px] font-bold uppercase tracking-[0.3em] transition-colors duration-300 ${isSolid ? 'text-black hover:text-accent-gold' : 'text-white hover:text-accent-gold'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Search Icon */}
                        <button
                            onClick={() => setSearchOpen(!searchOpen)}
                            className={`p-2 transition-colors duration-300 ${isSolid ? 'text-black' : 'text-white'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>

                        {/* Wishlist */}
                        <Link
                            to="/wishlist"
                            className={`relative p-2 transition-colors duration-300 ${isSolid ? 'text-black' : 'text-white'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {wishlistCount > 0 && (
                                <span className="absolute top-1 right-1 w-3 h-3 bg-accent-gold rounded-full" />
                            )}
                        </Link>

                        {/* Cart */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className={`relative p-2 transition-colors duration-300 ${isSolid ? 'text-black' : 'text-white'}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent-gold text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Search Bar Overlay */}
                <AnimatePresence>
                    {searchOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-white z-[70] pt-32 overflow-y-auto"
                        >
                            <div className="max-w-5xl mx-auto px-6 lg:px-12">
                                <div className="relative mb-12">
                                    <input
                                        type="text"
                                        placeholder="SEARCH THE ATELIER..."
                                        className="w-full text-4xl md:text-6xl font-display italic border-b border-black/10 py-6 focus:outline-none focus:border-accent-gold transition-colors bg-transparent"
                                        autoFocus
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button
                                        onClick={() => {
                                            setSearchOpen(false);
                                            setSearchQuery('');
                                        }}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 p-4 text-secondary hover:text-primary transition-colors"
                                    >
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Search Results */}
                                {searchQuery.length > 2 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="pb-20"
                                    >
                                        <div className="flex items-center justify-between mb-8 border-b border-black/5 pb-4">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">
                                                Matching Products ({products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length})
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                                            {products
                                                .filter(p =>
                                                    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                    p.category.toLowerCase().includes(searchQuery.toLowerCase())
                                                )
                                                .map((product) => (
                                                    <Link
                                                        key={product.id}
                                                        to="/shop"
                                                        onClick={() => {
                                                            setSearchOpen(false);
                                                            setSearchQuery('');
                                                        }}
                                                        className="group"
                                                    >
                                                        <div className="relative aspect-[3/4] overflow-hidden bg-surface-secondary mb-4">
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                            />
                                                            {product.badge && (
                                                                <div className="absolute top-4 left-4">
                                                                    <span className="bg-white px-3 py-1 text-[8px] font-bold uppercase tracking-widest shadow-sm">
                                                                        {product.badge}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <h3 className="text-[10px] font-bold uppercase tracking-widest mb-1 group-hover:text-accent-gold transition-colors">
                                                            {product.name}
                                                        </h3>
                                                        <p className="text-[10px] text-secondary font-medium tracking-widest">
                                                            IDR {product.price.toLocaleString()}
                                                        </p>
                                                    </Link>
                                                ))}
                                        </div>

                                        {products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                                            <div className="text-center py-20">
                                                <p className="font-display text-2xl italic text-secondary">No products found for "{searchQuery}"</p>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {searchQuery.length <= 2 && searchQuery.length > 0 && (
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-secondary italic">Type at least 3 characters to search...</p>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Navbar;
