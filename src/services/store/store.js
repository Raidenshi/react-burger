import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/IngredientsSlice';
import modalReducer from './reducers/modalSlice';
import orderReducer from './reducers/orderSlice';

const rootReducer = combineReducers({
  ingredientsReducer,
  modalReducer,
  orderReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
