import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useInstagram } from '../../hooks/useInstagram';

const InstagramManager = () => {
    const { posts, loading, refresh } = useInstagram();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
        image_url: '',
        post_url: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase
                .from('instagram_posts')
                .insert([formData]);

            if (error) throw error;

            setFormData({ image_url: '', post_url: '' });
            setIsFormOpen(false);
            refresh();
        } catch (err: any) {
            alert('Error adding post: ' + err.message);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Remove this post from feed?')) return;
        try {
            const { error } = await supabase.from('instagram_posts').delete().eq('id', id);
            if (error) throw error;
            refresh();
        } catch (err: any) {
            alert('Error deleting: ' + err.message);
        }
    };

    return (
        <div className="p-8 bg-white shadow-xl border border-black/5">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-secondary mb-2">Feed Control</h2>
                    <h1 className="font-display text-3xl">Manage Journal</h1>
                </div>
                <button
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    className="text-[10px] uppercase font-bold tracking-[0.3em] bg-primary text-white px-8 py-4 hover:bg-accent-gold transition-all duration-500"
                >
                    {isFormOpen ? 'Cancel' : 'Add Post'}
                </button>
            </div>

            {isFormOpen && (
                <motion.form
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="mb-12 p-8 bg-surface-secondary space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary block mb-2">Image URL</label>
                            <input
                                type="text"
                                required
                                className="w-full p-4 text-[11px] font-bold tracking-widest border-b border-black/5 focus:outline-none focus:border-accent-gold transition-colors"
                                value={formData.image_url}
                                onChange={e => setFormData({ ...formData, image_url: e.target.value })}
                                placeholder="Paste Image Link"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary block mb-2">Post Link</label>
                            <input
                                type="text"
                                required
                                className="w-full p-4 text-[11px] font-bold tracking-widest border-b border-black/5 focus:outline-none focus:border-accent-gold transition-colors"
                                value={formData.post_url}
                                onChange={e => setFormData({ ...formData, post_url: e.target.value })}
                                placeholder="https://instagram.com/p/..."
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-primary text-white py-4 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-accent-gold transition-colors">
                        Sync to Journal
                    </button>
                </motion.form>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {posts.map(post => (
                    <div key={post.id} className="relative aspect-square group">
                        <img src={post.image_url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <button
                            onClick={() => handleDelete(post.id)}
                            className="absolute top-2 right-2 p-2 bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InstagramManager;
