import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import ShopSection from '../components/home/ShopSection';

/** Customer-facing shop rooms. Product DB still uses legacy categories under the hood. */
const rooms = [
    {
        name: 'Scarves',
        href: '/scarves',
        status: 'open' as const,
        blurb: 'Wastra & printed stories for everyday modest dressing.',
        image: '/images/Warisan%20Nusantara-20260211T044846Z-1-001/Warisan%20Nusantara/Songket%20Scarves%20Series/IMG_6376.jpg',
    },
    {
        name: 'Dailywear',
        href: '/shop?category=Dresses',
        status: 'open' as const,
        blurb: 'Dress and daily pieces — light structure, easy movement.',
        image: '/images/dress-YD0l6pXPkZSqM41l.png',
    },
    {
        name: 'Instan Hijab',
        href: '/shop?category=Bergo',
        status: 'open' as const,
        blurb: 'Ready-to-wear hijab silhouettes for fast mornings.',
        image: '/images/bergo-A1aPwKX8JgfWab9g.png',
    },
    {
        name: 'Pashmina',
        href: '/scarves',
        status: 'open' as const,
        blurb: 'Long drape and soft volume — shop inside Scarves for now.',
        image: '/images/image-1-m5KMww5a1eHrGa7j.jpg',
    },
    {
        name: 'Prayset',
        href: '/shop?category=Pray%20Set',
        status: 'open' as const,
        blurb: 'Prayer sets designed with the same quiet elegance.',
        image: '/images/prayset-mnlWv3KxDvf1NbQn.png',
    },
    {
        name: 'Prive Deenha',
        href: '#prive',
        status: 'soon' as const,
        blurb: 'Limited drops and private releases — coming soon.',
        image: '/images/hampers-1-dWxvylrBJ6IBxzqB.jpg',
    },
];

const ShopPage = () => {
    const [searchParams] = useSearchParams();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.deenha.com' },
            { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://www.deenha.com/shop' },
        ],
    };

    const hasCategory = Boolean(searchParams.get('category') || searchParams.get('badge') || searchParams.get('ids'));

    return (
        <main className="bg-world-paper pb-24 pt-32 text-world-ink transition-colors duration-300 dark:bg-primary dark:text-white">
            <SEOHead
                title="Shop - DEENHA"
                description="Dailywear, Instan Hijab, Scarves, Pashmina, Prayset, and Prive Deenha. Heritage you can wear."
                canonicalPath="/shop"
                jsonLd={breadcrumbJsonLd}
            />

            <div className="mx-auto max-w-[1440px] px-5 md:px-12">
                <p className="text-[0.6875rem] uppercase tracking-[0.16em] text-world-gold">The wardrobe</p>
                <h1 className="mt-5 max-w-3xl font-display text-[clamp(3rem,8vw,7rem)] leading-[0.86] tracking-[-0.05em]">
                    Shop DEENHA
                </h1>
                <p className="mt-6 max-w-xl text-base leading-7 text-world-muted dark:text-white/65">
                    Enam pintu. Scarves paling lengkap; Prive masih limited — coming soon.
                </p>

                <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {rooms.map((room) => {
                        const inner = (
                            <>
                                <div className="absolute inset-0 bg-world-ink">
                                    {room.image && (
                                        <img
                                            src={room.image}
                                            alt=""
                                            className={`h-full w-full object-cover transition duration-700 ${
                                                room.status === 'soon'
                                                    ? 'opacity-30 grayscale'
                                                    : 'opacity-55 group-hover:scale-105 group-hover:opacity-70'
                                            }`}
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-world-ink via-world-ink/40 to-transparent" />
                                </div>
                                <div className="relative flex h-full min-h-[16rem] flex-col justify-end p-6 text-world-paper md:min-h-[18rem]">
                                    <span className="text-[0.62rem] uppercase tracking-[0.18em] text-world-gold">
                                        {room.status === 'soon' ? 'Coming soon' : 'Open'}
                                    </span>
                                    <h2 className="mt-2 font-display text-3xl md:text-4xl">{room.name}</h2>
                                    <p className="mt-2 max-w-xs text-sm leading-6 text-world-paper/70">{room.blurb}</p>
                                </div>
                            </>
                        );

                        if (room.status === 'soon') {
                            return (
                                <div
                                    key={room.name}
                                    id="prive"
                                    className="relative overflow-hidden border border-world-ink/10 dark:border-white/10"
                                >
                                    {inner}
                                </div>
                            );
                        }

                        return (
                            <Link
                                key={room.name}
                                to={room.href}
                                className="group relative overflow-hidden border border-world-ink/10 dark:border-white/10"
                            >
                                {inner}
                            </Link>
                        );
                    })}
                </div>

                {hasCategory && (
                    <p className="mt-10 text-sm text-world-muted dark:text-white/60">
                        Menampilkan filter dari URL di bawah.
                    </p>
                )}
            </div>

            {hasCategory && (
                <div className="mx-auto mt-6 max-w-[1440px] px-5 md:px-12">
                    <ShopSection hideHeader />
                </div>
            )}
        </main>
    );
};

export default ShopPage;
