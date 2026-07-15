import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';
import { useNotification } from '../../context/NotificationContext';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Define Variant Interface
interface Variant {
    color: string;
    colorHex: string;
    image: string;
    stock: number;
}

const ProductManager = () => {
    const { products, loading, refresh } = useProducts();
    const { showNotification } = useNotification();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [uploading, setUploading] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

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
        stock: 0,
        variants: [] as Variant[]
    });

    const [newVariant, setNewVariant] = useState<Variant>({
        color: '',
        colorHex: '#000000',
        image: '',
        stock: 50
    });

    // Sync total stock when variants change
    useEffect(() => {
        if (formData.variants.length > 0) {
            const total = formData.variants.reduce((sum, v) => sum + (Number(v.stock) || 0), 0);
            if (total !== formData.stock) {
                setFormData(prev => ({ ...prev, stock: total }));
            }
        }
    }, [formData.variants]);

    const handleGlobalStockChange = (value: number) => {
        const variantsCount = formData.variants.length;
        if (variantsCount > 0) {
            const stockPerVariant = Math.floor(value / variantsCount);
            const remainder = value % variantsCount;
            const updatedVariants = formData.variants.map((v, i) => ({
                ...v,
                stock: i === 0 ? stockPerVariant + remainder : stockPerVariant
            }));
            setFormData({ ...formData, stock: value, variants: updatedVariants });
        } else {
            setFormData({ ...formData, stock: value });
        }
    };

    const resetForm = () => {
        setFormData({
            name: '', price: 0, original_price: 0, category: 'Scarves',
            image: '', color: '', color_hex: '#000000', badge: '',
            size: '110x110', stock: 0, variants: [] as Variant[]
        });
        setNewVariant({ color: '', colorHex: '#000000', image: '', stock: 50 });
        setEditingId(null);
        setIsFormOpen(false);
    };

    const handleEdit = (product: any) => {
        const variantsWithStock = (product.variants || []).map((v: Variant) => ({
            ...v,
            stock: v.stock !== undefined ? v.stock : 50
        }));
        setFormData({
            name: product.name,
            price: product.price,
            original_price: product.original_price || 0,
            category: product.category,
            image: product.image,
            color: product.color,
            color_hex: product.color_hex,
            badge: product.badge || '',
            size: Array.isArray(product.size) ? product.size.join(', ') : product.size,
            stock: product.stock || 0,
            variants: variantsWithStock
        });
        setEditingId(product.id);
        setIsFormOpen(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    // Image Upload — saves to local public/images via Express API
    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>,
        field: 'main' | 'variant' | 'edit_variant',
        variantIndex?: number
    ) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setUploading(true);

        try {
            const formDataUpload = new FormData();
            formDataUpload.append('image', file);

            const res = await fetch(`${API_BASE}/api/products`, {
                method: 'POST',
                body: formDataUpload,
            });
            if (!res.ok) throw new Error('Upload failed');
            const data = await res.json();

            // The image path from server
            const imagePath = data.image || `/images/${file.name}`;

            if (field === 'main') {
                setFormData({ ...formData, image: imagePath });
            } else if (field === 'variant') {
                setNewVariant({ ...newVariant, image: imagePath });
            } else if (field === 'edit_variant' && variantIndex !== undefined) {
                const updated = [...formData.variants];
                updated[variantIndex] = { ...updated[variantIndex], image: imagePath };
                setFormData({ ...formData, variants: updated });
            }
        } catch (error: any) {
            showNotification('Error uploading image: ' + error.message, 'error');
        } finally {
            setUploading(false);
        }
    };

    // Variant Handlers
    const addVariant = () => {
        if (!newVariant.color || !newVariant.image) {
            showNotification('Please provide at least a Color Name and Image', 'error');
            return;
        }
        setFormData({ ...formData, variants: [...formData.variants, newVariant] });
        setNewVariant({ color: '', colorHex: '#000000', image: '', stock: 50 });
    };

    const removeVariant = (index: number) => {
        const updated = [...formData.variants];
        updated.splice(index, 1);
        setFormData({ ...formData, variants: updated });
    };

    const updateVariantField = (index: number, field: keyof Variant, value: any) => {
        const updated = [...formData.variants];
        updated[index] = { ...updated[index], [field]: value };
        setFormData({ ...formData, variants: updated });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Determine if there's a new image file to upload
        const formEl = e.target as HTMLFormElement;
        const fileInput = formEl.querySelector<HTMLInputElement>('input[type="file"]');
        const file = fileInput?.files?.[0];

        try {
            const totalStock = formData.variants.length > 0
                ? formData.variants.reduce((acc, v) => acc + (Number(v.stock) || 0), 0)
                : Number(formData.stock);

            // Build FormData for multipart upload
            const payload = new FormData();
            payload.append('name', formData.name);
            payload.append('price', String(formData.price));
            payload.append('originalPrice', String(formData.original_price || 0));
            payload.append('category', formData.category);
            payload.append('size', formData.size);
            payload.append('color', formData.color);
            payload.append('colorHex', formData.color_hex);
            payload.append('badge', formData.badge);
            payload.append('stock', String(totalStock));

            // If no new file selected, pass existing image path
            if (!file && formData.image) {
                payload.append('image', formData.image);
            }
            if (file) {
                payload.append('image', file);
            }

            const url = editingId
                ? `${API_BASE}/api/products/${editingId}`
                : `${API_BASE}/api/products`;
            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, { method, body: payload });
            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.error || `HTTP ${res.status}`);
            }

            resetForm();
            refresh();
            showNotification('Product saved successfully!', 'success');
        } catch (err: any) {
            console.error('Save error:', err);
            showNotification('Error saving product: ' + err.message, 'error');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            const res = await fetch(`${API_BASE}/api/products/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            showNotification('Product deleted successfully', 'success');
            refresh();
        } catch (err: any) {
            showNotification('Error deleting product: ' + err.message, 'error');
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
                    className={`text-[10px] uppercase font-bold tracking-[0.3em] px-8 py-4 transition-all duration-500 shadow-sm ${isFormOpen ? 'bg-secondary text-white' : 'bg-primary text-white hover:bg-accent-gold'}`}
                >
                    {isFormOpen ? 'Cancel' : 'Add New Creation'}
                </button>
            </div>

            {isFormOpen && (
                <motion.form
                    ref={formRef}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="bg-white p-10 border border-black/5 mb-12 shadow-xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="md:col-span-2">
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Product Name</label>
                            <input type="text" required
                                className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Stock Level</label>
                            <input type="number" required
                                className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                                value={formData.stock}
                                onChange={e => handleGlobalStockChange(Number(e.target.value))} />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Price (IDR)</label>
                            <input type="number" required
                                className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                                value={formData.price}
                                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Original Price</label>
                            <input type="number"
                                className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                                value={formData.original_price}
                                onChange={e => setFormData({ ...formData, original_price: Number(e.target.value) })} />
                        </div>
                        <div>
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Category</label>
                            <select className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors appearance-none"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value as any })}>
                                <option>Scarves</option><option>Dresses</option><option>Bergo</option><option>Pray Set</option>
                            </select>
                        </div>
                        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1 mb-2 block">Image</label>
                                <div className="flex flex-col gap-2">
                                    <input type="text"
                                        className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                                        value={formData.image}
                                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="Paste URL or Upload" />
                                    <label className={`cursor-pointer text-secondary text-[10px] font-bold uppercase tracking-widest py-3 px-4 text-center transition-colors ${uploading ? 'bg-black/10' : 'bg-black/5 hover:bg-black/10'}`}>
                                        <span>{uploading ? 'Uploading...' : 'Click to Upload Image'}</span>
                                        <input type="file" className="hidden" accept="image/*"
                                            onChange={(e) => handleImageUpload(e, 'main')} disabled={uploading} />
                                    </label>
                                </div>
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Sizes (comma sep)</label>
                                <input type="text"
                                    className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                                    value={formData.size}
                                    onChange={e => setFormData({ ...formData, size: e.target.value })} />
                            </div>
                            <div>
                                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Default Color</label>
                                <input type="text"
                                    className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                                    value={formData.color}
                                    onChange={e => setFormData({ ...formData, color: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    {/* Variants Section */}
                    <div className="border-t border-black/5 pt-8 mb-8">
                        <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] mb-6 block text-primary">Color Variants</h3>
                        <div className="grid grid-cols-1 gap-4 mb-6">
                            <AnimatePresence>
                                {formData.variants.map((variant, idx) => (
                                    <motion.div key={idx} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                        className="bg-surface-secondary p-4 border border-black/5 relative">
                                        <div className="flex flex-col md:flex-row gap-6 items-start">
                                            <div className="w-20 h-20 flex-shrink-0 bg-white border border-black/10">
                                                <img src={variant.image} alt={variant.color} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
                                                <div>
                                                    <label className="text-[8px] uppercase tracking-widest mb-1 block opacity-50">Name</label>
                                                    <input type="text" className="bg-white border-b border-black/5 p-2 text-[10px] font-bold tracking-widest w-full"
                                                        value={variant.color} onChange={(e) => updateVariantField(idx, 'color', e.target.value)} />
                                                </div>
                                                <div>
                                                    <label className="text-[8px] uppercase tracking-widest mb-1 block opacity-50">Stock</label>
                                                    <input type="number" className="bg-white border-b border-black/5 p-2 text-[10px] font-bold tracking-widest w-full"
                                                        value={variant.stock} onChange={(e) => updateVariantField(idx, 'stock', Number(e.target.value))} />
                                                </div>
                                                <div>
                                                    <label className="text-[8px] uppercase tracking-widest mb-1 block opacity-50">Hex</label>
                                                    <div className="flex gap-2">
                                                        <input type="color" value={variant.colorHex || '#000000'} className="w-8 h-8 p-0 border-none cursor-pointer"
                                                            onChange={(e) => updateVariantField(idx, 'colorHex', e.target.value)} />
                                                        <input type="text" className="bg-white border-b border-black/5 p-2 text-[10px] font-bold tracking-widest w-full"
                                                            value={variant.colorHex} onChange={(e) => updateVariantField(idx, 'colorHex', e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 lg:col-span-2">
                                                    <label className="text-[8px] uppercase tracking-widest mb-1 block opacity-50">Image Source</label>
                                                    <div className="flex gap-2">
                                                        <input type="text" className="bg-white border-b border-black/5 p-2 text-[10px] font-bold tracking-widest w-full"
                                                            value={variant.image} onChange={(e) => updateVariantField(idx, 'image', e.target.value)} />
                                                        <label className="cursor-pointer bg-white border border-black/10 hover:bg-black hover:text-white p-2 flex items-center justify-center transition-colors min-w-[80px]">
                                                            <span className="text-[9px] uppercase font-bold">{uploading ? '...' : 'Upload'}</span>
                                                            <input type="file" className="hidden" accept="image/*"
                                                                onChange={(e) => handleImageUpload(e, 'edit_variant', idx)} disabled={uploading} />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" onClick={() => removeVariant(idx)}
                                                className="absolute top-2 right-2 md:static md:mt-0 text-red-400 hover:text-red-600 p-2" title="Remove Variant">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Add Variant Form */}
                        <div className="bg-surface-secondary p-6 border border-dashed border-black/20">
                            <h4 className="text-[9px] uppercase font-bold tracking-widest mb-4 opacity-50">Add New Variant</h4>
                            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                <div>
                                    <label className="text-[8px] uppercase tracking-widest mb-1 block opacity-50">Color Name</label>
                                    <input type="text" className="bg-white border-b border-black/5 p-2 text-[10px] font-bold tracking-widest w-full"
                                        value={newVariant.color} onChange={e => setNewVariant({ ...newVariant, color: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-[8px] uppercase tracking-widest mb-1 block opacity-50">Stock</label>
                                    <input type="number" className="bg-white border-b border-black/5 p-2 text-[10px] font-bold tracking-widest w-full"
                                        value={newVariant.stock} onChange={e => setNewVariant({ ...newVariant, stock: Number(e.target.value) })} />
                                </div>
                                <div>
                                    <label className="text-[8px] uppercase tracking-widest mb-1 block opacity-50">Hex</label>
                                    <div className="flex gap-2">
                                        <input type="color" value={newVariant.colorHex} className="w-8 h-8 p-0 border-none cursor-pointer"
                                            onChange={e => setNewVariant({ ...newVariant, colorHex: e.target.value })} />
                                        <input type="text" className="bg-white border-b border-black/5 p-2 text-[10px] font-bold tracking-widest w-full"
                                            value={newVariant.colorHex} onChange={e => setNewVariant({ ...newVariant, colorHex: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[8px] uppercase tracking-widest mb-1 block opacity-50">Image</label>
                                    <div className="flex gap-2">
                                        <input type="text" className="bg-white border-b border-black/5 p-2 text-[10px] font-bold tracking-widest w-full"
                                            value={newVariant.image} onChange={e => setNewVariant({ ...newVariant, image: e.target.value })} />
                                        <label className="cursor-pointer bg-white border border-black/10 hover:bg-black hover:text-white p-2 flex items-center justify-center transition-colors min-w-[70px]">
                                            <span className="text-[8px] uppercase font-bold">Up</span>
                                            <input type="file" className="hidden" accept="image/*"
                                                onChange={(e) => handleImageUpload(e, 'variant')} disabled={uploading} />
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-end">
                                    <button type="button" onClick={addVariant}
                                        className="w-full bg-primary text-white py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-accent-gold transition-colors">
                                        Add Variant
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit"
                        className="w-full bg-primary text-white py-5 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-accent-gold transition-all duration-500 shadow-xl">
                        {editingId ? 'Update Creation' : 'Add to Atelier'}
                    </button>
                </motion.form>
            )}

            {/* Product List */}
            <div className="space-y-4">
                {products.map(product => (
                    <div key={product.id} className="bg-white p-6 border border-black/5 flex gap-6 items-center group hover:border-accent-gold/30 transition-colors">
                        <div className="w-16 h-16 flex-shrink-0 bg-surface-secondary border border-black/5">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-[11px] font-bold uppercase tracking-widest truncate">{product.name}</h3>
                            <p className="text-[9px] text-secondary uppercase tracking-widest mt-1">
                                {product.category} — Rp {Number(product.price).toLocaleString('id-ID')}
                                {product.stock !== undefined && ` — Stock: ${product.stock}`}
                            </p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(product)}
                                className="text-[9px] uppercase font-bold tracking-widest px-4 py-2 bg-surface-secondary hover:bg-primary hover:text-white transition-colors">Edit</button>
                            <button onClick={() => handleDelete(product.id)}
                                className="text-[9px] uppercase font-bold tracking-widest px-4 py-2 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductManager;
