import { createSelector } from 'reselect';
import ProductsService from './ProductsService';

const productsinCatalogSelector = state => state.products.products;

const currentProductSelector = state => state.products.currentProduct;
const currencyRateSelector = state => state.currency.currentCurrency.rate;

// returns product within currentCurrencyPrice: number
export const productCostSelector = createSelector(
  [currentProductSelector, currencyRateSelector],
  (currentProduct, rate) => {
    const currentCurrencyPrice = ProductsService.calculateCurrentCurrencyPrice(currentProduct.basePrice, rate, currentProduct.discount);
    const newProduct = { ...currentProduct, currentCurrencyPrice };
    return newProduct;
  },
);

// returns array of products for catalog within currentCurrencyPrice: number
export const productsPricesSelector = createSelector(
  [productsinCatalogSelector, currencyRateSelector],
  (products, rate) => {
    const newProducts = products.map((product) => {
      const currentCurrencyPrice = ProductsService.calculateCurrentCurrencyPrice(product.basePrice, rate, product.discount);
      const newProduct = { ...product, currentCurrencyPrice };
      return newProduct;
    });
    return newProducts;
  },
);
