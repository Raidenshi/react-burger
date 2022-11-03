import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/IngredientsSlice';
import modalReducer from './reducers/modalSlice';
import orderReducer from './reducers/orderSlice';
import userReducer from './reducers/userSlice';

const rootReducer = combineReducers({
  ingredientsReducer,
  modalReducer,
  orderReducer,
  userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
