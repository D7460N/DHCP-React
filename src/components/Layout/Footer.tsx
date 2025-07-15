import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="app-footer" role="contentinfo">
      <p>
        © 2024 DHCP Admin Portal | D7460N Architecture Test Case | 
        <button className="text-link" style={{ background: 'none', border: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}>Documentation</button> | 
        <button className="text-link" style={{ background: 'none', border: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}>Support</button>
      </p>
    </footer>
  );
};

export default Footer;