import i18n from 'i18next';

// Current exchange rates (Base: 1 IDR)
let EXCHANGE_RATES: Record<string, number> = {
    IDR: 1,
    USD: 0.000064,
    EUR: 0.000059,
    CNY: 0.00046,
};

let ratesFetched = false;

// Function to fetch latest rates
export const fetchLatestRates = async () => {
    if (ratesFetched) return;
    try {
        const response = await fetch('https://open.er-api.com/v6/latest/IDR');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();

        if (data.rates) {
            EXCHANGE_RATES = {
                IDR: 1,
                USD: data.rates.USD || EXCHANGE_RATES.USD,
                EUR: data.rates.EUR || EXCHANGE_RATES.EUR,
                CNY: data.rates.CNY || EXCHANGE_RATES.CNY,
            };
            ratesFetched = true;
        }
    } catch {
        // Silently fall back to hardcoded rates — retry on next call
    }
};

const CURRENCY_MAP: Record<string, { code: string; symbol: string; locale: string }> = {
    id: { code: 'IDR', symbol: 'Rp', locale: 'id-ID' },
    en: { code: 'USD', symbol: '$', locale: 'en-US' },
    fr: { code: 'EUR', symbol: '€', locale: 'fr-FR' },
    zh: { code: 'CNY', symbol: '¥', locale: 'zh-CN' },
};

const getLang = (): string => {
    const lang = i18n.language || 'id';
    const shortLang = lang.split('-')[0].toLowerCase();
    if (shortLang === 'dev' || !shortLang) return 'id';
    return shortLang;
};

export const formatPrice = (priceInIdr: number, langOverride?: string) => {
    const resolvedLang = langOverride || getLang();
    const config = CURRENCY_MAP[resolvedLang] || CURRENCY_MAP.id;

    const convertedPrice = priceInIdr * EXCHANGE_RATES[config.code];

    return new Intl.NumberFormat(config.locale, {
        style: 'currency',
        currency: config.code,
        minimumFractionDigits: config.code === 'IDR' ? 0 : 2,
        maximumFractionDigits: config.code === 'IDR' ? 0 : 2,
    }).format(convertedPrice);
};
