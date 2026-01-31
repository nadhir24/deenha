import { useEffect } from 'react';
import ShopSection from '../components/home/ShopSection';

const ShopPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="pt-32 pb-20 bg-white">
            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">


                <ShopSection />
            </div>
        </main>
    );
};

export default ShopPage;
