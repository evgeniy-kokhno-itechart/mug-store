const currencies = [{ _id: 1, name: "BYN" }, { _id: 2, name: "USD" }];

export function getCurrencies() {
  return currencies;
}

export function setCurrentCurrency(currency) {
  let currencyInStorage = localStorage.getItem("currency");
  if (currencyInStorage) {
    localStorage.removeItem("currency");
  }
  localStorage.setItem("currency", JSON.stringify(currency));
}

export function getCurrentCurrency() {
  const defaultCurrency = currencies[0];
  try {
    let currentCurrency = localStorage.getItem("currency");
    currentCurrency = currentCurrency
      ? JSON.parse(currentCurrency)
      : defaultCurrency;
    return currentCurrency;
  } catch (ex) {
    return defaultCurrency;
  }
}
