const initialCurrencyState = {
  currencies: [],
  currentCurrency: { id: '0' },
  currenciesStatus: { isInProcess: false, hasFailed: false, error: 'Not started yet' },
  currencyRatesStatus: { isInProcess: false, hasFailed: false, error: 'Not started yet' },
};

export default initialCurrencyState;
