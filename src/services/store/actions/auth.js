import { baseURL } from '../../../utils/api';
import { getCookie, setCookie } from '../../../utils/cookie';
import { request } from '../../../utils/request';
import {
  AUTH_SUCCESS,
  ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SET_USER,
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
    setCookie('token', response.accessToken);
    sessionStorage.setItem('token', response.refreshToken);
    dispatch(REGISTER_SUCCESS());
    dispatch(SET_USER(response));
  } catch (e) {
    dispatch(ERROR(e.message));
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
    setCookie('token', response.accessToken);
    sessionStorage.setItem('token', response.refreshToken);
    dispatch(LOGIN_SUCCESS());
    dispatch(SET_USER(response));
  } catch (e) {
    dispatch(ERROR(e.message));
  }
};

export const authUser = () => async (dispatch) => {
  if (!document.cookie && !sessionStorage.getItem('token')) {
    return;
  }
  try {
    const response = await request(`${baseURL}/auth/user`, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('token'),
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    dispatch(AUTH_SUCCESS());
    dispatch(SET_USER(response));
  } catch (e) {
    if (e.message === 'jwt expired') {
      const refrToken = { token: sessionStorage.getItem('token') };
      const response = await request(`${baseURL}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(refrToken),
      });
      setCookie('token', response.accessToken);
      sessionStorage.setItem('token', response.refreshToken);
    }
  }
};
