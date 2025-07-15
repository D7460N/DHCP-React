import React from 'react';

const Header = ({ onMenuToggle, isMobileMenuOpen }) => {
  return (
    <header className="app-header" role="banner">
      <div className="header-left">
        <button
          className="mobile-menu-toggle"
          onClick={onMenuToggle}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </button>
        <h1 className="app-title">DHCP Admin Portal</h1>
      </div>
      
      <nav className="header-nav" role="navigation" aria-label="User navigation">
        <div className="user-menu">
          <button className="btn btn-secondary" aria-label="User menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            Admin
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;