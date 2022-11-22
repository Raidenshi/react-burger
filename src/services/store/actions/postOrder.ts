import { request } from '../../../utils/request';
import { baseURL } from '../../../utils/api';
import {
  POST_ORDER,
  POST_ORDER_FAILED,
  POST_ORDER_SUCCESS,
} from '../reducers/orderSlice';
import { AppDispatch } from '../store';

export const postOrder =
  (addedIngredientsID: { ingredients: string[] }) =>
  async (dispatch: AppDispatch) => {
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
    } catch (e: any) {
      dispatch(POST_ORDER_FAILED(e.message));
    }
  };
