import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataRequest: false,
  dataFailed: false,
  data: [],

  addedIngredients: [],
  currentIngredient: {},

  orderRequest: false,
  orderFailed: false,
  order: {},

  modal: '',
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    REQUEST_DATA: (state) => {
      state.dataRequest = true;
    },
    REQUEST_DATA_SUCCESS: (state, action) => {
      state.dataRequest = false;
      state.data = action.payload;
    },
    REQUEST_DATA_FAILED: (state) => {
      state.dataRequest = false;
      state.dataFailed = true;
    },
    OPEN_MODAL_INGREDIENT: (state, action) => {
      state.currentIngredient = action.payload;
      state.modal = 'ingredient';
    },
    POST_ORDER: (state) => {
      state.orderRequest = true;
      state.modal = 'order';
    },
    POST_ORDER_SUCCESS: (state, action) => {
      state.order = action.payload;
    },
    POST_ORDER_FAILED: (state) => {
      state.orderRequest = false;
      state.orderFailed = true;
    },
    CLOSE_MODAL: (state) => {
      state.currentIngredient = {};
      state.modal = '';
    },
    ADD_INGREDIENT: (state, action) => {
      state.addedIngredients.push(action.payload);
    },
  },
});

export const {
  REQUEST_DATA,
  REQUEST_DATA_SUCCESS,
  REQUEST_DATA_FAILED,
  OPEN_MODAL_INGREDIENT,
  CLOSE_MODAL,
  POST_ORDER,
  POST_ORDER_SUCCESS,
  POST_ORDER_FAILED,
  ADD_INGREDIENT,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
