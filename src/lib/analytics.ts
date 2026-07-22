type Marketplace = 'shopee' | 'tokopedia';

type MarketplaceEvent = {
    marketplace: Marketplace;
    productName?: string;
    collection?: string;
    pageLocation: string;
    worldType?: string;
};

declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void;
    }
}

export const trackMarketplaceClick = ({ marketplace, productName, collection, pageLocation, worldType }: MarketplaceEvent) => {
    const payload = {
        marketplace,
        product_name: productName || 'DEENHA official store',
        collection: collection || 'Scarves',
        page_location: pageLocation,
        world_type: worldType || 'world-series',
    };

    window.gtag?.('event', 'marketplace_click', payload);

    if (import.meta.env.DEV) {
        console.info('marketplace_click', payload);
    }
};
