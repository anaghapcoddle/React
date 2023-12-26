import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../state/store';
import { getData } from '../utils/apiUtils';
import { addOrder } from '../state/previousOrdersSlice';

interface ItemDetails {
  name: string;
  quantity: number;
}

interface OrderDetails {
  dining_table_id: number;
  id: number;
  employee_id: number;
  status: number | undefined;
  total_amount: number;
  created: Date;
  modified: Date;
  orderedItems: ItemDetails;
}

function PreviousOrders() {
  const dispatch = useDispatch();
  const { tableId } = useParams<{ tableId: string }>();

  const orders = useSelector(
    (state: RootState) => state.previousOrders.orderArray
  );
  // const dispatchedOrderIds = useMemo(() => new Set<number>(), []);
  useEffect(() => {
    async function getOrders() {
      const getOrdersResult = await getData(
        `${process.env.REACT_APP_API_URL}/orders/view`
      );
      const fetchedOrders = getOrdersResult.data.data;
      fetchedOrders.forEach((order: OrderDetails) => {
        // if (!dispatchedOrderIds.has(order.id)) {
        dispatch(addOrder(order));

        // console.log(dispatchedOrderIds);
        // dispatchedOrderIds.add(order.id);
        // }
      });
    }
    getOrders();
    // }, [dispatch, dispatchedOrderIds]);
  }, [dispatch]);

  const filteredOrders = orders.filter(
    (order) => order.dining_table_id === parseInt(tableId || '0', 10)
  );

  return (
    <aside>
      <h2>Previously ordered</h2>
      <ul>
        {filteredOrders.map((order) => (
          <li key={order.id}>
            <ul>
              {/* {Object.entries(order.orderedItems).map(([key, value]) => (
                <span key={key}>
                  <span>{key}</span>
                  <button type="button">Increement</button>
                </span>
              ))} */}
              <span>{order.orderedItems.name}</span>
              <button type="button">-</button>
              <span>{order.orderedItems.quantity}</span>
              <button type="button">+</button>
              <button type="button">Delete</button>
            </ul>
          </li>
        ))}
      </ul>
      <button type="button">Update Order</button>
    </aside>
  );
}

export default PreviousOrders;
