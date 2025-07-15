import React from 'react';

const MainContent = ({ children }) => {
  return (
    <main className="app-main" role="main">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <div id="main-content" className="main-content">
        {children}
      </div>
    </main>
  );
};

export default MainContent;