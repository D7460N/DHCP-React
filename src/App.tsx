import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import MainContent from './components/Layout/MainContent';
import Footer from './components/Layout/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import IPPools from './components/IPPools/IPPools';
import Leases from './components/Leases/Leases';
import Config from './components/Config/Config';

import './styles/layout.css';
import './styles/components.css';
import './styles/responsive.css';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Network Scopes placeholder component
  const NetworkScopes = () => (
    <div>
      <h2 style={{ marginBottom: '2rem', color: '#1e293b' }}>Network Scopes</h2>
      <div className="dashboard-card">
        <h3>Network Scope Administration</h3>
        <p>This feature allows you to manage network scopes and subnet configurations.</p>
        <p>Coming soon...</p>
      </div>
    </div>
  );

  return (
    <Router>
      <div className="app-container">
        <Header onMenuToggle={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
        <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
        <MainContent>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ip-pools" element={<IPPools />} />
            <Route path="/leases" element={<Leases />} />
            <Route path="/config" element={<Config />} />
            <Route path="/scopes" element={<NetworkScopes />} />
          </Routes>
        </MainContent>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
