const initialCurrencyState = {
  currencies: [],
  currentCurrency: { id: '0' },
  currenciesStatus: { isGettingCurrenciesInProcess: false, hasGettingCurrenciesFailed: false, error: '' },
  currencyRatesStatus: { isGettingCurrencyRatesInProcess: false, hasGettingCurrencyRatesFailed: false, error: '' },
};

export default initialCurrencyState;
