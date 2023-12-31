import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../redux/state/store';
import { deleteData, getData, patchData } from '../utils/apiUtils';
import { addOrder } from '../redux/state/previousOrdersSlice';
import './PreviousOrders.css';

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

function PreviousOrders() {
  const dispatch = useDispatch();
  const { tableId } = useParams<{ tableId: string }>();
  const [updatedOrderList, setUpdatedOrderList] = useState<MenuItem[]>([]);
  const [error, setError] = useState<any>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

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

  const filteredOrders = orders.filter(
    (order) =>
      order.dining_table_id === parseInt(tableId || '0', 10) &&
      order.status == 0
  );

  useEffect(() => {
    getOrders();

    if (
      filteredOrders.length > 0 &&
      Object.keys(updatedOrderList).length == 0
    ) {
      setUpdatedOrderList(filteredOrders[0].orderedItems);
    }
  }, [getOrders, filteredOrders, updatedOrderList]);

  const handleDecrement = (itemId: number) => {
    const updatedItems = updatedOrderList.map((item) =>
      item.id === itemId && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setUpdatedOrderList(updatedItems);
  };

  const handleIncrement = (itemId: number) => {
    const updatedOrderItems = updatedOrderList.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setUpdatedOrderList(updatedOrderItems);
  };

  const handleDelete = async (
    itemIdToRemove: MenuItem,
    orderNumber: number
  ) => {
    const updatedMenuItems = updatedOrderList.filter(
      (item) => item.id !== itemIdToRemove.id
    );
    setUpdatedOrderList(updatedMenuItems);
    await deleteData(`${process.env.REACT_APP_API_URL}/orders/remove`, {
      orderNumber,
      removeItem: itemIdToRemove,
    });
  };

  const updateOrder = async () => {
    const res = await patchData(
      `${process.env.REACT_APP_API_URL}/orders/update`,
      {
        orderNumber: filteredOrders[0].id,
        items: updatedOrderList,
      }
    );
    if (res.error) {
      setError(res.error.response?.data?.error);
    } else {
      setSuccessMessage('Order updated successfully.');
    }
  };

  return (
    <aside>
      <h2 className="add-order-heading">ORDERS SENT TO KITCHEN</h2>
      <ul className="previous-order-item-list">
        {updatedOrderList.map((item) => (
          <li key={item.id}>
            <div className="previous-order-column">
              <span>{item.name}</span>
            </div>
            <div className="previous-order-column increment-button-container">
              <button
                type="button" className="button-design"
                onClick={() => {
                  handleDecrement(item.id);
                }}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                type="button" className="button-design"
                onClick={() => {
                  handleIncrement(item.id);
                }}
              >
                +
              </button>
            </div>
            <div className="previous-order-column">
              <button
                type="button"
                className="button-design"
                onClick={() => {
                  handleDelete(item, filteredOrders[0].id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="previous-order-update-button-container">
        <button
          type="button"
          onClick={updateOrder}
          className="button-design previous-order-update-button"
        >
          Update Order
        </button>
      </div>
      <p className="error-message">{error}</p>
      <p className="success-message">{successMessage}</p>
    </aside>
  );
}

export default PreviousOrders;
