import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach } from 'vitest';
import { WishlistProvider, useWishlist } from './WishlistContext';

const TestComponent = () => {
    const { wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, wishlistCount } = useWishlist();
    return (
        <div>
            <span data-testid="count">{wishlistCount}</span>
            <span data-testid="ids">{wishlist.join(',')}</span>
            <span data-testid="has-1">{isInWishlist(1) ? 'yes' : 'no'}</span>
            <span data-testid="has-2">{isInWishlist(2) ? 'yes' : 'no'}</span>
            <button data-testid="add-1" onClick={() => addToWishlist(1)}>Add 1</button>
            <button data-testid="add-2" onClick={() => addToWishlist(2)}>Add 2</button>
            <button data-testid="remove-1" onClick={() => removeFromWishlist(1)}>Remove 1</button>
            <button data-testid="toggle-1" onClick={() => toggleWishlist(1)}>Toggle 1</button>
        </div>
    );
};

describe('WishlistContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should start with empty wishlist', () => {
        render(
            <WishlistProvider>
                <TestComponent />
            </WishlistProvider>
        );
        expect(screen.getByTestId('count').textContent).toBe('0');
    });

    it('should add item to wishlist', async () => {
        const user = userEvent.setup();
        render(
            <WishlistProvider>
                <TestComponent />
            </WishlistProvider>
        );

        await user.click(screen.getByTestId('add-1'));
        expect(screen.getByTestId('count').textContent).toBe('1');
        expect(screen.getByTestId('has-1').textContent).toBe('yes');
    });

    it('should remove item from wishlist', async () => {
        const user = userEvent.setup();
        render(
            <WishlistProvider>
                <TestComponent />
            </WishlistProvider>
        );

        await user.click(screen.getByTestId('add-1'));
        expect(screen.getByTestId('has-1').textContent).toBe('yes');

        await user.click(screen.getByTestId('remove-1'));
        expect(screen.getByTestId('has-1').textContent).toBe('no');
        expect(screen.getByTestId('count').textContent).toBe('0');
    });

    it('should toggle wishlist item', async () => {
        const user = userEvent.setup();
        render(
            <WishlistProvider>
                <TestComponent />
            </WishlistProvider>
        );

        // Toggle on
        await user.click(screen.getByTestId('toggle-1'));
        expect(screen.getByTestId('has-1').textContent).toBe('yes');

        // Toggle off
        await user.click(screen.getByTestId('toggle-1'));
        expect(screen.getByTestId('has-1').textContent).toBe('no');
    });

    it('should track multiple items', async () => {
        const user = userEvent.setup();
        render(
            <WishlistProvider>
                <TestComponent />
            </WishlistProvider>
        );

        await user.click(screen.getByTestId('add-1'));
        await user.click(screen.getByTestId('add-2'));

        expect(screen.getByTestId('count').textContent).toBe('2');
        expect(screen.getByTestId('has-1').textContent).toBe('yes');
        expect(screen.getByTestId('has-2').textContent).toBe('yes');
    });

    it('should persist to localStorage', async () => {
        const user = userEvent.setup();
        render(
            <WishlistProvider>
                <TestComponent />
            </WishlistProvider>
        );

        await user.click(screen.getByTestId('add-1'));

        const stored = localStorage.getItem('deenha-wishlist');
        expect(stored).not.toBeNull();
        expect(JSON.parse(stored!)).toEqual([1]);
    });

    it('should load from localStorage on mount', () => {
        localStorage.setItem('deenha-wishlist', JSON.stringify([1, 2]));

        render(
            <WishlistProvider>
                <TestComponent />
            </WishlistProvider>
        );

        expect(screen.getByTestId('count').textContent).toBe('2');
        expect(screen.getByTestId('has-1').textContent).toBe('yes');
        expect(screen.getByTestId('has-2').textContent).toBe('yes');
    });

    it('should throw when used outside provider', () => {
        const BadComponent = () => {
            useWishlist();
            return null;
        };
        expect(() => render(<BadComponent />)).toThrow('useWishlist must be used within a WishlistProvider');
    });
});
