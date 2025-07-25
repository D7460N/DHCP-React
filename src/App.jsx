import React from 'react';
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
  return (
    <Router>
      <div className="app">
        <Header />
        <div className="main-content">
          <Sidebar />
          <MainContent>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/ip-pools" element={<IPPools />} />
              <Route path="/leases" element={<Leases />} />
              <Route path="/config" element={<Config />} />
            </Routes>
          </MainContent>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
