import { configureStore } from '@reduxjs/toolkit';
import PreviousOrdersReduce from './previousOrdersSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    previousOrders: PreviousOrdersReduce,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
