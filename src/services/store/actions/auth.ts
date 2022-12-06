import { IForm } from '../../../types/formTypes';
import { baseURL } from '../../../utils/baseURL';
import { getCookie, setCookie } from '../../../utils/cookie';
import { request } from '../../../utils/request';
import {
  AUTH_SUCCESS,
  ERROR,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  PASSWORD_REQUEST,
  PASSWORD_REQUEST_SUCCESS,
  PASSWORD_RESET_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SET_USER,
} from '../reducers/userSlice';
import { AppDispatch } from '../store';

export const register = (form: IForm) => async (dispatch: AppDispatch) => {
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
    dispatch(SET_USER(response.user));
  } catch (e: any) {
    dispatch(ERROR(e.message));
  }
};

export const login = (form: IForm) => async (dispatch: AppDispatch) => {
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
    dispatch(SET_USER(response.user));
  } catch (e: any) {
    dispatch(ERROR(e.message));
  }
};

export const authUser = () => async (dispatch: AppDispatch) => {
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
    dispatch(SET_USER(response.user));
  } catch (e: any) {
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

      const responseAgain = await request(`${baseURL}/auth/user`, {
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
      dispatch(SET_USER(responseAgain.user));
    }
  }
};

export const updateUser = (form: IForm) => async (dispatch: AppDispatch) => {
  try {
    const response = await request(`${baseURL}/auth/user`, {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('token'),
      },
      body: JSON.stringify(form),
    });
    dispatch(SET_USER(response.user));
  } catch (e: any) {
    dispatch(ERROR(e.message));
  }
};

export const passwordForgotRequest =
  (form: IForm) => async (dispatch: AppDispatch) => {
    try {
      dispatch(PASSWORD_REQUEST());
      await request(`${baseURL}/password-reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(form),
      });
      dispatch(PASSWORD_REQUEST_SUCCESS());
    } catch (e: any) {
      dispatch(ERROR(e.message));
    }
  };

export const passwordResetRequest =
  (form: IForm) => async (dispatch: AppDispatch) => {
    try {
      await request(`${baseURL}/password-reset/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(form),
      });
      dispatch(PASSWORD_RESET_SUCCESS());
    } catch (e: any) {
      dispatch(ERROR(e.message));
    }
  };

export const logOut = () => async (dispatch: AppDispatch) => {
  try {
    await request(`${baseURL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ token: sessionStorage.getItem('token') }),
    });
    sessionStorage.removeItem('token');
    setCookie('token', '', {
      'max-age': -1,
    });
  } catch (e: any) {
    dispatch(ERROR(e.message));
  }
};
