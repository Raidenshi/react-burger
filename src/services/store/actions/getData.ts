import { request } from '../../../utils/request';
import { baseURL } from '../../../utils/api';
import {
  REQUEST_DATA,
  REQUEST_DATA_SUCCESS,
  REQUEST_DATA_FAILED,
} from '../reducers/IngredientsSlice';
import { AppDispatch } from '../store';

export const getData = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(REQUEST_DATA());
    const response = await request(`${baseURL}/ingredients`);
    dispatch(REQUEST_DATA_SUCCESS(response.data));
  } catch (e: any) {
    dispatch(REQUEST_DATA_FAILED(e.message));
  }
};
