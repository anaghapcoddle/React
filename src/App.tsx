import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';

import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import AddOrder from './pages/AddOrder';
import Billing from './pages/Billing';
import Employees from './pages/Employees';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import EmployeeDetails from './pages/EmployeeDetails';

function App() {
  useEffect(() => {
    document.title = 'Brunch Club';
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<PrivateRoute element={<Home />} />} />
        <Route
          path="/table/:tableId"
          element={<PrivateRoute element={<AddOrder />} />}
        />
        <Route
          path="/billing/:orderId"
          element={<PrivateRoute element={<Billing />} />}
        />
        <Route
          path="/employees"
          element={<PrivateRoute element={<Employees />} />}
        />
        <Route path="/orders" element={<PrivateRoute element={<Orders />} />} />
        <Route
          path="/order-details/:orderId"
          element={<PrivateRoute element={<OrderDetails />} />}
        />
        <Route
          path="/employee-details/:employeeId"
          element={<PrivateRoute element={<EmployeeDetails />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
