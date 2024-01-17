import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface MenuItem {
  id: number;
  name: string;
  quantity: number;
}

interface OrderDetails {
  dining_table_id: number;
  id: number;
  employee_id: number;
  status: number;
  total_amount: number;
  created: string;
  modified: string;
  orderedItems: MenuItem[];
}

interface PreviousOrdersState {
  orderDetails: OrderDetails[];
}

const initialState: PreviousOrdersState = {
  orderDetails: [],
};

const previousOrderSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    setOrderDetails: (state, action: PayloadAction<OrderDetails[]>) => {
      return {
        ...state,
        orderDetails: action.payload,
      };
    },
  },
});

export const { setOrderDetails } = previousOrderSlice.actions;
export default previousOrderSlice.reducer;
