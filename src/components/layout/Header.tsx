import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Header.css';
import { RootState } from '../../redux/state/store';

function Header() {
  const userDetails = useSelector((state: RootState) => state.user.userDetails);
  const role = userDetails ? userDetails.role : '2';
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
