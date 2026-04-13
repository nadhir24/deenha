import { motion } from 'framer-motion';
import { useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useJournals } from '../hooks/useJournals';

const JournalPage = () => {
    const { t } = useTranslation();
    const { articles, loading } = useJournals();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const journalSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": t('journal.title'),
        "description": t('journal.description'),
        "publisher": {
            "@type": "Organization",
            "name": "DEENHA Official Store"
        },
        "blogPost": articles.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "datePublished": post.date,
            "image": post.image_url.startsWith('http') ? post.image_url : `https://www.deenha.com${post.image_url}`,
            "abstract": post.excerpt
        }))
    };

    return (
        <main className="pt-44 pb-24 bg-white dark:bg-primary transition-colors duration-300">
            <SEOHead
                title={`${t('journal.title')} - Style Guides & Fabric Insights`}
                description={t('journal.description')}
                canonicalPath="/journal"
                jsonLd={journalSchema}
            />

            <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <header className="mb-20 text-center max-w-3xl mx-auto">
                    <span className="text-accent-gold text-[10px] uppercase font-bold tracking-[0.4em] mb-4 block">{t('journal.subtitle')}</span>
                    <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight mb-8 italic text-primary dark:text-white">{t('journal.title')}</h1>
                    <p className="text-secondary dark:text-white/75 text-sm leading-relaxed">
                        {t('journal.description')}
                    </p>
                </header>
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-pulse text-accent-gold text-xs uppercase tracking-[0.3em]">Loading Stories...</div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {articles.map((post, index) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                className="group cursor-pointer"
                            >
                                <Link to={`/journal/${post.slug}`}>
                                    <div className="aspect-[16/10] overflow-hidden bg-surface-secondary mb-8">
                                        <img
                                            src={post.image_url}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest">
                                            <span className="text-accent-gold">{post.category}</span>
                                            <span className="text-secondary/40">•</span>
                                            <span className="text-secondary/60">{new Date(post.date).toLocaleDateString()}</span>
                                        </div>
                                        <h2 className="font-display text-2xl group-hover:text-accent-gold transition-colors duration-500 leading-snug text-primary dark:text-white">
                                            {post.title}
                                        </h2>
                                        <p className="text-secondary dark:text-white/75 text-sm leading-relaxed line-clamp-3 italic opacity-80">
                                            {post.excerpt}
                                        </p>
                                        <div className="pt-4 flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] text-primary dark:text-white group-hover:gap-4 transition-all duration-500">
                                            {t('journal.read_full')}
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default JournalPage;
