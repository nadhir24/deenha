import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'id', name: 'ID', flag: '🇮🇩', labelKey: 'language.id', subLabel: 'Bahasa' },
  { code: 'en', name: 'EN', flag: '🇺🇸', labelKey: 'language.en', subLabel: 'English' },
  { code: 'fr', name: 'FR', flag: '🇫🇷', labelKey: 'language.fr', subLabel: 'Français' },
  { code: 'zh-CN', name: 'ZH', flag: '🇨🇳', labelKey: 'language.zh', subLabel: '中文' },
];

import { useTheme } from '../../hooks/useAppTheme';

const LanguageSelector = ({ isSolid, isMobileMenu }: { isSolid?: boolean; isMobileMenu?: boolean }) => {
  const { i18n, t } = useTranslation();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync currentLang with i18n.language
  const currentLang = languages.find(l => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setIsOpen(false);

    // Change i18next language
    i18n.changeLanguage(lang.code);

    // @ts-ignore
    if (window.triggerTranslate) {
      // @ts-ignore
      window.triggerTranslate(lang.code);
    }
  };

  if (isMobileMenu) {
    return (
      <div className="w-full notranslate skiptranslate" translate="no" ref={dropdownRef}>
        <div className="flex flex-wrap gap-3">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang)}
              className={`flex items-center justify-center min-w-[60px] px-3 py-2 rounded-sm border transition-all duration-300 ${currentLang.code === lang.code
                ? 'border-accent-gold bg-accent-gold/5 text-primary dark:text-white'
                : 'border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 text-secondary dark:text-white/75'
                }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-widest" translate="no">
                {lang.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const getButtonColor = () => {
    if (theme === 'dark') return 'text-white';
    return isSolid ? 'text-black' : 'text-white';
  };

  return (
    <div className="relative notranslate skiptranslate" translate="no" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-1.5 p-2 transition-colors duration-300 ${getButtonColor()}`}
      >
        <span className="text-[11px] font-bold uppercase tracking-widest" translate="no">
          {currentLang.name}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-primary shadow-2xl rounded-sm overflow-hidden z-[100] border border-black/5 dark:border-white/10"
          >
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang)}
                  className="w-full flex items-center space-x-4 px-4 py-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
                >
                  <span className="text-lg" translate="no">{lang.flag}</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-black dark:text-white" translate="no">
                      {t(lang.labelKey)}
                    </span>
                    <span className="text-[8px] text-secondary dark:text-white/40 uppercase tracking-tighter" translate="no">
                      {lang.subLabel}
                    </span>
                  </div>
                  {currentLang.code === lang.code && (
                    <div className="ml-auto">
                      <div className="w-1 h-1 bg-accent-gold rounded-full" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
