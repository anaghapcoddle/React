import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/state/store';
import Layout from '../components/Layout';
import './OrderDetails.css';

function OrderDetails() {
  // const { tableId } = useParams<{ tableId: string }>();
  const { orderId } = useParams<{ orderId: string }>();
  const orderIdNumber = parseInt(orderId, 10);

  const orders = useSelector(
    (state: RootState) => state.previousOrders.orderArray
  );

  console.log(orders);
  const currentOrder = orders.filter((item) => item.id === orderIdNumber);
  console.log(currentOrder[0].id);

  return (
    <Layout>
      <div className="order-details-container">
        <h2>Order Details </h2>
        <div>
          <p className="order-info"> Order ID: {currentOrder[0].id} </p>
          <p className="order-info">
            {' '}
            Dining Table ID: {currentOrder.dining_table_id}{' '}
          </p>
          <p className="order-info">
            {' '}
            Employee ID: {currentOrder.employee_id}{' '}
          </p>
          <p className="order-info">
            {' '}
            Status: {currentOrder.status === 0
              ? 'Processing'
              : 'Completed'}{' '}
          </p>
          <p className="order-info">
            {' '}
            Total Amount: {currentOrder.total_amount}{' '}
          </p>
          <p className="order-info"> Created: {currentOrder.created} </p>
          <p className="order-info"> Modified: {currentOrder.modified} </p>
        </div>
        {/* <div className="ordered-items">
          <h3>Ordered Items </h3>
          {currentOrder.orderedItems.map((item) => (
            <div className="ordered-item" key={item.itemId}>
              <p>Item ID: {item.itemId} </p>
              <p> Name: {item.name} </p>
              <p> Quantity: {item.quantity} </p>
            </div>
          ))}
        </div> */}
      </div>
    </Layout>
  );
}

export default OrderDetails;
