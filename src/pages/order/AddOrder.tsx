import CreateOrderForm from '../../components/order/CreateOrderForm';
import PreviousOrders from '../../components/order/PreviousOrders';
import './AddOrder.css';
import Layout from '../../components/layout/Layout';

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
