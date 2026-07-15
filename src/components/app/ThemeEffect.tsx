import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/themeSlice';

/** Syncs Redux theme to <html> class for Tailwind dark mode */
export default function ThemeEffect() {
    const theme = useSelector(selectTheme);

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [theme]);

    return null;
}
