import React from 'react';

const MainContent = ({ children }) => {
  return (
    <main className="main-content" role="main">
      <div className="main-content-container">
        {children}
      </div>
    </main>
  );
};

export default MainContent;