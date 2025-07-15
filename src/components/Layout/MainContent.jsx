import { useLocation } from 'react-router-dom';

const MainContent = ({ children }) => {
  const location = useLocation();
  
  // Get page title based on current route
  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/':
        return 'Dashboard';
      case '/ip-pools':
        return 'IP Address Pools';
      case '/leases':
        return 'Active Leases';
      case '/config':
        return 'Configuration';
      default:
        return 'DHCP Admin Portal';
    }
  };

  return (
    <main className="main-content" role="main" id="main-content">
      <div className="visually-hidden">
        <h1>{getPageTitle(location.pathname)}</h1>
      </div>
      {children}
    </main>
  );
};

export default MainContent;