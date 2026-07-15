import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    toggleWishlist as toggleAction,
    addToWishlist as addAction,
    removeFromWishlist as removeAction,
    selectWishlist,
    selectWishlistCount,
} from '../store/wishlistSlice';

/** Drop-in replacement for useWishlist() from WishlistContext — uses Redux */
export function useWishlist() {
    const dispatch = useDispatch();
    const wishlist = useSelector(selectWishlist);
    const wishlistCount = useSelector(selectWishlistCount);

    const toggleWishlist = useCallback(
        (id: number) => dispatch(toggleAction(id)),
        [dispatch]
    );

    const addToWishlist = useCallback(
        (id: number) => dispatch(addAction(id)),
        [dispatch]
    );

    const removeFromWishlist = useCallback(
        (id: number) => dispatch(removeAction(id)),
        [dispatch]
    );

    const isInWishlist = (id: number) => wishlist.includes(id);

    return { wishlist, wishlistCount, toggleWishlist, addToWishlist, removeFromWishlist, isInWishlist };
}
