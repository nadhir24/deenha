import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface WishlistContextType {
    wishlist: number[];
    addToWishlist: (id: number) => void;
    removeFromWishlist: (id: number) => void;
    toggleWishlist: (id: number) => void;
    isInWishlist: (id: number) => boolean;
    wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<number[]>(() => {
        const saved = localStorage.getItem('deenha-wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('deenha-wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (id: number) => {
        setWishlist(prev => [...prev, id]);
    };

    const removeFromWishlist = (id: number) => {
        setWishlist(prev => prev.filter(item => item !== id));
    };

    const toggleWishlist = (id: number) => {
        if (wishlist.includes(id)) {
            removeFromWishlist(id);
        } else {
            addToWishlist(id);
        }
    };

    const isInWishlist = (id: number) => wishlist.includes(id);

    return (
        <WishlistContext.Provider value={{
            wishlist,
            addToWishlist,
            removeFromWishlist,
            toggleWishlist,
            isInWishlist,
            wishlistCount: wishlist.length
        }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};
