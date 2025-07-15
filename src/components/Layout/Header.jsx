import React from 'react';

const Header = () => {
  return (
    <header className="header" role="banner">
      <div className="header-container">
        <div className="header-brand">
          <h1>DHCP Admin Portal</h1>
        </div>
        <nav className="header-nav" role="navigation" aria-label="Main navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#" className="nav-link">Settings</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Help</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Admin</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;