import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface OrderDetails {
  dining_table_id: number;
  id: number;
  employee_id: number;
  status: number;
  total_amount: number;
  created: Date;
  modified: Date;
  orderedItems: {
    id: number;
    name: string;
    quantity: number;
  }[];
}

interface PreviousOrdersState {
  orderArray: OrderDetails[];
}

const initialState: PreviousOrdersState = {
  orderArray: [],
};

const previousOrderSlice = createSlice({
  name: 'previousOrders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<OrderDetails[]>) => {
      state.orderArray = action.payload;
    },
  },
});

export const { addOrder } = previousOrderSlice.actions;
export default previousOrderSlice.reducer;
