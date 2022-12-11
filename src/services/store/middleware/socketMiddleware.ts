import { Middleware, MiddlewareAPI } from 'redux';
import {
  WS_CLOSE_CONNECTION,
  WS_CONNECTION,
  WS_CONNECTION_SUCCESS,
  WS_ERROR,
  WS_GET_MESSAGE,
  WS_PRIVATE_CLOSE_CONNECTION,
  WS_PRIVATE_CONNECTION,
  WS_PRIVATE_CONNECTION_SUCCESS,
  WS_PRIVATE_GET_MESSAGE,
} from '../reducers/socketSlice';
import { AppDispatch, RootState } from '../store';

export const socketMiddleware: Middleware = (
  store: MiddlewareAPI<AppDispatch, RootState>
) => {
  let socket: WebSocket | null = null;
  let privateSocket: WebSocket | null = null;

  return (next) => (action) => {
    const { dispatch } = store;

    if (WS_CONNECTION.match(action) && !socket) {
      socket = new WebSocket(action.payload);
      if (socket) {
        socket.onopen = () => {
          dispatch(WS_CONNECTION_SUCCESS());
        };

        socket.onmessage = (event) => {
          const data = event.data;
          const parsedData = JSON.parse(data);
          dispatch(WS_GET_MESSAGE(parsedData));
        };

        socket.onerror = (event) => {
          dispatch(WS_ERROR(event));
        };
      }
    }

    if (WS_CLOSE_CONNECTION.match(action)) {
      socket?.close();
      socket = null;
    }

    if (WS_PRIVATE_CONNECTION.match(action) && !privateSocket) {
      privateSocket = new WebSocket(action.payload);
      if (privateSocket) {
        privateSocket.onopen = () => {
          dispatch(WS_PRIVATE_CONNECTION_SUCCESS());
        };

        privateSocket.onmessage = (event) => {
          const data = event.data;
          const parsedData = JSON.parse(data);
          dispatch(WS_PRIVATE_GET_MESSAGE(parsedData));
        };

        privateSocket.onerror = (event) => {
          console.log(event);
        };

        privateSocket.onerror = (event) => {
          dispatch(WS_ERROR(event));
        };
      }
    }
    if (WS_PRIVATE_CLOSE_CONNECTION.match(action)) {
      privateSocket?.close();
      privateSocket = null;
    }

    next(action);
  };
};
