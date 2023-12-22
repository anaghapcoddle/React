import React, { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';

import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Table from './pages/Table';

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
        <Route
          path="/table/:tableId"
          element={<PrivateRoute element={<Table />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
