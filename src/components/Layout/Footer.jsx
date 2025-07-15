import React from 'react';

const Footer = () => {
  return (
    <footer className="app-footer" role="contentinfo">
      <div className="footer-content">
        <p>&copy; 2024 DHCP Admin Portal. Built with React {React.version}</p>
        <p>
          <a href="#" aria-label="Privacy Policy">Privacy</a>
          {' • '}
          <a href="#" aria-label="Terms of Service">Terms</a>
          {' • '}
          <a href="#" aria-label="Support">Support</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;