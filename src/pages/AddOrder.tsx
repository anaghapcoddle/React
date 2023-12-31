import React from 'react';
import Layout from '../components/Layout';
import CreateOrderForm from '../components/CreateOrderForm';
import PreviousOrders from '../components/PreviousOrders';
import './AddOrder.css';

function Table() {
  return (
    <Layout>
      <div className="table-order-page container">
        <CreateOrderForm />
        <PreviousOrders />
      </div>
    </Layout>
  );
}

export default Table;
