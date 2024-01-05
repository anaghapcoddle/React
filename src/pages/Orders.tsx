import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/state/store';
import Layout from '../components/Layout';
import './Orders.css';

function Orders() {
  const navigate = useNavigate();
  const orders = useSelector(
    (state: RootState) => state.previousOrders.orderDetails
  );

  const showOrderDetails = (order: number) => {
    navigate(`/order-details/${order}`);
  };

  return (
    <Layout>
      <div className="order-table-container">
        <h2>Orders</h2>
        <table className="order-table">
          <thead>
            <tr>
              <th className="order-header">Order ID</th>
              <th className="order-header">Dining Table</th>
              <th className="order-header">Order Date</th>
              <th className="order-header">Status</th>
              <th className="order-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.dining_table_id}</td>
                <td>{order.created}</td>
                <td>{order.status === 0 ? 'Processing' : 'Completed'}</td>
                <td>
                  <button
                    type="button"
                    className="view-items-btn"
                    onClick={() => showOrderDetails(order.id)}
                  >
                    View Items
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Orders;
