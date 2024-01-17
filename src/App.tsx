import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './utils/privateRoute';

import Login from './pages/auth/Login';
import Home from './pages/home/Home';
import Signup from './pages/auth/Signup';
import AddOrder from './pages/order/AddOrder';
import Billing from './pages/bill/Billing';
import Employees from './pages/employee/Employees';
import Orders from './pages/order/Orders';
import OrderDetails from './pages/order/OrderDetails';
import EmployeeDetails from './pages/employee/EmployeeDetails';
import PageNotFound from './pages/common/404Page';

function App() {
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
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
