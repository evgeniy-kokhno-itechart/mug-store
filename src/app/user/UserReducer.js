import { handleActions } from 'redux-actions';
import initialUserState from './UserState';
import {
  loginUserInProcess,
  loginUserFailed,
  loginUserSuccess,
  logoutUserInProcess,
  logoutUserFailed,
  logoutUserSuccess,
  savingUserInProcess,
  savingUserFailed,
  savingUserSuccess,
  registrationUserInProcess,
  registrationUserFailed,
  registrationUserSuccess,
} from './UserActions';

const userReducer = handleActions(
  {
    //  LOGIN
    [loginUserInProcess]: (state, { payload: isLoginInProcess }) => ({
      ...state,
      loginStatus: { isLoginInProcess, hasLoginFailed: false, loginError: '' },
    }),

    [loginUserFailed]: (state, { payload: { hasLoginFailed, loginError } }) => ({
      ...state,
      loginStatus: { isLoginInProcess: false, hasLoginFailed, loginError },
    }),

    [loginUserSuccess]: (state, { payload: currentUser }) => ({
      ...state,
      currentUser,
      loginStatus: { isLoginInProcess: false, hasLoginFailed: false, loginError: '' },
    }),

    // LOGOUT
    [logoutUserInProcess]: (state, { payload: isLogoutInProcess }) => ({
      ...state,
      logoutStatus: { isLogoutInProcess, hasLogoutFailed: false, logoutError: '' },
    }),

    [logoutUserFailed]: (state, { payload: { hasLogoutFailed, logoutError } }) => ({
      ...state,
      logoutStatus: { isLogoutInProcess: false, hasLogoutFailed, logoutError },
    }),

    [logoutUserSuccess]: (state, { payload: resultMessage }) => ({
      ...state,
      logoutResult: resultMessage, // added for future. will be empty since back-end is fake
      ...initialUserState,
    }),

    // SAVE EDITED
    [savingUserInProcess]: (state, { payload: isSavingInProcess }) => ({
      ...state,
      savingStatus: { isSavingInProcess, hasSavingFailed: false, savingError: '' },
    }),

    [savingUserFailed]: (state, { payload: { hasSavingFailed, savingError } }) => ({
      ...state,
      savingStatus: { isSavingInProcess: false, hasSavingFailed, savingError },
    }),

    [savingUserSuccess]: (state, { payload: updatedUser }) => ({
      ...state,
      currentUser: updatedUser,
    }),

    // REGISTER
    [registrationUserInProcess]: (state, { payload: isRegistrationInProcess }) => ({
      ...state,
      registrationStatus: { isRegistrationInProcess, hasRegistrationFailed: false, registrationError: '' },
    }),

    [registrationUserFailed]: (state, { payload: { hasRegistrationFailed, registrationError } }) => ({
      ...state,
      registrationStatus: { isRegistrationInProcess: false, hasRegistrationFailed, registrationError },
    }),

    [registrationUserSuccess]: (state, { payload: registeredUser }) => ({
      ...state,
      currentUser: registeredUser,
    }),
  },

  initialUserState,
);

export default userReducer;
