import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <Header />
      <div className="home-content">
        <h1>Welcome to the home page.</h1>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
