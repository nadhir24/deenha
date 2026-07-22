import { useEffect } from 'react';
import ShopSection from '../components/home/ShopSection';
import SEOHead from '../components/SEOHead';

const ScarvesPage = () => {
    useEffect(() => window.scrollTo(0, 0), []);

    return (
        <main className="bg-world-paper pb-20 pt-32 text-world-ink">
            <SEOHead
                title="Scarves Collection"
                description="Explore DEENHA scarves through heritage textile worlds, new series, and contemporary styling."
                canonicalPath="/scarves"
            />
            <div className="mx-auto max-w-[1440px] px-5 md:px-12">
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-world-gold">The open collection</p>
                <h1 className="mt-5 font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.86] tracking-[-0.05em]">Scarves</h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-world-muted">Printed stories designed for contemporary modest dressing.</p>
            </div>
            <ShopSection initialCategory="Scarves" hideHeader />
        </main>
    );
};

export default ScarvesPage;
