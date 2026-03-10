import CollectionHighlight from './CollectionHighlight';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { useTranslation } from 'react-i18next';

const HomeCollections = () => {
    const { t, i18n } = useTranslation();
    const { settings, loading } = useSiteSettings();

    // Mapping for default keys to i18n keys
    const getTranslatedContent = (item: any, index: number) => {
        const i18nKeys = [
            { title: 'collections.hampers_title', name: 'collections.hampers_name', desc: 'collections.hampers_desc' },
            { title: 'collections.scarves_title', name: 'collections.scarves_name', desc: 'collections.scarves_desc' },
            { title: 'collections.new_title', name: 'collections.new_name', desc: 'collections.new_desc' },
            { title: 'collections.pray_title', name: 'collections.pray_name', desc: 'collections.pray_desc' }
        ];

        // If we are in English, use database content as is
        if (i18n.language === 'en') return item;

        // If we have mapping for this index, try to translate
        if (i18nKeys[index]) {
            return {
                ...item,
                title: t(i18nKeys[index].title),
                collectionTitle: t(i18nKeys[index].name),
                collectionDescription: t(i18nKeys[index].desc)
            };
        }

        return item;
    };

    const defaultHighlights = [
        {
            title: t('collections.hampers_title'),
            bannerImage: "/images/hampers-1-dWxvylrBJ6IBxzqB.jpg",
            collectionTitle: t('collections.hampers_name'),
            collectionDescription: t('collections.hampers_desc'),
            category: "Hampers",
            productIds: []
        },
        {
            title: t('collections.scarves_title'),
            bannerImage: "/images/image-1-m5KMww5a1eHrGa7j.jpg",
            collectionTitle: t('collections.scarves_name'),
            collectionDescription: t('collections.scarves_desc'),
            category: "Scarves",
            productIds: []
        },
        {
            title: t('collections.new_title'),
            bannerImage: "/images/new-arrival-mv0WD7ngy7FZoWXE.jpg",
            collectionTitle: t('collections.new_name'),
            collectionDescription: t('collections.new_desc'),
            category: "New Arrival",
            productIds: []
        },
        {
            title: t('collections.pray_title'),
            bannerImage: "/images/image-product-3-YKb36NKv2VHk924E.jpg",
            collectionTitle: t('collections.pray_name'),
            collectionDescription: t('collections.pray_desc'),
            category: "Pray Set",
            productIds: []
        }
    ];

    const highlights = settings.home_highlights 
        ? settings.home_highlights.map((h: any, i: number) => getTranslatedContent(h, i))
        : defaultHighlights;

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


