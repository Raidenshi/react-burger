import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  dataRequest: false,
  dataFailed: false,
  data: [],
  constructorData: [],
  currentIngredient: {},
  order: {},
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
});

export default ingredientsSlice.reducer;
