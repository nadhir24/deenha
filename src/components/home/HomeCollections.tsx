import CollectionHighlight from './CollectionHighlight';
import { useSiteSettings } from '../../hooks/useSiteSettings';

const HomeCollections = () => {
    const { settings, loading } = useSiteSettings();

    const highlights = settings.home_highlights || [
        {
            title: "Pre-Raya Special",
            bannerImage: "/images/hampers-1-dWxvylrBJ6IBxzqB.jpg",
            collectionTitle: "Luxury Hampers",
            collectionDescription: "The perfect gift of gratitude. Our curated Raya hampers are elegantly packaged with our signature touch, making them the ultimate way to share joy with your loved ones.",
            category: "Hampers",
            productIds: []
        },
        {
            title: "Raya Essentials",
            bannerImage: "/images/image-1-m5KMww5a1eHrGa7j.jpg",
            collectionTitle: "Signature Scarves",
            collectionDescription: "Discover our most-loved Monogram and Crystal series. Crafted from premium voal for effortless elegance during your Raya celebrations.",
            category: "Scarves",
            productIds: []
        },
        {
            title: "New Season",
            bannerImage: "/images/new-arrival-mv0WD7ngy7FZoWXE.jpg",
            collectionTitle: "Pre-Raya Lookbook",
            collectionDescription: "From timeless silhouettes to modern modest wear, explore our latest release designed specifically for the upcoming holy season.",
            category: "New Arrival",
            productIds: []
        },
        {
            title: "Spiritual Series",
            bannerImage: "/images/image-product-3-YKb36NKv2VHk924E.jpg",
            collectionTitle: "Prayer Sets",
            collectionDescription: "Experience serenity in every prayer with our premium prayer sets, featuring delicate lace and breathable fabrics for ultimate comfort.",
            category: "Pray Set",
            productIds: []
        }
    ];

    if (loading && !settings.home_highlights) return null;

    return (
        <div id="collections-highlights">
            {highlights.map((h: any, i: number) => (
                <CollectionHighlight
                    key={i}
                    title={h.title}
                    bannerImage={h.bannerImage}
                    collectionTitle={h.collectionTitle}
                    collectionDescription={h.collectionDescription}
                    category={h.category}
                    productIds={h.productIds}
                />
            ))}
        </div>
    );
};

export default HomeCollections;
