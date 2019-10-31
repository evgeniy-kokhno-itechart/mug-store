import Axios from 'axios';
import * as Endpoints from '../Endpoints';

export const applicationApi = Axios.create({
  baseURL: Endpoints.BASE_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
});

export const currencyApi = Axios.create({
  baseURL: Endpoints.CURRENCY_API_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
});
