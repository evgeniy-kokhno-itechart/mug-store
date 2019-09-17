import { applicationApi } from '../shared';

export default class CartService {
  static submitOrder(cart) {
    // !!! FAKE SUBMIT URL due to my-json-server.typicode.com restrictions
    const response = applicationApi.post('/placeorder', cart);
    return response;
  }
}
