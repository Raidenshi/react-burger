import { createSlice } from '@reduxjs/toolkit';
import { isType } from '../../../utils/isType';
import { v4 as uuidv4 } from 'uuid';

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
        const bun1 = { ...action.payload, uniqueID: uuidv4() };
        const bun2 = { ...action.payload, uniqueID: uuidv4() };
        state.addedIngredients = [bun1, bun2];
      } else if (
        state.addedIngredients.length > 0 &&
        isType('bun', state.addedIngredients[0]) &&
        isType('bun', action.payload)
      ) {
        const bun1 = { ...action.payload, uniqueID: uuidv4() };
        const bun2 = { ...action.payload, uniqueID: uuidv4() };
        state.addedIngredients = [
          bun1,
          ...state.addedIngredients.slice(1, -1),
          bun2,
        ];
      } else if (
        state.addedIngredients.length > 0 &&
        isType('bun', state.addedIngredients[0]) &&
        !isType('bun', action.payload)
      ) {
        const ingredient = { ...action.payload, uniqueID: uuidv4() };
        state.addedIngredients = [
          state.addedIngredients[0],
          ...state.addedIngredients.slice(1, -1),
          ingredient,
          state.addedIngredients.at(-1),
        ];
      } else if (
        state.addedIngredients.length > 0 &&
        isType('bun', action.payload)
      ) {
        const bun1 = { ...action.payload, uniqueID: uuidv4() };
        const bun2 = { ...action.payload, uniqueID: uuidv4() };
        state.addedIngredients = [bun1, ...state.addedIngredients, bun2];
      } else if (!isType('bun', action.payload)) {
        const ingredient = { ...action.payload, uniqueID: uuidv4() };
        state.addedIngredients.push(ingredient);
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
