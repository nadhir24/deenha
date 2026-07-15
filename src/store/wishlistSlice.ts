import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const loadWishlist = (): number[] => {
    try {
        const saved = localStorage.getItem('deenha-wishlist');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

const saveWishlist = (ids: number[]) => {
    try {
        localStorage.setItem('deenha-wishlist', JSON.stringify(ids));
    } catch { /* localStorage unavailable */ }
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState: loadWishlist() as number[],
    reducers: {
        toggleWishlist(state, action: PayloadAction<number>) {
            const idx = state.indexOf(action.payload);
            if (idx > -1) {
                state.splice(idx, 1);
            } else {
                state.push(action.payload);
            }
            saveWishlist(state);
        },
        addToWishlist(state, action: PayloadAction<number>) {
            if (!state.includes(action.payload)) {
                state.push(action.payload);
                saveWishlist(state);
            }
        },
        removeFromWishlist(state, action: PayloadAction<number>) {
            const idx = state.indexOf(action.payload);
            if (idx > -1) {
                state.splice(idx, 1);
                saveWishlist(state);
            }
        },
    },
    selectors: {
        selectWishlist: (state) => state,
        selectWishlistCount: (state) => state.length,
        selectIsInWishlist: (state, id: number) => state.includes(id),
    },
});

export const { toggleWishlist, addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export const { selectWishlist, selectWishlistCount } = wishlistSlice.selectors;
export default wishlistSlice.reducer;
