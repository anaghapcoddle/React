import './Header.css';

function Header() {
  return (
    <div className="Header container">
      <div className="Heading-Container">
        <h1 className="Heading">BRUNCH CLUB</h1>
        <span>Where every ingredient tells a story.</span>
      </div>
      <div className="Navigation-bar">
        <div className="Navigation-Links-Container">
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
