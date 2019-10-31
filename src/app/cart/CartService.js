import { applicationApi } from '../shared';

export default class CartService {
  static countProducts(cart) {
    const cartCount = cart.reduce((sumQty, currentProduct) => sumQty + currentProduct.quantity, 0);
    return cartCount;
  }

  static submitOrder(cart) {
    // !!! FAKE SUBMIT URL due to my-json-server.typicode.com restrictions
    const response = applicationApi.post('/placeorder', cart);
    return response;
  }

  static calculateCurrentCurrencyCost(basePrice, currencyRate, quantity, discount) {
    return +(basePrice * currencyRate * quantity * (1 - discount / 100)).toFixed(1);
  }

  static calculateTotalCost(products) {
    const totalCost = products.reduce((sum, currentItem) => (sum * 1000 + currentItem.currentCurrencyCost * 1000) / 1000, 0);
    return totalCost;
  }
}
