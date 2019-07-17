// const initialCurrencies = [{ id: '0', name: 'Loading...' }];

const initialCurrencyState = {
  currencies: [],
  currentCurrency: { id: '0' },
  currenciesStatus: { isGettingCurrenciesInProcess: false, hasGettingCurrenciesFailed: false, error: '' },
};

export default initialCurrencyState;
