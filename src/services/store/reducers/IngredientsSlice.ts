import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isType } from '../../../utils/isType';
import { v4 as uuidv4 } from 'uuid';
import {
  IIngredient,
  IIngredientsState,
} from '../../../types/ingredientsTypes';

const initialState: IIngredientsState = {
  dataRequest: false,
  dataFailed: false,
  dataError: '',
  data: [],

  addedIngredients: [],
  currentIngredient: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    REQUEST_DATA: (state) => {
      state.dataRequest = true;
    },
    REQUEST_DATA_SUCCESS: (state, action: PayloadAction<IIngredient[]>) => {
      state.dataRequest = false;
      state.data = action.payload;
    },
    REQUEST_DATA_FAILED: (state, action: PayloadAction<string>) => {
      state.dataRequest = false;
      state.dataFailed = true;
      state.dataError = action.payload;
    },
    SET_CURRENT_INGREDIENT: (state, action: PayloadAction<IIngredient>) => {
      state.currentIngredient = action.payload;
    },
    CLEAR_CURRENT_INGREDIENT: (state) => {
      state.currentIngredient = null;
    },
    ADD_INGREDIENT: (state, action: PayloadAction<IIngredient>) => {
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
          state.addedIngredients[state.addedIngredients.length - 1],
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
    UPDATE_CONSTRUCTOR_LIST: (state, action: PayloadAction<IIngredient[]>) => {
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
