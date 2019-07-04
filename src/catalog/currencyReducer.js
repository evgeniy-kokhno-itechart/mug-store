import { handleAction } from 'redux-actions';
import { changeCurrency } from './currencyActions';
import initialCurrencyState from './currencyState';

const currencyReducer = handleAction(
  changeCurrency,
  (state, { payload: { currencyId, currencyName } }) => ({ ...state, currentCurrency: { _id: currencyId, name: currencyName } }),
  initialCurrencyState,
);

export default currencyReducer;
