import { useEffect, useState } from 'react';
import { getData } from '../utils/apiUtils';

function OrderItem() {
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

  return (
    <div className="new-item-wrapper">
      <div className="select-item-wrapper">
        <select>
          <option value="Select an item">Select an item</option>
          {menuItems.map((menuItem) => (
            <option value={menuItem.name}>{menuItem.name}</option>
          ))}
        </select>
      </div>
      <div className="quantity">
       
      </div>
    </div>
  );
}

export default OrderItem;
