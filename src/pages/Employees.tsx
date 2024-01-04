import React, { useState, useEffect, useCallback } from 'react';
import './Employees.css';
import { getData } from '../utils/apiUtils';
import Layout from '../components/Layout';

interface EmployeeData {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  jobId: number;
  salary: number;
  username: string;
  password: string;
  roleId: number;
  created: Date;
  modified: Date;
}

function Employees() {
  const [employeeData, setEmployeeData] = useState<EmployeeData[]>([]);

  const getEmployeeDetails = useCallback(async () => {
    const result = await getData(
      `${process.env.REACT_APP_API_URL}/admin/employee/view`
    );
    setEmployeeData(result.data.data);
  }, []);

  useEffect(() => {
    getEmployeeDetails();
  }, [getEmployeeDetails]);

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
            {employeeData.map((employee) => (
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
                    // onClick={() => handleViewDetails(employee.id)}
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
