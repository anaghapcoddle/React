import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import './CreateOrderForm.css';
import { useSelector } from 'react-redux';
import { getData, patchData, postData } from '../utils/apiUtils';
import { RootState } from '../redux/state/store';

interface MenuItem {
  id: number;
  name: string;
  category_id: number;
  price: number;
  availability: number;
  quantity: number;
}

interface DecodedToken {
  id: string;
  firstName: string;
  email: string;
}

function CreateOrderForm() {
  const token = localStorage.getItem('token');
  const decoded: DecodedToken = jwtDecode(token as string);
  const employeeId = decoded.id;

  const { tableId } = useParams<{ tableId: string }>();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [option, setOption] = useState<number | undefined>();
  const [itemList, setItemList] = useState<MenuItem[]>([]);
  const [error, setError] = useState<any>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    async function GetMenuData() {
      const res = await getData(`${process.env.REACT_APP_API_URL}/menu/view`);
      const { data } = res.data;
      const menuItemsWithQuantity: MenuItem[] = data.map((item: MenuItem) => ({
        ...item,
        quantity: 1,
      }));
      setMenuItems(menuItemsWithQuantity);
    }
    GetMenuData();
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = parseInt(event.target.value, 10);
    setOption(value);
  }

  const handleIncrement = (
    itemId: number,
    list: MenuItem[],
    stateFunction: any
  ) => {
    const updatedMenuItems = list.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    stateFunction(updatedMenuItems);
  };

  const handleDecrement = (
    itemId: number,
    list: MenuItem[],
    stateFunction: any
  ) => {
    const updatedMenuItems = list.map((item) =>
      item.id === itemId && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    stateFunction(updatedMenuItems);
  };

  const addToArray = (selectedItem: MenuItem | undefined) => {
    const found = itemList.some((el) => el.id === selectedItem?.id);
    if (selectedItem && !found) {
      setItemList((current) => [...current, selectedItem]);
    }
  };

  const handleDelete = (itemIdToRemove: number) => {
    const updatedMenuItems = itemList.filter(
      (item) => item.id !== itemIdToRemove
    );
    setItemList(updatedMenuItems);
  };

  const reducedOrderDetails = itemList.map(({ id, quantity }) => ({
    id,
    quantity,
  }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const reducedOrderDetails = itemList.map(({ id, quantity }) => ({
    //   id,
    //   quantity,
    // }));
    const res = await postData(`${process.env.REACT_APP_API_URL}/orders/add`, {
      employeeId,
      tableId,
      items: reducedOrderDetails,
    });
    if (res.error) {
      setError(res.error.response?.data?.error);
    } else {
      setSuccessMessage('Order created successfully.');
    }
  };

  const handleBillgenerate = () => {
    // localStorage.removeItem('token');
    window.location.href = '/billing';
  };

  const orders = useSelector(
    (state: RootState) => state.previousOrders.orderArray
  );

  const filteredOrders = orders.filter(
    (order) =>
      order.dining_table_id === parseInt(tableId || '0', 10) &&
      order.status == 0
  );

  const updateOrder = async () => {
    const res = await patchData(
      `${process.env.REACT_APP_API_URL}/orders/update`,
      {
        orderNumber: filteredOrders[0].id,
        items: reducedOrderDetails,
      }
    );
    if (res.error) {
      setError(res.error.response?.data?.error);
    } else {
      setSuccessMessage('Order updated successfully.');
    }
  };


  return (
    <form className="order-page-content" onSubmit={handleSubmit}>
      <div className="heading">
        <h1 className="form-title add-order-heading">
          ORDER FOR TABLE {tableId}
        </h1>
      </div>
      <div className="order-items-wrapper">
        <div className="order-items-item-heading">
          <span className="dropdown-label">Food Item</span>
        </div>
        <div className="order-items-quantity-heading">
          <span className="dropdown-label">Quantity</span>
        </div>
        <div />
        <div className="select-item-wrapper">
          <select
            name="option"
            className="menu-item-dropdown button-design"
            onChange={handleChange}
          >
            <option
              value="Select an item"
              className="menu-item-dropdown-option"
            >
              Select an item
            </option>
            {menuItems.map((menuItem) => (
              <option key={menuItem.id} value={menuItem.id}>
                {menuItem.name}
              </option>
            ))}
          </select>
        </div>
        <div className="quantity-buttons-wrapper button-design">
          <button
            type="button"
            className="quantity-update-button"
            onClick={() => {
              if (option !== undefined) {
                handleDecrement(
                  menuItems[option - 1].id,
                  menuItems,
                  setMenuItems
                );
              }
            }}
          >
            -
          </button>
          <span className="quantity-container">
            {option !== null &&
              menuItems.find((item) => item.id === option)?.quantity}
          </span>
          <button
            type="button"
            className="quantity-update-button"
            onClick={() => {
              if (option !== undefined) {
                handleIncrement(
                  menuItems[option - 1].id,
                  menuItems,
                  setMenuItems
                );
              }
            }}
          >
            +
          </button>
        </div>
        <div className="add-item-button-wrapper button-design">
          <button
            type="button"
            className="add-item-button button-design"
            onClick={() => {
              if (option !== undefined) {
                addToArray(menuItems[option - 1]);
              }
            }}
          >
            Add Item
          </button>
        </div>
      </div>
      <div className="view-added-elements-wrapper">
        {itemList.map((item) => (
          <div key={item.id} className="display-item">
            <span>{item.name}</span>
            <div className="added-elements-quantity-buttons">
              <button
                type="button"
                className="decrement-button button-design"
                onClick={() => {
                  handleDecrement(item.id, itemList, setItemList);
                }}
              >
                -
              </button>
              <span className="display-item-quantity">{item.quantity}</span>
              <button
                type="button"
                className="increment-button button-design"
                onClick={() => {
                  handleIncrement(item.id, itemList, setItemList);
                }}
              >
                +
              </button>
            </div>
            <button
              type="button"
              className="button-design"
              onClick={() => {
                handleDelete(item.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="page-bottom-buttons">
        <button className="create-order-button button-design" type="submit">
          Create Order
        </button>
        <button
          className="generate-bill button-design"
          type="button"
          onClick={updateOrder}
        >
          Update Order
        </button>
        <button
          className="generate-bill button-design"
          type="button"
          onClick={handleBillgenerate}
        >
          Generate Bill
        </button>
      </div>
      <p className="error-message">{error}</p>
      <p className="success-message">{successMessage}</p>
    </form>
  );
}

export default CreateOrderForm;
