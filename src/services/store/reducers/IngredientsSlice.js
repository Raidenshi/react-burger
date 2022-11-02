import { createSlice } from '@reduxjs/toolkit';
import { isType } from '../../../utils/isType';

const initialState = {
  dataRequest: false,
  dataFailed: false,
  dataError: '',
  data: [],

  addedIngredients: [],
  currentIngredient: {},
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
    REQUEST_DATA_FAILED: (state, action) => {
      state.dataRequest = false;
      state.dataFailed = true;
      state.dataError = action.payload;
    },
    SET_CURRENT_INGREDIENT: (state, action) => {
      state.currentIngredient = action.payload;
    },
    CLEAR_CURRENT_INGREDIENT: (state) => {
      state.currentIngredient = {};
    },
    ADD_INGREDIENT: (state, action) => {
      if (
        state.addedIngredients.length === 0 &&
        isType('bun', action.payload)
      ) {
        state.addedIngredients = [action.payload, action.payload];
      } else if (
        state.addedIngredients.length > 0 &&
        isType('bun', state.addedIngredients[0]) &&
        isType('bun', action.payload)
      ) {
        state.addedIngredients = [
          action.payload,
          ...state.addedIngredients.slice(1, -1),
          action.payload,
        ];
      } else if (
        state.addedIngredients.length > 0 &&
        isType('bun', state.addedIngredients[0]) &&
        !isType('bun', action.payload)
      ) {
        state.addedIngredients = [
          state.addedIngredients[0],
          ...state.addedIngredients.slice(1, -1),
          action.payload,
          state.addedIngredients.at(-1),
        ];
      } else if (
        state.addedIngredients.length > 0 &&
        isType('bun', action.payload)
      ) {
        state.addedIngredients = [
          action.payload,
          ...state.addedIngredients,
          action.payload,
        ];
      } else if (!isType('bun', action.payload)) {
        state.addedIngredients.push(action.payload);
      }
    },
    UPDATE_CONSTRUCTOR_LIST: (state, action) => {
      state.addedIngredients = action.payload;
    },
  },
});

export const {
  REQUEST_DATA,
  REQUEST_DATA_SUCCESS,
  REQUEST_DATA_FAILED,
  CLEAR_CURRENT_INGREDIENT,
  SET_CURRENT_INGREDIENT,
  ADD_INGREDIENT,
  UPDATE_CONSTRUCTOR_LIST,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
