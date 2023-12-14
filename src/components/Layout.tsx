import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
export default Layout;
