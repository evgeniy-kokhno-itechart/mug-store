import { takeEvery } from 'redux-saga/effects';
import { userActions } from './UserActions';
import {
  workerLogin, workerLogout, workerSaveEdited, workerRegister,
} from './UserWorker';

export function* watchLogin() {
  yield takeEvery(userActions.Login.InitiateApiCall, workerLogin);
}

export function* watchLogout() {
  yield takeEvery(userActions.Logout.InitiateApiCall, workerLogout);
}

export function* watchSaveEdited() {
  yield takeEvery(userActions.SaveEdited.InitiateApiCall, workerSaveEdited);
}

export function* watchRegister() {
  yield takeEvery(userActions.Register.InitiateApiCall, workerRegister);
}
