import React from 'react';
import Layout from '../../components/layout/Layout';
import './404Page.css';

function PageNotFound() {
  return (
    <Layout>
      <div className="container page-not-found-container">
        <h1>404 Error</h1>
        <h1>Page Not Found</h1>
      </div>
    </Layout>
  );
}

export default PageNotFound;
