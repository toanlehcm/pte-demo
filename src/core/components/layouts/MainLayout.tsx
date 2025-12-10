import React, { useState } from 'react';
// import { ErrorBoundaryWrapper } from '../ErrorBoundaryWrapper';
import { Header } from '../header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className='bg-white min-h-screen flex flex-col'>
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className='fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden'
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Header component */}
        <Header />

        {/* Page content */}
        {children}
      </div>
    </>
  );
};
