import { baseURL } from '../../../utils/api';
import { request } from '../../../utils/request';
import { REGISTER_REQUEST, REGISTER_SUCCESS } from '../reducers/userSlice';

export const register = (form) => async (dispatch) => {
  try {
    dispatch(REGISTER_REQUEST());
    const response = await request(`${baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(form),
    });
    console.log(response);
    dispatch(REGISTER_SUCCESS(response));
  } catch (e) {
    console.log(e);
  }
};
