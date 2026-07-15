import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, selectTheme } from '../store/themeSlice';

/** Drop-in replacement for useTheme() from ThemeContext — uses Redux */
export function useTheme() {
    const dispatch = useDispatch();
    const theme = useSelector(selectTheme);

    const toggle = useCallback(() => dispatch(toggleTheme()), [dispatch]);

    return { theme, toggleTheme: toggle };
}
