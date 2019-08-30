import Axios from 'axios';
import { rootUrl } from '../general/constants';

export function getCategories() {
  const response = Axios.get(`${rootUrl}/categories`);
  return response;
}

export function getCategory(id) {
  const response = Axios.get(`${rootUrl}/categories/${id}`);
  return response;
}
