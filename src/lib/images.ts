/**
 * Utility to optimize Supabase images using their built-in transformation service.
 * Standard: /storage/v1/object/public/bucket/path
 * Optimized: /storage/v1/render/image/public/bucket/path
 */
export const getOptimizedImage = (url: string, width = 800, quality = 80) => {
    if (!url || !url.includes('supabase.co')) return url;

    try {
        // Check if it's already using the render path
        if (url.includes('/render/image/')) {
            const baseUrl = url.split('?')[0];
            return `${baseUrl}?width=${width}&quality=${quality}`;
        }

        // Convert object/public to render/image/public
        const optimizedUrl = url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/');

        // Only return if replacement actually happened
        if (optimizedUrl !== url) {
            return `${optimizedUrl}?width=${width}&quality=${quality}`;
        }

        return url;
    } catch (e) {
        return url;
    }
};
