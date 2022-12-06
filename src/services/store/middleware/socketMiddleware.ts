import { Middleware, MiddlewareAPI } from 'redux';
import {
  WS_CONNECTION,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from '../reducers/socketSlice';
import { AppDispatch, RootState } from '../store';

export const socketMiddleware: Middleware = (
  store: MiddlewareAPI<AppDispatch, RootState>
) => {
  let socket: WebSocket | null = null;

  return (next) => (action) => {
    const { dispatch } = store;

    if (WS_CONNECTION.match(action) && !socket) {
      socket = new WebSocket(`wss://norma.nomoreparties.space/orders/all`);
    }

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
        console.log(event);
      };
    }
    next(action);
  };
};
