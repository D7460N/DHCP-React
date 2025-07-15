import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  // Close mobile menu when clicking outside or on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.sidebar') && !target.closest('.mobile-menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Close mobile menu on Escape key
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <Router>
      <div className="app">
        <Header onMenuToggle={handleMenuToggle} isMobileMenuOpen={isMobileMenuOpen} />
        
        <div className="main-layout">
          <Sidebar isOpen={isMobileMenuOpen} onClose={handleMenuClose} />
          
          <MainContent>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ip-pools" element={<IPPools />} />
              <Route path="/leases" element={<Leases />} />
              <Route path="/config" element={<Config />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </MainContent>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;