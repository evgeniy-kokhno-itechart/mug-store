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
    let productInDb = {};
    let errorGot = '';
    this.getProduct(product.id) // !!!!!!CHECK THIS
      .then((response) => {
        productInDb = response.data;
      })
      .catch((error) => {
        errorGot = error.message;
      });

    // in case of brand new product
    if (errorGot.includes('404') || !productInDb.id) {
      productInDb.id = Date.now().toString();
    }

    productInDb.title = product.title;
    productInDb.imageURL = product.imageURL;
    productInDb.price = product.price;
    productInDb.description = product.description;
    productInDb.discount = product.discount;
    productInDb.producer = product.producer;
    productInDb.publishDate = Date.now();
    productInDb.rate = product.rate;

    const responseOnSave = applicationApi.post(`/products/${product.id}`, JSON.stringify(productInDb));

    return responseOnSave;
  }

  static deleteProduct(id) {
    const response = applicationApi.delete(`/products/${id}`);
    return response;
  }
}
