import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './Home.css';
import Layout from '../components/Layout';

interface DecodedToken {
  id: string;
  firstName: string;
  email: string;
}

function Home() {
  const token = localStorage.getItem('token');
  const decoded: DecodedToken = jwtDecode(token as string);
  const { firstName } = decoded;

  return (
    <div className="home">
      <Layout>
        <div className="home-content container">
          <div className="welcome-message-container">
            <span className="welcome-message">Welcome {firstName}!</span>
          </div>
          <div className="welcome-message-container">
            <span className="welcome-message">Select table</span>
          </div>
          <div className="table-container">
            <Link to="/table/1" className="table table1">
              01
            </Link>
            <Link to="/table/2" className="table table1">
              02
            </Link>
            <Link to="/table/3" className="table table1">
              03
            </Link>
            <Link to="/table/4" className="table table1">
              04
            </Link>
            <Link to="/table/5" className="table table1">
              05
            </Link>
            <Link to="/table/6" className="table table1">
              06
            </Link>
            <Link to="/table/7" className="table table1">
              07
            </Link>
            <Link to="/table/8" className="table table1">
              08
            </Link>
            <Link to="/table/9" className="table table1">
              09
            </Link>
            <Link to="/table/10" className="table table1">
              10
            </Link>
            <Link to="/table/11" className="table table1">
              11
            </Link>
            <Link to="/table/12" className="table table1">
              12
            </Link>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Home;
