import { useEffect } from 'react';
import ShopSection from '../components/home/ShopSection';
import SEOHead from '../components/SEOHead';

const ShopPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="pt-32 pb-20 bg-white">
            <SEOHead
                title="Koleksi Produk - DEENHA"
                description="Jelajahi koleksi lengkap DEENHA: Scarves, Dresses, Bergo, Pray Set, dan Hampers. Kualitas premium dengan desain yang elegan dan syar'i."
                canonicalPath="/shop"
            />
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">


                <ShopSection />
            </div>
        </main>
    );
};

export default ShopPage;
