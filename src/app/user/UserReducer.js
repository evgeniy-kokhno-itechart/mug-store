import { handleActions } from 'redux-actions';
import initialUserState from './UserState';
import { userActions } from './UserActions';

const userReducer = handleActions(
  {
    //  LOGIN
    [userActions.Login.CallIsInProgress]: (state, { payload: isInProcess }) => ({
      ...state,
      loginStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [userActions.Login.Failure]: (state, { payload: error }) => ({
      ...state,
      loginStatus: { isInProcess: false, hasFailed: true, error },
    }),

    [userActions.Login.Success]: (state, { payload: currentUser }) => ({
      ...state,
      currentUser,
      loginStatus: { isInProcess: false, hasFailed: false, error: '' },
    }),

    [userActions.ResetLoginStatus]: state => ({
      ...state,
      loginStatus: initialUserState.loginStatus,
    }),

    // LOGOUT
    [userActions.Logout.CallIsInProgress]: (state, { payload: isInProcess }) => ({
      ...state,
      logoutStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [userActions.Logout.Failure]: (state, { payload: error }) => ({
      ...state,
      logoutStatus: { isInProcess: false, hasFailed: true, error },
    }),

    [userActions.Logout.Success]: (state, { payload: resultMessage }) => ({
      ...state,
      logoutResult: resultMessage, // added for future. will be empty since back-end is fake
      ...initialUserState,
    }),

    // SAVE EDITED
    [userActions.SaveEdited.CallIsInProgress]: (state, { payload: isInProcess }) => ({
      ...state,
      savingStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [userActions.SaveEdited.Failure]: (state, { payload: error }) => ({
      ...state,
      savingStatus: { isInProcess: false, hasFailed: true, error },
    }),

    [userActions.SaveEdited.Success]: (state, { payload: updatedUser }) => ({
      ...state,
      currentUser: updatedUser,
    }),

    // REGISTER
    [userActions.Register.CallIsInProgress]: (state, { payload: isInProcess }) => ({
      ...state,
      registrationStatus: { isInProcess, hasFailed: false, error: '' },
    }),

    [userActions.Register.Failure]: (state, { payload: error }) => ({
      ...state,
      registrationStatus: { isInProcess: false, hasFailed: true, error },
    }),

    [userActions.Register.Success]: (state, { payload: registeredUser }) => ({
      ...state,
      currentUser: registeredUser,
    }),
  },

  initialUserState,
);

export default userReducer;
