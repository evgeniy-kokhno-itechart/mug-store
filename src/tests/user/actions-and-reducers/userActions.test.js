/* eslint-disable no-undef */
import Axios from 'axios';
import { push, replace } from 'connected-react-router';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../user/userActions';
import initialUserState from '../../../user/userState';
import { rootUrl } from '../../../services/general/constants';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('userActions', () => {
  const mockAxios = new MockAdapter(Axios);
  const fakeUser = {
    id: '1',
    username: 'test@test.com',
    name: 'Test User',
    country: 'Belarus',
    city: 'Minsk',
    address: 'Mesnikova str, 5 -11',
    phone: '+375290000000',
    roles: ['user'],
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJ1c2VyIl19.4WTEPSSWJBDVk9DXrMd4Y7PcdcK-q8xV5IDuVC0ETfY',
  };

  let store;

  //   beforeEach(() => {
  //     store = mockStore(initialUserState);
  //   });

  afterEach(() => {
    mockAxios.resetHandlers();
    store.clearActions();
  });

  // LOGIN USER
  it('should call loginUserInProcess, loginUserSuccess and push(testpath) on login response 200 within fromPath provided', () => {
    store = mockStore(initialUserState);
    const usersURLRegExp = new RegExp(`${rootUrl}/users/.*`);
    mockAxios.onGet(usersURLRegExp).reply(200, fakeUser);

    const expectedActions = [
      actions.loginUserInProcess(true),
      actions.loginUserInProcess(false),
      actions.loginUserSuccess(fakeUser),
      push('/testpath'),
    ];

    return store.dispatch(actions.loginUser('testname', 'testpassword', '/testpath')).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  it('should call loginUserInProcess, loginUserFailed and push(/) on login response 200 without fromPath provided', () => {
    store = mockStore(initialUserState);
    const usersURLRegExp = new RegExp(`${rootUrl}/users/.*`);
    mockAxios.onGet(usersURLRegExp).reply(200, fakeUser);

    const expectedActions = [
      actions.loginUserInProcess(true),
      actions.loginUserInProcess(false),
      actions.loginUserSuccess(fakeUser),
      push('/'),
    ];

    return store.dispatch(actions.loginUser('testname', 'testpassword')).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  it('should call loginUserInProcess and loginUserFailed on login response 404', () => {
    store = mockStore(initialUserState);
    const usersURLRegExp = new RegExp(`${rootUrl}/users/.*`);
    mockAxios.onGet(usersURLRegExp).reply(404);

    const expectedActions = [
      actions.loginUserInProcess(true),
      actions.loginUserInProcess(false),
      actions.loginUserFailed(true, 'Request failed with status code 404'),
    ];

    return store.dispatch(actions.loginUser('testname', 'testpassword')).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  // LOGOUT USER
  it('should call logoutUserInProcess, logoutUserSuccess and replace(/) on logout response', () => {
    const mockState = { user: { currentUser: { id: '1' } } };
    store = mockStore(mockState);
    const usersURLRegExp = new RegExp(`${rootUrl}/logout/.*`);
    mockAxios.onPost(usersURLRegExp).reply(200, 'test logout message');

    const expectedActions = [
      actions.logoutUserInProcess(true),
      actions.logoutUserInProcess(false),
      actions.logoutUserSuccess('test logout message'),
      replace('/'),
    ];

    return store.dispatch(actions.logoutUser()).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  it('should call logoutUserInProcess and logoutUserFailed on login response 404', () => {
    const mockState = { user: { currentUser: { id: '1' } } };
    store = mockStore(mockState);
    const usersURLRegExp = new RegExp(`${rootUrl}/logout/.*`);
    mockAxios.onPost(usersURLRegExp).reply(404);

    const expectedActions = [
      actions.logoutUserInProcess(true),
      actions.logoutUserInProcess(false),
      actions.logoutUserFailed(true, 'Request failed with status code 404'),
      // !!! FAKE logic - should be replaced once get proper back-end
      actions.logoutUserSuccess(),
      replace('/'),
    ];

    return store.dispatch(actions.logoutUser()).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  // SAVE EDITED
  it('should call logoutUserInProcess, logoutUserSuccess and replace(/) on save edited user response', () => {
    store = mockStore(initialUserState);
    mockAxios.onPost(`${rootUrl}/users/edituser`).reply(200, fakeUser);

    const expectedActions = [
      actions.savingUserInProcess(true),
      actions.savingUserInProcess(false),
      actions.savingUserSuccess(fakeUser),
      replace('/'),
    ];

    return store.dispatch(actions.saveEditedUserInfo(fakeUser)).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  it('should call logoutUserInProcess and logoutUserFailed on save edited user response 404', () => {
    store = mockStore(initialUserState);
    mockAxios.onPost(`${rootUrl}/users/edituser`).reply(404);

    const expectedActions = [
      actions.savingUserInProcess(true),
      actions.savingUserInProcess(false),
      actions.savingUserFailed(true, 'Request failed with status code 404'),
      // !!! FAKE logic - should be replaced once get proper back-end
      replace('/'),
    ];

    return store.dispatch(actions.saveEditedUserInfo()).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  // REGISTER
  it('should call registrationUserInProcess, registrationUserSuccess and replace(/) on register response', () => {
    store = mockStore(initialUserState);
    mockAxios.onPost(`${rootUrl}/users/register`).reply(200, fakeUser);

    const expectedActions = [
      actions.registrationUserInProcess(true),
      actions.registrationUserInProcess(false),
      actions.registrationUserSuccess(fakeUser),
      replace('/'),
    ];

    return store.dispatch(actions.registerNewUserAndLogin(fakeUser)).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });

  it('should call registrationUserInProcess and registrationUserFailed on register response 404', () => {
    store = mockStore(initialUserState);
    mockAxios.onPost(`${rootUrl}/users/register`).reply(404);

    const expectedActions = [
      actions.registrationUserInProcess(true),
      actions.registrationUserInProcess(false),
      actions.registrationUserFailed(true, 'Request failed with status code 404'),
      // !!! FAKE logic - should be replaced once get proper back-end
      replace('/'),
    ];

    return store.dispatch(actions.registerNewUserAndLogin(fakeUser)).then(() => {
      const actionsCalled = store.getActions();
      expect(actionsCalled).toEqual(expectedActions);
    });
  });
});
