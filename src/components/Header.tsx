import React from 'react';
import './Header.css';

function Header() {
  return (
    <div className="Header">
      <div className="Heading-Container">
        <h1 className="Heading">BRUNCH CLUB</h1>
      </div>
      <div className="Navigation-bar">
        <ul>
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
    </div>
  );
}

export default Header;
