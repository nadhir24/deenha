import { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useProducts } from '../../hooks/useProducts';

const ProductManager = () => {
    const { products, loading, refresh } = useProducts();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        price: 0,
        original_price: 0,
        category: 'Scarves',
        image: '',
        color: '',
        color_hex: '#000000',
        badge: '',
        size: '110x110',
        stock: 0
    });

    const resetForm = () => {
        setFormData({
            name: '',
            price: 0,
            original_price: 0,
            category: 'Scarves',
            image: '',
            color: '',
            color_hex: '#000000',
            badge: '',
            size: '110x110',
            stock: 0
        });
        setEditingId(null);
        setIsFormOpen(false);
    };

    const handleEdit = (product: any) => {
        setFormData({
            name: product.name,
            price: product.price,
            original_price: product.originalPrice || 0,
            category: product.category,
            image: product.image,
            color: product.color,
            color_hex: product.colorHex,
            badge: product.badge || '',
            size: product.size.join(', '),
            stock: product.stock || 0
        });
        setEditingId(product.id);
        setIsFormOpen(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const payload = {
                ...formData,
                size: formData.size.split(',').map(s => s.trim()),
                price: Number(formData.price),
                original_price: formData.original_price ? Number(formData.original_price) : null,
                stock: Number(formData.stock)
            };

            if (editingId) {
                const { error } = await supabase
                    .from('products')
                    .update(payload)
                    .eq('id', editingId);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('products')
                    .insert([payload]);
                if (error) throw error;
            }

            resetForm();
            refresh();
        } catch (err: any) {
            alert('Error saving product: ' + err.message);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            refresh();
        } catch (err: any) {
            alert('Error deleting product: ' + err.message);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-accent-gold border-t-transparent animate-spin mb-4" />
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-secondary">Loading Inventory</span>
        </div>
    );

    return (
        <div className="p-0">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-secondary mb-2">Inventory Control</h2>
                    <h1 className="font-display text-3xl">Manage Atelier</h1>
                </div>
                <button
                    onClick={() => isFormOpen ? resetForm() : setIsFormOpen(true)}
                    className={`text-[10px] uppercase font-bold tracking-[0.3em] px-8 py-4 transition-all duration-500 shadow-sm ${isFormOpen ? 'bg-secondary text-white' : 'bg-primary text-white hover:bg-accent-gold'
                        }`}
                >
                    {isFormOpen ? 'Cancel' : 'Add New Creation'}
                </button>
            </div>

            {isFormOpen && (
                <motion.form
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="bg-white p-10 border border-black/5 mb-12 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-xl"
                >
                    <div className="md:col-span-2">
                        <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Product Name</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Stock Level</label>
                        <input
                            type="number"
                            required
                            className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                            value={formData.stock}
                            onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Price (IDR)</label>
                        <input
                            type="number"
                            required
                            className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                            value={formData.price}
                            onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Original Price (Internal)</label>
                        <input
                            type="number"
                            className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                            value={formData.original_price}
                            onChange={e => setFormData({ ...formData, original_price: Number(e.target.value) })}
                        />
                    </div>
                    <div>
                        <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Category</label>
                        <select
                            className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors appearance-none"
                            value={formData.category}
                            onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                        >
                            <option>Scarves</option>
                            <option>Dresses</option>
                            <option>Bergo</option>
                            <option>Pray Set</option>
                        </select>
                    </div>
                    <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div>
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Image URL</label>
                            <input
                                type="text"
                                className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                                value={formData.image}
                                onChange={e => setFormData({ ...formData, image: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Sizes (comma sep)</label>
                            <input
                                type="text"
                                className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                                value={formData.size}
                                onChange={e => setFormData({ ...formData, size: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Color Name</label>
                            <input
                                type="text"
                                className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                                value={formData.color}
                                onChange={e => setFormData({ ...formData, color: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        <button type="submit" className="w-full bg-primary text-white py-5 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-accent-gold transition-all duration-500 shadow-xl">
                            {editingId ? 'Update Creation' : 'Archive to Atelier'}
                        </button>
                    </div>
                </motion.form>
            )}

            <div className="bg-white border border-black/5 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-black/5 bg-gray-50/50">
                            <th className="p-6 text-[10px] uppercase font-bold tracking-widest text-secondary">Product</th>
                            <th className="p-6 text-[10px] uppercase font-bold tracking-widest text-secondary">Category</th>
                            <th className="p-6 text-[10px] uppercase font-bold tracking-widest text-secondary text-right">Price</th>
                            <th className="p-6 text-[10px] uppercase font-bold tracking-widest text-secondary text-center">Stock</th>
                            <th className="p-6 text-[10px] uppercase font-bold tracking-widest text-secondary text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {products.map(product => (
                            <tr key={product.id} className="hover:bg-surface-secondary transition-colors group">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-16 bg-surface-secondary overflow-hidden">
                                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <span className="text-[11px] font-bold uppercase tracking-widest block">{product.name}</span>
                                            <span className="text-[9px] text-secondary uppercase tracking-widest">{product.color}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6 text-[11px] uppercase tracking-widest text-secondary">{product.category}</td>
                                <td className="p-6 text-[11px] font-bold tracking-widest text-right">Rp {product.price.toLocaleString()}</td>
                                <td className="p-6 text-center">
                                    <span className={`text-[10px] font-bold px-3 py-1 bg-surface-secondary tracking-widest ${(product.stock || 0) <= 5 ? 'text-red-500' : 'text-primary'
                                        }`}>
                                        {product.stock || 0}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex items-center justify-end gap-6">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="text-[10px] uppercase font-bold tracking-widest text-primary hover:text-accent-gold transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-[10px] uppercase font-bold tracking-widest text-red-400 hover:text-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManager;
