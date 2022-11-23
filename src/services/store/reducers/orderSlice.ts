import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrderState, IOrder } from '../../../types/orderTypes';

const initialState: IOrderState = {
  orderRequest: false,
  orderFailed: false,
  orderError: '',
  order: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    POST_ORDER: (state) => {
      state.orderRequest = true;
    },
    POST_ORDER_SUCCESS: (state, action: PayloadAction<IOrder>) => {
      state.orderRequest = false;
      state.order = action.payload;
    },
    POST_ORDER_FAILED: (state, action: PayloadAction<string>) => {
      state.orderRequest = false;
      state.orderFailed = true;
      state.orderError = action.payload;
    },
    CLEAR_ORDER: (state) => {
      state.order = null;
    },
  },
});

export const {
  POST_ORDER,
  POST_ORDER_FAILED,
  POST_ORDER_SUCCESS,
  CLEAR_ORDER,
} = orderSlice.actions;

export default orderSlice.reducer;
