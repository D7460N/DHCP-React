const Footer = () => {
  return (
    <footer className="app-footer" role="contentinfo">
      <div className="footer-content">
        <p>
          © 2024 DHCP Admin Portal - Modern React Implementation
        </p>
        <div className="footer-links">
          <a href="#" aria-label="Help documentation">Help</a>
          <span aria-hidden="true"> | </span>
          <a href="#" aria-label="Support contact">Support</a>
          <span aria-hidden="true"> | </span>
          <a href="#" aria-label="About this application">About</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;