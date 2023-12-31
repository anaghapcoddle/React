import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';

import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import AddOrder from './pages/AddOrder';
import Billing from './pages/Billing';

function App() {
  useEffect(() => {
    document.title = 'Brunch Club';
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/table/:tableId"
          element={<PrivateRoute element={<AddOrder />} />}
        />
        <Route
          path="/billing/:orderId"
          element={<PrivateRoute element={<Billing />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
