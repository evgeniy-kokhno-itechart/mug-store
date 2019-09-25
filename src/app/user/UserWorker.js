import { put, call, select } from 'redux-saga/effects';
import { push, replace } from 'connected-react-router';
import { userActions } from './UserActions';
import { cartActions } from '../cart';
import UserService from './UserService';
import AuthService from './AuthService';

// eslint-disable-next-line import/prefer-default-export
export function* workerLogin(action) {
  try {
    yield put(userActions.Login.CallIsInProgress(true));
    const result = yield call(AuthService.login, action.payload.username, action.payload.password);
    const userInfo = AuthService.parseUserToken(result.data);
    yield put(userActions.Login.Success(userInfo));
    yield put(push(action.payload.redirectPath || '/'));
  } catch (error) {
    yield put(userActions.Login.Failure(error.message));
  }
}

export function* workerLogout() {
  try {
    const user = yield select(state => state.user.currentUser);
    yield put(userActions.Logout.CallIsInProgress(true));
    const result = yield call(AuthService.logout, user.id);
    yield put(userActions.Logout.Success(result.data));
    yield put(cartActions.ClearCart());
    yield put(replace('/'));
  } catch (error) {
    yield put(userActions.Logout.Failure(error.message));

    // !!! FAKE LOGIC delete once get proper back-end app
    yield put(userActions.Logout.Success(`ERROR! ${error.message}`));
    yield put(cartActions.ClearCart());
    yield put(replace('/'));
  }
}

export function* workerSaveEdited(action) {
  try {
    yield put(userActions.SaveEdited.CallIsInProgress(true));
    const result = yield call(UserService.saveUserInfo, action.payload);
    yield put(userActions.SaveEdited.Success(result.data));
    yield put(replace('/'));
  } catch (error) {
    yield put(userActions.SaveEdited.Failure(error.message));

    // !!! FAKE LOGIC delete once get proper back-end app
    yield put(replace('/'));
  }
}

export function* workerRegister(action) {
  try {
    yield put(userActions.Register.CallIsInProgress(true));
    const result = yield call(UserService.registerUser, action.payload);
    const userInfo = AuthService.parseUserToken(result.data);
    yield put(userActions.Register.Success(userInfo));
    yield put(replace('/'));
  } catch (error) {
    yield put(userActions.Register.Failure(error.message));

    // !!! FAKE LOGIC delete once get proper back-end app
    yield put(replace('/'));
  }
}
