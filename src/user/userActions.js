import { createAction } from 'redux-actions';
import {
  login, logout, parseUserAndRecord, removeUserTokenFromStorage,
} from '../services/user/authService';

export const loginUserInProcess = createAction('LOGIN_USER_IN_PROCESS', isLoginInProcess => isLoginInProcess);
export const loginUserFailed = createAction('LOGIN_USER_FAILED', (hasLoginFailed, loginError) => ({ hasLoginFailed, loginError }));
export const loginUserSuccess = createAction('LOGIN_USER_SUCCESS', user => ({ currentUser: user }));

export const logoutUserInProcess = createAction('LOGOUT_USER_IN_PROCESS', isLogoutInProcess => isLogoutInProcess);
export const logoutUserFailed = createAction('LOGOUT_USER_FAILED', (hasLogoutFailed, logoutError) => ({ hasLogoutFailed, logoutError }));
export const logoutUserSuccess = createAction('LOGOUT_USER_SUCCESS');
// export const logoutUser = createAction('LOGOUT_USER');

export const loginUser = (username, password) => (dispatch) => {
  dispatch(loginUserInProcess(true));
  login(username, password)
    .then((response) => {
      if (!response.status === 200) {
        throw Error(response.statusText);
      }
      dispatch(loginUserInProcess(false));
      return parseUserAndRecord(response);
    })
    .then(user => dispatch(loginUserSuccess(user)))
    .catch(error => dispatch(loginUserFailed(true, error.message)));
};

export const logoutUser = currentUserName => (dispatch) => {
  dispatch(logoutUserInProcess(true));
  logout(currentUserName)
    .then((response) => {
      if (!response.status === 200) {
        throw Error(response.statusText);
      }
      dispatch(logoutUserInProcess(false));
      return removeUserTokenFromStorage();
    })
    .then(() => dispatch(logoutUserSuccess()))
    .catch(error => dispatch(logoutUserFailed(true, error.message)));
};
