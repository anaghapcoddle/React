import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  return (
    <header>
      <div className="Header-container container">
        <div className="Heading-Container">
          <h1 className="Heading">BRUNCH CLUB</h1>
          <span className="heading-tagline">
            Where every ingredient tells a story.
          </span>
        </div>
        <div className="Navigation-bar">
          <ul>
            <li className="navigation-bar-item">
              <Link to="/menu" className="navigation-link">
                MENU
              </Link>
            </li>
            <li className="navigation-bar-item">
              <Link to="/orders" className="navigation-link">
                ORDERS
              </Link>
            </li>
            <li className="navigation-bar-item">
              <Link to="/reservation" className="navigation-link">
                RESERVATION
              </Link>
            </li>
            <li className="navigation-bar-item">
              <Link to="/billing" className="navigation-link">
                BILLING
              </Link>
            </li>
            <li className="navigation-bar-item">
              <button
                type="button"
                className="signout-button"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
