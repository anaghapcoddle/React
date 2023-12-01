import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  const isLoggedIn = () => {
    const userToken = window.localStorage.getItem('token');
    return !!userToken;
  };

  return (
    <Router>
      <Routes>
        {!isLoggedIn() ? (
          <Route path="/" element={<Navigate to="/login" />} />
        ) : (
          <Route path="/" element={<Home />} />
        )}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
