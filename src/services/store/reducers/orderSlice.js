import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderRequest: false,
  orderFailed: false,
  orderError: '',
  order: {},
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    POST_ORDER: (state) => {
      state.orderRequest = true;
    },
    POST_ORDER_SUCCESS: (state, action) => {
      state.orderRequest = false;
      state.order = action.payload;
    },
    POST_ORDER_FAILED: (state, action) => {
      state.orderRequest = false;
      state.orderFailed = true;
      state.orderError = action.payload;
    },
    CLEAR_ORDER: (state) => {
      state.order = {};
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
