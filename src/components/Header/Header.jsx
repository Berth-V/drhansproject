import './Header.css';
import logo from '../../assets/logo.webp';
import { NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../Shared/LanguageSwitcher/LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const toggleBtnRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Avoid closing when clicking on the toggle button
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu();
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflowX = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  return (
    <header className="header">
      <div className='header__nav-top'>
        <LanguageSwitcher />
      </div>
      <div className='header__wrapper'>
        <img
          className="header__logo"
          src={logo}
          alt="Logo"
          width="248"
          height="64"
        />

        <nav
          ref={navRef}
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
        >
          <ul className="header__list">
            <li className="header__item">
              <NavLink className="header__link" to="/" onClick={closeMenu}>
                <span className="header__link-text">{t('header.home')}</span>
              </NavLink>
            </li>

            <li className="header__item">
              <NavLink
                className="header__link"
                to="/procedures"
                onClick={closeMenu}
              >
                <span className="header__link-text">{t('header.procedures')}</span>
              </NavLink>
            </li>

            <li className="header__item">
              <NavLink className="header__link" to="/about" onClick={closeMenu}>
                <span className="header__link-text">{t('header.about')}</span>
              </NavLink>
            </li>

            <li className="header__item">
              <NavLink
                className="header__appointment-btn"
                to="/contact"
                onClick={closeMenu}
              >
                {t('header.appointment')}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>


      <button
        ref={toggleBtnRef}
        className={`header__toggle ${menuOpen ? 'header__toggle--open' : ''}`}
        onClick={toggleMenu}
        aria-label={t('header.toggle')}
        aria-expanded={menuOpen}
      >
        <span className="header__toggle-bar"></span>
        <span className="header__toggle-bar"></span>
        <span className="header__toggle-bar"></span>
      </button>
    </header>
  );
}
