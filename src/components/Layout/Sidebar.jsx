import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      to: '/',
      label: 'Dashboard',
      icon: '📊',
      description: 'DHCP server overview and status'
    },
    {
      to: '/ip-pools',
      label: 'IP Address Pools',
      icon: '🌐',
      description: 'Manage IP address ranges and scopes'
    },
    {
      to: '/leases',
      label: 'Active Leases',
      icon: '📋',
      description: 'View current IP address assignments'
    },
    {
      to: '/config',
      label: 'Configuration',
      icon: '⚙️',
      description: 'DHCP server settings and options'
    }
  ];

  return (
    <aside className="sidebar" role="navigation" aria-label="Sidebar navigation">
      <nav>
        <ul className="sidebar-nav">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={location.pathname === item.to ? 'active' : ''}
                aria-current={location.pathname === item.to ? 'page' : undefined}
                title={item.description}
              >
                <span className="icon" aria-hidden="true">
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;