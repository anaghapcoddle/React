import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';
// import { getData } from '../utils/apiUtils';

interface DecodedToken {
  id: string;
  firstName: string;
  email: string;
}

function Home() {
  const [firstNameToDisplay, setFirstName] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded: DecodedToken = jwtDecode(token as string);
    const { firstName } = decoded;
    setFirstName(firstName);
  }, []);

  // const res = getData(`${process.env.REACT_APP_API_URL}/menu/view`);
  // console.log(res);

  return (
    <div className="home">
      <Header />
      <div className="home-content">
        <h2>Welcome {firstNameToDisplay}!</h2>
        <div className="menu">
          <h2 className="menu-heading">OUR MENU</h2>
          Chicken Soup $12
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
