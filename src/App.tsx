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

function AuthenticatedPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token && location.pathname === '/') {
      navigate('/');
    } else if (!token) {
      navigate('/login');
    }
  }, [navigate, location.pathname]);

  return <Home />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticatedPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
