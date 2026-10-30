import './Header.css';
import logoIcon from '../../assets/logo icon.webp';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../Shared/LanguageSwitcher/LanguageSwitcher';

const NAV_LINKS = [
  { to: '/', key: 'home' },
  { to: '/procedures', key: 'procedures' },
  { to: '/seguros', key: 'insurance' },
  { to: '/about', key: 'about' },
  { to: '/blog', key: 'blog' },
];

export default function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const toggleBtnRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handleClickOutside = (event) => {
      // Evita cerrar al hacer clic en el botón del menú
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };
    const handleEscape = (event) => {
      if (event.key === 'Escape') closeMenu();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [menuOpen]);

  return (
    <header className="header">
      <div className="header__wrapper">
        <Link to="/" className="header__brand" onClick={closeMenu}>
          <img className="header__brand-icon" src={logoIcon} alt="" width="44" height="44" />
          <span className="header__brand-text">
            <span className="header__brand-name">{t('header.brandName')}</span>
            <span className="header__brand-tagline">{t('header.brandTagline')}</span>
          </span>
        </Link>

        <nav ref={navRef} className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}>
          <ul className="header__list">
            {NAV_LINKS.map(({ to, key }) => (
              <li key={key} className="header__item">
                <NavLink className="header__link" to={to} end={to === '/'} onClick={closeMenu}>
                  {t(`header.${key}`)}
                </NavLink>
              </li>
            ))}
            <li className="header__item header__item--cta">
              <NavLink className="header__menu-cta" to="/contact" onClick={closeMenu}>
                {t('header.appointment')}
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          <LanguageSwitcher />
          <NavLink className="header__appointment-btn" to="/contact" onClick={closeMenu}>
            {t('header.appointment')}
          </NavLink>
          <button
            ref={toggleBtnRef}
            type="button"
            className={`header__toggle ${menuOpen ? 'header__toggle--open' : ''}`}
            onClick={toggleMenu}
            aria-label={t('header.toggle')}
            aria-expanded={menuOpen}
          >
            <span className="header__toggle-bar"></span>
            <span className="header__toggle-bar"></span>
            <span className="header__toggle-bar"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
