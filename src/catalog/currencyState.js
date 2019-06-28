import { getCurrencies } from '../services/payService';

const initialCurrencyState = {
  currentCurrency: getCurrencies()[0],
};

export default initialCurrencyState;
