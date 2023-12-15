import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './Layout';
import './Table.css';
import { getData } from '../utils/apiUtils';

function Table() {
  const { tableId } = useParams();
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
    async function GetMenuData() {
      const res = await getData(`${process.env.REACT_APP_API_URL}/menu/view`);
      const { data } = res.data;
      const menuItemsWithQuantity = data.map((item: any) => ({
        ...item,
        quantity: 0,
      }));
      setMenuItems(menuItemsWithQuantity);
    }
    GetMenuData();
  }, []);

  const handleIncrement = (itemId: string) => {
    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (itemId: string) => {
    setMenuItems((prevMenuItems) =>
      prevMenuItems.map((item) =>
        item.id === itemId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div className="table-order-page">
      <Layout>
        <div className="order-page-content container">
          <div className="heading">
            <span>Order for Table {tableId}</span>
          </div>
          <div className="menu-cart-wrapper">
            <div className="menu-items-container">
              <ul>
                {menuItems.map((menuItem) => (
                  <li key={menuItem.id} className="menu-item">
                    <span>{menuItem.name}</span>
                    <div className="quantity">
                      <button
                        type="button"
                        className="decrement-button quantity-element"
                        onClick={() => handleDecrement(menuItem.id)}
                      >
                        -
                      </button>
                      <span className="quantity-container quantity-element">
                        {menuItem.quantity}
                      </span>
                      <button
                        type="button"
                        className="increment-button quantity-element"
                        onClick={() => handleIncrement(menuItem.id)}
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="cart">
              <span className="cart-heading">Ordered Items</span>
              <div className="cart-body">
                {menuItems
                  .filter((menuItem) => menuItem.quantity > 0)
                  .map((menuItem) => (
                    <div key={menuItem.id} className="cart-item">
                      <span>{menuItem.name}</span>
                      <span>{menuItem.quantity}</span>
                    </div>
                  ))}
                <button type="button">Confirm Order</button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Table;
