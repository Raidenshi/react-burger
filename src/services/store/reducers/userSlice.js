import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,

  userAuthorized: false,
  authRequest: false,

  registerRequest: false,

  loginRequest: false,

  passwordRequest: false,
  resettingPassword: false,

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
    LOGOUT: (state) => {
      state.user = null;
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
    PASSWORD_REQUEST: (state) => {
      state.passwordRequest = true;
    },
    PASSWORD_REQUEST_SUCCESS: (state) => {
      state.passwordRequest = false;
      state.resettingPassword = true;
    },
    PASSWORD_RESET_SUCCESS: (state) => {
      state.resettingPassword = false;
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
  LOGOUT,
  PASSWORD_REQUEST,
  PASSWORD_REQUEST_SUCCESS,
  PASSWORD_RESET_SUCCESS,
  ERROR,
} = userSlice.actions;

export default userSlice.reducer;
