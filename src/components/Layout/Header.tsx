import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="app-header" role="banner">
      <div className="header-content">
        <h1 className="header-title">{title}</h1>
        <nav className="header-nav" role="navigation" aria-label="Main navigation">
          <button 
            type="button" 
            className="focusable"
            aria-label="Toggle dark mode"
          >
            Theme
          </button>
          <button 
            type="button" 
            className="focusable"
            aria-label="User settings"
          >
            Settings
          </button>
          <button 
            type="button" 
            className="focusable"
            aria-label="Help and documentation"
          >
            Help
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;