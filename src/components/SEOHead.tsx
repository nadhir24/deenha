import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
    title?: string;
    description?: string;
    canonicalPath?: string;
    ogImage?: string;
    ogType?: 'website' | 'article' | 'product';
    jsonLd?: Record<string, any> | Record<string, any>[];
}

const SEOHead = ({
    title,
    description = "DEENHA Official Store - Temukan koleksi fashion muslimah premium dengan desain eksklusif. Official site untuk Scarves, Dresses, Bergo, dan Pray Set yang elegan.",
    canonicalPath = "",
    ogImage = "https://www.deenha.com/assets/logo.png",
    ogType = 'website',
    jsonLd
}: SEOHeadProps) => {
    const siteTitle = "DEENHA Official Store";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const url = `https://www.deenha.com${canonicalPath}`;

    return (
        <Helmet>
            {/* Standard metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:url" content={url} />
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content="DEENHA Official Store" />

            {/* Twitter */}
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={fullTitle} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogImage} />

            {/* Structured Data */}
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    );
};

export default SEOHead;
