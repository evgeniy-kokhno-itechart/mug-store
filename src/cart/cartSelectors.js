/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';

const productsinCartSelector = state => state.cart.cart;
const currencyRateSelector = state => state.currency.currentCurrency.rate;

// returns array of products for cart
export const cartCostsSelector = createSelector(
  [productsinCartSelector, currencyRateSelector],
  (products, rate) => {
    const newProducts = products.map((product) => {
      const currentCurrencyCost = +(product.basePrice * rate * product.quantity * (1 - product.discount / 100)).toFixed(1);
      const newProduct = { ...product, currentCurrencyCost };
      return newProduct;
    });
    return newProducts;
  },
);
