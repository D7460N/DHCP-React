import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './components/Dashboard/Dashboard';
import IPPools from './components/IPPools/IPPools';
import Leases from './components/Leases/Leases';
import Config from './components/Config/Config';
import './styles/layout.css';
import './styles/components.css';
import './styles/pages.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ip-pools" element={<IPPools />} />
          <Route path="/leases" element={<Leases />} />
          <Route path="/config" element={<Config />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
