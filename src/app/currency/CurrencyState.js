const initialCurrencyState = {
  currencies: [],
  currentCurrency: { id: '0' },
  currenciesStatus: { isGettingCurrenciesInProcess: false, hasGettingCurrenciesFailed: false, error: 'Not started yet' },
  currencyRatesStatus: { isGettingCurrencyRatesInProcess: false, hasGettingCurrencyRatesFailed: false, error: 'Not started yet' },
};

export default initialCurrencyState;
