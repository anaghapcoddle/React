import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Layout from './Layout';
import './Table.css';
import { getData, postData } from '../utils/apiUtils';

interface MenuItem {
  id: number;
  name: string;
  quantity: number;
}

interface DecodedToken {
  id: string;
  firstName: string;
  email: string;
}

function Table() {
  const { tableId } = useParams<{ tableId: string }>();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [option, setOption] = useState<number | undefined>();
  const [itemList, setItemList] = useState<MenuItem[]>([]);
  const [employeeId, setEmployeeId] = useState<string>('');
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
    const token = localStorage.getItem('token');
    const decoded: DecodedToken = jwtDecode(token as string);
    const { id } = decoded;
    setEmployeeId(id);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reducedOrderDetails = itemList.map(({ id, quantity }) => ({
      id,
      quantity,
    }));
    const res = await postData(`${process.env.REACT_APP_API_URL}/orders/add`, {
      employeeId,
      tableId,
      status: 'REC',
      items: reducedOrderDetails,
    });
    if (res.error) {
      setError(res.error.response?.data?.error);
    } else {
      setSuccessMessage('Order created successfully.');
    }
  };

  return (
    <div className="table-order-page">
      <Layout>
        <form className="order-page-content container" onSubmit={handleSubmit}>
          <div className="heading order-page-element">
            <h1 className="form-title">ORDER FOR TABLE {tableId}</h1>
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
                className="menu-item-dropdown"
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
            <div className="quantity-buttons-wrapper">
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
              <span className="quantity-container quantity-element">
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
            <div className="add-item-button-wrapper">
              <button
                type="button"
                className="add-item-button"
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
                    className="decrement-button quantity-element"
                    onClick={() => {
                      handleDecrement(item.id, itemList, setItemList);
                    }}
                  >
                    -
                  </button>
                  <span className="display-item-quantity">{item.quantity}</span>
                  <button
                    type="button"
                    className="increment-button quantity-element"
                    onClick={() => {
                      handleIncrement(item.id, itemList, setItemList);
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
          <button
            className="create-order-button order-page-element"
            type="submit"
          >
            Create Order
          </button>
          <p className="error-message">{error}</p>
          <p className="success-message">{successMessage}</p>
        </form>
      </Layout>
    </div>
  );
}

export default Table;
