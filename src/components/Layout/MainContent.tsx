import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main className="app-main" role="main" tabIndex={-1} id="main-content">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      {children}
    </main>
  );
};

export default MainContent;