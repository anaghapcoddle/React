import React, { useEffect } from 'react';
// import { jwtDecode } from 'jwt-decode';
import './App.css';
import {
  useNavigate,
  useLocation,
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { getData } from './utils/apiUtils';

import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';

interface PrivateRouteProps {
  element: React.ReactNode;
}

function PrivateRoute({ element }: PrivateRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function verifyToken() {
      const token = localStorage.getItem('token');

      if (!token && location.pathname !== '/login') {
        navigate('/login');
      }
      const res = await getData(`${process.env.REACT_APP_API_URL}/menu/view`);
      if (res.error !== null) {
        navigate('/login');
      }
    }
    verifyToken();
  }, [navigate, location.pathname]);

  const storedToken = localStorage.getItem('token');
  return storedToken ? (element as JSX.Element) : null;
}

function App() {
  useEffect(() => {
    document.title = 'Brunch Club';
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/signup" element={<PrivateRoute element={<Signup />} />} />
      </Routes>
    </Router>
  );
}

export default App;
