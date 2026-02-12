import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useProducts } from '../../hooks/useProducts';

// Define Variant Interface
interface Variant {
    color: string;
    colorHex: string;
    image: string;
    stock: number;
}

const ProductManager = () => {
    const { products, loading, refresh } = useProducts();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
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
        stock: 0, // Keep for backward compatibility or total display
        variants: [] as Variant[]
    });

    // Variant Form State (for adding new ones)
    const [newVariant, setNewVariant] = useState<Variant>({
        color: '',
        colorHex: '#000000',
        image: '',
        stock: 50 // Default stock for new variant
    });

    // ... (resetForm and handleEdit logic updated to include stock)
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
            stock: 0,
            variants: [] as Variant[]
        });
        setNewVariant({ color: '', colorHex: '#000000', image: '', stock: 50 });
        setEditingId(null);
        setIsFormOpen(false);
    };

    const handleEdit = (product: any) => {
        // Ensure variants have stock property if missing
        const variantsWithStock = (product.variants || []).map((v: Variant) => ({
            ...v,
            stock: v.stock !== undefined ? v.stock : 50 // Default fallback
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

    // Image Upload Handler
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'main' | 'variant' | 'edit_variant', variantIndex?: number) => {
        if (!e.target.files || e.target.files.length === 0) return;

        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `admin_uploads/${fileName}`;

        setUploading(true);
        setUploadProgress(0);

        // Simulate progress since Supabase client doesn't expose it easily for simple uploads
        const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 90) return prev;
                return prev + 10;
            });
        }, 200);

        try {
            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) throw uploadError;

            // Clear simulated progress
            clearInterval(progressInterval);
            setUploadProgress(100);

            const { data } = supabase.storage
                .from('products')
                .getPublicUrl(filePath);

            const publicUrl = data.publicUrl;

            if (field === 'main') {
                setFormData({ ...formData, image: publicUrl });
            } else if (field === 'variant') {
                setNewVariant({ ...newVariant, image: publicUrl });
            } else if (field === 'edit_variant' && variantIndex !== undefined) {
                const updated = [...formData.variants];
                updated[variantIndex] = { ...updated[variantIndex], image: publicUrl };
                setFormData({ ...formData, variants: updated });
            }

        } catch (error: any) {
            console.error('Upload error:', error);
            alert('Error uploading image: ' + error.message);
        } finally {
            clearInterval(progressInterval);
            // Delay turning off uploading state slightly so user sees 100%
            setTimeout(() => {
                setUploading(false);
                setUploadProgress(0);
            }, 500);
        }
    };

    // Variant Handlers
    const addVariant = () => {
        if (!newVariant.color || !newVariant.image) {
            alert('Please provide at least a Color Name and Image URL');
            return;
        }
        setFormData({
            ...formData,
            variants: [...formData.variants, newVariant]
        });
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
        try {
            // Calculate total stock from variants if available
            const totalStock = formData.variants.length > 0
                ? formData.variants.reduce((acc, v) => acc + (Number(v.stock) || 0), 0)
                : Number(formData.stock);

            const payload = {
                name: formData.name,
                category: formData.category,
                image: formData.image,
                color: formData.color,
                color_hex: formData.color_hex,
                badge: formData.badge,
                size: formData.size.split(',').map(s => s.trim()),
                price: Number(formData.price),
                original_price: formData.original_price ? Number(formData.original_price) : null,
                stock: totalStock, // Update main stock based on variants sum
                variants: formData.variants
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
            alert('Product saved successfully!');
        } catch (err: any) {
            console.error('Save error:', err);
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
                    ref={formRef}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleSubmit}
                    className="bg-white p-10 border border-black/5 mb-12 shadow-xl"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {/* Basic Info */}
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
                            <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Stock Level (Global)</label>
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
                                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1 mb-2 block">Default Image URL</label>
                                <div className="flex flex-col gap-2">
                                    <input
                                        type="text"
                                        className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                                        value={formData.image}
                                        onChange={e => setFormData({ ...formData, image: e.target.value })}
                                        placeholder="Enter URL or Upload"
                                    />
                                    <label className={`cursor-pointer text-secondary text-[10px] font-bold uppercase tracking-widest py-3 px-4 text-center transition-colors relative overflow-hidden ${uploading ? 'bg-black/10' : 'bg-black/5 hover:bg-black/10'}`}>
                                        <div className="relative z-10">
                                            {uploading ? `Uploading... ${uploadProgress}%` : 'Click to Upload Image'}
                                        </div>
                                        {uploading && (
                                            <motion.div
                                                className="absolute inset-0 bg-accent-gold/20"
                                                initial={{ width: '0%' }}
                                                animate={{ width: `${uploadProgress}%` }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        )}
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, 'main')}
                                            disabled={uploading}
                                        />
                                    </label>
                                </div>
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
                                <label className="text-[10px] uppercase font-bold tracking-widest text-secondary ml-1">Default Color</label>
                                <input
                                    type="text"
                                    className="w-full bg-surface-secondary border-b border-black/5 p-4 text-[11px] font-bold tracking-[0.2em] focus:outline-none focus:border-accent-gold transition-colors"
                                    value={formData.color}
                                    onChange={e => setFormData({ ...formData, color: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Variants Section */}
                    <div className="border-t border-black/5 pt-8 mb-8">
                        <h3 className="text-[10px] uppercase font-bold tracking-[0.4em] mb-6 block text-primary">Color Variants</h3>

                        <div className="grid grid-cols-1 gap-4 mb-6">
                            <AnimatePresence>
                                {formData.variants.map((variant, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-surface-secondary p-4 border border-black/5 relative"
                                    >
                                        <div className="flex flex-col md:flex-row gap-6 items-start">
                                            {/* Preview */}
                                            <div className="w-20 h-20 flex-shrink-0 bg-white border border-black/10">
                                                <img src={variant.image} alt={variant.color} className="w-full h-full object-cover" />
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
                                                <div className="lg:col-span-1">
                                                    <label className="text-[8px] uppercase tracking-widest mb-1 block opacity-50">Name</label>
                                                    <input
                                                        type="text"
                                                        className="bg-white border-b border-black/5 p-2 text-[10px] font-bold tracking-widest w-full"
                                                        value={variant.color}
                                                        onChange={(e) => updateVariantField(idx, 'color', e.target.value)}
                                                    />
                                                </div>
                                                <div className="lg:col-span-1">
                                                    <label className="text-[8px] uppercase tracking-widest mb-1 block opacity-50">Stock</label>
                                                    <input
                                                        type="number"
                                                        className="bg-white border-b border-black/5 p-2 text-[10px] font-bold tracking-widest w-full"
                                                        value={variant.stock}
                                                        onChange={(e) => updateVariantField(idx, 'stock', Number(e.target.value))}
                                                    />
                                                </div>
                                                <div className="lg:col-span-1">
                                                    <label className="text-[8px] uppercase tracking-widest mb-1 block opacity-50">Hex</label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="color"
                                                            value={variant.colorHex || '#000000'}
                                                            className="w-8 h-8 p-0 border-none cursor-pointer"
                                                            onChange={(e) => updateVariantField(idx, 'colorHex', e.target.value)}
                                                        />
                                                        <input
                                                            type="text"
                                                            className="bg-white border-b border-black/5 p-2 text-[10px] font-bold tracking-widest w-full"
                                                            value={variant.colorHex}
                                                            onChange={(e) => updateVariantField(idx, 'colorHex', e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="md:col-span-2 lg:col-span-2">
                                                    <label className="text-[8px] uppercase tracking-widest mb-1 block opacity-50">Image Source</label>
                                                    <div className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            className="bg-white border-b border-black/5 p-2 text-[10px] font-bold tracking-widest w-full"
                                                            value={variant.image}
                                                            onChange={(e) => updateVariantField(idx, 'image', e.target.value)}
                                                        />
                                                        <label className="cursor-pointer bg-white border border-black/10 hover:bg-black hover:text-white p-2 flex items-center justify-center transition-colors min-w-[80px]">
                                                            <span className="text-[9px] uppercase font-bold">
                                                                {uploading ? `${uploadProgress}%` : 'Upload'}
                                                            </span>
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                accept="image/*"
                                                                onChange={(e) => handleImageUpload(e, 'edit_variant', idx)}
                                                                disabled={uploading}
                                                            />
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                type="button"
                                                onClick={() => removeVariant(idx)}
                                                className="absolute top-2 right-2 md:static md:mt-0 text-red-400 hover:text-red-600 p-2"
                                                title="Remove Variant"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Add New Variant */}
                        <div className="bg-white border border-dashed border-black/20 p-6 flex flex-col gap-4">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-secondary">Add New Variant</span>
                            <div className="flex flex-col md:flex-row gap-4 items-end">
                                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Color Name"
                                            className="w-full bg-surface-secondary border-b border-black/5 p-3 text-[11px]"
                                            value={newVariant.color}
                                            onChange={(e) => setNewVariant({ ...newVariant, color: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="number"
                                            placeholder="Stock"
                                            className="w-full bg-surface-secondary border-b border-black/5 p-3 text-[11px]"
                                            value={newVariant.stock}
                                            onChange={(e) => setNewVariant({ ...newVariant, stock: Number(e.target.value) })}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            className="w-10 h-10 p-1 border border-black/10 cursor-pointer bg-white"
                                            value={newVariant.colorHex}
                                            onChange={(e) => setNewVariant({ ...newVariant, colorHex: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            placeholder="Hex"
                                            className="w-full bg-surface-secondary border-b border-black/5 p-3 text-[11px]"
                                            value={newVariant.colorHex}
                                            onChange={(e) => setNewVariant({ ...newVariant, colorHex: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Image URL"
                                            className="w-full bg-surface-secondary border-b border-black/5 p-3 text-[11px]"
                                            value={newVariant.image}
                                            onChange={(e) => setNewVariant({ ...newVariant, image: e.target.value })}
                                        />
                                        <label className="flex-shrink-0 cursor-pointer bg-black text-white hover:bg-black/80 p-3 text-[10px] font-bold uppercase flex items-center justify-center transition-colors min-w-[80px]">
                                            {uploading ? `${uploadProgress}%` : 'Upload'}
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, 'variant')}
                                                disabled={uploading}
                                            />
                                        </label>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={addVariant}
                                    className="bg-secondary text-white px-6 py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-primary transition-colors whitespace-nowrap"
                                >
                                    + Add Variant
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <button type="submit" disabled={uploading} className="w-full bg-primary text-white py-5 text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-accent-gold transition-all duration-500 shadow-xl disabled:opacity-50">
                            {uploading ? 'Uploading Images...' : (editingId ? 'Update Creation' : 'Archive to Atelier')}
                        </button>
                    </div>
                </motion.form>
            )}

            <div className="bg-white border border-black/5 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-black/5 bg-gray-50/50">
                            <th className="p-6 text-[10px] uppercase font-bold tracking-widest text-secondary">Product</th>
                            <th className="p-6 text-[10px] uppercase font-bold tracking-widest text-secondary text-center">Variants</th>
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
                                            <span className="text-[11px] font-bold uppercase tracking-widest block text-primary">{product.name}</span>
                                            <span className="text-[9px] text-secondary uppercase tracking-widest">{product.category}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6 text-center">
                                    <div className="flex justify-center -space-x-1">
                                        {Array.isArray(product.variants) && product.variants.length > 0 ? (
                                            <>
                                                {product.variants.slice(0, 4).map((v: any, i: number) => (
                                                    <div key={i} className="w-5 h-5 rounded-full border border-white shadow-sm" style={{ backgroundColor: v.colorHex }} title={v.color} />
                                                ))}
                                                {product.variants.length > 4 && (
                                                    <div className="w-5 h-5 rounded-full border border-white bg-gray-200 flex items-center justify-center text-[8px] font-bold text-secondary">
                                                        +{product.variants.length - 4}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <span className="text-[9px] text-secondary tracking-widest italic">No Variants</span>
                                        )}
                                    </div>
                                </td>
                                <td className="p-6 text-[11px] font-bold tracking-widest text-right">Rp {product.price.toLocaleString()}</td>
                                <td className="p-6 text-center">
                                    <span className={`text-[10px] font-bold px-3 py-1 bg-surface-secondary tracking-widest ${(product.stock || 0) <= 5 ? 'text-red-500' : 'text-primary'
                                        }`}>
                                        {product.stock || 0}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex items-center justify-end gap-4 opacity-50 group-hover:opacity-100 transition-opacity">
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
