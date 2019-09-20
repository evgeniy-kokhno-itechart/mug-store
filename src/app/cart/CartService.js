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
}
