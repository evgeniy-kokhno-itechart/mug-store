/* eslint-disable no-undef */
import userReducer from '../../../user/userReduser';
import initialUserState from '../../../user/userState';
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
} from '../../../user/userActions';

describe('user reducer', () => {
  const testUser = { id: '1', name: 'test user', roles: ['user', 'admin'] };

  it('should return the initial state', () => {
    expect(userReducer(initialUserState, {})).toEqual(initialUserState);
  });

  // LOGIN
  it('should handle loginUserInProcess', () => {
    expect(userReducer(initialUserState, loginUserInProcess(true))).toEqual({
      ...initialUserState,
      loginStatus: { isLoginInProcess: true, hasLoginFailed: false, loginError: '' },
    });
  });

  it('should handle loginUserFailed', () => {
    expect(userReducer(initialUserState, loginUserFailed(true, 'test error'))).toEqual({
      ...initialUserState,
      loginStatus: { isLoginInProcess: false, hasLoginFailed: true, loginError: 'test error' },
    });
  });

  it('should handle loginUserSuccess', () => {
    expect(userReducer(initialUserState, loginUserSuccess(testUser))).toEqual({
      ...initialUserState,
      currentUser: testUser,
      loginStatus: { isLoginInProcess: false, hasLoginFailed: false, loginError: '' },
    });
  });

  // LOGOUT
  it('should handle logoutUserInProcess', () => {
    expect(userReducer(initialUserState, logoutUserInProcess(true))).toEqual({
      ...initialUserState,
      logoutStatus: { isLogoutInProcess: true, hasLogoutFailed: false, logoutError: '' },
    });
  });

  it('should handle logoutUserFailed', () => {
    expect(userReducer(initialUserState, logoutUserFailed(true, 'test error'))).toEqual({
      ...initialUserState,
      logoutStatus: { isLogoutInProcess: false, hasLogoutFailed: true, logoutError: 'test error' },
    });
  });

  it('should handle logoutUserSuccess', () => {
    expect(userReducer(initialUserState, logoutUserSuccess('test result message'))).toEqual({
      ...initialUserState,
      logoutResult: 'test result message',
    });
  });

  // SAVE EDITED
  it('should handle savingUserInProcess', () => {
    expect(userReducer(initialUserState, savingUserInProcess(true))).toEqual({
      ...initialUserState,
      savingStatus: { isSavingInProcess: true, hasSavingFailed: false, savingError: '' },
    });
  });

  it('should handle savingUserFailed', () => {
    expect(userReducer(initialUserState, savingUserFailed(true, 'test error'))).toEqual({
      ...initialUserState,
      savingStatus: { isSavingInProcess: false, hasSavingFailed: true, savingError: 'test error' },
    });
  });

  it('should handle savingUserSuccess', () => {
    const userStateWithUser = { ...initialUserState, currentUser: { id: '0', name: 'user before update' } };
    expect(userReducer(initialUserState, savingUserSuccess(testUser))).toEqual({
      ...userStateWithUser,
      currentUser: testUser,
      savingStatus: { isSavingInProcess: false, hasSavingFailed: false, savingError: '' },
    });
  });

  // REGISTER
  it('should handle registrationUserInProcess', () => {
    expect(userReducer(initialUserState, registrationUserInProcess(true))).toEqual({
      ...initialUserState,
      registrationStatus: { isRegistrationInProcess: true, hasRegistrationFailed: false, registrationError: '' },
    });
  });

  it('should handle registrationUserFailed', () => {
    expect(userReducer(initialUserState, registrationUserFailed(true, 'test error'))).toEqual({
      ...initialUserState,
      registrationStatus: { isRegistrationInProcess: false, hasRegistrationFailed: true, registrationError: 'test error' },
    });
  });

  it('should handle registrationUserSuccess', () => {
    expect(userReducer(initialUserState, registrationUserSuccess(testUser))).toEqual({
      ...initialUserState,
      currentUser: testUser,
      registrationStatus: { isRegistrationInProcess: false, hasRegistrationFailed: false, registrationError: '' },
    });
  });
});
