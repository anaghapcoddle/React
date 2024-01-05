import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/state/store';
import Layout from '../components/Layout';
import './OrderDetails.css';

function OrderDetails() {
  const { orderId } = useParams<{ orderId: string }>();

  const orders = useSelector(
    (state: RootState) => state.previousOrders.orderDetails
  );

  const currentOrder = orders.filter(
    (item) => item.id === parseInt(orderId ?? '0', 10)
  );

  return (
    <Layout>
      <div className="order-details-container">
        <h2>Order Details </h2>
        <div>
          <p className="order-info"> Order ID: {currentOrder[0].id} </p>
          <p className="order-info">
            {' '}
            Dining Table ID: {currentOrder[0].dining_table_id}{' '}
          </p>
          <p className="order-info">
            {' '}
            Employee ID: {currentOrder[0].employee_id}{' '}
          </p>
          <p className="order-info">
            {' '}
            Status: {currentOrder[0].status === 0
              ? 'Processing'
              : 'Completed'}{' '}
          </p>
          <p className="order-info">
            {' '}
            Total Amount: {currentOrder[0].total_amount}{' '}
          </p>
          <p className="order-info">Created: {currentOrder[0].created} </p>
          <p className="order-info"> Modified: {currentOrder[0].modified} </p>
        </div>
        <div className="ordered-items">
          <h3>Ordered Items </h3>
          {currentOrder[0].orderedItems.map((item) => (
            <div className="ordered-item" key={item.id}>
              <p>Item ID: {item.id} </p>
              <p> Name: {item.name} </p>
              <p> Quantity: {item.quantity} </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default OrderDetails;
