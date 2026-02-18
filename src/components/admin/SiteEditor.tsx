import { useState, useEffect, useRef } from 'react';
import { useSiteSettings } from '../../hooks/useSiteSettings';
import { supabase } from '../../lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '../../hooks/useProducts';
import { useNotification } from '../../context/NotificationContext';

const DEFAULT_ANNOUNCEMENTS = [
    "🌙 Pre-Raya Special: Luxury Hampers & Signature Scarves Highlights",
    "🌍 International Shipping Available",
    "✨ Complimentary Shipping on Orders over Rp 500.000",
    "🎁 Use DEENHA10 for 10% off your first purchase"
];

const DEFAULT_SLIDES = [
    {
        type: 'video',
        src: "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/promo_video.mp4",
        title: "",
        subtitle: "",
        description: "."
    },
    {
        type: 'video',
        src: "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/summer_collection.mp4",
        title: "",
        subtitle: "",
        description: "."
    },
    {
        type: 'video',
        src: "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/vintage_flower.mp4",
        title: "",
        subtitle: "",
        description: "  ."
    },
    {
        type: 'video',
        src: "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/pashmina_crinkle.mp4",
        title: "",
        subtitle: "",
        description: ""
    },
    {
        type: 'video',
        src: "https://tdvkvhozebzetchmgzhb.supabase.co/storage/v1/object/public/products/hero/hampers_mukena.mp4",
        title: "",
        subtitle: "",
        description: ""
    }
];

const DEFAULT_HIGHLIGHTS = [
    {
        title: "Pre-Raya Special",
        bannerImage: "/images/hampers-1-dWxvylrBJ6IBxzqB.jpg",
        collectionTitle: "Luxury Hampers",
        collectionDescription: "The perfect gift of gratitude. Our curated Raya hampers are elegantly packaged with our signature touch, making them the ultimate way to share joy with your loved ones.",
        category: "Hampers",
        productIds: []
    },
    {
        title: "Raya Essentials",
        bannerImage: "/images/image-1-m5KMww5a1eHrGa7j.jpg",
        collectionTitle: "Signature Scarves",
        collectionDescription: "Discover our most-loved Monogram and Crystal series. Crafted from premium voal for effortless elegance during your Raya celebrations.",
        category: "Scarves",
        productIds: []
    },
    {
        title: "New Season",
        bannerImage: "/images/new-arrival-mv0WD7ngy7FZoWXE.jpg",
        collectionTitle: "Pre-Raya Lookbook",
        collectionDescription: "From timeless silhouettes to modern modest wear, explore our latest release designed specifically for the upcoming holy season.",
        category: "New Arrival",
        productIds: []
    },
    {
        title: "Spiritual Series",
        bannerImage: "/images/image-product-3-YKb36NKv2VHk924E.jpg",
        collectionTitle: "Prayer Sets",
        collectionDescription: "Experience serenity in every prayer with our premium prayer sets, featuring delicate lace and breathable fabrics for ultimate comfort.",
        category: "Pray Set",
        productIds: []
    }
];

const SiteEditor = () => {
    const { settings, loading, updateSetting } = useSiteSettings();
    const { showNotification } = useNotification();
    const [localSettings, setLocalSettings] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null); // section-index-field
    const [uploadProgress, setUploadProgress] = useState(0);
    const { products } = useProducts();
    const [searchTerms, setSearchTerms] = useState<Record<number, string>>({});
    const searchRefs = useRef<Record<number, HTMLDivElement | null>>({});

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            Object.keys(searchRefs.current).forEach((key) => {
                const index = parseInt(key);
                const ref = searchRefs.current[index];
                if (ref && !ref.contains(event.target as Node)) {
                    setSearchTerms(prev => {
                        if (!prev[index]) return prev;
                        const next = { ...prev };
                        delete next[index];
                        return next;
                    });
                }
            });
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        if (!loading && settings) {
            setLocalSettings({
                announcements: settings.announcements || DEFAULT_ANNOUNCEMENTS,
                hero_slides: settings.hero_slides || DEFAULT_SLIDES,
                home_highlights: settings.home_highlights || DEFAULT_HIGHLIGHTS,
                tiktok_live_settings: settings.tiktok_live_settings || { mode: 'auto', is_live: false }
            });
        }
    }, [loading, settings]);

    const handleSave = async (key: string) => {
        setIsSaving(true);
        const { success } = await updateSetting(key, localSettings[key]);
        setIsSaving(false);
        if (success) {
            showNotification(`${key.replace('_', ' ')} updated successfully!`, 'success');
        } else {
            showNotification('Failed to update settings', 'error');
        }
    };

    const updateNestedValue = (key: string, index: number, field: string, value: any) => {
        const updated = [...localSettings[key]];
        updated[index] = { ...updated[index], [field]: value };
        setLocalSettings({ ...localSettings, [key]: updated });
    };

    const removeRow = (key: string, index: number) => {
        const updated = [...localSettings[key]];
        updated.splice(index, 1);
        setLocalSettings({ ...localSettings, [key]: updated });
    };

    const addRow = (key: string, template: any) => {
        setLocalSettings({ ...localSettings, [key]: [...localSettings[key], template] });
    };

    const toggleProductId = (sectionIndex: number, productId: number) => {
        const currentIds = localSettings.home_highlights[sectionIndex].productIds || [];
        const productIdStr = String(productId);
        let updatedIds: string[];

        if (currentIds.includes(productIdStr)) {
            updatedIds = currentIds.filter((id: string) => id !== productIdStr);
        } else {
            if (currentIds.length >= 4) {
                showNotification("Maximum 4 products per section", "error");
                return;
            }
            updatedIds = [...currentIds, productIdStr];
        }

        updateNestedValue('home_highlights', sectionIndex, 'productIds', updatedIds);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string, index: number, field: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const uploadId = `${key}-${index}-${field}`;
        setUploading(uploadId);
        setUploadProgress(0);

        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `site/${fileName}`;

        const progressInterval = setInterval(() => {
            setUploadProgress(prev => Math.min(prev + 10, 90));
        }, 100);

        try {
            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            clearInterval(progressInterval);
            setUploadProgress(100);

            const { data } = supabase.storage
                .from('products')
                .getPublicUrl(filePath);

            updateNestedValue(key, index, field, data.publicUrl);
        } catch (err: any) {
            console.error('Upload error:', err);
            showNotification('Error uploading image: ' + err.message, 'error');
        } finally {
            clearInterval(progressInterval);
            setTimeout(() => {
                setUploading(null);
                setUploadProgress(0);
            }, 500);
        }
    };

    if (loading || !localSettings) return (
        <div className="p-20 text-center">
            <div className="w-8 h-8 border-2 border-accent-gold border-t-transparent animate-spin mx-auto mb-4" />
            <p className="text-secondary text-[10px] uppercase tracking-widest">Loading Editor...</p>
        </div>
    );

    return (
        <div className="p-8 space-y-12">
            <h2 className="font-display text-2xl mb-8">Site Appearance Editor</h2>

            {/* TikTok Live Management Section */}
            <section className="bg-white border border-black/5 p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-[11px] uppercase font-bold tracking-widest">TikTok Live Management</h3>
                        <p className="text-[10px] text-secondary mt-1 italic">Control the "Live Now" banner and popup status</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-[10px] uppercase font-bold tracking-widest opacity-60 block">Management Mode</label>
                        <div className="flex flex-wrap gap-3">
                            {[
                                { id: 'auto', label: 'Auto Detect', desc: 'Checks TikTok API hourly' },
                                { id: 'manual-on', label: 'Force Live', desc: 'Always show as LIVE' },
                                { id: 'manual-off', label: 'Force Offline', desc: 'Never show LIVE UI' }
                            ].map((mode) => (
                                <button
                                    key={mode.id}
                                    onClick={() => {
                                        const current = localSettings.tiktok_live_settings || { mode: 'auto' };
                                        const updated = {
                                            ...current,
                                            mode: mode.id === 'auto' ? 'auto' : 'manual',
                                            manual_status: mode.id === 'manual-on' ? 'on' : 'off'
                                        };
                                        setLocalSettings({ ...localSettings, tiktok_live_settings: updated });
                                        updateSetting('tiktok_live_settings', updated);
                                        showNotification(`TikTok Live set to ${mode.label}`, 'success');
                                    }}
                                    className={`flex-1 min-w-[140px] p-4 text-left border transition-all ${(localSettings.tiktok_live_settings?.mode === 'auto' && mode.id === 'auto') ||
                                        (localSettings.tiktok_live_settings?.mode === 'manual' && localSettings.tiktok_live_settings?.manual_status === 'on' && mode.id === 'manual-on') ||
                                        (localSettings.tiktok_live_settings?.mode === 'manual' && localSettings.tiktok_live_settings?.manual_status === 'off' && mode.id === 'manual-off')
                                        ? 'border-accent-gold bg-accent-gold/5 ring-1 ring-accent-gold'
                                        : 'border-black/10 hover:border-black/20 bg-white'
                                        }`}
                                >
                                    <div className="text-[10px] font-bold uppercase tracking-widest mb-1">{mode.label}</div>
                                    <div className="text-[8px] text-secondary lowercase tracking-wider">{mode.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-surface-secondary/50 p-6 flex flex-col justify-center">
                        <div className="space-y-4">
                            <div>
                                <p className="text-[9px] uppercase tracking-widest text-secondary opacity-60 mb-2">Current Status Indicator</p>
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${localSettings.tiktok_live_settings?.is_live || (localSettings.tiktok_live_settings?.mode === 'manual' && localSettings.tiktok_live_settings?.manual_status === 'on') ? 'bg-red-500 animate-pulse' : 'bg-gray-300'}`} />
                                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                                        {localSettings.tiktok_live_settings?.is_live || (localSettings.tiktok_live_settings?.mode === 'manual' && localSettings.tiktok_live_settings?.manual_status === 'on') ? 'Live on Website' : 'Offline on Website'}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-black/5">
                                <p className="text-[8px] text-secondary uppercase tracking-widest">
                                    Last Checked TikTok: {localSettings.tiktok_live_settings?.last_checked ? new Date(localSettings.tiktok_live_settings.last_checked).toLocaleString() : 'Never'}
                                </p>
                                {localSettings.tiktok_live_settings?.viewer_count > 0 && (
                                    <p className="text-[8px] text-accent-gold font-bold uppercase tracking-widest mt-1">
                                        Current Viewers: {localSettings.tiktok_live_settings.viewer_count}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Home Highlights Section */}
            <section className="bg-white border border-black/5 p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-[11px] uppercase font-bold tracking-widest">Home Collections</h3>
                        <p className="text-[10px] text-secondary mt-1 italic">The high-impact sections on homepage</p>
                    </div>
                    <button
                        onClick={() => handleSave('home_highlights')}
                        disabled={isSaving}
                        className="bg-primary text-white text-[10px] uppercase font-bold tracking-widest px-6 py-2 hover:bg-accent-gold transition-colors disabled:opacity-50"
                    >
                        Save Collections
                    </button>
                </div>

                <div className="space-y-8">
                    {localSettings.home_highlights?.map((h: any, i: number) => (
                        <div key={i} className="border border-black/5 p-6 space-y-4 relative bg-surface-secondary/30">
                            <button
                                onClick={() => removeRow('home_highlights', i)}
                                className="absolute top-4 right-4 text-red-400 hover:text-red-600"
                            >
                                Remove
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase font-bold tracking-widest opacity-60">Small Title</label>
                                    <input
                                        type="text"
                                        value={h.title}
                                        onChange={(e) => updateNestedValue('home_highlights', i, 'title', e.target.value)}
                                        className="w-full border border-black/10 px-3 py-2 text-sm outline-none focus:border-accent-gold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase font-bold tracking-widest opacity-60">Collection Heading</label>
                                    <input
                                        type="text"
                                        value={h.collectionTitle}
                                        onChange={(e) => updateNestedValue('home_highlights', i, 'collectionTitle', e.target.value)}
                                        className="w-full border border-black/10 px-3 py-2 outline-none focus:border-accent-gold font-display text-lg"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[9px] uppercase font-bold tracking-widest opacity-60">Description</label>
                                    <textarea
                                        value={h.collectionDescription}
                                        onChange={(e) => updateNestedValue('home_highlights', i, 'collectionDescription', e.target.value)}
                                        className="w-full border border-black/10 px-3 py-2 text-sm outline-none focus:border-accent-gold h-20 resize-none italic"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase font-bold tracking-widest opacity-60">Banner Image</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={h.bannerImage}
                                            onChange={(e) => updateNestedValue('home_highlights', i, 'bannerImage', e.target.value)}
                                            className="flex-1 border border-black/10 px-3 py-2 text-[11px] outline-none focus:border-accent-gold"
                                            placeholder="URL or Upload"
                                        />
                                        <label className={`cursor-pointer bg-black/5 hover:bg-black/10 px-4 py-2 text-[9px] uppercase font-bold tracking-widest flex items-center justify-center min-w-[100px] relative overflow-hidden ${uploading === `home_highlights-${i}-bannerImage` ? 'opacity-50' : ''}`}>
                                            {uploading === `home_highlights-${i}-bannerImage` ? `${uploadProgress}%` : 'Upload'}
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, 'home_highlights', i, 'bannerImage')}
                                                disabled={!!uploading}
                                            />
                                            {uploading === `home_highlights-${i}-bannerImage` && (
                                                <motion.div
                                                    className="absolute bottom-0 left-0 h-[2px] bg-accent-gold"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${uploadProgress}%` }}
                                                />
                                            )}
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase font-bold tracking-widest opacity-60">Target Category</label>
                                    <input
                                        type="text"
                                        value={h.category}
                                        onChange={(e) => updateNestedValue('home_highlights', i, 'category', e.target.value)}
                                        className="w-full border border-black/10 px-3 py-2 text-[11px] outline-none focus:border-accent-gold"
                                    />
                                </div>
                                <div className="space-y-4 md:col-span-2">
                                    <label className="text-[9px] uppercase font-bold tracking-widest opacity-60 block">Selected Products (Max 4)</label>

                                    {/* Selected Products List */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {(h.productIds || []).map((id: string) => {
                                            const product = products.find(p => String(p.id) === id);
                                            return (
                                                <div key={id} className="bg-primary text-white text-[9px] px-3 py-2 flex items-center gap-2 group">
                                                    <span className="font-bold tracking-widest uppercase truncate max-w-[120px]">
                                                        {product?.name || `ID: ${id}`}
                                                    </span>
                                                    <button
                                                        onClick={() => toggleProductId(i, Number(id))}
                                                        className="hover:text-accent-gold"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            );
                                        })}
                                        {(!h.productIds || h.productIds.length === 0) && (
                                            <p className="text-[9px] text-secondary opacity-50 uppercase italic">No products selected. Showing top from category.</p>
                                        )}
                                    </div>

                                    {/* Product Search */}
                                    <div className="relative" ref={el => searchRefs.current[i] = el}>
                                        <input
                                            type="text"
                                            value={searchTerms[i] || ''}
                                            onFocus={() => {
                                                if (!searchTerms[i]) setSearchTerms({ ...searchTerms, [i]: ' ' });
                                            }}
                                            onChange={(e) => setSearchTerms({ ...searchTerms, [i]: e.target.value })}
                                            className="w-full border border-black/10 px-3 py-3 text-[10px] outline-none focus:border-accent-gold uppercase tracking-widest"
                                            placeholder="Search product to add..."
                                        />

                                        <AnimatePresence>
                                            {searchTerms[i] && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    className="absolute z-50 left-0 right-0 top-full mt-1 bg-white border border-black/10 shadow-2xl max-h-60 overflow-y-auto"
                                                >
                                                    {products
                                                        .filter(p => p.name.toLowerCase().includes(searchTerms[i].toLowerCase()))
                                                        .slice(0, 5)
                                                        .map(product => (
                                                            <button
                                                                key={product.id}
                                                                onClick={() => {
                                                                    toggleProductId(i, product.id);
                                                                }}
                                                                className="w-full flex items-center gap-4 p-3 hover:bg-surface-secondary text-left transition-colors border-b border-black/5 last:border-0"
                                                            >
                                                                <img src={product.image} className="w-8 h-8 object-cover" alt="" />
                                                                <div className="flex-1">
                                                                    <p className="text-[10px] font-bold uppercase tracking-widest">{product.name}</p>
                                                                    <p className="text-[8px] text-secondary opacity-60 uppercase">{product.category}</p>
                                                                </div>
                                                                <div className="text-accent-gold font-bold text-[10px]">
                                                                    {(h.productIds || []).includes(String(product.id)) ? 'REMOVE' : 'ADD'}
                                                                </div>
                                                            </button>
                                                        ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => addRow('home_highlights', { title: "NEW SECTION", collectionTitle: "Title", collectionDescription: "Desc", bannerImage: "", category: "All", productIds: [] })}
                        className="w-full border-2 border-dashed border-black/10 py-4 text-[10px] uppercase font-bold tracking-widest text-secondary hover:border-accent-gold hover:text-accent-gold transition-all"
                    >
                        + Add New Home Section
                    </button>
                </div>
            </section>

            {/* Banner Slides Section */}
            <section className="bg-white border border-black/5 p-8 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className="text-[11px] uppercase font-bold tracking-widest">Hero Banner Slides</h3>
                        <p className="text-[10px] text-secondary mt-1 italic">Video/Image slides on top of home</p>
                    </div>
                    <button
                        onClick={() => handleSave('hero_slides')}
                        disabled={isSaving}
                        className="bg-primary text-white text-[10px] uppercase font-bold tracking-widest px-6 py-2 hover:bg-accent-gold transition-colors disabled:opacity-50"
                    >
                        Save Slides
                    </button>
                </div>

                <div className="space-y-6">
                    {localSettings.hero_slides?.map((s: any, i: number) => (
                        <div key={i} className="border border-black/5 p-6 bg-surface-secondary/30 relative">
                            <button
                                onClick={() => removeRow('hero_slides', i)}
                                className="absolute top-4 right-4 text-red-400 hover:text-red-600"
                            >
                                Remove
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase font-bold tracking-widest opacity-60">Type</label>
                                    <select
                                        value={s.type}
                                        onChange={(e) => updateNestedValue('hero_slides', i, 'type', e.target.value)}
                                        className="w-full border border-black/10 px-3 py-2 text-[11px] outline-none focus:border-accent-gold"
                                    >
                                        <option value="video">Video</option>
                                        <option value="image">Image</option>
                                    </select>
                                </div>
                                <div className="md:col-span-2 space-y-2">
                                    <label className="text-[9px] uppercase font-bold tracking-widest opacity-60">Media URL</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={s.src}
                                            onChange={(e) => updateNestedValue('hero_slides', i, 'src', e.target.value)}
                                            className="flex-1 border border-black/10 px-3 py-2 text-[11px] outline-none focus:border-accent-gold text-blue-600 underline"
                                        />
                                        <label className={`cursor-pointer bg-black/5 hover:bg-black/10 px-4 py-2 text-[9px] uppercase font-bold tracking-widest flex items-center justify-center min-w-[100px] relative overflow-hidden ${uploading === `hero_slides-${i}-src` ? 'opacity-50' : ''}`}>
                                            {uploading === `hero_slides-${i}-src` ? `${uploadProgress}%` : 'Upload'}
                                            <input
                                                type="file"
                                                className="hidden"
                                                accept={s.type === 'video' ? 'video/*' : 'image/*'}
                                                onChange={(e) => handleImageUpload(e, 'hero_slides', i, 'src')}
                                                disabled={!!uploading}
                                            />
                                            {uploading === `hero_slides-${i}-src` && (
                                                <motion.div
                                                    className="absolute bottom-0 left-0 h-[2px] bg-accent-gold"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${uploadProgress}%` }}
                                                />
                                            )}
                                        </label>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase font-bold tracking-widest opacity-60">Subtitle</label>
                                    <input
                                        type="text"
                                        value={s.subtitle}
                                        onChange={(e) => updateNestedValue('hero_slides', i, 'subtitle', e.target.value)}
                                        className="w-full border border-black/10 px-3 py-2 text-[11px] outline-none focus:border-accent-gold text-accent-gold font-bold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase font-bold tracking-widest opacity-60">Title</label>
                                    <input
                                        type="text"
                                        value={s.title}
                                        onChange={(e) => updateNestedValue('hero_slides', i, 'title', e.target.value)}
                                        className="w-full border border-black/10 px-3 py-2 text-[11px] outline-none focus:border-accent-gold"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] uppercase font-bold tracking-widest opacity-60">Description</label>
                                    <input
                                        type="text"
                                        value={s.description}
                                        onChange={(e) => updateNestedValue('hero_slides', i, 'description', e.target.value)}
                                        className="w-full border border-black/10 px-3 py-2 text-[11px] outline-none focus:border-accent-gold"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button
                        onClick={() => addRow('hero_slides', { type: "image", src: "", title: "", subtitle: "", description: "" })}
                        className="w-full border-2 border-dashed border-black/10 py-4 text-[10px] uppercase font-bold tracking-widest text-secondary hover:border-accent-gold hover:text-accent-gold transition-all"
                    >
                        + Add New Slide
                    </button>
                </div>
            </section>
        </div>
    );
};

export default SiteEditor;
