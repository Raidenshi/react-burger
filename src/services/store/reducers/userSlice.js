import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},

  registerRequest: false,
  registerError: false,

  loginRequest: false,
  loginError: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    REGISTER_REQUEST: (state) => {
      state.registerRequest = true;
    },
    REGISTER_SUCCESS: (state, action) => {
      state.registerRequest = false;
      state.user = action.payload.user;
    },
    LOGIN_REQUEST: (state) => {
      state.loginRequest = true;
    },
    LOGIN_SUCCESS: (state) => {
      state.registerRequest = false;
    },
  },
});

export const {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} = userSlice.actions;

export default userSlice.reducer;
