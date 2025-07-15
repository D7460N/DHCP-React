import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="app-footer" role="contentinfo">
      <div className="footer-content">
        <p>
          &copy; 2024 DHCP Admin Portal. Built with React {React.version} | 
          <button className="focusable" style={{ color: '#3498db', marginInlineStart: '0.5rem', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
            Documentation
          </button> | 
          <button className="focusable" style={{ color: '#3498db', marginInlineStart: '0.5rem', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer' }}>
            Support
          </button>
        </p>
      </div>
    </footer>
  );
};

export default Footer;