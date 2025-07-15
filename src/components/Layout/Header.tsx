import React from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMobileMenuOpen }) => {
  return (
    <header className="app-header" role="banner">
      <div className="header-content">
        <h1 className="header-title">DHCP Admin Portal</h1>
        <div className="header-actions">
          <button
            className="mobile-menu-button"
            onClick={onMenuToggle}
            aria-expanded={isMobileMenuOpen}
            aria-controls="sidebar-nav"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
          <span className="status-indicator online" aria-hidden="true"></span>
          <span className="sr-only">System status: Online</span>
          <span>System Online</span>
        </div>
      </div>
    </header>
  );
};

export default Header;