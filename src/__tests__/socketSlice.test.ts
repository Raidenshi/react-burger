import socketReducer, {
  WS_CONNECTION,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CLOSE_CONNECTION,
  WS_PRIVATE_CONNECTION,
  WS_PRIVATE_CONNECTION_SUCCESS,
  WS_PRIVATE_GET_MESSAGE,
  WS_PRIVATE_CLOSE_CONNECTION,
  WS_ERROR,
} from '../services/store/reducers/socketSlice';
import { SocketState } from '../types/socketTypes';

const initialState: SocketState = {
  isConnecting: false,
  isConnected: false,

  data: null,

  privateConnecting: false,
  privateConnected: false,

  privateData: null,

  error: null,
};

const mockData = { success: '123', orders: [], total: 123, totalToday: 321 };

describe('socketSlice', () => {
  it('should return default state', () => {
    const result = socketReducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  it('should change status with "WS_CONNECTION" action', () => {
    const state = socketReducer(initialState, WS_CONNECTION(''));

    expect(state.isConnecting).toEqual(true);
    expect(state.isConnected).toEqual(false);
  });

  it('should change status with "WS_CONNECTION_SUCCESS" action', () => {
    const state = socketReducer(initialState, WS_CONNECTION_SUCCESS());

    expect(state.isConnecting).toEqual(false);
    expect(state.isConnected).toEqual(true);
  });

  it('should change status and error with "WS_ERROR" action', () => {
    const state = socketReducer(initialState, WS_ERROR('error'));

    expect(state.isConnecting).toEqual(false);
    expect(state.isConnected).toEqual(false);
    expect(state.error).toEqual('error');
  });

  it('should change data with "WS_GET_MESSAGE" action', () => {
    const state = socketReducer(initialState, WS_GET_MESSAGE(mockData));

    expect(state.data).toEqual(mockData);
  });

  it('should clear status and data with "WS_CLOSE_CONNECTION" action', () => {
    const state = socketReducer(initialState, WS_CLOSE_CONNECTION());

    expect(state.data).toEqual(null);
    expect(state.isConnecting).toEqual(false);
    expect(state.isConnected).toEqual(false);
  });
});
