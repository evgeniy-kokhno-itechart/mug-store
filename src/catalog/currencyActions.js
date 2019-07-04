import { createAction } from 'redux-actions';

export const changeCurrency = createAction('CHANGE_CURRENCY', (currencyId, currencyName) => ({ currencyId, currencyName }));
