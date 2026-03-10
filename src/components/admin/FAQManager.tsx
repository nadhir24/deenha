import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

const FAQManager = () => {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentFaq, setCurrentFaq] = useState<any>(null);

    const fetchFaqs = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('faqs').select('*').order('sort_order', { ascending: true });
        if (!error) setFaqs(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('faqs').upsert(currentFaq);
        if (!error) {
            setIsEditing(false);
            fetchFaqs();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this FAQ?')) return;
        const { error } = await supabase.from('faqs').delete().eq('id', id);
        if (!error) fetchFaqs();
    };

    const startNew = () => {
        setCurrentFaq({
            question_en: '', answer_en: '',
            question_id: '', answer_id: '',
            question_fr: '', answer_fr: '',
            question_zh: '', answer_zh: '',
            category: 'General',
            sort_order: faqs.length + 1
        });
        setIsEditing(true);
    };

    if (isEditing) {
        return (
            <div className="bg-white p-8 border border-black/5">
                <h2 className="font-display text-2xl mb-8 italic">Edit FAQ</h2>
                <form onSubmit={handleSave} className="space-y-12">
                    {/* EN & ID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6 bg-surface-secondary/30 p-6 rounded-sm">
                            <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-accent-gold">English & Indonesian</h3>
                            <div className="space-y-4">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary">Question (EN)</label>
                                <input type="text" value={currentFaq.question_en} onChange={e => setCurrentFaq({...currentFaq, question_en: e.target.value})} className="w-full border-b border-black/10 bg-transparent py-2 outline-none" required />
                                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary mt-4 block">Answer (EN)</label>
                                <textarea value={currentFaq.answer_en} onChange={e => setCurrentFaq({...currentFaq, answer_en: e.target.value})} className="w-full h-24 border border-black/5 p-4 outline-none text-sm bg-white" required />
                            </div>
                            <div className="space-y-4 pt-6 border-t border-black/5">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary">Question (ID)</label>
                                <input type="text" value={currentFaq.question_id} onChange={e => setCurrentFaq({...currentFaq, question_id: e.target.value})} className="w-full border-b border-black/10 bg-transparent py-2 outline-none" />
                                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary mt-4 block">Answer (ID)</label>
                                <textarea value={currentFaq.answer_id} onChange={e => setCurrentFaq({...currentFaq, answer_id: e.target.value})} className="w-full h-24 border border-black/5 p-4 outline-none text-sm bg-white" />
                            </div>
                        </div>

                        {/* FR & ZH */}
                        <div className="space-y-6 bg-surface-secondary/30 p-6 rounded-sm">
                            <h3 className="text-xs uppercase font-bold tracking-[0.2em] text-accent-gold">French & Chinese</h3>
                            <div className="space-y-4">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary">Question (FR)</label>
                                <input type="text" value={currentFaq.question_fr || ''} onChange={e => setCurrentFaq({...currentFaq, question_fr: e.target.value})} className="w-full border-b border-black/10 bg-transparent py-2 outline-none" />
                                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary mt-4 block">Answer (FR)</label>
                                <textarea value={currentFaq.answer_fr || ''} onChange={e => setCurrentFaq({...currentFaq, answer_fr: e.target.value})} className="w-full h-24 border border-black/5 p-4 outline-none text-sm bg-white" />
                            </div>
                            <div className="space-y-4 pt-6 border-t border-black/5">
                                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary">Question (ZH)</label>
                                <input type="text" value={currentFaq.question_zh || ''} onChange={e => setCurrentFaq({...currentFaq, question_zh: e.target.value})} className="w-full border-b border-black/10 bg-transparent py-2 outline-none" />
                                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary mt-4 block">Answer (ZH)</label>
                                <textarea value={currentFaq.answer_zh || ''} onChange={e => setCurrentFaq({...currentFaq, answer_zh: e.target.value})} className="w-full h-24 border border-black/5 p-4 outline-none text-sm bg-white" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-8">
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary">Category</label>
                            <input type="text" value={currentFaq.category} onChange={e => setCurrentFaq({...currentFaq, category: e.target.value})} className="w-full border-b border-black/10 py-2 outline-none" />
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary">Sort Order</label>
                            <input type="number" value={currentFaq.sort_order} onChange={e => setCurrentFaq({...currentFaq, sort_order: parseInt(e.target.value)})} className="w-full border-b border-black/10 py-2 outline-none" />
                        </div>
                    </div>

                    <div className="flex gap-4 pt-8">
                        <button type="submit" className="bg-primary text-white px-12 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-accent-gold transition-colors">Save FAQ</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="text-[10px] uppercase font-bold tracking-widest text-secondary px-8 py-4 border border-black/10 hover:bg-black hover:text-white transition-all">Cancel</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="font-display text-3xl italic">Frequently Asked Questions</h2>
                <button onClick={startNew} className="bg-primary text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-accent-gold transition-colors">+ New FAQ</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
                {faqs.map(faq => (
                    <div key={faq.id} className="bg-white p-6 border border-black/5 flex justify-between items-center hover:border-accent-gold/30 transition-colors">
                        <div>
                            <p className="font-display text-lg italic">{faq.question_en}</p>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-accent-gold mt-1 font-bold">{faq.category}</p>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => { setCurrentFaq(faq); setIsEditing(true); }} className="text-[10px] uppercase font-bold tracking-widest text-primary hover:text-accent-gold">Edit</button>
                            <button onClick={() => handleDelete(faq.id)} className="text-[10px] uppercase font-bold tracking-widest text-red-400 hover:text-red-600">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQManager;
