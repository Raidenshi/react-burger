import orderReducer, {
  POST_ORDER,
  POST_ORDER_FAILED,
  POST_ORDER_SUCCESS,
  CLEAR_ORDER,
} from '../services/store/reducers/orderSlice';
import { IOrderState } from '../types/orderTypes';

const initialState: IOrderState = {
  orderRequest: false,
  orderFailed: false,
  orderError: '',
  order: null,
};

const orderMock = {
  success: true,
  name: 'string',
  order: { number: 123 },
};

describe('orderSlice', () => {
  it('should return default state', () => {
    const result = orderReducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });
  it('should change status with "POST_ORDER" action', () => {
    const state = orderReducer(initialState, POST_ORDER());

    expect(state.orderRequest).toEqual(true);
    expect(state.orderFailed).toEqual(false);
  });

  it('should change status and data with "POST_ORDER_SUCCESS" action', () => {
    const state = orderReducer(initialState, POST_ORDER_SUCCESS(orderMock));

    expect(state.orderRequest).toEqual(false);
    expect(state.orderFailed).toEqual(false);
    expect(state.order).toEqual(orderMock);
  });

  it('should change status and error with "POST_ORDER_FAILED" action', () => {
    const state = orderReducer(initialState, POST_ORDER_FAILED('error'));

    expect(state.orderRequest).toEqual(false);
    expect(state.orderFailed).toEqual(true);
    expect(state.orderError).toEqual('error');
  });

  it('should clear order with "CLEAR_ORDER" action', () => {
    const state = orderReducer(initialState, CLEAR_ORDER());

    expect(state.order).toEqual(null);
  });
});
