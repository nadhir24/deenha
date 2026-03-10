import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const JournalManager = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentArticle, setCurrentArticle] = useState<any>(null);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const fetchArticles = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('journals')
            .select('*')
            .order('date', { ascending: false });
        if (!error) setArticles(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchArticles();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus(null);

        const { error } = await supabase
            .from('journals')
            .upsert({
                ...currentArticle,
                updated_at: new Date().toISOString()
            });

        if (error) {
            setStatus({ type: 'error', message: error.message });
        } else {
            setStatus({ type: 'success', message: 'Article saved successfully' });
            setIsEditing(false);
            fetchArticles();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this article?')) return;
        const { error } = await supabase.from('journals').delete().eq('id', id);
        if (!error) fetchArticles();
    };

    const startNew = () => {
        setCurrentArticle({
            slug: '',
            image_url: '',
            date: new Date().toISOString().split('T')[0],
            published: true,
            title_en: '', excerpt_en: '', content_en: '', category_en: '',
            title_id: '', excerpt_id: '', content_id: '', category_id: '',
            title_fr: '', excerpt_fr: '', content_fr: '', category_fr: '',
            title_zh: '', excerpt_zh: '', content_zh: '', category_zh: ''
        });
        setIsEditing(true);
    };

    if (isEditing) {
        return (
            <div className="bg-white p-8 rounded-sm shadow-sm border border-black/5">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="font-display text-2xl italic">Edit Journal Article</h2>
                    <button onClick={() => setIsEditing(false)} className="text-xs uppercase font-bold tracking-widest text-secondary">Cancel</button>
                </div>

                <form onSubmit={handleSave} className="space-y-12">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-8 pb-12 border-b border-black/5">
                        <div className="space-y-4">
                            <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary">Slug (URL)</label>
                            <input 
                                type="text" 
                                value={currentArticle.slug}
                                onChange={e => setCurrentArticle({...currentArticle, slug: e.target.value})}
                                className="w-full border-b border-black/10 py-2 focus:border-accent-gold outline-none transition-colors"
                                placeholder="e.g. guide-to-premium-voal"
                                required
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="block text-[10px] uppercase font-bold tracking-widest text-secondary">Image URL</label>
                            <input 
                                type="text" 
                                value={currentArticle.image_url}
                                onChange={e => setCurrentArticle({...currentArticle, image_url: e.target.value})}
                                className="w-full border-b border-black/10 py-2 focus:border-accent-gold outline-none transition-colors"
                                placeholder="/images/your-image.jpg"
                                required
                            />
                        </div>
                    </div>

                    {/* Multilingual Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* ENGLISH */}
                        <div className="space-y-6 bg-surface-secondary/30 p-6 rounded-sm">
                            <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-accent-gold">English (Primary)</h3>
                            <input 
                                type="text" placeholder="Title EN"
                                value={currentArticle.title_en}
                                onChange={e => setCurrentArticle({...currentArticle, title_en: e.target.value})}
                                className="w-full border-b border-black/5 bg-transparent py-2 outline-none font-display text-lg"
                                required
                            />
                            <textarea 
                                placeholder="Excerpt EN"
                                value={currentArticle.excerpt_en}
                                onChange={e => setCurrentArticle({...currentArticle, excerpt_en: e.target.value})}
                                className="w-full h-20 border-b border-black/5 bg-transparent py-2 outline-none text-sm italic"
                                required
                            />
                            <textarea 
                                placeholder="Content HTML EN"
                                value={currentArticle.content_en}
                                onChange={e => setCurrentArticle({...currentArticle, content_en: e.target.value})}
                                className="w-full h-40 border border-black/5 bg-white p-4 outline-none text-xs font-mono"
                                required
                            />
                        </div>

                        {/* INDONESIAN */}
                        <div className="space-y-6 bg-surface-secondary/30 p-6 rounded-sm">
                            <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-accent-gold">Indonesian</h3>
                            <input 
                                type="text" placeholder="Judul ID"
                                value={currentArticle.title_id}
                                onChange={e => setCurrentArticle({...currentArticle, title_id: e.target.value})}
                                className="w-full border-b border-black/5 bg-transparent py-2 outline-none font-display text-lg"
                            />
                            <textarea 
                                placeholder="Ringkasan ID"
                                value={currentArticle.excerpt_id}
                                onChange={e => setCurrentArticle({...currentArticle, excerpt_id: e.target.value})}
                                className="w-full h-20 border-b border-black/5 bg-transparent py-2 outline-none text-sm italic"
                            />
                            <textarea 
                                placeholder="Konten HTML ID"
                                value={currentArticle.content_id}
                                onChange={e => setCurrentArticle({...currentArticle, content_id: e.target.value})}
                                className="w-full h-40 border border-black/5 bg-white p-4 outline-none text-xs font-mono"
                            />
                        </div>

                        {/* FRENCH & CHINESE (Simplified) */}
                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                            <div className="space-y-4">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary opacity-50">French Title</label>
                                <input 
                                    type="text" 
                                    value={currentArticle.title_fr || ''}
                                    onChange={e => setCurrentArticle({...currentArticle, title_fr: e.target.value})}
                                    className="w-full border-b border-black/10 py-1 outline-none text-sm"
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary opacity-50">Chinese Title</label>
                                <input 
                                    type="text" 
                                    value={currentArticle.title_zh || ''}
                                    onChange={e => setCurrentArticle({...currentArticle, title_zh: e.target.value})}
                                    className="w-full border-b border-black/10 py-1 outline-none text-sm"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <button type="submit" className="bg-primary text-white px-12 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent-gold transition-colors duration-500">
                            Save Article
                        </button>
                    </div>

                    {status && (
                        <div className={`p-4 text-xs font-bold uppercase tracking-widest ${status.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {status.message}
                        </div>
                    )}
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="font-display text-3xl italic">Journal Stories</h2>
                <button 
                    onClick={startNew}
                    className="bg-primary text-white px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em]"
                >
                    + New Article
                </button>
            </div>

            {loading ? (
                <div className="animate-pulse text-xs uppercase tracking-widest py-20 text-center">Loading Articles...</div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {articles.map(article => (
                        <div key={article.id} className="bg-white p-6 border border-black/5 flex justify-between items-center hover:border-accent-gold/30 transition-colors">
                            <div className="flex gap-6 items-center">
                                <img src={article.image_url} className="w-16 h-16 object-cover bg-surface-secondary" alt="" />
                                <div>
                                    <h3 className="font-display text-lg italic">{article.title_en}</h3>
                                    <p className="text-[10px] uppercase font-bold tracking-widest text-secondary/40">{article.slug}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={() => { setCurrentArticle(article); setIsEditing(true); }} className="text-[10px] uppercase font-bold tracking-widest text-primary hover:text-accent-gold">Edit</button>
                                <button onClick={() => handleDelete(article.id)} className="text-[10px] uppercase font-bold tracking-widest text-red-400 hover:text-red-600">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JournalManager;
