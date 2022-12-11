import { request } from '../../../utils/request';
import { baseURL } from '../../../utils/baseURL';
import {
  POST_ORDER,
  POST_ORDER_FAILED,
  POST_ORDER_SUCCESS,
} from '../reducers/orderSlice';
import { AppDispatch } from '../store';
import { getCookie } from '../../../utils/cookie';

export const postOrder =
  (addedIngredientsID: { ingredients: string[] }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(POST_ORDER());
      const response = await request(`${baseURL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: getCookie('token'),
        },
        body: JSON.stringify(addedIngredientsID),
      });
      dispatch(POST_ORDER_SUCCESS(response));
    } catch (e: any) {
      dispatch(POST_ORDER_FAILED(e.message));
    }
  };
