import Axios from 'axios';
import { rootUrl } from '../general/constants';

export const categories = [
  { _id: '1', name: 'Mugs' },
  { _id: '2', name: 'Plates' },
  { _id: '3', name: 'Notepads' },
  { _id: '4', name: 'T-shirts' },
];

export function getCategories() {
  const response = Axios.get(`${rootUrl}/categories`);
  return response;
}

export function getCategory(id) {
  const response = Axios.get(`${rootUrl}/categories/${id}`);
  return response;
}
