import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  return (
    <header className="header" role="banner">
      <div className="header-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            className="mobile-menu-toggle"
            onClick={onMenuToggle}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Link to="/" className="header-logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="currentColor" opacity="0.1"/>
              <path
                d="M8 12h16M8 16h16M8 20h12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>DHCP Admin</span>
          </Link>
        </div>
        <nav className="header-nav" role="navigation" aria-label="Header navigation">
          <button
            type="button"
            aria-label="Refresh data"
            title="Refresh data"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Settings"
            title="Settings"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 10a8.949 8.949 0 01-1.436 4.864 8.949 8.949 0 01-3.864 1.436A8.949 8.949 0 0110 19a8.949 8.949 0 01-4.864-1.436A8.949 8.949 0 013.7 13.7 8.949 8.949 0 011 10a8.949 8.949 0 011.436-4.864A8.949 8.949 0 016.3 3.7 8.949 8.949 0 0110 1a8.949 8.949 0 014.864 1.436A8.949 8.949 0 0116.3 6.3 8.949 8.949 0 0119 10z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;