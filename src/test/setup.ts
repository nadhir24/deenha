import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock framer-motion globally to avoid jsdom animation issues
vi.mock('framer-motion', () => ({
    motion: new Proxy({}, {
        get: (_target: any, prop: string) => {
            return React.forwardRef((props: any, ref: any) => {
                const { children, className, onClick, href, ...attrs } = props;
                void attrs; // consume rest
                return React.createElement(prop, { className, onClick, href, ref }, children);
            });
        }
    }),
    AnimatePresence: ({ children }: any) => children,
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
    useInView: () => true,
}));

// Mock i18next
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: {
            changeLanguage: () => Promise.resolve(),
            language: 'id',
        },
    }),
    initReactI18next: {
        type: '3rdParty',
        init: () => { },
    },
}));

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock window.scrollTo
window.scrollTo = vi.fn();

// Mock Supabase at package level to prevent network connections
vi.mock('@supabase/supabase-js', () => ({
    createClient: vi.fn(() => ({
        auth: {
            getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
            onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
            signInWithPassword: vi.fn(),
            signOut: vi.fn(),
        },
        from: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnThis(),
            eq: vi.fn().mockReturnThis(),
            single: vi.fn().mockResolvedValue({ data: null, error: null }),
            order: vi.fn().mockResolvedValue({ data: [], error: null }),
            insert: vi.fn().mockResolvedValue({ error: null }),
        }),
    })),
}));

// Also mock the lib wrapper
vi.mock('../lib/supabase', () => ({
    supabase: {
        auth: {
            getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
            onAuthStateChange: vi.fn().mockReturnValue({ data: { subscription: { unsubscribe: vi.fn() } } }),
            signInWithPassword: vi.fn(),
            signOut: vi.fn(),
        },
        from: vi.fn().mockReturnValue({
            select: vi.fn().mockReturnValue({
                eq: vi.fn().mockReturnValue({
                    single: vi.fn().mockResolvedValue({ data: null, error: null }),
                }),
                order: vi.fn().mockResolvedValue({ data: [], error: null }),
            }),
            insert: vi.fn().mockResolvedValue({ error: null }),
            update: vi.fn().mockResolvedValue({ error: null }),
            delete: vi.fn().mockResolvedValue({ error: null }),
        }),
    },
}));
