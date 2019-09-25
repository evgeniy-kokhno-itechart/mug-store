import { applicationApi } from '../shared';

export default class ProductsService {
  static getProducts() {
    const response = applicationApi.get('/products');
    return response;
  }

  static getProduct(id) {
    const response = applicationApi.get(`/products/${id}`);
    return response;
  }

  static saveProduct(product) {
    let response;
    if (product.id) {
      response = applicationApi.post('/products/edit', JSON.stringify(product));
    } else {
      response = applicationApi.post('/products/create', JSON.stringify(product));
    }
    return response;
  }

  static deleteProduct(id) {
    const response = applicationApi.delete(`/products/${id}`);
    return response;
  }
}
