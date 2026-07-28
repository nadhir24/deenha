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
    gallery?: string[];
    accent: string;
    visibility: WorldVisibility;
};

const enc = (path: string) =>
    path
        .split('/')
        .map((seg) => (seg ? encodeURIComponent(seg) : ''))
        .join('/');

const warisan = enc('images/Warisan Nusantara-20260211T044846Z-1-001/Warisan Nusantara');
const songketDir = `${warisan}/${enc('Songket Scarves Series')}`;
const parangDir = `${warisan}/${enc('Parang Scarves Series')}`;
const lombokDir = `${warisan}/${enc('Lombok Scarves Series (Sejauh Mata Memandang)')}`;
const kawungDir = `${warisan}/${enc('Kawung Scarves Series')}`;
const borneoDir = `${warisan}/${enc('Borneo Scarves Series')}`;
const hagiaDir = enc('images/HAGIA SOPHIA SERIES (285K)-20260211T044838Z-1-001/HAGIA SOPHIA SERIES (285K)');
const cairoDir = enc('images/CAIRO SERIES-20260211T044831Z-1-001/CAIRO SERIES');
const arabicDir = enc('images/Arabic Series');

export const SONGKET_VIDEO = `/${songketDir}/songket-scroll-hero.mp4`;

const visible = { category: true, world: true, collection: true, newArrival: false } as const;
const hiddenAbstract = { category: false, world: false, collection: false, newArrival: false } as const;

export const worldSeriesItems: WorldSeriesItem[] = [
    {
        slug: 'songket',
        title: 'Songket',
        eyebrow: 'Heritage Textile World',
        description: 'Threads of ceremony, translated for today.',
        kind: 'heritage',
        image: `/${songketDir}/IMG_6376.jpg`,
        video: SONGKET_VIDEO,
        gallery: [
            `/${songketDir}/IMG_6376.jpg`,
            `/${songketDir}/IMG_6379.jpg`,
            `/${songketDir}/IMG_6374.jpg`,
            `/${songketDir}/IMG_6372.jpg`,
            `/${songketDir}/IMG_6351.jpg`,
            `/${songketDir}/IMG_6370.jpg`,
        ],
        accent: '#B59A62',
        visibility: { ...visible },
    },
    {
        slug: 'parang',
        title: 'Parang',
        eyebrow: 'Heritage Textile World',
        description: 'A graphic rhythm reimagined for contemporary drape.',
        kind: 'heritage',
        image: `/${parangDir}/_DSC9510%20copy%20IG.jpg`,
        gallery: [
            `/${parangDir}/_DSC9510%20copy%20IG.jpg`,
            `/${parangDir}/_DSC9499%20copy%20IG.jpg`,
            `/${parangDir}/IMG_0577.jpeg`,
            `/${parangDir}/IMG_0582.jpeg`,
            `/${parangDir}/IMG_0586.jpeg`,
            `/${parangDir}/IMG_0572.jpeg`,
        ],
        accent: '#A9654E',
        visibility: { ...visible },
    },
    {
        slug: 'lombok',
        title: 'Lombok',
        eyebrow: 'Heritage Textile World',
        description: 'Earth, rhythm, and a softer language of pattern.',
        kind: 'heritage',
        image: `/${lombokDir}/DSCF2596%20Copy.jpg`,
        gallery: [
            `/${lombokDir}/DSCF2596%20Copy.jpg`,
            `/${lombokDir}/DSCF2189%20Copy.jpg`,
            `/${lombokDir}/DSCF2493%20Copy.jpg`,
            `/${lombokDir}/DSCF2540%20Copy.jpg`,
            `/${lombokDir}/DSCF2578%20Copy.jpg`,
            `/${lombokDir}/DSCF2222%20Copy.jpg`,
        ],
        accent: '#8A927D',
        visibility: { ...visible },
    },
    {
        slug: 'kawung',
        title: 'Kawung',
        eyebrow: 'Heritage Textile World',
        description: 'A measured geometry with a calm, enduring pulse.',
        kind: 'heritage',
        image: `/${kawungDir}/IMG_6330.jpg`,
        gallery: [
            `/${kawungDir}/IMG_6330.jpg`,
            `/${kawungDir}/IMG_6310.jpg`,
            `/${kawungDir}/IMG_6315.jpg`,
            `/${kawungDir}/IMG_6320.jpg`,
            `/${kawungDir}/IMG_6325.jpg`,
            `/${kawungDir}/IMG_6326.jpg`,
        ],
        accent: '#718093',
        visibility: { ...visible },
    },
    {
        slug: 'borneo',
        title: 'Borneo',
        eyebrow: 'Heritage Textile World',
        description: 'Organic lines, vivid memory, and a living surface.',
        kind: 'heritage',
        image: `/${borneoDir}/_DSC8314%20Copy.jpg`,
        gallery: [
            `/${borneoDir}/_DSC8314%20Copy.jpg`,
            `/${borneoDir}/_DSC1648%20Copy.jpg`,
            `/${borneoDir}/_DSC1681%20Copy.jpg`,
            `/${borneoDir}/_DSC1694%20Copy.jpg`,
            `/${borneoDir}/_DSC8283_.jpg`,
            `/${borneoDir}/_DSC8284%20Copy.jpg`,
        ],
        accent: '#27364A',
        visibility: { ...visible },
    },
    {
        slug: 'hagia-sophia',
        title: 'Hagia Sophia',
        eyebrow: 'Cities of Islam',
        description: 'A study of thresholds, layered histories, and light.',
        kind: 'new-series',
        image: `/${hagiaDir}/DSCF2052%20Copy.jpg`,
        gallery: [
            `/${hagiaDir}/DSCF2052%20Copy.jpg`,
            `/${hagiaDir}/DSCF2054%20Copy.jpg`,
            `/${hagiaDir}/DSCF2064%20Copy.jpg`,
            `/${hagiaDir}/DSCF2065%20Copy.jpg`,
            `/${hagiaDir}/DSCF2067%20Copy.jpg`,
            `/${hagiaDir}/DSCF2070%20Copy.jpg`,
        ],
        accent: '#D8B9AD',
        visibility: { ...visible },
    },
    {
        slug: 'cairo',
        title: 'Cairo',
        eyebrow: 'Cities of Islam',
        description: 'A new visual language shaped by atmosphere and movement.',
        kind: 'new-series',
        image: `/${cairoDir}/DSCF2137%20Copy.jpg`,
        gallery: [
            `/${cairoDir}/DSCF2137%20Copy.jpg`,
            `/${cairoDir}/1614405676264.jpg`,
            `/${cairoDir}/1614405676312.jpg`,
            `/${cairoDir}/1614405676362.jpg`,
            `/${cairoDir}/1614405676404.jpg`,
            `/${cairoDir}/1614405676454.jpg`,
        ],
        accent: '#A9654E',
        visibility: { ...visible },
    },
    {
        slug: 'arabic',
        title: 'Arabic',
        eyebrow: 'Cities of Islam',
        description: 'Calligraphy and ornament, carried into daily modest wear.',
        kind: 'new-series',
        image: `/${arabicDir}/DSCF5905%20Copy.jpg`,
        gallery: [
            `/${arabicDir}/DSCF5905%20Copy.jpg`,
            `/${arabicDir}/DSCF5668%20Copy.jpg`,
            `/${arabicDir}/DSCF5826%20Copy.jpg`,
            `/${arabicDir}/DSCF5872%20Copy.jpg`,
            `/${arabicDir}/DSCF6093%20Copy.jpg`,
        ],
        accent: '#B59A62',
        visibility: { ...visible },
    },
    // Abstract held back until assets/stories are ready (Nadhir).
    {
        slug: 'abstract',
        title: 'Abstract',
        eyebrow: 'New Arrival',
        description: 'A place for color, folds, light, and material studies.',
        kind: 'abstract',
        accent: '#718093',
        visibility: { ...hiddenAbstract },
    },
];

export const visibleWorldSeriesItems = worldSeriesItems.filter((item) => item.visibility.world && item.visibility.collection);
export const heritageItems = visibleWorldSeriesItems.filter((item) => item.kind === 'heritage');
export const newSeriesItems = visibleWorldSeriesItems.filter((item) => item.kind === 'new-series');
export const abstractItems = visibleWorldSeriesItems.filter((item) => item.kind === 'abstract');

export const worldGroupPath = (kind: WorldSeriesItem['kind']) => {
    if (kind === 'heritage') return 'heritage';
    if (kind === 'new-series') return 'new-series';
    return 'abstract';
};

export const worldItemHref = (item: WorldSeriesItem) => `/world/${worldGroupPath(item.kind)}/${item.slug}`;

export const getVisibleWorldSeriesItems = (settings?: Record<string, boolean>) =>
    visibleWorldSeriesItems.filter((item) => settings?.[item.slug.replace(/-/g, '_')] !== false);
