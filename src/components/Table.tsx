import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './Layout';
import './Table.css';
import { getData } from '../utils/apiUtils';

interface MenuItem {
  id: number;
  name: string;
  quantity: number;
}

function Table() {
  const { tableId } = useParams<{ tableId: string }>();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [option, setOption] = useState<number | undefined>();
  const [itemList, settemList] = useState<MenuItem[]>([]);

  useEffect(() => {
    async function GetMenuData() {
      const res = await getData(`${process.env.REACT_APP_API_URL}/menu/view`);
      const { data } = res.data;
      const menuItemsWithQuantity: MenuItem[] = data.map((item: MenuItem) => ({
        ...item,
        quantity: 0,
      }));
      setMenuItems(menuItemsWithQuantity);
    }
    GetMenuData();
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

  return (
    <div className="table-order-page">
      <Layout>
        <div className="order-page-content container">
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
            <p key={item.id}>{item.name}</p>
          ))}
        </div>
      </Layout>
    </div>
  );
}

export default Table;
