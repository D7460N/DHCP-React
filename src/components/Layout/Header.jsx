import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  const navigationItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/ip-pools', label: 'IP Pools' },
    { path: '/leases', label: 'Leases' },
    { path: '/config', label: 'Configuration' },
  ];

  return (
    <header className="app-header" role="banner">
      <div className="header-content">
        <h1 className="app-title">DHCP Admin Portal</h1>
        <nav className="header-nav" role="navigation" aria-label="Main navigation">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={location.pathname === item.path ? 'active' : ''}
              aria-current={location.pathname === item.path ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;