import { useState, lazy, Suspense } from 'react';
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
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/common/ErrorBoundary';

// Page Components - Lazy Loaded
const AboutPage = lazy(() => import('./pages/AboutPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const JournalPage = lazy(() => import('./pages/JournalPage'));
const JournalDetailsPage = lazy(() => import('./pages/JournalDetailsPage'));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const RamadanPage = lazy(() => import('./pages/RamadanPage'));

// Home Components
import Hero from './components/home/Hero';
import Benefits from './components/home/Benefits';
const InstagramFeed = lazy(() => import('./components/home/InstagramFeed'));
const HomeCollections = lazy(() => import('./components/home/HomeCollections'));
import MaintenancePage from './pages/MaintenancePage';

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

    // Toggle this to true to enable Maintenance Mode
    const isMaintenanceMode = false;
    const bypassMode = new URLSearchParams(window.location.search).get('bypass') === 'true';

    if (isMaintenanceMode && !bypassMode) {
        return (
            <ThemeProvider>
                <div className="min-h-screen bg-white dark:bg-primary transition-colors duration-300">
                    <MaintenancePage />
                </div>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider>
            <Router>
                <AuthProvider>
                    <NotificationProvider>
                        <WishlistProvider>
                            <CartProvider>
                                <div className="min-h-screen bg-white dark:bg-primary transition-colors duration-300">
                                    <AnnouncementBar />
                                    <Navbar onMenuClick={() => setMobileMenuOpen(true)} />
                                    <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

                                    <ScrollToTop />
                                    <ErrorBoundary>
                                        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white dark:bg-primary"><div className="w-12 h-12 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" /></div>}>
                                            <Routes>
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

                                            <Route path="/shop" element={<ShopPage />} />
                                            <Route path="/ramadan" element={<RamadanPage />} />
                                            <Route path="/about" element={<AboutPage />} />
                                            <Route path="/faq" element={<FAQPage />} />
                                            <Route path="/journal" element={<JournalPage />} />
                                            <Route path="/journal/:slug" element={<JournalDetailsPage />} />
                                            <Route path="/product/:id" element={<ProductDetailsPage />} />
                                            <Route path="/wishlist" element={<WishlistPage />} />
                                            <Route path="/login" element={<LoginPage />} />
                                            <Route path="/admin" element={
                                                <ProtectedRoute allowedRoles={['admin', 'employee']}>
                                                    <AdminDashboard />
                                                </ProtectedRoute>
                                            } />
                                            <Route path="*" element={<NotFoundPage />} />
                                            </Routes>
                                        </Suspense>
                                    </ErrorBoundary>

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
        </ThemeProvider>
    );
}

export default App;
