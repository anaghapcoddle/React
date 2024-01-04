import React from 'react';

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

function EmployeeDetails() {
  return <div>EmployeeDetails</div>;
}

export default EmployeeDetails;
