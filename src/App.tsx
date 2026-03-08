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
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Page Components
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import JournalPage from './pages/JournalPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ShopPage from './pages/ShopPage';
import WishlistPage from './pages/WishlistPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import RamadanPage from './pages/RamadanPage';

// Home Components
import Hero from './components/home/Hero';
import Benefits from './components/home/Benefits';
import InstagramFeed from './components/home/InstagramFeed';
import HomeCollections from './components/home/HomeCollections';

// Floating Components
import WhatsAppButton from './components/floating/WhatsAppButton';
import CartDrawer from './components/shop/CartDrawer';
import PromoPopup from './components/common/PromoPopup';
import RamadanPopup from './components/common/RamadanPopup';
import SEOHead from './components/SEOHead';

function App() {
    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "DEENHA",
        "url": "https://www.deenha.com",
        "logo": "https://www.deenha.com/assets/logo.png",
        "sameAs": [
            "https://www.instagram.com/deenha.official/",
            "https://www.tiktok.com/@deenha.id",
            "https://shopee.co.id/deenha",
            "https://www.tokopedia.com/deenha"
        ],
        "description": "Brand fashion muslimah premium dari Bandung yang mengedepankan keanggunan dan syariat.",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Komplek Adi Bumi Graha",
            "addressLocality": "Bandung",
            "postalCode": "40292",
            "addressCountry": "ID"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+6281919234222",
            "contactType": "customer service"
        }
    };

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <Router>
            <AuthProvider>
                <NotificationProvider>
                    <WishlistProvider>
                        <CartProvider>
                            <div className="min-h-screen bg-white">
                                <AnnouncementBar />
                                <Navbar onMenuClick={() => setMobileMenuOpen(true)} />
                                <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

                                <Routes>
                                    {/* Landing Page Route */}
                                    <Route path="/" element={
                                        <>
                                            <SEOHead
                                                title="Modest Fashion Elegant & Syar'i"
                                                description="Koleksi eksklusif DEENHA Hijab. Temukan kemewahan dan keanggunan dalam setiap helai Scarves, Dresses, dan Mukena premium kami."
                                                jsonLd={organizationJsonLd}
                                            />
                                            <main>
                                                <Hero />
                                                <Benefits />
                                                <HomeCollections />
                                                <InstagramFeed />
                                            </main>
                                        </>
                                    } />

                                    {/* Shop Page Route */}
                                    <Route path="/shop" element={<ShopPage />} />

                                    {/* Ramadan Collection Route */}
                                    <Route path="/ramadan" element={<RamadanPage />} />

                                    {/* About Page Route */}
                                    <Route path="/about" element={<AboutPage />} />

                                    {/* FAQ Page Route */}
                                    <Route path="/faq" element={<FAQPage />} />

                                    {/* Journal Page Route */}
                                    <Route path="/journal" element={<JournalPage />} />

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
                                <RamadanPopup />
                                <PromoPopup />
                            </div>
                        </CartProvider>
                    </WishlistProvider>
                </NotificationProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
