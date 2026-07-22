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
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ShippingPage = lazy(() => import('./pages/ShippingPage'));
const ReturnsPage = lazy(() => import('./pages/ReturnsPage'));
const SizeGuidePage = lazy(() => import('./pages/SizeGuidePage'));
const WorldPage = lazy(() => import('./pages/WorldPage'));
const WorldCollectionPage = lazy(() => import('./pages/WorldCollectionPage'));
const WorldDetailPage = lazy(() => import('./pages/WorldDetailPage'));
const ScarvesPage = lazy(() => import('./pages/ScarvesPage'));

// Per-route wrapper: each lazy route gets its own ErrorBoundary + Suspense
const LazyRoute = ({ children }: { children: React.ReactNode }) => (
    <ErrorBoundary>
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-primary">
                <div className="w-12 h-12 border-2 border-accent-gold border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            {children}
        </Suspense>
    </ErrorBoundary>
);

// World Series home replaces the legacy storefront landing page.
const WorldSeriesHome = lazy(() => import('./components/world/WorldSeriesHome'));
import MaintenancePage from './pages/MaintenancePage';

// Floating Components
import WhatsAppButton from './components/floating/WhatsAppButton';
import CartDrawer from './components/shop/CartDrawer';
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

    // World Series is publicly visible; switch to true only for planned maintenance.
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
                                        <Routes>
                                        <Route path="/" element={
                                            <>
                                                <SEOHead
                                                    title="Modest Fashion Elegant & Syar'i"
                                                    description="Koleksi eksklusif DEENHA Hijab. Temukan kemewahan dan keanggunan dalam setiap helai Scarves, Dresses, dan Mukena premium kami."
                                                    jsonLd={organizationJsonLd}
                                                />
                                                <main>
                                                    <LazyRoute><WorldSeriesHome /></LazyRoute>
                                                </main>
                                            </>
                                        } />

                                        <Route path="/world" element={<LazyRoute><WorldPage /></LazyRoute>} />
                                        <Route path="/world/:group" element={<LazyRoute><WorldCollectionPage /></LazyRoute>} />
                                        <Route path="/world/:group/:slug" element={<LazyRoute><WorldDetailPage /></LazyRoute>} />
                                        <Route path="/scarves" element={<LazyRoute><ScarvesPage /></LazyRoute>} />
                                        <Route path="/shop" element={<LazyRoute><ShopPage /></LazyRoute>} />
                                        <Route path="/ramadan" element={<LazyRoute><RamadanPage /></LazyRoute>} />
                                        <Route path="/contact" element={<LazyRoute><ContactPage /></LazyRoute>} />
                                        <Route path="/shipping" element={<LazyRoute><ShippingPage /></LazyRoute>} />
                                        <Route path="/returns" element={<LazyRoute><ReturnsPage /></LazyRoute>} />
                                        <Route path="/size-guide" element={<LazyRoute><SizeGuidePage /></LazyRoute>} />
                                        <Route path="/about" element={<LazyRoute><AboutPage /></LazyRoute>} />
                                        <Route path="/faq" element={<LazyRoute><FAQPage /></LazyRoute>} />
                                        <Route path="/journal" element={<LazyRoute><JournalPage /></LazyRoute>} />
                                        <Route path="/journal/:slug" element={<LazyRoute><JournalDetailsPage /></LazyRoute>} />
                                        <Route path="/product/:id" element={<LazyRoute><ProductDetailsPage /></LazyRoute>} />
                                        <Route path="/wishlist" element={<LazyRoute><WishlistPage /></LazyRoute>} />
                                        <Route path="/login" element={<LazyRoute><LoginPage /></LazyRoute>} />
                                        <Route path="/admin" element={
                                            <ProtectedRoute allowedRoles={['admin', 'employee']}>
                                                <LazyRoute><AdminDashboard /></LazyRoute>
                                            </ProtectedRoute>
                                        } />
                                        <Route path="*" element={<NotFoundPage />} />
                                        </Routes>

                                    <Footer />
                                    <WhatsAppButton />
                                    <CartDrawer />
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
