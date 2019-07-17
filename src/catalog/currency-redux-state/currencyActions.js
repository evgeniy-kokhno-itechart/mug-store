import { createAction } from 'redux-actions';
import { getCurrenciesList } from '../../services/general/payService';

export const gettingCurrenciesInProgress = createAction(
  'GETING_CURRENCIES_IN_PROGRESS',
  isGettingCurrenciesInProcess => isGettingCurrenciesInProcess,
);

export const gettingCurrenciesFailed = createAction('GETTING_CURRIENCIES_FAILED', (hasGettingCurrenciesFailed, error) => ({
  hasGettingCurrenciesFailed,
  error,
}));

export const gettingCurrenciesSuccess = createAction('GETTING_CURRIENCIES_SUCCESS', currencies => currencies);

export const changeCurrency = createAction('CHANGE_CURRENCY', (currencyId, currencyName) => ({ currencyId, currencyName }));

export const getCurrencies = () => (dispatch) => {
  dispatch(gettingCurrenciesInProgress(true));
  getCurrenciesList()
    .then((response) => {
      if (!response.statusText === 'OK') {
        throw Error(response.statusText);
      }
      dispatch(gettingCurrenciesInProgress(false));
      return response.data;
    })
    .then(currencies => dispatch(gettingCurrenciesSuccess(currencies)))
    .catch(error => dispatch(gettingCurrenciesFailed(true, error.message)));
};
