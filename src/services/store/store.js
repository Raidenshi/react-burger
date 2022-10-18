import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/IngredientsSlice';

const rootReducer = combineReducers({
  ingredientsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
