import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo">
          DHCP Admin Portal
        </Link>
        <nav className="header-nav" role="navigation" aria-label="Main navigation">
          <Link to="/" aria-label="Dashboard">Dashboard</Link>
          <Link to="/ip-pools" aria-label="IP Pools">IP Pools</Link>
          <Link to="/leases" aria-label="Active Leases">Leases</Link>
          <Link to="/config" aria-label="Configuration">Config</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;