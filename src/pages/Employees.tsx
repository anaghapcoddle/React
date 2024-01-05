import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Employees.css';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../utils/apiUtils';
import Layout from '../components/Layout';
import { setEmployeeDetails } from '../redux/state/employeeDetailsSlice';
import { RootState } from '../redux/state/store';

function Employees() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getEmployeeDetails = useCallback(async () => {
    const getEmployeeResult = await getData(
      `${process.env.REACT_APP_API_URL}/admin/employee/view`
    );
    const employeeData = getEmployeeResult.data.employees;
    dispatch(setEmployeeDetails(employeeData));
  }, [dispatch]);

  useEffect(() => {
    getEmployeeDetails();
  }, [getEmployeeDetails]);

  const employees = useSelector(
    (state: RootState) => state.employeeDetails.employeeDetails
  );

  const showOrderDetails = (employee: number) => {
    navigate(`/employee-details/${employee}`);
  };

  return (
    <Layout>
      <div className="employee-table-container container">
        <h2>Employee Details</h2>
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone</th>
              <th>Salary</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.phone}</td>
                <td>{employee.salary}</td>
                <td>
                  <button
                    type="button"
                    className="view-details-btn"
                    onClick={() => showOrderDetails(employee.id)}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export default Employees;
