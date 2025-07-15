import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigationItems = [
    { path: '/', label: 'Dashboard', ariaLabel: 'Dashboard - View DHCP server status' },
    { path: '/ip-pools', label: 'IP Pools', ariaLabel: 'IP Pools - Manage IP address pools' },
    { path: '/leases', label: 'Active Leases', ariaLabel: 'Active Leases - View current IP assignments' },
    { path: '/config', label: 'Configuration', ariaLabel: 'Configuration - Server settings' },
    { path: '/scopes', label: 'Network Scopes', ariaLabel: 'Network Scopes - Manage network segments' },
  ];

  return (
    <aside className="sidebar" aria-label="Sidebar navigation">
      <nav className="sidebar-nav" role="navigation" aria-label="DHCP admin navigation">
        <ul>
          {navigationItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) => `focusable ${isActive ? 'active' : ''}`}
                aria-label={item.ariaLabel}
                end={item.path === '/'}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;