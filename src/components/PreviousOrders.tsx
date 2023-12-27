import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../redux/state/store';
import { getData } from '../utils/apiUtils';
import { addOrder } from '../redux/state/previousOrdersSlice';

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
  orderedItems: MenuItem;
}

function PreviousOrders() {
  const dispatch = useDispatch();
  const { tableId } = useParams<{ tableId: string }>();
  // const [updatedOrderList, setUpdatedOrderList] = useState<MenuItem[]>([]);

  const orders = useSelector(
    (state: RootState) => state.previousOrders.orderArray
  );

  const getOrders = useCallback(async () => {
    const getOrdersResult = await getData(
      `${process.env.REACT_APP_API_URL}/orders/view`
    );
    const fetchedOrders = getOrdersResult.data.data;

    fetchedOrders.forEach((order: OrderDetails) => {
      const existingOrder = orders.find(
        (currentOrder) => currentOrder.id === order.id
      );
      if (!existingOrder) {
        dispatch(addOrder(order));
      }
    });
  }, [dispatch, orders]);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const filteredOrders = orders.filter(
    (order) => order.dining_table_id === parseInt(tableId || '0', 10)
  );

  //  Object.entries(filteredOrders[0].orderedItems).map(([key, value]) => (

  //         ))

  //   console.log(filteredOrders[0]);

  return (
    <aside>
      <h2>Previously ordered</h2>
      <ul>
        {filteredOrders.map((order) => (
          <li key={order.id}>
            <ul>
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
