import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/ip-pools', label: 'IP Address Pools', icon: '🏊' },
    { path: '/leases', label: 'Active Leases', icon: '📋' },
    { path: '/config', label: 'Configuration', icon: '⚙️' },
    { path: '/scopes', label: 'Network Scopes', icon: '🌐' },
  ];

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <>
      <aside
        className={`app-sidebar ${isOpen ? 'mobile-open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
        id="sidebar-nav"
        onKeyDown={handleKeyDown}
      >
        <nav>
          <ul className="nav-menu">
            {navigationItems.map((item) => (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={onClose}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  <span className="nav-icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      {isOpen && (
        <div
          className="mobile-overlay active"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;