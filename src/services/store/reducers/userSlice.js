import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,

  authRequest: false,

  registerRequest: false,

  loginRequest: false,

  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    AUTH_REQUEST: (state) => {
      state.authRequest = true;
    },
    AUTH_SUCCESS: (state) => {
      state.authRequest = false;
    },
    SET_USER: (state, action) => {
      state.user = action.payload.user;
    },
    REGISTER_REQUEST: (state) => {
      state.registerRequest = true;
    },
    REGISTER_SUCCESS: (state, action) => {
      state.registerRequest = false;
    },
    LOGIN_REQUEST: (state) => {
      state.loginRequest = true;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.registerRequest = false;
    },
    ERROR: (state, action) => {
      state.error = action.payload;
      state.authRequest = false;
      state.registerRequest = false;
    },
  },
});

export const {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  SET_USER,
  ERROR,
} = userSlice.actions;

export default userSlice.reducer;
