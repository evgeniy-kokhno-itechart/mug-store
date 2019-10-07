/* eslint-disable no-undef */
import CurrencyService from '../../app/currency/CurrencyService';

describe('Currency service', () => {
  const baseCurrencyName = process.env.REACT_APP_BASE_CURRENCY_NAME;
  const nameKey = process.env.REACT_APP_CURRENCY_NAME_KEY_IN_JSON;
  const rateKey = process.env.REACT_APP_CURRENCY_RATE_KEY_IN_JSON;

  const fakeCurrencies = [{ id: '1', name: 'CURR1' }, { id: '2', name: 'CURR2' }, { id: 3, name: baseCurrencyName }];
  const fakeCurrenciesWithoutBase = [{ id: '1', name: 'CURR1' }, { id: '2', name: 'CURR2' }];
  const fakeCurrencyWithRate = { ...fakeCurrencies[0], rate: 0.5 };

  it('sets baseCurrency rate 1 if currentCurrency rate is not defined', () => {
    expect(CurrencyService.setCurrencyIfNone(fakeCurrencies[0], fakeCurrencies)).toEqual({ id: 3, name: baseCurrencyName, rate: 1 });
  });

  it('leaves currentCurrency the same if its rate is defined', () => {
    expect(CurrencyService.setCurrencyIfNone(fakeCurrencyWithRate, fakeCurrencies)).toEqual(fakeCurrencyWithRate);
  });

  it('leaves currentCurrency and set rate ERROR! if rate was not defined and baseCurrency is not listed in CurrenciesList', () => {
    expect(CurrencyService.setCurrencyIfNone(fakeCurrencies[0], fakeCurrenciesWithoutBase))
      .toEqual({ ...fakeCurrencies[0], rate: 'ERROR!' });
  });

  it('maps currencies array with rates response which contains all the necessary rates', () => {
    const ratesResponseArray = [{ [nameKey]: 'CURR1', [rateKey]: 0.25 }, { [nameKey]: 'CURR2', [rateKey]: 0.5 }];

    expect(CurrencyService.matchCurrenciesAndRates(fakeCurrenciesWithoutBase, ratesResponseArray)).toEqual(
      [{ id: '1', name: 'CURR1', rate: 4 }, { id: '2', name: 'CURR2', rate: 2 }],
    );
  });

  it('maps currencies array with rates response which doesnt contain all the necessary rates', () => {
    const ratesResponseArray = [{ [nameKey]: 'CURR1', [rateKey]: 0.25 }];

    expect(CurrencyService.matchCurrenciesAndRates(fakeCurrenciesWithoutBase, ratesResponseArray)).toEqual(
      [{ id: '1', name: 'CURR1', rate: 4 }, { id: '2', name: 'CURR2', rate: undefined }],
    );
  });

  it('calculates base price', () => {
    expect(CurrencyService.getBasePrice(10, 5)).toEqual(2);
  });
});
