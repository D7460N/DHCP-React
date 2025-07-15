import React from 'react';

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main className="main-content" role="main">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div id="main-content" tabIndex={-1}>
        {children}
      </div>
    </main>
  );
};

export default MainContent;