import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const navigationItems = [
    { 
      path: '/', 
      label: 'Dashboard',
      icon: '📊',
      description: 'DHCP server overview and statistics'
    },
    { 
      path: '/ip-pools', 
      label: 'IP Address Pools',
      icon: '🏊',
      description: 'Manage DHCP IP address pools'
    },
    { 
      path: '/leases', 
      label: 'Active Leases',
      icon: '📋',
      description: 'View current IP address leases'
    },
    { 
      path: '/config', 
      label: 'Configuration',
      icon: '⚙️',
      description: 'DHCP server configuration settings'
    },
  ];

  return (
    <aside className="app-sidebar" role="complementary" aria-label="Sidebar navigation">
      <nav className="sidebar-nav" role="navigation" aria-label="Sidebar navigation">
        <ul>
          {navigationItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
                aria-current={location.pathname === item.path ? 'page' : undefined}
                title={item.description}
              >
                <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
                <span className="visually-hidden">{item.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;