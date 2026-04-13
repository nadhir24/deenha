import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { formatPrice } from '../lib/currency';

/**
 * Hook that returns a reactive formatPrice function.
 * Guarantees price format updates when language changes.
 */
export const useFormatPrice = () => {
    const { i18n } = useTranslation();
    const lang = (i18n.language || 'id').split('-')[0].toLowerCase();

    return useCallback(
        (priceInIdr: number) => formatPrice(priceInIdr, lang),
        [lang]
    );
};
