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
    [loginUserInProcess]: (state, { payload: isInProcess }) => ({
      ...state,
      loginStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [loginUserFailed]: (state, { payload: { hasFailed, error } }) => ({
      ...state,
      loginStatus: { isInProcess: false, hasFailed, error },
    }),

    [loginUserSuccess]: (state, { payload: currentUser }) => ({
      ...state,
      currentUser,
      loginStatus: { isInProcess: false, hasFailed: false, error: '' },
    }),

    // LOGOUT
    [logoutUserInProcess]: (state, { payload: isInProcess }) => ({
      ...state,
      logoutStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [logoutUserFailed]: (state, { payload: { hasFailed, error } }) => ({
      ...state,
      logoutStatus: { isInProcess: false, hasFailed, error },
    }),

    [logoutUserSuccess]: (state, { payload: resultMessage }) => ({
      ...state,
      logoutResult: resultMessage, // added for future. will be empty since back-end is fake
      ...initialUserState,
    }),

    // SAVE EDITED
    [savingUserInProcess]: (state, { payload: isInProcess }) => ({
      ...state,
      savingStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [savingUserFailed]: (state, { payload: { hasFailed, error } }) => ({
      ...state,
      savingStatus: { isInProcess: false, hasFailed, error },
    }),

    [savingUserSuccess]: (state, { payload: updatedUser }) => ({
      ...state,
      currentUser: updatedUser,
    }),

    // REGISTER
    [registrationUserInProcess]: (state, { payload: isInProcess }) => ({
      ...state,
      registrationStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [registrationUserFailed]: (state, { payload: { hasFailed, error } }) => ({
      ...state,
      registrationStatus: { isInProcess: false, hasFailed, error },
    }),

    [registrationUserSuccess]: (state, { payload: registeredUser }) => ({
      ...state,
      currentUser: registeredUser,
    }),
  },

  initialUserState,
);

export default userReducer;
