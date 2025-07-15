import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import MainContent from './components/Layout/MainContent';
import Footer from './components/Layout/Footer';

// Page Components
import Dashboard from './components/Dashboard/Dashboard';
import IPPools from './components/IPPools/IPPools';
import Leases from './components/Leases/Leases';
import Config from './components/Config/Config';

// Styles
import './styles/layout.css';
import './styles/components.css';
import './styles/responsive.css';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Header 
          onMenuToggle={handleMenuToggle}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        
        <Sidebar 
          isOpen={isMobileMenuOpen}
          onClose={handleMenuClose}
        />
        
        <MainContent>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/ip-pools" element={<IPPools />} />
            <Route path="/leases" element={<Leases />} />
            <Route path="/config" element={<Config />} />
          </Routes>
        </MainContent>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
