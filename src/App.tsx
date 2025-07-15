import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout components
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import MainContent from './components/Layout/MainContent';
import Footer from './components/Layout/Footer';

// Page components
import Dashboard from './components/Dashboard/Dashboard';
import IPPools from './components/IPPools/IPPools';
import Leases from './components/Leases/Leases';
import Config from './components/Config/Config';
import NetworkScopes from './components/NetworkScopes/NetworkScopes';

// Styles
import './styles/layout.css';
import './styles/components.css';
import './styles/responsive.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header title="DHCP Admin Portal" />
        <div className="main-container">
          <Sidebar />
          <MainContent>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ip-pools" element={<IPPools />} />
              <Route path="/leases" element={<Leases />} />
              <Route path="/config" element={<Config />} />
              <Route path="/scopes" element={<NetworkScopes />} />
            </Routes>
          </MainContent>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
