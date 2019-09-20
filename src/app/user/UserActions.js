import { createAction } from 'redux-actions';
import { push, replace } from 'connected-react-router';
import AuthService from './AuthService';
import UserService from './UserService';
import { clearCart } from '../cart';

// LOGIN
export const loginUserInProcess = createAction('LOGIN_USER_IN_PROCESS', isInProcess => isInProcess);
export const loginUserFailed = createAction('LOGIN_USER_FAILED', (hasFailed, error) => ({ hasFailed, error }));
export const loginUserSuccess = createAction('LOGIN_USER_SUCCESS', currentUser => currentUser);

export const loginUser = (username, password, fromPath) => (dispatch) => {
  dispatch(loginUserInProcess(true));
  return AuthService.login(username, password)
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(loginUserInProcess(false));
      return AuthService.parseUserToken(response);
    })
    .then((user) => {
      dispatch(loginUserSuccess(user));
      dispatch(push(fromPath || '/'));
    })
    .catch((error) => {
      dispatch(loginUserInProcess(false));
      dispatch(loginUserFailed(true, error.message));
    });
};

// LOGOUT
export const logoutUserInProcess = createAction('LOGOUT_USER_IN_PROCESS', isInProcess => isInProcess);
export const logoutUserFailed = createAction('LOGOUT_USER_FAILED', (hasFailed, error) => ({ hasFailed, error }));
export const logoutUserSuccess = createAction('LOGOUT_USER_SUCCESS', resultMessage => resultMessage);

export const logoutUser = () => (dispatch, getState) => {
  dispatch(logoutUserInProcess(true));
  const { user } = getState();
  return AuthService.logout(user.currentUser.id)
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(logoutUserInProcess(false));
      return response.data;
    })
    .then((resultMessage) => {
      dispatch(clearCart());
      dispatch(logoutUserSuccess(resultMessage));
      dispatch(replace('/'));
    })
    .catch((error) => {
      dispatch(logoutUserInProcess(false));
      dispatch(logoutUserFailed(true, error.message));

      // !!! FAKE LOGIC delete once get proper back-end app
      dispatch(logoutUserSuccess());
      dispatch(clearCart());
      dispatch(replace('/'));
    });
};

// SAVE EDITED
export const savingUserInProcess = createAction('SAVING_USER_IN_PROCESS', isProcess => isProcess);
export const savingUserFailed = createAction('SAVING_USER_FAILED', (hasFailed, error) => ({ hasFailed, error }));
export const savingUserSuccess = createAction('SAVING_USER_SUCCESS', editedUser => editedUser);

export const saveEditedUserInfo = user => (dispatch) => {
  dispatch(savingUserInProcess(true));
  return UserService.saveUserInfo(user)
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
      dispatch(savingUserInProcess(false));
      dispatch(savingUserFailed(true, error.message));

      // !!! FAKE LOGIC delete once get proper back-end app
      dispatch(replace('/'));
    });
};

// REGISTER
export const registrationUserInProcess = createAction('REGISTRATION_USER_IN_PROCESS', isInProcess => isInProcess);
export const registrationUserFailed = createAction('REGISTRATION_USER_FAILED', (hasFailed, error) => ({ hasFailed, error }));
export const registrationUserSuccess = createAction('REGISTRATION_USER_SUCCESS', registeredUser => registeredUser);

export const registerNewUserAndLogin = user => (dispatch) => {
  dispatch(registrationUserInProcess(true));
  return UserService.registerUser(user)
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(registrationUserInProcess(false));
      return AuthService.parseUserToken(response);
    })
    .then((recievedUser) => {
      dispatch(registrationUserSuccess(recievedUser));
      dispatch(replace('/'));
    })
    .catch((error) => {
      dispatch(registrationUserInProcess(false));
      dispatch(registrationUserFailed(true, error.message));

      // !!! FAKE LOGIC delete once get proper back-end app
      dispatch(replace('/'));
    });
};
