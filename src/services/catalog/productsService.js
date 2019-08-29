import Axios from 'axios';
// import { getCategory } from './categoriesService';
import { rootUrl } from '../general/constants';

export function getProducts() {
  const response = Axios.get(`${rootUrl}/products`);
  return response;
}

export function getProduct(id) {
  const response = Axios.get(`${rootUrl}/products/${id}`);
  return response;
}

export function saveProduct(product) {
  let productInDb = {};
  let errorGot = '';
  getProduct(product.id)
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

  const responseOnSave = Axios.post(`${rootUrl}/products/${product.id}`, JSON.stringify(productInDb));

  return responseOnSave;
}

export function deleteProduct(id) {
  const response = Axios.delete(`${rootUrl}/products/${id}`);
  return response;
}
