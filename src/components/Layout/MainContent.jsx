import React from 'react';

const MainContent = ({ children }) => {
  return (
    <main className="content" role="main" tabIndex="-1" id="main-content">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {children}
    </main>
  );
};

export default MainContent;