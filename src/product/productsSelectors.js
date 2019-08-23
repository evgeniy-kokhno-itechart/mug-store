import { createSelector } from 'reselect';

const productsinCatalogSelector = state => state.products.products;

const currentProductSelector = state => state.products.currentProduct;
const currencyRateSelector = state => state.currency.currentCurrency.rate;

// returns product within currentCurrencyPrice: number
export const productCostSelector = createSelector(
  [currentProductSelector, currencyRateSelector],
  (currentProduct, rate) => {
    const currentCurrencyPrice = +(currentProduct.basePrice * rate * (1 - currentProduct.discount / 100)).toFixed(1);
    const newProduct = { ...currentProduct, currentCurrencyPrice };
    return newProduct;
  },
);

// returns array of products for catalog within currentCurrencyPrice: number
export const productsPricesSelector = createSelector(
  [productsinCatalogSelector, currencyRateSelector],
  (products, rate) => {
    const newProducts = products.map((product) => {
      const currentCurrencyPrice = +(product.basePrice * rate * (1 - product.discount / 100)).toFixed(1);
      const newProduct = { ...product, currentCurrencyPrice };
      return newProduct;
    });
    return newProducts;
  },
);
