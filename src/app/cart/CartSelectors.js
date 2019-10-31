/* eslint-disable import/prefer-default-export */
import { createSelector } from 'reselect';
import CartService from './CartService';

export const productsInCartSelector = state => state.cart.cart;
const currencyRateSelector = state => state.currency.currentCurrency.rate;

// returns array of products for cart
export const cartCostsSelector = createSelector(
  [productsInCartSelector, currencyRateSelector],
  (products, rate) => {
    const newProducts = products.map((product) => {
      const currentCurrencyCost = CartService.calculateCurrentCurrencyCost(product.basePrice, rate, product.quantity, product.discount);
      const newProduct = { ...product, currentCurrencyCost };
      return newProduct;
    });

    const totalCost = CartService.calculateTotalCost(newProducts);

    return { products: newProducts, totalCost };
  },
);
