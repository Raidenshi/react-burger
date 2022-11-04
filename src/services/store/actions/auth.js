import { baseURL } from '../../../utils/api';
import { request } from '../../../utils/request';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from '../reducers/userSlice';

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
    document.cookie = `token=${response.accessToken}; path=/; max-age=1200`;
    sessionStorage.setItem('token', response.refreshToken);
    dispatch(REGISTER_SUCCESS(response));
  } catch (e) {
    console.log(e);
  }
};

export const login = (form) => async (dispatch) => {
  try {
    dispatch(LOGIN_REQUEST());
    const response = await request(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(form),
    });
    document.cookie = `token=${response.accessToken}; path=/; max-age=1200`;
    sessionStorage.setItem('token', response.refreshToken);
    dispatch(LOGIN_SUCCESS(response));
  } catch (e) {
    console.log(e);
  }
};
