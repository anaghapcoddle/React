import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { postData } from '../utils/apiUtils';
import './Billing.css';

interface OrderedItem {
  itemName: string;
  quantity: number;
  rate: string;
  amount: string;
}

interface BillData {
  date: string;
  staff: number;
  billNo: number;
  totalAmount: string;
  orderedItems: OrderedItem[];
}

function Billing() {
  const { orderId } = useParams();
  const [data, setData] = useState<BillData | null>(null);

  useEffect(() => {
    async function GetBillDetails() {
      const result = await postData(
        `${process.env.REACT_APP_API_URL}/bill/createbill`,
        { orderId }
      );
      setData(result.data.data);
    }
    GetBillDetails();
  }, [orderId]);

  return (
    <Layout>
      <div className="bill">
        <h1>Brunch Club</h1>
        {data && (
          <div className="bill-info">
            <p>Order ID: {orderId}</p>
            <p>Date: {data.date}</p>
            <p>Waiter Code: {data.staff}</p>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Rate</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.orderedItems.map((item) => (
                <tr key={item.itemName}>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.rate}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            {data && (
              <tr className="total">
                <td colSpan={3}>Total</td>
                <td>{data.totalAmount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button type="button" onClick={() => window.print()}>
        Print Bill
      </button>
    </Layout>
  );
}

export default Billing;
