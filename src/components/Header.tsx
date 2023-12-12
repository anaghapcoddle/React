import React, { useEffect, useState } from 'react';
import './Header.css';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  firstName: string;
  email: string;
}

function Header() {
  const [firstNameToDisplay, setFirstName] = useState<string>('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded: DecodedToken = jwtDecode(token as string);
    const { firstName } = decoded;
    setFirstName(firstName);
  }, []);

  return (
    <div className="Header">
      <div className="Heading-Container">
        <h1 className="Heading">BRUNCH CLUB</h1>
      </div>
      <div className="Navigation-bar">
        <div className="Navigation-Links-Container">
          <ul>
            <li>
              <a href="#about">ABOUT</a>
            </li>
            <li>
              <a href="#menu">MENU</a>
            </li>
            <li>
              <a href="#orders">ORDERS</a>
            </li>
            <li>
              <a href="#reservation">RESERVATION</a>
            </li>
            <li>
              <a href="#billing">BILLING</a>
            </li>
          </ul>
        </div>
        <div className="User-Account-Links">
          <ul>
            <li>
              <span className="username-display">
                Welcome {firstNameToDisplay}!
              </span>
            </li>
            <li>
              <a href="#account">Sign Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
