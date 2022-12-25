import userReducer, {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  SET_USER,
  LOGOUT,
  PASSWORD_REQUEST,
  PASSWORD_REQUEST_SUCCESS,
  PASSWORD_RESET_SUCCESS,
  ERROR,
} from '../services/store/reducers/userSlice';
import { IUserState } from '../types/userTypes';

const initialState: IUserState = {
  user: null,

  userAuthorized: false,
  authRequest: false,

  registerRequest: false,

  loginRequest: false,

  passwordRequest: false,
  resettingPassword: false,

  error: '',
};

const userMock = { email: '123@gmail.com', name: 'pepega' };

describe('userSlice', () => {
  it('should return default state', () => {
    const result = userReducer(undefined, { type: '' });

    expect(result).toEqual(initialState);
  });

  it('should change status with "REGISTER" action', () => {
    const state = userReducer(initialState, REGISTER_REQUEST());

    expect(state.registerRequest).toEqual(true);
  });

  it('should change status with "REGISTER_SUCCESS" action', () => {
    const state = userReducer(initialState, REGISTER_SUCCESS());

    expect(state.registerRequest).toEqual(false);
  });

  it('should change status with "LOGIN_REQUEST" action', () => {
    const state = userReducer(initialState, LOGIN_REQUEST());

    expect(state.loginRequest).toEqual(true);
  });

  it('should change status with "LOGIN_SUCCESS" action', () => {
    const state = userReducer(initialState, LOGIN_SUCCESS());

    expect(state.loginRequest).toEqual(false);
  });

  it('should change status with "AUTH_REQUEST" action', () => {
    const state = userReducer(initialState, AUTH_REQUEST());

    expect(state.authRequest).toEqual(true);
  });

  it('should change status with "AUTH_SUCCESS" action', () => {
    const state = userReducer(initialState, AUTH_SUCCESS());

    expect(state.authRequest).toEqual(false);
  });

  it('should change user with "SET_USER" action', () => {
    const state = userReducer(initialState, SET_USER(userMock));

    expect(state.user).toEqual(userMock);
  });

  it('should clear user with  "LOGOUT" action', () => {
    const state = userReducer(initialState, LOGOUT());

    expect(state.user).toEqual(null);
  });

  it('should change status with "PASSWORD_REQUEST" action', () => {
    const state = userReducer(initialState, PASSWORD_REQUEST());

    expect(state.passwordRequest).toEqual(true);
  });

  it('should change status with "PASSWORD_REQUEST_SUCCESS" action', () => {
    const state = userReducer(initialState, PASSWORD_REQUEST_SUCCESS());

    expect(state.passwordRequest).toEqual(false);
    expect(state.resettingPassword).toEqual(true);
  });

  it('should change status with "PASSWORD_RESET_SUCCESS" action', () => {
    const state = userReducer(initialState, PASSWORD_RESET_SUCCESS());

    expect(state.resettingPassword).toEqual(false);
  });

  it('should handle an error with "ERROR" action', () => {
    const state = userReducer(initialState, ERROR('error'));

    expect(state.error).toEqual('error');
  });
});
