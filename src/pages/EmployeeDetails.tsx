import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { RootState } from '../redux/state/store';

function EmployeeDetails() {
  const { employeeId } = useParams<{ employeeId: string }>();
  const employees = useSelector(
    (state: RootState) => state.employeeDetails.employeeDetails
  );
  const currentEmployee = employees.filter(
    (item) => item.id === parseInt(employeeId ?? '0', 10)
  );
  return (
    <Layout>
      <div className="employee-details-container">
        <h2>Employee Details </h2>
        <div>
          <p className="employee-info"> Order ID: {currentEmployee[0].id} </p>
          <p className="employee-info">
            {' '}
            First name: {currentEmployee[0].firstName}{' '}
          </p>
          <p className="employee-info">
            {' '}
            Last name: {currentEmployee[0].lastName}{' '}
          </p>
          <p className="employee-info">
            {' '}
            Phone number: {currentEmployee[0].phone}{' '}
          </p>
          <p className="employee-info">
            {' '}
            Address: {currentEmployee[0].address}{' '}
          </p>
          <p className="employee-info"> Job ID: {currentEmployee[0].jobId} </p>
          <p className="employee-info"> Salary: {currentEmployee[0].salary} </p>
          <p className="employee-info">
            {' '}
            Username: {currentEmployee[0].username}{' '}
          </p>
          <p className="employee-info">
            {' '}
            Password: {currentEmployee[0].password}{' '}
          </p>
          <p className="employee-info">
            {' '}
            Role ID: {currentEmployee[0].roleId}{' '}
          </p>
          <p className="employee-info">
            {' '}
            Created: {currentEmployee[0].created}{' '}
          </p>
          <p className="employee-info">
            {' '}
            Modified: {currentEmployee[0].modified}{' '}
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default EmployeeDetails;
