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
  created: string;
  modified: string;
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
      return {
        ...state,
        employeeDetails: action.payload,
      };
    },
    setSingleEmployeeDetails: (
      state,
      action: PayloadAction<EmployeeDetails>
    ) => {
      const updatedEmployee = action.payload;
      const index = state.employeeDetails.findIndex(
        (emp) => emp.id === updatedEmployee.id
      );
      if (index !== -1) {
        const updatedArray = [
          ...state.employeeDetails.slice(0, index),
          updatedEmployee,
          ...state.employeeDetails.slice(index + 1),
        ];
        return { ...state, employeeDetails: updatedArray };
      }
      return state;
    },
  },
});

export const { setEmployeeDetails, setSingleEmployeeDetails } =
  EmployeeDetailsSlice.actions;
export default EmployeeDetailsSlice.reducer;
