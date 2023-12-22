import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../state/store';
import { getData } from '../utils/apiUtils';
import { addOrder } from '../state/previousOrdersSlice';

function PreviousOrders() {
  const dispatch = useDispatch();
  const { tableId } = useParams<{ tableId: string }>();

  const orders = useSelector(
    (state: RootState) => state.previousOrders.orderArray
  );

  useEffect(() => {
    async function getOrders() {
      const getOrdersResult = await getData(
        `${process.env.REACT_APP_API_URL}/orders/view`
      );
      const fetchedOrders = getOrdersResult.data.data;
      fetchedOrders.forEach((order) => {
        dispatch(addOrder(order));
      });
    }
    getOrders();
  }, [dispatch]);

  const filteredOrders = orders.filter(
    (order) =>
      order.dining_table_id === 0 &&
      order.dining_table_id === parseInt(tableId, 10)
  );

  return (
    <aside>
      <h2>Previously ordered</h2>
      <ul>
        {filteredOrders.map((order) => (
          <li key={order.id}>
            <p>Items ordered:</p>
            <ul>
              {Object.entries(order.orderedItems).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default PreviousOrders;
