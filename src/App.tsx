import React, { useEffect } from 'react';
import {
  useNavigate,
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';

const withAuthentication = (Component: React.ComponentType<any>) => {
  return function () {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      if (token && location.pathname === '/login') {
        navigate('/');
      }
    }, [navigate, location.pathname]);

    return <Component />;
  };
};

const AuthenticatedHome = withAuthentication(Home);
const AuthenticatedHomeSignup = withAuthentication(Signup);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticatedHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<AuthenticatedHomeSignup />} />
      </Routes>
    </Router>
  );
}

export default App;
