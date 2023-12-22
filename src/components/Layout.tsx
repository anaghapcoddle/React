import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

interface LayoutProps {
  readonly children: ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div className="Layout-wrapper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
export default Layout;
