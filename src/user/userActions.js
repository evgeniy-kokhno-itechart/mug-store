import { createAction } from 'redux-actions';
import { push, replace } from 'connected-react-router';
import {
  login, logout, parseUserToken, removeUserTokenFromStorage,
} from '../services/user/authService';
import { registerUser, saveUserInfo } from '../services/user/userService';

// LOGIN
export const loginUserInProcess = createAction('LOGIN_USER_IN_PROCESS', isLoginInProcess => isLoginInProcess);
export const loginUserFailed = createAction('LOGIN_USER_FAILED', (hasLoginFailed, loginError) => ({ hasLoginFailed, loginError }));
export const loginUserSuccess = createAction('LOGIN_USER_SUCCESS', user => ({ currentUser: user }));

export const loginUser = (username, password, fromPath) => (dispatch) => {
  dispatch(loginUserInProcess(true));
  login(username, password)
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(loginUserInProcess(false));
      return parseUserToken(response);
    })
    .then((user) => {
      dispatch(loginUserSuccess(user));
      dispatch(push(fromPath || '/'));
    })
    .catch(error => dispatch(loginUserFailed(true, error.message)));
};

// LOGOUT
export const logoutUserInProcess = createAction('LOGOUT_USER_IN_PROCESS', isLogoutInProcess => isLogoutInProcess);
export const logoutUserFailed = createAction('LOGOUT_USER_FAILED', (hasLogoutFailed, logoutError) => ({ hasLogoutFailed, logoutError }));
export const logoutUserSuccess = createAction('LOGOUT_USER_SUCCESS');

export const logoutUser = () => (dispatch, getState) => {
  dispatch(logoutUserInProcess(true));
  const { user } = getState();
  logout(user.currentUser.id)
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(logoutUserInProcess(false));
      return removeUserTokenFromStorage();
    })
    .then(() => {
      dispatch(logoutUserSuccess());
      dispatch(replace('/'));
    })
    .catch((error) => {
      dispatch(logoutUserFailed(true, error.message));

      // !!! FAKE LOGIC delete once get proper back-end app
      dispatch(logoutUserSuccess());
      dispatch(replace('/'));
    });
};

// SAVE EDITED
export const savingUserInProcess = createAction('SAVING_USER_IN_PROCESS', isSavingProcess => isSavingProcess);
export const savingUserFailed = createAction('SAVING_USER_FAILED', (hasSavingFailed, savingError) => ({ hasSavingFailed, savingError }));
export const savingUserSuccess = createAction('SAVING_USER_SUCCESS', editedUser => editedUser);

export const saveEditedUserInfo = user => (dispatch) => {
  dispatch(savingUserInProcess(true));
  saveUserInfo(user)
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(savingUserInProcess(false));
      return response.data;
    })
    .then(() => {
      dispatch(savingUserSuccess(user));
      dispatch(replace('/'));
    })
    .catch((error) => {
      dispatch(savingUserFailed(true, error.message));

      // !!! FAKE LOGIC delete once get proper back-end app
      dispatch(replace('/'));
    });
};

// REGISTER
export const registrationUserInProcess = createAction('REGISTRATION_USER_IN_PROCESS', isRegistrationInProcess => isRegistrationInProcess);
export const registrationUserFailed = createAction('REGISTRATION_USER_FAILED', (hasRegistrationFailed, registrationError) => ({
  hasRegistrationFailed,
  registrationError,
}));
export const registrationUserSuccess = createAction('REGISTRATION_USER_SUCCESS', registeredUser => registeredUser);

export const registerNewUserAndLogin = user => (dispatch) => {
  dispatch(registrationUserInProcess(true));
  registerUser(user)
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(registrationUserInProcess(false));
      return parseUserToken(response);
    })
    .then((recievedUser) => {
      dispatch(registrationUserSuccess(recievedUser));
      dispatch(replace('/'));
    })
    .catch((error) => {
      dispatch(registrationUserFailed(true, error.message));

      // !!! FAKE LOGIC delete once get proper back-end app
      dispatch(replace('/'));
    });
};
