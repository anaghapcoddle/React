import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/state/store';
import Layout from '../../components/layout/Layout';
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
        <div className="basic-order-details">
          <p className="order-info">Order ID</p>
          <p className="order-info">{currentOrder[0].id} </p>
          <p className="order-info">Dining Table ID</p>
          <p className="order-info">{currentOrder[0].dining_table_id}</p>
          <p className="order-info">Employee ID</p>
          <p className="order-info">{currentOrder[0].employee_id}</p>
          <p className="order-info">Status</p>
          <p className="order-info">
            {currentOrder[0].status === 0 ? 'Processing' : 'Completed'}
          </p>
          <p className="order-info">Total Amount</p>
          <p className="order-info">{currentOrder[0].total_amount}</p>
          <p className="order-info">Created</p>
          <p className="order-info">{currentOrder[0].created}</p>
          <p className="order-info">Modified</p>
          <p className="order-info">{currentOrder[0].modified} </p>
        </div>
        <div className="ordered-items">
          <h3>Ordered Items </h3>
          <div className="ordered-items-list">
            <p>Item ID</p>
            <p>Name</p>
            <p>Quantity</p>
          </div>
          {currentOrder[0].orderedItems.map((item) => (
            <span className="ordered-item" key={item.id}>
              <p>{item.id} </p>
              <p>{item.name} </p>
              <p>{item.quantity} </p>
            </span>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default OrderDetails;
