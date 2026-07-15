import { createSlice } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const themeSlice = createSlice({
    name: 'theme',
    initialState: getInitialTheme() as Theme,
    reducers: {
        toggleTheme(state) {
            const next = state === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', next);
            return next;
        },
    },
    selectors: {
        selectTheme: (state) => state,
    },
});

export const { toggleTheme } = themeSlice.actions;
export const { selectTheme } = themeSlice.selectors;
export default themeSlice.reducer;
