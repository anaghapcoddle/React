import { configureStore } from '@reduxjs/toolkit';
import PreviousOrdersReduce from './previousOrdersSlice';

export const store = configureStore({
  reducer: {
    previousOrders: PreviousOrdersReduce,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
