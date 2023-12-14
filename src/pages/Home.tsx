import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './Home.css';
import { getData } from '../utils/apiUtils';
import food1 from '../images/food1.jpg';
import Layout from '../components/Layout';

interface DecodedToken {
  id: string;
  firstName: string;
  email: string;
}

function Home() {
  const [firstNameToDisplay, setFirstName] = useState<string>('');
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded: DecodedToken = jwtDecode(token as string);
    const { firstName } = decoded;
    setFirstName(firstName);

    async function getMenuData() {
      try {
        const res = await getData(`${process.env.REACT_APP_API_URL}/menu/view`);
        const { data } = res.data;
        setMenuItems(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
    getMenuData();
  }, []);

  return (
    <div className="home">
      <Layout>
        <div className="home-content container">
          <div className="welcome-message-container">
            <span className="welcome-message">
              Welcome {firstNameToDisplay}!
            </span>
          </div>
          <div className="food-image-container">
            <img
              src={food1}
              alt="Could not be displayed."
              className="foodimage1"
            />
          </div>
          <div className="menu-container">
            <h2 className="menu-heading">OUR MENU</h2>
            <ul>
              {menuItems.map((menuItem) => (
                <li key={menuItem.id}>
                  <span className="menu-item">
                    <p>{menuItem.name}</p>
                    <p className="menu-price">{menuItem.price}</p>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Home;
