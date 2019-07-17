import { handleActions } from 'redux-actions';
import initialUserState from './userState';
import {
  loginUserInProcess,
  loginUserFailed,
  loginUserSuccess,
  logoutUserInProcess,
  logoutUserFailed,
  logoutUserSuccess,
} from './userActions';

const userReducer = handleActions(
  {
    //  LOGIN
    [loginUserInProcess]: (state, { payload: { isLoginInProcess } }) => ({
      ...state,
      loginStatus: { isLoginInProcess, hasLoginFailed: false, loginError: '' },
    }),

    [loginUserFailed]: (state, { payload: { hasLoginFailed, loginError } }) => ({
      ...state,
      loginStatus: { isLoginInProcess: false, hasLoginFailed, loginError },
    }),

    [loginUserSuccess]: (state, { payload: { currentUser } }) => ({
      ...state,
      currentUser,
      loginStatus: { isLoginInProcess: false, hasLoginFailed: false, loginError: '' },
    }),

    // LOGOUT
    [logoutUserInProcess]: (state, { payload: { isLogoutInProcess } }) => ({
      ...state,
      logoutStatus: { isLogoutInProcess, hasLogoutFailed: false, logoutError: '' },
    }),

    [logoutUserFailed]: (state, { payload: { hasLogoutFailed, logoutError } }) => ({
      ...state,
      logoutStatus: { isLogoutInProcess: false, hasLogoutFailed, logoutError },
    }),

    [logoutUserSuccess]: state => ({ ...state, ...initialUserState }),
  },
  initialUserState,
);

export default userReducer;
