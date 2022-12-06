import { configureStore, combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './reducers/IngredientsSlice';
import orderReducer from './reducers/orderSlice';
import userReducer from './reducers/userSlice';
import socketReducer from './reducers/socketSlice';
import { socketMiddleware } from './middleware/socketMiddleware';

const rootReducer = combineReducers({
  ingredientsReducer,
  orderReducer,
  userReducer,
  socketReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
