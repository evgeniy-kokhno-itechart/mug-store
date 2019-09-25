import { all } from 'redux-saga/effects';
import {
  watchGetProduct, watchGetProducts, watchSaveProduct, watchDeleteProduct,
} from '../product';
import { watchSubmitCart } from '../cart';
import { watchGetCurrencies, watchGetRates } from '../currency';
import {
  watchLogin, watchLogout, watchSaveEdited, watchRegister,
} from '../user';
import { watchGetCategories } from '../catalog';

export default function* rootSaga() {
  yield all([
    watchGetProduct(),
    watchGetProducts(),
    watchSaveProduct(),
    watchDeleteProduct(),
    watchSubmitCart(),
    watchGetCurrencies(),
    watchGetRates(),
    watchLogin(),
    watchLogout(),
    watchSaveEdited(),
    watchRegister(),
    watchGetCategories(),
  ]);
}
