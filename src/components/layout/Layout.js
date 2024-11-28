import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main 
          className="flex-1 overflow-y-auto"
          style={{
            backgroundImage: "url('/img/header4.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
            marginLeft: '13rem',
            paddingTop: '7rem',
            width: 'calc(100% - 13rem)',
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;