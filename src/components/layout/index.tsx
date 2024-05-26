import React from 'react';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';

const Layout = ({ children }: any) => {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
