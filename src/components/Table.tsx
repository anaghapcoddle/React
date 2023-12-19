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
  const [itemList, settemList] = useState<MenuItem[]>([]);
  const [employeeId, setEmployeeId] = useState<string>('');
  const [error, setError] = useState<any>('');

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

  const handleIncrement = (itemId: number) => {
    const updatedMenuItems = menuItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setMenuItems(updatedMenuItems);
  };

  const handleDecrement = (itemId: number) => {
    const updatedMenuItems = menuItems.map((item) =>
      item.id === itemId && item.quantity > 0
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setMenuItems(updatedMenuItems);
  };

  const addToArray = (selectedItem: MenuItem | undefined) => {
    if (selectedItem) {
      settemList((current) => [...current, selectedItem]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reducedOrderDetails = itemList.map(({ id, quantity }) => ({
      id,
      quantity,
    }));
    const res = await postData(`${process.env.REACT_APP_API_URL}/orders/add`, {
      employeeId,
      diningTableId: tableId,
      status: 'REC',
      items: reducedOrderDetails,
    });
    if (res.error) {
      setError(res.error.response?.data?.error);
    }
  };

  return (
    <div className="table-order-page">
      <Layout>
        <form className="order-page-content container" onSubmit={handleSubmit}>
          <div className="heading">
            <span>Order for Table {tableId}</span>
          </div>
          <div className="order-items-wrapper">
            <div className="order-items-item-heading">
              <span>Item</span>
            </div>
            <div className="order-items-quantity-heading">
              <span>Quantity</span>
            </div>
            <div />
            <div className="select-item-wrapper">
              <select name="option" onChange={handleChange}>
                <option value="Select an item">Select an item</option>
                {menuItems.map((menuItem) => (
                  <option value={menuItem.id}>{menuItem.name}</option>
                ))}
              </select>
            </div>
            <div className="quantity">
              <button
                type="button"
                className="decrement-button quantity-element"
                onClick={() => {
                  if (option !== undefined) {
                    handleDecrement(menuItems[option - 1].id);
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
                className="increment-button quantity-element"
                onClick={() => {
                  if (option !== undefined) {
                    handleIncrement(menuItems[option - 1].id);
                  }
                }}
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                if (option !== undefined) {
                  addToArray(menuItems[option - 1]);
                }
              }}
            >
              Add Item
            </button>
          </div>
          {itemList.map((item) => (
            <div>
              <span key={item.id} className="display-item-name">
                {item.name}
              </span>
              <span key={item.id} className="display-item-quantity">
                {item.quantity}
              </span>
            </div>
          ))}
          <button className="create-order-button" type="submit">
            Create Order
          </button>
          <p className="error-message">{error}</p>
        </form>
      </Layout>
    </div>
  );
}

export default Table;
