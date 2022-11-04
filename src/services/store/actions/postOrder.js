import { request } from '../../../utils/request';
import { baseURL } from '../../../utils/api';
import {
  POST_ORDER,
  POST_ORDER_FAILED,
  POST_ORDER_SUCCESS,
} from '../reducers/orderSlice';

export const postOrder = (addedIngredientsID) => async (dispatch) => {
  try {
    dispatch(POST_ORDER());
    const response = await request(`${baseURL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(addedIngredientsID),
    });
    dispatch(POST_ORDER_SUCCESS(response));
  } catch (e) {
    dispatch(POST_ORDER_FAILED(e.message));
  }
};
