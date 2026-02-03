import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';

// Layout Components
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import MobileMenu from './components/layout/MobileMenu';
import Footer from './components/layout/Footer';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Page Components
import AboutPage from './pages/AboutPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ShopPage from './pages/ShopPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';

// Home Components
import Hero from './components/home/Hero';
import Categories from './components/home/Categories';
import FeaturedProducts from './components/home/FeaturedProducts';
import Benefits from './components/home/Benefits';
import InstagramFeed from './components/home/InstagramFeed';

// Floating Components
import WhatsAppButton from './components/floating/WhatsAppButton';
import CartDrawer from './components/shop/CartDrawer';

function App() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <Router>
            <AuthProvider>
                <WishlistProvider>
                    <CartProvider>
                        <div className="min-h-screen bg-white">
                            <AnnouncementBar />
                            <Navbar onMenuClick={() => setMobileMenuOpen(true)} />
                            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

                            <Routes>
                                {/* Landing Page Route */}
                                <Route path="/" element={
                                    <main>
                                        <Hero />
                                        <Benefits />
                                        <div id="collections" className="scroll-mt-[100px]">
                                            <Categories />
                                        </div>
                                        <div id="featured" className="scroll-mt-[100px]">
                                            <FeaturedProducts />
                                        </div>
                                        <InstagramFeed />
                                    </main>
                                } />

                                {/* Shop Page Route */}
                                <Route path="/shop" element={<ShopPage />} />

                                {/* About Page Route */}
                                <Route path="/about" element={<AboutPage />} />

                                {/* Product Details Route */}
                                <Route path="/product/:id" element={<ProductDetailsPage />} />

                                {/* Wishlist Route */}
                                <Route path="/wishlist" element={<WishlistPage />} />

                                {/* Auth Routes */}
                                <Route path="/login" element={<LoginPage />} />

                                {/* Admin Routes - Protected */}
                                <Route path="/admin" element={
                                    <ProtectedRoute allowedRoles={['admin', 'employee']}>
                                        <AdminDashboard />
                                    </ProtectedRoute>
                                } />
                            </Routes>

                            <Footer />
                            <WhatsAppButton />
                            <CartDrawer />
                        </div>
                    </CartProvider>
                </WishlistProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
