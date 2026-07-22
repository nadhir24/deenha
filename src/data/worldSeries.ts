export type WorldVisibility = {
    category: boolean;
    world: boolean;
    collection: boolean;
    newArrival: boolean;
};

export type WorldSeriesItem = {
    slug: string;
    title: string;
    eyebrow: string;
    description: string;
    kind: 'heritage' | 'new-series' | 'abstract';
    image?: string;
    video?: string;
    accent: string;
    visibility: WorldVisibility;
};

const songketPath = '/images/Warisan%20Nusantara-20260211T044846Z-1-001/Warisan%20Nusantara/Songket%20Scarves%20Series';

export const SONGKET_VIDEO = `${songketPath}/songket-scroll-hero.mp4`;

export const worldSeriesItems: WorldSeriesItem[] = [
    {
        slug: 'songket',
        title: 'Songket',
        eyebrow: 'Heritage Textile World',
        description: 'Threads of ceremony, translated for today.',
        kind: 'heritage',
        image: `${songketPath}/IMG_6376.jpg`,
        video: SONGKET_VIDEO,
        accent: '#B59A62',
        visibility: { category: true, world: true, collection: true, newArrival: false },
    },
    {
        slug: 'parang',
        title: 'Parang',
        eyebrow: 'Heritage Textile World',
        description: 'A graphic rhythm reimagined for contemporary drape.',
        kind: 'heritage',
        image: '/images/Warisan%20Nusantara-20260211T044846Z-1-001/Warisan%20Nusantara/Parang%20Scarves%20Series/_DSC9510%20copy%20IG.jpg',
        accent: '#A9654E',
        visibility: { category: true, world: true, collection: true, newArrival: false },
    },
    {
        slug: 'lombok',
        title: 'Lombok',
        eyebrow: 'Heritage Textile World',
        description: 'Earth, rhythm, and a softer language of pattern.',
        kind: 'heritage',
        image: '/images/Warisan%20Nusantara-20260211T044846Z-1-001/Warisan%20Nusantara/Lombok%20Scarves%20Series%20(Sejauh%20Mata%20Memandang)/DSCF2596%20Copy.jpg',
        accent: '#8A927D',
        visibility: { category: true, world: true, collection: true, newArrival: false },
    },
    {
        slug: 'kawung',
        title: 'Kawung',
        eyebrow: 'Heritage Textile World',
        description: 'A measured geometry with a calm, enduring pulse.',
        kind: 'heritage',
        image: '/images/Warisan%20Nusantara-20260211T044846Z-1-001/Warisan%20Nusantara/Kawung%20Scarves%20Series/IMG_6330.jpg',
        accent: '#718093',
        visibility: { category: true, world: true, collection: true, newArrival: false },
    },
    {
        slug: 'borneo',
        title: 'Borneo',
        eyebrow: 'Heritage Textile World',
        description: 'Organic lines, vivid memory, and a living surface.',
        kind: 'heritage',
        image: '/images/Warisan%20Nusantara-20260211T044846Z-1-001/Warisan%20Nusantara/Borneo%20Scarves%20Series/_DSC8314%20Copy.jpg',
        accent: '#27364A',
        visibility: { category: true, world: true, collection: true, newArrival: false },
    },
    {
        slug: 'hagia-sophia',
        title: 'Hagia Sophia',
        eyebrow: 'New Series',
        description: 'A study of thresholds, layered histories, and light.',
        kind: 'new-series',
        accent: '#D8B9AD',
        visibility: { category: true, world: true, collection: true, newArrival: false },
    },
    {
        slug: 'cairo',
        title: 'Cairo',
        eyebrow: 'New Series',
        description: 'A new visual language shaped by atmosphere and movement.',
        kind: 'new-series',
        accent: '#A9654E',
        visibility: { category: true, world: true, collection: true, newArrival: false },
    },
    {
        slug: 'abstract',
        title: 'Abstract',
        eyebrow: 'New Arrival',
        description: 'A place for color, folds, light, and material studies.',
        kind: 'abstract',
        accent: '#718093',
        visibility: { category: true, world: true, collection: true, newArrival: true },
    },
];

export const visibleWorldSeriesItems = worldSeriesItems.filter((item) => item.visibility.world && item.visibility.collection);
export const heritageItems = visibleWorldSeriesItems.filter((item) => item.kind === 'heritage');
export const newSeriesItems = visibleWorldSeriesItems.filter((item) => item.kind === 'new-series');
export const abstractItems = visibleWorldSeriesItems.filter((item) => item.kind === 'abstract');

export const getVisibleWorldSeriesItems = (settings?: Record<string, boolean>) =>
    visibleWorldSeriesItems.filter((item) => settings?.[item.slug.replace(/-/g, '_')] !== false);
