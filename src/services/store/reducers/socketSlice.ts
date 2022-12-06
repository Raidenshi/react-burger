import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SocketResponse, SocketState } from '../../../types/socketTypes';

const initialState: SocketState = {
  isConnecting: false,
  isConnected: false,

  data: null,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    WS_CONNECTION: (state) => {
      state.isConnecting = true;
    },
    WS_CONNECTION_SUCCESS: (state) => {
      state.isConnecting = false;
      state.isConnected = true;
    },
    WS_GET_MESSAGE: (state, action: PayloadAction<SocketResponse>) => {
      state.data = action.payload;
    },
  },
});

export const { WS_CONNECTION, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE } =
  socketSlice.actions;

export const socketActions = socketSlice.actions;

export default socketSlice.reducer;
