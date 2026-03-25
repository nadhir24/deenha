import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SEOHead from '../components/SEOHead';
import { useTranslation } from 'react-i18next';
import { fetchJournalBySlug, JournalArticle } from '../hooks/useJournals';

const JournalDetailsPage = () => {
    const { slug } = useParams();
    const { t, i18n } = useTranslation();
    const [article, setArticle] = useState<JournalArticle | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadArticle = async () => {
            if (slug) {
                setLoading(true);
                const data = await fetchJournalBySlug(slug, i18n.language);
                setArticle(data);
                setLoading(false);
            }
        };
        loadArticle();
        window.scrollTo(0, 0);
    }, [slug, i18n.language]);

    if (loading) {
        return (
            <div className="pt-44 pb-24 text-center">
                <div className="animate-pulse text-accent-gold text-xs uppercase tracking-[0.3em]">Opening Story...</div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="pt-44 pb-24 text-center">
                <h1 className="text-2xl font-display">Story Not Found</h1>
                <Link to="/journal" className="mt-4 text-accent-gold uppercase text-[10px] font-bold tracking-widest block">Back to Journal</Link>
            </div>
        );
    }

    const shareUrl = window.location.href;
    const shareText = `Check out this article from DEENHA: ${article.title}`;

    const shareWhatsApp = () => {
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    };

    const copyLink = () => {
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard! You can now share it on Instagram.');
    };

    return (
        <main className="pt-44 pb-24 bg-white dark:bg-primary transition-colors duration-300">
            <SEOHead
                title={`${article.title} - DEENHA Journal`}
                description={article.excerpt}
                ogImage={article.image_url.startsWith('http') ? article.image_url : `https://www.deenha.com${article.image_url}`}
            />

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="max-w-3xl mx-auto">
                    <Link to="/journal" className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.3em] text-secondary dark:text-white/40 hover:text-accent-gold transition-colors mb-12">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        {t('nav.journal')}
                    </Link>

                    <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest mb-6">
                        <span className="text-accent-gold">{article.category}</span>
                        <span className="text-secondary/40">•</span>
                        <span className="text-secondary/60">{new Date(article.date).toLocaleDateString()}</span>
                    </div>

                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight mb-12 leading-tight italic">
                        {article.title}
                    </h1>

                    <div className="aspect-[16/9] overflow-hidden bg-surface-secondary mb-16">
                        <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div
                        className="prose prose-lg max-w-none journal-content text-secondary dark:text-white/60 italic leading-relaxed space-y-6"
                        dangerouslySetInnerHTML={{ __html: article.content || '' }}
                    />

                    <div className="mt-20 pt-12 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                        <div className="flex gap-6 items-center">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-secondary dark:text-white/20 opacity-40">Share Story:</span>
                            <button
                                onClick={copyLink}
                                className="text-[10px] uppercase font-bold tracking-widest text-primary dark:text-white hover:text-accent-gold transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
                                Instagram (Copy Link)
                            </button>
                            <button
                                onClick={shareWhatsApp}
                                className="text-[10px] uppercase font-bold tracking-widest text-primary dark:text-white hover:text-accent-gold transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.87 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                WhatsApp
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default JournalDetailsPage;
