/* eslint-disable no-undef */
import { call, select } from 'redux-saga/effects';
import { push, replace } from 'connected-react-router';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { userActions } from '../../../app/user/UserActions';
import { cartActions } from '../../../app/cart';
import AuthService from '../../../app/user/AuthService';
import UserService from '../../../app/user/UserService';
import {
  workerLogin, workerLogout, workerSaveEdited, workerRegister, currentUserSelector,
} from '../../../app/user/UserWorker';

describe('User saga:', () => {
  const fakeUserResponse = {
    data: {
      id: '1',
      username: 'test@test.com',
      name: 'Test User',
      country: 'Belarus',
      city: 'Minsk',
      address: 'Mesnikova str, 5 -11',
      phone: '+375290000000',
      roles: ['user'],
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJ1c2VyIl19.4WTEPSSWJBDVk9DXrMd4Y7PcdcK-q8xV5IDuVC0ETfY',
    },
  };
  const fakeUser = fakeUserResponse.data;

  const fakeLoginPayload = { username: 'testuser', password: 'testpassword' };
  const fakeLoginPayloadWithPath = { username: 'testuser', password: 'testpassword', redirectPath: 'testpath' };
  const fakeUserId = '123';

  const fakeError = new Error('error');

  const fakeResultResponse = { data: 'OK' };
  const fakeResult = fakeResultResponse.data;

  const fakeEditedUserAction = { payload: fakeUser };
  const fakeNewUserAction = fakeEditedUserAction;

  // LOGIN
  it('workerLogin sends login info and dispatches successfull result within user and redirects to testhpath', () => (
    expectSaga(workerLogin, userActions.Login.InitiateApiCall(fakeLoginPayloadWithPath))
      .provide([[call(AuthService.login, fakeLoginPayloadWithPath.username, fakeLoginPayloadWithPath.password), fakeUserResponse]])
      .put(userActions.Login.CallIsInProgress(true))
      .call(AuthService.login, fakeLoginPayloadWithPath.username, fakeLoginPayloadWithPath.password)
      .put(userActions.Login.Success(fakeUser))
      .put(push(fakeLoginPayloadWithPath.redirectPath))
      .run()));

  it('workerLogin sends login info and dispatches successfull result within user and redirects to /', () => (
    expectSaga(workerLogin, userActions.Login.InitiateApiCall(fakeLoginPayload))
      .provide([[call(AuthService.login, fakeLoginPayloadWithPath.username, fakeLoginPayloadWithPath.password), fakeUserResponse]])
      .put(userActions.Login.CallIsInProgress(true))
      .call(AuthService.login, fakeLoginPayloadWithPath.username, fakeLoginPayloadWithPath.password)
      .put(userActions.Login.Success(fakeUser))
      .put(push('/'))
      .run()));

  it('workerLogin sends login info and dispatches error result within error', () => (
    expectSaga(workerLogin, userActions.Login.InitiateApiCall(fakeLoginPayload))
      .provide([[call(AuthService.login, fakeLoginPayloadWithPath.username, fakeLoginPayloadWithPath.password), throwError(fakeError)]])
      .put(userActions.Login.CallIsInProgress(true))
      .call(AuthService.login, fakeLoginPayloadWithPath.username, fakeLoginPayloadWithPath.password)
      .put(userActions.Login.Failure(fakeError.message))
      .run()));

  // LOGOUT
  it('workerLogout sends logout info and dispatches successfull result within message', () => (
    expectSaga(workerLogout)
      .provide([
        [call(AuthService.logout, fakeUserId), fakeResultResponse],
        [select(currentUserSelector), { id: fakeUserId }],
      ])
      .put(userActions.Logout.CallIsInProgress(true))
      .select(currentUserSelector)
      .call(AuthService.logout, fakeUserId)
      .put(userActions.Logout.Success(fakeResult))
      .put(cartActions.ClearCart())
      .put(replace('/'))
      .run()));

  it('workerLogout sends logout info and dispatches error result within message', () => (
    expectSaga(workerLogout)
      .provide([
        [call(AuthService.logout, fakeUserId), throwError(fakeError)],
        [select(currentUserSelector), { id: fakeUserId }],
      ])
      .put(userActions.Logout.CallIsInProgress(true))
      .select(currentUserSelector)
      .call(AuthService.logout, fakeUserId)
      .put(userActions.Logout.Failure(fakeError.message))
      // !!! FAKE LOGIC delete once get proper back-end app
      .put(userActions.Logout.Success(`ERROR! ${fakeError.message}`))
      .put(cartActions.ClearCart())
      .put(replace('/'))
      .run()));

  // SAVE
  it('workerSaveEdited sends user info and dispatches successfull result within message', () => (
    expectSaga(workerSaveEdited, fakeEditedUserAction)
      .provide([[call(UserService.saveUserInfo, fakeUser), fakeResultResponse]])
      .put(userActions.SaveEdited.CallIsInProgress(true))
      .call(UserService.saveUserInfo, fakeUser)
      .put(userActions.SaveEdited.Success(fakeResult))
      .put(replace('/'))
      .run()));

  it('workerSaveEdited sends user info and dispatches error result within message', () => (
    expectSaga(workerSaveEdited, fakeEditedUserAction)
      .provide([[call(UserService.saveUserInfo, fakeUser), throwError(fakeError)]])
      .put(userActions.SaveEdited.CallIsInProgress(true))
      .call(UserService.saveUserInfo, fakeUser)
      .put(userActions.SaveEdited.Failure(fakeError.message))
      // !!! FAKE LOGIC delete once get proper back-end app
      .put(replace('/'))
      .run()));

  // REGISTER
  it('workerRegister sends new user info and dispatches successfull result within user info', () => (
    expectSaga(workerRegister, fakeNewUserAction)
      .provide([[call(UserService.registerUser, fakeUser), fakeUserResponse]])
      .put(userActions.Register.CallIsInProgress(true))
      .call(UserService.registerUser, fakeUser)
      .put(userActions.Register.Success(fakeUser))
      .put(replace('/'))
      .run()));

  it('workerRegister sends new user info and dispatches error result within error', () => (
    expectSaga(workerRegister, fakeNewUserAction)
      .provide([[call(UserService.registerUser, fakeUser), throwError(fakeError)]])
      .put(userActions.Register.CallIsInProgress(true))
      .call(UserService.registerUser, fakeUser)
      .put(userActions.Register.Failure(fakeError.message))
      // !!! FAKE LOGIC delete once get proper back-end app
      .put(replace('/'))
      .run()));
});
