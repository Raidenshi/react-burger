import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/IngredientsSlice';
import orderReducer from './reducers/orderSlice';
import userReducer from './reducers/userSlice';

const rootReducer = combineReducers({
  ingredientsReducer,
  orderReducer,
  userReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
