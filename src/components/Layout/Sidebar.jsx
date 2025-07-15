import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/ip-pools', label: 'IP Pools', icon: '🔧' },
    { path: '/leases', label: 'Active Leases', icon: '📋' },
    { path: '/config', label: 'Configuration', icon: '⚙️' },
  ];

  return (
    <aside className="sidebar" role="complementary" aria-label="Main sidebar">
      <nav className="sidebar-nav" role="navigation" aria-label="Sidebar navigation">
        <ul className="sidebar-nav-list">
          {navigationItems.map((item) => (
            <li key={item.path} className="sidebar-nav-item">
              <Link
                to={item.path}
                className={`sidebar-nav-link ${location.pathname === item.path ? 'active' : ''}`}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                <span className="sidebar-nav-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="sidebar-nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;