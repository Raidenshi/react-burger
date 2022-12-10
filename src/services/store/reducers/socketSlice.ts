import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SocketResponse, SocketState } from '../../../types/socketTypes';

const initialState: SocketState = {
  isConnecting: false,
  isConnected: false,

  data: null,

  privateConnecting: false,
  privateConnected: false,

  privateData: null,

  error: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    WS_CONNECTION: (state, action: PayloadAction<string>) => {
      state.isConnecting = true;
    },
    WS_CONNECTION_SUCCESS: (state) => {
      state.isConnecting = false;
      state.isConnected = true;
    },
    WS_GET_MESSAGE: (state, action: PayloadAction<SocketResponse>) => {
      state.data = action.payload;
    },
    WS_CLOSE_CONNECTION: (state) => {
      state.data = null;
      state.isConnected = false;
      state.isConnecting = false;
    },
    WS_PRIVATE_CONNECTION: (state, action: PayloadAction<string>) => {
      state.privateConnecting = true;
    },
    WS_PRIVATE_CONNECTION_SUCCESS: (state) => {
      state.privateConnecting = false;
      state.privateConnected = true;
    },
    WS_PRIVATE_GET_MESSAGE: (state, action: PayloadAction<SocketResponse>) => {
      state.privateData = action.payload;
    },
    WS_PRIVATE_CLOSE_CONNECTION: (state) => {
      state.privateData = null;
      state.privateConnected = false;
      state.privateConnecting = false;
    },

    WS_ERROR: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  WS_CONNECTION,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CLOSE_CONNECTION,
  WS_PRIVATE_CONNECTION,
  WS_PRIVATE_CONNECTION_SUCCESS,
  WS_PRIVATE_GET_MESSAGE,
  WS_PRIVATE_CLOSE_CONNECTION,
} = socketSlice.actions;

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;
