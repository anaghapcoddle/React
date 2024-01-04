// import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../redux/state/store';
import Layout from '../components/Layout';
import './Orders.css';
import { getData } from '../utils/apiUtils';
import { addOrder } from '../redux/state/previousOrdersSlice';
// import OrderDetails from './OrderDetails';

interface MenuItem {
  id: number;
  name: string;
  quantity: number;
}

interface OrderDetails {
  dining_table_id: number;
  id: number;
  employee_id: number;
  status: number;
  total_amount: number;
  created: Date;
  modified: Date;
  orderedItems: MenuItem[];
}

function Orders() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(
    (state: RootState) => state.previousOrders.orderArray
  );

  // const getOrders = useCallback(async () => {
  //   const getOrdersResult = await getData(
  //     `${process.env.REACT_APP_API_URL}/orders/view`
  //   );
  //   const fetchedOrders = getOrdersResult.data.data;

  //   fetchedOrders.forEach((order: OrderDetails) => {
  //     const existingOrder = orders.find(
  //       (currentOrder) => currentOrder.id === order.id
  //     );
  //     if (!existingOrder) {
  //       dispatch(addOrder(order));
  //     }
  //   });
  // }, [dispatch, orders]);

  // useEffect(() => {
  //   getOrders();
  // }, [getOrders]);

  const showOrderedItems = (order: any) => {
    navigate(`/order-details/${order.id}`);
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
              <th className="order-header">Total Amount</th>
              <th className="order-header">Status</th>
              <th className="order-header">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.dining_table_id}</td>
                <td>{order.total_amount}</td>
                <td>{order.status === 0 ? 'Processing' : 'Completed'}</td>
                <td>
                  <button
                    type="button"
                    className="view-items-btn"
                    onClick={() => showOrderedItems(order)}
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
