import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Header.css';

interface DecodedToken {
  id: number;
  firstName: string;
  email: string;
  role: number;
}

function Header() {
  const token = localStorage.getItem('token');
  const decoded: DecodedToken = jwtDecode(token as string);
  const { role } = decoded;
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
            {role === 1 && (
              <li className="navigation-bar-item">
                <Link to="/employees" className="navigation-link">
                  EMPLOYEES
                </Link>
              </li>
            )}
            <li className="navigation-bar-item">
              <Link to="/" className="navigation-link">
                TABLES
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
              <button
                type="button"
                className="signout-button"
                onClick={handleSignOut}
              >
                SIGN OUT
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
