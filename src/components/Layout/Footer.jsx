import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer" role="contentinfo">
      <div className="footer-content">
        <p>
          © 2024 DHCP Admin Portal | 
          <a href="#" className="footer-link">Privacy Policy</a> | 
          <a href="#" className="footer-link">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;