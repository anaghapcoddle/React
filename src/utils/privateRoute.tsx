import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getData } from './apiUtils';

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

export default PrivateRoute;
