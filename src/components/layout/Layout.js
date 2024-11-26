import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main 
          style={{
            backgroundImage: "url('/img/header4.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            marginLeft: '12rem',
            paddingTop: '6rem',
            minHeight: 'calc(100vh - 6rem)',
            width: 'calc(100% - 12rem)',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;