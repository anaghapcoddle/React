import React, { useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getData } from './apiUtils';

interface PrivateRouteProps {
  element: React.ReactNode;
}

function PrivateRoute({ element }: PrivateRouteProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem('token');

    if (!token && location.pathname !== '/login') {
      navigate('/login');
    }
    const res = await getData(`${process.env.REACT_APP_API_URL}/menu/view`);
    if (res.error !== null) {
      navigate('/login');
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  const storedToken = localStorage.getItem('token');
  return storedToken ? (element as JSX.Element) : null;
}

export default PrivateRoute;
