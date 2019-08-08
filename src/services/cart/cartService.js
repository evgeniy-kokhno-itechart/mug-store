/* eslint-disable import/prefer-default-export */
import * as Axios from 'axios';
import { rootUrl } from '../general/constants';

export function submitOrder(cart) {
  // !!! FAKE SUBMIT URL due to my-json-server.typicode.com restrictions
  const response = Axios.post(`${rootUrl}/placeorder`, cart);
  return response;
}
