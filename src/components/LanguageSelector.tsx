import { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LANGUAGES, type Language } from '../data/translations';

interface LanguageSelectorProps {
  variant?: 'compact' | 'full' | 'dropdown';
  className?: string;
}

export default function LanguageSelector({
  variant = 'compact',
  className = '',
}: LanguageSelectorProps) {
  const { state, dispatch, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = state.language || 'en';

  const selectLanguage = (code: Language) => {
    dispatch({ type: 'SET_LANGUAGE', language: code });
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'full') {
    return (
      <div className={`language-selector-full ${className}`}>
        <div className="language-pill-group">
          {LANGUAGES.map((lang) => {
            const isActive = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                className={`language-pill-card ${isActive ? 'active' : ''}`}
                onClick={() => selectLanguage(lang.code)}
                aria-pressed={isActive}
                aria-label={`Select ${lang.name}`}
              >
                <span className="lang-flag">{lang.flag}</span>
                <div className="lang-info">
                  <span className="lang-native">{lang.nativeName}</span>
                  <span className="lang-english">{lang.name}</span>
                </div>
                {isActive && <Check size={18} className="lang-check" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Compact / Dropdown variant (perfect for topbar navigation)
  const selectedObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <div
      ref={containerRef}
      className={`language-selector-dropdown ${className}`}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <button
        type="button"
        className="btn-language-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={t('changeLanguage')}
        title={t('selectLanguage')}
      >
        <Globe size={16} className="globe-icon" />
        <span className="lang-label">{selectedObj.nativeName}</span>
        <ChevronDown
          size={14}
          className={`chevron-icon ${isOpen ? 'rotated' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="language-dropdown-menu" role="menu">
          <div className="dropdown-header">
            <Globe size={14} />
            <span>{t('selectLanguage')}</span>
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              className={`dropdown-item ${currentLang === lang.code ? 'active' : ''}`}
              onClick={() => selectLanguage(lang.code)}
              role="menuitem"
            >
              <span className="item-flag">{lang.flag}</span>
              <span className="item-native">{lang.nativeName}</span>
              <span className="item-sub">({lang.name})</span>
              {currentLang === lang.code && (
                <Check size={14} className="item-check" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
