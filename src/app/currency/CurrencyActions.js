import { createAction } from 'redux-actions';
import { createHttpAction } from '../shared';

// eslint-disable-next-line import/prefer-default-export
export const currencyActions = {
  GetCurrencies: createHttpAction('GET_CURRENCIES'),
  GetRates: createHttpAction('GET_RATES'),
  ChangeCurrency: createAction('CHANGE_CURRENCY'),
};
