import i18n from 'i18next';

// Current exchange rates (Base: 1 IDR)
let EXCHANGE_RATES: Record<string, number> = {
    IDR: 1,
    USD: 0.000064,
    EUR: 0.000059,
    CNY: 0.00046,
};

// Function to fetch latest rates
export const fetchLatestRates = async () => {
    try {
        const response = await fetch('https://api.frankfurter.app/latest?from=IDR&to=USD,EUR,CNY');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        EXCHANGE_RATES = {
            ...EXCHANGE_RATES,
            ...data.rates,
            IDR: 1
        };
        console.log('Exchange rates updated successfully');
    } catch (error) {
        console.error('Failed to fetch latest exchange rates:', error);
    }
};

const CURRENCY_MAP: Record<string, { code: string; symbol: string; locale: string }> = {
    id: { code: 'IDR', symbol: 'Rp', locale: 'id-ID' },
    en: { code: 'USD', symbol: '$', locale: 'en-US' },
    fr: { code: 'EUR', symbol: '€', locale: 'fr-FR' },
    zh: { code: 'CNY', symbol: '¥', locale: 'zh-CN' },
};

export const formatPrice = (priceInIdr: number) => {
    // Crucial: Get language from i18next instance to ensure reactivity
    let lang = i18n.language || 'id';

    // Normalize language (e.g., 'id-ID' -> 'id')
    let shortLang = lang.split('-')[0].toLowerCase();

    // Default to 'id' if 'dev' or empty
    if (shortLang === 'dev' || !shortLang) shortLang = 'id';

    const config = CURRENCY_MAP[shortLang] || CURRENCY_MAP.id;

    // Convert price
    const convertedPrice = priceInIdr * EXCHANGE_RATES[config.code];

    // Format using Intl.NumberFormat
    return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.code,
        minimumFractionDigits: config.code === 'IDR' ? 0 : 2,
        maximumFractionDigits: config.code === 'IDR' ? 0 : 2,
    }).format(convertedPrice);
};
