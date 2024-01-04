import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface EmployeeDetails {
  id: number;
  firstName: string;
  lastName: string;
  phone: number;
  address: string;
  jobId: number;
  salary: number;
  username: string;
  email: string;
  password: string;
  roleId: number;
  created: Date;
  modified: Date;
}

interface EmployeeDetailsState {
  employeeDetails: EmployeeDetails[];
}

const initialState: EmployeeDetailsState = {
  employeeDetails: [],
};

const EmployeeDetailsSlice = createSlice({
  name: 'employeeDetails',
  initialState,
  reducers: {
    setEmployeeDetails: (state, action: PayloadAction<EmployeeDetails[]>) => {
      state.employeeDetails = action.payload;
    },
  },
});

export const { setEmployeeDetails } = EmployeeDetailsSlice.actions;
export default EmployeeDetailsSlice.reducer;
