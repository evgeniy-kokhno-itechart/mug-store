/* eslint-disable no-undef */
import userReducer from '../../../app/user/UserReducer';
import initialUserState from '../../../app/user/UserState';
import { userActions } from '../../../app/user/UserActions';

describe('user reducer', () => {
  const testUser = { id: '1', name: 'test user', roles: ['user', 'admin'] };

  it('should return the initial state', () => {
    expect(userReducer(initialUserState, {})).toEqual(initialUserState);
  });

  // LOGIN
  it('should handle userActions.Login.CallIsInProgress', () => {
    expect(userReducer(initialUserState, userActions.Login.CallIsInProgress(true))).toEqual({
      ...initialUserState,
      loginStatus: { isInProcess: true, hasFailed: false, error: '' },
    });
  });

  it('should handle userActions.Login.Failure', () => {
    expect(userReducer(initialUserState, userActions.Login.Failure('test error'))).toEqual({
      ...initialUserState,
      loginStatus: { isInProcess: false, hasFailed: true, error: 'test error' },
    });
  });

  it('should handle userActions.Login.Success', () => {
    expect(userReducer(initialUserState, userActions.Login.Success(testUser))).toEqual({
      ...initialUserState,
      currentUser: testUser,
      loginStatus: { isInProcess: false, hasFailed: false, error: '' },
    });
  });

  it('should handle userActions.ResetLoginStatus', () => {
    expect(userReducer(initialUserState, userActions.ResetLoginStatus())).toEqual({
      ...initialUserState,
      loginStatus: initialUserState.loginStatus,
    });
  });

  // LOGOUT
  it('should handle userActions.Logout.CallIsInProgress', () => {
    expect(userReducer(initialUserState, userActions.Logout.CallIsInProgress(true))).toEqual({
      ...initialUserState,
      logoutStatus: { isInProcess: true, hasFailed: false, error: '' },
    });
  });

  it('should handle userActions.Logout.Failure', () => {
    expect(userReducer(initialUserState, userActions.Logout.Failure('test error'))).toEqual({
      ...initialUserState,
      logoutStatus: { isInProcess: false, hasFailed: true, error: 'test error' },
    });
  });

  it('should handle userActions.Logout.Success', () => {
    expect(userReducer(initialUserState, userActions.Logout.Success('test result message'))).toEqual({
      ...initialUserState,
      logoutResult: 'test result message',
    });
  });

  // SAVE EDITED
  it('should handle userActions.SaveEdited.CallIsInProgress', () => {
    expect(userReducer(initialUserState, userActions.SaveEdited.CallIsInProgress(true))).toEqual({
      ...initialUserState,
      savingStatus: { isInProcess: true, hasFailed: false, error: '' },
    });
  });

  it('should handle userActions.SaveEdited.Failure', () => {
    expect(userReducer(initialUserState, userActions.SaveEdited.Failure('test error'))).toEqual({
      ...initialUserState,
      savingStatus: { isInProcess: false, hasFailed: true, error: 'test error' },
    });
  });

  it('should handle userActions.SaveEdited.Success', () => {
    const userStateWithUser = { ...initialUserState, currentUser: { id: '0', name: 'user before update' } };
    expect(userReducer(initialUserState, userActions.SaveEdited.Success(testUser))).toEqual({
      ...userStateWithUser,
      currentUser: testUser,
      savingStatus: { isInProcess: false, hasFailed: false, error: '' },
    });
  });

  // REGISTER
  it('should handle userActions.Register.CallIsInProgress', () => {
    expect(userReducer(initialUserState, userActions.Register.CallIsInProgress(true))).toEqual({
      ...initialUserState,
      registrationStatus: { isInProcess: true, hasFailed: false, error: '' },
    });
  });

  it('should handle userActions.Register.Failure', () => {
    expect(userReducer(initialUserState, userActions.Register.Failure('test error'))).toEqual({
      ...initialUserState,
      registrationStatus: { isInProcess: false, hasFailed: true, error: 'test error' },
    });
  });

  it('should handle userActions.Register.Success', () => {
    expect(userReducer(initialUserState, userActions.Register.Success(testUser))).toEqual({
      ...initialUserState,
      currentUser: testUser,
      registrationStatus: { isInProcess: false, hasFailed: false, error: '' },
    });
  });
});
