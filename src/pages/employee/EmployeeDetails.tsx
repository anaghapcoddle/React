import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/state/store';
import { setSingleEmployeeDetails } from '../../redux/state/employeeDetailsSlice';
import Layout from '../../components/layout/Layout';
import { patchData } from '../../utils/apiUtils';
import './EmployeeDetails.css';

function EmployeeDetailsForm() {
  const dispatch = useDispatch();
  const { employeeId } = useParams<{ employeeId: string }>();
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const employees = useSelector(
    (state: RootState) => state.employeeDetails.employeeDetails
  );
  const currentEmployee = employeeId
    ? employees.find((item) => item.id === parseInt(employeeId, 10))
    : undefined;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentEmployee) {
      const { name, value } = e.target;
      dispatch(setSingleEmployeeDetails({ ...currentEmployee, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    if (currentEmployee) {
      dispatch(setSingleEmployeeDetails(currentEmployee));
      const detailsUpdateResult = await patchData(
        `${process.env.REACT_APP_API_URL}/admin/employee/update`,
        currentEmployee
      );
      if (detailsUpdateResult.error) {
        setError(detailsUpdateResult.error.response?.data?.error);
        setSuccessMessage('');
      } else {
        setSuccessMessage('Employee data updated successfully.');
        setError('');
      }
    }
  };

  return (
    <Layout>
      <form className="employee-details-form-container">
        <div className="input-container">
          Employee ID:{' '}
          <input
            type="text"
            name="id"
            value={currentEmployee?.id ?? ''}
            className="input-field"
            disabled
          />
        </div>
        <div className="input-containers-wrapper">
          <div className="input-container">
            First Name:{' '}
            <input
              type="text"
              name="firstName"
              value={currentEmployee?.firstName ?? ''}
              className="input-field"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            Last Name:{' '}
            <input
              type="text"
              name="lastName"
              value={currentEmployee?.lastName ?? ''}
              className="input-field"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            Phone number:{' '}
            <input
              type="text"
              name="phone"
              value={currentEmployee?.phone ?? ''}
              className="input-field"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            Address:{' '}
            <input
              type="text"
              name="address"
              value={currentEmployee?.address ?? ''}
              className="input-field"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            Job ID:{' '}
            <input
              type="text"
              name="jobId"
              value={currentEmployee?.jobId ?? ''}
              className="input-field"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            Salary:{' '}
            <input
              type="text"
              name="salary"
              value={currentEmployee?.salary ?? ''}
              className="input-field"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            Username:{' '}
            <input
              type="text"
              name="username"
              value={currentEmployee?.username ?? ''}
              className="input-field"
              disabled
            />
          </div>
          <div className="input-container">
            Email:{' '}
            <input
              type="text"
              name="email"
              value={currentEmployee?.email ?? ''}
              className="input-field"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            Password:{' '}
            <input
              type="text"
              name="password"
              value={currentEmployee?.password ?? ''}
              className="input-field"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            Role ID:{' '}
            <input
              type="text"
              name="roleId"
              value={currentEmployee?.roleId ?? ''}
              className="input-field"
              onChange={handleInputChange}
            />
          </div>
          <div className="input-container">
            Employee Account Created:{' '}
            <input
              type="text"
              name="created"
              value={currentEmployee?.created ?? ''}
              className="input-field"
              disabled
            />
          </div>
          <div className="input-container">
            Employee Account Last Updated:{' '}
            <input
              type="text"
              name="modified"
              value={currentEmployee?.modified ?? ''}
              className="input-field"
              disabled
            />
          </div>
        </div>
        <button type="button" className="update-button" onClick={handleUpdate}>
          Update
        </button>
      </form>

      <p className="error-message">{error}</p>
      <p className="success-message">{successMessage}</p>
    </Layout>
  );
}

export default EmployeeDetailsForm;
