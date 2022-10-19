import { request } from '../../../utils/request';
import { baseURL } from '../../../utils/api';
import {
  REQUEST_DATA,
  REQUEST_DATA_SUCCESS,
  REQUEST_DATA_FAILED,
} from '../reducers/IngredientsSlice';

export const getData = () => async (dispatch) => {
  try {
    dispatch(REQUEST_DATA());
    const response = await request(`${baseURL}/ingredients`);
    dispatch(REQUEST_DATA_SUCCESS(response.data));
  } catch (e) {
    dispatch(REQUEST_DATA_FAILED());
    console.log(e);
  }
};
